'use client';

import React from "react";
import { MdHelpOutline } from "react-icons/md";




export const TipInfoSectionButton = () => {
  const handleScroll = () => {
    const el = document.getElementById("tip-info");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        type="button"
        onClick={handleScroll}
        className="rounded bg-red-700 text-white hover:bg-red-500 text-xs p-1 font-semibold cursor-pointer duration-200 mb-1"
        aria-label="Ist mein Tipp gültig?"
      >
        <MdHelpOutline className="text-lg" />
      </button>
      <p className="text-xs dark:text-[#808080] text-[#7c7c7c]">Ist dein Tipp gültig?</p>
    </div>
  );
};


