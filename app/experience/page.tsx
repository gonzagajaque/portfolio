import type { Metadata } from 'next'
import { Timeline } from '@/components/features/Timeline'

export const metadata: Metadata = {
  title: 'Experiência - Jaqueline Gonzaga',
  description: 'Experiência profissional e projetos de Jaqueline Gonzaga.',
}

export default function ExperiencePage() {
  return <Timeline />
}

