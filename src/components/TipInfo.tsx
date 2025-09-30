
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
  <div className="w-[90%] mx-auto flex justify-center items-center py-8 lg:px-2">
    <section className="relative w-full max-w-xl mx-auto rounded bg-light-100 dark:bg-dark-200 p-4 sm:p-6 border-4 border-double border-light-200 dark:border-dark-100 duration-100 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)]">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <span className="flex justify-center items-center dark:bg-dark-300 bg-white rounded-full p-1 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] border-3 border-mint-600  duration-100">
          <MdWarningAmber className="text-mint-600  text-xl" aria-label="Warnung" />
        </span>
      </div>
      <h2 className={`text-center text-xl sm:text-2xl font-bold mb-6 mt-4 text-mint-600 ${titleFonts.className}`}>
        Wichtig für deinen Tipp!
      </h2>
      <ul className="list-none space-y-4 px-0 sm:px-2 text-base w-full">
        {rules.map((rule, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 bg-white dark:bg-dark-100 rounded-lg p-3 sm:p-4 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] duration-100 w-full text-base sm:text-lg"
          >
            <span className="mt-1 text-mint-600 dark:text-mint-700 text-lg font-bold">•</span>
            <span className={"text-gray-800 dark:text-gray-100 duration-100 break-words"}>{rule}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center text-sm text-mint-600  font-semibold">
        Bitte beachte diese Hinweise, damit dein Tipp gültig ist!
      </div>
    </section>
  </div>
);

export default TipInfo;
