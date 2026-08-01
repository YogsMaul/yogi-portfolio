import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold border-2 border-fg transition-all duration-200 active:translate-x-[1px] active:translate-y-[1px] rounded-md hover-lift',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary hover:shadow-md shadow-lg',
        secondary: 'bg-secondary text-fg hover:shadow-md shadow-lg',
        outline: 'bg-transparent text-fg hover:bg-fg hover:text-bg',
        ghost: 'bg-transparent text-fg hover:bg-fg/10 border-0',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
)

export { Button, buttonVariants }
