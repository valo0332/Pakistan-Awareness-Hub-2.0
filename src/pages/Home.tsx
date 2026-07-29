import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Sparkles, TrafficCone, CloudRain, HeartPulse, Phone, ShieldAlert,
  Shield, LifeBuoy, Ambulance, Flame, AlertTriangle, ArrowRight, Search,
  ChevronRight, CircleCheck, Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HeroIllustration } from '@/components/HeroIllustration'
import { safetyTips, awarenessItems } from '@/data/safety'
import { getIcon } from '@/utils/icons'

const features = [
  { icon: Sparkles, title: 'AI Assistant', desc: 'Ask any safety, traffic, or disaster question and get instant guidance.', to: '/ai-assistant', color: 'bg-brand-100 text-pakistan-900' },
  { icon: TrafficCone, title: 'Traffic Awareness', desc: 'Learn every road sign, its meaning, and what action to take as a driver.', to: '/traffic-awareness', color: 'bg-amber-100 text-amber-700' },
  { icon: CloudRain, title: 'Disaster Guide', desc: 'Step-by-step before, during, and after guides for floods, quakes, and more.', to: '/disaster-guide', color: 'bg-sky-100 text-sky-700' },
  { icon: HeartPulse, title: 'First Aid', desc: 'Clear illustrated guides for CPR, burns, bleeding, choking, and fractures.', to: '/first-aid', color: 'bg-red-100 text-red-700' },
  { icon: Phone, title: 'Emergency Contacts', desc: 'Every national and provincial emergency number, ready to call in seconds.', to: '/emergency-contacts', color: 'bg-violet-100 text-violet-700' },
  { icon: ShieldAlert, title: 'Safety Tips', desc: 'Practical, seasonal tips to keep your family safe on the road and at home.', to: '/disaster-guide', color: 'bg-pakistan-100 text-pakistan-800' },
]

const quickEmergency = [
  { icon: Shield, name: 'Police', number: '15', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
  { icon: LifeBuoy, name: 'Rescue 1122', number: '1122', color: 'from-red-500 to-red-600', bg: 'bg-red-50' },
  { icon: Ambulance, name: 'Ambulance', number: '115', color: 'from-brand-500 to-brand-600', bg: 'bg-brand-50' },
  { icon: Flame, name: 'Fire Brigade', number: '16', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
  { icon: AlertTriangle, name: 'NDMA', number: '111-157-157', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/ai-assistant?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl" />
          <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-pakistan-100/30 blur-3xl" />
        </div>
        <div className="container-page relative pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="animate-fade-up">
              <Badge tone="green" dot className="mb-5">
                AI-Powered Public Safety Platform
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-[1.15] text-slate-900 text-balance">
                Your AI-powered guide to safety, traffic awareness, and disaster preparedness in Pakistan.
              </h1>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl text-balance">
                Learn disaster preparedness, traffic rules, road signs, emergency contacts, and first aid — all in one trusted, modern platform built for every citizen.
              </p>

              <form onSubmit={handleSearch} className="mt-7 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" style={{ width: 20, height: 20 }} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search awareness topics — e.g. earthquake, CPR, flood..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-32 text-base shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-pakistan-900/10 focus:border-pakistan-700 transition-all"
                  />
                  <Button type="submit" size="md" className="absolute right-2 top-1/2 -translate-y-1/2">
                    Search
                  </Button>
                </div>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button to="/ai-assistant" size="lg">
                  <Sparkles className="h-5 w-5" />
                  Ask AI Assistant
                </Button>
                <Button to="/emergency-contacts" variant="outline" size="lg">
                  <Phone className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                  Emergency Contacts
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-4.5 w-4.5 text-brand-600" style={{ width: 18, height: 18 }} />
                  <span>Trusted information</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-4.5 w-4.5 text-brand-600" style={{ width: 18, height: 18 }} />
                  <span>Available 24/7</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <CircleCheck className="h-4.5 w-4.5 text-brand-600" style={{ width: 18, height: 18 }} />
                  <span>Free for all citizens</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in lg:justify-self-end">
              <HeroIllustration className="w-full max-w-lg drop-shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Explore the platform"
            title="Everything you need to stay safe and informed"
            description="Six core features covering disaster readiness, road safety, medical emergencies, and instant access to help."
            center
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} hover as="article" className="p-6 group cursor-pointer" >
                <Link to={f.to} className="block">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${f.color} mb-5 transition-transform group-hover:scale-110`}>
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick emergency */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Quick Emergency"
            title="One-tap access to emergency services"
            description="Save these numbers. In a crisis, every second counts. Tap a card to call directly."
            center
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {quickEmergency.map((e) => (
              <a
                key={e.name}
                href={`tel:${e.number.replace(/-/g, '')}`}
                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-card transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${e.color} text-white mb-4 shadow-sm`}>
                  <e.icon className="h-6 w-6" />
                </div>
                <p className="font-bold text-slate-900">{e.name}</p>
                <p className={`mt-1 font-mono text-2xl font-extrabold tracking-tight bg-gradient-to-br ${e.color} bg-clip-text text-transparent`}>
                  {e.number}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-pakistan-700 transition-colors">
                  Tap to call <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest awareness */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Latest Awareness"
            title="Stay up to date with safety alerts and updates"
            description="Official advisories, platform news, and community preparedness events from across Pakistan."
            action={<Button to="/disaster-guide" variant="outline" size="md">View disaster guide <ArrowRight className="h-4 w-4" /></Button>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {awarenessItems.slice(0, 6).map((item) => {
              const Icon = getIcon(item.icon)
              const tagTone = item.tag === 'Active' ? 'red' : item.tag === 'New' ? 'green' : item.tag === 'Advisory' ? 'amber' : 'blue'
              return (
                <Card key={item.id} hover as="article" className="p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <Icon className="h-5.5 w-5.5" style={{ width: 22, height: 22 }} />
                    </div>
                    <Badge tone={tagTone as 'red' | 'green' | 'amber' | 'blue'} dot>{item.tag}</Badge>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-pakistan-700 mb-1.5">{item.category}</p>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{item.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(item.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Safety tips */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Safety Tips"
            title="Practical tips for everyday safety"
            description="Seasonal, actionable advice to protect yourself and your family on the road and at home."
            center
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {safetyTips.map((tip) => {
              const Icon = getIcon(tip.icon)
              return (
                <Card key={tip.id} hover as="article" className="p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pakistan-800 to-brand-600 text-white mb-5 shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-pakistan-700 mb-1.5">{tip.category}</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{tip.summary}</p>
                  <ul className="space-y-2">
                    {tip.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CircleCheck className="h-4 w-4 mt-0.5 text-brand-600 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pakistan-900 via-pakistan-800 to-brand-700 p-8 sm:p-12 lg:p-16 text-center shadow-glow-brand">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-brand-400 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance max-w-2xl mx-auto">
                Have a safety question? Ask the AI Assistant.
              </h2>
              <p className="mt-4 text-brand-100 max-w-xl mx-auto text-balance">
                Get instant answers about disasters, traffic signs, first aid, and emergency contacts — any time, in plain language.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button to="/ai-assistant" variant="white" size="lg">
                  <Sparkles className="h-5 w-5" />
                  Start chatting now
                </Button>
                <Button to="/about" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Learn about the platform
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
