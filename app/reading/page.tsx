import type { Metadata } from 'next'
import { getReadingItems, groupByStatus } from '@/lib/reading'
import { ReadingCard } from '@/components/reading/ReadingCard'

export const metadata: Metadata = {
  title: 'Leitura',
  description: 'Livros e artigos técnicos lidos, em leitura e na fila.',
}

export default function ReadingPage() {
  const items = getReadingItems()
  const groups = groupByStatus(items)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Leitura</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Livros e artigos técnicos — lidos, em leitura e na fila.
      </p>

      <div className="mt-10 space-y-10">
        {groups.map(({ status, label, items: groupItems }) => (
          <section key={status}>
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              {label}{' '}
              <span className="font-normal normal-case tracking-normal">({groupItems.length})</span>
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {groupItems.map((item) => (
                <ReadingCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
