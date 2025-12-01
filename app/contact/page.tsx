import type { Metadata } from 'next'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact - Jaqueline Gonzaga',
  description: 'Get in touch with Jaqueline Gonzaga.',
}

export default function ContactPage() {
  return <ContactSection />
}

