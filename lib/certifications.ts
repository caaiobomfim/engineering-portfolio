export type CertificationStatus = 'active' | 'planned' | 'completed' | 'expired'

export interface Certification {
  id: string
  title: string
  issuer: string
  /** Short display name for the issuer — used in filter chips */
  issuerShort?: string
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
    issuerShort: 'AWS',
    badgeUrl: '/images/certifications/aws-cloud-practitioner.png',
    expirationDate: '2027-09-28',
    status: 'active',
    featured: true,
  },
  {
    id: 'aws-developer-associate',
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issuerShort: 'AWS',
    badgeUrl: '/images/certifications/aws-developer-associate.png',
    expirationDate: '2027-08-30',
    status: 'active',
    featured: true,
  },
  {
    id: 'aws-solutions-architect-associate',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issuerShort: 'AWS',
    badgeUrl: '/images/certifications/aws-solutions-architect-associate.png',
    expirationDate: '2027-09-28',
    status: 'active',
    featured: true,
  },
  // AWS – planned
  {
    id: 'aws-cloudops-engineer-associate',
    title: 'AWS Certified CloudOps Engineer – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issuerShort: 'AWS',
    badgeUrl: '/images/certifications/aws-cloudops-engineer-associate.png',
    status: 'planned',
  },
  {
    id: 'aws-ai-practitioner',
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services Training and Certification',
    issuerShort: 'AWS',
    badgeUrl: '/images/certifications/aws-ai-practitioner.png',
    status: 'planned',
  },
  // CNCF – planned
  {
    id: 'ckad',
    title: 'Certified Kubernetes Application Developer – CKAD',
    issuer: 'Cloud Native Computing Foundation',
    issuerShort: 'CNCF',
    badgeUrl: '/images/certifications/ckad.png',
    status: 'planned',
  },
  // Datadog – planned
  {
    id: 'datadog-fundamentals',
    title: 'Datadog Fundamentals',
    issuer: 'Datadog',
    status: 'planned',
    badgeUrl: '/images/certifications/certified-datadog-fundamentals.png',
  },
  // HashiCorp – planned
  {
    id: 'hashicorp-terraform-associate',
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    status: 'planned',
    badgeUrl: '/images/certifications/terraform-associate.png',
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
    planned: 1,
    completed: 2,
    expired: 3,
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
