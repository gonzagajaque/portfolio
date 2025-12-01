'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FunPage() {
  const { t } = useLanguage()
  
  return (
    <Section id="fun" ariaLabel={t('fun.title')}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 lg:p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-white">
              {t('fun.title')}
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {t('fun.description')}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

