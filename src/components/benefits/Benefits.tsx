import { BENEFITS, type Benefit } from "@/components/benefits/data/benefits-data";
import { FiArrowDown } from "react-icons/fi";

const Benefits = () => {
  return (
    <div className="w-full sm:w-[96%] lg:w-[90%] xl:w-[80%] mx-auto transition-all duration-100 mb-6">
      <section className="w-full max-w-7xl mx-auto px-4 py-8 transition-all duration-100">
        <div className="text-center mb-8 transition-all duration-100">
          <span className="inline-block px-4 py-1 rounded bg-mint-600 dark:bg-mint-700 text-white text-xs font-bold tracking-widest uppercase shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] transition-all duration-100 mb-6">
            Prämienstaffel
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold text-mint-600 dark:text-mint-300 drop-shadow transition-all duration-100 mb-4">
            Deine Belohnung für deinen Tipp
          </h3>
          <p className="text-lg text-gray-700  dark:text-gray-200 font-medium transition-all duration-100">
            Je wertvoller der Verkauf, desto exklusiver deine Prämie – entdecke unsere gestaffelten Belohnungen!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 transition-all duration-100">
          {BENEFITS.map((b: Benefit, i) => {
            const pr = b.value * 0.06;
            const gewinn = pr * 0.05;
            const bgClass = 'bg-light-100 dark:bg-dark-200 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)]';
            return (
              <div
                key={i}
                className={`group relative flex flex-col items-center justify-between px-3 py-5 sm:px-6 sm:py-7 rounded-2xl ${bgClass} hover:scale-[1.01] transition-all duration-150 w-full`}
              >
                <div className="flex flex-col items-center mb-1 w-full">
                  <span className="text-lg sm:text-xl font-bold text-mint-600 dark:text-mint-300 tracking-tight">
                    {b.amount}
                  </span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200 text-center mt-0.5">
                    {b.title}
                  </span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs text-center max-w-xs mb-2 w-full">
                  {b.desc}
                </div>
                <div className="flex flex-col items-center my-4 ">
                  <FiArrowDown className="" size={28} strokeWidth={1.2} />
                </div>
                <div className="flex flex-col items-center mt-1 w-full">
                  <span
                    className="text-xs font-semibold  mb-0.5"
                  >
                    Für {b.amount} würdest du erhalten:
                  </span>
                  <span
                    className="text-xl sm:text-2xl font-extrabold text-mint-600 dark:text-mint-300 text-center drop-shadow transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-fuchsia-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent"
                    title="Dein möglicher Gewinn (Kaufpreis x 6% x 5%)"
                  >
                    {gewinn.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    ({b.amount})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Benefits;
