import { Link } from 'react-router-dom'
import { ArrowRight, Instagram } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/70 to-[var(--bg-primary)]" />
        <div className="container-app relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-tag">Our Story</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Designed with Intent.
          </h1>
          <p className="text-[var(--text-secondary)] mt-6 text-base leading-relaxed">
            A high-energy training form that fuses dance, boxing, and MMA movements
            into one powerful experience. It's a sweat-dripping, beat-driven journey
            where every punch hits the bag with purpose, every move flows with rhythm,
            and every class feels like a fight-choreographed performance.
          </p>
          <p className="text-[var(--text-primary)]/70 mt-4 text-base font-medium italic">
            Think of it as your bodyguard in motion — fierce, technical, and full of joy.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24">
        <div className="container-app max-w-4xl mx-auto space-y-16">

          {/* Bertrand */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80" alt="Bertrand" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <span className="section-tag">Co-Founder</span>
              <h2 className="font-display font-black text-white text-4xl uppercase mt-2">Bertrand<br />Amoussou</h2>
              <div className="red-line" />
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-2">
                Bertrand Amoussou is the founder of MMAFit — a unique training concept that blends dance, MMA technique, and power to spread joy, energy, and confidence.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">
                Starting judo at age 10, he earned his black belt by 16 and soon competed at elite level, joining the French national team at 18 and later training at INSEP, France's Top Sport Academy. Bertrand is the pioneer of MMA in France, fighting in Vale Tudo and Pride FC — becoming the only Frenchman to win a fight in that legendary MMA Japanese organisation.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Judo Black Belt', 'French National Team', 'Pride FC Fighter', 'MMA Pioneer', 'INSEP Trained'].map((t) => (
                  <span key={t} className="px-3 py-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-full text-xs text-[var(--text-secondary)]">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Kayo */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="md:order-2 aspect-[4/5] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80" alt="Kayo" className="w-full h-full object-cover object-top" />
            </div>
            <div className="md:order-1">
              <span className="section-tag">Co-Founder</span>
              <h2 className="font-display font-black text-white text-4xl uppercase mt-2">Kayo<br />Shekoni</h2>
              <div className="red-line" />
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-2">
                Kayode Shekoni — better known as Kayo — is a Swedish-Nigerian artist, dancer, singer, and actress with over four decades of experience on stage, in the studio, and on screen.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">
                She's represented Sweden in Eurovision, topped radio charts, hosted hit TV shows — and above all, delivered power, rhythm, presence, and joy. Today, Kayo is the co-founder of MMAFit Sweden, bringing the concept to gyms, instructors, and participants across the country. For her, movement is freedom, training is art — and every class is a show where you're the star.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Eurovision', 'Swedish-Nigerian', 'Artist & Dancer', 'TV Host', '40+ Years on Stage'].map((t) => (
                  <span key={t} className="px-3 py-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-full text-xs text-[var(--text-secondary)]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container-app max-w-3xl mx-auto text-center">
          <span className="section-tag">The Mission</span>
          <h2 className="font-display font-black text-white text-4xl uppercase mt-2 mb-6">Movement is for Everyone</h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            MMAFit exists to prove that fitness doesn't have to be boring, intimidating, or exclusive.
            We believe that everyone — regardless of age, background, or fitness level — deserves to
            feel powerful, joyful, and alive in their body. That's why we designed MMAFit to be all-level
            inclusive, music-driven, and visually electric.
          </p>
          <a href="https://www.instagram.com/mmafit.academy/" target="_blank" rel="noopener noreferrer" className="btn-primary mt-10 inline-flex">
            <Instagram size={16} /> Follow @mmafit.academy
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-app text-center max-w-xl mx-auto">
          <h2 className="font-display font-black text-white text-4xl uppercase">Join the Movement</h2>
          <p className="text-[var(--text-secondary)] mt-4 mb-8 text-sm">Start training. Start teaching. Or bring MMAFit to your gym.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-primary px-8 py-4">Become a Member <ArrowRight size={16} /></Link>
            <Link to="/certification" className="btn-secondary px-8 py-4">Get Certified</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
