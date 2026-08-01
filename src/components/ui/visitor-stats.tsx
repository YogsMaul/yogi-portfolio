'use client'

import { useState, useEffect, useCallback } from 'react'
import { Heart, Eye, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VisitorStats() {
  const [likes, setLikes] = useState<number>(0)
  const [visits, setVisits] = useState<number>(0)
  const [hasLiked, setHasLiked] = useState<boolean>(false)
  const [isLiking, setIsLiking] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    // 1. Fetch current global stats
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data: { visits: number; likes: number }) => {
        setVisits(data.visits)
        setLikes(data.likes)
        setIsLoaded(true)
      })
      .catch(() => {
        setIsLoaded(true)
      })

    // 2. Track unique session visit
    const hasVisitedSession = sessionStorage.getItem('porto_visited_session')
    if (!hasVisitedSession) {
      sessionStorage.setItem('porto_visited_session', 'true')
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'visit' }),
      })
        .then((res) => res.json())
        .then((data: { visits: number }) => {
          if (data.visits) setVisits(data.visits)
        })
        .catch(() => {})
    }

    // 3. Check if user already liked
    const userLiked = localStorage.getItem('porto_user_has_liked')
    if (userLiked === 'true') {
      setHasLiked(true)
    }
  }, [])

  const handleLike = useCallback(async () => {
    if (hasLiked || isLiking) return

    setIsLiking(true)
    setLikes((prev) => prev + 1)
    setHasLiked(true)
    localStorage.setItem('porto_user_has_liked', 'true')

    try {
      const res = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'like' }),
      })
      const data = (await res.json()) as { likes: number }
      if (data.likes) {
        setLikes(data.likes)
      }
    } catch {
      // Keep optimistic value
    } finally {
      setTimeout(() => setIsLiking(false), 1000)
    }
  }, [hasLiked, isLiking])

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {/* Tombol Like */}
      <Button
        variant={hasLiked ? 'primary' : 'outline'}
        onClick={handleLike}
        disabled={hasLiked}
        className={`gap-2 font-bold border-2 shadow-brutal hover-lift transition-all relative ${
          isLiking ? 'scale-110' : ''
        }`}
        title={
          hasLiked
            ? 'Terima kasih atas apresiasinya!'
            : 'Klik untuk menyukai portofolio ini'
        }
      >
        <Heart
          size={18}
          className={`${hasLiked ? 'fill-white text-white' : 'text-red-500'} ${
            isLiking ? 'animate-bounce' : ''
          }`}
        />
        <span>{hasLiked ? 'Menyukai!' : 'Sukai Portofolio'}</span>
        <span className="bg-bg text-fg px-2 py-0.5 text-xs font-black rounded-md border border-fg ml-1">
          {isLoaded ? likes : '...'}
        </span>
        {isLiking && (
          <span className="absolute -top-3 -right-3 text-secondary animate-ping">
            <Sparkles size={22} />
          </span>
        )}
      </Button>

      {/* Visitor Counter */}
      <div className="flex items-center gap-2 px-4 py-2 bg-surface border-2 border-fg shadow-brutal rounded-md font-bold text-sm">
        <Eye size={18} className="text-primary" />
        <span className="text-fg/70">Pengunjung:</span>
        <span className="text-primary font-extrabold">
          {isLoaded ? visits.toLocaleString('id-ID') : '...'}
        </span>
      </div>
    </div>
  )
}
