export type CertificationStatus = 'Concluída' | 'Em andamento' | 'Expirada'

export interface Certification {
  id: string
  title: string
  issuer: string
  /** simple-icons slug for the issuer logo (see https://simpleicons.org) */
  issuerSlug?: string
  issueDate: string
  status: CertificationStatus
  credentialUrl?: string
  description?: string
}

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issuerSlug: 'amazonaws',
    issueDate: '2024-03-15',
    status: 'Concluída',
    credentialUrl: 'https://www.credly.com',
    description:
      'Valida habilidades em design de sistemas distribuídos escaláveis, resilientes e seguros na AWS.',
  },
  {
    id: '2',
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    issuerSlug: 'googlecloud',
    issueDate: '2023-11-20',
    status: 'Concluída',
    credentialUrl: 'https://www.credential.net',
    description:
      'Abrange processamento de dados, machine learning e infraestrutura de dados em larga escala no GCP.',
  },
  {
    id: '3',
    title: 'HashiCorp Terraform Associate',
    issuer: 'HashiCorp',
    issuerSlug: 'hashicorp',
    issueDate: '2024-07-01',
    status: 'Concluída',
    credentialUrl: 'https://www.credly.com',
    description:
      'Certifica o domínio de infraestrutura como código com Terraform para provisionamento multi-cloud.',
  },
  {
    id: '4',
    title: 'Microsoft Azure Fundamentals AZ-900',
    issuer: 'Microsoft',
    issuerSlug: 'microsoftazure',
    issueDate: '2023-06-10',
    status: 'Concluída',
    description:
      'Fundamentos de computação em nuvem, serviços Azure e modelos de responsabilidade compartilhada.',
  },
  {
    id: '5',
    title: 'Kubernetes and Cloud Native Associate',
    issuer: 'Cloud Native Computing Foundation',
    issuerSlug: 'kubernetes',
    issueDate: '2025-01-01',
    status: 'Em andamento',
    description:
      'Conhecimento fundamental sobre Kubernetes, containers e o ecossistema cloud native.',
  },
]

export function getCertifications(): Certification[] {
  return certifications.sort((a, b) => {
    // Em andamento first, then by issueDate descending
    if (a.status === 'Em andamento' && b.status !== 'Em andamento') return -1
    if (b.status === 'Em andamento' && a.status !== 'Em andamento') return 1
    return b.issueDate.localeCompare(a.issueDate)
  })
}
