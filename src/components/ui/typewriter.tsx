'use client'

import { useEffect, useRef, useState } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  onDone?: () => void
  loop?: boolean
  holdDelay?: number
  deleteSpeed?: number
  pauseDelay?: number
}

export function Typewriter({
  text,
  speed = 70,
  startDelay = 900,
  className,
  onDone,
  loop = false,
  holdDelay = 2600,
  deleteSpeed = 40,
  pauseDelay = 600,
}: TypewriterProps) {
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  const finished = count >= text.length

  useEffect(() => {
    // Hormati reduced-motion: tampilkan teks penuh langsung, tanpa loop
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(text.length)
      if (!doneRef.current) {
        doneRef.current = true
        onDoneRef.current?.()
      }
      return
    }

    let timer: ReturnType<typeof setTimeout> | undefined

    if (!deleting) {
      if (count === 0) {
        // Putaran pertama pakai startDelay, putaran berikutnya pakai pauseDelay
        timer = setTimeout(() => setCount(1), doneRef.current ? pauseDelay : startDelay)
      } else if (count < text.length) {
        timer = setTimeout(() => setCount((c) => c + 1), speed)
      } else {
        // Selesai mengetik: tandai done (picu RotatingRole sekali saja)
        if (!doneRef.current) {
          doneRef.current = true
          onDoneRef.current?.()
        }
        // Mode loop: tahan teks penuh sejenak, lalu hapus huruf per huruf
        if (loop) {
          timer = setTimeout(() => setDeleting(true), holdDelay)
        }
      }
    } else if (count > 0) {
      timer = setTimeout(() => setCount((c) => c - 1), deleteSpeed)
    } else {
      // Sudah terhapus semua: jeda sebentar sebelum mengetik ulang
      timer = setTimeout(() => setDeleting(false), pauseDelay)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [count, deleting, text.length, speed, startDelay, loop, holdDelay, deleteSpeed, pauseDelay])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {(!finished || loop) && <span className="typewriter-caret">▌</span>}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

interface RotatingRoleProps {
  roles?: string[]
  interval?: number
  start?: boolean
  className?: string
}

const DEFAULT_ROLES = [
  'Flutter Developer',
  'Kotlin Developer',
  'Jetpack Compose Explorer',
  'Mobile Problem Solver',
]

export function RotatingRole({
  roles = DEFAULT_ROLES,
  interval = 2500,
  start = true,
  className,
}: RotatingRoleProps) {
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(start)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (start) setActive(true)
  }, [start])

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length)
    }, interval)

    return () => clearInterval(timer)
  }, [active, interval, roles.length])

  return (
    <span className={className} aria-live="polite">
      <span key={active ? index : 'idle'} className="role-in">
        {roles[index]}
      </span>
    </span>
  )
}
