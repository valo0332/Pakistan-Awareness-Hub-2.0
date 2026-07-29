import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm">
      <Link to="/" className="flex items-center gap-1 text-slate-500 hover:text-pakistan-700 transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          {item.to ? (
            <Link to={item.to} className="text-slate-500 hover:text-pakistan-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-pakistan-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
