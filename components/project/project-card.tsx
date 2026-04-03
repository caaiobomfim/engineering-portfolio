import Link from 'next/link'
import Image from 'next/image'
import * as simpleIcons from 'simple-icons'
import type { Project } from '@/lib/projects'
import { StackIcon } from './StackIcon'

function lookupIcon(slug: string) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1)
  return (
    simpleIcons as Record<
      string,
      { hex: string; path: string; title: string } | undefined
    >
  )[key] ?? null
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const icon = project.icon ? lookupIcon(project.icon) : null

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors bg-white p-5">
        {/* Top: icon + title/summary */}
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 shrink-0 rounded-lg bg-gray-50">
            {icon ? (
              <svg
                role="img"
                viewBox="0 0 24 24"
                width={36}
                height={36}
                fill={`#${icon.hex}`}
                aria-label={icon.title}
              >
                <path d={icon.path} />
              </svg>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={project.cover}
                  alt={`Capa do projeto ${project.title}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="64px"
                />
              </div>
            )}
          </div>

          {/* Title + summary */}
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.summary}</p>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <StackIcon key={tech} name={tech} />
          ))}
        </div>
      </article>
    </Link>
  )
}
