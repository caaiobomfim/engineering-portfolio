import Image from 'next/image'
import * as simpleIcons from 'simple-icons'
import { getStackSlug } from '@/lib/stack-icons'
import { getStackAsset } from '@/lib/stack-assets'

function lookupSimpleIcon(slug: string) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1)
  return (simpleIcons as Record<string, { hex: string; path: string; title: string } | undefined>)[key] ?? null
}

const badgeBase = 'flex items-center justify-center w-7 h-7 rounded-md bg-gray-50 border border-gray-100'
const textBadgeBase = 'flex items-center h-7 px-2 rounded-md bg-gray-50 border border-gray-100 text-xs font-mono text-gray-400 whitespace-nowrap'

interface StackBadgeProps {
  name: string
}

/**
 * Renders a stack technology badge with a 3-tier icon resolution:
 *   1. Local asset from /public/icons/stacks/ (highest priority)
 *   2. simple-icons branded SVG
 *   3. Text fallback (for conceptual terms like DDD, Clean Architecture, etc.)
 *
 * This is a Server Component — icon data never reaches the client bundle.
 */
export function StackBadge({ name }: StackBadgeProps) {
  // Tier 1: custom local asset
  // Only add entries to stack-assets.ts when the file is present in /public/icons/stacks/
  const assetPath = getStackAsset(name)
  if (assetPath) {
    return (
      <span title={name} className={badgeBase}>
        <Image
          src={assetPath}
          alt={name}
          width={18}
          height={18}
          className="object-contain w-[18px] h-[18px]"
        />
      </span>
    )
  }

  // Tier 2: simple-icons branded SVG
  const slug = getStackSlug(name)
  const icon = slug ? lookupSimpleIcon(slug) : null
  if (icon) {
    return (
      <span title={name} className={badgeBase}>
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill={`#${icon.hex}`}
          aria-label={icon.title}
        >
          <path d={icon.path} />
        </svg>
      </span>
    )
  }

  // Tier 3: text fallback — for conceptual terms (DDD, Clean Architecture, etc.)
  return (
    <span title={name} className={textBadgeBase}>
      {name}
    </span>
  )
}
