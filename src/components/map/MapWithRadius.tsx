"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const MapContainer = dynamic(() => import("./LeafletMapClient"), { ssr: false });
import ProfessionalGlobe from "../ProfessionalGlobe";

export interface LeafletMapClientProps {
  is3D: boolean;
}

const MapWithRadius: React.FC = () => {
  const [is3D, setIs3D] = useState(false);
  return (
    <div className="duration-100 w-full max-w-6xl mx-auto p-1 md:p-4 bg-light-100 dark:bg-dark-200 rounded-2xl dark:shadow-xl">
      <div className="mb-2 flex justify-between items-center w-full">
        <div className="flex flex-col flex-1">
          <span className="mb-2 text-base text-left">

          </span>
        </div>
        <button
          className={`cursor-pointer duration-100 px-3 py-1 rounded text-xs font-semibold transition-colors ml-4 ${is3D ? 'bg-mint-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
          onClick={() => setIs3D(v => !v)}
        >
          {is3D ? "Normale Ansicht" : "3D Nachtansicht"}
        </button>
      </div>
      <MapContainer is3D={is3D} />
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

export default MapWithRadius;
// ...existing code...
