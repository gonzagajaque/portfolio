'use client'

import React from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { Badge } from '../ui/Badge'
import { skills } from '@/lib/data'
import { useLanguage } from '@/contexts/LanguageContext'

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage()
  
  return (
    <Section id="skills" ariaLabel={t('skills.title')}>
      <Container>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">
            {t('skills.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {skills.map((category) => (
              <article
                key={category.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 transition-all hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-500 flex flex-col"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2 flex-1">
                  {category.items.map((skill) => (
                    <Badge key={skill} variant="neutral" size="md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
