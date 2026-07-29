import { Link } from 'react-router-dom'
import { ShieldCheck, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks } from '@/data/nav'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pakistan-800 text-white">
                <ShieldCheck className="h-5 w-5" style={{ width: 22, height: 22 }} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display font-bold text-white text-[15px]">Pakistan Awareness Hub</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-400">Safety · Traffic · Preparedness</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              An AI-powered public awareness platform helping citizens stay informed about disaster preparedness, traffic rules, first aid, and emergency contacts across Pakistan.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-pakistan-800 hover:text-white transition-all"
                >
                  <Icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm mb-4">Emergency Numbers</h4>
            <ul className="space-y-3">
              {[
                { name: 'Police', number: '15' },
                { name: 'Rescue 1122', number: '1122' },
                { name: 'Edhi Ambulance', number: '115' },
                { name: 'Fire Brigade', number: '16' },
                { name: 'NDMA Helpline', number: '111-157-157' },
              ].map((item) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{item.name}</span>
                  <a href={`tel:${item.number.replace(/-/g, '')}`} className="font-mono font-semibold text-brand-400 hover:text-brand-300 transition-colors">
                    {item.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-slate-500 shrink-0" />
                <span>Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <a href="mailto:info@pakistanawareness.pk" className="hover:text-brand-400 transition-colors">info@pakistanawareness.pk</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <a href="tel:111157157" className="hover:text-brand-400 transition-colors">111-157-157</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
              <strong className="text-slate-400">Disclaimer:</strong> Pakistan Awareness Hub is an independent public awareness platform. Information is provided for educational purposes and is not a substitute for professional emergency services. In a life-threatening emergency, always call 1122 immediately.
            </p>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} Pakistan Awareness Hub. All rights reserved.
              </p>
              <p className="text-xs text-slate-500">
                Made by <span className="text-slate-400 font-medium">Muhammad Ansar Khan</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
