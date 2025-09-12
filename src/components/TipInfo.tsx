


import { titleFonts } from "@/config/fonts";
import { MdInfoOutline } from "react-icons/md";

const tipRules = [
  "Wir wissen bisher noch nichts von dem geplanten Verkauf.",
  "Das Ganze ist noch nicht offiziell ( kein Schild im Garten, keine Anzeige im Internet ).",
  "Es liegt in einer Region, in der wir aktiv sind.",
];

const TipInfo = () => (
 <div className="w-full dark:bg-dark-300 bg-white  flex lg:px-16 xl:px-20 2xl:px-70 ">
   <section className="w-full max-w-lg   mx-auto my-8 p-6  dark:bg-dark-200 dark:border-mint-400  shadow-[0_8px_32px_0_rgba(31,38,135,0.10)]">
    <div className="flex items-center justify-center mb-4 bg-mint-600">
      <MdInfoOutline className="text-mint-600 dark:text-mint-300 text-2xl mr-2" />
      <h2 className="text-lg text-white sm:text-xl font-bold text-mint-700 dark:text-mint-200">
        Wann zählt dein Tipp?
      </h2>
    </div>
    <ul className="list-disc p-2 space-y-2 text-gray-800 dark:text-gray-100 text-base">
      {tipRules.map((rule, idx) => (
        <li className={`${titleFonts.className} ""`} key={idx}>{rule}</li>
      ))}
    </ul>
  </section>
 </div>
);

export default TipInfo;
