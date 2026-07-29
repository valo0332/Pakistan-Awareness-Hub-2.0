import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, ArrowUp } from 'lucide-react'
import { cn } from '@/utils/cn'

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAiPage = location.pathname === '/ai-assistant'

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-card border border-slate-200 transition-all duration-300 hover:shadow-soft hover:text-pakistan-900',
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      {!isAiPage && (
        <Link
          to="/ai-assistant"
          className="group flex items-center gap-2 rounded-full bg-pakistan-900 text-white pl-4 pr-5 py-3 shadow-glow-brand hover:bg-pakistan-800 transition-all active:scale-95"
          aria-label="Ask AI"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold">Ask AI</span>
        </Link>
      )}
    </div>
  )
}
