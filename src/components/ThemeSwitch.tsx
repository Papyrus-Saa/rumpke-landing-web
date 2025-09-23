'use client'

import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";


const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative z-50 w-6 h-6 bg-dark-300 text-white flex items-center justify-center rounded cursor-pointer hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FiMoon size={15} /> : <FiSun size={15} />}
    </button>
  );
}

export default ThemeSwitch;
