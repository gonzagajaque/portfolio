import type { Metadata } from 'next'
import { SkillsSection } from '@/components/sections/SkillsSection'

export const metadata: Metadata = {
  title: 'Skills - Jaqueline Gonzaga',
  description: 'Competências técnicas e tecnologias de Jaqueline Gonzaga.',
}

export default function SkillsPage() {
  return <SkillsSection />
}

