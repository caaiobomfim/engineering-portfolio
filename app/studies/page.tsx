import type { Metadata } from 'next'
import { getAllStudies } from '@/lib/studies'
import { StudiesSection } from '@/components/study/StudiesSection'

export const metadata: Metadata = {
  title: 'Estudos',
  description: 'Base de conhecimento com cenários reais de engenharia: arquitetura, decisões técnicas, problemas encontrados e aprendizados.',
}

interface StudiesPageProps {
  searchParams: Promise<{ tags?: string; search?: string }>
}

export default async function StudiesPage({ searchParams }: StudiesPageProps) {
  const { tags, search } = await searchParams
  const studies = await getAllStudies()
  const initialTags = tags ? tags.split(',').filter(Boolean) : []
  const initialQuery = search ?? ''

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Estudos</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Cenários reais que enfrentei como engenheiro: contexto, arquitetura, decisões e aprendizados.
        </p>
      </div>
      <StudiesSection
        studies={studies}
        initialTags={initialTags}
        initialQuery={initialQuery}
      />
    </div>
  )
}
