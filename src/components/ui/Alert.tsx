import type { ReactNode } from 'react'
import { AlertTriangle, Info, CheckCircle2, XCircle, Lightbulb } from 'lucide-react'
import { cn } from '@/utils/cn'

type Variant = 'info' | 'warning' | 'success' | 'error' | 'tip'

interface AlertProps {
  variant?: Variant
  title?: string
  children: ReactNode
  className?: string
  icon?: boolean
}

const config = {
  info: { icon: Info, bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-900', iconColor: 'text-sky-600' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', iconColor: 'text-amber-600' },
  success: { icon: CheckCircle2, bg: 'bg-brand-50', border: 'border-brand-200', text: 'text-brand-800', iconColor: 'text-brand-600' },
  error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', iconColor: 'text-red-600' },
  tip: { icon: Lightbulb, bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-900', iconColor: 'text-violet-600' },
}

export function Alert({ variant = 'info', title, children, className, icon = true }: AlertProps) {
  const c = config[variant]
  const Icon = c.icon
  return (
    <div className={cn('flex gap-3 rounded-2xl border p-4', c.bg, c.border, c.text, className)}>
      {icon && <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', c.iconColor)} />}
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  )
}
