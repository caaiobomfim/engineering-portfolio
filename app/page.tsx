import Link from 'next/link'
import { getFeaturedProjects, getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/project/project-card'

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedProjects(), getAllProjects()])

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Caio Andrade</h1>
        <p className="mt-3 text-lg text-gray-500 max-w-xl">
          Engenheiro de software focado em sistemas distribuídos, APIs e experiências técnicas com profundidade.
        </p>
        <div className="mt-6">
          <Link
            href="/projects"
            className="inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            Ver projetos
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Projetos em destaque
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {all.length > featured.length && (
            <div className="mt-8">
              <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Ver todos os projetos →
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
