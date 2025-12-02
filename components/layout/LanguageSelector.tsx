'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeFlags, locales, type Locale } from '@/lib/i18n'

export const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-white/60 dark:hover:bg-neutral-700/50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EBEBF0] dark:focus-visible:ring-offset-dark-950 min-w-[48px] min-h-[48px] sm:min-w-[56px] sm:min-h-[56px]"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-2xl" role="img" aria-hidden="true">
          {localeFlags[locale]}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 sm:w-40 max-w-[calc(100vw-1.5rem)] rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-lg backdrop-blur-lg z-50">
          <div className="py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSelect(loc)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ${
                  locale === loc ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
                aria-label={`Select ${loc}`}
              >
                <span className="text-xl" role="img" aria-hidden="true">
                  {localeFlags[loc]}
                </span>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {loc === 'en' ? 'English' : loc === 'pt' ? 'Português' : 'Español'}
                </span>
                {locale === loc && (
                  <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

