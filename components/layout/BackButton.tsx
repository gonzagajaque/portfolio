'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const BackButton: React.FC = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-[60] w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-950 min-w-[56px] min-h-[56px] pointer-events-auto"
      aria-label="Voltar para a home"
    >
      <ArrowLeft size={24} strokeWidth={2} />
    </Link>
  )
}

