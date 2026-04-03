import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export type ProjectStatus = 'Em andamento' | 'Finalizado' | 'Experimental'

export interface Project {
  slug: string
  title: string
  summary: string
  stack: string[]
  tags: string[]
  status: ProjectStatus
  featured: boolean
  order: number
  cover: string
  /** simple-icons slug for the project icon */
  icon?: string
  github?: string
  demo?: string
  date: string
}

export interface ProjectWithContent extends Project {
  content: string
}

function parseProject(filename: string): Project {
  const slug = filename.replace(/\.mdx$/, '')
  const filePath = path.join(PROJECTS_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)

  return {
    slug: (data.slug as string) ?? slug,
    title: data.title as string,
    summary: data.summary as string,
    stack: (data.stack as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    status: (data.status as ProjectStatus) ?? 'Em andamento',
    featured: (data.featured as boolean) ?? false,
    order: (data.order as number) ?? 999,
    cover: (data.cover as string) ?? '/images/projects/placeholder/cover.svg',
    icon: data.icon as string | undefined,
    github: data.github as string | undefined,
    demo: data.demo as string | undefined,
    date: (data.date as string) ?? '',
  }
}

function sortProjects(projects: Project[]): Project[] {
  return projects.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return b.date.localeCompare(a.date)
  })
}

export async function getAllProjects(): Promise<Project[]> {
  const filenames = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'))
  const projects = filenames.map(parseProject)
  return sortProjects(projects)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.filter((p) => p.featured)
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithContent | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug: (data.slug as string) ?? slug,
    title: data.title as string,
    summary: data.summary as string,
    stack: (data.stack as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    status: (data.status as ProjectStatus) ?? 'Em andamento',
    featured: (data.featured as boolean) ?? false,
    order: (data.order as number) ?? 999,
    cover: (data.cover as string) ?? '/images/projects/placeholder/cover.svg',
    icon: data.icon as string | undefined,
    github: data.github as string | undefined,
    demo: data.demo as string | undefined,
    date: (data.date as string) ?? '',
    content,
  }
}
