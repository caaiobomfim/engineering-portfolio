export type ReadingStatus = 'completed' | 'reading' | 'to-read'
export type ReadingType = 'book' | 'article'

export interface ReadingItem {
  id: string
  title: string
  author: string
  type: ReadingType
  status: ReadingStatus
  category: string[]
  description: string
  link?: string
  year?: number
}

export const readingItems: ReadingItem[] = [
  {
    id: 'clean-architecture',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    type: 'book',
    status: 'completed',
    category: ['Architecture', 'Clean Code'],
    description: 'Conceitos fundamentais de arquitetura de software e separação de responsabilidades.',
    year: 2017,
  },
  {
    id: 'designing-data-intensive-applications',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    type: 'book',
    status: 'reading',
    category: ['Distributed Systems', 'Data Engineering'],
    description: 'Aborda sistemas distribuídos, consistência, escalabilidade e armazenamento de dados.',
    year: 2017,
  },
  {
    id: 'aws-well-architected',
    title: 'AWS Well-Architected Framework',
    author: 'AWS',
    type: 'article',
    status: 'reading',
    category: ['AWS', 'Cloud', 'Architecture'],
    description: 'Boas práticas para construir sistemas seguros, resilientes e eficientes na AWS.',
    link: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html',
  },
  {
    id: 'google-sre-book',
    title: 'Site Reliability Engineering - Google',
    author: 'Google',
    type: 'article',
    status: 'to-read',
    category: ['SRE', 'DevOps', 'Reliability'],
    description: 'Princípios e práticas de SRE utilizados pelo Google.',
    link: 'https://sre.google/sre-book/table-of-contents/',
  },
]

export function getReadingItems(): ReadingItem[] {
  return readingItems
}

export function groupByStatus(
  items: ReadingItem[],
): { status: ReadingStatus; label: string; items: ReadingItem[] }[] {
  const order: { status: ReadingStatus; label: string }[] = [
    { status: 'completed', label: 'Concluídos' },
    { status: 'reading', label: 'Lendo' },
    { status: 'to-read', label: 'Quero ler' },
  ]

  return order
    .map(({ status, label }) => ({
      status,
      label,
      items: items.filter((item) => item.status === status),
    }))
    .filter(({ items }) => items.length > 0)
}
