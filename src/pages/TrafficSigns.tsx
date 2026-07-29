import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, AlertTriangle, Ban, CircleCheck, Info, ArrowRight, Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/State'
import { TrafficSignIllustration } from '@/components/TrafficSignIllustration'
import { trafficSigns, trafficSignCategories } from '@/data/trafficSigns'
import { cn } from '@/utils/cn'

const categoryIconMap: Record<string, typeof LayoutGrid> = {
  all: LayoutGrid,
  warning: AlertTriangle,
  regulatory: Ban,
  mandatory: CircleCheck,
  information: Info,
}

const categoryTone: Record<string, 'amber' | 'red' | 'blue'> = {
  warning: 'amber',
  regulatory: 'red',
  mandatory: 'blue',
  information: 'blue',
}

const categoryLabel: Record<string, string> = {
  warning: 'Warning',
  regulatory: 'Regulatory',
  mandatory: 'Mandatory',
  information: 'Informatory',
}

export default function TrafficSigns() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    return trafficSigns.filter((s) => {
      const matchesCat = active === 'all' || s.category === active
      const q = search.toLowerCase()
      const matchesSearch =
        !search ||
        s.title.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        (s.keywords ?? []).some((k) => k.toLowerCase().includes(q))
      return matchesCat && matchesSearch
    })
  }, [search, active])

  return (
    <div>
      <PageHeader
        eyebrow="Traffic Awareness · Signs"
        title="Learn every road sign in Pakistan"
        description="Browse the full library of traffic signs across Warning, Regulatory, Mandatory, and Informatory categories. Each card explains what the sign means and the action you should take."
        breadcrumbs={[
          { label: 'Traffic Awareness', to: '/traffic-awareness' },
          { label: 'Traffic Signs' },
        ]}
      />

      <div className="container-page py-8 lg:py-10">
        {/* Search */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ width: 18, height: 18 }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search signs by name, meaning, or keyword..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-pakistan-900/10 focus:border-pakistan-700 transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {trafficSignCategories.map((cat) => {
            const Icon = categoryIconMap[cat.id] ?? LayoutGrid
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-pakistan-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-pakistan-700 hover:text-pakistan-900',
                )}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-5">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> {filtered.length === 1 ? 'sign' : 'signs'}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((sign) => (
              <Link key={sign.id} to={`/traffic-awareness/signs/${sign.id}`}>
                <Card hover className="p-5 h-full group">
                  <div className="flex items-center justify-center h-32 mb-4 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <TrafficSignIllustration sign={sign} size={100} />
                  </div>
                  <Badge tone={categoryTone[sign.category]} className="mb-2">
                    {categoryLabel[sign.category]}
                  </Badge>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{sign.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{sign.meaning}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                    View details <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Search className="h-7 w-7" />}
            title="No signs found"
            description="Try a different search term or category filter."
            action={
              <button
                onClick={() => { setSearch(''); setActive('all') }}
                className="text-sm font-semibold text-pakistan-700 hover:underline"
              >
                Clear filters
              </button>
            }
          />
        )}
      </div>
    </div>
  )
}
