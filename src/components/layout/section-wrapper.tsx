'use client'

import { cn } from '@/lib/utils'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
}

export function SectionWrapper({ children, className, id, fullWidth = false }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollAnimation(0.05, true)

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'reveal reveal-fade-up',
        isVisible && 'is-visible',
        fullWidth ? 'w-full' : 'mx-auto max-w-7xl px-4',
        !fullWidth && 'px-4',
        'py-16 md:py-20',
        className
      )}
    >
      {fullWidth ? (
        <div className="mx-auto max-w-7xl px-4">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}
