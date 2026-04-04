'use client'

import { useState, useMemo } from 'react'
import type { Certification, CertificationStatus } from '@/lib/certifications'
import { groupByIssuer } from '@/lib/certifications'
import { CertificationCard } from './CertificationCard'

type StatusFilter = 'all' | CertificationStatus

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Ativas' },
  { value: 'planned', label: 'Planejadas' },
  { value: 'completed', label: 'Concluídas' },
  { value: 'expired', label: 'Expiradas' },
]

const statsDef = [
  { key: 'total' as const, label: 'Total', color: 'text-gray-900 dark:text-gray-100' },
  { key: 'active' as const, label: 'Ativas', color: 'text-green-600 dark:text-green-400' },
  { key: 'planned' as const, label: 'Planejadas', color: 'text-amber-600 dark:text-amber-400' },
  { key: 'completed' as const, label: 'Concluídas', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'expired' as const, label: 'Expiradas', color: 'text-gray-400 dark:text-gray-500' },
]

interface Props {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: Props) {
  const [activeStatus, setActiveStatus] = useState<StatusFilter>('all')
  const [activeIssuer, setActiveIssuer] = useState<string>('all')
  const [search, setSearch] = useState('')

  // Stats always computed from the full list
  const stats = useMemo(() => {
    const counts = { total: certifications.length, active: 0, planned: 0, completed: 0, expired: 0 }
    for (const c of certifications) counts[c.status]++
    return counts
  }, [certifications])

  // Unique issuers preserving order of first appearance
  const issuers = useMemo(() => {
    const seen = new Set<string>()
    const result: { issuer: string; short: string }[] = []
    for (const c of certifications) {
      if (!seen.has(c.issuer)) {
        seen.add(c.issuer)
        result.push({ issuer: c.issuer, short: c.issuerShort ?? c.issuer })
      }
    }
    return result
  }, [certifications])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return certifications
      .filter((c) => activeStatus === 'all' || c.status === activeStatus)
      .filter((c) => activeIssuer === 'all' || c.issuer === activeIssuer)
      .filter((c) => !q || c.title.toLowerCase().includes(q))
  }, [certifications, activeStatus, activeIssuer, search])

  const groups = groupByIssuer(filtered)

  const chipClass = (active: boolean) =>
    `px-3 py-1 rounded-full text-sm font-medium transition-colors ${
      active
        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
    }`

  return (
    <div>
      {/* Stats panel */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {statsDef.map(({ key, label, color }) => (
          <div
            key={key}
            className="border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-center bg-white dark:bg-gray-900"
          >
            <p className={`text-2xl font-bold ${color}`}>{stats[key]}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters panel */}
      <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
        {/* Search row */}
        <div className="px-4 py-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar certificação..."
            className="w-full sm:max-w-xs px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          />
        </div>

        {/* Status filter */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
            Status
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
            {statusFilters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveStatus(value)}
                aria-pressed={activeStatus === value}
                className={chipClass(activeStatus === value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Issuer filter */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
            Emissor
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por emissor">
            <button
              onClick={() => setActiveIssuer('all')}
              aria-pressed={activeIssuer === 'all'}
              className={chipClass(activeIssuer === 'all')}
            >
              Todos
            </button>
            {issuers.map(({ issuer, short }) => (
              <button
                key={issuer}
                onClick={() => setActiveIssuer(issuer)}
                aria-pressed={activeIssuer === issuer}
                className={chipClass(activeIssuer === issuer)}
              >
                {short}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty state */}
      {groups.length === 0 && (
        <p className="mt-12 text-sm text-gray-400 dark:text-gray-500">
          Nenhuma certificação encontrada.
        </p>
      )}

      {/* Groups */}
      <div className="mt-8 space-y-8">
        {groups.map(({ issuer, items }) => (
          <div key={issuer}>
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              {issuer}{' '}
              <span className="font-normal normal-case tracking-normal">({items.length})</span>
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {items.map((cert) => (
                <CertificationCard key={cert.id} certification={cert} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
