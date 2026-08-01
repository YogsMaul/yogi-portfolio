import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Button } from '@/components/ui/button'
import { VisitorStats } from '@/components/ui/visitor-stats'
import { Mail, ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <SectionWrapper className="section-divider">
      <div className="border-4 border-fg bg-primary text-on-primary shadow-brutal-lg p-10 md:p-14 text-center relative overflow-hidden">
        {/* Background pattern accent */}
        <div className="absolute inset-0 opacity-10 pattern-lines"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-block border-2 border-fg bg-secondary text-fg font-bold px-3 py-1 text-sm shadow-brutal mb-4 transform -rotate-1">
            ⚡ Ready for Full-Time Roles & Collaboration
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Tertarik Menjadikan Saya Bagian dari Tim Anda?
          </h2>
          <p className="text-lg md:text-xl text-on-primary/90 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            Saya siap mendedikasikan keahlian Mobile (Flutter &amp; Kotlin) — plus kemampuan web modern bila dibutuhkan — untuk membangun aplikasi berkinerja tinggi bagi perusahaan Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="gap-2 text-base md:text-lg px-8 py-4 font-bold border-2 shadow-brutal hover-lift">
                <Mail size={22} />
                Hubungi Saya Sekarang
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="gap-2 text-base md:text-lg px-8 py-4 font-bold border-2 bg-surface text-fg shadow-brutal hover-lift">
                Lihat Proyek Real
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>

          {/* Visitor Stats */}
          <div className="mt-10 pt-8 border-t-2 border-on-primary/20">
            <VisitorStats />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
