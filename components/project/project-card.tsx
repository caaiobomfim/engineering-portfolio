import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'
import { getProjectIcon } from '@/lib/project-icons'
import { StackBadge } from './StackBadge'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const iconConfig = project.icon ? getProjectIcon(project.icon) : null
  const IconComponent = iconConfig?.icon ?? null

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="relative flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5 transition-all duration-200">
        {/* Top: icon + title/summary */}
        <div className="flex items-start gap-4">
          {/* Icon badge */}
          <div className={`flex items-center justify-center w-14 h-14 shrink-0 rounded-xl border transition-colors ${iconConfig ? iconConfig.containerClass : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600'}`}>
            {IconComponent ? (
              <IconComponent
                size={28}
                className={`${iconConfig!.iconClass} group-hover:scale-110 transition-transform duration-200`}
                aria-hidden
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <Image
                  src={project.cover}
                  alt={`Capa do projeto ${project.title}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            )}
          </div>

          {/* Title + summary */}
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-snug">
              {project.title}
            </h2>
            <p className="mt-1.5 text-sm text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed">{project.summary}</p>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <StackBadge key={tech} name={tech} />
          ))}
        </div>

        {/* "Ver projeto" indicator */}
        <span className="absolute bottom-5 right-5 text-xs text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex items-center gap-1 font-medium">
          Ver projeto
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </article>
    </Link>
  )
}
