import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  to?: string
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-pakistan-900 text-white hover:bg-pakistan-800 shadow-sm hover:shadow-glow-brand',
  secondary:
    'bg-brand-100 text-pakistan-900 hover:bg-brand-200',
  outline:
    'border border-slate-300 text-slate-700 bg-white hover:border-pakistan-700 hover:text-pakistan-900',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  white:
    'bg-white text-pakistan-900 hover:bg-slate-50 shadow-sm',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', to, children, className, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-pakistan-900/15 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
      variantStyles[variant],
      sizeStyles[size],
      className,
    )
    if (to) {
      return (
        <Link to={to} className={classes}>
          {children}
        </Link>
      )
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
