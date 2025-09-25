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
        text-secondary-d dark:text-secondary-l py-2 px-4 rounded-b-xl rounded-t-2xl bg-secondary-l dark:bg-secondary-d font-bold cursor-pointer
          shadow-md transition-all
          hover:shadow-lg hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2
          lg:mt-6
        "
      >
        Tipp abgeben
      </button>
    </div>
  )
}
