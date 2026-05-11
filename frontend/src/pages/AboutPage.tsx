import { Link } from 'react-router-dom'
import { ArrowRight, Instagram, BookOpen, Quote, ExternalLink } from 'lucide-react'

// ── Verified artist & legend collaborations ───────────────────────────────────
const BERTRAND_COLLABS = [
  {
    name: 'Antonio Rodrigo Nogueira',
    alias: '"Minotaure"',
    role: 'UFC Legend · Former World Heavyweight Champion',
    quote: 'Bertrand spent years fighting to put MMA on the map in France. I saw it firsthand — his dedication, his vision, his love for the sport. MMAFit is the natural result of a life spent mastering the fight game.',
    context: 'Wrote the preface to Bertrand\'s book "Hors de la cage" (2024)',
    flag: '🇧🇷',
  },
  {
    name: 'Dominique Valera',
    alias: 'World Champion & Film Star',
    role: 'Full-Contact Karate World Champion · Actor & Filmmaker',
    quote: 'He is my friend, my brother, my comrade. What he has done for martial arts in France is historic.',
    context: 'Bertrand trained kickboxing under Valera and taught judo at the Valera Institute',
    flag: '🇫🇷',
  },
  {
    name: 'Céline Clain & Soda Crew',
    alias: 'France\'s Got Talent Finalists',
    role: 'Choreographer · "La France a un incroyable talent" Vice-Champion 2017',
    quote: 'Working with Bertrand to choreograph MMAFit was something entirely new — the power, the rhythm, the intention behind every movement. It translates directly onto the stage.',
    context: 'Collaborated to develop and present MMAFit choreography at the Festival des Arts Martiaux, Paris',
    flag: '🇫🇷',
  },
]

const KAYO_CREDITS = [
  { label: 'Eurovision', detail: 'Represented Sweden on the world stage' },
  { label: 'Radio Chart-Topper', detail: 'Multiple hits in Sweden & internationally' },
  { label: 'TV Host', detail: 'Hosted major Swedish prime-time shows' },
  { label: 'Stage Actress', detail: '40+ years of live theatre and performance' },
  { label: 'Recording Artist', detail: 'Decades of studio work across genres' },
  { label: 'MMAFit Sweden', detail: 'Co-founder & Creative Director' },
]

