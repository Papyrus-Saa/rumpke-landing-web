import { titleFonts } from "@/config/fonts";
import { MdWarningAmber } from "react-icons/md";

const tipRules = [
  "Wir wissen bisher noch nichts von dem geplanten Verkauf.",
  "Das Ganze ist noch nicht offiziell (kein Schild im Garten, keine Anzeige im Internet).",
  "Es liegt in einer Region, in der wir aktiv sind.",
];

const TipInfo = () => (
  <div className="w-full flex justify-center items-center py-8 px-2">
    <section className="relative w-full max-w-xl mx-auto rounded bg-light-100 dark:bg-dark-200
      p-6 border-4 border-double border-light-200 dark:border-dark-100  duration-500">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <span className="flex justify-center items-center dark:bg-dark-300 bg-white rounded-full p-1 shadow-lg border-3 border-mint-600  duration-500">
          <MdWarningAmber className="text-mint-600 text-xl" />
        </span>
      </div>
      <h2 className={`text-center text-xl sm:text-2xl font-bold mb-6 mt-4 text-mint-600 dark:text-mint-600 ${titleFonts.className}`}>
        Wichtig für deinen Tipp!
      </h2>
      <ul className="list-none space-y-4 px-2 text-base">
        {tipRules.map((rule, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3  bg-white dark:bg-dark-100 rounded-lg p-3 shadow  duration-500"
          >
            <span className="mt-1 text-mint-600 text-lg font-bold">•</span>
            <span className={`${titleFonts.className} text-gray-800 dark:text-gray-100  duration-500`}>{rule}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center text-sm text-mint-600 font-semibold">
        Bitte beachte diese Hinweise, damit dein Tipp gültig ist!
      </div>
    </section>
  </div>
);

export default TipInfo;
