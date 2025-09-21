import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhyTrustUs from "./WhyTrustUs";
import { titleFonts } from "@/config/fonts";

const WhyTrustUsButton = () => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
    const section = document.getElementById("why-trust-us");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setVisible(false);
  };

  // Cerrar al hacer clic fuera
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!visible) return;
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
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className="text-center p-2 hover:transition-colors hover:duration-500 duration-500 dark:bg-dark-300 bg-white dark:text-white text-dark-300 dark:border-dark-100 hover:dark:bg-gray-950 hover:bg-light-100"
    >
      <div className="lg:px-16 xl:px-20 2xl:px-72">
        <button
          onMouseLeave={handleClose}
          onMouseEnter={handleMouseEnter}
          className={`${titleFonts.className} text-xs cursor-pointer flex justify-end  text-green-500`}
        >
          Warum uns vertrauen?
        </button>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <WhyTrustUs />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhyTrustUsButton;
