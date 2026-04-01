import { getTagColor } from '@/lib/tag-colors'

interface TagBadgeProps {
  tag: string
  /** Whether this tag is currently active in the filter. Only relevant when onClick is provided. */
  isActive?: boolean
  /** When provided, renders as a button and calls this handler on click. */
  onClick?: (tag: string) => void
}

/**
 * Shared tag badge component. Renders as a <span> for display-only usage or
 * as a <button> when an onClick handler is provided (filter mode).
 *
 * Can be used in both server and client component contexts: only import with
 * onClick inside client components.
 */
export function TagBadge({ tag, isActive = false, onClick }: TagBadgeProps) {
  const color = getTagColor(tag)
  const base = `text-xs px-2.5 py-1 rounded-full font-medium transition-all ${color}`

  if (!onClick) {
    return <span className={`${base} opacity-90`}>{tag}</span>
  }

  return (
    <button
      type="button"
      onClick={() => onClick(tag)}
      aria-pressed={isActive}
      className={`${base} cursor-pointer ${
        isActive
          ? 'opacity-100 ring-2 ring-offset-1 ring-current'
          : 'opacity-60 hover:opacity-100'
      }`}
    >
      {tag}
    </button>
  )
}
