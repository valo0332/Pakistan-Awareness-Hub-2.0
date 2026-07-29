import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  large?: boolean
}

export function SearchBar({ value, onChange, placeholder = 'Search...', className, large = false }: SearchBarProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Search className={cn('absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none', large ? 'h-5 w-5' : 'h-4.5 w-4.5')} style={{ width: large ? 20 : 18, height: large ? 20 : 18 }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400',
          'focus:outline-none focus:ring-4 focus:ring-pakistan-900/10 focus:border-pakistan-700 transition-all',
          large ? 'pl-12 pr-10 py-3.5 text-base shadow-sm' : 'pl-11 pr-10 py-2.5 text-sm',
        )}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
