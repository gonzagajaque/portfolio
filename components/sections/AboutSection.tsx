'use client'

import React from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { useLanguage } from '@/contexts/LanguageContext'

export const AboutSection: React.FC = () => {
  const { t } = useLanguage()
  
  return (
    <Section id="me" ariaLabel={t('about.title')}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 lg:p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-white">
              {t('about.title')}
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                {t('about.description1')}
              </p>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                {t('about.description2')}
              </p>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                {t('about.description3')}
              </p>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {t('about.description4')}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">{t('common.labels.location')}</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-300">{t('about.location')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">{t('common.labels.languages')}</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-300">{t('about.languages')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">{t('common.labels.education')}</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2">{t('about.education1')}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('about.education1Period')}</p>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2 mt-4">{t('about.education2')}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('about.education2Period')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">{t('common.labels.contact')}</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2">{t('common.labels.email')}: jaquelinesgonzaga@gmail.com</p>
                <p className="text-lg text-neutral-600 dark:text-neutral-300">{t('common.labels.phone')}: +55 65 99287-8328</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
