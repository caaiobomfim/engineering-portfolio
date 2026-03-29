import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export interface ProjectFrontmatter {
  title: string
  description: string
  tags: string[]
  cover: string
  date: string
}

export interface Project extends ProjectFrontmatter {
  slug: string
}

export interface ProjectWithContent extends Project {
  content: string
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '')
}

export async function getAllProjects(): Promise<Project[]> {
  const filenames = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'))

  const projects = filenames.map((filename) => {
    const slug = slugFromFilename(filename)
    const filePath = path.join(PROJECTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      tags: (data.tags as string[]) ?? [],
      cover: (data.cover as string) ?? '/images/placeholder.png',
      date: (data.date as string) ?? '',
    }
  })

  return projects.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithContent | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
    cover: (data.cover as string) ?? '/images/placeholder.png',
    date: (data.date as string) ?? '',
    content,
  }
}
