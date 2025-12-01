'use client'

import { usePathname } from 'next/navigation'
import { BackButton } from './BackButton'
import { ThemeToggle } from './ThemeToggle'

export const Header: React.FC = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {!isHome && <BackButton />}
      <ThemeToggle />
    </>
  )
}

