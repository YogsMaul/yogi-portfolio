import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, FolderOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <SectionWrapper className="py-20">
      <Card className="mx-auto max-w-2xl border-2 shadow-brutal p-8 md:p-12 text-center bg-surface">
        <CardContent className="p-0 space-y-6">
          <div className="inline-block bg-primary text-on-primary border-2 border-fg shadow-brutal px-4 py-2 text-5xl font-black">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-fg/80 font-medium leading-relaxed">
            Yah, halaman yang kamu cari tidak ada atau sudah dipindahkan.
            Yuk kembali menjelajah portofolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/">
              <Button variant="primary" size="lg" className="gap-2 font-bold w-full sm:w-auto">
                <ArrowLeft size={20} />
                Kembali ke Beranda
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="gap-2 font-bold border-2 w-full sm:w-auto">
                <FolderOpen size={20} />
                Lihat Proyek
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  )
}
