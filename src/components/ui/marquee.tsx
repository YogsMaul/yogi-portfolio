import { cn } from '@/lib/utils'

interface MarqueeProps {
  items?: string[]
  className?: string
  variant?: 'primary' | 'secondary' | 'dark'
}

export function Marquee({
  items = [
    'OPEN FOR FULL-TIME ROLES',
    'READY TO JOIN YOUR TEAM',
    'FRONTEND DEVELOPER (WEB & MOBILE)',
    'NEXT.JS • REACT • FLUTTER • KOTLIN',
    'OPEN FOR HIRING & COLLABORATION',
  ],
  className,
  variant = 'secondary',
}: MarqueeProps) {
  const variantStyles = {
    secondary: 'bg-secondary text-fg border-y-4 border-fg',
    primary: 'bg-primary text-on-primary border-y-4 border-fg',
    dark: 'bg-fg text-bg border-y-4 border-fg',
  }[variant]

  const marqueeContent = (
    <div className="flex items-center gap-8 py-3.5 font-bold uppercase tracking-wider text-lg sm:text-xl shrink-0">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-primary text-xl">✦</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('overflow-hidden shadow-brutal select-none z-20 relative', variantStyles, className)}>
      <div className="animate-marquee flex">
        {marqueeContent}
        {marqueeContent}
      </div>
    </div>
  )
}
