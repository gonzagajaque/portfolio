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
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 lg:p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">
              {t('skills.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((category) => (
                <div key={category.id}>
                  <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <Badge key={skill} variant="neutral" size="md">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
