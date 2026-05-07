import { useState } from 'react'
import { Clock, Users, CheckCircle } from 'lucide-react'
import { CLASS_SCHEDULE } from '../services/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function SchedulePage() {
  const { isAuthenticated } = useAuthStore()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const [activeDay, setActiveDay] = useState(DAYS.includes(today) ? today : 'Monday')
  const [booked, setBooked] = useState<Set<string>>(new Set())

  const book = (id: string, name: string) => {
    if (!isAuthenticated) { toast.error('Sign in to book classes'); return }
    setBooked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
    toast.success(booked.has(id) ? 'Booking cancelled' : `Booked: ${name}!`)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/8 via-transparent to-transparent" />
        <div className="container-app text-center relative z-10">
          <span className="section-tag">Class Schedule</span>
          <h1 className="font-display font-black text-white uppercase mt-3" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Book Your Spot
          </h1>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto text-sm">
            Classes fill up fast — especially on weekends. Reserve your spot in advance.
          </p>
        </div>
      </section>

      {/* Day tabs */}
      <section className="pb-24">
        <div className="container-app">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 mb-8">
            {DAYS.map((day) => {
              const isToday = day === today
              const isActive = day === activeDay
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`shrink-0 px-5 py-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-0.5 ${
                    isActive
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)]'
                  }`}
                >
                  <span>{day.slice(0, 3)}</span>
                  {isToday && <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">Today</span>}
                </button>
              )
            })}
          </div>

          {/* Classes for selected day */}
          <div className="space-y-3">
            {(CLASS_SCHEDULE[activeDay] ?? []).length === 0 ? (
              <div className="card p-12 text-center text-[var(--text-secondary)]">No classes scheduled</div>
            ) : (
              (CLASS_SCHEDULE[activeDay] ?? []).map((cls) => {
                const isFull = cls.enrolled >= cls.capacity
                const isBooked = booked.has(cls.id)
                const pct = Math.round((cls.enrolled / cls.capacity) * 100)

                return (
                  <div
                    key={cls.id}
                    className="card p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                    style={{ borderLeftWidth: 3, borderLeftColor: cls.color }}
                  >
                    {/* Time */}
                    <div className="shrink-0 text-center sm:w-16">
                      <div className="font-display font-black text-white text-lg leading-none">{cls.time}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-1 justify-center">
                        <Clock size={10} /> {cls.duration}m
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-white text-lg leading-tight">{cls.programName}</h3>
                        <span
                          className="badge text-xs"
                          style={{ background: `${cls.color}20`, color: cls.color, borderColor: `${cls.color}40` }}
                        >
                          {cls.level}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm mt-0.5">{cls.trainerName}</p>

                      {/* Capacity bar */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full overflow-hidden max-w-[120px]">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${pct}%`, background: isFull ? '#e8202f' : cls.color }}
                          />
                        </div>
                        <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Users size={11} />
                          {cls.enrolled}/{cls.capacity}
                          {isFull && <span className="text-[var(--accent)] font-semibold ml-1">Full</span>}
                        </span>
                      </div>
                    </div>

                    {/* Book btn */}
                    <button
                      onClick={() => book(cls.id, cls.programName)}
                      disabled={isFull && !isBooked}
                      className={`shrink-0 px-5 py-2.5 rounded-lg text-sm font-bold font-display uppercase tracking-wide transition-all ${
                        isBooked
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : isFull
                          ? 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] cursor-not-allowed'
                          : 'btn-primary'
                      }`}
                    >
                      {isBooked ? (
                        <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Booked</span>
                      ) : isFull ? 'Waitlist' : 'Book'}
                    </button>
                  </div>
                )
              })
            )}
          </div>

          {/* Legend */}
          <div className="mt-8 card p-4 flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[var(--accent)] rounded-full" /> Class full — join waitlist</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full" /> Booked by you</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[var(--border)] rounded-full" /> Available spots</div>
          </div>
        </div>
      </section>
    </div>
  )
}
