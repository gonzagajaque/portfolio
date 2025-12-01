export interface Project {
  id: string
  title: string
  company: string
  description: string
  technologies: string[]
  domain: string
  period: string
  highlights: string[]
  href?: string
  iosUrl?: string
  androidUrl?: string
  webUrl?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
  highlights: string[]
  domain?: string
}

export interface SkillCategory {
  id: string
  name: string
  items: string[]
}

