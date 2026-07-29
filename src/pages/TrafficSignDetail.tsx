import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Info, Navigation, Lightbulb, MapPin, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { TrafficSignIllustration } from '@/components/TrafficSignIllustration'
import { trafficSigns } from '@/data/trafficSigns'

const categoryTone: Record<string, 'amber' | 'red' | 'blue'> = {
  warning: 'amber',
  regulatory: 'red',
  mandatory: 'blue',
  information: 'blue',
}

const categoryLabel: Record<string, string> = {
  warning: 'Warning Sign',
  regulatory: 'Regulatory Sign',
  mandatory: 'Mandatory Sign',
  information: 'Informatory Sign',
}

export default function TrafficSignDetail() {
  const { id } = useParams()
  const sign = trafficSigns.find((s) => s.id === id)
  const index = trafficSigns.findIndex((s) => s.id === id)
  const next = index >= 0 && index < trafficSigns.length - 1 ? trafficSigns[index + 1] : null
  const prev = index > 0 ? trafficSigns[index - 1] : null

  if (!sign) return <Navigate to="/traffic-awareness/signs" replace />

  const related = trafficSigns.filter((s) => s.category === sign.category && s.id !== sign.id).slice(0, 4)

  return (
    <div>
      <PageHeader
        title={sign.title}
        breadcrumbs={[
          { label: 'Traffic Awareness', to: '/traffic-awareness' },
          { label: 'Traffic Signs', to: '/traffic-awareness/signs' },
          { label: sign.title },
        ]}
      />

      <div className="container-page py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Link to="/traffic-awareness/signs" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-pakistan-700 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to all signs
            </Link>

            {/* Main sign card */}
            <Card className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex items-center justify-center h-44 w-44 shrink-0 rounded-2xl bg-slate-50 mx-auto sm:mx-0">
                  <TrafficSignIllustration sign={sign} size={140} />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <Badge tone={categoryTone[sign.category]} className="mb-3">{categoryLabel[sign.category]}</Badge>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{sign.title}</h1>
                  <p className="text-slate-600 leading-relaxed">{sign.meaning}</p>
                </div>
              </div>
            </Card>

            {/* Purpose & explanation */}
            {sign.purpose && (
              <Card className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-4">
                  <Lightbulb className="h-5 w-5" style={{ width: 22, height: 22 }} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Purpose</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{sign.purpose}</p>
              </Card>
            )}

            {sign.explanation && (
              <Card className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 mb-4">
                  <Info className="h-5 w-5" style={{ width: 22, height: 22 }} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Detailed Explanation</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{sign.explanation}</p>
              </Card>
            )}

            {/* Driver action */}
            <Card className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-pakistan-900 mb-4">
                <Navigation className="h-5 w-5" style={{ width: 22, height: 22 }} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">What the Driver Should Do</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{sign.action}</p>
            </Card>

            {/* Safety tips */}
            {sign.safetyTips && sign.safetyTips.length > 0 && (
              <Card className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-pakistan-900 mb-4">
                  <ShieldCheck className="h-5 w-5" style={{ width: 22, height: 22 }} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Safety Tips</h2>
                <ul className="space-y-2.5">
                  {sign.safetyTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold mt-0.5">{i + 1}</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Common locations */}
            {sign.locations && sign.locations.length > 0 && (
              <Card className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700 mb-4">
                  <MapPin className="h-5 w-5" style={{ width: 22, height: 22 }} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Common Locations</h2>
                <div className="flex flex-wrap gap-2">
                  {sign.locations.map((loc, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {loc}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Tip */}
            <Alert variant="tip" title="Remember">
              Ignoring this sign can result in fines, points on your license, or serious accidents. Always follow posted signs and adjust your driving accordingly.
            </Alert>

            {/* Prev / next nav */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {prev ? (
                <Link to={`/traffic-awareness/signs/${prev.id}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-pakistan-700 transition-colors max-w-[48%]">
                  <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-pakistan-700" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Previous</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{prev.title}</p>
                  </div>
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/traffic-awareness/signs/${next.id}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-pakistan-700 transition-colors max-w-[48%] text-right">
                  <div className="min-w-0 ml-auto">
                    <p className="text-xs text-slate-400">Next</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{next.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-pakistan-700" />
                </Link>
              ) : <span />}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Sign Properties</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-medium text-slate-800">{categoryLabel[sign.category]}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Shape</dt>
                  <dd className="font-medium text-slate-800 capitalize">{sign.shape.replace('-', ' ')}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-slate-500">Color</dt>
                  <dd className="flex items-center gap-1.5 font-medium text-slate-800">
                    <span className="h-4 w-4 rounded-full border border-slate-200" style={{ backgroundColor: sign.color }} />
                    {sign.color}
                  </dd>
                </div>
              </dl>
            </Card>

            {related.length > 0 && (
              <Card className="p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Related signs
                </h3>
                <div className="space-y-2">
                  {related.map((r) => (
                    <Link key={r.id} to={`/traffic-awareness/signs/${r.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-100 transition-colors group">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 shrink-0">
                        <TrafficSignIllustration sign={r} size={44} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate group-hover:text-pakistan-900">{r.title}</p>
                        <p className="text-xs text-slate-400 truncate">{r.meaning}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            <div className="rounded-2xl bg-gradient-to-br from-pakistan-900 to-brand-700 p-5 text-white">
              <h3 className="font-bold mb-2">Ask AI about this sign</h3>
              <p className="text-sm text-brand-100 mb-4">Have questions about road rules? Ask the AI assistant.</p>
              <Button to="/ai-assistant" variant="white" size="sm" className="w-full">Open AI Assistant</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
