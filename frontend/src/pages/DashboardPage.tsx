import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePWAInstall } from '../hooks/usePWAInstall'
import {
  LayoutDashboard, Users, Calendar, UserPlus, Package, Megaphone, Target,
  Instagram, ReceiptText, DollarSign, FileText, Shield, Settings, LogOut,
  Star, TrendingUp, ShoppingBag, Flame, Clock, CheckCircle, ChevronRight,
  Download, Bell, ArrowUpRight, ArrowDownRight, BookOpen, Award, Zap,
  Music, Video, FileDown, BarChart2, AlertCircle, Play, Menu, X,
  MapPin, Building2, Globe, Palette, Key, Activity, Layers, Plus, Edit2, Trash2, Cpu, ExternalLink,
  CreditCard, Sparkles, Lock, GraduationCap, PieChart, Brush, Type,
  Headphones, Receipt, TrendingDown, BadgeDollarSign, Landmark, MessageSquare,
  CheckSquare, Send, RefreshCw, Wallet, BarChart, User,
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
  { icon: User,            label: 'My Account',  id: 'account',   group: '', href: '/account' },
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
  { icon: LayoutDashboard,  label: 'Overview',       id: 'overview',      group: '' },
  { icon: Calendar,         label: 'My Classes',     id: 'myclasses',     group: '' },
  { icon: Users,            label: 'My Students',    id: 'students',      group: '' },
  { icon: Wallet,           label: 'Payments',       id: 'payments',      group: '' },
  { icon: Music,            label: 'Resources',      id: 'resources',     group: '' },
  { icon: Award,            label: 'Certification',  id: 'certification', group: '' },
  { icon: DollarSign,       label: 'Earnings',       id: 'earnings',      group: '' },
  { icon: MessageSquare,    label: 'Feedback Loop',  id: 'feedback',      group: '' },
  { icon: Settings,         label: 'Profile',        id: 'profile',       group: '' },
]

const STAFF_ROLES = ['Instructor', 'Nurse', 'Doctor', 'Assistant', 'Coach']

const STAFF_NAV = [
  { icon: LayoutDashboard, label: 'Overview',      id: 'overview',       group: '' },
  { icon: Calendar,        label: 'My Schedule',   id: 'schedule',       group: '' },
  { icon: Users,           label: 'My Students',   id: 'students',       group: '' },
  { icon: Music,           label: 'Resources',     id: 'resources',      group: '' },
  { icon: Award,           label: 'Certification', id: 'certification',  group: '' },
  { icon: DollarSign,      label: 'Compensation',  id: 'compensation',   group: '' },
  { icon: Settings,        label: 'Profile',       id: 'profile',        group: '' },
]

