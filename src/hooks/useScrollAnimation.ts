'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.05, triggerOnce = true) {
  const ref = useRef<HTMLDivElement>(null)
  // Default to true so initial page load / refresh has 0 blink/fade-in delay
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const rect = currentRef.getBoundingClientRect()
    // Only hide elements that are strictly below the viewport fold, so they can animate on scroll
    if (rect.top >= window.innerHeight) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, triggerOnce])

  return { ref, isVisible }
}
