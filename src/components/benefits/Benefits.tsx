
import { BENEFITS } from "@/components/benefits/data/benefits-data";


const Benefits = () => {
  return (
    <div className="w-full sm:w-[90%] mx-auto">
      <section className="w-full max-w-3xl mx-auto px-4 py-8 shadow bg-light-100 dark:bg-dark-200">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-mint-100 bg-mint-600 text-white text-xs font-bold tracking-widest uppercase mb-2 shadow-sm">
            Prämienstaffel
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold text-mint-700 dark:text-mint-300 mb-2 drop-shadow">
            Deine Belohnung für deinen Tipp
          </h3>
          <p className="text-lg text-gray-700  dark:text-gray-200 font-medium">
            Je wertvoller der Verkauf, desto exklusiver deine Prämie – entdecke unsere gestaffelten Belohnungen!
          </p>
        </div>
        <div className="space-y-4">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-dark-100 px-5 py-4 shadow-md hover:scale-[1.02] transition-transform "
            >
              <div className="flex-shrink-0 w-full sm:w-48 mb-2 sm:mb-0 ">
                <span className="block text-lg sm:text-xl font-bold text-mint-600 dark:text-mint-400">
                  {b.amount}
                </span>
                <span className="block text-base font-semibold text-gray-700 dark:text-gray-200">
                  {b.title}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base sm:pl-6">
                {b.desc}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <span className="inline-block px-6 py-2 rounded-full bg-mint-600 text-white font-semibold shadow-lg text-lg tracking-wide animate-pulse">
            Tipp abgeben & Prämie sichern!
          </span>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
