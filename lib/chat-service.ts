import { projects, experiences, skills } from './data'
import type { Locale } from './i18n'

interface ChatResponse {
  answer: string
  relatedProjects?: string[]
  relatedExperiences?: string[]
}

// Keywords mapping for different topics
const keywordMap: Record<string, string[]> = {
  // Technologies
  'react native': ['react native', 'reactnative', 'react-native', 'rn'],
  'typescript': ['typescript', 'ts', 'typescript'],
  'flutter': ['flutter', 'dart'],
  'accessibility': ['acessibilidade', 'accessibility', 'a11y', 'wcag', 'talkback', 'voiceover', 'screen reader', 'leitor de tela'],
  'security': ['segurança', 'security', 'obfuscação', 'obfuscation', 'encryption', 'criptografia', 'hardening'],
  
  // Companies/Projects
  'gympass': ['gympass', 'wellhub', 'yoga design system'],
  'enor': ['enor', 'crypto', 'cripto', 'wallet', 'carteira', 'enor securities'],
  'maistodos': ['maistodos', 'cartão de todos', 'mais todos', 'cartao de todos'],
  'renner': ['renner', 'datum', 'lojas renner'],
  'liberali': ['liberali', 'offline', 'sqlite'],
  'osiris': ['osiris', 'agtech', 'hidroponia', 'hydroponics'],
  'trinus': ['trinus', 'imóveis', 'real estate', 'investimentos', 'investments'],
  
  // Domains
  'fintech': ['fintech', 'financeiro', 'finance', 'carteira digital', 'digital wallet', 'banking'],
  'healthcare': ['healthcare', 'saúde', 'health', 'agendamento', 'appointment', 'medical', 'médico'],
  'agritech': ['agritech', 'agro', 'agricultura', 'agriculture', 'hidroponia', 'hydroponics', 'fazenda', 'farm'],
  'logistics': ['logística', 'logistics', 'frete', 'freight', 'caminhões', 'trucks', 'supply chain'],
  'ecommerce': ['e-commerce', 'ecommerce', 'varejo', 'retail', 'shopping'],
  
  // Skills
  'mobile': ['mobile', 'app', 'aplicativo', 'ios', 'android', 'smartphone'],
  'testing': ['teste', 'testing', 'jest', 'maestro', 'detox', 'testes'],
  'cicd': ['ci/cd', 'ci', 'cd', 'pipeline', 'github actions', 'gitlab ci', 'deploy', 'continuous integration'],
  'graphql': ['graphql', 'gql'],
  'redux': ['redux', 'zustand', 'state management'],
}

