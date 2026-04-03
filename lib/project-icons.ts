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
    containerClass: 'bg-blue-50 border-blue-100 group-hover:border-blue-200',
    iconClass: 'text-blue-500',
  },
  globe2: {
    icon: Globe2,
    containerClass: 'bg-emerald-50 border-emerald-100 group-hover:border-emerald-200',
    iconClass: 'text-emerald-500',
  },
  server: {
    icon: Server,
    containerClass: 'bg-slate-50 border-slate-100 group-hover:border-slate-200',
    iconClass: 'text-slate-500',
  },
  network: {
    icon: Network,
    containerClass: 'bg-violet-50 border-violet-100 group-hover:border-violet-200',
    iconClass: 'text-violet-500',
  },
  database: {
    icon: Database,
    containerClass: 'bg-amber-50 border-amber-100 group-hover:border-amber-200',
    iconClass: 'text-amber-500',
  },
  shieldcheck: {
    icon: ShieldCheck,
    containerClass: 'bg-green-50 border-green-100 group-hover:border-green-200',
    iconClass: 'text-green-500',
  },
  badgepercent: {
    icon: BadgePercent,
    containerClass: 'bg-blue-50 border-blue-100 group-hover:border-blue-200',
    iconClass: 'text-blue-500',
  },
  coins: {
    icon: Coins,
    containerClass: 'bg-yellow-50 border-yellow-100 group-hover:border-yellow-200',
    iconClass: 'text-yellow-600',
  },
  code2: {
    icon: Code2,
    containerClass: 'bg-gray-50 border-gray-100 group-hover:border-gray-200',
    iconClass: 'text-gray-500',
  },
}

export function getProjectIcon(slug: string): ProjectIconConfig | null {
  return iconMap[slug.toLowerCase()] ?? null
}
