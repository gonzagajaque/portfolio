import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Fira_Code } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
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
    'Senior Mobile Developer with 6+ years of experience building accessible, scalable, and high-performance applications for Android and iOS, specialized in React Native and accessibility (WCAG 2.1).',
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
    locale: 'en_US',
    url: 'https://jaquelinegonzaga.dev',
    title: 'Jaqueline Gonzaga - Senior Mobile Developer & Accessibility Specialist',
    description:
      'Senior Mobile Developer with 6+ years of experience in React Native and accessibility.',
    siteName: 'Jaqueline Gonzaga Portfolio',
    images: [
      {
        url: 'https://jaquelinegonzaga.dev/portfolio/styles/me.png',
        width: 192,
        height: 192,
        alt: 'Jaqueline Gonzaga - Senior Mobile Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaqueline Gonzaga - Senior Mobile Developer & Accessibility Specialist',
    description:
      'Senior Mobile Developer with 6+ years of experience in React Native and accessibility.',
    images: ['https://jaquelinegonzaga.dev/portfolio/styles/me.png'],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider>
            <FluidCursor />
            <SkipToContent />
            <Header />
            <main id="main-content" role="main" tabIndex={-1} className="relative z-10">
              {children}
            </main>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

