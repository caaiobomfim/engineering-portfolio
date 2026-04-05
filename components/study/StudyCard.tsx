import Link from 'next/link'
import type { Study, StudyLevel } from '@/lib/study-utils'
import { getTagColor } from '@/lib/tag-colors'

const LEVEL_CONFIG: Record<StudyLevel, { label: string; class: string }> = {
  básico: {
    label: 'Básico',
    class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  intermediário: {
    label: 'Intermediário',
    class: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  avançado: {
    label: 'Avançado',
    class: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  },
}

interface StudyCardProps {
  study: Study
}

export function StudyCard({ study }: StudyCardProps) {
  const level = LEVEL_CONFIG[study.level] ?? LEVEL_CONFIG['intermediário']

  return (
    <Link href={`/studies/${study.slug}`} className="group block">
      <article className="relative flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5 transition-all duration-200">
        {/* Icon + title */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/40 group-hover:border-violet-200 dark:group-hover:border-violet-700/60 transition-colors">
            <BookOpenIcon className="w-7 h-7 text-violet-500 dark:text-violet-400 group-hover:scale-110 transition-transform duration-200" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-snug">
              {study.title}
            </h2>
            <p className="mt-1.5 text-sm text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed">
              {study.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
          {/* Row 1: level + tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${level.class}`}>
              {level.label}
            </span>
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
            {study.tags.length > 3 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                +{study.tags.length - 3}
              </span>
            )}
          </div>
          {/* Row 2: reading time + "Ler estudo" */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <ClockIcon className="w-3.5 h-3.5" />
              {study.readingTime} min de leitura
            </span>
            <span className="text-xs text-gray-300 dark:text-gray-600 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-200 flex items-center gap-1 font-medium">
              Ler estudo
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}
