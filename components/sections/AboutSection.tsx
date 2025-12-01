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
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 lg:p-10 mb-12">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            <article className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 transition-all hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-500 flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
                {t('common.labels.languages')}
              </h3>
              <div className="flex flex-col flex-1">
                {t('about.languages').split(', ').map((language, index, array) => (
                  <p key={index} className={`text-lg text-neutral-600 dark:text-neutral-300 ${index < array.length - 1 ? 'mb-2' : ''}`}>
                    {language}
                  </p>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 transition-all hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-500 flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
                {t('common.labels.education')}
              </h3>
              <div className="flex flex-col flex-1">
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2">{t('about.education1')}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{t('about.education1Period')}</p>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2">{t('about.education2')}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('about.education2Period')}</p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </Section>
  )
}
