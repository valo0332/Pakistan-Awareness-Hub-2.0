import { useState, useMemo } from 'react'
import { Phone, MapPin, Clock, Search, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { EmptyState } from '@/components/ui/State'
import { emergencyContacts } from '@/data/emergencyContacts'
import { getIcon } from '@/utils/icons'
import { cn } from '@/utils/cn'

const categoryFilters = [
  { id: 'all', label: 'All Contacts' },
  { id: 'national', label: 'National Services' },
  { id: 'provincial', label: 'Provincial Services' },
  { id: 'specialized', label: 'Specialized Services' },
] as const

const categoryTone = { national: 'red', provincial: 'blue', specialized: 'violet' } as const
const categoryLabel = { national: 'National', provincial: 'Provincial', specialized: 'Specialized' }

export default function EmergencyContacts() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('all')
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const filtered = useMemo(() => {
    return emergencyContacts.filter((c) => {
      const matchesCat = active === 'all' || c.category === active
      const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.number.includes(search)
      return matchesCat && matchesSearch
    })
  }, [search, active])

  const preparedness = [
    'Save all emergency numbers in your phone contacts.',
    'Teach children how to call 15 and 1122.',
    'Keep a printed list of numbers near your home phone.',
    'Know your nearest hospital and police station.',
    'Memorize your home address for emergency calls.',
    'Keep your phone charged and carry a power bank.',
  ]

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Emergency Contacts"
        title="Every emergency number in one place"
        description="National, provincial, and specialized emergency services across Pakistan. Tap any number to call directly."
        breadcrumbs={[{ label: 'Emergency Contacts' }]}
      />

      <div className="container-page py-8 lg:py-10">
        <Alert variant="error" className="mb-8" title="In a life-threatening emergency">
          Call <strong className="font-mono">1122</strong> immediately. Speak clearly, give your exact location, and stay on the line until the operator tells you to hang up.
        </Alert>

        {/* Search */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ width: 18, height: 18 }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or number..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-pakistan-900/10 focus:border-pakistan-700 transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all',
                active === cat.id
                  ? 'bg-pakistan-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-pakistan-700 hover:text-pakistan-900',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-500 mb-5">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> {filtered.length === 1 ? 'contact' : 'contacts'}
        </p>

        {/* Contacts grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => {
              const Icon = getIcon(c.icon)
              return (
                <Card key={c.id} hover className="p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: c.color }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <Badge tone={categoryTone[c.category]}>{categoryLabel[c.category]}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{c.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{c.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <Clock className="h-3.5 w-3.5" />
                    {c.available}
                  </div>
                  <a
                    href={`tel:${c.number.replace(/-/g, '')}`}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 transition-colors hover:bg-pakistan-50"
                  >
                    <span className="font-mono text-xl font-extrabold text-slate-900">{c.number}</span>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-pakistan-700">
                      <Phone className="h-4 w-4" />
                      Call
                    </span>
                  </a>
                </Card>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon={<Search className="h-7 w-7" />}
            title="No contacts found"
            description="Try a different search term or category."
            action={<button onClick={() => { setSearch(''); setActive('all') }} className="text-sm font-semibold text-pakistan-700 hover:underline">Clear filters</button>}
          />
        )}

        {/* Preparedness checklist + categories */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Emergency Preparedness Checklist</h3>
            <ul className="space-y-2.5">
              {preparedness.map((item, i) => (
                <li key={i}>
                  <button onClick={() => toggleCheck(i)} className="flex items-start gap-2.5 w-full text-left group">
                    <span className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all',
                      checked.has(i) ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 group-hover:border-pakistan-700',
                    )}>
                      {checked.has(i) && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </span>
                    <span className={cn('text-sm leading-snug', checked.has(i) ? 'text-slate-400 line-through' : 'text-slate-700')}>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400">{checked.size} of {preparedness.length} done</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Emergency Contact Categories</h3>
            <div className="space-y-4">
              {[
                { label: 'National Services', desc: 'Nationwide helplines like Police (15), Rescue (1122), and Edhi (115).', tone: 'bg-red-50 text-red-700' },
                { label: 'Provincial Services', desc: 'Province-specific rescue and ambulance services.', tone: 'bg-sky-50 text-sky-700' },
                { label: 'Specialized Services', desc: 'Volunteer organizations and air rescue for major disasters.', tone: 'bg-violet-50 text-violet-700' },
              ].map((cat) => (
                <div key={cat.label} className="flex items-start gap-3">
                  <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', cat.tone)}>
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{cat.label}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
