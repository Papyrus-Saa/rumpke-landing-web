import React, { useRef, useEffect, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MAIN_LOCATION = { lat: 52.6131, lng: 7.4842 };
const RADIUS_KM = 100;

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

interface MapWithRadiusClientProps {
  is3D: boolean;
}

const MapWithRadiusClient: React.FC<MapWithRadiusClientProps> = ({ is3D }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [resultType, setResultType] = useState<"in" | "out" | "notfound" | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
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
      .setPopup(new maplibregl.Popup().setText("Main Location"))
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
  }, [is3D]);

  // Geocoding and validation logic
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResult("");
    setResultType("");
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data || data.length === 0) {
        setResult("Adresse nicht gefunden.");
        setResultType("notfound");
        setLoading(false);
        return;
      }
      const { lat, lon, display_name } = data[0];
      // Calculate distance
      const d = getDistanceFromLatLonInKm(
        MAIN_LOCATION.lat,
        MAIN_LOCATION.lng,
        parseFloat(lat),
        parseFloat(lon)
      );
      if (d <= RADIUS_KM) {
        setResult(`✅ ${display_name} liegt im Umkreis von 100km (${d.toFixed(1)}km).`);
        setResultType("in");
      } else {
        setResult(`❌ ${display_name} liegt außerhalb von 100km (${d.toFixed(1)}km).`);
        setResultType("out");
      }
      // Optionally, add marker for searched address
      if (mapRef.current) {
        new maplibregl.Marker({ color: "#0077ff" })
          .setLngLat([parseFloat(lon), parseFloat(lat)])
          .setPopup(new maplibregl.Popup().setText(display_name))
          .addTo(mapRef.current);
        mapRef.current.flyTo({ center: [parseFloat(lon), parseFloat(lat)], zoom: 10 });
      }
    } catch (err) {
      setResult("Fehler bei der Adresssuche.");
      setResultType("notfound");
    }
    setLoading(false);
  }

  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  return (
    <>
      <div className="flex w-full mb-2">
        <div className={`text-base w-fit py-1 px-4 rounded-xl ${result
          ? "border"
          : ""
          } ${resultType === "in"
            ? "text-green-600 bg-green-600/40"
            : resultType === "out"
              ? "text-red-600 bg-red-600/40"
              : resultType === "notfound"
                ? "text-block bg-gray-500/40"
                : ""
          }`} style={{ minWidth: "300px", textAlign: "left" }}>
          {result}
        </div>
      </div>
      <div
        ref={mapContainer}
        className="w-full h-[400px] min-h-[400px] rounded-xl overflow-hidden border border-white dark:border-gray-800 mb-6"
        style={{ background: "#222", position: "relative" }}
      />
      <form className="mb-4 flex gap-2" onSubmit={handleSearch}>
        <input
          type="text"
          className={`border border-light-300 dark:border-gray-700 rounded px-3 py-2 w-full transition-colors duration-100`}
          placeholder="Postleitzahl oder Adresse eingeben..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="duration-200 bg-mint-600 hover:bg-mint-700 text-white px-4 py-2 rounded dark:hover:bg-mint-600 dark:bg-mint-700 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Prüfe..." : "Prüfen"}
        </button>
      </form>
    </>
  );
};

export default MapWithRadiusClient;
