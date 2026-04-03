import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-32 text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Página não encontrada</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">O conteúdo que você procura não existe.</p>
      <Link href="/" className="mt-6 inline-block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
        ← Voltar para o início
      </Link>
    </div>
  )
}
