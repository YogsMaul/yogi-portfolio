'use client'

import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Disable on touch devices (mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    // Handle mouse over to detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.hover-lift') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'

      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Smooth trail effect using requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return

    let animationFrameId: number
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x
        const dy = position.y - prev.y
        // Interpolate trail position with lag multiplier
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        }
      })
      animationFrameId = requestAnimationFrame(updateTrail)
    }
    animationFrameId = requestAnimationFrame(updateTrail)

    return () => cancelAnimationFrame(animationFrameId)
  }, [position, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Hide native cursor globally on desktop */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, select, input, textarea, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Foreground Precision Point */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-fg rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.6 : 1})`,
        }}
      />

      {/* Trailing Neo-Brutalism Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      >
        <div
          className={`border-2 border-fg shadow-[1.5px_1.5px_0px_0px_#0a0a0a] transition-all duration-200 ease-out ${
            isHovered
              ? 'w-9 h-9 bg-secondary rounded-xl rotate-[15deg]'
              : 'w-6 h-6 bg-primary rounded-full rotate-0'
          }`}
          style={{
            transform: `scale(${isClicked ? 0.75 : 1})`,
          }}
        />
      </div>
    </>
  )
}
