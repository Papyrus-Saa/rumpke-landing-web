import { BENEFITS } from "@/components/benefits/data/benefits-data";

const Benefits = () => {
  return (
    <div className="w-full sm:w-[90%] mx-auto transition-all duration-300">
      <section className="w-full max-w-3xl mx-auto px-4 py-8 shadow bg-light-100 dark:bg-dark-200 transition-all duration-300">
        <div className="text-center mb-8 transition-all duration-300">
          <span className="inline-block px-4 py-1 rounded-full bg-mint-100 bg-mint-600 dark:bg-mint-700 text-white text-xs font-bold tracking-widest uppercase mb-2 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] transition-all duration-300">
            Prämienstaffel
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold text-mint-700 dark:text-mint-300 mb-2 drop-shadow transition-all duration-300">
            Deine Belohnung für deinen Tipp
          </h3>
          <p className="text-lg text-gray-700  dark:text-gray-200 font-medium transition-all duration-300">
            Je wertvoller der Verkauf, desto exklusiver deine Prämie – entdecke unsere gestaffelten Belohnungen!
          </p>
        </div>
        <div className="space-y-4 transition-all duration-300">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-full sm:w-48 mb-2 sm:mb-0 transition-all duration-300">
                <span className="block text-lg sm:text-xl font-bold text-mint-600 dark:text-mint-700 transition-all duration-300">
                  {b.amount}
                </span>
                <span className="block text-base font-semibold text-gray-700 dark:text-gray-200 transition-all duration-300">
                  {b.title}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base sm:pl-6 transition-all duration-300">
                {b.desc}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center transition-all duration-300">
          <span className="inline-block px-6 py-2 rounded-full bg-mint-600 dark:bg-mint-700 text-white font-semibold shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] text-lg tracking-wide animate-pulse transition-all duration-300">
            Tipp abgeben & Prämie sichern!
          </span>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
