import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllProjects, getProjectBySlug } from '@/lib/mdx'

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
    description: project.description,
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
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        <p className="mt-3 text-lg text-gray-500">{project.description}</p>
        {project.date && (
          <p className="mt-2 text-xs text-gray-400">
            {new Date(project.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
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
    </article>
  )
}
