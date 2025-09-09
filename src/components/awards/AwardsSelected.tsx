'use client'
import { titleFonts } from '@/config/fonts';
import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

type AwardsSelectedProps = { icon: React.ReactNode; title: string }


const Rainbow = styled.div<{ $active: boolean }>`
  @property --angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  --angle: 0deg;

  border: 1px solid transparent;
  border-radius: 0.5rem;
  overflow: hidden;


  ${p => p.$active ? css`
    background:
      conic-gradient(from var(--angle),
        #22c55e, #06b6d4, #6366f1, #f59e0b, #ef4444, #22c55e
      ) border-box,
      transparent padding-box;
    animation: spin .5s linear forwards;
  ` : css`
    background: transparent;
  `}

  @keyframes spin { to { --angle: 360deg; } }
`;

export default function AwardsSelected({ icon, title }: AwardsSelectedProps) {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(true)
    setTimeout(() => setActive(false), 500)
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 1500)
  }

  return (
    <Rainbow $active={active} onClick={handleClick} className="rounded-lg">
      <div className="bg-light-100 dark:bg-dark-100 shadow hover:shadow-lg w-full h-40 rounded-[calc(0.5rem-2px)]
                      flex items-center justify-center
                      hover:scale-105 transition-transform cursor-pointer hover:bg-mint-600/20">
        <div className="flex items-center flex-col justify-center">
          <div className="text-4xl md:text-4xl m-1">{icon}</div>
          <div className={`${titleFonts.className} text-center`}>{title}</div>
        </div>
      </div>
    </Rainbow>
  )
}
