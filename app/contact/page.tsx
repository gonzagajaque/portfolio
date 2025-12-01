import type { Metadata } from 'next'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contato - Jaqueline Gonzaga',
  description: 'Entre em contato com Jaqueline Gonzaga.',
}

export default function ContactPage() {
  return <ContactSection />
}

