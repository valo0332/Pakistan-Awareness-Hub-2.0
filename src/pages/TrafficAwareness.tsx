import { Link } from 'react-router-dom'
import { ArrowRight, TrafficCone, ScrollText, Receipt, Brain, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { trafficSigns } from '@/data/trafficSigns'
import { trafficRules } from '@/data/trafficRules'
import { trafficFines } from '@/data/trafficFines'
import { quizQuestions } from '@/data/trafficQuiz'

const sections = [
  {
    id: 'signs',
    title: 'Traffic Signs',
    description: 'Browse the complete library of Pakistan traffic signs — warning, regulatory, mandatory, and informatory — with meanings, driver actions, and safety tips.',
    to: '/traffic-awareness/signs',
    icon: TrafficCone,
    color: 'bg-amber-100 text-amber-700',
    accent: 'from-amber-500 to-amber-600',
    count: `${trafficSigns.length} signs`,
    bullets: ['Instant search', 'Category filters', 'Detailed sign pages'],
  },
  {
    id: 'rules',
    title: 'Traffic Rules',
    description: 'Learn the essential road rules every driver must follow — lane discipline, overtaking, seat belts, helmets, speed limits, parking, and motorway etiquette.',
    to: '/traffic-awareness/rules',
    icon: ScrollText,
    color: 'bg-sky-100 text-sky-700',
    accent: 'from-sky-500 to-sky-600',
    count: `${trafficRules.length} rule topics`,
    bullets: ['Expandable cards', 'Driver penalties', 'Practical guidance'],
  },
  {
    id: 'fines',
    title: 'Traffic Fine Codes',
    description: 'Search the official Khyber Pakhtunkhwa Traffic Police fine schedule. Every offence with its code, description, and fine amount.',
    to: '/traffic-awareness/fines',
    icon: Receipt,
    color: 'bg-red-100 text-red-700',
    accent: 'from-red-500 to-red-600',
    count: `${trafficFines.length} offences`,
    bullets: ['Instant search', 'Category filters', 'Sorting & detail view'],
  },
  {
    id: 'quiz',
    title: 'Traffic Quiz',
    description: 'Test your road safety knowledge with an interactive quiz across Easy, Medium, and Hard levels. Get a performance badge and review your mistakes.',
    to: '/traffic-awareness/quiz',
    icon: Brain,
    color: 'bg-violet-100 text-violet-700',
    accent: 'from-violet-500 to-violet-600',
    count: `${quizQuestions.length} questions`,
    bullets: ['Three difficulty levels', 'Progress & score', 'Review incorrect answers'],
  },
]

export default function TrafficAwareness() {
  return (
    <div>
      <PageHeader
        eyebrow="Traffic Awareness"
        title="Your complete Road Safety Learning Center"
        description="Master Pakistan's traffic signs, rules, and fine codes — then test yourself with an interactive quiz. Everything you need to drive safely and legally."
        breadcrumbs={[{ label: 'Traffic Awareness' }]}
      />

      <div className="container-page py-8 lg:py-10">
        <Alert variant="tip" className="mb-8" title="Why road safety matters">
          Road traffic accidents are a leading cause of injury in Pakistan. Knowing signs, rules, and fines keeps you, your family, and other road users safe.
        </Alert>

        {/* Section cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {sections.map((s) => (
            <Link key={s.id} to={s.to}>
              <Card hover className="p-6 sm:p-7 h-full group">
                <div className="flex items-start justify-between mb-5">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} transition-transform group-hover:scale-110`}>
                    <s.icon className="h-7 w-7" />
                  </div>
                  <Badge tone="slate">{s.count}</Badge>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${s.accent}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                  Explore section <ArrowRight className="h-4 w-4" />
                </span>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-12">
          <SectionHeader
            eyebrow="At a glance"
            title="A complete road safety reference"
            description="Four interconnected modules take you from recognising signs to understanding the law and testing your knowledge."
            center
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrafficCone, label: 'Traffic Signs', value: trafficSigns.length, color: 'bg-amber-50 text-amber-700' },
              { icon: ScrollText, label: 'Rule Topics', value: trafficRules.length, color: 'bg-sky-50 text-sky-700' },
              { icon: Receipt, label: 'Fine Codes', value: trafficFines.length, color: 'bg-red-50 text-red-700' },
              { icon: Brain, label: 'Quiz Questions', value: quizQuestions.length, color: 'bg-violet-50 text-violet-700' },
            ].map((stat) => (
              <Card key={stat.label} className="p-5 text-center">
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety reminder */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-pakistan-900 to-brand-700 p-8 sm:p-10 text-white text-center">
          <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-brand-200" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Safe driving starts with knowledge</h2>
          <p className="text-brand-100 max-w-2xl mx-auto leading-relaxed">
            Review signs before a journey, follow posted rules, and never assume other drivers will do the right thing. Defensive driving saves lives.
          </p>
        </div>
      </div>
    </div>
  )
}
