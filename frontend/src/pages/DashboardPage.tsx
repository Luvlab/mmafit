import { useState } from 'react'
import {
  LayoutDashboard, Users, Calendar, UserPlus, Package, Megaphone, Target,
  Instagram, ReceiptText, DollarSign, FileText, Shield, Settings, LogOut,
  Star, TrendingUp, ShoppingBag, Flame, Clock, CheckCircle, ChevronRight,
  Download, Bell, ArrowUpRight, ArrowDownRight, BookOpen, Award, Zap,
  Music, Video, FileDown, BarChart2, AlertCircle, Play, Menu, X,
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { PROGRAMS, CLASS_SCHEDULE, TESTIMONIALS } from '../services/api'

// ── Real content from mmafit.se ───────────────────────────────────────────────
const REAL_PRICING = {
  certificationFee: 380,
  instructorMonthly: 25,
  gymLicensePerCategory: 150,
  participantClassFee: 10,
  currency: 'EUR',
}

const TODAY_CLASSES = Object.values(CLASS_SCHEDULE).flat().slice(0, 5)
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const TODAY_DAY = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]

// ── Shared KPI card ───────────────────────────────────────────────────────────
function KPI({ label, value, delta, positive = true, icon: Icon, color = 'var(--accent)' }: any) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {delta && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
          </span>
        )}
      </div>
      <div className="font-display font-black text-white text-3xl leading-none">{value}</div>
      <div className="text-[var(--text-muted)] text-xs mt-1">{label}</div>
    </div>
  )
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
      {text}
    </span>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MEMBER DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const MEMBER_NAV = [
  { icon: LayoutDashboard, label: 'Overview',    id: 'overview',  group: '' },
  { icon: Calendar,        label: 'My Classes',  id: 'classes',   group: '' },
  { icon: TrendingUp,      label: 'My Progress', id: 'progress',  group: '' },
  { icon: ShoppingBag,     label: 'My Orders',   id: 'orders',    group: '' },
  { icon: Settings,        label: 'Profile',     id: 'profile',   group: '' },
]

