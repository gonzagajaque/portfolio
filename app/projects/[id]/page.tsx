import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetails } from '@/components/features/ProjectDetails'
import { projects } from '@/lib/data'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    return {
      title: 'Project not found',
    }
  }

  return {
    title: `${project.title} - ${project.company} | Jaqueline Gonzaga`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return <ProjectDetails project={project} />
}

