import type { Project, Experience, SkillCategory } from '@/types'

export const projects: Project[] = [
  {
    id: 'gympass-wellhub',
    title: 'Gympass / Wellhub',
    company: 'Invillia',
    description:
      'Transformação de app multiregional usado por 20M+ usuários em produto WCAG-aligned. Entreguei correções de acessibilidade cross-platform, construí componentes a11y-first para Yoga DS e Yoga Inner, resolvi inconsistências profundas de TalkBack/VoiceOver, e habilitei fluxos inclusivos em 11 países.',
    technologies: [
      'React Native',
      'TypeScript',
      'WCAG 2.1',
      'TalkBack',
      'VoiceOver',
      'Yoga Design System',
    ],
    domain: 'Health & Wellness',
    period: '2023 - Presente',
    highlights: [
      'App usado por 20M+ usuários em 11 países',
      'Componentes a11y-first para design system open-source',
      'Workshops e cultura de acessibilidade',
    ],
  },
  {
    id: 'enor-securities',
    title: 'APP Bank - Crypto Wallet',
    company: 'Enor Securities',
    description:
      'Construí e mantive a carteira cripto nacional, melhorando segurança, confiabilidade e internacionalização. Lidei arquitetura v2 com autenticação mais forte, hardening de API, obfuscação, e revisões estáticas baseadas em JADX. Entreguei fluxos multilíngues (ES/PT/EN), estabilizei UX transacional, e fortaleci pipelines GitLab CI.',
    technologies: [
      'React Native',
      'TypeScript',
      'Security',
      'Obfuscation',
      'JADX',
      'GitLab CI',
      'Multi-language',
    ],
    domain: 'Fintech',
    period: '2023 - Presente',
    highlights: [
      'Carteira cripto nacional (El Salvador)',
      'Arquitetura v2 com segurança reforçada',
      'Fluxos multilíngues (ES/PT/EN)',
    ],
  },
  {
    id: 'maistodos',
    title: 'MaisTODOS (Cartão de Todos)',
    company: 'Cartão de Todos',
    description:
      'Trabalhei em um dos maiores apps nacionais do Brasil, usado por milhões de usuários. Lidei a cultura de acessibilidade em toda a organização, planejei e entreguei o redesign V4, modernizando UI, adicionando novos padrões a11y, melhorando geolocalização, carteira digital, cashback, escaneamento de código de barras, e fluxos de agendamento.',
    technologies: [
      'React Native',
      'TypeScript',
      'GraphQL',
      'Accessibility',
      'Security',
      'Obfuscation',
    ],
    domain: 'Healthcare & Finance',
    period: '2022 - 2023',
    highlights: [
      'App usado por milhões de usuários no Brasil',
      'Liderança em cultura de acessibilidade',
      'Redesign V4 com segurança reforçada',
    ],
  },
  {
    id: 'liberali',
    title: 'Agritech Offline-First Platform',
    company: 'Liberali',
    description:
      'Entreguei app React Native + Expo usado em grandes fazendas em Mato Grosso, permitindo operadores registrar tarefas diárias, uso de equipamentos, e operações de campo totalmente offline. Construí arquitetura offline-first robusta usando SQLite, resolução de conflitos, pipelines de sincronização em background, e UX otimizada para ambientes de baixa conectividade.',
    technologies: [
      'React Native',
      'Expo',
      'SQLite',
      'Offline-First',
      'Conflict Resolution',
      'Background Sync',
    ],
    domain: 'Agritech',
    period: '2022',
    highlights: [
      'Arquitetura offline-first com SQLite',
      'Sincronização em background',
      'Resolução de conflitos',
    ],
  },
  {
    id: 'osiris-agtech',
    title: 'Hydroponic Management App',
    company: 'Osíris Agtech',
    description:
      'Co-projetei o app de gestão de hidroponia end-to-end: protótipos, regras de negócio, planejamento de sprints, UI no Figma, desenvolvimento Flutter, integrações backend, e deploy nas stores. Construí features para monitoramento de nutrientes, ciclos de irrigação, inputs baseados em sensores, e rotinas diárias de cultivo.',
    technologies: ['Flutter', 'Dart', 'Figma', 'Firebase', 'REST API'],
    domain: 'Agritech',
    period: '2021 - 2022',
    highlights: [
      'Desenvolvimento end-to-end',
      'Protótipos e design no Figma',
      'Colaboração com agrônomos',
    ],
  },
  {
    id: 'trinus',
    title: 'Real Estate & Investment SuperApp',
    company: 'Trinus',
    description:
      'Melhorei plataforma mobile de grande escala de imóveis e investimentos com carteira digital, rastreamento de ativos, monitoramento de construção, e fluxos de documentos legais. Entreguei componentes de UI financeira estáveis, otimizei integrações backend, melhorei renderização de dados de alto volume, e mantive pipelines Azure DevOps CI/CD.',
    technologies: ['Flutter', 'Dart', 'Azure DevOps', 'REST API', 'Firebase'],
    domain: 'Real Estate & Finance',
    period: '2021',
    highlights: [
      'SuperApp de imóveis e investimentos',
      'Carteira digital e rastreamento de ativos',
      'CI/CD com Azure DevOps',
    ],
  },
]