// Response templates in different languages
const responseTemplates: Record<Locale, Record<string, (data: any) => string>> = {
  pt: {
    greeting: () => 'Olá! Sou Jaqueline Gonzaga, Senior Mobile Developer especializada em React Native e acessibilidade. Como posso ajudar?',
    
    technology: (data: { tech: string; projects: any[]; experiences: any[] }) => {
      const projectCount = data.projects.length
      const expCount = data.experiences.length
      let response = `Tenho experiência com ${data.tech} em `
      
      if (expCount > 0) {
        response += `${expCount} ${expCount === 1 ? 'experiência' : 'experiências'} profissional${expCount > 1 ? 'is' : ''}`
        if (projectCount > 0) response += ' e '
      }
      
      if (projectCount > 0) {
        response += `${projectCount} ${projectCount === 1 ? 'projeto' : 'projetos'}`
      }
      
      if (data.projects.length > 0) {
        response += `. Alguns projetos incluem: ${data.projects.slice(0, 3).map(p => p.title).join(', ')}.`
      }
      
      return response
    },
    
    project: (data: { project: any }) => {
      const p = data.project
      return `${p.title} é um projeto que desenvolvi na ${p.company} (${p.period}). ${p.description.substring(0, 200)}... Tecnologias: ${p.technologies.slice(0, 5).join(', ')}.`
    },
    
    experience: (data: { experience: any }) => {
      const exp = data.experience
      return `Trabalhei como ${exp.role} na ${exp.company} (${exp.period}). ${exp.description.substring(0, 200)}... Principais tecnologias: ${exp.technologies.slice(0, 5).join(', ')}.`
    },
    
    accessibility: () => {
      return 'Sou especialista em acessibilidade mobile (WCAG 2.1). Trabalhei em projetos como Gympass/Wellhub (20M+ usuários) e MaisTODOS, construindo componentes a11y-first, resolvendo inconsistências TalkBack/VoiceOver, e implementando validação automatizada em CI/CD. Conduzi workshops e estabeleci cultura de acessibilidade em organizações.'
    },
    
    skills: (data: { skills: string[] }) => {
      return `Minhas principais competências incluem: ${data.skills.slice(0, 10).join(', ')}. Tenho experiência em desenvolvimento mobile (React Native, Flutter), acessibilidade, segurança, arquitetura modular, e CI/CD.`
    },
    
    default: () => 'Posso ajudar com informações sobre minhas experiências, projetos, tecnologias que uso, ou sobre acessibilidade mobile. O que você gostaria de saber?'
  },
  
  en: {
    greeting: () => 'Hello! I\'m Jaqueline Gonzaga, a Senior Mobile Developer specialized in React Native and accessibility. How can I help you?',
    
    technology: (data: { tech: string; projects: any[]; experiences: any[] }) => {
      const projectCount = data.projects.length
      const expCount = data.experiences.length
      let response = `I have experience with ${data.tech} in `
      
      if (expCount > 0) {
        response += `${expCount} professional ${expCount === 1 ? 'experience' : 'experiences'}`
        if (projectCount > 0) response += ' and '
      }
      
      if (projectCount > 0) {
        response += `${projectCount} ${projectCount === 1 ? 'project' : 'projects'}`
      }
      
      if (data.projects.length > 0) {
        response += `. Some projects include: ${data.projects.slice(0, 3).map(p => p.title).join(', ')}.`
      }
      
      return response
    },
    
    project: (data: { project: any }) => {
      const p = data.project
      return `${p.title} is a project I developed at ${p.company} (${p.period}). ${p.description.substring(0, 200)}... Technologies: ${p.technologies.slice(0, 5).join(', ')}.`
    },
    
    experience: (data: { experience: any }) => {
      const exp = data.experience
      return `I worked as ${exp.role} at ${exp.company} (${exp.period}). ${exp.description.substring(0, 200)}... Main technologies: ${exp.technologies.slice(0, 5).join(', ')}.`
    },
    
    accessibility: () => {
      return 'I\'m a mobile accessibility specialist (WCAG 2.1). I worked on projects like Gympass/Wellhub (20M+ users) and MaisTODOS, building a11y-first components, resolving TalkBack/VoiceOver inconsistencies, and implementing automated validation in CI/CD. I conducted workshops and established accessibility culture in organizations.'
    },
    
    skills: (data: { skills: string[] }) => {
      return `My main skills include: ${data.skills.slice(0, 10).join(', ')}. I have experience in mobile development (React Native, Flutter), accessibility, security, modular architecture, and CI/CD.`
    },
    
    default: () => 'I can help with information about my experiences, projects, technologies I use, or about mobile accessibility. What would you like to know?'
  },
  
  es: {
    greeting: () => '¡Hola! Soy Jaqueline Gonzaga, Senior Mobile Developer especializada en React Native y accesibilidad. ¿Cómo puedo ayudarte?',
    
    technology: (data: { tech: string; projects: any[]; experiences: any[] }) => {
      const projectCount = data.projects.length
      const expCount = data.experiences.length
      let response = `Tengo experiencia con ${data.tech} en `
      
      if (expCount > 0) {
        response += `${expCount} ${expCount === 1 ? 'experiencia' : 'experiencias'} profesional${expCount > 1 ? 'es' : ''}`
        if (projectCount > 0) response += ' y '
      }
      
      if (projectCount > 0) {
        response += `${projectCount} ${projectCount === 1 ? 'proyecto' : 'proyectos'}`
      }
      
      if (data.projects.length > 0) {
        response += `. Algunos proyectos incluyen: ${data.projects.slice(0, 3).map(p => p.title).join(', ')}.`
      }
      
      return response
    },
    
    project: (data: { project: any }) => {
      const p = data.project
      return `${p.title} es un proyecto que desarrollé en ${p.company} (${p.period}). ${p.description.substring(0, 200)}... Tecnologías: ${p.technologies.slice(0, 5).join(', ')}.`
    },
    
    experience: (data: { experience: any }) => {
      const exp = data.experience
      return `Trabajé como ${exp.role} en ${exp.company} (${exp.period}). ${exp.description.substring(0, 200)}... Principales tecnologías: ${exp.technologies.slice(0, 5).join(', ')}.`
    },
    
    accessibility: () => {
      return 'Soy especialista en accesibilidad móvil (WCAG 2.1). Trabajé en proyectos como Gympass/Wellhub (20M+ usuarios) y MaisTODOS, construyendo componentes a11y-first, resolviendo inconsistencias TalkBack/VoiceOver, e implementando validación automatizada en CI/CD. Conduje talleres y establecí cultura de accesibilidad en organizaciones.'
    },
    
    skills: (data: { skills: string[] }) => {
      return `Mis principales competencias incluyen: ${data.skills.slice(0, 10).join(', ')}. Tengo experiencia en desarrollo móvil (React Native, Flutter), accesibilidad, seguridad, arquitectura modular, y CI/CD.`
    },
    
    default: () => 'Puedo ayudar con información sobre mis experiencias, proyectos, tecnologías que uso, o sobre accesibilidad móvil. ¿Qué te gustaría saber?'
  },
}

