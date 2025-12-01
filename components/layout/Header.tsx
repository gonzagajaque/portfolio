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
      <div className="fixed top-6 right-6 z-[60] flex items-center gap-3 pointer-events-none">
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

