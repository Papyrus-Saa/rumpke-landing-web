
'use client';

import { motion } from 'framer-motion';

export default function HeroIntro() {
  return (
    <section className="flex items-center justify-center text-center px-6 py-10 dark:bg-dark-300 bg-white">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 ">
          Dein Tipp <span className='text-mint-600'>|</span> Ich <span className='text-mint-600'>schenk</span> dir was <span className='text-2xl'></span>
        </h1>

        <p className='leading-relaxed text-lg md:text-xl text-gray-700 dark:text-gray-300 xl:mb-12'>
          Wenn du jemanden kennst, der sein Haus, seine Wohnung oder sein Grundstück verkaufen möchte, erzähl es uns. Dafür bekommst du von uns ein Dankeschön.
        </p>
      </motion.div>
    </section>
  );
}
