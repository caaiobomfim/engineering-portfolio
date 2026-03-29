import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { getTagColor } from '@/lib/tag-colors'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs px-2 py-0.5 rounded-full border border-gray-300 text-gray-500">
            {project.status}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        <p className="mt-3 text-lg text-gray-500">{project.summary}</p>

        {project.date && (
          <p className="mt-2 text-xs text-gray-400">
            {new Date(project.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        )}

        {(project.github || project.demo) && (
          <div className="mt-4 flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-2"
              >
                GitHub →
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-2"
              >
                Demo →
              </a>
            )}
          </div>
        )}
      </header>

      <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 mb-10">
        <Image
          src={project.cover}
          alt={`Capa do projeto ${project.title}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="prose prose-gray max-w-none">
        <MDXRemote source={project.content} />
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200">
        <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Voltar para projetos
        </Link>
      </div>
    </article>
  )
}
