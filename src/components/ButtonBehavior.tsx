'use client'
import { useRainbow } from "@/hooks/useRainBow";
import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";

interface ScrollToFormButtonProps {
  fixed?: boolean;
}

const ScrollToFormButton: React.FC<ScrollToFormButtonProps> = ({ fixed = true }) => {
  const [show, setShow] = useState(true);
  const { triggerRainbow } = useRainbow(); // 1. Importa triggerRainbow

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("contact-form");
      if (!form) return;
      const rect = form.getBoundingClientRect();
      setShow(rect.top > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  const buttonClass = fixed
    ? "fixed right-1 w-6 h-6 flex justify-center items-center 2xl:right-52 2xl:bottom-6 bottom-1/2 text-white bg-mint-600  rounded-full shadow-lg z-10"
    : "bg-mint-600 text-white rounded-full shadow-lg z-10";

  return (
    <button
      onClick={() => {
        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
        triggerRainbow(); // 2. Activa el arcoíris
      }}
      className={` ${buttonClass} cursor-pointer`}
    >
      <FiFileText />
    </button>
  );
};

export default ScrollToFormButton;
