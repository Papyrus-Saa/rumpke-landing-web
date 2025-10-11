'use client';

import React from "react";
import { MdLocationOn } from "react-icons/md";


interface Props {
  title: string;
}

export const TipInfoSectionButton: React.FC<Props> = ({ title }) => {
  const handleScroll = () => {
    const el = document.getElementById("address-input");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        el.focus();
      }, 350);
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
        <MdLocationOn className="text-lg" />
      </button>
      <p className="text-xs dark:text-[#808080] text-[#7c7c7c]">{title}</p>
    </div>
  );
};