export const experiences: Experience[] = [
  {
    id: 'enor-securities',
    company: 'Enor Securities',
    role: 'Senior Mobile Developer',
    period: '2023 - Presente',
    description:
      'Trabalho como Senior Mobile Developer em aplicação de criptomoedas e ativos digitais baseada em El Salvador, focada em onboarding seguro, operações de carteira, validação de identidade, e fluxos multilíngues para usuários internacionais. Mantenho e evoluo toda a arquitetura v2 com foco em segurança, confiabilidade e internacionalização.',
    technologies: [
      'React Native',
      'TypeScript',
      'Security',
      'Obfuscation',
      'JADX',
      'GitLab CI',
      'Multi-language',
    ],
    highlights: [
      'Arquitetura v2 com segurança reforçada',
      'Fluxos multilíngues (ES/PT/EN)',
      'Revisões estáticas de segurança',
    ],
    domain: 'Fintech',
  },
  {
    id: 'gympass-wellhub',
    company: 'Gympass / Wellhub',
    role: 'React Native Accessibility Engineering',
    period: '2023 - Presente',
    description:
      'Transformei app multiregional usado por 20M+ usuários em produto WCAG-aligned. Entreguei correções de acessibilidade cross-platform, construí componentes a11y-first para Yoga DS (open-source) e Yoga Inner, resolvi inconsistências profundas de TalkBack/VoiceOver, e habilitei fluxos inclusivos em 11 países.',
    technologies: [
      'React Native',
      'TypeScript',
      'WCAG 2.1',
      'TalkBack',
      'VoiceOver',
      'Yoga Design System',
    ],
    highlights: [
      'App usado por 20M+ usuários',
      'Componentes a11y-first para design system',
      'Workshops e cultura de acessibilidade',
    ],
    domain: 'Health & Wellness',
  },
  {
    id: 'maistodos',
    company: 'Cartão de Todos (MaisTODOS)',
    role: 'Mobile Developer & Accessibility Leader',
    period: '2022 - 2023',
    description:
      'Trabalhei em um dos maiores apps nacionais do Brasil, usado por milhões de usuários. Lidei a cultura de acessibilidade em toda a organização, planejei e entreguei o redesign V4, modernizando UI, adicionando novos padrões a11y, melhorando geolocalização, carteira digital, cashback, e fluxos de agendamento.',
    technologies: [
      'React Native',
      'TypeScript',
      'GraphQL',
      'Accessibility',
      'Security',
      'Obfuscation',
    ],
    highlights: [
      'Liderança em cultura de acessibilidade',
      'Redesign V4 com segurança reforçada',
      'Workshops e evangelização a11y',
    ],
    domain: 'Healthcare & Finance',
  },
  {
    id: 'liberali',
    company: 'Liberali',
    role: 'Mobile Developer',
    period: '2022',
    description:
      'Entreguei app React Native + Expo usado em grandes fazendas em Mato Grosso, permitindo operadores registrar tarefas diárias, uso de equipamentos, e operações de campo totalmente offline. Construí arquitetura offline-first robusta usando SQLite, resolução de conflitos, pipelines de sincronização em background.',
    technologies: [
      'React Native',
      'Expo',
      'SQLite',
      'Offline-First',
      'Conflict Resolution',
      'Background Sync',
    ],
    highlights: [
      'Arquitetura offline-first com SQLite',
      'Sincronização em background',
      'Resolução de conflitos',
    ],
    domain: 'Agritech',
  },
  {
    id: 'osiris-agtech',
    company: 'Osíris Agtech',
    role: 'Mobile Developer (Flutter)',
    period: '2021 - 2022',
    description:
      'Co-projetei app de gestão de hidroponia end-to-end: protótipos, regras de negócio, planejamento de sprints, UI no Figma, desenvolvimento Flutter, integrações backend, e deploy nas stores. Construí features para monitoramento de nutrientes, ciclos de irrigação, inputs baseados em sensores, e rotinas diárias de cultivo.',
    technologies: ['Flutter', 'Dart', 'Figma', 'Firebase', 'REST API'],
    highlights: [
      'Desenvolvimento end-to-end',
      'Protótipos e design no Figma',
      'Colaboração com agrônomos',
    ],
    domain: 'Agritech',
  },
  {
    id: 'trinus',
    company: 'Trinus',
    role: 'Flutter Mobile Developer',
    period: '2021',
    description:
      'Contribuí para desenvolvimento de plataforma mobile de grande escala de imóveis e investimentos, usada por milhares de clientes para gerenciar ativos financeiros, rastrear aquisições de propriedades, monitorar progresso de construção, e operar carteira de investimento digital.',
    technologies: ['Flutter', 'Dart', 'Azure DevOps', 'REST API', 'Firebase'],
    highlights: [
      'SuperApp de imóveis e investimentos',
      'Carteira digital e rastreamento de ativos',
      'CI/CD com Azure DevOps',
    ],
    domain: 'Real Estate & Finance',
  },
]

