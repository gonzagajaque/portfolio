'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  
  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">{t('notFound.title')}</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            {t('notFound.message')}
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            {t('notFound.backToProjects')}
          </Link>
        </div>
      </div>
    </Container>
  )
}

