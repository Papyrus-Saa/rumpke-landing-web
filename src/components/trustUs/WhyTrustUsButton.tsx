import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhyTrustUs from "./WhyTrustUs";
import { titleFonts } from "@/config/fonts";

const WhyTrustUsButton = () => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!visible) {
      setVisible(true);
    }
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 180);
  };


  const containerRef = useRef<HTMLDivElement>(null);


  return (
    <div
      ref={containerRef}
      className="text-center p-2 hover:transition-colors hover:duration-300 duration-300 dark:bg-dark-300 bg-white dark:text-white text-dark-300 dark:border-dark-100 dark:hover:bg-dark-300 hover:bg-light-100 "
    >
      <div className="lg:px-16 xl:px-20 2xl:px-72">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleClose}
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
