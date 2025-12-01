'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const BASE_PATH = '/portfolio'

export default function ResumePage() {
  const { t } = useLanguage()
  
  return (
    <Section id="resume" ariaLabel={t('resume.title')}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 lg:p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-white">
              {t('resume.title')}
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
              {t('resume.description')}
            </p>
            <a
              href={`${BASE_PATH}/curriculo_jaqueline_gonzaga.pdf`}
              download="curriculo_jaqueline_gonzaga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <Download size={24} />
              <span className="text-lg font-medium">{t('resume.download')}</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}