// Search function to find relevant data
function searchData(query: string): {
  projects: typeof projects
  experiences: typeof experiences
  technologies: string[]
} {
  const lowerQuery = query.toLowerCase()
  const foundProjects: typeof projects = []
  const foundExperiences: typeof experiences = []
  const foundTechnologies: string[] = new Set()
  
  // Split query into words for better matching
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2)
  
  // Search in projects
  for (const project of projects) {
    const searchText = `${project.title} ${project.company} ${project.description} ${project.technologies.join(' ')} ${project.domain} ${project.highlights.join(' ')}`.toLowerCase()
    
    // Check if any query word matches
    const matches = queryWords.some(word => searchText.includes(word)) || searchText.includes(lowerQuery)
    if (matches) {
      foundProjects.push(project)
      project.technologies.forEach(tech => foundTechnologies.add(tech))
    }
  }
  
  // Search in experiences
  for (const exp of experiences) {
    const searchText = `${exp.company} ${exp.role} ${exp.description} ${exp.technologies.join(' ')} ${exp.domain || ''} ${exp.highlights.join(' ')}`.toLowerCase()
    
    // Check if any query word matches
    const matches = queryWords.some(word => searchText.includes(word)) || searchText.includes(lowerQuery)
    if (matches) {
      foundExperiences.push(exp)
      exp.technologies.forEach(tech => foundTechnologies.add(tech))
    }
  }
  
  // Search by keywords
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(kw => lowerQuery.includes(kw))) {
      // Find projects/experiences matching this keyword
      for (const project of projects) {
        const searchText = `${project.title} ${project.company} ${project.description} ${project.technologies.join(' ')}`.toLowerCase()
        if (searchText.includes(key) && !foundProjects.find(p => p.id === project.id)) {
          foundProjects.push(project)
        }
      }
      
      for (const exp of experiences) {
        const searchText = `${exp.company} ${exp.role} ${exp.description} ${exp.technologies.join(' ')}`.toLowerCase()
        if (searchText.includes(key) && !foundExperiences.find(e => e.id === exp.id)) {
          foundExperiences.push(exp)
        }
      }
    }
  }
  
  return {
    projects: foundProjects,
    experiences: foundExperiences,
    technologies: Array.from(foundTechnologies),
  }
}

