
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
        aria-label="Main header"
        className={`2xl:rounded sticky top-0 z-[500] w-full mx-auto duration-100${scrolled ? ' sm:backdrop-blur-md sm:bg-mint-600/70 sm:shadow-lg bg-mint-600 2xl:rounded dark:bg-mint-700/70 dark:shadow-[var(--shadow-subtle-d)]' : ' bg-mint-600 dark:bg-mint-700'}`}
      >
        <nav
          className="flex justify-between rounded items-center p-2 h-12 sm:h-16 xl:h-20 lg:px-16 2xl:px-52 mx-auto"
          aria-label="Main navigation"
        >
          <div>
            <Logo />
          </div>
          <div className="flex items-center gap-4 text-white">
            <SocialMediaComponent/>
            <ThemeSwitch />
          </div>
        </nav>
        <div className="w-full mx-auto">
          <Contributors total={total} />
        </div>
      </header>
    </>
  );
}

