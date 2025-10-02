'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FormPic = () => {
  const [show, setShow] = useState(true);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("contact-form");
      if (!form) return;
      const rect = form.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && show) {
        setShow(false);
        setHasBeenClosed(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [show]);

  if (hasBeenClosed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="fixed right-1 2xl:right-48 top-1/2 -translate-y-1/2 z-10 overflow-hidden border-amber-600 border rounded-xl"
        >
          <span className="bg-mint-600 dark:bg-mint-700 w-full text-xs py-1 block text-center text-white">Tipp-Formular</span>
          <div className="relative w-50 h-40">
            <Image
              src="/form-pic.png"
              alt="Formularbild"
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
