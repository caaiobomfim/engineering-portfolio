import * as simpleIcons from 'simple-icons'
import type { Certification, CertificationStatus } from '@/lib/certifications'

// Same lookup pattern as StackIcon — server component, never ships to client
function lookupIcon(slug: string) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1)
  return (
    simpleIcons as Record<
      string,
      { hex: string; path: string; title: string } | undefined
    >
  )[key] ?? null
}

const statusStyles: Record<CertificationStatus, string> = {
  'Concluída': 'bg-green-50 text-green-700',
  'Em andamento': 'bg-blue-50 text-blue-700',
  'Expirada': 'bg-gray-100 text-gray-500',
}

interface CertificationCardProps {
  certification: Certification
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { title, issuer, issuerSlug, issueDate, status, credentialUrl, description } =
    certification

  const icon = issuerSlug ? lookupIcon(issuerSlug) : null

  const formattedDate = new Date(issueDate + 'T00:00:00').toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="border border-gray-200 rounded-lg bg-white p-5 hover:border-gray-400 transition-colors flex flex-col gap-4">
      {/* Header: icon + issuer */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 shrink-0">
          {icon ? (
            <svg
              role="img"
              viewBox="0 0 24 24"
              width={22}
              height={22}
              fill={`#${icon.hex}`}
              aria-label={icon.title}
            >
              <path d={icon.path} />
            </svg>
          ) : (
            <span className="text-sm font-semibold text-gray-500" aria-hidden>
              {issuer.charAt(0)}
            </span>
          )}
        </div>
        <span className="text-sm text-gray-500 font-medium leading-tight">{issuer}</span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-gray-900 leading-snug">{title}</h2>

        <div className="flex items-center gap-2 flex-wrap">
          <time
            dateTime={issueDate}
            className="text-xs text-gray-400 font-mono"
          >
            {formattedDate}
          </time>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>

        {description && (
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        )}
      </div>

      {/* Footer */}
      {credentialUrl && (
        <div className="mt-auto pt-1">
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
            aria-label={`Ver credencial: ${title}`}
          >
            Ver credencial
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}
    </article>
  )
}
