import React from "react";
import { FaHome, FaGift, FaHandshake, FaLightbulb } from "react-icons/fa";
import { SubmitTipButton } from "./SubmitTipButton";

type TimelineStep = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const timeline: TimelineStep[] = [
  {
    icon: <FaHome className="duration-100 text-mint-600  text-3xl" />,
    title: "Rumpke Immobilien",
    desc: "Die erfahrene Immobilienagentur aus der Region – zuverlässig, transparent und persönlich.",
  },
  {
    icon: <FaLightbulb className="duration-100 text-mint-600  text-3xl" />,
    title: "Initiative: Ich schenk dir was",
    desc: "Eine Aktion von Rumpke Immobilien, um gemeinsam mit dir neue Chancen zu entdecken und echte Dankbarkeit zu zeigen.",
  },
  {
    icon: <FaHandshake className="duration-100 text-mint-600  text-3xl" />,
    title: "Gemeinsam mehr erreichen",
    desc: "Mit deinem Tipp hilfst du, Immobilienbesitzer und Interessenten zusammenzubringen – und wirst dafür belohnt.",
  },
  {
    icon: <FaGift className="duration-100  text-mint-600  text-3xl" />,
    title: "Dein Geschenk wartet",
    desc: "Für jeden erfolgreichen Tipp erhältst du eine exklusive Prämie als Dankeschön.",
  },
];

const MotivationBanner: React.FC = () => (
  <section className="py-8 sm:py-10 w-full flex flex-col items-center">
  <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-mint-600 mb-4 sm:mb-6 px-2 w-full">
      Ich schenke dir was – Eine Initiative von Rumpke Immobilien
    </h2>
    <p className="text-center text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-6 sm:mb-10 max-w-2xl w-full px-2">
      Diese Seite ist Teil einer besonderen Aktion von <span className="font-semibold text-mint-600 ">
        <a
          href="https://www.rumpke-immobilien.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rumpke Immobilien
        </a>
      </span>{" "}
      Wenn du jemanden kennst, der sein Haus, seine Wohnung oder sein Grundstück verkaufen möchte, kannst du uns einen Tipp geben – und erhältst als Dankeschön eine exklusive Prämie.
      Gemeinsam schaffen wir neue Möglichkeiten und belohnen dein Engagement!
    </p>
    <div className="duration-100 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 xl:w-[80%] 2xl:w-[70%] sm:w-[90%] w-full mx-auto relative">
      {timeline.map((step) => (
        <div
          key={step.title}
          className="duration-100 flex flex-col items-center shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] border-mint-600 rounded-2xl text-center px-3 sm:px-4 py-5 sm:py-6 relative flex-1 min-w-[220px] max-w-xs m-2 hover:bg-mint-600/20 mx-auto"
        >
          <div className="duration-100 z-10 rounded-full p-3 sm:p-4 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] mb-3 sm:mb-4 border-4 border-mint-600 flex items-center justify-center">
            {step.icon}
          </div>
          <h2 className="duration-100 text-base sm:text-lg font-semibold text-mint-600 mb-1 sm:mb-2 w-full text-center">{step.title}</h2>
          <p className="duration-100 text-gray-700 dark:text-gray-200 text-sm sm:text-base w-full text-center">{step.desc}</p>
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center w-full mt-4 sm:mt-6">
      <SubmitTipButton />
    </div>
  </section>
);

export default MotivationBanner;
