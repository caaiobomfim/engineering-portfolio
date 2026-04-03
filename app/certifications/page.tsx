import type { Metadata } from 'next'
import { getCertifications } from '@/lib/certifications'
import { CertificationsSection } from '@/components/certification/CertificationsSection'

export const metadata: Metadata = {
  title: 'Certificações',
  description: 'Certificações técnicas obtidas em plataformas como AWS, Google Cloud, HashiCorp e outras.',
}

export default function CertificationsPage() {
  const certifications = getCertifications()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Certificações</h1>
      <p className="mt-2 text-sm text-gray-500">
        Certificações técnicas em cloud, infraestrutura e engenharia de software.
      </p>
      <CertificationsSection certifications={certifications} />
    </div>
  )
}
