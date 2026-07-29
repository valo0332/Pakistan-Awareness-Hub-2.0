import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
  action?: ReactNode
  className?: string
}

export function SectionHeader({ eyebrow, title, description, center = false, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 mb-8', center && 'items-center text-center', action ? 'lg:flex-row lg:items-end lg:justify-between lg:text-left' : '', className)}>
      <div className={cn('max-w-2xl', center && !action && 'mx-auto')}>
        {eyebrow && (
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-pakistan-700 mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-slate-900 text-balance">{title}</h2>
        {description && <p className="mt-3 text-slate-600 leading-relaxed text-balance">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
