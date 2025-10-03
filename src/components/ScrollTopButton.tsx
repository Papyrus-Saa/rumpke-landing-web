"use client";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTopButton: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-2 2xl:right-52 bottom-18 2xl:bottom-6 rounded-full shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] hover:bg-mint-600 dark:hover:bg-mint-700 transition hover:text-white z-10 text-gray-500 border cursor-pointer"
      aria-label="Scroll to top"
    >
      <FiArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
