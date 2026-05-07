import { CheckCircle, X, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MEMBERSHIP_PLANS } from '../services/api'

const COMPARISON = [
  { feature: 'Classes per month',     starter: '4 classes',       pro: 'Unlimited',  elite: 'Unlimited' },
  { feature: 'Programs available',    starter: 'Rhythm & Flow',   pro: 'All 6',      elite: 'All 6' },
  { feature: 'App access',            starter: true,              pro: true,         elite: true },
  { feature: 'Progress tracking',     starter: true,              pro: true,         elite: true },
  { feature: 'Priority booking',      starter: false,             pro: true,         elite: true },
  { feature: 'Nutrition guidance',    starter: false,             pro: true,         elite: true },
  { feature: 'Personal trainer',      starter: false,             pro: '1 session',  elite: '4 sessions' },
  { feature: 'Body composition',      starter: false,             pro: false,        elite: true },
  { feature: 'Dedicated coach',       starter: false,             pro: false,        elite: true },
  { feature: 'Merch discount',        starter: false,             pro: false,        elite: '15%' },
  { feature: 'Certification discount', starter: false,            pro: false,        elite: '20%' },
]

const FAQ = [
  { q: 'Can I cancel anytime?', a: 'Yes — no lock-in contracts. Cancel with 30 days notice.' },
  { q: 'Is there a free trial?', a: 'New members get one free class before committing to a plan.' },
  { q: 'Can I freeze my membership?', a: 'Pro and Elite members can freeze for up to 2 months per year.' },
  { q: 'Can I switch plans?', a: 'Upgrade or downgrade anytime. Effective from the next billing cycle.' },
  { q: 'Is there a student discount?', a: 'Yes — show a valid student ID for 20% off any plan.' },
  { q: 'Are classes bookable online?', a: 'Absolutely. Book, cancel, or join waitlists right in the app.' },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle size={16} className="text-[var(--accent)] mx-auto" />
  if (value === false) return <X size={16} className="text-[var(--text-muted)] mx-auto" />
  return <span className="text-white text-sm">{value}</span>
}

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/10 via-transparent to-transparent" />
        <div className="hero-mesh" />
        <div className="container-app text-center relative z-10">
          <span className="section-tag">Membership</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Join the Movement
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto text-sm">
            Every plan includes our app, progress tracking, and access to the MMAFit community.
            First class is always free.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16">
        <div className="container-app">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`card p-7 flex flex-col relative ${
                  plan.highlighted ? 'border-[var(--accent)] shadow-[0_0_40px_rgba(232,32,47,0.15)]' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1 badge badge-red px-3 py-1 text-xs font-bold">
                      <Star size={11} className="fill-current" /> Most Popular
                    </span>
                  </div>
                )}
                {plan.badge && !plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-gold px-3 py-1 text-xs font-bold">{plan.badge}</span>
                  </div>
                )}
                <h3 className="font-display font-black text-white text-3xl uppercase tracking-wide">{plan.name}</h3>
                <div className="mt-4">
                  <span className="font-display font-black text-white text-5xl leading-none">{plan.price}</span>
                  <span className="text-[var(--text-muted)] text-sm"> SEK/mo</span>
                </div>
                <p className="text-[var(--text-secondary)] text-xs mt-2 mb-6">{plan.description}</p>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-8 ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} justify-center w-full`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--text-muted)] text-xs mt-4">All prices in SEK. First class free. Cancel anytime.</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container-app">
          <h2 className="font-display font-black text-white text-3xl uppercase mb-8 text-center">Compare Plans</h2>
          <div className="card overflow-hidden max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="p-4 text-left text-sm text-[var(--text-muted)] font-medium">Feature</th>
                    {MEMBERSHIP_PLANS.map((p) => (
                      <th key={p.id} className={`p-4 text-center text-sm font-bold font-display uppercase tracking-wide ${p.highlighted ? 'text-[var(--accent)]' : 'text-white'}`}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : ''}>
                      <td className="p-4 text-sm text-[var(--text-secondary)]">{row.feature}</td>
                      <td className="p-4 text-center"><Cell value={row.starter} /></td>
                      <td className="p-4 text-center"><Cell value={row.pro} /></td>
                      <td className="p-4 text-center"><Cell value={row.elite} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--bg-primary)]">
        <div className="container-app max-w-2xl mx-auto">
          <h2 className="font-display font-black text-white text-3xl uppercase mb-8 text-center">FAQ</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="card p-5">
                <h4 className="font-semibold text-white text-sm">{q}</h4>
                <p className="text-[var(--text-secondary)] text-sm mt-1.5 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
