import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Flame, ArrowRight, CheckCircle } from 'lucide-react'
import { PROGRAMS } from '../services/api'

const LEVELS = ['All', 'All Levels', 'Beginner', 'Intermediate', 'Advanced']

export default function ProgramsPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? PROGRAMS
    : PROGRAMS.filter((p) => {
        if (filter === 'Beginner') return p.level === 'beginner'
        if (filter === 'Intermediate') return p.level === 'intermediate'
        if (filter === 'Advanced') return p.level === 'advanced'
        if (filter === 'All Levels') return p.level === 'all'
        return true
      })

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/10 via-transparent to-transparent" />
        <div className="hero-mesh" />
        <div className="container-app text-center relative z-10">
          <span className="section-tag">Programs</span>
          <h1 className="font-display font-black text-white uppercase mt-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Find Your Class
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            Six distinct programs — one powerful concept. Whether you're stepping on the mat for
            the first time or training like a pro, MMAFit has a class for you.
          </p>
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === l
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program cards */}
      <section className="pb-24">
        <div className="container-app">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="card group overflow-hidden flex flex-col">
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className="badge text-xs font-bold uppercase"
                      style={{ background: `${p.color}25`, color: p.color, borderColor: `${p.color}50` }}
                    >
                      {p.level === 'all' ? 'All Levels' : p.level}
                    </span>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ background: p.color }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-black text-white text-2xl leading-tight">{p.name}</h3>
                  <p className="text-[var(--accent)] text-sm font-medium mt-1">{p.tagline}</p>
                  <p className="text-[var(--text-secondary)] text-sm mt-3 leading-relaxed flex-1">{p.description}</p>

                  <div className="flex items-center gap-4 mt-5 py-4 border-y border-[var(--border)]">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                      <Clock size={14} className="text-[var(--accent)]" />
                      {p.duration} min
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                      <Flame size={14} className="text-[var(--accent)]" />
                      {p.calories} kcal
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle size={12} className="shrink-0" style={{ color: p.color }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <Link to="/schedule" className="btn-primary mt-6 justify-center">
                    Book a Class <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
