'use client'

import { useMemo, useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Project } from '@/types'

export function useProjectTranslations() {
  const { locale } = useLanguage()
  const [projectTranslations, setProjectTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    async function loadTranslations() {
      try {
        let translations
        if (locale === 'en') {
          translations = (await import('@/messages/projects-en.json')).default
        } else if (locale === 'es') {
          translations = (await import('@/messages/projects-es.json')).default
        } else {
          translations = (await import('@/messages/projects-pt.json')).default
        }
        setProjectTranslations(translations)
      } catch (error) {
        console.error('Failed to load project translations:', error)
      }
    }
    loadTranslations()
  }, [locale])

  const getTranslatedProject = useMemo(() => {
    return (project: Project): Project => {
      const translation = projectTranslations[project.id]
      if (translation) {
        return {
          ...project,
          description: translation.description || project.description,
          highlights: translation.highlights || project.highlights,
        }
      }
      return project
    }
  }, [projectTranslations])

  return { getTranslatedProject }
}

