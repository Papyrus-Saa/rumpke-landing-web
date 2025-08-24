'use client';

import { createContext, useContext, ReactNode } from "react";
import { useThemeMode, Theme } from "@/hooks/useThemeMode";

// Tipo del contexto
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};


type ThemeProviderProps = {
  children: ReactNode;
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}


export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
