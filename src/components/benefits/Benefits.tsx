import { BENEFITS, type Benefit } from "@/components/benefits/data/benefits-data";
import { titleFonts } from "@/config/fonts";


const Benefits = () => {
  return (
    <div className="w-full sm:w-[96%] lg:w-[90%] xl:w-[80%] mx-auto transition-all duration-100 mb-6">
      <section className="w-full max-w-7xl mx-auto px-4 py-8 transition-all duration-100">
        <div className="text-center mb-8 transition-all duration-100 ">
          <span className="inline-block px-4 py-1 bg-mint-600 dark:bg-mint-700 text-white text-xs font-bold tracking-widest uppercase shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] transition-all duration-100 mb-6">
            Prämienstaffel
          </span>
          <h3 className={`text-2xl font-bold text-mint-600 dark:text-mint-300 drop-shadow transition-all duration-100 mb-4 ${titleFonts.className}`}>
            Deine Belohnung für deinen Tipp
          </h3>
          <p className="text-gray-700 dark:text-gray-200 font-medium transition-all duration-100">
            Je wertvoller der Verkauf, desto exklusiver deine Prämie – entdecke unsere gestaffelten Belohnungen!
          </p>
        </div>

        <div className="w-full mt-10 mb-12 rounded-lg">
          <div className="hidden sm:block overflow-x-auto">
            <div className="rounded-lg overflow-hidden border-gradient-t-2 border-gradient-b-2 border-gradient-r-4 border-gradient-l-2 border-r border-amber-500 ">
              <table className="duration-100 min-w-full w-full bg-light-100 dark:bg-dark-200 ">
                <thead>
                  <tr>
                    <th className="duration-100 px-3 py-2 text-xs sm:text-sm font-bold text-left bg-light-200 dark:bg-dark-100 rounded-tl-lg">Stufe</th>
                    <th className="duration-100 px-3 py-2 text-xs sm:text-sm font-bold text-left bg-light-200 dark:bg-dark-100">Kaufpreis</th>
                    <th className="duration-100 px-3 py-2 text-xs sm:text-sm font-bold text-left bg-light-200 dark:bg-dark-100">Prämie</th>
                    <th className="duration-100 px-3 py-2 text-xs sm:text-sm font-bold text-left bg-light-200 dark:bg-dark-100">Beschreibung</th>
                    <th className="duration-100 px-3 py-2 text-xs sm:text-sm font-bold text-left bg-light-200 dark:bg-dark-100 rounded-tr-lg">Mögliche Prämie</th>
                  </tr>
                </thead>
                <tbody>
                  {BENEFITS.map((b, i) => {
                    const pr = b.value * 0.06;
                    const gewinn = pr * 0.07;
                    return (
                      <tr key={i} className=" hover:bg-light-200 dark:hover:bg-dark-100 transition-colors">
                        <td className="px-6 py-3 text-xs sm:text-sm align-top">{i + 1}</td>
                        <td className="px-3 py-3 text-xs sm:text-sm text-mint-600 dark:text-mint-300 align-top">{b.amount}</td>
                        <td className="duration-100 px-3 py-3 text-sm sm:text-base text-gray-800 dark:text-gray-100 align-top">{b.title}</td>
                        <td className="duration-100 px-3 py-3 text-xs text-gray-500 dark:text-gray-400 align-top">{b.desc}</td>
                        <td className="px-3 py-3 text-lg sm:text-xl font-extrabold align-top">
                          <span className="inline-block text-gradient-orange-yellow drop-shadow">
                            {gewinn.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Mobile stacked cards */}
          <div className="block sm:hidden space-y-4">
            {BENEFITS.map((b, i) => {
              const pr = b.value * 0.06;
              const gewinn = pr * 0.07;
              return (
                <div key={i} className="rounded-xl duration-100 bg-white dark:bg-dark-200 shadow p-4 flex flex-col gap-2 border border-[var(--color-light-200)] dark:border-[var(--color-dark-200)]">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Stufe</span>
                    <span className="text-xs">{i + 1}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Kaufpreis</span>
                    <span className="text-xs text-mint-600 dark:text-mint-300">{b.amount}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="duration-100 text-xs text-gray-800 dark:text-gray-100">Prämie</span>
                    <span className=" duration-100 text-xs text-gray-800 dark:text-gray-100 break-words max-w-[60%] text-right">{b.title}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="duration-100 text-xs text-gray-500 dark:text-gray-400">Beschreibung</span>
                    <span className="duration-100 text-xs text-gray-500 dark:text-gray-400 break-words max-w-full whitespace-pre-line">{b.desc}</span>
                  </div>
                  <div className="flex flex-col items-end mt-2">
                    <span className="text-xs mb-0.5">Mögliche Prämie</span>
                    <span className="text-lg font-extrabold text-gradient-orange-yellow drop-shadow">
                      {gewinn.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
