import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { Crumb } from '@/components/ui/Breadcrumbs'

interface PageHeaderProps {
  eyebrow?: string
  title?: string
  description?: string
  breadcrumbs?: Crumb[]
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-200/70 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-page pt-6 pb-8 lg:pt-8 lg:pb-12">
        {breadcrumbs && <div className="mb-5"><Breadcrumbs items={breadcrumbs} /></div>}
        {eyebrow && (
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-pakistan-700 mb-2.5">
            {eyebrow}
          </span>
        )}
        {title && <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 text-balance max-w-3xl">{title}</h1>}
        {description && <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl text-balance">{description}</p>}
        {children}
      </div>
    </div>
  )
}
