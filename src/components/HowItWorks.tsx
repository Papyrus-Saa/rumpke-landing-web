import React from 'react';
import { FiCheckCircle, FiGift, FiHome, FiSearch } from 'react-icons/fi';
import { titleFonts } from '@/config/fonts';
import Image from 'next/image';

const steps = [
  {
    icon: <FiCheckCircle />,
    title: "Du hörst von einem geplanten Verkauf",
    className: 'shadow-subtle-l dark:shadow-subtle-d',
  },
  {
    icon: <FiHome />,
    title: "Du meldest uns den Tipp",
    className: 'shadow-subtle-l dark:shadow-subtle-d',
  },
  {
    icon: <FiSearch />,
    title: "Wir kümmern uns um den Rest",
    className: 'shadow-subtle-l dark:shadow-subtle-d',
  },
  {
    icon: <FiGift />,
    title: "Kommt der Verkauf zustande, bekommst du dein Geschenk",
    className: 'shadow-subtle-l dark:shadow-subtle-d',
  },
];

const HowItWorks = () => (
  <div className='py-8 w-[90%] mx-auto'>
    <h1 className="text-xl md:text-3xl text-center  font-bold mt- mb-6">
      Dein Tipp <span style={{ color: '#005A73' }}> | </span> Ich <span style={{ color: '#005A73' }}>schenke</span> dir was <span className='text-2xl'></span>
    </h1>
    <div className="dark:bg-dark-200 bg-light-100 w-full xl:w-[80%] 2xl:w-[70%] lg:p-6 mb-6 mx-auto shadow border dark:border-dark-100 rounded-lg border-light-200 transition-all duration-100">
      <h3 className={`${titleFonts.className} py-1 ml-2 mb-4 sm:text-lg text-center`}>
        So einfach geht<span className="text-mint-600">&apos;</span>s
      </h3>
      <div className="relative bg-white dark:bg-dark-300 transition-all duration-100 p-4 flex flex-col lg:flex-row justify-center items-center gap-6">
        <div className="w-full lg:w-1/2 flex items-center">
          <ul className="space-y-4 mb-6 lg:mb-0 w-full">
            {steps.map((step, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-4 rounded-xl px-4 w-full py-4 mx-auto bg-light-100 dark:bg-dark-200 transition-all duration-100 text-base sm:text-lg ${step.className}`}
              >
                <span className="sm:text-2xl text-mint-600 dark:text-mint-200">{step.icon}</span>
                <span>{step.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Image
            src="/howItWorksPic.jpg"
            alt="How it works"
            width={360}
            height={320}
            className="rounded shadow w-full max-w-xs sm:max-w-sm lg:max-w-md"
            sizes="(max-width: 1024px) 80vw, 360px"
          />
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks;
