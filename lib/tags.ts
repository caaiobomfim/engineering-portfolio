import type { Project } from './projects'

/**
 * Extracts all unique tags from a list of projects, sorted alphabetically.
 */
export function extractAllTags(projects: Project[]): string[] {
  const tagSet = new Set<string>()
  for (const project of projects) {
    for (const tag of project.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}

/**
 * Filters projects using OR logic: a project is included if it has
 * at least one of the selected tags. Returns all projects when no tags
 * are selected.
 */
export function filterProjectsByTags(projects: Project[], selectedTags: string[]): Project[] {
  if (selectedTags.length === 0) return projects
  return projects.filter((project) =>
    selectedTags.some((tag) => project.tags.includes(tag)),
  )
}
