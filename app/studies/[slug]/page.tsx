import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllStudies, getStudyBySlug, type StudyLevel } from '@/lib/studies'
import { getTagColor } from '@/lib/tag-colors'

interface StudyPageProps {
  params: Promise<{ slug: string }>
}

const LEVEL_CONFIG: Record<StudyLevel, { label: string; class: string }> = {
  básico: {
    label: 'Básico',
    class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  intermediário: {
    label: 'Intermediário',
    class: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  avançado: {
    label: 'Avançado',
    class: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  },
}

export async function generateStaticParams() {
  const studies = await getAllStudies()
  return studies.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: StudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = await getStudyBySlug(slug)
  if (!study) return {}

  return {
    title: study.title,
    description: study.description,
  }
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { slug } = await params
  const study = await getStudyBySlug(slug)

  if (!study) {
    notFound()
  }

  const level = LEVEL_CONFIG[study.level] ?? LEVEL_CONFIG['intermediário']

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${level.class}`}>
            {level.label}
          </span>
          {study.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{study.title}</h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">{study.description}</p>

        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          {study.date && (
            <span>
              {new Date(study.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {study.readingTime} min de leitura
          </span>
        </div>
      </header>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={study.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/studies"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          ← Voltar para estudos
        </Link>
      </div>
    </article>
  )
}
