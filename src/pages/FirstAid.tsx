import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Phone } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { EmptyState } from '@/components/ui/State'
import { firstAidGuides } from '@/data/firstAid'
import { getIcon } from '@/utils/icons'

const severityTone = { critical: 'red', serious: 'amber', moderate: 'slate' } as const
const severityLabel = { critical: 'Critical', serious: 'Serious', moderate: 'Moderate' }

export default function FirstAid() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return firstAidGuides.filter((g) =>
      !search ||
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase()) ||
      g.summary.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  return (
    <div>
      <PageHeader
        eyebrow="First Aid"
        title="Essential first aid guides"
        description="Clear, step-by-step instructions for the most common medical emergencies. Learn what to do while you wait for professional help."
        breadcrumbs={[{ label: 'First Aid' }]}
      />

      <div className="container-page py-8 lg:py-10">
        {/* Disclaimer banner */}
        <Alert variant="error" className="mb-8" title="Important — always seek professional help">
          First aid guidance on this platform is for educational purposes only. In any serious or life-threatening situation, call <strong className="font-mono">1122</strong> (Rescue) or <strong className="font-mono">115</strong> (Edhi Ambulance) immediately. Do not delay professional care.
        </Alert>

        {/* Search */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ width: 18, height: 18 }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search first aid topics..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-pakistan-900/10 focus:border-pakistan-700 transition-all"
          />
        </div>

        {/* Quick call bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { name: 'Rescue 1122', number: '1122' },
            { name: 'Edhi Ambulance', number: '115' },
            { name: 'Police', number: '15' },
          ].map((c) => (
            <a
              key={c.name}
              href={`tel:${c.number}`}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {c.name} · {c.number}
            </a>
          ))}
        </div>

        <p className="text-sm text-slate-500 mb-5">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> {filtered.length === 1 ? 'guide' : 'guides'}
        </p>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((guide) => {
              const Icon = getIcon(guide.icon)
              return (
                <Link key={guide.id} to={`/first-aid/${guide.id}`}>
                  <Card hover className="p-6 h-full group">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm transition-transform group-hover:scale-110"
                        style={{ backgroundColor: guide.color }}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <Badge tone={severityTone[guide.severity]} dot>{severityLabel[guide.severity]}</Badge>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">{guide.category}</p>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{guide.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">{guide.summary}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                      Read guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon={<Search className="h-7 w-7" />}
            title="No guides found"
            description="Try a different search term."
            action={
              <button onClick={() => setSearch('')} className="text-sm font-semibold text-pakistan-700 hover:underline">
                Clear search
              </button>
            }
          />
        )}
      </div>
    </div>
  )
}
