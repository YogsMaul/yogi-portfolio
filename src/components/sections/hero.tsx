'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import { ArrowRight, Sparkles, Code2 } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="relative pattern-grid accent-block-lg flex flex-col justify-between min-h-[calc(100vh-75px)] pt-6 lg:pt-10">
      {/* Hero Main Content */}
      <div className="mx-auto max-w-7xl px-4 w-full flex-1 flex items-center py-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 border-2 border-fg bg-secondary px-3 py-1 font-bold text-sm shadow-brutal animate-slide-up">
              <Sparkles size={16} />
              <span>Mobile Developer — Flutter & Kotlin</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] animate-slide-up border-b-4 border-primary pb-4">
                Hi, Saya{' '}
                <span className="text-primary block mt-1">Achmad Yogi Maulana</span>
              </h1>
              <p className="text-lg sm:text-xl text-fg/85 leading-relaxed animate-slide-up font-semibold" style={{ animationDelay: '0.2s' }}>
                Mobile Developer yang fokus bikin aplikasi Flutter &amp; Kotlin — dari <strong>sistem parkir digital dengan QRIS &amp; printer thermal</strong> (kolaborasi Pemda &amp; Bank), <strong>fuel monitoring system</strong>, sampai <strong>AI assistant chatbot</strong>. Juga eksplorasi UI native Android dengan Jetpack Compose.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/projects" className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Button variant="primary" size="lg" className="gap-2 text-base sm:text-lg px-6 py-3.5 font-bold shadow-brutal hover-lift">
                  Lihat Karya Saya
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <a href="/CV_ATS_Achmad_Yogi_Maulana.pdf" target="_blank" rel="noopener noreferrer" className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <Button variant="secondary" size="lg" className="gap-2 text-base sm:text-lg px-5 py-3.5 font-bold border-2 shadow-brutal hover-lift">
                  Download CV
                </Button>
              </a>
              <Link href="/contact" className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Button variant="outline" size="lg" className="text-base sm:text-lg px-5 py-3.5 font-bold border-2 shadow-brutal hover-lift">
                  Hubungi Saya
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image with Neo-Brutalism Framing */}
          <div className="lg:col-span-5 relative flex justify-center animate-slide-in-right">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Background offset card layer */}
              <div className="absolute inset-0 bg-primary border-4 border-fg translate-x-3 translate-y-3 shadow-brutal-lg animate-pulse-subtle"></div>
              
              {/* Main Photo Card */}
              <div className="relative border-4 border-fg bg-surface p-2 sm:p-3 shadow-brutal hover-lift overflow-hidden group transition-all duration-500 hover:shadow-brutal-lg hover:-rotate-1">
                <Image
                  src="/yogi_porto.jpg"
                  alt="Achmad Yogi Maulana - Mobile Developer"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Floating Neo-Brutalism Badge 1 */}
              <div className="absolute -top-3 -left-3 border-2 border-fg bg-secondary text-fg font-bold px-3 py-1.5 shadow-brutal text-xs sm:text-sm animate-float-slow hover:animate-none cursor-pointer hover:scale-110 transition-transform">
                ⚡ Mobile First
              </div>

              {/* Floating Neo-Brutalism Badge 2 */}
              <div className="absolute -bottom-3 -right-3 border-2 border-fg bg-bg text-fg font-bold px-3 py-1.5 shadow-brutal text-xs sm:text-sm flex items-center gap-1.5 animate-float-reverse hover:animate-none cursor-pointer hover:scale-110 transition-transform">
                <Code2 size={16} className="text-primary" />
                <span>Flutter • Kotlin • Compose</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Width Edge-to-Edge Marquee sitting ON TOP (z-30) */}
      <div className="w-full relative z-30 mt-auto pt-4 pb-0">
        <Marquee
          variant="secondary"
          className="w-full transform -rotate-1 scale-105 shadow-brutal-lg relative z-30"
          items={[
            'MAGANG KARYA IT @ BANK SUMSEL BABEL',
            'OPEN FOR FULL-TIME ROLES',
            'MOBILE DEVELOPER — FLUTTER & KOTLIN',
            'FLUTTER • KOTLIN • JETPACK COMPOSE • BLOC',
            'READY TO JOIN YOUR TEAM',
          ]}
        />
      </div>

      {/* Background Decorative Accent */}
      <div className="absolute top-10 right-0 w-80 h-80 border-4 border-secondary opacity-10 transform -skew-y-12 pointer-events-none"></div>
    </div>
  )
}
