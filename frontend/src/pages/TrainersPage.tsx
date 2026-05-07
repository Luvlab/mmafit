import { Instagram, Star, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TRAINERS } from '../services/api'

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/10 via-transparent to-transparent" />
        <div className="hero-mesh" />
        <div className="container-app text-center relative z-10 max-w-2xl mx-auto">
          <span className="section-tag">The Team</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Meet Your Coaches
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 text-sm">
            From Pride FC rings to Eurovision stages — our team brings world-class expertise
            to every class. Real credentials. Real results. Real joy.
          </p>
        </div>
      </section>

      {/* Founders — big feature */}
      <section className="pb-16">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {TRAINERS.slice(0, 2).map((trainer) => (
              <div key={trainer.id} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="badge badge-red mb-2 text-xs">Co-Founder</div>
                    <h2 className="font-display font-black text-white text-3xl leading-tight">{trainer.name}</h2>
                    <p className="text-[var(--accent)] text-sm font-medium mt-1">{trainer.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{trainer.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {trainer.specialties.map((s) => (
                      <span key={s} className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full text-xs text-[var(--text-secondary)]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-[var(--border)] flex items-center justify-between">
                    <div className="flex gap-6">
                      <div>
                        <div className="font-display font-bold text-white text-xl">{trainer.classCount}</div>
                        <div className="text-xs text-[var(--text-muted)]">Weekly classes</div>
                      </div>
                      <div>
                        <div className="font-display font-bold text-white text-xl">{trainer.memberCount}+</div>
                        <div className="text-xs text-[var(--text-muted)]">Members trained</div>
                      </div>
                    </div>
                    {trainer.socials?.instagram && (
                      <a
                        href={`https://www.instagram.com/mmafit.academy/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-colors"
                      >
                        <Instagram size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other instructors */}
          <h2 className="font-display font-black text-white text-2xl uppercase mb-6">Senior Instructors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRAINERS.slice(2).map((trainer) => (
              <div key={trainer.id} className="card group overflow-hidden">
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display font-black text-white text-lg leading-tight">{trainer.name}</h3>
                    <p className="text-[var(--accent)] text-xs mt-0.5">{trainer.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[var(--text-secondary)] text-xs leading-relaxed line-clamp-3">{trainer.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {trainer.specialties.slice(0, 2).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full text-[10px] text-[var(--text-muted)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become instructor CTA */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-app text-center max-w-2xl mx-auto">
          <BookOpen size={40} className="text-[var(--accent)] mx-auto mb-4" />
          <h2 className="font-display font-black text-white text-4xl uppercase">Become a Certified Instructor</h2>
          <p className="text-[var(--text-secondary)] mt-4 mb-8 text-sm">
            Get the skills, the certification, and the support to lead your own MMAFit classes.
            380 EUR for your full certification.
          </p>
          <Link to="/certification" className="btn-primary text-base px-8 py-3.5">
            Start Certification
          </Link>
        </div>
      </section>
    </div>
  )
}
