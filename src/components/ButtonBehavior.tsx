'use client'
import { useRainbow } from "@/hooks/useRainBow";
import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";


const ScrollToFormButton: React.FC = () => {
  const [show, setShow] = useState(true);
  const { triggerRainbow } = useRainbow();

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


  return (
    <button
      className="fixed right-1 2xl:right-42 top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center overflow-visible shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] hover:shadow-[var(--shadow-subtle-l)] dark:hover:shadow-[var(--shadow-subtle-d)] transition-shadow rainbow-border-animated bg-gray-700 cursor-pointer"
      onClick={() => {
        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
        triggerRainbow();
      }}
    >
      <FiFileText className="text-white" />
    </button>
  );
};

export default ScrollToFormButton;
