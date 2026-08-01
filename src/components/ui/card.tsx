import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'bg-surface border-2 border-fg p-4 transition-all duration-200 rounded-lg',
  {
    variants: {
      variant: {
        default: 'shadow-lg',
        outline: 'shadow-none',
        elevated: 'shadow-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = ({ className, variant, ...props }: CardProps) => (
  <div
    className={cn(cardVariants({ variant }), 'hover-shift-shadow', className)}
    {...props}
  />
)

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 border-b-2 border-fg pb-3', className)} {...props} />
)

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-2xl font-bold', className)} {...props} />
)

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props} />
)

export { Card, CardHeader, CardTitle, CardContent, cardVariants }
