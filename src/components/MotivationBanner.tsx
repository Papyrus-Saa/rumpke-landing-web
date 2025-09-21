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
    icon: <FaHome className="text-mint-600 text-3xl" />,
    title: "Rumpke Immobilien",
    desc: "Die erfahrene Immobilienagentur aus der Region – zuverlässig, transparent und persönlich.",
  },
  {
    icon: <FaLightbulb className="text-mint-600 text-3xl" />,
    title: "Initiative: Ich schenk dir was",
    desc: "Eine Aktion von Rumpke Immobilien, um gemeinsam mit dir neue Chancen zu entdecken und echte Dankbarkeit zu zeigen.",
  },
  {
    icon: <FaHandshake className="text-mint-600 text-3xl" />,
    title: "Gemeinsam mehr erreichen",
    desc: "Mit deinem Tipp hilfst du, Immobilienbesitzer und Interessenten zusammenzubringen – und wirst dafür belohnt.",
  },
  {
    icon: <FaGift className="text-mint-600 text-3xl" />,
    title: "Dein Geschenk wartet",
    desc: "Für jeden erfolgreichen Tipp erhältst du eine exklusive Prämie als Dankeschön.",
  },
];

const MotivationBanner: React.FC = () => (
  <section className=" py-10  w-full">
    <h2 className="text-center text-2xl md:text-3xl font-bold text-mint-700 dark:text-mint-400 mb-6">
      Ich schenk dir was – Eine Initiative von Rumpke Immobilien
    </h2>
    <p className="text-center text-lg text-gray-700 dark:text-gray-200 mb-10 max-w-2xl mx-auto">
      Diese Seite ist Teil einer besonderen Aktion von <span className="font-semibold text-mint-600">
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
    <div className="duration-500 flex flex-col md:flex-row items-center justify-center gap-0 xl:w-[80%] 2xl:w-[70%] sm:w-[90%] mx-auto relative mb-6 ">
      {timeline.map((step) => (
        <div
          key={step.title}
          className=" duration-500 flex flex-col items-center shadow-mint-600 shadow hover:shadow-xl transition-shadow border-mint-600 rounded-2xl text-center px-4 py-6 relative flex-1  m-2 hover:bg-mint-600/20"
        >
          <div className="duration-500 z-10 rounded-full p-4 shadow-lg mb-4 border-4 border-mint-200  dark:border-mint-700">
            {step.icon}
          </div>
          <h3 className="duration-500 text-lg font-semibold text-mint-700 dark:text-mint-400 mb-2">{step.title}</h3>
          <p className="duration-500 text-gray-700 dark:text-gray-200 text-base ">{step.desc}</p>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <SubmitTipButton />
    </div>
  </section>
);

export default MotivationBanner;
