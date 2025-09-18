'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

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


  if (!show || hasBeenClosed) return null;

  return (
    <div className="fixed right-1 2xl:right-48 top-1/2 -translate-y-1/2 z-10 overflow-hidden shadow-[0_12px_48px_0_rgba(44,62,80,0.35),0_8px_32px_0_rgba(0,0,0,0.25)] dark:shadow-[0_12px_48px_0_rgba(255,255,255,0.18),0_8px_32px_0_rgba(180,180,180,0.12)] rainbow-border-animated">
      <span className="bg-mint-600 w-full text-xs py-1 block text-center text-gray-400">Tipp-Formular</span>
      <div className="relative w-30 h-40">
        <Image
          src="/form-pic.png"
          alt="Formularbild"
          fill
          className="object-cover"
          sizes="80px"
          priority
        />
      </div>
    </div>
  );
}
