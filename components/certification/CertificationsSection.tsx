'use client'

import { useState } from 'react'
import type { Certification, CertificationStatus } from '@/lib/certifications'
import { groupByIssuer } from '@/lib/certifications'
import { CertificationCard } from './CertificationCard'

type Filter = 'all' | CertificationStatus

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'expired', label: 'Expired' },
]

interface Props {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const filtered =
    activeFilter === 'all'
      ? certifications
      : certifications.filter((c) => c.status === activeFilter)

  const groups = groupByIssuer(filtered)

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Filtrar por status">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            aria-pressed={activeFilter === value}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeFilter === value
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

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
