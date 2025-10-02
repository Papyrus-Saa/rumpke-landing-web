"use client";

import dynamic from "next/dynamic";

const DynamicGlobe = dynamic(() => import("./ProfessionalGlobe"), {
  ssr: false,
  loading: () => (
    <div style={{ width: 64, height: 64 }} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full" />
  ),
});

interface ProfessionalGlobeWrapperProps {
  width?: number;
  height?: number;
  rotationSpeed?: number;
}

const ProfessionalGlobeWrapper: React.FC<ProfessionalGlobeWrapperProps> = (props) => {
  return <DynamicGlobe {...props} />;
};

export default ProfessionalGlobeWrapper;
