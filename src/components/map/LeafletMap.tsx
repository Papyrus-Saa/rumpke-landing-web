"use client";

import React, { useState } from "react";
import ProfessionalGlobe from "../ProfessionalGlobe";
import MapWrapper from "./MapWrapper";

const LeafletMap: React.FC = () => {
  const [isSatellite, setIsSatellite] = useState(false);

  return (
    <div className="mb-6 duration-100 w-full sm:w-[96%] lg:w-[90%] xl:w-[80%]  mx-auto px-1 py-2 md:p-4 bg-light-100 dark:bg-dark-200 rounded-2x shadow dark:shadow-subtle-d">
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
      <MapWrapper
      
        isSatellite={isSatellite}
        is3D={false}
      />
      <div className="mb-4 text-sm text-center sm:text-start text-gray-700 dark:text-gray-200">
        <div className="sm:flex items-center justify-between w-full">
          <div className="flex flex-col flex-1 mb-6 sm:mb-0 px-6 sm:px-0">
            <span>Es ist egal, wo du dich befindest. Wichtig ist, dass die angegebene Adresse der möglichen Immobilie im gewünschten Radius liegt.</span>
            <span className="mt-2 text-xs text-green-600 dark:text-green-500">
              Die Region gilt als ein Umkreis von 100 km um die Adresse: 49844 Bawinkel.
            </span>
          </div>
          <div className="hidden ml-4 flex-shrink-1 sm:flex items-center justify-center" style={{ width: 64, height: 64 }}>
            <ProfessionalGlobe width={64} height={64} rotationSpeed={0.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
