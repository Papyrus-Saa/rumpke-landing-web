'use client'
import { titleFonts } from '@/config/fonts';
import React, { useState } from 'react'



type AwardsSelectedProps = { icon: React.ReactNode; title: string }




export default function AwardsSelected({ icon, title }: AwardsSelectedProps) {


  const handleClick = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (

    <div
      onClick={handleClick}
      className="bg-light-100 dark:bg-dark-100 shadow hover:shadow-lg w-full h-40 rounded-[calc(0.5rem-2px)]
                      flex items-center justify-center
                      hover:scale-105 transition-transform cursor-pointer hover:bg-mint-600/20">
      <div className="flex items-center flex-col justify-center">
        <div className="text-4xl md:text-4xl m-1">{icon}</div>
        <div className={`${titleFonts.className} text-center`}>{title}</div>
      </div>
    </div>

  )
}
