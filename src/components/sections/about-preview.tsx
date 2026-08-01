import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AboutPreview() {
  return (
    <SectionWrapper id="about" className="bg-primary/10 overflow-hidden -mt-6 pt-16 pb-20 accent-block pattern-lines relative z-10" fullWidth>
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <div className="mb-6 border-b-4 border-primary pb-4">
              <h2 className="text-4xl font-bold">Tentang Saya</h2>
              <div className="h-1 w-16 bg-secondary mt-3"></div>
            </div>
            <div className="space-y-4 text-lg">
              <p className="border-l-4 border-primary pl-4 py-2 font-medium">
                Halo! Saya <strong>Achmad Yogi Maulana</strong> — Mobile Developer lulusan{' '}
                <strong>D3 Teknik Komputer Polsri</strong>, sedang lanjut{' '}
                <strong>S1 Sistem Informasi (UT Palembang)</strong>, dan aktif di program{' '}
                <strong>Magang Karya IT Bank Sumsel Babel</strong>.
              </p>
              <p className="border-l-4 border-secondary pl-4 py-2 font-medium">
                Fokus Flutter &amp; Kotlin untuk aplikasi mobile nyata —
                termasuk SiParkGo (kolaborasi Pemda Babel &amp; BSB), FuelIn, dan eksplorasi UI native perbankan.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/about">
                <Button variant="secondary" className="font-bold border-2 shadow-brutal hover-lift">Baca Biodata Lengkap</Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-secondary translate-x-4 translate-y-4 border-2 border-fg animate-pulse-subtle"></div>
            <Card className="relative z-10 bg-bg p-8 border-2 shadow-brutal">
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b-2 border-fg pb-2 font-bold">
                  <span>Fokus</span>
                  <span className="text-primary">Mobile (Flutter &amp; Kotlin)</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-fg pb-2 font-bold">
                  <span>Pengalaman</span>
                  <span className="text-secondary">Magang Karya IT (BSB)</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-fg pb-2 font-bold">
                  <span>Ketersediaan</span>
                  <span className="text-primary font-bold">Siap Full-Time / Hire</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
