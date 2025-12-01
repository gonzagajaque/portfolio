'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '../ui/Badge'
import { Globe } from 'lucide-react'
import { AppleIcon } from '../ui/AppleIcon'
import { AndroidIcon } from '../ui/AndroidIcon'
import type { Project } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage()
  
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <article className="group h-full">
      <Link
        href={`/projects/${project.id}`}
        className="h-full rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 transition-all hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-500 cursor-pointer flex flex-col"
      >
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-base text-neutral-600 dark:text-neutral-300">{project.company}</p>
                <Badge variant="secondary" size="sm">
                  {project.domain}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={handleLinkClick}>
              {project.iosUrl && (
                <a
                  href={project.iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
                  aria-label={t('projects.openAppStore')}
                >
                  <AppleIcon size={28} />
                </a>
              )}
              {project.androidUrl && (
                <a
                  href={project.androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                  aria-label={t('projects.openPlayStore')}
                >
                  <AndroidIcon size={28} />
                </a>
              )}
              {project.webUrl && (
                <a
                  href={project.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  aria-label={t('projects.openWebsite')}
                >
                  <Globe size={28} />
                </a>
              )}
              {project.href && !project.iosUrl && !project.androidUrl && !project.webUrl && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  aria-label={t('projects.viewProject')}
                >
                  <Globe size={28} />
                </a>
              )}
            </div>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed line-clamp-4 overflow-hidden">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="neutral" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="neutral" size="sm">
                +{project.technologies.length - 5}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.period}</p>
          </div>
        </div>
      </Link>
    </article>
  )
}

