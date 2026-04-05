import { normalizeText } from './search'

export type StudyLevel = 'básico' | 'intermediário' | 'avançado'

export interface Study {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  level: StudyLevel
  featured: boolean
  readingTime: number
}

export interface StudyWithContent extends Study {
  content: string
}

export function extractAllStudyTags(studies: Study[]): string[] {
  const tagSet = new Set<string>()
  for (const study of studies) {
    for (const tag of study.tags) tagSet.add(tag)
  }
  return Array.from(tagSet).sort()
}

export function filterStudies(
  studies: Study[],
  query: string,
  selectedTags: string[],
): Study[] {
  let result = studies

  const normalized = normalizeText(query.trim())
  if (normalized) {
    result = result.filter((study) => {
      const index = normalizeText(
        [study.title, study.description, study.slug, ...study.tags].join(' '),
      )
      return index.includes(normalized)
    })
  }

  if (selectedTags.length > 0) {
    result = result.filter((study) =>
      selectedTags.some((tag) => study.tags.includes(tag)),
    )
  }

  return result
}
