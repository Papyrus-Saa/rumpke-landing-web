"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiAirplaneTilt, PiCookingPot, PiBicycle, PiShoppingCart } from "react-icons/pi";

const awards = [
  {
    name: "E-Bike",
    icon: PiBicycle,
    description: "Umweltfreundlich & Modern"
  },
  {
    name: "Shopping-Gutschein",

    icon: PiShoppingCart,
    description: "Für Ihren Wunschkauf"
  },
  {
    name: "Traumküche",

    icon: PiCookingPot,
    description: "Kochen mit Stil"
  },
  {
    name: "Traumurlaub",
    icon: PiAirplaneTilt,
    description: "Ihre perfekte Auszeit"
  }
];

const AwardsSection = () => {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  const handleCardClick = () => {
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full py-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center text-base sm:text-xl font-medium text-gradient-orange-yellow mb-6"
          >
            Unsere Prämien für Ihre wertvollen Tipps
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-1">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={award.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 50,
                    damping: 10
                  }}
                  whileHover={{
                    y: -5,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  className="group relative cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={handleCardClick}
                  onMouseEnter={() => setHoveredCard(award.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {hoveredCard === award.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 dark:bg-light-200 text-white dark:text-black px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                    >
                      Klicken für mehr Info
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full
                                   border-l-[8px] border-l-transparent
                                   border-t-[8px] border-t-black/90
                                   border-r-[8px] border-r-transparent" />
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-mint-green opacity-0 blur-xl group-hover:opacity-10 dark:group-hover:opacity-20 transition-all duration-700 ease-out" />
                  <div className="duration-100 relative bg-light-100 dark:bg-dark-200 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center h-full shadow-lg shadow-mint-600/10 dark:shadow-mint-700 border border-mint-600/10 dark:border-mint-700/10 overflow-hidden hover:shadow-amber-600 hover:shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-mint-green transform origin-left scale-x-0 group-hover:scale-x-100 dark:group-hover:opacity-80 transition-transform duration-500" />

                    <motion.div
                      className="text-3xl md:text-4xl mb-3 t"
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: index + 3,
                        ease: "easeInOut",
                        repeatType: "reverse"
                      }}
                    >
                      <Icon />
                    </motion.div>

                    <span className="text-xs md:text-sm font-medium ">
                      {award.name}
                    </span>
                    <span className="text-[10px] md:text-xs  mt-1 text-center">
                      {award.description}
                    </span>

                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-mint-green opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transform translate-y-full group-hover:translate-y-0 transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <span className="inline-flex items-center gap-2 text-sm">
              <span className="w-12 h-[1px] bg-gradient-orange-yellow opacity-50" />
              Für erfolgreiche Immobilientipps
              <span className="w-12 h-[1px] bg-gradient-orange-yellow opacity-50" />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AwardsSection;
