export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  features?: string[]
  challenges?: string
  solutions?: string
  metrics?: { label: string; value: string }[]
  tags: string[]
  image?: string
  link?: string
  github?: string
  category: 'web' | 'mobile'
  featured?: boolean
  screenshots?: { label: string; image: string; route: string }[]
}

export interface Skill {
  name: string
  category: 'web' | 'mobile' | 'tools'
  level: number // 1-5
}

export interface Social {
  name: string
  url: string
  icon: string
}
