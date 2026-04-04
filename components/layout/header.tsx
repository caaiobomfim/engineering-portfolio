'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home', exact: true },
  { href: '/projects', label: 'Projetos', exact: false },
  { href: '/certifications', label: 'Certificações', exact: false },
]

export function Header() {
  const pathname = usePathname()

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Caio Bomfim Godoy
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-6">
            {navLinks.map(({ href, label, exact }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  isActive(href, exact)
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
