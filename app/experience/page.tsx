import type { Metadata } from 'next'
import { Timeline } from '@/components/features/Timeline'

export const metadata: Metadata = {
  title: 'Experience - Jaqueline Gonzaga',
  description: 'Professional experience and projects of Jaqueline Gonzaga.',
}

export default function ExperiencePage() {
  return <Timeline />
}

