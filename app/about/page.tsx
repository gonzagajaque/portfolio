import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/AboutSection'

export const metadata: Metadata = {
  title: 'About - Jaqueline Gonzaga',
  description: 'Professional history, education, and technical skills of Jaqueline Gonzaga.',
}

export default function AboutPage() {
  return <AboutSection />
}

