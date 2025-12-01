'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/contexts/LanguageContext'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-950 min-w-[56px] min-h-[56px]"
        aria-label={t('common.buttons.toggleTheme')}
        disabled
      >
        <span className="sr-only">{t('common.buttons.loadingTheme')}</span>
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-950 min-w-[56px] min-h-[56px]"
      aria-label={isDark ? t('common.buttons.switchToLight') : t('common.buttons.switchToDark')}
      aria-pressed={isDark}
    >
      {isDark ? (
        <svg
          className="w-6 h-6 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      <span className="sr-only">{isDark ? t('common.buttons.darkThemeActive') : t('common.buttons.lightThemeActive')}</span>
    </button>
  )
}