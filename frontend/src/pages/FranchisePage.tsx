import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Building2, TrendingUp, Shield, Music } from 'lucide-react'

const CATEGORIES = [
  { name: 'MMAFit Punch',  desc: 'Boxing and MMA striking fundamentals.',   price: 150 },
  { name: 'MMAFit Groove', desc: 'Rhythm-based dance and movement.',        price: 150 },
  { name: 'MMAFit Hit',    desc: 'High-intensity combat cardio.',           price: 150 },
  { name: 'MMAFit Power',  desc: 'Functional strength and conditioning.',   price: 150 },
  { name: 'MMAFit Kids',   desc: 'Age-appropriate classes for 6–14.',       price: 150 },
]

const WHY = [
  { icon: TrendingUp, title: 'Proven Retention', text: 'Members who attend MMAFit classes show 3× higher gym retention rates than traditional cardio classes.' },
  { icon: Music,      title: 'Original Music',   text: 'Every session runs on exclusive MMAFit music — no licensing headaches. Included in your fee.' },
  { icon: Shield,     title: 'Full Support',     text: 'We provide trained instructors (or certify your own), marketing assets, and ongoing choreography updates.' },
  { icon: Building2,  title: 'Scalable Format',  text: 'Add one category or all five. Scale as your gym grows. No minimum commitment beyond the first month.' },
]

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--gold)]/10 via-transparent to-transparent" />
        <div className="hero-mesh" />
        <div className="container-app relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-tag" style={{ color: 'var(--gold)' }}>For Gym Owners</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Bring MMAFit<br />to Your Gym
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed max-w-xl mx-auto">
            Add a first-of-its-kind fitness concept to your facility. License MMAFit and
            instantly elevate your brand, differentiate your timetable, and drive member retention.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="/contact" className="btn-primary px-8 py-4">Get Started <ArrowRight size={16} /></Link>
            <div className="text-center">
              <div className="font-display font-black text-white text-3xl">150 EUR</div>
              <div className="text-xs text-[var(--text-muted)]">per category / month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MMAFit */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="section-tag">Why It Works</span>
            <h2 className="font-display font-black text-white text-4xl uppercase mt-2">
              More Than a Fitness Class
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <div className="w-11 h-11 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[var(--gold)]" />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing categories */}
      <section className="py-24">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Licensing</span>
            <h2 className="font-display font-black text-white text-4xl uppercase mt-2">Program Categories</h2>
            <p className="text-[var(--text-secondary)] mt-3 text-sm">150 EUR/month per category. Choose any combination.</p>
          </div>
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="card p-5 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg">{cat.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-0.5">{cat.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-display font-black text-white text-2xl leading-none">150</div>
                  <div className="text-xs text-[var(--text-muted)]">EUR/mo</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card p-5 mt-6 border-[var(--gold)]/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="badge badge-gold text-xs mb-2">Best Value</div>
                <h3 className="font-display font-bold text-white text-xl">All 5 Categories</h3>
                <p className="text-[var(--text-secondary)] text-sm mt-1">Full MMAFit program suite for your gym.</p>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-white text-4xl leading-none">600</div>
                <div className="text-xs text-[var(--text-muted)]">EUR/mo <span className="line-through opacity-50">750</span></div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-[var(--text-secondary)]">
            <p className="mb-2">Also included:</p>
            <ul className="space-y-1.5">
              {['Certified instructor placement or staff certification training', 'Monthly updated choreography and music', 'Marketing assets and social media templates', 'Branded class materials', 'Ongoing support from the MMAFit team'].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle size={13} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Recommended class fee */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container-app max-w-2xl mx-auto text-center">
          <h2 className="font-display font-black text-white text-3xl uppercase mb-4">What to Charge Members</h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">Based on comparable group fitness benchmarks in Sweden:</p>
          <div className="card p-8 inline-block">
            <div className="font-display font-black text-white text-6xl">10+</div>
            <div className="text-[var(--accent)] font-bold text-lg">EUR per class</div>
            <p className="text-[var(--text-secondary)] text-xs mt-2">Recommended minimum. Urban Stockholm gyms charge 15–25 EUR.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-app text-center max-w-xl mx-auto">
          <h2 className="font-display font-black text-white text-4xl uppercase">Start the Conversation</h2>
          <p className="text-[var(--text-secondary)] mt-4 mb-8 text-sm">We'll walk you through the setup, certification, and launch plan for your gym.</p>
          <Link to="/contact" className="btn-primary text-base px-10 py-4">Contact Us <ArrowRight size={18} /></Link>
          <p className="text-xs text-[var(--text-muted)] mt-4">info@mmafit.se · Instagram: @mmafit.academy</p>
        </div>
      </section>
    </div>
  )
}