function MemberOverview({ user }: { user: any }) {
  const upcoming = TODAY_CLASSES.slice(0, 3)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Welcome back, {user?.name?.split(' ')[0] || 'Fighter'}</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Your next class is <span className="text-[var(--accent)] font-medium">tomorrow at 07:00 — MMAFit Punch with Bertrand</span></p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Classes This Month" value="8" delta="+2" positive icon={Calendar} color="#e8202f" />
        <KPI label="Calories Burned" value="4,240" delta="+12%" positive icon={Flame} color="#ff6b35" />
        <KPI label="Current Streak" value="5 days" delta="+3" positive icon={Zap} color="#f5a623" />
        <KPI label="Total Sessions" value="34" delta="+8" positive icon={TrendingUp} color="#34c759" />
      </div>

      {/* Upcoming classes */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-white text-lg uppercase mb-4">Upcoming Classes</h3>
        <div className="space-y-3">
          {upcoming.map((cls: any) => (
            <div key={cls.id} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-1 h-10 rounded-full" style={{ background: cls.color }} />
                <div>
                  <div className="text-white text-sm font-medium">{cls.programName}</div>
                  <div className="text-[var(--text-muted)] text-xs">{cls.trainerName} · {cls.time} · {cls.duration} min</div>
                </div>
              </div>
              <button className="btn-primary text-xs px-4 py-2">Book</button>
            </div>
          ))}
        </div>
      </div>

      {/* What is MMAFit */}
      <div className="card p-6 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border-[var(--accent)]/20">
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
          "A high-energy training form that fuses dance, boxing, and MMA movements into one powerful experience. Every punch hits the bag with purpose, every move flows with rhythm, and every class feels like a fight-choreographed performance."
        </p>
        <div className="mt-3 text-xs text-[var(--text-muted)]">— MMAFit, Designed with intent.</div>
      </div>

      {/* Testimonials */}
      <div className="grid sm:grid-cols-3 gap-4">
        {TESTIMONIALS.slice(0, 3).map((t) => (
          <div key={t.id} className="card p-4">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={11} className="text-[var(--gold)] fill-current" />)}
            </div>
            <p className="text-[var(--text-secondary)] text-xs leading-relaxed italic">"{t.text}"</p>
            <div className="mt-3 text-xs font-medium text-white">{t.name}</div>
            <div className="text-[10px] text-[var(--text-muted)]">{t.program}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MemberClasses() {
  const [booked, setBooked] = useState<string[]>([])
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Book a Class</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Five programs, one powerful concept. Designed with intent.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROGRAMS.map((p) => (
          <div key={p.id} className="card overflow-hidden">
            <div className="h-1 w-full" style={{ background: p.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display font-black text-white text-xl">{p.name}</h3>
                <Badge text={p.level === 'beginner' ? 'Beginner' : p.level === 'intermediate' ? 'Intermediate' : 'All Levels'} color={p.color} />
              </div>
              <p className="text-[var(--accent)] text-xs font-medium mb-2">{p.tagline}</p>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-4">{p.description}</p>
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                <span className="flex items-center gap-1"><Clock size={11} style={{ color: p.color }} />{p.duration} min</span>
                <span className="flex items-center gap-1"><Flame size={11} style={{ color: p.color }} />{p.calories} kcal</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.features.map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)]">{f}</span>
                ))}
              </div>
              <button
                onClick={() => setBooked(b => b.includes(p.id) ? b.filter(x => x !== p.id) : [...b, p.id])}
                className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${booked.includes(p.id) ? 'bg-green-600 text-white' : 'btn-primary'}`}
              >
                {booked.includes(p.id) ? '✓ Booked' : 'Book Class'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-5 border-[var(--accent)]/30">
        <div className="flex items-start gap-3">
          <Award size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
          <div>
            <div className="text-white text-sm font-semibold mb-1">Become a Certified MMAFit Instructor</div>
            <p className="text-[var(--text-secondary)] text-xs">Get certified for <strong className="text-white">380 EUR</strong> — one-time fee. Includes practical training, educational materials, and initial certification. Then <strong className="text-white">25 EUR/month</strong> for monthly choreography updates, music, ongoing support, and network access.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MemberProgress() {
  const weeks = ['W1', 'W2', 'W3', 'W4']
  const vals = [3, 5, 4, 6]
  const max = 8
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-white text-3xl uppercase">My Progress</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Classes" value="34" icon={Calendar} color="#e8202f" />
        <KPI label="Total Calories" value="18,200" icon={Flame} color="#ff6b35" />
        <KPI label="Hours Trained" value="28h" icon={Clock} color="#f5a623" />
        <KPI label="Best Streak" value="9 days" icon={Zap} color="#34c759" />
      </div>
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Classes Per Week</h3>
        <div className="flex items-end gap-3 h-32">
          {weeks.map((w, i) => (
            <div key={w} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs text-[var(--text-muted)]">{vals[i]}</div>
              <div className="w-full rounded-t-lg" style={{ height: `${(vals[i] / max) * 100}%`, background: 'var(--accent)', opacity: i === 3 ? 1 : 0.5 }} />
              <div className="text-xs text-[var(--text-muted)]">{w}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Program Breakdown</h3>
        <div className="space-y-3">
          {PROGRAMS.map((p) => {
            const pct = Math.floor(Math.random() * 40) + 10
            return (
              <div key={p.id} className="flex items-center gap-3">
                <div className="text-xs text-[var(--text-secondary)] w-28 shrink-0">{p.name}</div>
                <div className="flex-1 bg-[var(--bg-primary)] rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: p.color }} />
                </div>
                <div className="text-xs text-[var(--text-muted)] w-8 text-right">{pct}%</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="card p-5 bg-gradient-to-r from-[var(--accent)]/10 to-transparent">
        <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-white">Science-backed results:</strong> Just 25 minutes of dance-based movement can cut depression symptoms by ~47%. 45 minutes can drop anxiety by ~57%. MMAFit meets and exceeds WHO's recommended 150 min/week activity target.
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TRAINER / CREW DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const TRAINER_NAV = [
  { icon: LayoutDashboard, label: 'Overview',      id: 'overview',       group: '' },
  { icon: Calendar,        label: 'My Schedule',   id: 'schedule',       group: '' },
  { icon: Users,           label: 'My Students',   id: 'students',       group: '' },
  { icon: Music,           label: 'Resources',     id: 'resources',      group: '' },
  { icon: Award,           label: 'Certification', id: 'certification',  group: '' },
  { icon: DollarSign,      label: 'Earnings',      id: 'earnings',       group: '' },
  { icon: Settings,        label: 'Profile',       id: 'profile',        group: '' },
]

function TrainerOverview({ user }: { user: any }) {
  const myClasses = Object.values(CLASS_SCHEDULE).flat().filter((c: any) =>
    c.trainerName.toLowerCase().includes((user?.name || '').split(' ')[0]?.toLowerCase() || 'diana')
  ).slice(0, 5)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Instructor Panel</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Welcome, {user?.name || 'Instructor'} — certified MMAFit instructor</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Classes This Week" value="6" delta="+1" positive icon={Calendar} color="#e8202f" />
        <KPI label="Total Students" value="94" delta="+7" positive icon={Users} color="#9b59b6" />
        <KPI label="Avg Attendance" value="89%" delta="+3%" positive icon={TrendingUp} color="#34c759" />
        <KPI label="Monthly Earnings" value="€940" delta="+€80" positive icon={DollarSign} color="#f5a623" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">My Classes This Week</h3>
          {myClasses.length === 0 ? (
            <div className="text-[var(--text-muted)] text-sm">No classes assigned yet.</div>
          ) : myClasses.map((cls: any) => (
            <div key={cls.id} className="flex items-center gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
              <div className="w-1 h-8 rounded-full shrink-0" style={{ background: cls.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium">{cls.programName}</div>
                <div className="text-[var(--text-muted)] text-xs">{cls.time} · {cls.enrolled}/{cls.capacity} booked</div>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">{DAYS.find(d => CLASS_SCHEDULE[d]?.some((c: any) => c.id === cls.id))}</div>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">Membership Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-sm text-[var(--text-secondary)]">Plan</span>
              <span className="text-sm text-white font-medium">Instructor Membership</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-sm text-[var(--text-secondary)]">Monthly fee</span>
              <span className="text-sm text-white font-medium">{REAL_PRICING.instructorMonthly} EUR/mo</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-sm text-[var(--text-secondary)]">Yearly equiv.</span>
              <span className="text-sm text-white font-medium">300 EUR/year</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-sm text-[var(--text-secondary)]">Status</span>
              <Badge text="Active" color="#34c759" />
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[var(--text-secondary)]">Next invoice</span>
              <span className="text-sm text-white">1 Jun 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5 border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
        <div className="flex items-start gap-3">
          <Instagram size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
          <div>
            <div className="text-white text-sm font-semibold mb-1">Share Your Classes — @mmafit.academy</div>
            <p className="text-[var(--text-secondary)] text-xs">MMAFit classes are visually stunning — sharp strikes, fluid transitions, synchronized movement that pops on camera. It's made for the stage AND the screen. Tag your classes and build your audience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrainerResources() {
  const months = ['May 2026 — Current', 'Apr 2026', 'Mar 2026', 'Feb 2026']
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Instructor Resources</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Monthly choreography, original music, and training materials — included in your 25 EUR/mo membership</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <Music size={28} className="text-[var(--accent)] mx-auto mb-3" />
          <div className="font-display font-bold text-white text-lg">Original Music</div>
          <p className="text-[var(--text-muted)] text-xs mt-1">Composed specifically for MMAFit to enhance every move, punch, and kick</p>
        </div>
        <div className="card p-5 text-center">
          <Video size={28} className="text-[var(--accent)] mx-auto mb-3" />
          <div className="font-display font-bold text-white text-lg">Choreography Videos</div>
          <p className="text-[var(--text-muted)] text-xs mt-1">Monthly updates with new combos and sequences for all 5 programs</p>
        </div>
        <div className="card p-5 text-center">
          <BookOpen size={28} className="text-[var(--accent)] mx-auto mb-3" />
          <div className="font-display font-bold text-white text-lg">Training Materials</div>
          <p className="text-[var(--text-muted)] text-xs mt-1">Session plans, cues, modifications, and teaching notes</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Monthly Resource Packs</h3>
        <div className="space-y-3">
          {PROGRAMS.map((p) => (
            <div key={p.id}>
              <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">{p.name}</div>
              {months.slice(0, 2).map((m, i) => (
                <div key={m} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}20` }}>
                      <FileDown size={14} style={{ color: p.color }} />
                    </div>
                    <div>
                      <div className="text-white text-xs font-medium">{m} Pack</div>
                      <div className="text-[var(--text-muted)] text-[10px]">Choreography + Music + Session Plan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {i === 0 && <Badge text="New" color={p.color} />}
                    <button className="p-1.5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors">
                      <Download size={13} className="text-[var(--text-secondary)]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrainerCertification() {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-white text-3xl uppercase">My Certification</h2>

      <div className="card p-6 border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center shrink-0">
            <Award size={24} className="text-[var(--accent)]" />
          </div>
          <div>
            <div className="font-display font-black text-white text-2xl">Certified MMAFit Instructor</div>
            <div className="text-[var(--accent)] text-sm mt-0.5">All 5 Programs — Punch · Groove · Hit · Power · Kids</div>
            <div className="flex gap-6 mt-3">
              <div><div className="text-xs text-[var(--text-muted)]">Certified since</div><div className="text-white text-sm font-medium">Mar 2024</div></div>
              <div><div className="text-xs text-[var(--text-muted)]">Certification fee</div><div className="text-white text-sm font-medium">380 EUR</div></div>
              <div><div className="text-xs text-[var(--text-muted)]">Renewal</div><div className="text-white text-sm font-medium">Mar 2026</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">Certification Includes</h3>
          <div className="space-y-2">
            {['Practical training in all 5 MMAFit formats','Educational materials & session plans','Initial certification upon completion','Access to instructor network','Monthly choreography updates','Original MMAFit music library','Ongoing support from HQ'].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">Program Approvals</h3>
          <div className="space-y-3">
            {PROGRAMS.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-sm text-[var(--text-secondary)]">{p.name}</span>
                </div>
                <Badge text="Approved" color="#34c759" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-display font-bold text-white uppercase mb-3">Recommended participant fee</h3>
        <p className="text-[var(--text-secondary)] text-sm">Participants pay <strong className="text-white">10+ EUR per class</strong> — aligned with Zumba and Les Mills pricing in Sweden. Your 25 EUR/month membership gives you access to everything needed to run full classes.</p>
      </div>
    </div>
  )
}

function TrainerEarnings() {
  const months = ['Jan','Feb','Mar','Apr','May']
  const earnings = [820, 940, 880, 1020, 940]
  const max = 1200
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-white text-3xl uppercase">My Earnings</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="This Month" value="€940" delta="+€80" positive icon={DollarSign} color="#34c759" />
        <KPI label="Last Month" value="€1,020" icon={DollarSign} color="#f5a623" />
        <KPI label="Classes Taught" value="24" delta="+2" positive icon={Calendar} color="#e8202f" />
        <KPI label="Avg per Class" value="€39" delta="+€3" positive icon={TrendingUp} color="#9b59b6" />
      </div>
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Earnings Last 5 Months</h3>
        <div className="flex items-end gap-4 h-36">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs text-[var(--text-muted)]">€{earnings[i]}</div>
              <div className="w-full rounded-t-lg transition-all" style={{ height: `${(earnings[i] / max) * 100}%`, background: i === months.length - 1 ? 'var(--accent)' : 'rgba(232,32,47,0.4)' }} />
              <div className="text-xs text-[var(--text-muted)]">{m}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-5">
        <h3 className="font-display font-bold text-white uppercase mb-3">Cost Overview</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm py-2 border-b border-[var(--border)]">
            <span className="text-[var(--text-secondary)]">Instructor membership</span>
            <span className="text-white">25 EUR/mo</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-[var(--border)]">
            <span className="text-[var(--text-secondary)]">Participant fee (rec.)</span>
            <span className="text-white">10+ EUR/class</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-[var(--text-secondary)]">This month's membership cost</span>
            <span className="text-[var(--accent)]">- 25 EUR</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// STAFF DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const STAFF_NAV = [
  { icon: LayoutDashboard, label: 'Overview',     id: 'overview',  group: '' },
  { icon: Calendar,        label: 'Today\'s Classes', id: 'classes', group: '' },
  { icon: Users,           label: 'Check-ins',    id: 'checkins',  group: '' },
  { icon: Package,         label: 'Equipment',    id: 'equipment', group: '' },
  { icon: Settings,        label: 'Profile',      id: 'profile',   group: '' },
]

function StaffOverview() {
  const todayClasses = CLASS_SCHEDULE[TODAY_DAY] || CLASS_SCHEDULE['Monday']
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Staff Overview</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">{TODAY_DAY} — {new Date().toLocaleDateString('en-SE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Classes Today" value={todayClasses.length.toString()} icon={Calendar} color="#e8202f" />
        <KPI label="Total Bookings" value={todayClasses.reduce((a: number, c: any) => a + c.enrolled, 0).toString()} icon={Users} color="#9b59b6" />
        <KPI label="Open Spots" value={todayClasses.reduce((a: number, c: any) => a + (c.capacity - c.enrolled), 0).toString()} icon={Target} color="#34c759" />
        <KPI label="Check-ins So Far" value="12" icon={CheckCircle} color="#f5a623" />
      </div>
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Today's Schedule — {TODAY_DAY}</h3>
        <div className="space-y-2">
          {todayClasses.map((cls: any) => {
            const pct = Math.round((cls.enrolled / cls.capacity) * 100)
            return (
              <div key={cls.id} className="flex items-center gap-4 p-3 bg-[var(--bg-primary)] rounded-lg">
                <div className="text-sm text-white font-medium w-12 shrink-0">{cls.time}</div>
                <div className="w-1 h-10 rounded-full shrink-0" style={{ background: cls.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{cls.programName}</div>
                  <div className="text-[var(--text-muted)] text-xs">{cls.trainerName} · {cls.duration} min</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-[var(--border)] rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: pct >= 90 ? '#e8202f' : pct >= 70 ? '#f5a623' : '#34c759' }} />
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)]">{cls.enrolled}/{cls.capacity}</span>
                  </div>
                </div>
                <Badge text={pct >= 90 ? 'Full' : pct >= 70 ? 'Filling' : 'Open'} color={pct >= 90 ? '#e8202f' : pct >= 70 ? '#f5a623' : '#34c759'} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="card p-5">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-[var(--gold)] shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="text-white font-medium">Reminder: </span>
            <span className="text-[var(--text-secondary)]">Gym license renewal due — 150 EUR/month per active program category. Contact info@mmafit.se for billing queries.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const ADMIN_NAV = [
  { icon: LayoutDashboard, label: 'Overview',      id: 'overview',    group: 'Main' },
  { icon: Users,           label: 'Members',       id: 'members',     group: 'Main' },
  { icon: Calendar,        label: 'Classes',       id: 'classes',     group: 'Main' },
  { icon: UserPlus,        label: 'Instructors',   id: 'staff',       group: 'Main' },
  { icon: Package,         label: 'Shop',          id: 'shop',        group: 'Main' },
  { icon: Megaphone,       label: 'Marketing',     id: 'marketing',   group: 'Business' },
  { icon: Target,          label: 'Events',        id: 'events',      group: 'Business' },
  { icon: Instagram,       label: 'Social Media',  id: 'social',      group: 'Business' },
  { icon: ReceiptText,     label: 'Bookkeeping',   id: 'bookkeeping', group: 'Finance' },
  { icon: DollarSign,      label: 'Revenue',       id: 'revenue',     group: 'Finance' },
  { icon: FileText,        label: 'Tax Reports',   id: 'tax',         group: 'Finance' },
  { icon: Shield,          label: 'Permissions',   id: 'permissions', group: 'Admin' },
  { icon: Settings,        label: 'Settings',      id: 'settings',    group: 'Admin' },
]

function AdminOverview() {
  const months = ['Dec','Jan','Feb','Mar','Apr','May']
  const revenue = [18200, 19400, 21000, 22800, 24100, 24800]
  const max = 30000
  const recentMembers = [
    { name: 'Emma S.', joined: 'today', status: 'Active' },
    { name: 'Johan B.', joined: 'yesterday', status: 'Active' },
    { name: 'Amira H.', joined: '2d ago', status: 'Active' },
    { name: 'Lars N.', joined: '3d ago', status: 'Active' },
    { name: 'Fatima D.', joined: '5d ago', status: 'Active' },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Operations Overview</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">MMAFit Sweden · {new Date().toLocaleDateString('en-SE', { month: 'long', year: 'numeric' })}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Members" value="2,418" delta="+12%" positive icon={Users} color="#e8202f" />
        <KPI label="Monthly Revenue" value="€24.8k" delta="+8%" positive icon={DollarSign} color="#34c759" />
        <KPI label="Classes/Week" value="40" delta="+4" positive icon={Calendar} color="#9b59b6" />
        <KPI label="Avg Attendance" value="84%" delta="+3%" positive icon={TrendingUp} color="#f5a623" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="New Members (mo)" value="127" delta="+22%" positive icon={UserPlus} color="#e8202f" />
        <KPI label="Churn Rate" value="3.2%" delta="-1.1%" positive icon={ArrowDownRight} color="#ff6b35" />
        <KPI label="Shop Revenue" value="€4.1k" delta="+15%" positive icon={Package} color="#f5a623" />
        <KPI label="Certs Sold" value="18" delta="+6" positive icon={Award} color="#9b59b6" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-1">Recent Members</h3>
          <button className="text-xs text-[var(--accent)] mb-4">View all →</button>
          <div className="space-y-2">
            {recentMembers.map((m) => (
              <div key={m.name} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-xs text-[var(--accent)] font-bold">{m.name[0]}</div>
                  <div>
                    <div className="text-white text-sm">{m.name}</div>
                    <div className="text-[var(--text-muted)] text-xs">Joined {m.joined}</div>
                  </div>
                </div>
                <Badge text={m.status} color="#34c759" />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">Top Programs</h3>
          {[{ name: 'MMAFit Punch', pct: 92 }, { name: 'MMAFit Hit', pct: 88 }, { name: 'MMAFit Groove', pct: 76 }, { name: 'MMAFit Power', pct: 71 }, { name: 'MMAFit Kids', pct: 58 }].map((p) => {
            const prog = PROGRAMS.find(x => x.name === p.name)
            return (
              <div key={p.name} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">{p.name}</span>
                  <span className="text-white font-medium">{p.pct}%</span>
                </div>
                <div className="bg-[var(--bg-primary)] rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${p.pct}%`, background: prog?.color || 'var(--accent)' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Revenue — Last 6 Months</h3>
        <p className="text-[var(--text-muted)] text-xs mb-4">Memberships + Shop + Certifications + Franchise licenses</p>
        <div className="flex items-end gap-3 h-32">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] text-[var(--text-muted)]">€{Math.round(revenue[i] / 1000)}k</div>
              <div className="w-full rounded-t-lg" style={{ height: `${(revenue[i] / max) * 100}%`, background: i === months.length - 1 ? 'var(--accent)' : 'rgba(232,32,47,0.4)' }} />
              <div className="text-[10px] text-[var(--text-muted)]">{m}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-xs text-[var(--text-muted)] mb-1">Instructor cert fee</div>
          <div className="font-display font-black text-white text-2xl">380 EUR</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">One-time · 18 sold this month</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[var(--text-muted)] mb-1">Instructor membership</div>
          <div className="font-display font-black text-white text-2xl">25 EUR/mo</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">94 active instructors</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[var(--text-muted)] mb-1">Gym license (per category)</div>
          <div className="font-display font-black text-white text-2xl">150 EUR/mo</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">12 active gym licenses</div>
        </div>
      </div>
    </div>
  )
}

function AdminInstructors() {
  const instructors = [
    { name: 'Bertrand Amoussou', role: 'Founder', programs: ['Punch','Hit'], certDate: 'Founder', status: 'Active', monthly: '-' },
    { name: 'Kayo Shekoni', role: 'Co-Founder SE', programs: ['Groove','Punch'], certDate: 'Founder', status: 'Active', monthly: '-' },
    { name: 'Diana Svensson', role: 'Certified Instructor', programs: ['Punch','Groove','Kids'], certDate: 'Jan 2024', status: 'Active', monthly: '25 EUR' },
    { name: 'Marcus Holm', role: 'Certified Instructor', programs: ['Hit','Power'], certDate: 'Mar 2024', status: 'Active', monthly: '25 EUR' },
    { name: 'Sofia Berg', role: 'Certified Instructor', programs: ['Groove','Kids'], certDate: 'Jun 2024', status: 'Active', monthly: '25 EUR' },
    { name: 'Erik Lindgren', role: 'Certified Instructor', programs: ['Punch','Hit'], certDate: 'Sep 2024', status: 'Pending', monthly: '25 EUR' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-black text-white text-3xl uppercase">Instructors</h2>
        <button className="btn-primary text-sm px-5 py-2.5">+ Add Instructor</button>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <KPI label="Active Instructors" value="94" delta="+6" positive icon={UserPlus} color="#e8202f" />
        <KPI label="Monthly Membership Rev" value="€2,350" delta="+8%" positive icon={DollarSign} color="#34c759" />
        <KPI label="Certs Issued (YTD)" value="18" delta="+6" positive icon={Award} color="#f5a623" />
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
            <tr>
              {['Instructor','Role','Programs','Certified','Monthly','Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {instructors.map((ins, i) => (
              <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-xs text-[var(--accent)] font-bold">{ins.name[0]}</div>
                    <span className="text-white font-medium">{ins.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{ins.role}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {ins.programs.map(p => {
                      const prog = PROGRAMS.find(x => x.name.includes(p))
                      return <Badge key={p} text={p} color={prog?.color || 'var(--accent)'} />
                    })}
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{ins.certDate}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{ins.monthly}</td>
                <td className="px-4 py-3"><Badge text={ins.status} color={ins.status === 'Active' ? '#34c759' : '#f5a623'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminMarketing() {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-white text-3xl uppercase">Marketing</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Instagram, title: 'Instagram @mmafit.academy', desc: 'MMAFit classes are social media gold. Sharp strikes, fluid transitions, synchronized movement — made for the screen.', color: '#e8202f' },
          { icon: Megaphone, title: 'Email Campaigns', desc: 'Send monthly updates to members, promote new choreography packs, announce events and certification openings.', color: '#9b59b6' },
          { icon: Target, title: 'Promo Codes', desc: 'Generate discount codes for first class free, instructor certification trials, or gym partnership offers.', color: '#f5a623' },
          { icon: Video, title: 'Content Library', desc: 'Visually stunning class recordings ready to share. MMAFit is made for the stage AND the screen — every class is a scroll-stopper.', color: '#ff6b35' },
          { icon: BarChart2, title: 'Analytics', desc: 'Track class bookings, conversion from free trial, instructor growth, and franchise pipeline.', color: '#34c759' },
          { icon: BookOpen, title: 'Franchise Sales', desc: 'Reach gym chains. 150 EUR/month per category. 5 categories × 12 months = potential €9,000/gym/year.', color: '#f5a623' },
        ].map((tool) => (
          <div key={tool.title} className="card p-5 hover:border-[var(--border-light)] transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30` }}>
              <tool.icon size={18} style={{ color: tool.color }} />
            </div>
            <div className="font-semibold text-white text-sm mb-1">{tool.title}</div>
            <p className="text-[var(--text-muted)] text-xs leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Quick Email Campaign</h3>
        <div className="space-y-3">
          <input className="input-dark" placeholder="Subject line…" />
          <textarea className="input-dark min-h-[100px] resize-none" placeholder="Message body…" />
          <div className="flex gap-3">
            <select className="input-dark flex-1"><option>All Members</option><option>Active Instructors</option><option>Gym Partners</option></select>
            <button className="btn-primary px-6">Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminBookkeeping() {
  const txs = [
    { id: 'T001', type: 'Membership', party: 'Emma Svensson', date: '2026-05-07', amount: 499, status: 'paid' },
    { id: 'T002', type: 'Shop', party: 'Johan Berg', date: '2026-05-07', amount: 699, status: 'paid' },
    { id: 'T003', type: 'Membership', party: 'Amira Hassan', date: '2026-05-06', amount: 299, status: 'paid' },
    { id: 'T004', type: 'Certification', party: 'Marcus Trainer', date: '2026-05-06', amount: 380, status: 'paid' },
    { id: 'T005', type: 'Refund', party: 'Lars Nilsson', date: '2026-05-05', amount: -299, status: 'refund' },
    { id: 'T006', type: 'Gym License', party: 'FitZone Stockholm', date: '2026-05-01', amount: 450, status: 'paid' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-black text-white text-3xl uppercase">Bookkeeping</h2>
        <button className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"><Download size={14} />Export CSV</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Revenue (MTD)" value="€24.8k" delta="+8%" positive icon={DollarSign} color="#34c759" />
        <KPI label="Expenses (MTD)" value="€11.2k" delta="-3%" positive icon={ArrowDownRight} color="#e8202f" />
        <KPI label="Net Profit (MTD)" value="€13.6k" delta="+14%" positive icon={TrendingUp} color="#34c759" />
        <KPI label="Outstanding" value="€840" icon={AlertCircle} color="#f5a623" />
      </div>
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="font-display font-bold text-white uppercase">Recent Transactions</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
            <tr>
              {['ID','Type','Party','Date','Amount','Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {txs.map((tx) => (
              <tr key={tx.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)] transition-colors">
                <td className="px-4 py-3 text-[var(--text-muted)] font-mono text-xs">{tx.id}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{tx.type}</td>
                <td className="px-4 py-3 text-white">{tx.party}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{tx.date}</td>
                <td className={`px-4 py-3 font-semibold ${tx.amount < 0 ? 'text-[var(--accent)]' : 'text-green-400'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} SEK
                </td>
                <td className="px-4 py-3"><Badge text={tx.status} color={tx.status === 'paid' ? '#34c759' : '#e8202f'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminTaxReports() {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-white text-3xl uppercase">Tax Reports & Guidance</h2>
      <div className="card p-5 border-[var(--accent)]/30">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
          <div>
            <div className="text-white text-sm font-semibold mb-1">Swedish Tax Compliance Note</div>
            <p className="text-[var(--text-secondary)] text-xs leading-relaxed">MMAFit Sweden is subject to Skatteverket reporting. Membership fees are subject to 25% momsregistrering. Instructor salaries require AG-deklaration. This dashboard automates VAT summaries and provides export templates for Skatteverket integration.</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: 'Q1 2026 VAT Report', period: 'Jan–Mar 2026', amount: '€4,820', status: 'Filed', statusColor: '#34c759' },
          { label: 'Q2 2026 VAT Report', period: 'Apr–Jun 2026', amount: '€3,100 (partial)', status: 'Pending', statusColor: '#f5a623' },
          { label: 'FY 2025 Annual', period: 'Full Year 2025', amount: '€17,240', status: 'Filed', statusColor: '#34c759' },
          { label: 'Employer Tax', period: 'May 2026', amount: '€2,340', status: 'Due Jun 12', statusColor: '#e8202f' },
        ].map((r) => (
          <div key={r.label} className="card p-5 flex items-center justify-between">
            <div>
              <div className="text-white text-sm font-medium">{r.label}</div>
              <div className="text-[var(--text-muted)] text-xs mt-0.5">{r.period}</div>
              <div className="font-display font-bold text-white text-xl mt-2">{r.amount}</div>
            </div>
            <Badge text={r.status} color={r.statusColor} />
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-[var(--accent)]" /> Staff Tax Guidance
        </h3>
        <div className="space-y-4 text-sm">
          {[
            { title: 'Instructor Contracts', body: 'All instructors must be registered as anställda or as F-skatt (sole traders). Ensure Skatteverket registration before first payment. F-skatt instructors invoice MMAFit directly; anställda receive salary with AGI deducted.' },
            { title: 'VAT on Memberships & Licenses', body: 'Membership fees (25 EUR/mo), gym licenses (150 EUR/month per category), and certification fees (380 EUR) are all subject to 25% Swedish moms. Register for VAT at Skatteverket if annual turnover exceeds 80,000 SEK.' },
            { title: 'AG-Deklaration', body: 'Monthly employer declaration required by the 12th of the following month. Includes PAYE, social security contributions, and pension deductions for all employed instructors.' },
            { title: 'Årsredovisning', body: 'Annual report deadline: 6 months after financial year end. For AB companies, this must be submitted to Bolagsverket. Ensure all franchise income is properly categorised.' },
          ].map((g) => (
            <div key={g.title} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
              <div className="text-white font-semibold mb-1">{g.title}</div>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-5 flex items-center gap-2 text-sm">
          <Download size={15} />Export Tax Report CSV
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// GENERIC PLACEHOLDER PANEL
// ══════════════════════════════════════════════════════════════════════════════
function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
      <Play size={32} className="text-[var(--text-muted)]" />
      <div className="font-display font-bold text-white text-xl uppercase">{label}</div>
      <p className="text-[var(--text-muted)] text-sm">This panel is ready — connect the backend API to populate live data.</p>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED SIDEBAR SHELL
// ══════════════════════════════════════════════════════════════════════════════
function DashboardShell({ nav, activePanel, setActivePanel, user, logout, title, children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const groups = nav[0]?.group !== undefined ? [...new Set(nav.map((n: any) => n.group))] as string[] : ['']

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col z-30 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto`}>
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center font-display font-black text-white text-sm">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">{user?.name || 'User'}</div>
            <div className="text-[var(--text-muted)] text-xs capitalize">{user?.role?.toLowerCase() || 'member'}</div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-4">
          {groups.map((group) => (
            <div key={group}>
              {group && (
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] px-3 mb-1">{group}</p>
              )}
              {nav.filter((n: any) => n.group === group).map(({ icon: Icon, label, id }: any) => (
                <button
                  key={id}
                  onClick={() => { setActivePanel(id); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activePanel === id
                      ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-medium'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
            <LogOut size={16} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 text-[var(--text-secondary)] hover:text-white">
              <Menu size={20} />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{title}</span>
          </div>
          <button className="relative p-2 text-[var(--text-secondary)] hover:text-white transition-colors">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent)] rounded-full" />
          </button>
        </header>

        {/* Panel */}
        <main className="flex-1 overflow-y-auto p-5 md:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT DASHBOARD — picks the right experience by role
// ══════════════════════════════════════════════════════════════════════════════
export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const [activePanel, setActivePanel] = useState('overview')
  const role = user?.role || 'MEMBER'

  // ── ADMIN ──────────────────────────────────────────────────────────────────
  if (role === 'admin' || role === 'super_admin') {
    const panel = (() => {
      switch (activePanel) {
        case 'overview':    return <AdminOverview />
        case 'staff':       return <AdminInstructors />
        case 'marketing':   return <AdminMarketing />
        case 'bookkeeping': return <AdminBookkeeping />
        case 'tax':         return <AdminTaxReports />
        default:            return <Placeholder label={ADMIN_NAV.find(n => n.id === activePanel)?.label || activePanel} />
      }
    })()
    return (
      <DashboardShell nav={ADMIN_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={ADMIN_NAV.find(n => n.id === activePanel)?.label || 'Admin'}>
        {panel}
      </DashboardShell>
    )
  }

  // ── STAFF ──────────────────────────────────────────────────────────────────
  if (role === 'staff') {
    const panel = (() => {
      switch (activePanel) {
        case 'overview': return <StaffOverview />
        default:         return <Placeholder label={STAFF_NAV.find(n => n.id === activePanel)?.label || activePanel} />
      }
    })()
    return (
      <DashboardShell nav={STAFF_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={STAFF_NAV.find(n => n.id === activePanel)?.label || 'Staff'}>
        {panel}
      </DashboardShell>
    )
  }

  // ── TRAINER / INSTRUCTOR ───────────────────────────────────────────────────
  if (role === 'trainer') {
    const panel = (() => {
      switch (activePanel) {
        case 'overview':      return <TrainerOverview user={user} />
        case 'resources':     return <TrainerResources />
        case 'certification': return <TrainerCertification />
        case 'earnings':      return <TrainerEarnings />
        default:              return <Placeholder label={TRAINER_NAV.find(n => n.id === activePanel)?.label || activePanel} />
      }
    })()
    return (
      <DashboardShell nav={TRAINER_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={TRAINER_NAV.find(n => n.id === activePanel)?.label || 'Instructor'}>
        {panel}
      </DashboardShell>
    )
  }

  // ── MEMBER (default) ───────────────────────────────────────────────────────
  const panel = (() => {
    switch (activePanel) {
      case 'overview':  return <MemberOverview user={user} />
      case 'classes':   return <MemberClasses />
      case 'progress':  return <MemberProgress />
      default:          return <Placeholder label={MEMBER_NAV.find(n => n.id === activePanel)?.label || activePanel} />
    }
  })()
  return (
    <DashboardShell nav={MEMBER_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={MEMBER_NAV.find(n => n.id === activePanel)?.label || 'My Dashboard'}>
      {panel}
    </DashboardShell>
  )
}
