"use client";

import React, { useRef, useEffect, useState } from "react";

import maplibregl, { Map, Marker, LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import ProfessionalGlobe from "../ProfessionalGlobe";

const MAIN_LOCATION = { lat: 52.6131, lng: 7.4842 };
const RADIUS_KM = 100;

function haversineDistance(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const aHarv =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
  return R * c;
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
}

const MapWithRadius: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [input, setInput] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [result, setResult] = useState<string>("");
  const [lastAddress, setLastAddress] = useState<string>("");
  const [resultType, setResultType] = useState<"in" | "out" | "notfound" | "">("");
  const [loading, setLoading] = useState(false);
  const [isDark] = useState(true);
  const [is3D, setIs3D] = useState(false);





  useEffect(() => {
    if (!isClient || !mapContainer.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [MAIN_LOCATION.lng, MAIN_LOCATION.lat],
      zoom: is3D ? 10 : 8,
      pitch: is3D ? 60 : 0,
      bearing: is3D ? 30 : 0,
      attributionControl: false,
    });

    new maplibregl.Marker({ color: "#e60000" })
      .setLngLat([MAIN_LOCATION.lng, MAIN_LOCATION.lat])
      .setPopup(new maplibregl.Popup().setText("Hauptstandort"))
      .addTo(mapRef.current);

    mapRef.current.on("load", () => {
      mapRef.current!.addSource("radius", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [createCircle([MAIN_LOCATION.lng, MAIN_LOCATION.lat], RADIUS_KM)],
              },
              properties: {},
            },
          ],
        },
      });
      mapRef.current!.addLayer({
        id: "radius-layer",
        type: "fill",
        source: "radius",
        paint: {
          "fill-color": "#00e6c3",
          "fill-opacity": 0.15,
        },
      });
      mapRef.current!.addLayer({
        id: "radius-outline",
        type: "line",
        source: "radius",
        paint: {
          "line-color": "#9c00006c",
          "line-width": 2,
        },
      });

      setTimeout(() => {
        mapRef.current && mapRef.current.resize();
      }, 100);
    });

    const handleResize = () => {
      mapRef.current && mapRef.current.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient, is3D]);


  useEffect(() => {
    if (!mapRef.current) return;

    if ((mapRef.current as any)._userMarker) {
      (mapRef.current as any)._userMarker.remove();
    }
    if (userLocation) {
      const marker = new maplibregl.Marker({ color: "#a07be6" })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new maplibregl.Popup().setText("Benutzer"))
        .addTo(mapRef.current);
      (mapRef.current as any)._userMarker = marker;
      mapRef.current.flyTo({ center: [userLocation.lng, userLocation.lat], zoom: 10 });
    }
  }, [userLocation]);

  function createCircle(center: [number, number], radiusKm: number, points = 64) {
    const coords = [];
    for (let i = 0; i < points; i++) {
      const angle = (i * 2 * Math.PI) / points;
      const dx = radiusKm * Math.cos(angle) / 111;
      const dy = radiusKm * Math.sin(angle) / 111;
      coords.push([center[0] + dx, center[1] + dy]);
    }
    coords.push(coords[0]);
    return coords;
  }

  const handleCheck = async () => {
    if (!input) return;
    setLoading(true);
    setResult("");
    setResultType("");
    setLastAddress(input);
    const loc = await geocodeAddress(input);
    setUserLocation(loc);
    if (loc) {
      const dist = haversineDistance(MAIN_LOCATION, loc);
      if (dist <= RADIUS_KM) {
        setResult(`${input} liegt innerhalb des 100km-Radius.`);
        setResultType("in");
      } else {
        setResult(`${input} liegt außerhalb des 100km-Radius.`);
        setResultType("out");
      }
    } else {
      setResult(`Die Adresse "${input}" wurde nicht gefunden.`);
      setResultType("notfound");
    }
    setLoading(false);
  };

  return (
    <div className="duration-100 w-full max-w-6xl mx-auto p-1 md:p-4 bg-light-100 dark:bg-dark-200 rounded-2xl  dark:shadow-xl">
      <div className="mb-2 text-base ">
        <div
          className={`mb-2 text-base w-fit py-1 px-4 rounded-xl ${result
            ? "border"
            : ""
            } ${resultType === "in"
              ? "text-green-600 bg-green-600/40"
              : resultType === "out"
                ? "text-red-600 bg-red-600/40"
                : resultType === "notfound"
                  ? "text-white bg-gray-500/40"
                  : ""
            }`}
        >
          {result}
        </div>
      </div>
      <div className="mb-2 flex justify-end">
        <button
          className={`cursor-pointer duration-100 px-3 py-1 rounded text-xs font-semibold transition-colors ${is3D ? 'bg-mint-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
          onClick={() => setIs3D(v => !v)}
        >
          {is3D ? "Normale Ansicht" : "3D Nachtansicht"}
        </button>
      </div>
      {isClient && (
        <div
          ref={mapContainer}
          className="w-full h-[400px] min-h-[400px] rounded-xl overflow-hidden border border-white dark:border-gray-800 mb-6"
          style={{ background: "#222", position: "relative" }}
        />
      )}
      <div className="mb-4 text-sm text-gray-700 dark:text-gray-200">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col flex-1">
            <span>Es ist egal, wo du dich befindest. Wichtig ist, dass die angegebene Adresse der möglichen Immobilie im gewünschten Radius liegt.</span>
            <span className="mt-2 text-xs text-green-600 dark:text-green-500">
              Die Region gilt als ein Umkreis von 100 km um die Adresse: 49844 Bawinkel.
            </span>
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center justify-center" style={{ width: 64, height: 64 }}>
            <ProfessionalGlobe width={64} height={64} rotationSpeed={0.5} />
          </div>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className={`border border-light-300 dark:border-gray-700 rounded px-3 py-2 w-full transition-colors duration-100`}
          placeholder="Postleitzahl oder Adresse eingeben..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleCheck();
          }}
        />
        <button
          className="bg-mint-600 hover:bg-mint-700 text-white px-4 py-2 rounded dark:hover:bg-mint-600 dark:bg-mint-700 cursor-pointer"
          onClick={handleCheck}
          disabled={loading}
        >
          {loading ? "Prüfe..." : "Prüfen"}
        </button>
      </div>
    </div>
  );
};

export default MapWithRadius;
