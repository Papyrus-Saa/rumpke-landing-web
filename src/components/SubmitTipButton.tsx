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
    text-white py-2 rounded-xl px-1 font-bold cursor-pointer
    shadow-md transition-all
    hover:shadow-lg hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2
    lg:mt-6
    bg-gradient-orange-yellow"
      >
        Tipp abgeben
      </button>
    </div>
  )
}
