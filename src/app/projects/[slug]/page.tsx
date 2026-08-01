import { projects } from '@/data/projects'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, GitFork, CheckCircle2, Zap, Layers } from 'lucide-react'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan',
    }
  }

  return {
    title: `${project.title} | Detail Proyek`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <SectionWrapper className="py-12">
      {/* Navigation back */}
      <div className="mb-8">
        <Link href="/projects">
          <Button variant="outline" size="sm" className="gap-2 font-bold hover-lift border-2">
            <ArrowLeft size={18} />
            Kembali ke Semua Proyek
          </Button>
        </Link>
      </div>

      {/* Header section */}
      <div className="border-2 border-fg bg-surface p-8 md:p-12 shadow-brutal-lg mb-12 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="primary" className="text-sm uppercase tracking-wider px-3 py-1">
            {project.category}
          </Badge>
          {project.featured && (
            <Badge variant="secondary" className="text-sm font-bold px-3 py-1">
              ★ Unggulan
            </Badge>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-fg/85 max-w-3xl leading-relaxed mb-8 font-medium">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-bg text-sm px-3 py-1 border-2 font-semibold">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-fg/20">
          {project.screenshots && project.screenshots.length > 0 ? (
            <Link href={`/projects/${project.slug}/demo`}>
              <Button variant="primary" size="lg" className="gap-2 font-bold px-6 shadow-brutal hover-lift">
                <ExternalLink size={20} />
                Lihat Live Demo (Simulator)
              </Button>
            </Link>
          ) : (
            project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="gap-2 font-bold px-6">
                  <ExternalLink size={20} />
                  Lihat Live Demo
                </Button>
              </a>
            )
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2 font-bold px-6 border-2">
                <GitFork size={20} />
                Kode Source Code
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {project.metrics.map((metric) => (
            <Card key={metric.label} className="bg-secondary/20 border-2 text-center p-6 shadow-brutal hover-lift">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-fg mb-1">{metric.value}</div>
                <div className="text-sm font-bold text-fg/70 uppercase tracking-wide">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Details Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left column: Key features & breakdown */}
        <div className="md:col-span-2 space-y-8">
          {project.features && (
            <Card className="bg-surface border-2 shadow-brutal p-6 md:p-8">
              <CardHeader className="p-0 mb-6 border-b-2 border-fg pb-4">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Layers className="text-primary" size={28} />
                  Fitur Utamanya
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-4">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-lg leading-relaxed">
                      <CheckCircle2 size={24} className="text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Technical Challenge & Solution */}
          {(project.challenges || project.solutions) && (
            <div className="grid md:grid-cols-2 gap-6">
              {project.challenges && (
                <Card className="bg-bg border-2 border-fg shadow-brutal p-6">
                  <CardHeader className="p-0 mb-4 border-b-2 border-fg pb-3">
                    <CardTitle className="text-xl flex items-center gap-2 text-fg">
                      <Zap className="text-primary" size={22} />
                      Tantangan Teknis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-fg/85 leading-relaxed">
                    {project.challenges}
                  </CardContent>
                </Card>
              )}

              {project.solutions && (
                <Card className="bg-primary/10 border-2 border-fg shadow-brutal p-6">
                  <CardHeader className="p-0 mb-4 border-b-2 border-fg pb-3">
                    <CardTitle className="text-xl flex items-center gap-2 text-primary">
                      <CheckCircle2 size={22} />
                      Solusi Diterapkan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-fg/85 leading-relaxed">
                    {project.solutions}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Right column: Quick Info & Next Project */}
        <div className="space-y-6">
          <Card className="bg-surface border-2 shadow-brutal p-6">
            <CardHeader className="p-0 mb-4 border-b-2 border-fg pb-3">
              <CardTitle className="text-xl">Informasi Singkat</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4 font-medium">
              <div className="flex justify-between border-b-2 border-fg/10 pb-2">
                <span className="text-fg/60">Kategori</span>
                <span className="capitalize">{project.category}</span>
              </div>
              <div className="flex justify-between border-b-2 border-fg/10 pb-2">
                <span className="text-fg/60">Status</span>
                <span className="text-primary font-bold">Selesai</span>
              </div>
              <div className="flex justify-between border-b-2 border-fg/10 pb-2">
                <span className="text-fg/60">Total Tag</span>
                <span>{project.tags.length} Teknologi</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary p-6 border-2 shadow-brutal">
            <CardContent className="p-0 text-fg space-y-4">
              <h3 className="text-xl font-bold">Tertarik Dengan Proyek Serupa?</h3>
              <p className="text-sm font-medium leading-relaxed">
                Mari buat aplikasi berkinerja tinggi dengan antarmuka neo-brutalism yang unik untuk bisnis Anda.
              </p>
              <Link href="/contact" className="block pt-2">
                <Button variant="primary" className="w-full font-bold">
                  Konsultasi Sekarang
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
