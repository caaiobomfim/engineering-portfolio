'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Study } from '@/lib/study-utils'
import { extractAllStudyTags, filterStudies } from '@/lib/study-utils'
import { useDebounce } from '@/hooks/use-debounce'
import { SearchInput } from '@/components/project/SearchInput'
import { TagFilter } from '@/components/project/TagFilter'
import { StudyCard } from './StudyCard'

interface StudiesSectionProps {
  studies: Study[]
  initialTags: string[]
  initialQuery: string
}

export function StudiesSection({ studies, initialTags, initialQuery }: StudiesSectionProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)

  const didMount = useRef(false)
  const debouncedQuery = useDebounce(searchQuery, 200)

  const allTags = useMemo(() => extractAllStudyTags(studies), [studies])

  const filteredStudies = useMemo(
    () => filterStudies(studies, debouncedQuery, selectedTags),
    [studies, debouncedQuery, selectedTags],
  )

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    const params = new URLSearchParams()
    if (debouncedQuery) params.set('search', debouncedQuery)
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))

    const search = params.toString()
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false })
  }, [debouncedQuery, selectedTags, router, pathname])

  const handleToggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }, [])

  const handleClearTags = useCallback(() => setSelectedTags([]), [])
  const handleClearSearch = useCallback(() => setSearchQuery(''), [])

  const isFiltering = debouncedQuery.trim() !== '' || selectedTags.length > 0
  const count = filteredStudies.length

  const countLabel = isFiltering
    ? `${count} estudo${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`
    : `${count} estudo${count !== 1 ? 's' : ''} publicado${count !== 1 ? 's' : ''}`

  return (
    <div className="space-y-5">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Buscar por título, tecnologia ou tag..."
      />

      {allTags.length > 0 && (
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onClear={handleClearTags}
        />
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400">{countLabel}</p>

      {filteredStudies.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredStudies.map((study) => (
            <StudyCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <EmptyState
          hasQuery={debouncedQuery.trim() !== ''}
          hasTags={selectedTags.length > 0}
          onClearSearch={handleClearSearch}
          onClearTags={handleClearTags}
        />
      )}
    </div>
  )
}

interface EmptyStateProps {
  hasQuery: boolean
  hasTags: boolean
  onClearSearch: () => void
  onClearTags: () => void
}

function EmptyState({ hasQuery, hasTags, onClearSearch, onClearTags }: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum estudo encontrado.</p>
      <div className="mt-3 flex justify-center gap-3">
        {hasQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-2 transition-colors"
          >
            Limpar busca
          </button>
        )}
        {hasTags && (
          <button
            type="button"
            onClick={onClearTags}
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-2 transition-colors"
          >
            Limpar filtros de tag
          </button>
        )}
      </div>
    </div>
  )
}
