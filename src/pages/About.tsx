import { useState } from 'react'
import {
  Target, Eye, CheckCircle2, AlertTriangle, BookOpen, Users, ChevronDown,
  Sparkles, ShieldCheck, HeartHandshake, Database, Code2, GraduationCap, Building2, FolderGit2,
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const objectives = [
  'Empower citizens with accessible, accurate safety and preparedness information.',
  'Reduce disaster risk through education and proactive planning.',
  'Improve road safety by teaching traffic signs and driving best practices.',
  'Provide instant access to emergency contacts across all provinces.',
  'Use AI to answer safety questions in clear, simple language.',
  'Build a culture of preparedness in communities nationwide.',
]

const sources = [
  { name: 'National Disaster Management Authority (NDMA)', desc: 'Official disaster advisories and preparedness guidelines.' },
  { name: 'Rescue 1122', desc: 'First aid protocols and emergency response procedures.' },
  { name: 'National Highways & Motorway Police', desc: 'Traffic sign standards and road safety rules.' },
  { name: 'Pakistan Red Crescent', desc: 'First aid and disaster response training materials.' },
  { name: 'World Health Organization (WHO)', desc: 'International first aid and emergency care standards.' },
  { name: 'Edhi Foundation', desc: 'Ambulance and welfare service information.' },
]

const team = [
  { name: 'Product Lead', role: 'Platform Strategy', icon: Target },
  { name: 'AI Engineer', role: 'Assistant Development', icon: Sparkles },
  { name: 'Safety Expert', role: 'Content & Review', icon: ShieldCheck },
  { name: 'UX Designer', role: 'Experience & Accessibility', icon: HeartHandshake },
]

const faqs = [
  {
    q: 'Is Pakistan Awareness Hub a government website?',
    a: 'No. Pakistan Awareness Hub is an independent public awareness platform. It is not affiliated with any government body, but it references official sources like NDMA, Rescue 1122, and the Motorway Police for accuracy.',
  },
  {
    q: 'Can the AI Assistant replace emergency services?',
    a: 'Absolutely not. The AI Assistant provides educational guidance only. In any real emergency, you must call 1122 or the relevant emergency number immediately. Never delay professional help to use the assistant.',
  },
  {
    q: 'Is the information on this platform accurate?',
    a: 'All content is compiled from official and reputable sources including NDMA, Rescue 1122, WHO, and the National Highways & Motorway Police. However, protocols can change — always follow instructions from emergency responders on the scene.',
  },
  {
    q: 'Is the platform free to use?',
    a: 'Yes. Pakistan Awareness Hub is completely free for all citizens. There are no accounts, subscriptions, or payments required.',
  },
  {
    q: 'Can I upload a photo of a traffic sign to the AI?',
    a: 'Image upload is shown as a preview feature and will be available in a future update. For now, you can describe the sign to the AI Assistant in text.',
  },
  {
    q: 'How often is the content updated?',
    a: 'Content is reviewed regularly and updated as new official guidelines are released. Emergency numbers are verified against current public sources.',
  },
]

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div>
      <PageHeader
        eyebrow="About"
        title=" Made/Developed by Muhammad Ansar Khan
                 <br />
               Building a safer, more prepared Pakistan."
        description="Pakistan Awareness Hub is an AI-powered public awareness platform dedicated to helping citizens stay safe, informed, and ready for emergencies."
        breadcrumbs={[{ label: 'About' }]}
      />

      <div className="container-page py-8 lg:py-10 space-y-16">
        {/* Mission & Vision */}
        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pakistan-900 to-brand-600 text-white mb-5">
              <Target className="h-7 w-7" />
            </div>
            <Badge tone="green" className="mb-3">Our Mission</Badge>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Make safety knowledge accessible to every citizen</h2>
            <p className="text-slate-600 leading-relaxed">
              We believe that preparedness saves lives. Our mission is to provide every Pakistani — regardless of location, education, or background — with clear, reliable information about disasters, traffic rules, first aid, and emergency contacts, powered by AI for instant answers.
            </p>
          </Card>
          <Card className="p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-sky-700 text-white mb-5">
              <Eye className="h-7 w-7" />
            </div>
            <Badge tone="blue" className="mb-3">Our Vision</Badge>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">A nation where everyone is ready to respond</h2>
            <p className="text-slate-600 leading-relaxed">
              We envision a Pakistan where every household has an emergency plan, every driver understands road signs, and every citizen knows exactly what to do and who to call when disaster strikes. Technology and awareness together can build resilient communities.
            </p>
          </Card>
        </section>

        {/* Objectives */}
        <section>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-pakistan-700 mb-2">Project Objectives</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What we aim to achieve</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((obj, i) => (
              <Card key={i} className="p-5 flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold mt-0.5">{i + 1}</span>
                <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{obj}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Disclaimer */}
        <section>
          <Alert variant="warning" title="AI Disclaimer" className="max-w-4xl mx-auto">
            <p>
              The AI Assistant on this platform uses a knowledge base compiled from public safety information. Its responses are generated to guide and educate — they are <strong>not</strong> a substitute for professional medical advice, emergency services, or official disaster instructions. Always verify critical information with authorities, and in any emergency, call <strong className="font-mono">1122</strong> immediately.
            </p>
          </Alert>
        </section>

        {/* Information sources */}
        <section>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-pakistan-700 mb-2">Information Sources</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Where our information comes from</h2>
            <p className="mt-3 text-slate-600">We compile content from official and reputable sources to ensure accuracy and reliability.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sources.map((src, i) => (
              <Card key={i} className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 mb-3">
                  <BookOpen className="h-5.5 w-5.5" style={{ width: 22, height: 22 }} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{src.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{src.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Team placeholder */}
        <section>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-pakistan-700 mb-2">Our Team</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The people behind the platform</h2>
            <p className="mt-3 text-slate-600">A multidisciplinary team committed to public safety and accessible technology.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => {
              const Icon = member.icon
              return (
                <Card key={i} className="p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{member.role}</p>
                </Card>
              )
            })}
          </div>
          <p className="text-center text-sm text-slate-400 mt-5">Team details are placeholders. Full team information will be added soon.</p>
        </section>

        {/* FAQ */}
        <section>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-pakistan-700 mb-2">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <ChevronDown className={cn('h-5 w-5 text-slate-400 shrink-0 transition-transform', openFaq === i && 'rotate-180')} />
                </button>
                <div className={cn(
                  'grid transition-all duration-300',
                  openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Project Creator */}
        <section>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-pakistan-700 mb-2">Project Creator</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Developer &amp; Designer</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pakistan-900 to-brand-600 text-white shadow-sm">
                  <Code2 className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-900">Muhammad Ansar khan</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Designed &amp; developed by M.Ansar as a BS Computer Science final project at the University of Swabi.</p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="flex items-center justify-center sm:justify-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <GraduationCap className="h-4 w-4" />
                      </span>
                      <span className="text-slate-500">Program</span>
                      <span className="font-semibold text-slate-900">BS Computer Science</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <span className="text-slate-500">Semester</span>
                      <span className="font-semibold text-slate-900">3rd Semester</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Database className="h-4 w-4" />
                      </span>
                      <span className="text-slate-500">Department</span>
                      <span className="font-semibold text-slate-900">Computer Science</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Building2 className="h-4 w-4" />
                      </span>
                      <span className="text-slate-500">University</span>
                      <span className="font-semibold text-slate-900">University of Swabi</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center sm:justify-start gap-2.5 text-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pakistan-100 text-pakistan-700">
                      <FolderGit2 className="h-4 w-4" />
                    </span>
                    <span className="text-slate-500">Project</span>
                    <span className="font-semibold text-slate-900">Pakistan Awareness Hub</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400">© 2026 M.Ansar — Pakistan Awareness Hub</p>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pakistan-900 via-pakistan-800 to-brand-700 p-8 sm:p-12 text-center text-white shadow-glow-brand">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance max-w-2xl mx-auto">Ready to get started?</h2>
              <p className="mt-3 text-brand-100 max-w-xl mx-auto text-balance">Explore the platform and equip yourself with the knowledge to stay safe.</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Button to="/ai-assistant" variant="white" size="lg"><Sparkles className="h-5 w-5" /> Try the AI Assistant</Button>
                <Button to="/disaster-guide" variant="ghost" size="lg" className="text-white hover:bg-white/10">Browse disaster guide</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
