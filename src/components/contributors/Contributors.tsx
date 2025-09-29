
"use client";

import { titleFonts } from "@/config/fonts";

import { useState } from "react";
import { FaPeoplePulling } from "react-icons/fa6";
import WhyTrustUsButton from "../trustUs/WhyTrustUsButton";


interface Props {
  total: number;
  show?: boolean;
}

const Contributors = ({ total, show }: Props) => {
  const [hover, setHover] = useState(show || false);
  const plural = total === 1 ? "hat" : "haben";

  return (
    <div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative p-2 lg:px-16 xl:px-20 2xl:px-72 flex justify-start items-center border-b dark:border-green-500 border-green-400 dark:bg-dark-300 bg-white dark:text-white text-dark-300 duration-100"
        style={{ minHeight: 40 }}
      >
        <FaPeoplePulling size={14} className="text-green-500 mr-2" />
        <p className={`${titleFonts.className} duration-100 text-xs mr-4 text-dark-300 dark:text-white`}>Schon teilgenommen</p>
        <span className={`${titleFonts.className} rounded-md px-2 text-white ml-auto bg-green-600`}>{total}</span>

        <div
          className={`absolute inset-0 flex items-center justify-center bg-white/10 dark:bg-dark-300/60 border border-white/30 dark:border-dark-100/30 rounded backdrop-blur-md z-10 transition-opacity duration-100 ease-in-out ${hover && total > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <p className={`${titleFonts.className} duration-200 text-xs  drop-shadow-lg text-center p-4 flex justify-center items-center`}>
            Schon <span className={`${titleFonts.className} font-extrabold text-green-600 animate-pulse text-sm px-2`}>{ total} </span> Tippgeber {plural} ihre Chance genutzt – sei auch du dabei!
          </p>
        </div>
      </div>
      <WhyTrustUsButton />
    </div>
  );
};

export default Contributors;
