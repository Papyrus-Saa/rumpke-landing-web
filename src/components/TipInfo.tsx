
import { titleFonts } from "@/config/fonts";
import { MdWarningAmber } from "react-icons/md";

export interface TipInfoProps {
  rules?: string[];
}

const defaultRules = [
  "Wir wissen bisher noch nichts von dem geplanten Verkauf.",
  "Das Ganze ist noch nicht offiziell (kein Schild im Garten, keine Anzeige im Internet).",
  "Es liegt in einer Region, in der wir aktiv sind.",
];

const TipInfo = ({ rules = defaultRules }: TipInfoProps) => (
  <div className="w-[90%] mx-auto flex justify-center items-center py-8 lg:px-2 mb-6">
    <section className="relative w-full max-w-xl mx-auto rounded bg-light-100 dark:bg-dark-200 p-4 sm:p-6 border-4 border-double border-light-200 dark:border-dark-100 duration-100 shadow dark:shadow-subtle-d">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <span className="flex justify-center items-center dark:bg-dark-300 bg-light-100 rounded-full p-1 border-3 border-mint-600  duration-100">
          <MdWarningAmber className="text-mint-600  text-xl" aria-label="Warnung" />
        </span>
      </div>
      <h2 className={`text-center text-xl sm:text-2xl font-bold mb-6 mt-4 text-mint-600 ${titleFonts.className}`}>
        Wichtig für deinen Tipp!
      </h2>
      <ul className="list-none space-y-4 px-0 sm:px-2 text-base w-full  py-2">
        {rules.map((rule, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3  dark:bg-dark-100 rounded-lg p-3 sm:p-4 bg-white duration-100 w-full text-base sm:text-lg"
          >
            <span className="mt-1 text-mint-600 dark:text-mint-700 text-lg font-bold">•</span>
            <span className={"text-gray-800 dark:text-gray-100 duration-100 break-words"}>{rule}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center text-sm text-red-600  font-semibold">
        Bitte beachte diese Hinweise, damit dein Tipp gültig ist!
      </div>
    </section>
  </div>
);

export default TipInfo;

