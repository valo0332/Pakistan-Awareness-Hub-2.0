import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, ArrowLeft, ScrollText, AlertTriangle } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { getIcon } from '@/utils/icons'
import { trafficRules } from '@/data/trafficRules'
import { cn } from '@/utils/cn'

export default function TrafficRules() {
  const [openId, setOpenId] = useState<string | null>(trafficRules[0]?.id ?? null)

  return (
    <div>
      <PageHeader
        eyebrow="Traffic Awareness · Rules"
        title="The road rules every driver must follow"
        description="Clear, practical explanations of the rules that keep traffic flowing safely. Tap any card to expand the full set of rules and the penalty for breaking them."
        breadcrumbs={[
          { label: 'Traffic Awareness', to: '/traffic-awareness' },
          { label: 'Traffic Rules' },
        ]}
      />

      <div className="container-page py-8 lg:py-10">
        <Link to="/traffic-awareness" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-pakistan-700 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Traffic Awareness
        </Link>

        <Alert variant="warning" className="mb-8" title="Know the rules, avoid the fines">
          Breaking these rules can lead to fines, licence points, or serious accidents. Review them regularly — especially before long journeys or motorway driving.
        </Alert>

        {/* Expandable rule cards */}
        <div className="space-y-4">
          {trafficRules.map((rule) => {
            const Icon = getIcon(rule.icon)
            const isOpen = openId === rule.id
            return (
              <Card key={rule.id} className="overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : rule.id)}
                  className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900">{rule.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-0.5 line-clamp-1 sm:line-clamp-none">{rule.summary}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300',
                      isOpen && 'rotate-180 text-pakistan-700',
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-1">
                      <div className="border-t border-slate-100 pt-5">
                        <ul className="space-y-2.5">
                          {rule.rules.map((r, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold mt-0.5">{i + 1}</span>
                              <span className="leading-relaxed">{r}</span>
                            </li>
                          ))}
                        </ul>
                        {rule.penalty && (
                          <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-1">Penalty</p>
                              <p className="text-sm text-amber-900 leading-relaxed">{rule.penalty}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link to="/traffic-awareness/signs" className="group">
            <Card hover className="p-6 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <ScrollText className="h-5 w-5" style={{ width: 22, height: 22 }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Learn the signs</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">Every road sign explained with meanings, driver actions, and safety tips.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                Browse signs <ArrowRight className="h-4 w-4" />
              </span>
            </Card>
          </Link>
          <Link to="/traffic-awareness/fines" className="group">
            <Card hover className="p-6 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700">
                  <ScrollText className="h-5 w-5" style={{ width: 22, height: 22 }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Check the fine codes</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">See the official KP Traffic Police fine schedule for every offence.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                View fines <ArrowRight className="h-4 w-4" />
              </span>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
