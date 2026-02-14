import Image from "next/image";

const MoreInfo = () => {
  return (
    <div className="px-2 sm:px-6 md:px-8 lg:px-10 mb-10">
      <div className="duration-100 mx-auto max-w-2xl sm:w-[80%] bg-mint-600/5 p-2 shadow hover:bg-mint-600/10  dark:hover:bg-mint-600/20 hover:border-green-200 dark:hover:border-green-900/50 border border-mint-600/10 dark:border-mint-600/30">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <a
            href="https://rumpke-immobilien.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="duration-100 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-mint-600 dark:hover:bg-mint-700 hover:text-white bg-white dark:bg-dark-300 text-mint-600 font-semibold shadow-sm border border-transparent transition-colors hover:bg-mint-50  focus:outline-none focus:ring-4 focus:ring-mint-100 dark:focus:ring-mint-900 focus:ring-offset-2"
            aria-label="Mehr über uns erfahren - öffnet in neuem Tab"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
            </svg>
            <span>Mehr über uns erfahren</span>
          </a>

          <div className="flex flex-col justify-center items-center mt-2 sm:mt-0">
            <div className="flex-shrink-0 bg-mint-700 dark:bg-mint-600 p-1 rounded-md">
              <Image
                src="/QR_Rumpke-Immobilien.png"
                alt="QR Rumpke Immobilien"
                width={112}
                height={112}
                className="w-24 h-24 object-contain"
              />
            </div>
            <p className="text-xs mt-2">Rumpke Immobilien</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
