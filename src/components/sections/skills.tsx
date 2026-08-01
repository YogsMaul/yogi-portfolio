'use client'

import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Badge } from '@/components/ui/badge'
import { skills } from '@/data/skills'
import { Skill } from '@/types'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const categories: Record<Skill['category'], string> = {
  mobile: 'Mobile Development',
  web: 'Web Frontend',
  tools: 'Tools & Lainnya',
}

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <SectionWrapper id="skills" className="bg-secondary/5 section-divider accent-block pattern-dots" fullWidth>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16">
          <h2 className="section-title">Skill & Teknologi</h2>
          <p className="section-subtitle">Fokus utama mobile (Flutter &amp; Kotlin), didukung kemampuan web modern.</p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {(Object.entries(categories) as [Skill['category'], string][]).map(([key, label], index) => {
            const categorySkills = skills.filter((skill) => skill.category === key)

            return (
              <div 
                key={key} 
                className={`border-2 border-fg bg-surface shadow-lg p-8 hover-lift hover-glow rounded-lg transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms` 
                }}
              >
                <div className="mb-6 pb-4 border-b-2 border-primary">
                  <h3 className="text-2xl font-bold">{label}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, skillIndex) => (
                    <Badge 
                      key={skill.name} 
                      variant="outline" 
                      className={`bg-bg px-3 py-2 text-sm hover-bounce border-2 transition-all duration-500 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 150 + skillIndex * 50}ms` 
                      }}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
