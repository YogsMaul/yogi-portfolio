'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import Link from 'next/link'
import { GitFork, ExternalLink, ArrowRight, Filter, Search } from 'lucide-react'

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mobile' | 'web'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <SectionWrapper>
      <div className="mb-8 border-b-4 border-primary pb-6">
        <h1 className="text-5xl font-bold mb-4">Semua Proyek Real</h1>
        <p className="text-xl text-fg/80 max-w-2xl font-medium">
          Koleksi 7 proyek asli yang telah saya bangun, mencakup solusi Mobile App (Flutter & Native Kotlin) dan Web App (React & Next.js).
        </p>
      </div>

      {/* Search Input Neo-Brutalism */}
      <div className="mb-6 max-w-md relative">
        <input
          type="text"
          placeholder="Cari proyek (misal: Kotlin, Flutter, Compose, BLoC)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-11 text-sm font-bold border-2 border-fg bg-surface text-fg shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary placeholder-fg/50 rounded-md"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-fg/50 pointer-events-none" size={18} />
      </div>

      {/* Filter Tabs Neo-Brutalism */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <div className="flex items-center gap-2 font-bold text-fg/80 mr-2">
          <Filter size={20} />
          <span>Filter Kategori:</span>
        </div>
        <Button
          variant={activeCategory === 'all' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('all')}
          className="font-bold border-2 shadow-brutal hover-lift"
        >
          Semua Proyek ({projects.length})
        </Button>
        <Button
          variant={activeCategory === 'mobile' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('mobile')}
          className="font-bold border-2 shadow-brutal hover-lift"
        >
          📱 Mobile App ({projects.filter((p) => p.category === 'mobile').length})
        </Button>
        <Button
          variant={activeCategory === 'web' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('web')}
          className="font-bold border-2 shadow-brutal hover-lift"
        >
          💻 Web App ({projects.filter((p) => p.category === 'web').length})
        </Button>
      </div>

      {/* Grid Proyek */}
      {filteredProjects.length === 0 ? (
        <Card className="bg-surface border-2 shadow-brutal p-8 text-center max-w-xl mx-auto my-12">
          <CardContent className="space-y-4 pt-6">
            <div className="text-4xl">🔍</div>
            <h3 className="text-2xl font-bold">Proyek Tidak Ditemukan</h3>
            <p className="text-fg/70 font-semibold text-sm leading-relaxed">
              Tidak ada proyek yang cocok dengan kata kunci pencarian &quot;{searchQuery}&quot;. Silakan coba dengan kata kunci lain.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="mt-2 font-bold shadow-brutal hover-lift"
            >
              Reset Filter & Pencarian
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full bg-surface border-2 shadow-brutal hover-lift transition-all">
            <CardHeader className="border-b-2 bg-secondary/20">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 border-2 border-fg bg-surface shadow-brutal">
                  {project.category === 'mobile' ? '📱 Mobile App' : '💻 Web App'}
                </span>
                {project.featured && (
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 border border-fg bg-primary text-on-primary">
                    ★ Featured
                  </span>
                )}
              </div>
              <Link href={`/projects/${project.slug}`}>
                <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">{project.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-6">
              <div>
                <p className="text-lg text-fg/85 mb-5 font-semibold leading-snug">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t-2 border-fg/20">
                <Link href={`/projects/${project.slug}`} className="flex-1">
                  <Button variant="primary" size="md" className="w-full gap-2 font-bold shadow-brutal hover-lift">
                    Lihat Detail Proyek
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="md" title="Live Demo / Repository" className="border-2 shadow-brutal hover-lift">
                      <ExternalLink size={18} />
                    </Button>
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="md" title="Source Code" className="border-2 shadow-brutal hover-lift">
                      <GitFork size={18} />
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}
    </SectionWrapper>
  )
}
