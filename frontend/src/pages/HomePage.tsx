import { Link } from 'react-router-dom'
import { ArrowRight, Play, Star, CheckCircle, Zap, Users, Calendar, TrendingUp, Music, Shield, Globe, Camera, BookOpen, Building2, Layers } from 'lucide-react'
import { PROGRAMS, TRAINERS, TESTIMONIALS, MEMBERSHIP_PLANS } from '../services/api'

const STATS = [
  { value: '2,400+', label: 'Active Members' },
  { value: '40+',   label: 'Weekly Classes' },
  { value: '6',     label: 'Programs' },
  { value: '100%',  label: 'Joy Guaranteed' },
]

// All 11 benefits verbatim from mmafit.se
const BENEFITS = [
  {
    icon: Zap,
    title: 'Hybrid Format — a First of Its Kind',
    text: "Combines dance, boxing, MMA techniques, and rhythm-based conditioning in one class – unlike anything currently on the market. It's not just fitness; it's performance and empowerment.",
    stat: '600+ kcal/session',
  },
  {
    icon: Camera,
    title: 'Visually Impactful — Social Media Gold',
    text: 'The classes look incredible on camera: striking visuals, strong energy, synchronized movement = perfect for social content and viral marketing.',
    stat: 'Scroll-stopper content',
  },
  {
    icon: TrendingUp,
    title: 'High Engagement & Retention',
    text: "The mix of music, choreography, and technique keeps members emotionally and physically engaged. The 'show' aspect keeps people coming back — it's addictive, in a good way.",
    stat: '3× retention rate',
  },
  {
    icon: Layers,
    title: 'Modular & Scalable for Gym Chains',
    text: 'Can be packaged and franchised for other instructors, offering training certifications and branded formats (e.g., MMAFit Punch, MMAFit Power, etc.).',
    stat: '150 EUR/mo per category',
  },
  {
    icon: Users,
    title: 'All-Level Inclusive, No Experience Needed',
    text: "Members don't need to be fighters or dancers – just ready to move. The structure supports beginners through to advanced participants, boosting participation rates.",
    stat: 'No experience needed',
  },
  {
    icon: Building2,
    title: 'Builds a Stronger Gym Identity',
    text: "Elevates the gym's brand from a place to work out to a place where people express power and personality. Sets the chain apart from others offering only generic classes.",
    stat: 'Differentiate your brand',
  },
  {
    icon: Shield,
    title: 'Empowerment Through Movement',
    text: 'Teaches functional MMA movements & techniques while building confidence – especially appealing to women and younger audiences looking for both fun and professional MMA skills.',
    stat: 'Builds real confidence',
  },
  {
    icon: Calendar,
    title: 'Not Seasonal',
    text: "MMAFit isn't tied to trends or seasons. It's a year-round experience that delivers energy, empowerment, and results no matter the weather.",
    stat: 'Year-round, all-weather',
  },
  {
    icon: Music,
    title: 'Unique Original Music',
    text: 'The music in MMAFit classes is composed & created specially for MMAFit — to enhance every move, punch and kick, while fueling the user with energy & joy.',
    stat: '100% original compositions',
  },
  {
    icon: Globe,
    title: 'Visually Stunning',
    text: 'The choreography is visually stunning – with sharp strikes, fluid transitions, and synchronized movement that pops on camera. Made for the stage and the screen — a scroll-stopper on social media.',
    stat: 'Viral-ready content',
  },
  {
    icon: BookOpen,
    title: 'Easy to Learn',
    text: 'Easy-to-follow combos, clear structure, and rhythm-based movements make the choreography intuitive and beginner-friendly – no experience needed. Suits all ages.',
    stat: 'Day-one friendly',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg pt-16">
        <div className="hero-mesh" />

        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808]/60 to-[#080808]" />

        <div className="relative z-10 container-app text-center max-w-5xl mx-auto px-4">
          <div className="animate-fade-in">
            <span className="section-tag">MMAFit — Sweden</span>
          </div>
          <h1 className="font-display font-black text-white uppercase leading-none mt-4 animate-slide-up stagger-1"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', letterSpacing: '-0.02em' }}
          >
            Designed<br />
            <span className="text-gradient">With Intent.</span>
          </h1>
          <p className="mt-6 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed animate-slide-up stagger-2"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            A high-energy training form that fuses dance, boxing, and MMA movements into one powerful experience.
            It's a sweat-dripping, beat-driven journey where every punch hits the bag with purpose,
            every move flows with rhythm, and every class feels like a fight-choreographed performance.
            Think of it as your bodyguard in motion — fierce, technical, and full of joy.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-slide-up stagger-3">
            <Link to="/register" className="btn-primary text-base px-8 py-4">
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link to="/programs" className="btn-secondary text-base px-8 py-4 flex items-center gap-2">
              <Play size={16} className="fill-current" /> Explore Programs
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--accent)]" />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--accent)] py-6">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/20">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center px-4">
                <div className="font-display font-black text-white text-3xl md:text-4xl leading-none">{value}</div>
                <div className="text-white/80 text-sm mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS MMAFIT ────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container-app grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="section-tag">What is MMAFit</span>
            <h2 className="section-heading text-white mt-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
              Your Bodyguard in Motion
            </h2>
            <div className="red-line" />
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2 text-base">
              Think of it as your bodyguard in motion — fierce, technical, and full of joy.
              A sweat-dripping, beat-driven journey where martial arts meets dance in a way
              that's never been done before.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4 text-base">
              Co-created by MMA pioneer Bertrand Amoussou and Swedish-Nigerian artist Kayo Shekoni,
              MMAFit is the only fitness concept where you leave feeling like a fighter, a dancer,
              and a performer — all at once.
            </p>
            <div className="mt-8 space-y-3">
              {['No experience needed', 'Original composed music', 'All ages welcome', 'Proven mental health benefits'].map((f) => (
                <div key={f} className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <CheckCircle size={16} className="text-[var(--accent)] shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-secondary mt-8 inline-flex">
              Our Story <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--bg-card)]">
              <img
                src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80"
                alt="MMAFit class"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[var(--accent)]/20 rounded-lg flex items-center justify-center">
                  <Star size={20} className="text-[var(--accent)] fill-current" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-lg leading-none">5.0</div>
                  <div className="text-xs text-[var(--text-muted)]">Avg. rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="section-tag">Programs</span>
            <h2 className="section-heading text-white mt-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
              Five Programs. One Concept.
            </h2>
            <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto text-sm">
              From absolute beginners to seasoned fighters — there's an MMAFit class designed for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p, i) => (
              <Link
                key={p.id}
                to="/programs"
                className={`card group overflow-hidden animate-slide-up stagger-${Math.min(i + 1, 5)}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge text-xs font-bold uppercase" style={{ background: `${p.color}20`, color: p.color, borderColor: `${p.color}40` }}>
                      {p.level === 'all' ? 'All Levels' : p.level}
                    </span>
                    <span className="text-xs text-white/60">{p.duration} min · {p.calories} kcal</span>
                  </div>
                  <h3 className="font-display font-black text-white text-xl leading-tight">{p.name}</h3>
                  <p className="text-white/70 text-xs mt-1 line-clamp-2">{p.tagline}</p>
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-1 opacity-80"
                  style={{ background: p.color }}
                />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/programs" className="btn-secondary">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="section-tag">Why MMAFit</span>
            <h2 className="section-heading text-white mt-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
              Built Different. By Design.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, text, stat }, i) => (
              <div key={title} className={`card p-6 animate-slide-up stagger-${Math.min(i + 1, 5)}`}>
                <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-display font-bold text-white text-lg leading-tight mb-2">{title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">{text}</p>
                <div className="font-display font-bold text-[var(--accent)] text-sm uppercase tracking-wide">{stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="section-tag">The Founders</span>
            <h2 className="section-heading text-white mt-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
              Behind the Movement
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TRAINERS.slice(0, 2).map((trainer) => (
              <Link key={trainer.id} to="/trainers" className="card group overflow-hidden">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="font-display font-black text-white text-2xl leading-tight">{trainer.name}</div>
                    <div className="text-[var(--accent)] text-sm font-medium mt-1">{trainer.title}</div>
                    <p className="text-white/70 text-xs mt-2 line-clamp-2">{trainer.bio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/trainers" className="btn-secondary">Meet All Trainers <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-heading text-white mt-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
              Hear from Our Members
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className={`card p-6 animate-slide-up stagger-${Math.min(i + 1, 5)}`}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-[var(--gold)] fill-current" />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-[var(--text-muted)] text-xs">{t.program} · Since {t.since}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="section-tag">Membership</span>
            <h2 className="section-heading text-white mt-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
              Pick Your Plan
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`card p-6 flex flex-col ${plan.highlighted ? 'border-[var(--accent)] relative' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-red text-xs font-bold uppercase px-3 py-1">Most Popular</span>
                  </div>
                )}
                <h3 className="font-display font-black text-white text-2xl uppercase tracking-wide">{plan.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="font-display font-black text-white text-4xl leading-none">{plan.price}</span>
                  <span className="text-[var(--text-muted)] text-sm"> SEK/mo</span>
                </div>
                <p className="text-[var(--text-secondary)] text-xs mt-1 mb-6">{plan.description}</p>
                <ul className="space-y-2 flex-1">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle size={13} className="text-[var(--accent)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/membership"
                  className={`mt-6 ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} justify-center w-full`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--text-muted)] text-xs mt-6">
            Prices in SEK. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── B2B CTA ───────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Certification */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <span className="badge badge-red mb-4 text-xs">For Instructors</span>
              <h3 className="font-display font-black text-white text-3xl uppercase leading-tight">
                Become Certified
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mt-3 mb-6 max-w-sm">
                Get certified to teach MMAFit classes. One-time investment of 380 EUR includes practical training, materials, and your initial certification.
              </p>
              <Link to="/certification" className="btn-primary inline-flex">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>

            {/* Franchise */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--gold)]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <span className="badge badge-gold mb-4 text-xs">For Gym Owners</span>
              <h3 className="font-display font-black text-white text-3xl uppercase leading-tight">
                Add MMAFit to Your Gym
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mt-3 mb-6 max-w-sm">
                License MMAFit for your facility. Modular, scalable, and proven to boost member retention. From 150 EUR/month per program category.
              </p>
              <Link to="/franchise" className="btn-secondary inline-flex">
                Explore Franchise <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/15 via-transparent to-transparent" />
        <div className="hero-mesh" />
        <div className="container-app text-center relative z-10">
          <span className="section-tag">Ready?</span>
          <h2 className="font-display font-black text-white uppercase mt-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
          >
            Unleash Your<br />Inner Fighter
          </h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-md mx-auto text-base">
            Join thousands of members across Sweden who've discovered what it feels like to move with power, rhythm, and joy.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-primary text-base px-10 py-4">
              Join Now — Free Trial <ArrowRight size={18} />
            </Link>
            <Link to="/schedule" className="btn-secondary text-base px-10 py-4 flex items-center gap-2">
              <Calendar size={16} /> View Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
