"use client";

import { useEffect, useState } from 'react';
import { LeafletMapClientProps } from './LeafletMapClient';
import dynamic from 'next/dynamic';

// Importamos el mapa de forma dinámica y sin SSR
const DynamicMap = dynamic(() => import('./LeafletMapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
  ),
});

export default function MapWrapper(props: LeafletMapClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
    );
  }

  return <DynamicMap {...props} />;
}
