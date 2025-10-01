'use client'

import React from 'react';
import { useTheme } from "@/context/ThemeContext";
import styled from 'styled-components';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledWrapper>
      <div className="switch bg-dark-100 ">
        <input
          id="toggle"
          type="checkbox"
          checked={theme === 'light'}
          onChange={toggleTheme}
        />
        <label className="toggle dark:bg-dark-300 bg-mint-700" htmlFor="toggle">
          <i />
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  && .switch {
    position: relative;
    width: 60px;
    height: 28px;
    box-sizing: border-box;
    padding: 2px;
    border-radius: 99px;
    box-shadow:
      inset 0 1px 1px 1px rgba(0, 0, 0, 0.5),
      0 1px 0 0 rgba(255, 255, 255, 0.1);
  }

  && .switch input[type="checkbox"] {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  && .switch input[type="checkbox"] + label.toggle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    width: 50%;
    height: 100%;
    border-radius: 99px;
    transition: all 0.5s ease-in-out;
    margin: 0;
    padding: 0;
  }

  && .switch input[type="checkbox"] + label.toggle:before {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    vertical-align: middle;
    box-shadow:
      0 0 5px 2px rgba(233, 8, 8, 0.9),
      0 0 3px 1px rgba(218, 14, 14, 0.9);
    transition: all 0.5s ease-in-out;
  }

  && .switch input[type="checkbox"]:checked + label.toggle {
    left: 50%;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  }

  && .switch input[type="checkbox"]:checked + label.toggle:before {
    box-shadow:
      0 0 5px 2px rgba(17, 214, 89, 0.9),
      0 0 3px 1px rgba(15, 165, 70, 0.9);
  }
`;

export default ThemeSwitch;
