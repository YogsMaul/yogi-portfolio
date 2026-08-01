'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale'
  delay?: number
}

export function ScrollAnimation({
  children,
  className,
  animation = 'slideUp',
  delay = 0,
}: ScrollAnimationProps) {
  const { ref, isVisible } = useScrollAnimation(0.1, true)

  const animationClass = {
    fade: 'reveal',
    slideUp: 'reveal reveal-fade-up',
    slideLeft: 'reveal reveal-fade-left',
    slideRight: 'reveal reveal-fade-right',
    scale: 'reveal reveal-zoom-in',
  }[animation]

  return (
    <div
      ref={ref}
      className={cn(
        animationClass,
        isVisible && 'is-visible',
        className
      )}
      style={{
        transitionDelay: `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  )
}
