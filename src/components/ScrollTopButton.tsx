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
      className="fixed right-1 bottom-20  p-1 rounded-full shadow-lg hover:bg-mint-700 transition z-10 dark:bg-dark-200 text-gray-500 dark:shadow-subtle-d border cursor-pointer"
      aria-label="Scroll to top"
    >
      <FiArrowUp className="text-xl" />
    </button>
  );
};

export default ScrollToTopButton;
