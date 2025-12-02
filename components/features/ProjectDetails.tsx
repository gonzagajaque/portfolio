'use client'

import React from 'react'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { ExternalLink, Globe, Calendar, Building2 } from 'lucide-react'
import { AppleIcon } from '../ui/AppleIcon'
import { AndroidIcon } from '../ui/AndroidIcon'
import type { Project } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { useProjectTranslations } from '@/hooks/useProjectTranslations'

interface ProjectDetailsProps {
  project: Project
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const { t } = useLanguage()
  const { getTranslatedProject } = useProjectTranslations()
  const translatedProject = getTranslatedProject(project)
  
  return (
    <Section id="project-details" ariaLabel={t('projects.about')}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
                    {translatedProject.title}
                  </h1>
                  <div className="flex items-center gap-2 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mb-4">
                    <Building2 size={18} />
                    <span>{translatedProject.company}</span>
                  </div>
                </div>
                <Badge variant="secondary" size="md">
                  {translatedProject.domain}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{translatedProject.period}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
                {t('projects.about')}
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                {translatedProject.description}
              </p>
            </div>

            {translatedProject.highlights && translatedProject.highlights.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
                  {t('projects.highlights')}
                </h2>
                <ul className="space-y-2">
                  {translatedProject.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                    >
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
                {t('projects.technologies')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {translatedProject.technologies.map((tech) => (
                  <Badge key={tech} variant="neutral" size="md">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {(translatedProject.iosUrl || translatedProject.androidUrl || translatedProject.webUrl || translatedProject.href) && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
                  {t('projects.links')}
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {translatedProject.iosUrl && (
                    <a
                      href={translatedProject.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white/70 dark:bg-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-700 transition-colors text-primary-600 dark:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 text-sm sm:text-base"
                      aria-label={t('projects.openAppStore')}
                    >
                      <AppleIcon size={20} />
                      <span>{t('projects.appStore')}</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {translatedProject.androidUrl && (
                    <a
                      href={translatedProject.androidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white/70 dark:bg-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-700 transition-colors text-primary-600 dark:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 text-sm sm:text-base"
                      aria-label={t('projects.openPlayStore')}
                    >
                      <AndroidIcon size={20} />
                      <span>{t('projects.playStore')}</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {translatedProject.webUrl && (
                    <a
                      href={translatedProject.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white/70 dark:bg-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-700 transition-colors text-primary-600 dark:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 text-sm sm:text-base"
                      aria-label={t('projects.openWebsite')}
                    >
                      <Globe size={20} />
                      <span>{t('projects.website')}</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {translatedProject.href && !translatedProject.iosUrl && !translatedProject.androidUrl && !translatedProject.webUrl && (
                    <a
                      href={translatedProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white/70 dark:bg-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-700 transition-colors text-primary-600 dark:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 text-sm sm:text-base"
                      aria-label={t('projects.viewProject')}
                    >
                      <Globe size={20} />
                      <span>{t('projects.viewProject')}</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

