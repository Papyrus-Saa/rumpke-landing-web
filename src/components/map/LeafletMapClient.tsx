"use client";

import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Estilos personalizados para ocultar elementos de Leaflet
const customMapStyles = `
  .leaflet-control-container .leaflet-bottom.leaflet-right,
  .leaflet-control-container .leaflet-top.leaflet-right,
  .leaflet-control-container .leaflet-top.leaflet-left {
    display: none !important;
  }
`;
import { useTheme } from "@/context/ThemeContext";

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// URLs de los estilos del mapa
const LIGHT_STYLE = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const DARK_STYLE = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Coordenadas iniciales
const MAIN_LOCATION = { lat: 52.6131, lng: 7.4842 };
const RADIUS_KM = 100;

// Función para convertir km a metros
const kmToMeters = (km: number) => km * 1000;

// Props interface
export interface LeafletMapClientProps {
  is3D: boolean;
}

// Componente para manejar los eventos de zoom y vista 3D
function MapEvents({ is3D }: { is3D: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (is3D) {
      map.setView([MAIN_LOCATION.lat, MAIN_LOCATION.lng], 10);
    } else {
      map.setView([MAIN_LOCATION.lat, MAIN_LOCATION.lng], 8);
    }
  }, [is3D, map]);

  return null;
}

const LeafletMapClient: React.FC<LeafletMapClientProps> = ({ is3D }) => {
  console.log('LeafletMapClient mounted');

  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [resultType, setResultType] = useState<"in" | "out" | "notfound" | "">("");
  const [loading, setLoading] = useState(false);
  const [searchMarker, setSearchMarker] = useState<L.LatLng | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const mapRef = useRef<L.Map | null>(null);

  // Log cuando cambia el tema
  useEffect(() => {
    console.log('Current theme:', theme);
  }, [theme]);// Manejo de la búsqueda
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

      // Calcular distancia
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

  // Estilo para el círculo basado en el tema
  const circleOptions = {
    color: isDarkMode ? '#005A73' : '#9c00006c',
    fillColor: isDarkMode ? '#00222b' : '#00e6c3',
    fillOpacity: isDarkMode ? 0.3 : 0.15,
  };

  // Estilos y opciones del mapa
  const mapStyle = {
    height: "400px",
    width: "100%",
    borderRadius: "0.75rem",
    overflow: "hidden",
  };

  // Los estilos del mapa se usan desde las constantes LIGHT_STYLE y DARK_STYLE definidas arriba

  return (
    <>
      <style>{customMapStyles}</style>
      <div className="flex w-full mb-2">
        <div
          className={`text-base w-fit py-1 px-4 rounded-xl ${result ? "border" : ""
            } ${resultType === "in"
              ? "text-green-600 bg-green-600/40"
              : resultType === "out"
                ? "text-red-600 bg-red-600/40"
                : resultType === "notfound"
                  ? "text-block bg-gray-500/40"
                  : ""
            }`}
          style={{ minWidth: "300px", textAlign: "left" }}
        >
          {result}
        </div>
      </div>
      <div className="w-full h-[400px] min-h-[400px] rounded-xl overflow-hidden border border-white dark:border-gray-800 mb-6">
        <MapContainer
          center={[MAIN_LOCATION.lat, MAIN_LOCATION.lng]}
          zoom={8}
          style={mapStyle}
          ref={mapRef}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            key={isDarkMode ? 'dark' : 'light'} // Forzar re-render cuando cambia el tema
            url={isDarkMode ? DARK_STYLE : LIGHT_STYLE}
          />
          <Circle
            center={[MAIN_LOCATION.lat, MAIN_LOCATION.lng]}
            radius={kmToMeters(RADIUS_KM)}
            {...circleOptions}
          />
          <Marker position={[MAIN_LOCATION.lat, MAIN_LOCATION.lng]}>
            <Popup>Main Location</Popup>
          </Marker>
          {searchMarker && (
            <Marker position={searchMarker}>
              <Popup>Gesuchte Adresse</Popup>
            </Marker>
          )}
          <MapEvents is3D={is3D} />
        </MapContainer>
      </div>
      <form className="mb-4 flex gap-2" onSubmit={handleSearch}>
        <input
          type="text"
          className={`border border-light-300 dark:border-gray-700 rounded px-3 py-2 w-full transition-colors duration-100`}
          placeholder="Postleitzahl oder Adresse eingeben..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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

export default LeafletMapClient;
