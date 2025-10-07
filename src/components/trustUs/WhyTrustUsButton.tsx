import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhyTrustUs from "./WhyTrustUs";
import { IoCloseOutline } from "react-icons/io5";
import { SubmitTipButton } from "../SubmitTipButton";
import { useRainbow } from "@/hooks/useRainBow";



const WhyTrustUsButton = () => {

    const { triggerRainbow } = useRainbow();

    const handleClick = () => {
      const el = document.getElementById('contact-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        triggerRainbow();
      }
    };

  const [visible, setVisible] = useState(false);
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => { }}
          className={"text-xs cursor-pointer flex justify-end  text-green-500"}
        >
          Warum uns vertrauen?
        </button>
        <button
          onMouseEnter={handleClick}
          className={"text-xs cursor-pointer flex justify-end text-gradient-orange-yellow border-l-4 border-r-4 px-2 border-amber-600 rounded-xl hover:border-amber-500"}
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
              className="absolute sm:top-1 sm:right-1 top-2 right-2 hover:shadow rounded-full text-white hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
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
