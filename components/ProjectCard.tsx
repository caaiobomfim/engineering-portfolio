import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/mdx'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors bg-white">
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={project.cover}
            alt={`Capa do projeto ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-5">
          <h2 className="text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
