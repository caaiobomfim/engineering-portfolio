const COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-rose-100 text-rose-700',
  'bg-teal-100 text-teal-700',
  'bg-amber-100 text-amber-700',
  'bg-indigo-100 text-indigo-700',
] as const

// Deterministic hash: same tag always gets the same color across the app
function hashTag(tag: string): number {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) & 0xffff
  }
  return hash
}

export function getTagColor(tag: string): string {
  return COLORS[hashTag(tag) % COLORS.length]
}
