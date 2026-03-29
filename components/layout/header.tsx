import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors"
        >
          Caio Andrade
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/projects" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Projetos
          </Link>
        </nav>
      </div>
    </header>
  )
}
