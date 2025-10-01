'use client';

const keywords = [
  "Immobilien",
  "Verkauf",
  "Tippgeber",
  "Attraktive Prämien sichern",
  "Sicherheit bei jedem Schritt",
  "Vertrauen und Transparenz",
  "Persönlicher Service",
  "Gemeinsam zum Erfolg",
  "Professionelle Beratung",
  "Diskrete Vermittlung",
  "Rumpke – Ihr starker Partner",
  "Jetzt Tipp abgeben und Vorteile sichern",
];

export default function KeywordCarousel() {
  return (
    <div className="w-full hidden 2xl:block h-5 overflow-hidden relative transition-colors">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="whitespace-nowrap animate-keyword-scroll flex items-center h-4">
          {keywords.map((word, idx) => (
            <span
              key={idx}
              className="duration-100 mx-4 text-xs sm:text-sm dark:text-[rgba(0,255,180,0.20)] text-gray-400"
            >
              {word}
            </span>
          ))}
          {keywords.map((word, idx) => (
            <span
              key={`dup-${idx}`}
              className="duration-100 mx-4 text-xs sm:text-sm dark:text-[rgba(0,255,180,0.20)] text-gray-400"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes keyword-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-keyword-scroll {
          animation: keyword-scroll 62s linear infinite;
        }
      `}</style>
    </div>
  );
}