const BERTRAND_TAGS = [
  'Judo Black Belt', 'French National Team', 'INSEP Trained',
  'Pride FC Fighter', 'MMA Pioneer France', 'MMA Legal Champion',
  'Author', 'Valera Institute', 'RAID Special Forces Trainer',
]

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

      {/* ── Founders ─────────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container-app max-w-5xl mx-auto space-y-20">

          {/* Bertrand */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden sticky top-24">
              <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80" alt="Bertrand Amoussou" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <span className="section-tag">Co-Founder</span>
              <h2 className="font-display font-black text-white text-4xl uppercase mt-2">Bertrand<br />Amoussou</h2>
              <div className="red-line" />

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-2">
                Bertrand Amoussou is the founder of MMAFit — a unique training concept that blends dance, MMA technique, and power to spread joy, energy, and confidence.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">
                Starting judo at age 10, he earned his black belt by 16 and joined the French national team at 18, training at INSEP — France's Top Sport Academy. He became the pioneer of MMA in France, fighting in Vale Tudo and Pride FC, and is the only Frenchman to ever win a fight in that legendary Japanese organisation.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">
                After a 16-year campaign, Bertrand succeeded in legalising MMA in France — officially recognised on January 1, 2020. He has also trained the French special forces (RAID) and authored the book <span className="text-white italic">"Hors de la cage: Mon combat pour la légalisation du MMA en France"</span> (2024), with a preface by UFC legend Antonio Rodrigo Nogueira.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {BERTRAND_TAGS.map((t) => (
                  <span key={t} className="px-3 py-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-full text-xs text-[var(--text-secondary)]">{t}</span>
                ))}
              </div>

              {/* Book callout */}
              <div className="mt-6 p-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 flex items-start gap-3">
                <BookOpen size={16} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white text-sm font-semibold">Hors de la cage <span className="text-[var(--text-muted)] font-normal">(2024)</span></div>
                  <div className="text-[var(--text-secondary)] text-xs mt-0.5">His memoir on pioneering MMA in France — preface by UFC World Champion Antonio Rodrigo Nogueira</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kayo */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="md:order-2 aspect-[4/5] rounded-2xl overflow-hidden sticky top-24">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80" alt="Kayo Shekoni" className="w-full h-full object-cover object-top" />
            </div>
            <div className="md:order-1">
              <span className="section-tag">Co-Founder · Sweden</span>
              <h2 className="font-display font-black text-white text-4xl uppercase mt-2">Kayo<br />Shekoni</h2>
              <div className="red-line" />

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-2">
                Kayode Shekoni — better known as Kayo — is a Swedish-Nigerian artist, dancer, singer, and actress with over four decades of experience on stage, in the studio, and on screen.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">
                She has represented Sweden in Eurovision, topped radio charts, hosted prime-time TV shows, and delivered power, rhythm, and presence on stages across the world. When Kayo discovered MMAFit, she immediately saw the potential — and brought the concept to Sweden.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">
                Today Kayo is co-founder and Creative Director of MMAFit Sweden, building the movement across gyms, instructors, and participants throughout the country. For her, movement is freedom, training is art — and every class is a show where you're the star.
              </p>

              {/* Artist credits grid */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                {KAYO_CREDITS.map((c) => (
                  <div key={c.label} className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
                    <div className="text-white text-xs font-semibold">{c.label}</div>
                    <div className="text-[var(--text-muted)] text-[10px] mt-0.5 leading-snug">{c.detail}</div>
                  </div>
                ))}
              </div>

              <a href="https://www.instagram.com/kayoshekoni/" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--accent)] hover:underline">
                <Instagram size={13} /> @kayoshekoni
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Artists & Collaborators ───────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">Collaborations & References</span>
            <h2 className="font-display font-black text-white text-4xl uppercase mt-2">
              Legends Who Know the Work
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 text-sm max-w-xl mx-auto">
              Bertrand has built MMAFit alongside world champions, celebrated artists, and elite performers — people who know what it means to bring total commitment to their craft.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BERTRAND_COLLABS.map((c) => (
              <div key={c.name} className="card p-6 flex flex-col">
                {/* Quote */}
                <Quote size={20} className="text-[var(--accent)]/40 mb-3 shrink-0" />
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic flex-1">
                  "{c.quote}"
                </p>

                {/* Identity */}
                <div className="mt-5 pt-4 border-t border-[var(--border)]">
                  <div className="flex items-start gap-2">
                    <span className="text-xl leading-none mt-0.5">{c.flag}</span>
                    <div>
                      <div className="text-white text-sm font-bold leading-tight">{c.name}</div>
                      <div className="text-[var(--accent)] text-[10px] font-semibold uppercase tracking-wide mt-0.5">{c.alias}</div>
                      <div className="text-[var(--text-muted)] text-[10px] mt-0.5">{c.role}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                    <p className="text-[var(--text-muted)] text-[10px] leading-snug">{c.context}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional refs */}
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Festival des Arts Martiaux · Paris', desc: 'MMAFit showcased at France\'s largest martial arts event — with Céline Clain & Soda Crew', icon: '🥋' },
              { label: 'MMA Legalised in France', desc: 'After Bertrand\'s 16-year campaign — officially recognised January 1, 2020', icon: '⚖️' },
              { label: 'RAID Special Forces', desc: 'Bertrand has trained France\'s elite special forces unit in martial arts and conditioning', icon: '🎖️' },
            ].map((r) => (
              <div key={r.label} className="card p-5 flex items-start gap-3">
                <span className="text-2xl leading-none mt-0.5">{r.icon}</span>
                <div>
                  <div className="text-white text-sm font-semibold">{r.label}</div>
                  <div className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Book banner */}
          <div className="mt-8 card p-6 border border-[var(--gold)]/30 bg-gradient-to-r from-[var(--gold)]/5 to-transparent flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-16 rounded-lg bg-[var(--gold)]/20 border border-[var(--gold)]/30 flex items-center justify-center shrink-0">
                <BookOpen size={22} className="text-[var(--gold)]" />
              </div>
              <div>
                <div className="text-[var(--gold)] text-xs font-bold uppercase tracking-widest">Book · 2024</div>
                <div className="text-white font-display font-black text-xl mt-0.5">"Hors de la cage"</div>
                <div className="text-[var(--text-secondary)] text-xs mt-0.5">Mon combat pour la légalisation du MMA en France — Bertrand Amoussou</div>
                <div className="text-[var(--text-muted)] text-[10px] mt-1">Preface by Antonio Rodrigo Nogueira "Minotaure" · UFC World Champion</div>
              </div>
            </div>
            <a
              href="https://fightingfilms.shop/produit/hors-de-la-cage/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-2 shrink-0"
            >
              <ExternalLink size={13} /> Get the Book
            </a>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────────── */}
      <section className="py-24">
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
      <section className="py-24 bg-[var(--bg-secondary)]">
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
