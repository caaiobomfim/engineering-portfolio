'use client'

import { TagBadge } from './TagBadge'

interface TagFilterProps {
  allTags: string[]
  selectedTags: string[]
  onToggleTag: (tag: string) => void
  onClear: () => void
}

export function TagFilter({ allTags, selectedTags, onToggleTag, onClear }: TagFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {allTags.map((tag) => (
        <TagBadge
          key={tag}
          tag={tag}
          isActive={selectedTags.includes(tag)}
          onClick={onToggleTag}
        />
      ))}
      {selectedTags.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs px-2.5 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-500 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Limpar filtros
        </button>
      )}
    </div>
  )
}