function TrainerOverview({ user }: { user: any }) {
  const myClasses = Object.values(CLASS_SCHEDULE).flat().filter((c: any) =>
    c.trainerName.toLowerCase().includes((user?.name || '').split(' ')[0]?.toLowerCase() || 'diana')
  ).slice(0, 5)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Instructor Dashboard</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Welcome, {user?.name || 'Instructor'} — {user?.staffRole || 'MMAFit certified instructor'}</p>
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
        {user?.role !== 'staff' && (
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
        )}
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

function TrainerResources({ user }: { user?: any }) {
  const months = ['May 2026 — Current', 'Apr 2026', 'Mar 2026', 'Feb 2026']
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Instructor Resources</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          {user?.role === 'staff'
            ? 'Monthly choreography, original music, and training materials — included in your staff benefits'
            : 'Monthly choreography, original music, and training materials — included in your 25 EUR/mo membership'}
        </p>
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

function TrainerCertification({ user }: { user?: any }) {
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
        <p className="text-[var(--text-secondary)] text-sm">
          {user?.role === 'staff'
            ? <>Participants pay <strong className="text-white">10+ EUR per class</strong> — aligned with Zumba and Les Mills pricing in Sweden. As an MMAFit staff member, your certification and monthly resources are fully covered.</>
            : <>Participants pay <strong className="text-white">10+ EUR per class</strong> — aligned with Zumba and Les Mills pricing in Sweden. Your <strong className="text-white">25 EUR/month membership</strong> gives you access to everything needed to run full classes.</>}
        </p>
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
// TRAINER — CLASS MANAGEMENT (set up classes, charge students)
// ══════════════════════════════════════════════════════════════════════════════
function TrainerMyClasses() {
  const [classes, setClasses] = useState([
    { id: 'c1', name: 'MMAFit Punch – Morning',  day: 'Monday',    time: '07:00', capacity: 20, enrolled: 14, price: 10, status: 'Published' },
    { id: 'c2', name: 'MMAFit Groove – Evening', day: 'Wednesday', time: '18:30', capacity: 20, enrolled: 17, price: 10, status: 'Published' },
    { id: 'c3', name: 'MMAFit Hit – Weekend',    day: 'Saturday',  time: '10:00', capacity: 25, enrolled: 8,  price: 12, status: 'Draft' },
  ])
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: '', day: 'Monday', time: '09:00', capacity: 20, price: 10 })

  const publish = (id: string) =>
    setClasses(prev => prev.map(c => c.id === id ? { ...c, status: 'Published' } : c))

  const submit = () => {
    setClasses(prev => [...prev, { ...form, id: `c${Date.now()}`, enrolled: 0, status: 'Draft' }])
    setShowNew(false)
    setForm({ name: '', day: 'Monday', time: '09:00', capacity: 20, price: 10 })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-black text-white text-3xl uppercase">My Classes</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Create and manage your class schedule. Students book and pay directly.</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={15} /> New Class
        </button>
      </div>

      {showNew && (
        <div className="card p-6 border-[var(--accent)]/30">
          <h3 className="font-display font-bold text-white uppercase mb-4">Create New Class</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Class Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)]"
                placeholder="e.g. MMAFit Punch – Morning" />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Day</label>
              <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none">
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Time</label>
              <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)]" />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Capacity</label>
              <input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: +e.target.value }))}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)]" />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Price per Student (EUR)</label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)]" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={submit} className="btn-primary text-sm px-6">Create Class</button>
            <button onClick={() => setShowNew(false)} className="btn-secondary text-sm px-6">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {classes.map(c => (
          <div key={c.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">{c.name}</span>
                  <Badge text={c.status} color={c.status === 'Published' ? '#34c759' : '#f5a623'} />
                </div>
                <div className="text-[var(--text-muted)] text-xs">{c.day} · {c.time} · Max {c.capacity} students · {c.price} EUR/person</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-white font-bold text-sm">{c.enrolled}/{c.capacity}</div>
                  <div className="text-[var(--text-muted)] text-[10px]">enrolled</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-sm">€{c.enrolled * c.price}</div>
                  <div className="text-[var(--text-muted)] text-[10px]">revenue</div>
                </div>
                {c.status === 'Draft' && (
                  <button onClick={() => publish(c.id)} className="btn-primary text-xs px-3 py-1.5">Publish</button>
                )}
              </div>
            </div>
            <div className="mt-3 bg-[var(--bg-primary)] rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-[var(--accent)]" style={{ width: `${(c.enrolled / c.capacity) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5 border-[var(--accent)]/20">
        <div className="flex items-start gap-3">
          <Wallet size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Students pay directly through Stripe when booking your class. MMAFit deducts the 10 EUR/class platform participation fee. Your net earnings are paid out every 2 weeks to your registered bank account.
          </p>
        </div>
      </div>
    </div>
  )
}

function TrainerPayments() {
  const transactions = [
    { date: 'May 7', student: 'Emma S.', class: 'MMAFit Punch – Morning', amount: 10, net: 9.5, status: 'Settled' },
    { date: 'May 7', student: 'Johan B.', class: 'MMAFit Punch – Morning', amount: 10, net: 9.5, status: 'Settled' },
    { date: 'May 5', student: 'Amira H.', class: 'MMAFit Groove – Evening', amount: 10, net: 9.5, status: 'Pending' },
    { date: 'May 5', student: 'Lars N.', class: 'MMAFit Groove – Evening', amount: 10, net: 9.5, status: 'Pending' },
    { date: 'May 3', student: 'Sofia K.', class: 'MMAFit Hit – Weekend', amount: 12, net: 11.4, status: 'Settled' },
    { date: 'May 1', student: 'Erik T.', class: 'MMAFit Punch – Morning', amount: 10, net: 9.5, status: 'Settled' },
  ]

  const pending = transactions.filter(t => t.status === 'Pending').reduce((s, t) => s + t.net, 0)
  const settled = transactions.filter(t => t.status === 'Settled').reduce((s, t) => s + t.net, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Payments</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Stripe-powered student payments. Settled every 2 weeks.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Pending Payout" value={`€${pending.toFixed(2)}`} icon={Clock} color="#f5a623" />
        <KPI label="Settled (May)" value={`€${settled.toFixed(2)}`} delta="+€22" positive icon={CheckCircle} color="#34c759" />
        <KPI label="Membership Fee" value="€25/mo" icon={CreditCard} color="#e8202f" />
        <KPI label="Platform Fee" value="0.50 EUR" icon={Receipt} color="#9b59b6" />
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="font-display font-bold text-white uppercase">Transaction History</h3>
          <button className="flex items-center gap-2 text-xs text-[var(--accent)] font-medium"><Download size={13} /> Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-primary)]">
                {['Date','Student','Class','Amount','Net (after fee)','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-card)] transition-colors">
                  <td className="px-4 py-3 text-[var(--text-muted)]">{t.date}</td>
                  <td className="px-4 py-3 text-white font-medium">{t.student}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{t.class}</td>
                  <td className="px-4 py-3 text-white">€{t.amount}</td>
                  <td className="px-4 py-3 text-green-400 font-medium">€{t.net}</td>
                  <td className="px-4 py-3"><Badge text={t.status} color={t.status === 'Settled' ? '#34c759' : '#f5a623'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-display font-bold text-white uppercase mb-3">Next Payout</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[var(--text-muted)] text-xs mb-1">Estimated</div>
            <div className="font-display font-black text-white text-2xl">€{(pending + 42.5).toFixed(2)}</div>
            <div className="text-[var(--text-muted)] text-xs mt-1">Scheduled: May 15 · Swedbank ••••4211</div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[var(--accent)]/30 flex items-center justify-center" style={{ background: 'conic-gradient(var(--accent) 72%, var(--bg-primary) 0)' }}>
            <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] flex items-center justify-center">
              <DollarSign size={16} className="text-[var(--accent)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrainerFeedback() {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const fromStudents = [
    { student: 'Emma S.', class: 'MMAFit Punch', date: 'May 6', rating: 5, text: 'Amazing energy! The new combination was so fun to learn.' },
    { student: 'Johan B.', class: 'MMAFit Groove', date: 'May 5', rating: 5, text: 'Best class this month. Music selection was perfect.' },
    { student: 'Amira H.', class: 'MMAFit Punch', date: 'May 4', rating: 4, text: 'Great workout but wish we had more time for cool-down.' },
    { student: 'Lars N.', class: 'MMAFit Hit', date: 'May 3', rating: 5, text: 'Totally pushed my limits. Loved the new choreography.' },
  ]
  const fromAdmin = [
    { from: 'MMAFit HQ', date: 'May 5', subject: 'May choreography update released', text: 'New Punch combo added to the resource library. Please review before May 12 classes.' },
    { from: 'MMAFit HQ', date: 'Apr 28', subject: 'Attendance milestone — 1,000 classes!', text: 'Your cumulative class count hit 1,000 this week. Thank you for your dedication.' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Feedback Loop</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Student reviews, messages from MMAFit HQ, and your input to improve the movement.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <KPI label="Avg Rating" value="4.9 / 5" icon={Star} color="#f5a623" />
        <KPI label="Student Reviews" value="84" delta="+12" positive icon={MessageSquare} color="#9b59b6" />
        <KPI label="Classes Rated" value="68%" icon={CheckSquare} color="#34c759" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">Student Reviews</h3>
          <div className="space-y-4">
            {fromStudents.map((r, i) => (
              <div key={i} className="pb-4 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{r.student}</span>
                  <span className="text-[var(--text-muted)] text-xs">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-1">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={10} className="text-[var(--gold)] fill-current" />)}</div>
                <div className="text-[var(--text-muted)] text-xs">{r.class}</div>
                <p className="text-[var(--text-secondary)] text-xs mt-1 italic">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="font-display font-bold text-white uppercase mb-4">From MMAFit HQ</h3>
            <div className="space-y-4">
              {fromAdmin.map((m, i) => (
                <div key={i} className="pb-4 border-b border-[var(--border)] last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center"><span className="text-[10px] font-black text-white">M</span></div>
                    <span className="text-white text-xs font-semibold">{m.subject}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs mt-1">{m.text}</p>
                  <span className="text-[var(--text-muted)] text-[10px] mt-1 block">{m.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-display font-bold text-white uppercase mb-3">Send to MMAFit HQ</h3>
            <p className="text-[var(--text-secondary)] text-xs mb-3">Share ideas, report issues, suggest new choreography, or give platform feedback.</p>
            {sent ? (
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium py-2">
                <CheckCircle size={16} /> Sent! MMAFit HQ will respond within 24h.
              </div>
            ) : (
              <>
                <textarea
                  value={message} onChange={e => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[var(--accent)] mb-3"
                  placeholder="Your feedback, ideas, or questions…"
                />
                <button onClick={() => { if (message.trim()) setSent(true) }} className="btn-primary flex items-center gap-2 text-sm">
                  <Send size={14} /> Send Feedback
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// STAFF COMPENSATION — salary, payouts, tax, insurance
// ══════════════════════════════════════════════════════════════════════════════
function StaffCompensation({ user }: { user: any }) {
  const payouts = [
    { month: 'May 2026', gross: 28000, tax: 8960, net: 19040, status: 'Upcoming' },
    { month: 'Apr 2026', gross: 28000, tax: 8960, net: 19040, status: 'Paid' },
    { month: 'Mar 2026', gross: 27500, tax: 8800, net: 18700, status: 'Paid' },
    { month: 'Feb 2026', gross: 27500, tax: 8800, net: 18700, status: 'Paid' },
    { month: 'Jan 2026', gross: 26000, tax: 8320, net: 17680, status: 'Paid' },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Compensation</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Salary, payouts, tax deductions, and insurance — managed by MMAFit admin</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Monthly Gross" value="28,000 kr" delta="+500 kr" positive icon={DollarSign} color="#34c759" />
        <KPI label="Net Payout" value="19,040 kr" icon={DollarSign} color="#9b59b6" />
        <KPI label="Tax Rate (est.)" value="32%" icon={FileText} color="#f5a623" />
        <KPI label="YTD Paid Out" value="93,120 kr" icon={TrendingUp} color="#e8202f" />
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">May 2026 — Salary Breakdown</h3>
        <div className="space-y-1">
          <div className="flex justify-between text-sm py-2.5 border-b border-[var(--border)]">
            <span className="text-[var(--text-secondary)]">Base salary</span>
            <span className="text-white font-medium">28,000 SEK</span>
          </div>
          <div className="flex justify-between text-sm py-2.5 border-b border-[var(--border)]">
            <span className="text-[var(--text-secondary)]">Income tax (kommunalskatt ~32%)</span>
            <span className="text-[var(--accent)]">− 8,960 SEK</span>
          </div>
          <div className="flex justify-between text-sm py-2.5 border-b border-[var(--border)]">
            <span className="text-[var(--text-secondary)]">Pension deduction (tjänstepension)</span>
            <span className="text-[var(--accent)]">− 840 SEK</span>
          </div>
          <div className="flex justify-between text-sm py-3 px-3 bg-[var(--bg-primary)] rounded-lg mt-1">
            <span className="text-white font-bold">Net payout (25th of month)</span>
            <span className="text-green-400 font-bold text-lg">18,200 SEK</span>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-1">Employer Contributions</h3>
        <p className="text-[var(--text-muted)] text-xs mb-4">Paid by MMAFit on your behalf — not deducted from your salary</p>
        <div className="space-y-1">
          <div className="flex justify-between text-sm py-2.5 border-b border-[var(--border)]">
            <span className="text-[var(--text-secondary)]">Social security (arbetsgivaravgift 31.42%)</span>
            <span className="text-white">8,798 SEK</span>
          </div>
          <div className="flex justify-between text-sm py-2.5 border-b border-[var(--border)]">
            <span className="text-[var(--text-secondary)]">Pension contribution (ITP/SAF-LO)</span>
            <span className="text-white">1,680 SEK</span>
          </div>
          <div className="flex justify-between text-sm py-2.5">
            <span className="text-white font-semibold">Total employer cost for you</span>
            <span className="text-white font-semibold">38,478 SEK</span>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Insurance & Benefits</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'AFA Sjukförsäkring', desc: 'Salary protection during sick leave (AGS)', color: '#34c759' },
            { name: 'AFA Trygghetsförsäkring', desc: 'Work injury insurance (TFA)', color: '#34c759' },
            { name: 'AMF Pension', desc: 'Supplementary occupational pension', color: '#34c759' },
            { name: 'TGL — Group Life', desc: 'Collective life insurance (Tjänstegrupplivförsäkring)', color: '#34c759' },
          ].map(ins => (
            <div key={ins.name} className="flex items-start justify-between gap-3 p-3 bg-[var(--bg-primary)] rounded-lg">
              <div>
                <div className="text-white text-sm font-medium">{ins.name}</div>
                <div className="text-[var(--text-muted)] text-xs mt-0.5">{ins.desc}</div>
              </div>
              <Badge text="Active" color={ins.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="font-display font-bold text-white uppercase">Payout History</h3>
          <button className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-white transition-colors">
            <Download size={13} /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
              <tr>
                {['Period', 'Gross', 'Tax', 'Net Paid', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.month} className="border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{p.month}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{p.gross.toLocaleString()} SEK</td>
                  <td className="px-4 py-3 text-[var(--accent)]">− {p.tax.toLocaleString()} SEK</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">{p.net.toLocaleString()} SEK</td>
                  <td className="px-4 py-3"><Badge text={p.status} color={p.status === 'Paid' ? '#34c759' : '#f5a623'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5 flex items-start gap-3">
        <Shield size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Salary is processed by the 25th of each month via Swedbank. Tax is deducted at source under PAYE (AGI). For compensation questions, contact admin at <span className="text-white">info@mmafit.se</span>.</p>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const ADMIN_NAV = [
  { icon: LayoutDashboard, label: 'Overview',       id: 'overview',    group: 'Main' },
  { icon: Users,           label: 'Members',        id: 'members',     group: 'Main' },
  { icon: Calendar,        label: 'Classes',        id: 'classes',     group: 'Main' },
  { icon: Building2,       label: 'Spaces',         id: 'spaces',      group: 'Main' },
  { icon: UserPlus,        label: 'Instructors',    id: 'staff',       group: 'Main' },
  { icon: GraduationCap,   label: 'Academy',        id: 'academy',     group: 'Main' },
  { icon: Package,         label: 'Shop',           id: 'shop',        group: 'Main' },
  { icon: Megaphone,       label: 'Marketing',      id: 'marketing',   group: 'Business' },
  { icon: Target,          label: 'Events',         id: 'events',      group: 'Business' },
  { icon: Instagram,       label: 'Social Media',   id: 'social',      group: 'Business' },
  { icon: PieChart,        label: 'Financial 360',  id: 'financial',   group: 'Finance' },
  { icon: ReceiptText,     label: 'Bookkeeping',    id: 'bookkeeping', group: 'Finance' },
  { icon: DollarSign,      label: 'Revenue',        id: 'revenue',     group: 'Finance' },
  { icon: FileText,        label: 'Tax Reports',    id: 'tax',         group: 'Finance' },
  { icon: Shield,          label: 'Permissions',    id: 'permissions', group: 'Admin' },
  { icon: Settings,        label: 'Settings',       id: 'settings',    group: 'Admin' },
  { icon: CreditCard,      label: 'Billing',        id: 'billing',     group: 'Admin' },
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
        <h2 className="font-display font-black text-white text-3xl uppercase">MMAFit Management</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Operations Overview · {new Date().toLocaleDateString('en-SE', { month: 'long', year: 'numeric' })}</p>
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
// ADMIN — ACADEMY
// ══════════════════════════════════════════════════════════════════════════════
function AdminAcademy() {
  const courses = [
    { name: 'MMAFit Basic Certification', tuition: 380, enrolled: 24, graduates: 18, duration: '2-day intensive', nextDate: 'May 18, 2026', color: '#e8202f' },
    { name: 'MMAFit Advanced Certification', tuition: 580, enrolled: 12, graduates: 8, duration: '3-day intensive', nextDate: 'Jun 8, 2026', color: '#9b59b6' },
    { name: 'Kids Specialization Track', tuition: 280, enrolled: 15, graduates: 11, duration: '1-day workshop', nextDate: 'May 25, 2026', color: '#34c759' },
    { name: 'Power Track Specialization', tuition: 280, enrolled: 10, graduates: 7, duration: '1-day workshop', nextDate: 'Jun 1, 2026', color: '#ff6b35' },
    { name: 'Instructor Trainer License', tuition: 980, enrolled: 5, graduates: 2, duration: '5-day master course', nextDate: 'Jul 1, 2026', color: '#f5a623' },
  ]
  const totalRevenue = courses.reduce((s, c) => s + c.tuition * c.graduates, 0)
  const enrolled = courses.reduce((s, c) => s + c.enrolled, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap size={18} className="text-[var(--accent)]" />
            <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest">MMAFit Academy</span>
          </div>
          <h2 className="font-display font-black text-white text-3xl uppercase">Academy</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Certify new instructors. Build the MMAFit movement worldwide.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={15} /> Schedule Course</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Enrolled" value={enrolled.toString()} delta="+7" positive icon={Users} color="#e8202f" />
        <KPI label="Total Graduates" value={courses.reduce((s, c) => s + c.graduates, 0).toString()} delta="+12" positive icon={GraduationCap} color="#9b59b6" />
        <KPI label="Academy Revenue (YTD)" value={`€${totalRevenue.toLocaleString()}`} delta="+28%" positive icon={DollarSign} color="#34c759" />
        <KPI label="Graduation Rate" value="76%" delta="+4%" positive icon={TrendingUp} color="#f5a623" />
      </div>

      <div className="space-y-4">
        {courses.map(c => (
          <div key={c.name} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                  <GraduationCap size={18} style={{ color: c.color }} />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">{c.name}</div>
                  <div className="text-[var(--text-muted)] text-xs">{c.duration} · Next: {c.nextDate}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="text-[var(--text-secondary)]">{c.enrolled} enrolled</span>
                    <span className="text-green-400">{c.graduates} graduated</span>
                    <span className="text-white font-semibold">€{c.tuition} tuition</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-white font-bold text-lg">€{(c.tuition * c.graduates).toLocaleString()}</div>
                <div className="text-[var(--text-muted)] text-xs">revenue</div>
                <div className="flex gap-2 mt-2">
                  <button className="btn-secondary text-xs px-3 py-1.5">Manage</button>
                  <button className="btn-primary text-xs px-3 py-1.5">Enroll</button>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-[var(--bg-primary)] rounded-full h-1.5">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${(c.graduates / c.enrolled) * 100}%`, background: c.color }} />
            </div>
            <div className="text-[10px] text-[var(--text-muted)] mt-1">{Math.round((c.graduates / c.enrolled) * 100)}% graduation rate</div>
          </div>
        ))}
      </div>

      <div className="card p-6 bg-gradient-to-br from-[var(--accent)]/8 to-transparent border-[var(--accent)]/20">
        <h3 className="font-display font-bold text-white uppercase mb-3">Academy Mission</h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">MMAFit Academy trains and certifies instructors to carry the movement forward — in Sweden and globally. Each certified instructor is a licensed ambassador of the MMAFit method, ensuring quality and consistency wherever they teach.</p>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {[
            { label: 'Active Certified Instructors', value: '94' },
            { label: 'Countries', value: '3' },
            { label: 'Student Lives Impacted', value: '2,418+' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display font-black text-white text-2xl">{s.value}</div>
              <div className="text-[var(--text-muted)] text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN — FINANCIAL 360
// ══════════════════════════════════════════════════════════════════════════════
function AdminFinancial360() {
  const months = ['Dec','Jan','Feb','Mar','Apr','May']
  const revenueData = [18200, 19400, 22100, 24800, 26300, 28490]
  const costData    = [14200, 14800, 15100, 15600, 15900, 16300]
  const netData     = revenueData.map((r, i) => r - costData[i])
  const max = 32000

  const revenueSources = [
    { label: 'Member Subscriptions',       amount: 18200, pct: 64, color: '#e8202f' },
    { label: 'Instructor Certifications',  amount: 6840,  pct: 24, color: '#9b59b6' },  // 18 × 380
    { label: 'Instructor Monthly Fees',    amount: 2350,  pct: 8,  color: '#f5a623' },  // 94 × 25
    { label: 'Gym Licenses',               amount: 1800,  pct: 6,  color: '#34c759' },  // 12 × 150
    { label: 'Participant Class Fees',     amount: 3400,  pct: 12, color: '#ff6b35' },
    { label: 'Academy Tuition',            amount: 5800,  pct: 20, color: '#4ecdc4' },
    { label: 'Shop Sales',                 amount: 4100,  pct: 14, color: '#a8e6cf' },
  ]
  const totalRevenue = revenueSources.reduce((s, r) => s + r.amount, 0)

  const fixedCosts = [
    { label: 'Salaries (8 staff × ~28 kSEK)',  amount: 22400, note: 'SEK converted, incl. employer tax' },
    { label: 'Venue / Rent (Stockholm)',        amount: 8500,  note: 'Monthly lease' },
    { label: 'Equipment & Maintenance',        amount: 1200,  note: 'Repairs, replacement gear' },
    { label: 'LUVLAB Platform',                amount: 299,   note: '€299/mo SaaS' },
    { label: 'Marketing & Advertising',        amount: 800,   note: 'Meta, Google, events' },
    { label: 'Insurance & Legal',              amount: 600,   note: 'AFA, liability, legal counsel' },
    { label: 'Utilities & Tech',               amount: 350,   note: 'Power, internet, subscriptions' },
  ]
  const totalCosts = fixedCosts.reduce((s, c) => s + c.amount, 0)
  const netIncome  = totalRevenue - totalCosts

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Financial 360</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Full revenue, costs, and net income for MMAFit Sweden · {new Date().toLocaleDateString('en-SE', { month: 'long', year: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Revenue (mo)" value={`€${totalRevenue.toLocaleString()}`} delta="+€2.1k" positive icon={TrendingUp} color="#34c759" />
        <KPI label="Total Costs (mo)"   value={`€${totalCosts.toLocaleString()}`}   delta="+€400"  positive={false} icon={TrendingDown} color="#e8202f" />
        <KPI label="Net Income (mo)"    value={`€${netIncome.toLocaleString()}`}     delta="+11%"   positive icon={DollarSign} color="#f5a623" />
        <KPI label="Net Margin"         value={`${Math.round((netIncome / totalRevenue) * 100)}%`} delta="+2%" positive icon={PieChart} color="#9b59b6" />
      </div>

      {/* Revenue vs Costs chart */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Revenue vs Costs — Last 6 Months</h3>
        <div className="flex items-end gap-4 h-40 mb-4">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-0.5 justify-center" style={{ height: '120px' }}>
                <div className="flex-1 rounded-t" style={{ height: `${(revenueData[i] / max) * 100}%`, background: i === months.length - 1 ? '#34c759' : 'rgba(52,199,89,0.4)' }} />
                <div className="flex-1 rounded-t" style={{ height: `${(costData[i] / max) * 100}%`, background: i === months.length - 1 ? '#e8202f' : 'rgba(232,32,47,0.35)' }} />
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">{m}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-5 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500/60 inline-block" /> Revenue</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500/60 inline-block" /> Costs</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue breakdown */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">Revenue Breakdown</h3>
          <div className="space-y-3">
            {revenueSources.map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">{r.label}</span>
                  <span className="text-white font-medium">€{r.amount.toLocaleString()}</span>
                </div>
                <div className="bg-[var(--bg-primary)] rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${(r.amount / totalRevenue) * 100}%`, background: r.color }} />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-[var(--border)] flex justify-between text-sm font-bold">
              <span className="text-[var(--text-secondary)]">Total Revenue</span>
              <span className="text-green-400">€{totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Costs breakdown */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">Cost Breakdown</h3>
          <div className="space-y-2">
            {fixedCosts.map(c => (
              <div key={c.label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <div>
                  <div className="text-[var(--text-secondary)] text-xs">{c.label}</div>
                  <div className="text-[var(--text-muted)] text-[10px]">{c.note}</div>
                </div>
                <span className="text-white text-sm font-medium shrink-0">€{c.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-2 flex justify-between text-sm font-bold">
              <span className="text-[var(--text-secondary)]">Total Costs</span>
              <span className="text-[var(--accent)]">€{totalCosts.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-[var(--accent)]/8 border border-[var(--accent)]/20">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)] text-sm font-medium">Net Income</span>
              <span className="text-green-400 font-display font-black text-xl">€{netIncome.toLocaleString()}</span>
            </div>
            <div className="text-[var(--text-muted)] text-xs mt-0.5">{Math.round((netIncome / totalRevenue) * 100)}% net margin</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN — BILLING (LUVLAB.io platform subscription)
// ══════════════════════════════════════════════════════════════════════════════
function AdminBilling() {
  const PLATFORM_PRICE = 299
  const billingHistory = [
    { month: 'May 2026',  amount: 299, status: 'Upcoming', due: '2026-06-01' },
    { month: 'Apr 2026',  amount: 299, status: 'Paid',     due: '2026-05-01' },
    { month: 'Mar 2026',  amount: 0,   status: 'Free',     due: '2026-04-01' },
  ]

  const features = [
    'Multi-role dashboard — Member, Instructor, Staff, MMAFit Admin, LUVLAB Super Admin',
    'Class booking & schedule management',
    'Spaces / venue management (owned, rented, partner)',
    'Staff HR — salary, payouts, tax, insurance (Swedish compliance)',
    'Instructor certification & resources portal',
    'Member CRM — profiles, progress, retention',
    'Shop & e-commerce module',
    'Events & Ticketmaster integration',
    'Marketing tools — email, social, promo codes',
    'Bookkeeping, revenue analytics & tax reports (Skatteverket-ready)',
    'Franchise management & gym licensing',
    'White-label branding — fully MMAFit branded',
    'Live CSS theming (LUVLAB super admin)',
    'API integrations — Stripe, Supabase, SendGrid, Instagram',
    'Hosted on Vercel Edge — 99.97% uptime',
    'Monthly updates & feature development',
  ]

  const competitors = [
    { name: 'Mindbody Pro',     price: '€260/mo', note: 'Generic, no white-label, no franchise tools' },
    { name: 'Glofox Plus',      price: '€160/mo', note: 'Booking & app only, no HR, no finance' },
    { name: 'WellnessLiving',   price: '€185/mo', note: 'US-focused, no Swedish tax compliance' },
    { name: 'Custom dev agency',price: '€3,000+/mo', note: 'Retainer for ongoing custom development' },
    { name: 'LUVLAB MMAFit 360',price: `€${PLATFORM_PRICE}/mo`, note: 'Fully tailored, maintained, continuously evolved', highlight: true },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Platform Billing</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Your LUVLAB.io subscription — MMAFit 360 Platform</p>
      </div>

      {/* Active plan card */}
      <div className="card p-6 border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center shrink-0">
              <div className="w-7 h-7 bg-[var(--accent)] rounded flex items-center justify-center">
                <span className="font-display font-black text-white text-xs leading-none">L</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">LUVLAB.io</div>
              <div className="font-display font-black text-white text-2xl">MMAFit 360 Platform</div>
              <div className="text-[var(--text-secondary)] text-sm mt-0.5">All-in-one tailored business platform for MMAFit Sweden</div>
            </div>
          </div>
          <Badge text="Active" color="#34c759" />
        </div>

        <div className="grid sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--border)]">
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">Monthly price</div>
            <div className="font-display font-black text-white text-2xl">€{PLATFORM_PRICE}</div>
            <div className="text-xs text-[var(--text-secondary)]">per month, ex. VAT</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">First month</div>
            <div className="font-display font-black text-[var(--accent)] text-2xl">FREE</div>
            <div className="text-xs text-[var(--text-secondary)]">Onboarding & refinement</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">Next invoice</div>
            <div className="font-display font-black text-white text-2xl">Jun 1</div>
            <div className="text-xs text-[var(--text-secondary)]">2026 · €{PLATFORM_PRICE} EUR</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-muted)] mb-1">Payment</div>
            <div className="flex items-center gap-2 mt-1">
              <CreditCard size={18} className="text-[var(--accent)]" />
              <div>
                <div className="text-white text-sm font-medium">Visa ····4242</div>
                <div className="text-xs text-[var(--text-secondary)]">via Stripe</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First month free banner */}
      <div className="card p-5 border border-[var(--gold)]/30 bg-gradient-to-r from-[var(--gold)]/8 to-transparent flex items-start gap-3">
        <Sparkles size={18} className="text-[var(--gold)] shrink-0 mt-0.5" />
        <div>
          <div className="text-white text-sm font-semibold mb-1">Month 1 — Free Onboarding & Update Period</div>
          <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
            Your first month is complimentary. During this period the LUVLAB.io team works directly with you to
            refine the platform, adjust any flows, add requested features, and ensure everything is tailored
            exactly to MMAFit's operations before billing begins.
          </p>
        </div>
      </div>

      {/* Billing history */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="font-display font-bold text-white uppercase">Billing History</h3>
          <button className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-white transition-colors">
            <Download size={13} /> Download invoices
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
            <tr>
              {['Period', 'Amount', 'Due date', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((b) => (
              <tr key={b.month} className="border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)] transition-colors">
                <td className="px-5 py-3 text-white font-medium">{b.month}</td>
                <td className="px-5 py-3 text-white">
                  {b.amount === 0 ? <span className="text-[var(--gold)] font-semibold">FREE</span> : `€${b.amount}`}
                </td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">{b.due}</td>
                <td className="px-5 py-3">
                  <Badge
                    text={b.status}
                    color={b.status === 'Paid' ? '#34c759' : b.status === 'Free' ? '#f5a623' : '#9b59b6'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Why LUVLAB — competitive context */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-1">Why €{PLATFORM_PRICE}/mo is Competitive</h3>
        <p className="text-[var(--text-muted)] text-xs mb-4">MMAFit 360 vs alternatives on the market</p>
        <div className="space-y-2">
          {competitors.map((c) => (
            <div key={c.name}
              className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg ${c.highlight ? 'bg-[var(--accent)]/8 border border-[var(--accent)]/25' : 'bg-[var(--bg-primary)]'}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {c.highlight
                  ? <div className="w-5 h-5 bg-[var(--accent)] rounded flex items-center justify-center shrink-0"><span className="font-black text-white text-[9px]">L</span></div>
                  : <Lock size={14} className="text-[var(--text-muted)] shrink-0" />
                }
                <div className="min-w-0">
                  <div className={`text-sm font-semibold ${c.highlight ? 'text-[var(--accent)]' : 'text-white'}`}>{c.name}</div>
                  <div className="text-[var(--text-muted)] text-xs truncate">{c.note}</div>
                </div>
              </div>
              <div className={`text-sm font-bold shrink-0 ${c.highlight ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>{c.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">What's Included at €{PLATFORM_PRICE}/mo</h3>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <CheckCircle size={13} className="text-[var(--accent)] shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Receipts */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="font-display font-bold text-white uppercase flex items-center gap-2"><Receipt size={15} className="text-[var(--accent)]" /> Receipts</h3>
          <button className="flex items-center gap-1.5 text-xs text-[var(--accent)] font-medium"><Download size={13} /> Download All PDFs</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
            <tr>
              {['Receipt #', 'Period', 'Amount', 'Date Charged', 'Status', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'LUV-2026-004', period: 'May 2026',  amount: 299, date: '—',          status: 'Upcoming' },
              { id: 'LUV-2026-003', period: 'Apr 2026',  amount: 299, date: 'Apr 1, 2026', status: 'Paid' },
              { id: 'LUV-2026-002', period: 'Mar 2026',  amount: 0,   date: 'Mar 1, 2026', status: 'Free' },
              { id: 'LUV-2026-001', period: 'Feb 2026',  amount: 0,   date: 'Feb 1, 2026', status: 'Free' },
            ].map(r => (
              <tr key={r.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-card)] transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-[var(--text-muted)]">{r.id}</td>
                <td className="px-5 py-3 text-white font-medium">{r.period}</td>
                <td className="px-5 py-3 text-white">{r.amount === 0 ? <span className="text-[var(--gold)]">FREE</span> : `€${r.amount}`}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">{r.date}</td>
                <td className="px-5 py-3"><Badge text={r.status} color={r.status === 'Paid' ? '#34c759' : r.status === 'Free' ? '#f5a623' : '#9b59b6'} /></td>
                <td className="px-5 py-3">
                  {r.status !== 'Upcoming' && (
                    <button className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><FileDown size={11} /> PDF</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Support */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase flex items-center gap-2 mb-4">
          <Headphones size={15} className="text-[var(--accent)]" /> Contact LUVLAB Support
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Email', value: 'info@luvlab.io', icon: Send },
            { label: 'Response time', value: '< 24 hours', icon: Clock },
            { label: 'Contract', value: 'MMAFit Pro', icon: FileText },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3 p-3 bg-[var(--bg-primary)] rounded-xl">
              <s.icon size={16} className="text-[var(--accent)] shrink-0" />
              <div>
                <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wide">{s.label}</div>
                <div className="text-white text-xs font-medium">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
          For billing disputes, feature requests, or technical issues — email <span className="text-white">info@luvlab.io</span> referencing your contract ID <span className="font-mono text-white">LUV-MMAFIT-001</span>. Payments processed securely via Stripe. Cancel any time with 30 days notice.
        </p>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN — SPACES
// ══════════════════════════════════════════════════════════════════════════════
const SPACE_TYPES = ['Owned', 'Rented', 'Partner Gym', 'Pop-up'] as const
type SpaceType = typeof SPACE_TYPES[number]

interface Space {
  id: string; name: string; type: SpaceType; address: string; city: string
  country: string; programs: string[]; capacity: number; monthlyCost: number
  currency: string; notes: string; status: 'Active' | 'Inactive'
}

const MOCK_SPACES: Space[] = [
  { id: '1', name: 'MMAFit Studio Stockholm', type: 'Owned', address: 'Sveavägen 44', city: 'Stockholm', country: 'Sweden', programs: ['Punch','Groove','Hit','Power','Kids'], capacity: 40, monthlyCost: 0, currency: 'EUR', notes: 'Main flagship location. Mirrors, bags, full AV rig.', status: 'Active' },
  { id: '2', name: 'FitZone Gothenburg', type: 'Partner Gym', address: 'Kungsportsavenyn 21', city: 'Gothenburg', country: 'Sweden', programs: ['Punch','Groove'], capacity: 25, monthlyCost: 150, currency: 'EUR', notes: 'Weekend classes only. Key handover with facility manager Björn.', status: 'Active' },
  { id: '3', name: 'Urban Gym Malmö', type: 'Rented', address: 'Stortorget 9', city: 'Malmö', country: 'Sweden', programs: ['Hit','Power'], capacity: 20, monthlyCost: 300, currency: 'EUR', notes: 'Rented Wed + Fri evenings 18:00–21:00.', status: 'Active' },
]

const EMPTY_SPACE: Space = { id: '', name: '', type: 'Rented', address: '', city: '', country: 'Sweden', programs: [], capacity: 20, monthlyCost: 0, currency: 'EUR', notes: '', status: 'Active' }

const TYPE_COLORS: Record<SpaceType, string> = { 'Owned': '#34c759', 'Rented': '#f5a623', 'Partner Gym': '#9b59b6', 'Pop-up': '#ff6b35' }

function AdminSpaces() {
  const [spaces, setSpaces] = useState<Space[]>(MOCK_SPACES)
  const [form, setForm] = useState<Space>({ ...EMPTY_SPACE })
  const [editing, setEditing] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const openAdd = () => { setForm({ ...EMPTY_SPACE }); setEditing(null); setShowForm(true) }
  const openEdit = (s: Space) => { setForm({ ...s }); setEditing(s.id); setShowForm(true) }
  const remove = (id: string) => setSpaces(s => s.filter(x => x.id !== id))
  const cancel = () => { setShowForm(false); setEditing(null); setForm({ ...EMPTY_SPACE }) }

  const save = () => {
    if (!form.name.trim()) return
    if (editing) {
      setSpaces(s => s.map(x => x.id === editing ? { ...form, id: editing } : x))
    } else {
      setSpaces(s => [...s, { ...form, id: Date.now().toString() }])
    }
    cancel()
  }

  const toggleProgram = (p: string) => {
    setForm(f => ({ ...f, programs: f.programs.includes(p) ? f.programs.filter(x => x !== p) : [...f.programs, p] }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-black text-white text-3xl uppercase">Spaces</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Training venues, partner gyms, and rented locations</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={15} /> Add Space
        </button>
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div className="card p-6 border border-[var(--accent)]/30">
          <h3 className="font-display font-bold text-white uppercase mb-5">{editing ? 'Edit Space' : 'New Space'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Space Name *</label>
              <input className="input-dark" placeholder="e.g. FitZone Stockholm" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Type</label>
              <select className="input-dark" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as SpaceType }))}>
                {SPACE_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Status</label>
              <select className="input-dark" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Space['status'] }))}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Address</label>
              <input className="input-dark" placeholder="Street address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">City</label>
              <input className="input-dark" placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Country</label>
              <input className="input-dark" placeholder="Country" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Capacity (people)</label>
              <input className="input-dark" type="number" min={1} value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: +e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Monthly Cost (EUR) — 0 if owned</label>
              <input className="input-dark" type="number" min={0} value={form.monthlyCost} onChange={e => setForm(f => ({ ...f, monthlyCost: +e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--text-secondary)] mb-2">Programs offered here</label>
              <div className="flex flex-wrap gap-2">
                {PROGRAMS.map(p => {
                  const active = form.programs.includes(p.slug)
                  return (
                    <button key={p.slug} type="button" onClick={() => toggleProgram(p.slug)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={{ background: active ? `${p.color}25` : 'var(--bg-primary)', color: active ? p.color : 'var(--text-muted)', border: `1px solid ${active ? p.color : 'var(--border)'}` }}>
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Notes</label>
              <textarea className="input-dark resize-none min-h-[72px]" placeholder="Access info, contact person, schedule notes…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="btn-primary text-sm px-6">{editing ? 'Save Changes' : 'Add Space'}</button>
            <button onClick={cancel} className="btn-secondary text-sm px-5">Cancel</button>
          </div>
        </div>
      )}

      {/* Spaces list */}
      {spaces.length === 0 && !showForm && (
        <div className="card p-10 text-center">
          <MapPin size={32} className="text-[var(--text-muted)] mx-auto mb-3" />
          <p className="text-[var(--text-secondary)] text-sm">No spaces added yet. Click <span className="text-white font-medium">Add Space</span> to get started.</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map(space => (
          <div key={space.id} className="card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${TYPE_COLORS[space.type]}15`, border: `1px solid ${TYPE_COLORS[space.type]}30` }}>
                  <Building2 size={16} style={{ color: TYPE_COLORS[space.type] }} />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold leading-tight">{space.name}</div>
                  <div className="text-[var(--text-muted)] text-xs mt-0.5">{space.city}, {space.country}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(space)} className="p-1.5 text-[var(--text-muted)] hover:text-white rounded transition-colors"><Edit2 size={13} /></button>
                <button onClick={() => remove(space.id)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] rounded transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge text={space.type} color={TYPE_COLORS[space.type]} />
              <Badge text={space.status} color={space.status === 'Active' ? '#34c759' : '#888'} />
              {space.monthlyCost > 0 && <Badge text={`€${space.monthlyCost}/mo`} color="#f5a623" />}
            </div>

            <div className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
              <MapPin size={11} className="shrink-0 mt-0.5 text-[var(--text-muted)]" />
              {space.address}, {space.city}
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Users size={11} /> {space.capacity} capacity
            </div>

            {space.programs.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {space.programs.map(slug => {
                  const p = PROGRAMS.find(x => x.slug === slug)
                  return p ? <Badge key={slug} text={p.name.replace('MMAFit ', '')} color={p.color} /> : null
                })}
              </div>
            )}

            {space.notes && (
              <p className="text-[var(--text-muted)] text-xs leading-relaxed border-t border-[var(--border)] pt-3">{space.notes}</p>
            )}
          </div>
        ))}
      </div>

      {/* Cost summary */}
      {spaces.length > 0 && (
        <div className="card p-5 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-[var(--text-secondary)]">
            <span className="text-white font-semibold">{spaces.filter(s => s.status === 'Active').length}</span> active spaces ·{' '}
            <span className="text-white font-semibold">{spaces.reduce((a, s) => a + s.capacity, 0)}</span> total capacity
          </div>
          <div className="text-sm">
            <span className="text-[var(--text-secondary)]">Monthly space costs: </span>
            <span className="text-[var(--accent)] font-bold">€{spaces.reduce((a, s) => a + s.monthlyCost, 0).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SUPER ADMIN — LUVLAB PLATFORM
// ══════════════════════════════════════════════════════════════════════════════
const SUPER_ADMIN_NAV = [
  { icon: Globe,          label: 'Platform',       id: 'platform',   group: 'LUVLAB' },
  { icon: Layers,         label: 'Tenants',        id: 'tenants',    group: 'LUVLAB' },
  { icon: Users,          label: 'All Users',      id: 'allusers',   group: 'LUVLAB' },
  { icon: CreditCard,     label: 'Paywall',        id: 'paywall',    group: 'Billing' },
  { icon: Receipt,        label: 'Receipts',       id: 'receipts',   group: 'Billing' },
  { icon: Brush,          label: 'CMS & Theming',  id: 'cms',        group: 'System' },
  { icon: Key,            label: 'API Keys',       id: 'apis',       group: 'System' },
  { icon: Activity,       label: 'System Health',  id: 'health',     group: 'System' },
  { icon: Shield,         label: 'Permissions',    id: 'perms',      group: 'System' },
  { icon: Headphones,     label: 'Support',        id: 'support',    group: 'System' },
  { icon: Settings,       label: 'Settings',       id: 'settings',   group: 'System' },
]

function SuperAdminPlatform() {
  const tenants = [
    { name: 'MMAFit Sweden', plan: 'Pro', members: 2418, revenue: 24800, status: 'Active', since: 'Jan 2024' },
    { name: 'FitForce Berlin', plan: 'Starter', members: 340, revenue: 3200, status: 'Active', since: 'Mar 2025' },
    { name: 'Iron House Oslo', plan: 'Pro', members: 890, revenue: 9100, status: 'Trial', since: 'Apr 2026' },
  ]
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center"><Cpu size={13} className="text-white" /></div>
          <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest">LUVLAB.io Super Admin</span>
        </div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Platform Overview</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Full-system access across all tenants, APIs, and settings</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Active Tenants" value="3" delta="+1" positive icon={Layers} color="#e8202f" />
        <KPI label="Total Users" value="3,648" delta="+18%" positive icon={Users} color="#9b59b6" />
        <KPI label="Platform MRR" value="€37.1k" delta="+9%" positive icon={DollarSign} color="#34c759" />
        <KPI label="API Uptime" value="99.97%" icon={Activity} color="#34c759" />
      </div>

      <div className="card p-6">
        <h3 className="font-display font-bold text-white uppercase mb-4">Tenants</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Organization','Plan','Members','MRR','Status','Since'].map(h => (
                  <th key={h} className="text-left px-4 py-2 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tenants.map(t => (
                <tr key={t.name} className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-card)] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{t.name}</td>
                  <td className="px-4 py-3"><Badge text={t.plan} color={t.plan === 'Pro' ? '#9b59b6' : '#f5a623'} /></td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{t.members.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white font-medium">€{t.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge text={t.status} color={t.status === 'Active' ? '#34c759' : '#f5a623'} /></td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{t.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Supabase (DB)', status: 'Healthy', latency: '12ms', icon: Cpu, color: '#34c759' },
          { label: 'Vercel Edge', status: 'Healthy', latency: '8ms', icon: Globe, color: '#34c759' },
          { label: 'Stripe Payments', status: 'Healthy', latency: '45ms', icon: DollarSign, color: '#34c759' },
        ].map(s => (
          <div key={s.label} className="card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-white text-sm font-medium">{s.label}</div>
              <div className="text-xs mt-0.5"><Badge text={s.status} color={s.color} /></div>
              <div className="text-[var(--text-muted)] text-xs mt-1">Latency: {s.latency}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SuperAdminCMS() {
  const [tab, setTab] = useState<'colors' | 'typography' | 'branding'>('colors')
  const [appName, setAppName] = useState('MMAFit')
  const [appTagline, setAppTagline] = useState('Unleash Your Inner Fighter')
  const [iconBg, setIconBg] = useState('#e8202f')
  const [iconLetter, setIconLetter] = useState('M')
  const [font, setFont] = useState('Barlow Condensed')
  const [bodyFont, setBodyFont] = useState('Inter')
  const [saved, setSaved] = useState(false)

  const [vars, setVars] = useState([
    { key: '--accent',        label: 'Accent / Brand',     value: '#e8202f' },
    { key: '--bg-primary',    label: 'Background Primary', value: '#080808' },
    { key: '--bg-secondary',  label: 'Background Sidebar', value: '#111111' },
    { key: '--bg-card',       label: 'Card Background',    value: '#161616' },
    { key: '--bg-card-hover', label: 'Card Hover',         value: '#1e1e1e' },
    { key: '--text-primary',  label: 'Text Primary',       value: '#ffffff' },
    { key: '--text-secondary',label: 'Text Secondary',     value: '#a0a0a0' },
    { key: '--text-muted',    label: 'Text Muted',         value: '#555555' },
    { key: '--border',        label: 'Border',             value: '#2a2a2a' },
    { key: '--gold',          label: 'Gold / Accent 2',    value: '#f5a623' },
  ])

  const applyLive = (key: string, value: string) =>
    document.documentElement.style.setProperty(key, value)

  const displayFonts = ['Barlow Condensed', 'Impact', 'Oswald', 'Bebas Neue', 'Anton', 'Montserrat']
  const bodyFonts    = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Source Sans Pro', 'DM Sans']

  const tabs = [
    { id: 'colors',     label: 'Colors',     icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'branding',   label: 'Branding',   icon: Brush },
  ] as const

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">CMS &amp; Theming</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Live CSS variables, fonts, and app branding — changes apply instantly across every tenant view.</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'colors' && (
        <div className="card p-6">
          <h3 className="font-display font-bold text-white uppercase mb-4">CSS Color Variables</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {vars.map(v => (
              <div key={v.key} className="flex items-center gap-3 p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-colors">
                <input type="color" value={v.value}
                  onChange={e => {
                    setVars(prev => prev.map(x => x.key === v.key ? { ...x, value: e.target.value } : x))
                    applyLive(v.key, e.target.value)
                  }}
                  className="w-11 h-11 rounded-lg cursor-pointer border-0 bg-transparent p-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-white text-sm font-medium">{v.label}</div>
                  <div className="text-[var(--text-muted)] text-xs font-mono">{v.key}</div>
                </div>
                <div className="text-xs text-[var(--text-muted)] font-mono shrink-0">{v.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setSaved(true)} className="btn-primary text-sm px-6">
              {saved ? <><CheckCircle size={14} className="inline mr-1.5" />Saved</> : 'Save Theme'}
            </button>
            <button onClick={() => { setVars(prev => prev.map(v => { applyLive(v.key, v.value); return v })) }} className="btn-secondary text-sm px-6">
              Reset to Default
            </button>
          </div>
        </div>
      )}

      {tab === 'typography' && (
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="font-display font-bold text-white uppercase mb-4">Display Font (headings, titles)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {displayFonts.map(f => (
                <button key={f} onClick={() => setFont(f)}
                  className={`p-4 rounded-xl border text-left transition-all ${font === f ? 'border-[var(--accent)] bg-[var(--accent)]/8' : 'border-[var(--border)] hover:border-[var(--accent)]/40'}`}>
                  <div className="text-2xl font-black text-white leading-none mb-1" style={{ fontFamily: f }}>{appName}</div>
                  <div className="text-[var(--text-muted)] text-[10px]">{f}</div>
                  {font === f && <Badge text="Active" color="#e8202f" />}
                </button>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-display font-bold text-white uppercase mb-4">Body Font (paragraphs, UI)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {bodyFonts.map(f => (
                <button key={f} onClick={() => setBodyFont(f)}
                  className={`p-4 rounded-xl border text-left transition-all ${bodyFont === f ? 'border-[var(--accent)] bg-[var(--accent)]/8' : 'border-[var(--border)] hover:border-[var(--accent)]/40'}`}>
                  <div className="text-sm text-white mb-1" style={{ fontFamily: f }}>The quick brown fox</div>
                  <div className="text-[var(--text-muted)] text-[10px]">{f}</div>
                  {bodyFont === f && <Badge text="Active" color="#e8202f" />}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary text-sm px-6">Save Typography</button>
        </div>
      )}

      {tab === 'branding' && (
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="font-display font-bold text-white uppercase mb-4">App Icon &amp; Logo</h3>
            <div className="flex flex-wrap items-start gap-6">
              {/* Live preview */}
              <div className="space-y-3">
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Preview</div>
                <div className="flex items-center gap-3 p-4 bg-[var(--bg-primary)] rounded-xl">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl"
                    style={{ background: iconBg, fontFamily: font }}>
                    {iconLetter}
                  </div>
                  <div>
                    <div className="text-white font-black text-xl leading-none" style={{ fontFamily: font }}>{appName}</div>
                    <div className="text-[var(--text-muted)] text-xs mt-0.5">{appTagline}</div>
                  </div>
                </div>
                {/* Small icon sizes */}
                <div className="flex items-end gap-3">
                  {[192, 96, 48, 32].map(s => (
                    <div key={s} className="text-center">
                      <div className="rounded-xl flex items-center justify-center text-white font-black mx-auto"
                        style={{ background: iconBg, width: s > 96 ? 48 : s > 48 ? 32 : s > 32 ? 20 : 16, height: s > 96 ? 48 : s > 48 ? 32 : s > 32 ? 20 : 16, fontFamily: font, fontSize: s > 96 ? 20 : s > 48 ? 14 : 10 }}>
                        {iconLetter}
                      </div>
                      <div className="text-[8px] text-[var(--text-muted)] mt-1">{s}px</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Controls */}
              <div className="space-y-4 flex-1 min-w-48">
                <div>
                  <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">App Name</label>
                  <input value={appName} onChange={e => setAppName(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)]" />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Tagline</label>
                  <input value={appTagline} onChange={e => setAppTagline(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent)]" />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Icon Letter</label>
                  <input value={iconLetter} maxLength={1} onChange={e => setIconLetter(e.target.value.toUpperCase())}
                    className="w-20 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-white text-sm text-center font-black focus:outline-none focus:border-[var(--accent)]" />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1 block">Icon Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={iconBg} onChange={e => setIconBg(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0.5" />
                    <span className="text-[var(--text-muted)] font-mono text-xs">{iconBg}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="btn-primary text-sm px-6">Save Branding &amp; Regenerate Icons</button>
              <button className="btn-secondary text-sm px-4 flex items-center gap-2"><Download size={14} /> Download Icons</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SuperAdminAPIs() {
  const apis = [
    { name: 'Supabase', key: 'eyJhbGci…xGZn8', status: 'Active', scope: 'Database / Auth', last: '2 min ago' },
    { name: 'Stripe',   key: 'sk_live_…4kRt9', status: 'Active', scope: 'Payments',        last: '1 hr ago' },
    { name: 'Ticketmaster', key: 'fZ9mQ…BwA3', status: 'Active', scope: 'Events',          last: '5 min ago' },
    { name: 'SendGrid', key: 'SG.Xf3…tR2',     status: 'Active', scope: 'Email',           last: '12 hr ago' },
    { name: 'Instagram', key: 'IGQVJ…H9dF',    status: 'Active', scope: 'Social / Posts',  last: '30 min ago' },
    { name: 'Skatteverket', key: '—',           status: 'Pending', scope: 'Tax Reporting',  last: 'Not set up' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-black text-white text-3xl uppercase">API Keys</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Manage integrations and service credentials</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm"><Plus size={15} /> Add Integration</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-primary)]">
              {['Service','Key (masked)','Scope','Status','Last Used'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apis.map(a => (
              <tr key={a.name} className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-card)] transition-colors">
                <td className="px-4 py-3 text-white font-medium">{a.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">{a.key}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{a.scope}</td>
                <td className="px-4 py-3"><Badge text={a.status} color={a.status === 'Active' ? '#34c759' : '#f5a623'} /></td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{a.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-5 flex items-start gap-3">
        <Shield size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">API keys are encrypted at rest in Supabase Vault. Never expose <code className="text-[var(--accent)]">sk_live_</code> or database keys in client-side code. Rotate keys quarterly or immediately after suspected compromise.</p>
      </div>
    </div>
  )
}

function SuperAdminPaywall() {
  const plans = [
    { name: 'Starter', price: 99,  desc: 'Up to 500 members, booking, basic analytics' },
    { name: 'Pro',     price: 299, desc: 'Unlimited members, HR, academy, financial 360, white-label' },
    { name: 'Enterprise', price: 599, desc: 'Multi-location, franchise tools, dedicated support, SLA' },
  ]
  const subscriptions = [
    { org: 'MMAFit Sweden',   plan: 'Pro',     price: 299, currency: 'EUR', nextBilling: '2026-06-01', status: 'Active',  stripe: 'sub_1a2b3c', method: 'Visa •••• 4242' },
    { org: 'FitForce Berlin', plan: 'Starter', price: 99,  currency: 'EUR', nextBilling: '2026-06-05', status: 'Active',  stripe: 'sub_4d5e6f', method: 'MC •••• 1234' },
    { org: 'Iron House Oslo', plan: 'Pro',     price: 299, currency: 'EUR', nextBilling: '2026-06-10', status: 'Trial',   stripe: 'sub_7g8h9i', method: 'Card •••• 9999' },
  ]
  const mrr = subscriptions.filter(s => s.status !== 'Trial').reduce((s, x) => s + x.price, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Paywall</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">LUVLAB Stripe subscriptions — automatic monthly billing for all tenants</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Active Subscriptions" value={subscriptions.filter(s => s.status === 'Active').length.toString()} icon={CreditCard} color="#34c759" />
        <KPI label="Monthly MRR" value={`€${mrr}`} delta="+€299" positive icon={DollarSign} color="#34c759" />
        <KPI label="Trials" value={subscriptions.filter(s => s.status === 'Trial').length.toString()} icon={Clock} color="#f5a623" />
        <KPI label="Upcoming Charges" value={`€${subscriptions.filter(s => s.status !== 'Trial').reduce((s, x) => s + x.price, 0)}`} icon={RefreshCw} color="#9b59b6" />
      </div>

      {/* Plans */}
      <div>
        <h3 className="font-display font-bold text-white uppercase mb-3">Plans</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {plans.map(p => (
            <div key={p.name} className={`card p-5 ${p.name === 'Pro' ? 'border-[var(--accent)]/40 bg-[var(--accent)]/5' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-black text-white text-lg">{p.name}</span>
                {p.name === 'Pro' && <Badge text="Popular" color="#e8202f" />}
              </div>
              <div className="font-display font-black text-white text-2xl mb-2">€{p.price}<span className="text-sm font-normal text-[var(--text-muted)]">/mo</span></div>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{p.desc}</p>
              <button className="w-full mt-4 btn-secondary text-sm py-2">Edit Plan</button>
            </div>
          ))}
        </div>
      </div>

      {/* Active subscriptions */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="font-display font-bold text-white uppercase">Active Subscriptions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
              <tr>
                {['Organization','Plan','Amount','Next Billing','Payment','Status',''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(s => (
                <tr key={s.org} className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-card)] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{s.org}</td>
                  <td className="px-4 py-3"><Badge text={s.plan} color={s.plan === 'Pro' ? '#9b59b6' : '#f5a623'} /></td>
                  <td className="px-4 py-3 text-white font-semibold">€{s.price}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{s.nextBilling}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs">{s.method}</td>
                  <td className="px-4 py-3"><Badge text={s.status} color={s.status === 'Active' ? '#34c759' : '#f5a623'} /></td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-[var(--accent)] hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5 flex items-start gap-3">
        <CreditCard size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">All subscriptions are charged automatically via Stripe on the billing date. Tenants receive an invoice email before each charge. Failed payments trigger a 3-day retry window before service suspension.</p>
      </div>
    </div>
  )
}

function SuperAdminReceipts() {
  const receipts = [
    { id: 'LUV-OUT-042', to: 'MMAFit Sweden',   plan: 'Pro',     amount: 299, date: 'Apr 1, 2026',  status: 'Paid' },
    { id: 'LUV-OUT-041', to: 'FitForce Berlin',  plan: 'Starter', amount: 99,  date: 'Apr 5, 2026',  status: 'Paid' },
    { id: 'LUV-OUT-040', to: 'MMAFit Sweden',   plan: 'Free',    amount: 0,   date: 'Mar 1, 2026',  status: 'Waived' },
    { id: 'LUV-OUT-039', to: 'FitForce Berlin',  plan: 'Starter', amount: 99,  date: 'Mar 5, 2026',  status: 'Paid' },
    { id: 'LUV-OUT-038', to: 'MMAFit Sweden',   plan: 'Free',    amount: 0,   date: 'Feb 1, 2026',  status: 'Waived' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-black text-white text-3xl uppercase">Platform Receipts</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">All outgoing Stripe invoices issued to LUVLAB tenants</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-[var(--accent)] font-medium border border-[var(--accent)]/30 px-4 py-2 rounded-lg hover:bg-[var(--accent)]/8 transition-colors">
          <Download size={14} /> Export All
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KPI label="Total Invoiced (YTD)" value="€1,194" delta="+€398" positive icon={Receipt} color="#34c759" />
        <KPI label="Paid" value="4" icon={CheckCircle} color="#34c759" />
        <KPI label="Waived (onboarding)" value="3" icon={Sparkles} color="#f5a623" />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
            <tr>
              {['Receipt #','Tenant','Plan','Amount','Date','Status',''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {receipts.map(r => (
              <tr key={r.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-card)] transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-[var(--text-muted)]">{r.id}</td>
                <td className="px-5 py-3 text-white font-medium">{r.to}</td>
                <td className="px-5 py-3"><Badge text={r.plan} color={r.plan === 'Pro' ? '#9b59b6' : r.plan === 'Starter' ? '#f5a623' : '#34c759'} /></td>
                <td className="px-5 py-3 text-white">{r.amount === 0 ? <span className="text-[var(--gold)]">€0</span> : `€${r.amount}`}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">{r.date}</td>
                <td className="px-5 py-3"><Badge text={r.status} color={r.status === 'Paid' ? '#34c759' : '#f5a623'} /></td>
                <td className="px-5 py-3">
                  <button className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><FileDown size={11} /> PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
const ROLE_LABEL: Record<string, string> = {
  super_admin: 'LUVLAB Super Admin',
  admin:       'MMAFit Management',
  staff:       'Staff',
  trainer:     'Instructor',
  member:      'Member',
}

function DashboardShell({ nav, activePanel, setActivePanel, user, logout, title, children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { canInstall, installed, install } = usePWAInstall()
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
            <div className="text-[var(--text-muted)] text-xs">{ROLE_LABEL[user?.role || 'member'] || user?.role}</div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-4">
          {groups.map((group) => (
            <div key={group}>
              {group && (
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] px-3 mb-1">{group}</p>
              )}
              {nav.filter((n: any) => n.group === group).map(({ icon: Icon, label, id, href }: any) => (
                href ? (
                  <Link
                    key={id}
                    to={href}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]"
                  >
                    <Icon size={16} />
                    {label}
                    <ExternalLink size={11} className="ml-auto opacity-50" />
                  </Link>
                ) : (
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
                )
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)] space-y-1">
          {canInstall && (
            <button
              onClick={install}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[var(--accent)] bg-[var(--accent)]/8 hover:bg-[var(--accent)]/15 transition-colors"
            >
              <Download size={16} /><span>Install App</span>
            </button>
          )}
          {installed && (
            <div className="w-full flex items-center gap-3 px-3 py-2 text-xs text-green-400 font-medium">
              <CheckCircle size={14} /><span>App Installed</span>
            </div>
          )}
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
          <div className="flex items-center gap-2">
            {canInstall && (
              <button
                onClick={install}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-semibold hover:bg-[var(--accent)]/20 transition-all"
              >
                <Download size={13} />
                Install App
              </button>
            )}
            {installed && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <CheckCircle size={13} /> Installed
              </span>
            )}
            <button className="relative p-2 text-[var(--text-secondary)] hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent)] rounded-full" />
            </button>
          </div>
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
  const role = user?.role || 'member'
  const [activePanel, setActivePanel] = useState(role === 'super_admin' ? 'platform' : 'overview')

  // ── SUPER ADMIN (LUVLAB platform) ─────────────────────────────────────────
  if (role === 'super_admin') {
    const panel = (() => {
      switch (activePanel) {
        case 'platform':  return <SuperAdminPlatform />
        case 'cms':       return <SuperAdminCMS />
        case 'apis':      return <SuperAdminAPIs />
        case 'paywall':   return <SuperAdminPaywall />
        case 'receipts':  return <SuperAdminReceipts />
        default:         return <Placeholder label={SUPER_ADMIN_NAV.find(n => n.id === activePanel)?.label || activePanel} />
      }
    })()
    return (
      <DashboardShell nav={SUPER_ADMIN_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={SUPER_ADMIN_NAV.find(n => n.id === activePanel)?.label || 'LUVLAB'}>
        {panel}
      </DashboardShell>
    )
  }

  // ── ADMIN (MMAFit founders / company management) ──────────────────────────
  if (role === 'admin') {
    const panel = (() => {
      switch (activePanel) {
        case 'overview':    return <AdminOverview />
        case 'spaces':      return <AdminSpaces />
        case 'staff':       return <AdminInstructors />
        case 'academy':     return <AdminAcademy />
        case 'marketing':   return <AdminMarketing />
        case 'bookkeeping': return <AdminBookkeeping />
        case 'financial':   return <AdminFinancial360 />
        case 'tax':         return <AdminTaxReports />
        case 'billing':     return <AdminBilling />
        default:            return <Placeholder label={ADMIN_NAV.find(n => n.id === activePanel)?.label || activePanel} />
      }
    })()
    return (
      <DashboardShell nav={ADMIN_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={ADMIN_NAV.find(n => n.id === activePanel)?.label || 'MMAFit Management'}>
        {panel}
      </DashboardShell>
    )
  }

  // ── STAFF (employed by MMAFit — trainers, instructors, nurses, doctors, assistants) ──
  if (role === 'staff') {
    const panel = (() => {
      switch (activePanel) {
        case 'overview':      return <TrainerOverview user={user} />
        case 'resources':     return <TrainerResources user={user} />
        case 'certification': return <TrainerCertification user={user} />
        case 'compensation':  return <StaffCompensation user={user} />
        default:              return <Placeholder label={STAFF_NAV.find(n => n.id === activePanel)?.label || activePanel} />
      }
    })()
    return (
      <DashboardShell nav={STAFF_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={STAFF_NAV.find(n => n.id === activePanel)?.label || 'Staff'}>
        {panel}
      </DashboardShell>
    )
  }

  // ── TRAINER (external licensed instructor — pays 25 EUR/mo membership) ─────
  if (role === 'trainer') {
    const panel = (() => {
      switch (activePanel) {
        case 'overview':      return <TrainerOverview user={user} />
        case 'myclasses':     return <TrainerMyClasses />
        case 'payments':      return <TrainerPayments />
        case 'resources':     return <TrainerResources user={user} />
        case 'certification': return <TrainerCertification user={user} />
        case 'earnings':      return <TrainerEarnings />
        case 'feedback':      return <TrainerFeedback />
        default:              return <Placeholder label={TRAINER_NAV.find(n => n.id === activePanel)?.label || activePanel} />
      }
    })()
    return (
      <DashboardShell nav={TRAINER_NAV} activePanel={activePanel} setActivePanel={setActivePanel} user={user} logout={logout} title={TRAINER_NAV.find(n => n.id === activePanel)?.label || 'Instructor'}>
        {panel}
      </DashboardShell>
    )
  }

  // ── MEMBER (clients, people who train) ───────────────────────────────────
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
