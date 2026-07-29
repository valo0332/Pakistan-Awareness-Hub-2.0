import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, AlertTriangle, XCircle, Phone } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { firstAidGuides } from '@/data/firstAid'
import { getIcon } from '@/utils/icons'

const severityTone = { critical: 'red', serious: 'amber', moderate: 'slate' } as const
const severityLabel = { critical: 'Critical Emergency', serious: 'Serious', moderate: 'Moderate' }

export default function FirstAidDetail() {
  const { id } = useParams()
  const guide = firstAidGuides.find((g) => g.id === id)
  const index = firstAidGuides.findIndex((g) => g.id === id)
  const next = index >= 0 && index < firstAidGuides.length - 1 ? firstAidGuides[index + 1] : null
  const prev = index > 0 ? firstAidGuides[index - 1] : null

  if (!guide) return <Navigate to="/first-aid" replace />

  const Icon = getIcon(guide.icon)
  const related = firstAidGuides.filter((g) => g.id !== guide.id).slice(0, 3)

  return (
    <div>
      <PageHeader
        title={guide.title}
        breadcrumbs={[{ label: 'First Aid', to: '/first-aid' }, { label: guide.title }]}
      />

      <div className="container-page py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Link to="/first-aid" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-pakistan-700 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to first aid
            </Link>

            {/* Hero */}
            <Card className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-white shadow-md mx-auto sm:mx-0" style={{ backgroundColor: guide.color }}>
                  <Icon className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center gap-2 mb-3 justify-center sm:justify-start">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{guide.title}</h1>
                    <Badge tone={severityTone[guide.severity]} dot>{severityLabel[guide.severity]}</Badge>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{guide.summary}</p>
                </div>
              </div>
            </Card>

            {/* Warning */}
            {guide.warning && (
              <Alert variant="warning" title="Before you begin">
                {guide.warning}
              </Alert>
            )}

            {/* Steps */}
            <Card className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Step-by-step guide</h2>
              <ol className="space-y-5">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pakistan-900 text-white font-bold text-sm shadow-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900">{step.title}</h3>
                        {step.warning && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      </div>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            {/* Do NOT */}
            <Card className="p-6 border-red-200 bg-red-50/50">
              <h2 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Do NOT do these
              </h2>
              <ul className="space-y-2.5">
                {guide.doNot.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-red-800">
                    <XCircle className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Prev / next */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {prev ? (
                <Link to={`/first-aid/${prev.id}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-pakistan-700 transition-colors max-w-[48%]">
                  <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-pakistan-700" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Previous</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{prev.title}</p>
                  </div>
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/first-aid/${next.id}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-pakistan-700 transition-colors max-w-[48%] text-right">
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
            {/* Emergency call */}
            <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-5 text-white">
              <h3 className="font-bold mb-1">Need an ambulance?</h3>
              <p className="text-sm text-red-100 mb-4">Call now if the situation is serious.</p>
              <div className="space-y-2">
                <a href="tel:1122" className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 hover:bg-white/25 transition-colors">
                  <span className="font-semibold">Rescue 1122</span>
                  <Phone className="h-5 w-5" />
                </a>
                <a href="tel:115" className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 hover:bg-white/25 transition-colors">
                  <span className="font-semibold">Edhi Ambulance</span>
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Related */}
            <Card className="p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Other first aid guides</h3>
              <div className="space-y-2">
                {related.map((r) => {
                  const RIcon = getIcon(r.icon)
                  return (
                    <Link key={r.id} to={`/first-aid/${r.id}`} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-100 transition-colors group">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: r.color }}>
                        <RIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate group-hover:text-pakistan-900">{r.title}</p>
                        <p className="text-xs text-slate-400 truncate">{r.category}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </Card>

            <div className="rounded-2xl bg-gradient-to-br from-pakistan-900 to-brand-700 p-5 text-white">
              <h3 className="font-bold mb-2">Ask AI for help</h3>
              <p className="text-sm text-brand-100 mb-4">Describe the situation and get instant guidance.</p>
              <Button to="/ai-assistant" variant="white" size="sm" className="w-full">Open AI Assistant</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
