import React from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { TimelineItem } from './TimelineItem'
import { experiences } from '@/lib/data'

export const Timeline: React.FC = () => {
  return (
    <Section id="experience-timeline" ariaLabel="Linha do tempo de experiências" ariaLabelledBy="experience-timeline-title">
      <Container>
        <div className="text-center mb-12">
          <h2 id="experience-timeline-title" className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
            Experiência Profissional
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Minha jornada profissional em desenvolvimento mobile e acessibilidade.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-dark-700 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                position={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

