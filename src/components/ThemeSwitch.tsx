'use client'

import { useTheme } from "@/context/ThemeContext";
import { LuSunMoon } from "react-icons/lu";


const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (

    <button onClick={toggleTheme} className="relative z-50 w-6 h-6  bg-light-200  text-mint-600 flex items-center justify-center  rounded cursor-pointer hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 ">
      {theme === 'light' ? <LuSunMoon /> : <LuSunMoon />}
    </button>
  )
}

export default ThemeSwitch;
