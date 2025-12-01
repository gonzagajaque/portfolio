'use client'

import React from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { ProjectCard } from '../features/ProjectCard'
import { getTranslatedProjects } from '@/lib/data-i18n'
import { useLanguage } from '@/contexts/LanguageContext'
import { useProjectTranslations } from '@/hooks/useProjectTranslations'

export const ProjectsSection: React.FC = () => {
  const { t, locale } = useLanguage()
  const { getTranslatedProject } = useProjectTranslations()
  const projects = getTranslatedProjects(locale)
  
  return (
    <Section id="projects" ariaLabel={t('projects.title')}>
      <Container>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">
            {t('projects.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {projects.map((project) => {
              const translatedProject = getTranslatedProject(project)
              return <ProjectCard key={project.id} project={translatedProject} />
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
