'use client'

import React from 'react';
import { useTheme } from "@/context/ThemeContext";
import styled from 'styled-components';
import { RiSunLine, RiMoonClearLine } from 'react-icons/ri';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-9 h-9 p-0 bg-transparent border-none rounded-md cursor-pointer
                text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20
                dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10 dark:focus:ring-white/20
                transition-all duration-200 ease-out"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <RiSunLine className="w-5 h-5 transition-transform duration-200 ease-out hover:rotate-12" />
      ) : (
        <RiMoonClearLine className="w-5 h-5 transition-transform duration-200 ease-out hover:rotate-12" />
      )}
    </button>
  );
}

const StyledWrapper = styled.div``;
`;
`;

export default ThemeSwitch;
