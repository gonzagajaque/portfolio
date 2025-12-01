'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const articles = [
  {
    id: '1',
    title: 'Building Accessible React Native Apps',
    description:
      'A comprehensive guide to implementing WCAG 2.1 standards in React Native applications, covering TalkBack, VoiceOver, and semantic navigation.',
    date: '2024-01-15',
    category: 'Accessibility',
    href: '#',
  },
  {
    id: '2',
    title: 'Offline-First Architecture Patterns',
    description:
      'Exploring SQLite synchronization, conflict resolution, and queue-based updates for mobile apps that work in low-connectivity environments.',
    date: '2024-02-20',
    category: 'Architecture',
    href: '#',
  },
  {
    id: '3',
    title: 'Testing Mobile Apps with Maestro',
    description:
      'A practical guide to end-to-end testing in React Native using Maestro, including accessibility test cases and CI/CD integration.',
    date: '2024-03-10',
    category: 'Testing',
    href: '#',
  },
]

export default function WritingPage() {
  const { t, locale } = useLanguage()
  
  return (
    <>
      <Section id="writing-hero" className="pt-24">
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-neutral-900 dark:text-white">
              {t('writing.title')}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t('writing.description')}
            </p>
          </div>

          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="group">
                <div className="pb-8 border-b border-neutral-200 dark:border-dark-700 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link
                        href={article.href}
                        className="block group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                      >
                        <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
                          {article.title}
                        </h2>
                      </Link>
                      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                    <span>{article.category}</span>
                    <span>•</span>
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'pt' ? 'pt-BR' : 'es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {t('writing.moreArticles')}{' '}
              <Link
                href="https://accessibilityfordevs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                {t('writing.blog')}
              </Link>{' '}
              {t('writing.forMore')}
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}



