'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <SectionWrapper className="py-20">
      <Card className="mx-auto max-w-2xl border-2 shadow-brutal p-8 md:p-12 text-center bg-surface">
        <CardContent className="p-0 space-y-6">
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center w-16 h-16 border-2 border-fg bg-secondary shadow-brutal">
              <AlertTriangle size={32} />
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Yah, Ada yang Error</h1>
          <p className="text-fg/80 font-medium leading-relaxed">
            Halaman ini gagal dimuat. Coba muat ulang, atau kembali ke beranda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => unstable_retry()}
              className="gap-2 font-bold w-full sm:w-auto"
            >
              <RotateCcw size={20} />
              Coba Lagi
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="gap-2 font-bold border-2 w-full">
                <ArrowLeft size={20} />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  )
}
