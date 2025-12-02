'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export const BackButton: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  if (pathname === '/') {
    return null
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <button
      onClick={handleBack}
      className="fixed top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-[60] w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-white/60 dark:hover:bg-neutral-700/50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EBEBF0] dark:focus-visible:ring-offset-dark-950 min-w-[48px] min-h-[48px] sm:min-w-[56px] sm:min-h-[56px] pointer-events-auto"
      aria-label={t('common.buttons.back')}
    >
      <ArrowLeft size={20} strokeWidth={2} className="sm:w-6 sm:h-6" />
    </button>
  )
}

