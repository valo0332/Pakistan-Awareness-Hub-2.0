import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'section'
}

export function Card({ children, className, hover = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'bg-white rounded-2xl border border-slate-200/80 shadow-card',
        hover && 'transition-all duration-300 hover:shadow-soft hover:-translate-y-1 hover:border-slate-300',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
