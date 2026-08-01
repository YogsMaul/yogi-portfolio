'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SplashLoader() {
  const [isSplitting, setIsSplitting] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isDestroyed, setIsDestroyed] = useState(false)

  useEffect(() => {
    // 1. Trigger lightning split reveal after 1.4s
    const timer1 = setTimeout(() => {
      setIsSplitting(true)
    }, 1400)

    // 2. Fade out splash screen container at 2.4s
    const timer2 = setTimeout(() => {
      setIsFadingOut(true)
    }, 2400)

    // 3. Unmount component at 2.8s
    const timer3 = setTimeout(() => {
      setIsDestroyed(true)
    }, 2800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  if (isDestroyed) return null

  // Clean, sharp ⚡ lightning bolt coordinates
  const lightningPath = "M 0 60 L 300 60 L 350 25 L 400 90 L 450 40 L 500 60 L 700 60 L 750 40 L 800 90 L 850 30 L 900 60 L 1200 60"

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-99999 pointer-events-none flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Half Panel (Starts CLOSED, then slides UP to reveal) */}
      <div
        className={`fixed top-0 left-0 w-full h-[52vh] bg-bg transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-99999 ${
          isSplitting ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute inset-0 opacity-15 pattern-dots pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/5 pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Bottom Half Panel (Starts CLOSED, then slides DOWN to reveal) */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[52vh] bg-bg transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-99999 ${
          isSplitting ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute inset-0 opacity-15 pattern-dots pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-secondary/5 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Clean ⚡ Lightning Bolt Lines */}
      <div
        className={`fixed inset-x-0 top-1/2 -translate-y-1/2 z-100000 w-full flex items-center justify-center transition-all duration-700 pointer-events-none ${
          isSplitting ? 'opacity-0 scale-y-125' : 'opacity-100 scale-y-100'
        }`}
      >
        <svg
          className="w-full h-24 drop-shadow-[0_0_15px_rgba(14,165,233,0.9)]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black Sharp Outer Line */}
          <path
            d={lightningPath}
            stroke="#0a0a0a"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cyan Glow Line */}
          <path
            d={lightningPath}
            stroke="#0ea5e9"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Yellow Core Lightning */}
          <path
            d={lightningPath}
            stroke="#facc15"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Center Neo-Brutalism Badge */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100001 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none transform ${
          isSplitting ? 'scale-125 opacity-0 rotate-3' : 'scale-100 opacity-100 rotate-0'
        }`}
      >
        <div className="border-4 border-fg bg-secondary text-fg font-bold px-8 py-4 text-2xl md:text-3xl shadow-brutal-lg flex items-center gap-3 relative z-50">
          <Image src="/logo_yogi.png" alt="Logo Yogi" width={48} height={48} className="block" />
          <span className="text-2xl font-extrabold tracking-wider text-fg">ACHMAD YOGI MAULANA</span>
        </div>
      </div>
    </div>
  )
}