// Main chat processing function
export function processChatMessage(query: string, locale: Locale): ChatResponse {
  const lowerQuery = query.toLowerCase().trim()
  
  // Handle greetings
  if (lowerQuery.match(/^(oi|olá|hello|hi|hola|hey|bom dia|boa tarde|boa noite)/i)) {
    return {
      answer: responseTemplates[locale].greeting(),
    }
  }
  
  // Handle empty or very short queries
  if (lowerQuery.length < 3) {
    return {
      answer: responseTemplates[locale].default(),
    }
  }
  
  // Search for relevant data
  const searchResults = searchData(lowerQuery)
  
  // Check for specific project/company mentions
  for (const project of projects) {
    if (lowerQuery.includes(project.title.toLowerCase()) || lowerQuery.includes(project.company.toLowerCase())) {
      return {
        answer: responseTemplates[locale].project({ project }),
        relatedProjects: [project.id],
      }
    }
  }
  
  // Check for experience mentions
  for (const exp of experiences) {
    if (lowerQuery.includes(exp.company.toLowerCase())) {
      return {
        answer: responseTemplates[locale].experience({ experience: exp }),
        relatedExperiences: [exp.id],
      }
    }
  }
  
  // Check for accessibility questions
  if (lowerQuery.match(/(acessibilidade|accessibility|a11y|wcag|talkback|voiceover)/i)) {
    return {
      answer: responseTemplates[locale].accessibility(),
      relatedProjects: searchResults.projects.filter(p => 
        p.technologies.some(t => ['WCAG 2.1', 'TalkBack', 'VoiceOver', 'Accessibility'].includes(t))
      ).map(p => p.id),
    }
  }
  
  // Check for technology questions
  const allSkills = skills.flatMap(cat => cat.items)
  for (const skill of allSkills) {
    if (lowerQuery.includes(skill.toLowerCase())) {
      const techProjects = searchResults.projects.filter(p => 
        p.technologies.some(t => t.toLowerCase().includes(skill.toLowerCase()))
      )
      const techExperiences = searchResults.experiences.filter(e => 
        e.technologies.some(t => t.toLowerCase().includes(skill.toLowerCase()))
      )
      
      return {
        answer: responseTemplates[locale].technology({
          tech: skill,
          projects: techProjects,
          experiences: techExperiences,
        }),
        relatedProjects: techProjects.map(p => p.id),
        relatedExperiences: techExperiences.map(e => e.id),
      }
    }
  }
  
  // Check for skills question
  if (lowerQuery.match(/(habilidades|skills|competencias|tecnologias|technologies|o que você sabe|what do you know)/i)) {
    const allSkillsList = skills.flatMap(cat => cat.items)
    return {
      answer: responseTemplates[locale].skills({ skills: allSkillsList }),
    }
  }
  
  // Default response with search results
  if (searchResults.projects.length > 0 || searchResults.experiences.length > 0) {
    let answer = locale === 'pt' 
      ? 'Encontrei algumas informações relacionadas: '
      : locale === 'en'
      ? 'I found some related information: '
      : 'Encontré algunas informaciones relacionadas: '
    
    if (searchResults.projects.length > 0) {
      answer += searchResults.projects.slice(0, 2).map(p => p.title).join(', ')
    }
    
    return {
      answer,
      relatedProjects: searchResults.projects.slice(0, 3).map(p => p.id),
      relatedExperiences: searchResults.experiences.slice(0, 2).map(e => e.id),
    }
  }
  
  // Fallback to default
  return {
    answer: responseTemplates[locale].default(),
  }
}

