import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Speaking - Jaqueline Gonzaga',
  description: 'Palestras, workshops e apresentações sobre desenvolvimento mobile e acessibilidade.',
}

const talks = [
  {
    id: '1',
    title: 'Building Accessible Mobile Apps',
    type: 'talk',
    description:
      'An introduction to mobile accessibility, covering WCAG 2.1 implementation, screen reader testing, and inclusive design patterns for React Native apps.',
    date: '2024-03-15',
    event: 'React Native Conference',
    location: 'São Paulo, Brazil',
  },
  {
    id: '2',
    title: 'Offline-First Architecture Workshop',
    type: 'workshop',
    description:
      'A hands-on workshop on building offline-first mobile applications using SQLite, conflict resolution strategies, and background synchronization.',
    date: '2024-02-10',
    event: 'Mobile Dev Summit',
    location: 'Online',
  },
  {
    id: '3',
    title: 'Accessibility Culture in Tech Teams',
    type: 'talk',
    description:
      'How to build and maintain an accessibility culture in development teams, including workshops, code reviews, and inclusive design processes.',
    date: '2023-11-20',
    event: 'Tech Leadership Forum',
    location: 'Rio de Janeiro, Brazil',
  },
]

export default function SpeakingPage() {
  return (
    <>
      <Section id="speaking-hero" className="pt-24">
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-neutral-900 dark:text-white">
              Speaking.
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I speak at conferences and meetups about mobile development, accessibility, and building inclusive digital experiences. 
              Check out my upcoming talks and past presentations.
            </p>
          </div>

          <div className="space-y-12">
            {talks.map((talk) => (
              <article key={talk.id} className="group">
                <div className="pb-8 border-b border-neutral-200 dark:border-dark-700 last:border-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={talk.type === 'workshop' ? 'secondary' : 'primary'} size="sm">
                          {talk.type}
                        </Badge>
                        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                          {talk.title}
                        </h2>
                      </div>
                      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                        {talk.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                    <span>{talk.event}</span>
                    <span>•</span>
                    <span>{talk.location}</span>
                    <span>•</span>
                    <time dateTime={talk.date}>
                      {new Date(talk.date).toLocaleDateString('pt-BR', {
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

          <div className="mt-16 p-8 bg-neutral-50 dark:bg-dark-800 rounded-lg border border-neutral-200 dark:border-dark-700">
            <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">
              Interested in having me speak?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              I&apos;m always open to speaking at conferences, meetups, and workshops. Feel free to reach out!
            </p>
            <a
              href="mailto:jaquelinesgonzaga@gmail.com"
              className="text-lg text-primary-600 dark:text-primary-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
            >
              Get in touch →
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
