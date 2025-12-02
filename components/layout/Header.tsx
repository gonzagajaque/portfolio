'use client'

import { usePathname } from 'next/navigation'
import { BackButton } from './BackButton'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'

export const Header: React.FC = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {!isHome && <BackButton />}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-[60] flex items-center gap-2 sm:gap-3 pointer-events-none">
        <div className="pointer-events-auto">
          <LanguageSelector />
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}

