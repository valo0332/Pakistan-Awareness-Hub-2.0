import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Tone = 'green' | 'red' | 'amber' | 'blue' | 'violet' | 'slate' | 'white'

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
  dot?: boolean
}

const toneStyles: Record<Tone, string> = {
  green: 'bg-brand-100 text-brand-800 ring-brand-200',
  red: 'bg-red-100 text-red-700 ring-red-200',
  amber: 'bg-amber-100 text-amber-800 ring-amber-200',
  blue: 'bg-sky-100 text-sky-700 ring-sky-200',
  violet: 'bg-violet-100 text-violet-700 ring-violet-200',
  slate: 'bg-slate-100 text-slate-600 ring-slate-200',
  white: 'bg-white/90 text-pakistan-900 ring-white/40 backdrop-blur',
}

const dotColors: Record<Tone, string> = {
  green: 'bg-brand-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  blue: 'bg-sky-500',
  violet: 'bg-violet-500',
  slate: 'bg-slate-400',
  white: 'bg-pakistan-600',
}

export function Badge({ children, tone = 'slate', className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        toneStyles[tone],
        className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[tone])} />}
      {children}
    </span>
  )
}
