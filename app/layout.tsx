import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: {
    template: '%s | Caio Bomfim Godoy',
    default: 'Caio Bomfim Godoy — Engenheiro de Software',
  },
  description: 'Portfólio de engenharia de software com projetos técnicos, arquitetura e aprendizados.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Caio Bomfim Godoy
          </footer>
        </Providers>
      </body>
    </html>
  )
}
