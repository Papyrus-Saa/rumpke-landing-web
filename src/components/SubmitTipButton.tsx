'use client'

import { useRainbow } from "@/hooks/useRainBow";



export const SubmitTipButton = () => {
  const { triggerRainbow } = useRainbow();

  const handleClick = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      triggerRainbow();
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleClick}

        className="
        duration-100
        text-white py-2 px-4 rounded-b-xl rounded-t-2xl font-bold cursor-pointer
        shadow-md transition-all
        hover:shadow-lg hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2
        lg:mt-6
  bg-gradient-to-tr from-orange-400 via-orange-500 to-yellow-400
  dark:bg-gradient-to-tr dark:from-orange-700 dark:via-orange-600 dark:to-yellow-500"
      >
        Tipp abgeben
      </button>
    </div>
  )
}
