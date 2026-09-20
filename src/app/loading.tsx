import { SectionWrapper } from '@/components/layout/section-wrapper'

export default function Loading() {
  return (
    <SectionWrapper className="py-12">
      <div className="border-2 border-fg bg-surface p-8 md:p-12 shadow-brutal-lg mb-12 animate-pulse-subtle" aria-hidden="true">
        <div className="h-6 w-40 border-2 border-fg bg-bg mb-4" />
        <div className="h-10 w-3/4 border-2 border-fg bg-bg mb-4" />
        <div className="h-5 w-full border-2 border-fg bg-bg mb-2" />
        <div className="h-5 w-2/3 border-2 border-fg bg-bg" />
      </div>
      <div className="grid md:grid-cols-2 gap-8" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-2 border-fg bg-surface p-6 shadow-brutal animate-pulse-subtle">
            <div className="h-6 w-1/2 border-2 border-fg bg-bg mb-4" />
            <div className="h-4 w-full border-2 border-fg bg-bg mb-2" />
            <div className="h-4 w-3/4 border-2 border-fg bg-bg" />
          </div>
        ))}
      </div>
      <span className="sr-only">Memuat konten…</span>
    </SectionWrapper>
  )
}
