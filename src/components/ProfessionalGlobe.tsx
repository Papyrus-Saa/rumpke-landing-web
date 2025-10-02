import React, { useRef, useEffect, useState } from "react";

import GlobeGL from "react-globe.gl";

interface ProfessionalGlobeProps {
  width?: number;
  height?: number;
  rotationSpeed?: number;
}

const ProfessionalGlobe: React.FC<ProfessionalGlobeProps> = ({ width = 64, height = 64, rotationSpeed = 0.5 }) => {
  const [loadTime, setLoadTime] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setLoadTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);
  const globeEl = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (globeEl.current) {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = rotationSpeed;
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [rotationSpeed]);

  return (
    <div style={{ filter: "drop-shadow(0 4px 16px rgb(0, 81, 180))" }}>
      <GlobeGL
        ref={globeEl}
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#3399ff"
        atmosphereAltitude={0.15}
      />
      <span style={{ marginTop: 2, fontSize: 10, color: '#8b8b8b', opacity: 0.7, fontWeight: 400 }}>
        {loadTime && `Zeit: ${loadTime}`}
      </span>
    </div>
  );
};

export default ProfessionalGlobe;
