'use client'

import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";


const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative z-50 w-6 h-6 text-amber-200 flex items-center justify-center rounded cursor-pointer hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 bg-gradient-to-tr from-[#005A73] via-[#0a3a47] to-[#b3dbe6] dark:from-[#00222b] dark:via-[#005A73] dark:to-[#b3dbe6]"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FiMoon size={15} /> : <FiSun size={15} />}
    </button>
  );
}

export default ThemeSwitch;
