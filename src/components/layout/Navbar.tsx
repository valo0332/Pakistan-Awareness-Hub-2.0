import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, ShieldCheck } from 'lucide-react'
import { navLinks } from '@/data/nav'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/85 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_-12px_rgba(0,0,0,0.12)]'
            : 'bg-white/95 backdrop-blur',
        )}
      >
        <nav className="container-page flex h-16 lg:h-18 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pakistan-900 text-white shadow-sm transition-transform group-hover:scale-105">
              <ShieldCheck className="h-5.5 w-5.5" style={{ width: 22, height: 22 }} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] text-slate-900">Pakistan Awareness Hub</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-pakistan-700">Safety · Traffic · Preparedness</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-pakistan-900 bg-pakistan-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button to="/ai-assistant" size="sm" className="hidden sm:inline-flex shadow-glow-brand">
              <Sparkles className="h-4 w-4" />
              Ask AI
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white shadow-2xl animate-slide-in flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
              <span className="font-display font-bold text-slate-900">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors',
                      isActive
                        ? 'text-pakistan-900 bg-pakistan-50'
                        : 'text-slate-700 hover:bg-slate-100',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100">
              <Button to="/ai-assistant" className="w-full">
                <Sparkles className="h-4 w-4" />
                Ask AI Assistant
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
