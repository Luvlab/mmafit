import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Award, Clock, Globe, Users } from 'lucide-react'

const STEPS = [
  { step: '01', title: 'Apply Online', desc: 'Fill in the application form. We\'ll review your fitness background and confirm your spot.' },
  { step: '02', title: 'Pre-Course Materials', desc: 'Receive your digital pre-study pack — technique foundations, music theory, and program philosophy.' },
  { step: '03', title: 'Certification Weekend', desc: 'Two intensive training days with Bertrand and Kayo. Practical training, choreography, and methodology.' },
  { step: '04', title: 'Assessment', desc: 'Demonstrate a full MMAFit class sequence and answer methodology questions. Pass = certified.' },
  { step: '05', title: 'Start Teaching', desc: 'Receive your digital certificate, instructor badge, and immediate access to the monthly resource library.' },
]

const INCLUDES = [
  'Full practical training (2-day residential)',
  'Pre-course digital materials',
  'MMAFit Methodology Manual',
  'Choreography for 3 full programs',
  'Original MMAFit music tracks',
  'Instructor badge + certificate',
  'Access to instructor network',
  'First month of Annual Membership free (€25 value)',
]

const ANNUAL = [
  'Monthly new choreography drops',
  'Updated music tracks',
  'Instructor-only webinars',
  'Business development resources',
  'Priority support from Bertrand & Kayo',
  'Discounts on new program categories',
]

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/12 via-transparent to-transparent" />
        <div className="hero-mesh" />
        <div className="container-app relative z-10 max-w-3xl mx-auto text-center">
          <Award size={40} className="text-[var(--accent)] mx-auto mb-4" />
          <span className="section-tag">For Instructors</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Get Certified
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed max-w-xl mx-auto">
            Join the growing global network of certified MMAFit instructors.
            Trained directly by founders Bertrand Amoussou and Kayo Shekoni.
            One certification. Lifetime impact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="/contact" className="btn-primary px-8 py-4">Apply Now <ArrowRight size={16} /></Link>
            <div className="text-center">
              <div className="font-display font-black text-white text-3xl">380 EUR</div>
              <div className="text-xs text-[var(--text-muted)]">one-time investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: '2-Day',  l: 'Intensive Training' },
              { v: '380',    l: 'EUR One-Time Fee' },
              { v: '25 EUR', l: '/Month Membership' },
              { v: '10+',    l: 'Countries Active' },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="font-display font-black text-white text-3xl">{v}</div>
                <div className="text-[var(--text-muted)] text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification steps */}
      <section className="py-24">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">The Process</span>
            <h2 className="font-display font-black text-white text-4xl uppercase mt-2">5 Steps to Certified</h2>
          </div>
          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <div key={s.step} className="card p-5 flex gap-5">
                <div className="font-display font-black text-[var(--accent)] text-3xl leading-none shrink-0 w-12">{s.step}</div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">{s.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <span className="section-tag">Certification Package</span>
              <h2 className="font-display font-black text-white text-3xl uppercase mt-2 mb-6">What's Included</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                One payment of 380 EUR covers your full certification from day one.
              </p>
              <ul className="space-y-2.5">
                {INCLUDES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <CheckCircle size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="section-tag">Annual Membership · 25 EUR/mo</span>
              <h2 className="font-display font-black text-white text-3xl uppercase mt-2 mb-6">Stay Current</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                Optional annual membership keeps you updated with fresh choreography and ongoing support.
              </p>
              <ul className="space-y-2.5">
                {ANNUAL.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <CheckCircle size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-app text-center max-w-xl mx-auto">
          <h2 className="font-display font-black text-white text-4xl uppercase">Ready to Lead?</h2>
          <p className="text-[var(--text-secondary)] mt-4 mb-8 text-sm">
            Our next certification cohort is forming now. Limited spots available.
          </p>
          <Link to="/contact" className="btn-primary text-base px-10 py-4">
            Apply for Certification <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-4">Questions? Email us at info@mmafit.se</p>
        </div>
      </section>
    </div>
  )
}
