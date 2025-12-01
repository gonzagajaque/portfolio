import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Fira_Code } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { SkipToContent } from '@/components/layout/SkipToContent'
import { FluidCursor } from '@/components/effects/FluidCursor'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jaqueline Gonzaga - Senior Mobile Developer & Accessibility Specialist',
  description:
    'Senior Mobile Developer com 6+ anos de experiência construindo aplicações acessíveis, escaláveis e de alta performance para Android e iOS, especializada em React Native e acessibilidade (WCAG 2.1).',
  keywords: [
    'Mobile Developer',
    'React Native',
    'Accessibility',
    'WCAG',
    'iOS',
    'Android',
    'TypeScript',
    'A11y',
  ],
  authors: [{ name: 'Jaqueline Gonzaga' }],
  creator: 'Jaqueline Gonzaga',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://jaquelinegonzaga.dev',
    title: 'Jaqueline Gonzaga - Senior Mobile Developer & Accessibility Specialist',
    description:
      'Senior Mobile Developer com 6+ anos de experiência em React Native e acessibilidade.',
    siteName: 'Jaqueline Gonzaga Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaqueline Gonzaga - Senior Mobile Developer & Accessibility Specialist',
    description:
      'Senior Mobile Developer com 6+ anos de experiência em React Native e acessibilidade.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider>
          <FluidCursor />
          <SkipToContent />
          <Header />
          <main id="main-content" role="main" tabIndex={-1} className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

