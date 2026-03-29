import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: {
    template: '%s | Caio Andrade',
    default: 'Caio Andrade — Engenheiro de Software',
  },
  description: 'Portfólio de engenharia de software com projetos técnicos, arquitetura e aprendizados.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Caio Andrade
        </footer>
      </body>
    </html>
  )
}
