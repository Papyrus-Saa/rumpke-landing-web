import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WhyTrustUs from "./WhyTrustUs";
import { IoCloseOutline } from "react-icons/io5";


const WhyTrustUsButton = () => {
  const [visible, setVisible] = useState(false);
  const handleMouseEnter = () => {
    if (!visible) {
      setVisible(true);
    }
  };



  return (
    <div
      className="text-center p-2 duration-100 dark:bg-dark-300 bg-white"
    >
      <div className="lg:px-16 xl:px-20 2xl:px-72">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => { }}
          className={"text-xs cursor-pointer flex justify-end  text-green-500"}
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
            className="relative"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute top-1 right-1 hover:shadow rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
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
