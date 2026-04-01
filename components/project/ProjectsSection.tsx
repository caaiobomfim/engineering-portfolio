'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Project } from '@/lib/projects'
import { extractAllTags, filterProjectsByTags } from '@/lib/tags'
import { TagFilter } from './TagFilter'
import { ProjectCard } from './project-card'

interface ProjectsSectionProps {
  projects: Project[]
  /** Tags pre-selected from the URL query string (server-resolved). */
  initialTags: string[]
}

export function ProjectsSection({ projects, initialTags }: ProjectsSectionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)
  // Skip the first effect run to avoid a redundant router.replace on mount.
  const didMount = useRef(false)

  const allTags = useMemo(() => extractAllTags(projects), [projects])

  const filteredProjects = useMemo(
    () => filterProjectsByTags(projects, selectedTags),
    [projects, selectedTags],
  )

  // Keep URL in sync with selected tags so the state survives a page refresh
  // and the URL is shareable (e.g. /projects?tags=backend,testes).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    const params = new URLSearchParams()
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','))
    }
    const search = params.toString()
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false })
  }, [selectedTags, router, pathname])

  const handleToggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }, [])

  const handleClear = useCallback(() => {
    setSelectedTags([])
  }, [])

  const count = filteredProjects.length
  const countLabel = selectedTags.length > 0
    ? `${count} projeto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`
    : `${count} projeto${count !== 1 ? 's' : ''} publicado${count !== 1 ? 's' : ''}`

  return (
    <div className="space-y-6">
      {allTags.length > 0 && (
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onClear={handleClear}
        />
      )}

      <p className="text-sm text-gray-500">{countLabel}</p>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-400">
          <p className="text-sm">Nenhum projeto encontrado para os filtros selecionados.</p>
        </div>
      )}
    </div>
  )
}
