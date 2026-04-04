import Image from 'next/image'
import * as simpleIcons from 'simple-icons'
import type { Certification, CertificationStatus } from '@/lib/certifications'

function lookupIcon(slug: string) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1)
  return (
    simpleIcons as Record<
      string,
      { hex: string; path: string; title: string } | undefined
    >
  )[key] ?? null
}

const issuerAccent: Record<string, string> = {
  'Amazon Web Services Training and Certification': 'bg-[#FF9900]',
  'Cloud Native Computing Foundation': 'bg-[#0086FF]',
  'HashiCorp': 'bg-[#7B42BC]',
  'Datadog': 'bg-[#632CA6]',
  'Itaú Unibanco': 'bg-orange-600',
  'Certiprof': 'bg-[#003087]',
}

const statusStyles: Record<CertificationStatus, string> = {
  active: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  planned: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  completed: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  expired: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
}

const statusLabels: Record<CertificationStatus, string> = {
  active: 'Ativa',
  planned: 'Planejada',
  completed: 'Concluída',
  expired: 'Expirada',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface CertificationCardProps {
  certification: Certification
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { title, issuer, issuerSlug, badgeUrl, issuedDate, expirationDate, status, credentialUrl } =
    certification

  const icon = issuerSlug ? lookupIcon(issuerSlug) : null

  let dateLabel: string | null = null
  let dateValue: string | null = null

  if (status === 'active' && expirationDate) {
    dateLabel = 'Expires'
    dateValue = expirationDate
  } else if (status === 'planned') {
    dateLabel = null
    dateValue = null
  } else if (status === 'completed' && issuedDate) {
    dateLabel = 'Issued'
    dateValue = issuedDate
  } else if (status === 'expired' && expirationDate) {
    dateLabel = 'Expired'
    dateValue = expirationDate
  }

  const Wrapper = credentialUrl ? 'a' : 'article'
  const wrapperProps = credentialUrl
    ? { href: credentialUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const plannedStyles = status === 'planned'
    ? 'border-dashed opacity-75'
    : 'hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm'

  return (
    <Wrapper
      {...(wrapperProps as object)}
      className={`relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 p-5 transition-all flex items-center gap-5 ${plannedStyles}`}
    >
      {/* Issuer accent stripe */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${issuerAccent[issuer] ?? 'bg-gray-200 dark:bg-gray-700'}`} />

      {/* Badge */}
      <div className="flex items-center justify-center w-24 h-24 shrink-0 overflow-hidden">
        {badgeUrl ? (
          <Image
            src={badgeUrl}
            alt={title}
            width={96}
            height={96}
            className="object-contain w-full h-full"
          />
        ) : icon ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={64}
            height={64}
            fill={`#${icon.hex}`}
            aria-label={icon.title}
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="text-3xl font-bold text-gray-400" aria-hidden>
            {issuer.charAt(0)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <p className="text-xs text-gray-400 dark:text-gray-500">{issuer}</p>
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 leading-snug">{title}</h2>
        {dateLabel && dateValue && (
          <time dateTime={dateValue} className="text-xs text-gray-400 dark:text-gray-500 font-mono">
            {dateLabel} {formatDate(dateValue)}
          </time>
        )}
        <span className={`inline-flex items-center self-start px-2 py-0.5 rounded text-xs font-medium mt-0.5 ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
    </Wrapper>
  )
}
