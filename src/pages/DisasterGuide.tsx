import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Calendar, Package } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { disasters } from '@/data/disasters'
import { getIcon } from '@/utils/icons'

const severityTone = { high: 'red', medium: 'amber', low: 'slate' } as const
const severityLabel = { high: 'High Risk', medium: 'Medium Risk', low: 'Low Risk' }

export default function DisasterGuide() {
  return (
    <div>
      <PageHeader
        eyebrow="Disaster Guide"
        title="Prepare for disasters before they strike"
        description="Practical, step-by-step guides for Pakistan's most common natural disasters. Learn what to do before, during, and after each event."
        breadcrumbs={[{ label: 'Disaster Guide' }]}
      />

      <div className="container-page py-8 lg:py-10">
        <Alert variant="warning" className="mb-8" title="Stay informed, stay safe">
          Disaster preparedness saves lives. Review these guides with your family and keep an emergency kit ready at all times. For active emergencies, call <strong className="font-mono">1122</strong> immediately.
        </Alert>

        {/* Category cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {disasters.map((d) => {
            const Icon = getIcon(d.icon)
            return (
              <Link key={d.id} to={`/disaster-guide/${d.id}`}>
                <Card hover className="p-6 h-full group">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: d.color }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <Badge tone={severityTone[d.severity]} dot>{severityLabel[d.severity]}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{d.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">{d.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{d.seasons.join(' · ')}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span>{d.regions.join(', ')}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                    View full guide <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* General preparedness */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-pakistan-900">
                <Package className="h-5.5 w-5.5" style={{ width: 22, height: 22 }} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Emergency Kit Essentials</h3>
            </div>
            <ul className="space-y-2.5">
              {disasters[0].checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold mt-0.5">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-pakistan-900 to-brand-700 text-white">
            <h3 className="text-lg font-bold mb-3">The 3 phases of preparedness</h3>
            <div className="space-y-4">
              {[
                { phase: 'Before', desc: 'Prepare kits, learn evacuation routes, and practice drills with your family.' },
                { phase: 'During', desc: 'Stay calm, follow your plan, and prioritize life safety over property.' },
                { phase: 'After', desc: 'Check for injuries, document damage, and follow official guidance before returning.' },
              ].map((p, i) => (
                <div key={p.phase} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 font-bold text-sm">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-white">{p.phase}</p>
                    <p className="text-sm text-brand-100 leading-relaxed">{p.desc}</p>
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
