import React from 'react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import type { Experience } from '@/types'

interface TimelineItemProps {
  experience: Experience
  position: 'left' | 'right'
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ experience, position }) => {
  return (
    <div
      className={`relative flex items-center ${
        position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-dark-900 transform md:-translate-x-1/2 z-10" />

      <div
        className={`ml-12 md:ml-0 md:w-1/2 ${
          position === 'left' ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
        }`}
      >
        <Card as="article" className="h-full">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
              {experience.role}
            </h3>
            <p className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-1">
              {experience.company}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{experience.period}</p>
          </div>

          <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
            {experience.description}
          </p>

          {experience.highlights.length > 0 && (
            <ul
              className={`space-y-2 mb-4 ${
                position === 'left' ? 'md:text-right' : 'md:text-left'
              }`}
            >
              {experience.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="text-sm text-neutral-600 dark:text-neutral-400">
                  • {highlight}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            {experience.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="primary" size="sm">
                {tech}
              </Badge>
            ))}
            {experience.technologies.length > 5 && (
              <Badge variant="neutral" size="sm">
                +{experience.technologies.length - 5}
              </Badge>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
