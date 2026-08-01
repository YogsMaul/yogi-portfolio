'use client'

import { useState, useEffect, useCallback } from 'react'
import { Heart, Eye, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VisitorStats() {
  const [likes, setLikes] = useState<number>(24)
  const [visits, setVisits] = useState<number>(186)
  const [hasLiked, setHasLiked] = useState<boolean>(false)
  const [isLiking, setIsLiking] = useState<boolean>(false)

  useEffect(() => {
    // 1. Initial baseline counters
    const baseVisits = 186
    const baseLikes = 24

    // 2. Load stored visits & likes from localStorage
    const savedVisits = localStorage.getItem('porto_visits_total')
    const savedLikes = localStorage.getItem('porto_likes_total')
    const userLiked = localStorage.getItem('porto_user_has_liked')

    let currentVisits = savedVisits ? parseInt(savedVisits, 10) : baseVisits
    let currentLikes = savedLikes ? parseInt(savedLikes, 10) : baseLikes

    // 3. Track unique session visit
    const hasVisitedSession = sessionStorage.getItem('porto_visited_session')
    if (!hasVisitedSession) {
      currentVisits += 1
      sessionStorage.setItem('porto_visited_session', 'true')
      localStorage.setItem('porto_visits_total', currentVisits.toString())
    }

    setVisits(currentVisits)
    setLikes(currentLikes)
    if (userLiked === 'true') {
      setHasLiked(true)
    }
  }, [])

  const handleLike = useCallback(() => {
    if (hasLiked || isLiking) return

    setIsLiking(true)
    const newLikes = likes + 1

    setLikes(newLikes)
    setHasLiked(true)

    localStorage.setItem('porto_likes_total', newLikes.toString())
    localStorage.setItem('porto_user_has_liked', 'true')

    setTimeout(() => {
      setIsLiking(false)
    }, 1200)
  }, [hasLiked, isLiking, likes])

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {/* Tombol Like / Apresiasi */}
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
          {likes}
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
          {visits.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  )
}
