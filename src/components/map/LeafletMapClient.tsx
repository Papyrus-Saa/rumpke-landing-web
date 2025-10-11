"use client";

import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTheme } from "@/context/ThemeContext";


const customMapStyles = `
  .leaflet-control-container .leaflet-bottom.leaflet-right,
  .leaflet-control-container .leaflet-top.leaflet-right,
  .leaflet-control-container .leaflet-top.leaflet-left {
    display: none !important;
  }
`;


const MAP_STYLES = {
  street: {
    light: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
};


const MAIN_LOCATION = { lat: 52.6131, lng: 7.4842 };
const RADIUS_KM = 100;


const kmToMeters = (km: number) => km * 1000;


export interface LeafletMapClientProps {
  is3D: boolean;
  isSatellite?: boolean;
}

const LeafletMapClient: React.FC<LeafletMapClientProps> = ({ is3D, isSatellite = false }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [resultType, setResultType] = useState<"in" | "out" | "notfound" | "">("");
  const [loading, setLoading] = useState(false);
  const [searchMarker, setSearchMarker] = useState<L.LatLng | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const mapRef = useRef<L.Map | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    }
  }, []);


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
      const searchLatLng = new L.LatLng(parseFloat(lat), parseFloat(lon));


      const mainLatLng = new L.LatLng(MAIN_LOCATION.lat, MAIN_LOCATION.lng);
      const distanceInKm = mainLatLng.distanceTo(searchLatLng) / 1000;

      if (distanceInKm <= RADIUS_KM) {
        setResult(`✅ ${display_name} liegt im Umkreis von 100km (${distanceInKm.toFixed(1)}km).`);
        setResultType("in");
      } else {
        setResult(`❌ ${display_name} liegt außerhalb von 100km (${distanceInKm.toFixed(1)}km).`);
        setResultType("out");
      }

      setSearchMarker(searchLatLng);
      mapRef.current?.flyTo(searchLatLng, 10);

    } catch (err) {
      setResult("Fehler bei der Adresssuche.");
      setResultType("notfound");
    }
    setLoading(false);
  }


  const circleOptions = {
    color: isDarkMode ? '#005A73' : '#9c00006c',
    fillColor: isDarkMode ? '#00222b' : '#00e6c3',
    fillOpacity: isDarkMode ? 0.3 : 0.15,
  };


  const mapStyle = {
    height: "400px",
    width: "100%",
    borderRadius: "0.75rem",
    overflow: "hidden",
  };

  if (typeof window === 'undefined') {
    return (
      <div className="w-full h-[400px] min-h-[400px] rounded-xl overflow-hidden border border-white dark:border-gray-800 mb-6 flex items-center justify-center bg-white dark:bg-dark-200">
        Lade Karte...
      </div>
    );
  }

  return (
    <>
      <style>{customMapStyles}</style>
      <div className="w-full mb-2">
        {result && (
          <div
            className={`text-base w-full py-1 px-4 rounded-xl ${resultType === "in"
              ? "text-green-600 bg-green-600/40 border-green-600/40"
              : resultType === "out"
                ? "text-red-600 bg-red-600/40 border-red-600/40"
                : resultType === "notfound"
                  ? "text-gray-600 bg-gray-500/40 border-gray-500/40"
                  : ""
              } border`}
          >
            {result}
            {resultType === "in" && (
              <div className="mt-1 dark:text-green-400 text-green-700 font-medium inline-flex items-center gap-2 flex-wrap ml-4">
                Du kannst deinen Tipp abgeben! <span aria-label="smile" role="img">😊</span>
              </div>
            )}
            {resultType === "out" && (
              <div className="mt-1 text-red-700 dark:text-red-400 font-medium inline-flex items-center gap-2 flex-wrap ml-4">
                Leider kannst du für diese Adresse keinen Tipp abgeben. <span aria-label="sad" role="img">😔</span>
              </div>
            )}
          </div>
        )}
      </div>
      <form className="mb-4 flex gap-2" onSubmit={handleSearch}>
        <input
          id="address-input"
          type="text"
          className={`border border-light-300 dark:border-gray-700 rounded px-3 py-2 w-full transition-colors duration-100`}
          placeholder="Postleitzahl oder Adresse eingeben..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="duration-200 bg-mint-600 hover:bg-mint-600/80 text-white px-4 py-2 rounded  cursor-pointer"
          disabled={loading}
        >
          {loading ? "Prüfe..." : "Prüfen"}
        </button>
      </form>

      <div className="w-full h-[400px] min-h-[400px] rounded-xl overflow-hidden border border-white dark:border-gray-800 mb-6">
        <MapContainer
          center={[MAIN_LOCATION.lat, MAIN_LOCATION.lng]}
          zoom={7}
          style={mapStyle}
          ref={mapRef}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            key={`${isDarkMode ? 'dark' : 'light'}-${isSatellite ? 'satellite' : 'street'}`}
            url={isSatellite ? MAP_STYLES.satellite.url : (isDarkMode ? MAP_STYLES.street.dark : MAP_STYLES.street.light)}
            attribution={isSatellite ? MAP_STYLES.satellite.attribution : ''}
          />
          <Circle
            center={[MAIN_LOCATION.lat, MAIN_LOCATION.lng]}
            radius={kmToMeters(RADIUS_KM)}
            {...circleOptions}
          />
          <Marker position={[MAIN_LOCATION.lat, MAIN_LOCATION.lng]}>
            <Popup>Unser Standort</Popup>
          </Marker>
          {searchMarker && (
            <Marker position={searchMarker}>
              <Popup>Gesuchte Adresse</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default LeafletMapClient;
