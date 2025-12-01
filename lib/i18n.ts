export type Locale = 'en' | 'pt' | 'es'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'pt', 'es']

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
  es: '🇪🇸',
}

