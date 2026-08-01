import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const VISITS_KEY = 'visits'
const LIKES_KEY = 'likes'

export async function GET() {
  const [visits, likes] = await redis.mget<number[]>(VISITS_KEY, LIKES_KEY)

  return NextResponse.json({
    visits: visits ?? 0,
    likes: likes ?? 0,
  })
}

export async function POST(request: Request) {
  const { type } = (await request.json()) as { type?: 'visit' | 'like' }

  if (type === 'visit') {
    const visits = await redis.incr(VISITS_KEY)
    return NextResponse.json({ visits })
  }

  if (type === 'like') {
    const likes = await redis.incr(LIKES_KEY)
    return NextResponse.json({ likes })
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}
