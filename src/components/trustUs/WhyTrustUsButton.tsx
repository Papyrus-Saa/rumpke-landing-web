import { useState, useRef, useEffect } from "react";
import WhyTrustUs from "./WhyTrustUs";
import { titleFonts } from "@/config/fonts";

const WhyTrustUsButton = () => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const handleClick = () => {
      const section = document.getElementById("why-trust-us");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShouldRender(true);
    setVisible(true);
    handleClick();
  };


  const handleClose = () => {
    setVisible(false);
    timeoutRef.current = setTimeout(() => setShouldRender(false), 300);
  };

  // Cerrar al hacer clic fuera
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!shouldRender) return;
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [shouldRender]);

  return (
    <div
      ref={containerRef}
      className="text-center py-2 hover:transition-colors hover:duration-500 dark:bg-dark-300 bg-white dark:text-white text-dark-300 dark:border-dark-100 hover:dark:bg-gray-950 hover:bg-light-100 cursor-pointer"
    >
      <div className="lg:px-16 xl:px-20 2xl:px-72">
        <button
          onMouseLeave={handleClose}
          onMouseEnter={handleMouseEnter}
          className={`${titleFonts.className} text-xs cursor-pointer flex justify-end mb-6 md:mb-0 text-green-500`}
        >
          Warum uns vertrauen?
        </button>
      </div>
      {shouldRender && (
        <div
          className={`transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <WhyTrustUs />
        </div>
      )}
    </div>
  );
};

export default WhyTrustUsButton;
