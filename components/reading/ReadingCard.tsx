import { BookOpen, Newspaper, ExternalLink } from 'lucide-react'
import type { ReadingItem, ReadingStatus } from '@/lib/reading'

const typeConfig = {
  book: {
    Icon: BookOpen,
    iconClass: 'text-amber-500 dark:text-amber-400',
  },
  article: {
    Icon: Newspaper,
    iconClass: 'text-blue-500 dark:text-blue-400',
  },
}

const statusStyles: Record<ReadingStatus, string> = {
  completed: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  reading: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'to-read': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

const statusLabels: Record<ReadingStatus, string> = {
  completed: 'Concluído',
  reading: 'Lendo',
  'to-read': 'Quero ler',
}

interface ReadingCardProps {
  item: ReadingItem
}

export function ReadingCard({ item }: ReadingCardProps) {
  const { title, author, type, status, category, description, link, year } = item
  const { Icon, iconClass } = typeConfig[type]

  const Wrapper = link ? 'a' : 'article'
  const wrapperProps = link
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...(wrapperProps as object)}
      className={`group flex flex-col gap-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 p-5 transition-all ${
        link
          ? 'hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer'
          : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <Icon size={20} className={iconClass} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-1.5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
              {title}
            </h2>
            {link && (
              <ExternalLink
                size={12}
                className="mt-0.5 shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                aria-hidden
              />
            )}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {author}
            {year ? ` · ${year}` : ''}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>

      {/* Footer: categories + status */}
      <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-1">
        {category.map((cat) => (
          <span
            key={cat}
            className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            {cat}
          </span>
        ))}
        <span
          className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>
    </Wrapper>
  )
}
