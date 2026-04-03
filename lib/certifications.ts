export type CertificationStatus = 'active' | 'completed' | 'expired'

export interface Certification {
  id: string
  title: string
  issuer: string
  /** simple-icons slug for the issuer logo (see https://simpleicons.org) */
  issuerSlug?: string
  /** path relative to /public for a custom badge image */
  badgeUrl?: string
  issuedDate?: string
  expirationDate?: string
  status: CertificationStatus
  featured?: boolean
  credentialUrl?: string
}

export const certifications: Certification[] = [
  // AWS – active
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services Training and Certification',
    badgeUrl: '/images/certifications/aws-cloud-practitioner.png',
    expirationDate: '2027-09-28',
    status: 'active',
    featured: true,
  },
  {
    id: 'aws-developer-associate',
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    badgeUrl: '/images/certifications/aws-developer-associate.png',
    expirationDate: '2027-08-30',
    status: 'active',
    featured: true,
  },
  {
    id: 'aws-solutions-architect-associate',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    badgeUrl: '/images/certifications/aws-solutions-architect-associate.png',
    expirationDate: '2027-09-28',
    status: 'active',
    featured: true,
  },
  // Itaú – completed
  {
    id: 'itau-change-management',
    title: 'Change Management - Trained',
    issuer: 'Itaú Unibanco',
    badgeUrl: '/images/certifications/itau.png',
    issuedDate: '2023-10-11',
    status: 'completed',
  },
  {
    id: 'itau-engenharia-do-caos',
    title: 'Engenharia do Caos - Trained',
    issuer: 'Itaú Unibanco',
    badgeUrl: '/images/certifications/itau.png',
    issuedDate: '2025-09-30',
    status: 'completed',
  },
  {
    id: 'itau-dna-foundation',
    title: 'Practitioner - D&A Foundation',
    issuer: 'Itaú Unibanco',
    badgeUrl: '/images/certifications/itau.png',
    issuedDate: '2024-05-29',
    status: 'completed',
  },
  {
    id: 'itau-qualidade-em-mudancas',
    title: 'Qualidade em Mudanças - Trained',
    issuer: 'Itaú Unibanco',
    badgeUrl: '/images/certifications/itau.png',
    issuedDate: '2025-07-01',
    status: 'completed',
  },
  {
    id: 'itau-sre',
    title: 'SRE - Trained',
    issuer: 'Itaú Unibanco',
    badgeUrl: '/images/certifications/itau.png',
    issuedDate: '2025-09-30',
    status: 'completed',
  },
  // Certiprof – expired
  {
    id: 'certiprof-lgpd',
    title: 'Fundamentos Na Lei Geral De Proteção De Dados - LGPD™',
    issuer: 'Certiprof',
    badgeUrl: '/images/certifications/certiprof.png',
    expirationDate: '2024-09-01',
    status: 'expired',
  },
  {
    id: 'certiprof-lifelong-learning',
    title: 'Lifelong Learning',
    issuer: 'Certiprof',
    badgeUrl: '/images/certifications/certiprof.png',
    expirationDate: '2022-08-02',
    status: 'expired',
  },
  {
    id: 'certiprof-sfpc',
    title: 'Scrum Foundation Professional Certification - SFPC™',
    issuer: 'Certiprof',
    badgeUrl: '/images/certifications/certiprof.png',
    expirationDate: '2022-08-02',
    status: 'expired',
  },
]

export function groupByIssuer(
  certs: Certification[]
): { issuer: string; items: Certification[] }[] {
  const map = new Map<string, Certification[]>()
  for (const cert of certs) {
    if (!map.has(cert.issuer)) map.set(cert.issuer, [])
    map.get(cert.issuer)!.push(cert)
  }
  return Array.from(map.entries()).map(([issuer, items]) => ({ issuer, items }))
}

export function getFeaturedCertifications(): Certification[] {
  return getCertifications().filter((c) => c.featured)
}

export function getCertifications(): Certification[] {
  const statusOrder: Record<CertificationStatus, number> = {
    active: 0,
    completed: 1,
    expired: 2,
  }

  return [...certifications].sort((a, b) => {
    const orderDiff = statusOrder[a.status] - statusOrder[b.status]
    if (orderDiff !== 0) return orderDiff

    // Within the same status, sort by the relevant date descending
    const dateA = a.expirationDate ?? a.issuedDate ?? ''
    const dateB = b.expirationDate ?? b.issuedDate ?? ''
    return dateB.localeCompare(dateA)
  })
}
