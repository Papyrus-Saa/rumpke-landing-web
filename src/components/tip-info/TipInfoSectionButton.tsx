import React from "react";

export const TipInfoSectionButton: React.FC = () => {
  const handleScroll = () => {
    const el = document.getElementById("tip-info");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className="text-xs px-2 py-2 rounded-xl font-semibold cursor-pointer text-red-600 shadow-subtle-l dark:shadow-subtle-d duration-200 ml-2 mt-2 2xl:ml-6 hover:bg-light-200 dark:hover:bg-dark-100 hover:shadow-none"
      aria-label="Ist mein Tipp gültig?"
    >
      Ist mein Tipp gültig?
    </button>
  );
};


