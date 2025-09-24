
'use client'

import Logo from "@/header/components/Logo"
import ThemeSwitch from "@/components/ThemeSwitch"
import SocialMediaComponent from "@/components/SocialMediaComponent"
import Contributors from "@/components/contributors/Contributors"
import { useTipFormCount } from "@/components/form/hooks/useTipFormCount"
import { useScrolled } from "@/hooks/useScrolled"



const SCROLL_THRESHOLD = 8


export default function Header() {
  const scrolled = useScrolled(SCROLL_THRESHOLD)
  const { total } = useTipFormCount()

  return (
    <>
      <header
        role="banner"
        aria-label="Encabezado principal"
        className={`sticky top-0 z-20 w-full mx-auto duration-300${scrolled ? ' sm:backdrop-blur-md sm:bg-mint-600/70 sm:shadow-lg bg-mint-600 dark:bg-mint-700/70 dark:shadow-[var(--shadow-subtle-d)]' : ' bg-mint-600 dark:bg-mint-700'}`}
      >
        <nav
          className="flex justify-between items-center p-2 h-12 sm:h-16 xl:h-20 lg:px-16 2xl:px-52 mx-auto"
          aria-label="Navegación principal"
        >
          <div>
            <Logo />
          </div>
          <div className="flex items-center gap-4 text-white">
            <SocialMediaComponent className="hidden lg:flex" />
            <ThemeSwitch />
          </div>
        </nav>
      </header>
      <div className="w-full mx-auto">
        <Contributors total={total} />
      </div>
    </>
  );
}

