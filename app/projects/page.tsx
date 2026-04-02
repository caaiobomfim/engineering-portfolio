import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import { ProjectsSection } from '@/components/project/ProjectsSection'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Lista de projetos técnicos com problema, arquitetura, stack, resultados e aprendizados.',
}

interface ProjectsPageProps {
  searchParams: Promise<{ tags?: string; search?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { tags, search } = await searchParams
  const projects = await getAllProjects()
  const initialTags = tags ? tags.split(',').filter(Boolean) : []
  const initialQuery = search ?? ''

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
      <div className="mt-8">
        <ProjectsSection
          projects={projects}
          initialTags={initialTags}
          initialQuery={initialQuery}
        />
      </div>
    </div>
  )
}
