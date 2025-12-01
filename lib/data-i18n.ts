import type { Project, Experience, SkillCategory } from '@/types'
import type { Locale } from './i18n'
import { projects, experiences, skills } from './data'

// Helper function to translate periods
export function translatePeriod(period: string, locale: Locale): string {
  if (locale === 'en') {
    return period
      .replace('Presente', 'Present')
      .replace('Maio 2025', 'May 2025')
  }
  if (locale === 'es') {
    return period
      .replace('Presente', 'Presente')
      .replace('Maio 2025', 'Mayo 2025')
  }
  return period // pt (default)
}

// Load project translations
async function loadProjectTranslations(locale: Locale) {
  try {
    if (locale === 'en') {
      return (await import('@/messages/projects-en.json')).default
    } else if (locale === 'es') {
      return (await import('@/messages/projects-es.json')).default
    } else {
      return (await import('@/messages/projects-pt.json')).default
    }
  } catch {
    return {}
  }
}

// Get translated projects
export function getTranslatedProjects(locale: Locale): Project[] {
  // For client-side, we'll use a synchronous approach with dynamic imports
  // This will be handled by the component using useMemo or useEffect
  return projects.map((project) => ({
    ...project,
    period: translatePeriod(project.period, locale),
  }))
}

// Get project translations for a specific project
export function getProjectTranslations(projectId: string, locale: Locale) {
  // This will be called from client components
  // For now, return the project as-is and let components handle translation
  const project = projects.find((p) => p.id === projectId)
  if (!project) return null
  
  return {
    description: project.description,
    highlights: project.highlights,
  }
}

export function getTranslatedExperiences(locale: Locale): Experience[] {
  return experiences.map((experience) => ({
    ...experience,
    period: translatePeriod(experience.period, locale),
    // descriptions and highlights can be translated here in the future
  }))
}

export function getTranslatedSkills(locale: Locale): SkillCategory[] {
  // Skills are mostly technical terms that don't need translation
  // But category names could be translated if needed
  return skills
}

