'use client'

import { useEffect, useState, use } from 'react'
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, RefreshCw, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DemoPageProps {
  params: Promise<{ slug: string }>
}

export default function ProjectDemoPage({ params }: DemoPageProps) {
  const { slug } = use(params)
  const project = projects.find((p) => p.slug === slug)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [demoTheme, setDemoTheme] = useState<'light' | 'dark'>('light')

  if (!project || !project.screenshots || project.screenshots.length === 0) {
    notFound()
  }

  const screenshots = project.screenshots
  const hasDarkLightMode = screenshots.some((s) => s.image.includes('/light_mode/'))
  
  const getActiveImage = (img: string) => {
    if (!hasDarkLightMode) return img
    if (demoTheme === 'dark') {
      // If login_page in dashboard_tiket doesn't exist in dark_mode, keep light_mode
      if (img.includes('/dashboard_tiket/light_mode/login_page.png')) {
        return img
      }
      return img.replace('/light_mode/', '/dark_mode/')
    }
    return img
  }

  const active = screenshots[activeIndex]
  const currentImage = getActiveImage(active.image)
  const isMobile = project.category === 'mobile'
  const appShort = project.title.split('—')[0].trim()

  useEffect(() => {
    if (screenshots.length < 2 || isPaused || isZoomed) return

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length)
    }, 3500)

    return () => window.clearInterval(id)
  }, [isPaused, isZoomed, screenshots.length])

  const pauseAutoScroll = () => setIsPaused(true)
  const resumeAutoScroll = () => setIsPaused(false)
  const openZoom = () => {
    setIsPaused(true)
    setIsZoomed(true)
  }
  const closeZoom = () => {
    setIsZoomed(false)
    setIsPaused(false)
  }

  return (
    <div className="h-screen bg-bg text-fg flex flex-col font-sans overflow-hidden select-none">
      {/* Top bar */}
      <div className="border-b-4 border-fg bg-bg p-3.5 flex items-center justify-between gap-4 z-30 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/projects/${project.slug}`}>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black border-2 border-fg bg-surface hover:bg-secondary shadow-brutal-sm hover-lift text-fg"
            >
              <ArrowLeft size={14} />
              <span>Keluar Demo</span>
            </button>
          </Link>

          {!isMobile && (
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border-2 border-fg" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border-2 border-fg" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border-2 border-fg" />
            </div>
          )}
        </div>

        {isMobile ? (
          <div className="flex-1 max-w-xl border-2 border-fg bg-surface px-4 py-1.5 text-xs font-bold text-fg flex items-center justify-between gap-3 rounded-lg truncate">
            <div className="flex items-center gap-2 truncate min-w-0">
              <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wider bg-secondary px-2 py-0.5 border border-fg">
                App
              </span>
              <span className="truncate">
                {appShort} · {active.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % screenshots.length)}
              title="Layar berikutnya"
              className="hover:text-primary transition-colors shrink-0"
            >
              <RefreshCw size={12} />
            </button>
          </div>
        ) : (
          <div className="flex-1 max-w-xl border-2 border-fg bg-surface px-4 py-1.5 text-xs font-bold text-fg/60 flex items-center justify-between gap-3 rounded-lg truncate">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#27C93F] font-extrabold select-none">https://</span>
              <span className="truncate">
                {project.slug}.yogi.dev{active.route}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % screenshots.length)}
              title="Refresh Halaman"
              className="hover:text-primary transition-colors shrink-0"
            >
              <RefreshCw size={12} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {hasDarkLightMode && (
            <button
              type="button"
              onClick={() => setDemoTheme(demoTheme === 'light' ? 'dark' : 'light')}
              className="px-2.5 py-1 border-2 border-fg bg-surface hover:bg-secondary text-fg flex items-center gap-1.5 shadow-brutal-sm hover-lift transition-colors rounded-md text-xs font-bold"
              title="Ganti tema UI screenshot proyek"
            >
              {demoTheme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span className="hidden md:inline">Mode UI Proyek: <strong className="capitalize">{demoTheme}</strong></span>
            </button>
          )}
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span className="text-[10px] font-extrabold tracking-wider uppercase bg-secondary px-2.5 py-1 border-2 border-fg shadow-brutal-sm hidden sm:inline">
            {isMobile ? 'Phone Simulator' : 'Interactive Simulator'}
          </span>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Sidebar */}
        <div className="w-72 border-r-4 border-fg bg-bg p-5 hidden md:flex flex-col gap-6 overflow-y-auto z-20">
          <div>
            <div className="text-[10px] font-black text-fg/50 uppercase tracking-widest mb-1">
              PROYEK DEMO
            </div>
            <h2 className="text-xl font-black text-fg leading-tight">{appShort}</h2>
            <p className="text-xs font-bold text-fg/60 mt-1 capitalize">
              {isMobile ? 'Mobile app' : 'Web app'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-black text-fg/50 uppercase tracking-widest mb-2">
              {isMobile ? 'Alur layar:' : 'Navigasi Halaman:'}
            </div>
            {screenshots.map((s, idx) => (
              <button
                key={s.route}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  'w-full text-left px-4 py-3 text-sm font-bold border-2 transition-all flex items-center justify-between gap-2 shadow-brutal-sm hover-lift',
                  activeIndex === idx
                    ? 'bg-primary text-on-primary border-fg'
                    : 'bg-surface text-fg border-fg hover:bg-secondary'
                )}
              >
                <span>{s.label}</span>
                {!isMobile && (
                  <span className="text-[10px] opacity-75 font-normal">{s.route}</span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-auto border-2 border-fg bg-secondary/10 p-4 shadow-brutal-sm text-xs font-semibold leading-relaxed">
            {isMobile ? (
              <>
                💡 <strong>Tips</strong>: Simulator UI mobile — klik alur di sidebar. Bukan APK live.
              </>
            ) : (
              <>
                💡 <strong>Tips</strong>: Scroll di area mockup kanan untuk halaman web yang panjang.
              </>
            )}
          </div>
        </div>

        {/* Viewport */}
        <div
          className={cn(
            'flex-1 p-4 md:p-6 pb-24 md:pb-6 flex',
            isMobile
              ? 'bg-neutral-900 items-center justify-center overflow-hidden'
              : 'bg-neutral-900 flex-col items-center justify-start overflow-auto'
          )}
        >
          {isMobile ? (
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              <div
                className="border-4 border-fg bg-fg rounded-[2.25rem] p-2.5 shadow-brutal-lg"
                onPointerDown={pauseAutoScroll}
                onPointerUp={resumeAutoScroll}
                onPointerCancel={resumeAutoScroll}
                onPointerLeave={resumeAutoScroll}
                onMouseEnter={pauseAutoScroll}
                onMouseLeave={resumeAutoScroll}
              >
                <div className="relative w-full rounded-[1.6rem] overflow-hidden bg-black border-2 border-fg/30">
                  <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-2 pointer-events-none">
                    <div className="h-6 w-28 rounded-full bg-fg" />
                  </div>
                  <div className="relative aspect-[9/19.5] w-full max-h-[min(78vh,720px)]">
                    <Image
                      src={currentImage}
                      alt={active.label}
                      fill
                      sizes="340px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={openZoom}
                className="absolute top-1/2 -right-3 sm:-right-16 -translate-y-1/2 border-2 border-fg bg-secondary text-fg px-3 py-2 text-xs font-black shadow-brutal-sm hover-lift"
                aria-label={`Zoom ${active.label}`}
                title="Klik untuk zoom"
              >
                Zoom
              </button>

              <p className="text-center text-xs font-bold text-white/70 mt-4">
                {active.label}
              </p>
            </div>
          ) : (
            <div 
              className="w-full max-w-6xl border-4 border-fg bg-[#F8F9FA] shadow-brutal-lg flex flex-col overflow-hidden rounded-xl"
              onMouseEnter={pauseAutoScroll}
              onMouseLeave={resumeAutoScroll}
            >
              <div className="overflow-y-auto overflow-x-hidden relative scrollbar-custom">
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentImage}
                    alt={active.label}
                    className="w-full h-auto object-contain object-top block transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom chips */}
      <div className="fixed bottom-0 left-0 right-0 border-t-4 border-fg bg-bg p-3.5 z-40 md:hidden flex flex-row flex-nowrap overflow-x-auto select-none shadow-[0_-4px_10px_rgba(0,0,0,0.15)] scroll-smooth scrollbar-none gap-2.5 [-webkit-overflow-scrolling:touch]">
        {screenshots.map((s, idx) => (
          <button
            key={s.route}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'whitespace-nowrap px-4 py-2.5 text-xs font-black border-2 transition-all shadow-brutal-sm shrink-0',
              activeIndex === idx
                ? 'bg-primary text-on-primary border-fg'
                : 'bg-surface text-fg border-fg hover:bg-secondary'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isZoomed && (
        <button
          type="button"
          onClick={closeZoom}
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          aria-label="Tutup zoom"
        >
          <div className="absolute inset-0" />
          <div className="relative w-full max-w-[96vw] max-h-[92vh] border-4 border-fg bg-black shadow-brutal-lg overflow-hidden">
            <div className="absolute left-3 top-3 z-20 border-2 border-fg bg-secondary px-2 py-1 text-[10px] font-black shadow-brutal-sm text-fg">
              Tap untuk tutup
            </div>
            <div className="relative w-full h-[92vh] max-h-[92vh]">
              <Image
                src={currentImage}
                alt={active.label}
                fill
                sizes="96vw"
                className="object-contain bg-black"
                priority
              />
            </div>
          </div>
        </button>
      )}
    </div>
  )
}
