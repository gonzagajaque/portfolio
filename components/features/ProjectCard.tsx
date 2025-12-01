import React from 'react'
import { Badge } from '../ui/Badge'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 transition-all hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-500">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-300">{project.company}</p>
            </div>
            <Badge variant="secondary" size="sm">
              {project.domain}
            </Badge>
          </div>

          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
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

          <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.period}</p>
        </div>
      </div>
    </article>
  )
}

