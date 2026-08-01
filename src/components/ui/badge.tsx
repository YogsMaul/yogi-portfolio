import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-bold text-sm border-2 border-fg px-2 py-1 rounded-md',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary',
        secondary: 'bg-secondary text-fg',
        outline: 'bg-transparent text-fg',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span
    className={cn(badgeVariants({ variant }), className)}
    {...props}
  />
)

export { Badge, badgeVariants }
