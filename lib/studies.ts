import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Study, StudyWithContent } from './study-utils'

export type { StudyLevel, Study, StudyWithContent } from './study-utils'
export { extractAllStudyTags, filterStudies } from './study-utils'

const STUDIES_DIR = path.join(process.cwd(), 'content/studies')

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function parseStudy(filename: string): Study {
  const slug = filename.replace(/\.mdx$/, '')
  const filePath = path.join(STUDIES_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug: (data.slug as string) ?? slug,
    title: data.title as string,
    description: data.description as string,
    date: (data.date as string) ?? '',
    tags: (data.tags as string[]) ?? [],
    level: (data.level as Study['level']) ?? 'intermediário',
    featured: (data.featured as boolean) ?? false,
    readingTime: estimateReadingTime(content),
  }
}

function sortStudies(studies: Study[]): Study[] {
  return studies.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getAllStudies(): Promise<Study[]> {
  if (!fs.existsSync(STUDIES_DIR)) return []
  const filenames = fs.readdirSync(STUDIES_DIR).filter((f) => f.endsWith('.mdx'))
  const studies = filenames.map(parseStudy)
  return sortStudies(studies)
}

export async function getStudyBySlug(slug: string): Promise<StudyWithContent | null> {
  const filePath = path.join(STUDIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug: (data.slug as string) ?? slug,
    title: data.title as string,
    description: data.description as string,
    date: (data.date as string) ?? '',
    tags: (data.tags as string[]) ?? [],
    level: (data.level as Study['level']) ?? 'intermediário',
    featured: (data.featured as boolean) ?? false,
    readingTime: estimateReadingTime(content),
    content,
  }
}
