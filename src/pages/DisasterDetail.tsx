import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Package, Clock, MapPin, Calendar,
  ClipboardList, ShieldCheck,
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { disasters } from '@/data/disasters'
import { getIcon } from '@/utils/icons'
import { cn } from '@/utils/cn'

const phases = [
  { id: 'before', label: 'Before', color: 'bg-brand-600' },
  { id: 'during', label: 'During', color: 'bg-red-600' },
  { id: 'after', label: 'After', color: 'bg-sky-600' },
] as const

const severityTone = { high: 'red', medium: 'amber', low: 'slate' } as const
const severityLabel = { high: 'High Risk', medium: 'Medium Risk', low: 'Low Risk' }

export default function DisasterDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState<'before' | 'during' | 'after'>('before')
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const disaster = disasters.find((d) => d.id === id)
  if (!disaster) return <Navigate to="/disaster-guide" replace />

  const Icon = getIcon(disaster.icon)
  const phaseItems = disaster.phases[activeTab]

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
        title={disaster.name}
        breadcrumbs={[{ label: 'Disaster Guide', to: '/disaster-guide' }, { label: disaster.name }]}
      />

      <div className="container-page py-8 lg:py-10">
        <Link to="/disaster-guide" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-pakistan-700 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to disaster guide
        </Link>

        {/* Hero card */}
        <Card className="p-6 sm:p-8 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: disaster.color }} />
          <div className="relative flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-white shadow-md mx-auto sm:mx-0" style={{ backgroundColor: disaster.color }}>
              <Icon className="h-10 w-10" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-2 mb-3 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{disaster.name}</h1>
                <Badge tone={severityTone[disaster.severity]} dot>{severityLabel[disaster.severity]}</Badge>
              </div>
              <p className="text-slate-600 leading-relaxed max-w-2xl">{disaster.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 justify-center sm:justify-start">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {disaster.seasons.join(' · ')}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {disaster.regions.join(', ')}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            {/* Phase tabs */}
            <div className="flex gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full max-w-md">
              {phases.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={cn(
                    'flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all',
                    activeTab === p.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700',
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Phase content */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className={cn('flex h-3 w-3 rounded-full', phases.find(p => p.id === activeTab)?.color)} />
                <h2 className="text-xl font-bold text-slate-900 capitalize">What to do {activeTab} a {disaster.shortName.toLowerCase()}</h2>
              </div>
              <ul className="space-y-3">
                {phaseItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold mt-0.5">{i + 1}</span>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1">{item}</p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Preparedness timeline */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Clock className="h-5 w-5 text-pakistan-700" />
                Preparedness Timeline
              </h2>
              <div className="relative pl-6">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
                <div className="space-y-5">
                  {disaster.timeline.map((t, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full bg-pakistan-700 ring-4 ring-white" />
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <h3 className="font-bold text-slate-900">{t.phase}</h3>
                        <span className="text-xs font-medium text-slate-400">{t.timeframe}</span>
                      </div>
                      <ul className="space-y-1">
                        {t.actions.map((a, j) => (
                          <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-600 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety infographic placeholder */}
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-white border-dashed">
              <div className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <p className="text-sm font-semibold text-slate-600">Safety Infographic</p>
                <p className="text-xs text-slate-400 mt-1">Visual preparedness guide for {disaster.name} — coming soon</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Checklist */}
            <Card className="p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-pakistan-700" />
                Emergency Checklist
              </h3>
              <ul className="space-y-2.5">
                {disaster.checklist.map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => toggleCheck(i)}
                      className="flex items-start gap-2.5 w-full text-left group"
                    >
                      <span className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all',
                        checked.has(i) ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 group-hover:border-pakistan-700',
                      )}>
                        {checked.has(i) && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>
                      <span className={cn('text-sm leading-snug', checked.has(i) ? 'text-slate-400 line-through' : 'text-slate-700')}>
                        {item}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-400">
                {checked.size} of {disaster.checklist.length} ready
              </p>
            </Card>

            {/* Emergency kit */}
            <Card className="p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-amber-600" />
                Specialized Kit Items
              </h3>
              <div className="flex flex-wrap gap-2">
                {disaster.kit.map((item, i) => (
                  <span key={i} className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <Alert variant="error" icon>
              In a life-threatening emergency, call <strong className="font-mono">1122</strong> or <strong className="font-mono">15</strong> immediately.
            </Alert>
          </aside>
        </div>
      </div>
    </div>
  )
}
