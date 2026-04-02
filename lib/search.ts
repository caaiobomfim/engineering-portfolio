import type { Project } from './projects'

/**
 * Normalizes a string for search comparison:
 * - Lowercases
 * - Removes diacritics (e.g. "Capitalização" → "capitalizacao")
 * This allows accent-insensitive and case-insensitive matching.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Builds a single normalized searchable string from all relevant project
 * fields. Centralizing this here ensures consistency and makes it trivial
 * to add new fields in the future.
 */
function buildSearchIndex(project: Project): string {
  return normalizeText(
    [
      project.title,
      project.summary,
      project.slug,
      ...project.tags,
      ...project.stack,
    ].join(' '),
  )
}

/**
 * Filters projects by a free-text query using substring matching against
 * title, summary, slug, tags, and stack.
 *
 * Returns all projects when the query is empty or whitespace-only.
 */
export function searchProjects(projects: Project[], query: string): Project[] {
  const normalized = normalizeText(query.trim())
  if (!normalized) return projects
  return projects.filter((project) => buildSearchIndex(project).includes(normalized))
}

/**
 * Combined filter: applies free-text search first, then tag filtering (OR logic).
 * This is the single entry point for the projects page filter state, designed
 * to keep both filters composable as the feature set grows.
 */
export function filterProjects(
  projects: Project[],
  query: string,
  selectedTags: string[],
): Project[] {
  let result = searchProjects(projects, query)

  if (selectedTags.length > 0) {
    result = result.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag)),
    )
  }

  return result
}
