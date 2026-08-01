'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (pathname.endsWith('/demo')) return null

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/about' },
    { name: 'Proyek', href: '/projects' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="border-b-2 border-fg bg-bg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-primary transition-colors flex items-center gap-3 group"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-10 h-10 rounded-xl border-2 border-fg shadow-brutal overflow-hidden bg-surface flex items-center justify-center transition-transform group-hover:scale-105">
            <Image
              src="/logo_yogi.png"
              alt="Yogi Logo"
              width={40}
              height={40}
              className="object-cover w-full h-full rounded-xl"
              priority
            />
          </div>
          <span className="font-extrabold tracking-tight text-fg">YOGI.DEV</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-bold transition-colors border-b-2 py-1 ${isActive(link.href)
                ? 'border-primary text-primary'
                : 'border-transparent hover:text-primary'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/contact">
            <Button variant="primary" size="sm" className="font-bold">
              Kontak
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border-2 border-fg bg-surface shadow-brutal font-bold flex items-center justify-center text-fg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-fg bg-surface p-6 space-y-4 shadow-brutal-lg animate-slide-up">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold py-2.5 px-4 border-2 border-fg shadow-brutal ${isActive(link.href)
                  ? 'bg-primary text-on-primary'
                  : 'bg-bg hover:bg-secondary text-fg'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)} className="pt-2">
              <Button variant="secondary" size="md" className="w-full font-bold py-3">
                Hubungi Kontak
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
