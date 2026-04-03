import Link from 'next/link'
import { getFeaturedProjects, getAllProjects } from '@/lib/projects'
import { getFeaturedCertifications, getCertifications } from '@/lib/certifications'
import { ProjectCard } from '@/components/project/project-card'
import { CertificationCard } from '@/components/certification/CertificationCard'

export default async function HomePage() {
  const [featured, all, featuredCerts, allCerts] = await Promise.all([
    getFeaturedProjects(),
    getAllProjects(),
    getFeaturedCertifications(),
    getCertifications(),
  ])

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Caio Bomfim Godoy</h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 max-w-xl">
          Engenheiro de software focado em sistemas distribuídos, APIs e experiências técnicas com profundidade.
        </p>
        <div className="mt-6">
          <Link
            href="/projects"
            className="inline-block rounded-md bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
          >
            Ver projetos
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
            Projetos em destaque
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {all.length > featured.length && (
            <div className="mt-8">
              <Link href="/projects" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Ver todos os projetos →
              </Link>
            </div>
          )}
        </section>
      )}

      {featuredCerts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
            Certificações em destaque
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {featuredCerts.map((cert) => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
          {allCerts.length > featuredCerts.length && (
            <div className="mt-8">
              <Link href="/certifications" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Ver todas as certificações →
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
