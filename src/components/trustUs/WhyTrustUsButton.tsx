import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import WhyTrustUs from "./WhyTrustUs";
import { IoCloseOutline } from "react-icons/io5";
import { FaBan } from "react-icons/fa";

import { useRainbow } from "@/hooks/useRainBow";



const WhyTrustUsButton = () => {
  const pathname = usePathname();
  const { triggerRainbow } = useRainbow();
  const [visible, setVisible] = useState(false);

  if (pathname !== "/") return null;

  const handleClick = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      triggerRainbow();
    }
  };

  const handleMouseEnter = () => {
    if (!visible) {
      setVisible(true);
    }
  };

  return (
    <div
      className="text-center p-2 duration-100 dark:bg-dark-100 bg-light-100 hover:bg-mint-600/40"
    >
      <div className="w-full justify-between flex  lg:px-16 xl:px-20 2xl:px-72">
        <button
          disabled
          title="Wartungsarbeiten – bald wieder verfügbar"
          onClick={handleMouseEnter}
          className={"duration-100 text-xs cursor-not-allowed flex justify-end items-center font-semibold text-green-600 hover:text-green-400 select-none gap-2"}
        >
          <FaBan className="text-red-500" />
          Warum uns vertrauen?
        </button>
        <button
          onClick={handleClick}
          className={"duration-100 text-xs cursor-pointer  text-green-600 font-semibold hover:text-green-400 select-none"}
        >
          Jetzt Tipp abgeben
        </button>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute sm:top-1 sm:right-1 top-2 right-2 hover:shadow rounded-full text-black hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:text-white cursor-pointer"
            >
              <IoCloseOutline size={24} />
            </button>
            <WhyTrustUs />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhyTrustUsButton;
