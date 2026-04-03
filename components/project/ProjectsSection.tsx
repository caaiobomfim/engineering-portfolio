'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Project } from '@/lib/projects'
import { extractAllTags } from '@/lib/tags'
import { filterProjects } from '@/lib/search'
import { useDebounce } from '@/hooks/use-debounce'
import { SearchInput } from './SearchInput'
import { TagFilter } from './TagFilter'
import { ProjectCard } from './project-card'

interface ProjectsSectionProps {
  projects: Project[]
  /** Tags pre-selected from the URL query string (server-resolved). */
  initialTags: string[]
  /** Search query pre-filled from the URL query string (server-resolved). */
  initialQuery: string
}

export function ProjectsSection({
  projects,
  initialTags,
  initialQuery,
}: ProjectsSectionProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)

  // Skip the first effect run to avoid a redundant router.replace on mount.
  const didMount = useRef(false)

  // Debounce the query for filtering and URL sync — keeps the input snappy.
  const debouncedQuery = useDebounce(searchQuery, 200)

  const allTags = useMemo(() => extractAllTags(projects), [projects])

  // Single source of truth for visible projects: search + tags applied together.
  const filteredProjects = useMemo(
    () => filterProjects(projects, debouncedQuery, selectedTags),
    [projects, debouncedQuery, selectedTags],
  )

  // Keep URL in sync with both filters so state survives refresh and URLs are
  // shareable (e.g. /projects?search=spring&tags=backend,testes).
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
  const count = filteredProjects.length

  const countLabel = isFiltering
    ? `${count} projeto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`
    : `${count} projeto${count !== 1 ? 's' : ''} publicado${count !== 1 ? 's' : ''}`

  return (
    <div className="space-y-5">
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {allTags.length > 0 && (
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onClear={handleClearTags}
        />
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400">{countLabel}</p>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
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

// ─── Empty state ─────────────────────────────────────────────────────────────

interface EmptyStateProps {
  hasQuery: boolean
  hasTags: boolean
  onClearSearch: () => void
  onClearTags: () => void
}

function EmptyState({ hasQuery, hasTags, onClearSearch, onClearTags }: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum projeto encontrado.</p>
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
