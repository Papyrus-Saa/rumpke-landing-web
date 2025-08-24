'use client'

import { useTheme } from "@/context/ThemeContext";
import { LuSunMoon } from "react-icons/lu";



function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();



  return (
    <div onClick={toggleTheme} className="fixed bottom-5 right-4 sm:top-4 h-fit w-fit border border-sky-700 dark:border-sky-900 p-2
    rounded-2xl">
      {theme === 'light' ? <LuSunMoon /> : <LuSunMoon />}
    </div>
  )
}

export default ThemeSwitch
