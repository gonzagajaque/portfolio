import React from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { ProjectCard } from '../features/ProjectCard'
import { projects } from '@/lib/data'

export const ProjectsSection: React.FC = () => {
  return (
    <Section id="projects" ariaLabel="Projetos">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">
            Projects
          </h2>

          <div className="space-y-4 md:space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
