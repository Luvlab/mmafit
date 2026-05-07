import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin } from 'lucide-react'

const LINKS = {
  Programs: [
    { label: 'MMAFit Original', href: '/programs' },
    { label: 'MMAFit Battle', href: '/programs' },
    { label: 'MMAFit Power', href: '/programs' },
    { label: 'MMAFit Groove', href: '/programs' },
    { label: 'MMAFit Kids', href: '/programs' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Trainers', href: '/trainers' },
    { label: 'Certification', href: '/certification' },
    { label: 'Franchise', href: '/franchise' },
    { label: 'Contact', href: '/contact' },
  ],
  Members: [
    { label: 'Schedule', href: '/schedule' },
    { label: 'Membership', href: '/membership' },
    { label: 'Shop', href: '/shop' },
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="container-app py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--accent)] rounded flex items-center justify-center">
                <span className="font-display font-black text-white text-sm">M</span>
              </div>
              <span className="font-display font-black text-white text-xl tracking-tight uppercase">MMAFit</span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
              Dance, boxing, and MMA movements fused into one powerful experience. Designed with intent.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/mmafit.academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:info@mmafit.se"
                className="p-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Address + copyright */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <MapPin size={13} />
            <span>MMAFit Intl. · 10 Avenue Hoche, 75008 Paris · info@mmafit.se</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} MMAFit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
