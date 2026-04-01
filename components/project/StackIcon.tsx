import * as simpleIcons from 'simple-icons'
import { getStackSlug } from '@/lib/stack-icons'

// simple-icons exports icons as `siSlug` (e.g., siGo, siRedis)
function lookupIcon(slug: string) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1)
  return (simpleIcons as Record<string, { hex: string; path: string; title: string } | undefined>)[key] ?? null
}

interface StackIconProps {
  name: string
}

/**
 * Renders a branded SVG icon for techs present in simple-icons, or a plain
 * text badge as fallback. This is a Server Component — the full simple-icons
 * library is never shipped to the client bundle.
 */
export function StackIcon({ name }: StackIconProps) {
  const slug = getStackSlug(name)
  const icon = slug ? lookupIcon(slug) : null

  if (icon) {
    return (
      <span
        title={name}
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={18}
          height={18}
          fill={`#${icon.hex}`}
          aria-label={icon.title}
        >
          <path d={icon.path} />
        </svg>
      </span>
    )
  }

  return (
    <span
      title={name}
      className="flex items-center h-8 px-2 rounded-lg bg-gray-100 text-xs font-mono text-gray-600 hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      {name}
    </span>
  )
}
