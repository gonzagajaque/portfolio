import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/AboutSection'

export const metadata: Metadata = {
  title: 'Sobre - Jaqueline Gonzaga',
  description: 'História profissional, educação e competências técnicas de Jaqueline Gonzaga.',
}

export default function AboutPage() {
  return <AboutSection />
}

