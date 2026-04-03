import {
  Landmark,
  Globe2,
  Server,
  Network,
  Database,
  ShieldCheck,
  BadgePercent,
  Coins,
  Code2,
  type LucideIcon,
} from 'lucide-react'

export interface ProjectIconConfig {
  icon: LucideIcon
  /** Tailwind classes for the icon container background and border */
  containerClass: string
  /** Tailwind class for the icon color */
  iconClass: string
}

const iconMap: Record<string, ProjectIconConfig> = {
  landmark: {
    icon: Landmark,
    containerClass: 'bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900/50 group-hover:border-blue-200 dark:group-hover:border-blue-800',
    iconClass: 'text-blue-500 dark:text-blue-400',
  },
  globe2: {
    icon: Globe2,
    containerClass: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/50 group-hover:border-emerald-200 dark:group-hover:border-emerald-800',
    iconClass: 'text-emerald-500 dark:text-emerald-400',
  },
  server: {
    icon: Server,
    containerClass: 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 group-hover:border-slate-200 dark:group-hover:border-slate-700',
    iconClass: 'text-slate-500 dark:text-slate-400',
  },
  network: {
    icon: Network,
    containerClass: 'bg-violet-50 dark:bg-violet-950/50 border-violet-100 dark:border-violet-900/50 group-hover:border-violet-200 dark:group-hover:border-violet-800',
    iconClass: 'text-violet-500 dark:text-violet-400',
  },
  database: {
    icon: Database,
    containerClass: 'bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/50 group-hover:border-amber-200 dark:group-hover:border-amber-800',
    iconClass: 'text-amber-500 dark:text-amber-400',
  },
  shieldcheck: {
    icon: ShieldCheck,
    containerClass: 'bg-green-50 dark:bg-green-950/50 border-green-100 dark:border-green-900/50 group-hover:border-green-200 dark:group-hover:border-green-800',
    iconClass: 'text-green-500 dark:text-green-400',
  },
  badgepercent: {
    icon: BadgePercent,
    containerClass: 'bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900/50 group-hover:border-blue-200 dark:group-hover:border-blue-800',
    iconClass: 'text-blue-500 dark:text-blue-400',
  },
  coins: {
    icon: Coins,
    containerClass: 'bg-yellow-50 dark:bg-yellow-950/50 border-yellow-100 dark:border-yellow-900/50 group-hover:border-yellow-200 dark:group-hover:border-yellow-800',
    iconClass: 'text-yellow-600 dark:text-yellow-400',
  },
  code2: {
    icon: Code2,
    containerClass: 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600',
    iconClass: 'text-gray-500 dark:text-gray-400',
  },
}

export function getProjectIcon(slug: string): ProjectIconConfig | null {
  return iconMap[slug.toLowerCase()] ?? null
}
