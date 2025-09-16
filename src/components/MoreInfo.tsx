const MoreInfo = () => {
  return (
    <div className="flex justify-center my-8">
      <a
        href="https://rumpke-immobilien.de/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2
          px-6 py-3 rounded-full
          bg-mint-600 text-white font-semibold
          shadow-md hover:shadow-lg
          transition-all duration-200
          hover:bg-mint-700 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-mint-600 focus:ring-offset-2
        "
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 3h7v7m0 0L10 21l-7-7 11-11z"
          />
        </svg>
        Mehr über uns erfahren
      </a>
    </div>
  )
}

export default MoreInfo