export const skills: SkillCategory[] = [
  {
    id: 'mobile-engineering',
    name: 'Mobile Engineering',
    items: [
      'React Native',
      'Flutter',
      'iOS',
      'Android',
      'TypeScript',
      'JavaScript',
      'Modular Architecture',
      'DDD',
      'Performance Optimization',
    ],
  },
  {
    id: 'accessibility',
    name: 'Accessibility (A11y)',
    items: [
      'WCAG 2.1',
      'Semantic Navigation',
      'TalkBack',
      'VoiceOver',
      'Focus Management',
      'Screen Reader Testing',
      'A11y-first Components',
    ],
  },
  {
    id: 'state-management',
    name: 'State Management',
    items: ['Redux', 'Zustand', 'Context API', 'GraphQL (Apollo)', 'REST', 'WebSocket'],
  },
  {
    id: 'testing',
    name: 'Testing & Quality',
    items: [
      'Jest',
      'React Native Testing Library',
      'Maestro E2E',
      'Detox',
      'Snapshot Testing',
      'A11y Testing',
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD & Release',
    items: [
      'GitHub Actions',
      'GitLab CI',
      'Fastlane',
      'CodePush',
      'App Store',
      'Play Store',
      'Azure DevOps',
    ],
  },
  {
    id: 'security',
    name: 'Security & Observability',
    items: [
      'Secure Storage',
      'Obfuscation',
      'Encryption',
      'OAuth/JWT',
      'Sentry',
      'Firebase Analytics',
      'Performance Profiling',
    ],
  },
  {
    id: 'offline',
    name: 'Offline-First & Data',
    items: [
      'SQLite',
      'MMKV',
      'Realm',
      'Background Sync',
      'Conflict Resolution',
      'Queue-based Updates',
    ],
  },
  {
    id: 'tools',
    name: 'Dev Tools',
    items: [
      'Git',
      'GitHub',
      'GitLab',
      'Flipper',
      'Reactotron',
      'Figma',
      'Node.js',
      'Docker',
    ],
  },
]
