'use client';


import { createContext, useContext, useState, ReactNode } from 'react';

type RainbowContextType = {
  rainbowActive: boolean;
  triggerRainbow: () => void;
};

const RainbowContext = createContext<RainbowContextType | undefined>(undefined);

export function RainbowProvider({ children }: { children: ReactNode }) {
  const [rainbowActive, setRainbowActive] = useState(false);

  const triggerRainbow = () => {
    setRainbowActive(true);
    setTimeout(() => setRainbowActive(false), 4000);
  };

  return (
    <RainbowContext.Provider value={{ rainbowActive, triggerRainbow }}>
      {children}
    </RainbowContext.Provider>
  );
}

export function useRainbow() {
  const ctx = useContext(RainbowContext);
  if (!ctx) throw new Error('useRainbow must be used within RainbowProvider');
  return ctx;
}
