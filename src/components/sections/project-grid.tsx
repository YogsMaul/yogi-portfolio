import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import Link from 'next/link'
import { ArrowRight, GitFork, ExternalLink } from 'lucide-react'

export function ProjectGrid() {
  return (
    <SectionWrapper id="projects" className="section-divider accent-block pattern-diagonal" fullWidth>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="section-title">Proyek Unggulan</h2>
            <p className="section-subtitle">Pilihan karya terbaru yang menampilkan skill dan pengalaman saya.</p>
          </div>
          <Link href="/projects" className="mt-6 md:mt-0">
            <Button variant="outline" className="gap-2 border-2 font-bold hover-lift">
              Lihat Semua Proyek
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="flex flex-col h-full bg-surface border-2 animate-slide-up hover-lift hover-glow group shadow-brutal" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="border-b-2 pb-4">
                <Link href={`/projects/${project.slug}`}>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors cursor-pointer">{project.title}</CardTitle>
                </Link>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-4">
                <div>
                  <p className="text-fg/80 mb-6 font-semibold leading-snug">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs hover-bounce">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t-2 border-fg/20">
                  <Link href={`/projects/${project.slug}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full gap-1 font-bold hover-ripple">
                      Detail
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" title="Live Demo" className="hover-bounce">
                        <ExternalLink size={16} />
                      </Button>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" title="Source Code" className="hover-bounce">
                        <GitFork size={16} />
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
