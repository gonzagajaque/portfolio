'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-locale'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [messages, setMessages] = useState<Record<string, any>>({})

  // Load locale from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && ['en', 'pt', 'es'].includes(stored)) {
      setLocaleState(stored)
    }
  }, [])

  // Load messages for current locale
  useEffect(() => {
    import(`@/messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() => setMessages({}))
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`)
        return key
      }
    }
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

