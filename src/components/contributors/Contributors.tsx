'use client'

import { titleFonts } from "@/config/fonts";
import { useState } from "react";
import { FaPeoplePulling } from "react-icons/fa6";
import WhyTrustUsButton from "../trustUs/WhyTrustUsButton";

interface Props {
  total: number;
  show?: boolean;
}

const Contributors = ({ total, show }: Props) => {
  const [first, setfirst] = useState(show || false);

  return (
    <div>
      <div
        onMouseEnter={() => setfirst(true)}
        onMouseLeave={() => setfirst(false)}
        className="relative p-2 lg:px-16 xl:px-20 2xl:px-72 flex justify-start items-center border-b dark:border-green-500 border-green-400 dark:bg-dark-300 bg-white dark:text-white text-dark-300 duration-500"
        style={{ minHeight: 40 }}
      >
        <FaPeoplePulling size={14} className="text-green-500 mr-2" />
        <p className={`${titleFonts.className} text-xs mr-4 text-dark-300 dark:text-white`}>Schon teilgenommen</p>
        <span className={`${titleFonts.className} rounded-md px-2
       text-white ml-auto bg-mint-600`}>{total}</span>

        <div
          className={`
          absolute inset-0 flex items-center justify-center
          bg-white/10 dark:bg-dark-300/60 border border-white/30 dark:border-dark-100/30 rounded
          backdrop-blur-md z-10
          transition-opacity duration-500 ease-in-out
          ${(first && total > 0) ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        >
          <p className="text-mint-700 text-base font-semibold animate-pulse drop-shadow-lg text-center p-4">
            Schon <span className="font-bold text-green-600">{total}</span> Tippgeber {total === 1 ? "hat" : "haben"} ihre Chance genutzt – sei auch du dabei!
          </p>
        </div>
      </div>
      <WhyTrustUsButton />
    </div>
  )
}

export default Contributors
