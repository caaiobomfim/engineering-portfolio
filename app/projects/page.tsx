import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/mdx'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Lista de projetos técnicos com problema, arquitetura, stack, resultados e aprendizados.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
      <p className="mt-2 text-sm text-gray-500">
        {projects.length} projeto{projects.length !== 1 ? 's' : ''} publicado{projects.length !== 1 ? 's' : ''}
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
