'use client'

import Logo from "@/header/components/Logo"
import ThemeSwitch from "@/components/ThemeSwitch"
import { useEffect, useState } from "react"
import SocialMediaComponent from "@/components/SocialMediaComponent"
import AwardsButtonSelect from "@/components/awards/AwardsButtonSelect"
import Contributors from "@/components/contributors/Contributors"
import { useTipFormCount } from "@/components/form/hooks/useTipFormCount"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { total } = useTipFormCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`sticky top-0 z-20 w-full transition-all duration-700  mx-auto
        ${scrolled ?'sm:backdrop-blur-md sm:bg-mint-600/70 sm:shadow-lg bg-mint-600 ' : 'bg-mint-600'}
      `}
    >
      <div className="flex justify-between items-center p-2 h-12 sm:h-16 md:h-22 xl:h-26 2xl:px-52 mx-auto">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-4 text-white">
          <AwardsButtonSelect />
          <SocialMediaComponent className="hidden lg:flex" />
          <ThemeSwitch />
        </div>
      </div>
      {/* Contributors pegado al header */}
      <Contributors total={total} />
    </div>
  )
}
