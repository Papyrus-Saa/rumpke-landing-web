"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import ProfessionalGlobe from "../ProfessionalGlobe";

// Importamos la interfaz de props
import type { LeafletMapClientProps } from "@/components/map/LeafletMapClient";

// Cargamos el mapa dinámicamente solo en el cliente
const LeafletMapClient = dynamic<LeafletMapClientProps>(() => import("@/components/map/LeafletMapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
  ),
});

const LeafletMap: React.FC = () => {
  const [isSatellite, setIsSatellite] = useState(false);

  return (
    <div className="duration-100 w-full max-w-6xl mx-auto p-1 md:p-4 bg-light-100 dark:bg-dark-200 rounded-2xl dark:shadow-xl">
      <div className="mb-2 flex justify-between items-center w-full">
        <div className="flex flex-col flex-1">
          <span className="mb-2 text-base text-left">
          </span>
        </div>
        <button
          className={`cursor-pointer duration-100 px-3 py-1 rounded text-xs font-semibold transition-colors ml-4 ${isSatellite ? 'bg-mint-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          onClick={() => setIsSatellite(v => !v)}
        >
          {isSatellite ? "Straßenansicht" : "Satellitenansicht"}
        </button>
      </div>
      <LeafletMapClient
        isSatellite={isSatellite}
        is3D={false}
      />
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
    </div>
  );
};

export default LeafletMap;
