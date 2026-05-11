import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User, CreditCard, Calendar, Bell, Shield, LogOut, Edit2, CheckCircle,
  Star, Clock, Flame, ChevronRight, Camera, Eye, EyeOff, AlertTriangle,
  Download, ArrowLeft, Lock,
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const PLANS = [
  { id: 'starter', name: 'Starter', price: 299, desc: '4 classes/month' },
  { id: 'pro',     name: 'Pro',     price: 499, desc: 'Unlimited classes · All programs' },
  { id: 'elite',   name: 'Elite',   price: 799, desc: 'Full fighter experience · Personal coaching' },
]

const CLASS_HISTORY = [
  { date: 'May 7',  class: 'MMAFit Punch', trainer: 'Bertrand Amoussou', duration: 50, calories: 590, attended: true  },
  { date: 'May 5',  class: 'MMAFit Groove', trainer: 'Kayo Shekoni',      duration: 45, calories: 470, attended: true  },
  { date: 'May 3',  class: 'MMAFit Hit',    trainer: 'Marcus Holm',        duration: 55, calories: 680, attended: true  },
  { date: 'Apr 30', class: 'MMAFit Punch',  trainer: 'Diana Svensson',     duration: 50, calories: 600, attended: true  },
  { date: 'Apr 28', class: 'MMAFit Power',  trainer: 'Marcus Holm',        duration: 50, calories: 630, attended: false },
  { date: 'Apr 26', class: 'MMAFit Groove', trainer: 'Kayo Shekoni',       duration: 45, calories: 460, attended: true  },
]

type Tab = 'profile' | 'membership' | 'history' | 'payment' | 'notifications' | 'security'

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
      {text}
    </span>
  )
}

export default function AccountPage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('profile')

  // Profile form state
  const [name, setName]       = useState(user?.name || '')
  const [phone, setPhone]     = useState('+46 70 123 45 67')
  const [location, setLoc]    = useState('Stockholm, Sweden')
  const [saved, setSaved]     = useState(false)

  // Security state
  const [showPw, setShowPw]   = useState(false)
  const [pwForm, setPwForm]   = useState({ current: '', next: '', confirm: '' })

  // Notification prefs
  const [notifs, setNotifs]   = useState({
    classReminders: true, newChoreography: true, newClasses: false,
    promos: false, weeklyRecap: true, pushNotifs: true,
  })

  const currentPlan = PLANS.find(p => p.id === (user?.membershipTier || 'pro')) || PLANS[1]

  const saveProfile = () => {
    setSaved(true)
    toast.success('Profile updated')
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Signed out')
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'profile',       label: 'Profile',       icon: User       },
    { id: 'membership',    label: 'Membership',    icon: Star       },
    { id: 'history',       label: 'Class History', icon: Calendar   },
    { id: 'payment',       label: 'Payment',       icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell       },
    { id: 'security',      label: 'Security',      icon: Shield     },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">
      <div className="container-app py-10">

        {/* Back link */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors text-sm mb-8">
          <ArrowLeft size={15} /> Back to dashboard
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <aside className="w-full lg:w-64 shrink-0">
            {/* Avatar card */}
            <div className="card p-6 mb-4">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-[var(--accent)]/20 border-2 border-[var(--accent)]/40 flex items-center justify-center">
                    <span className="font-display font-black text-[var(--accent)] text-3xl">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[var(--bg-card)] border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--accent)]/10 transition-colors">
                    <Camera size={12} className="text-[var(--accent)]" />
                  </button>
                </div>
                <div className="font-semibold text-white text-base">{user?.name || 'Member'}</div>
                <div className="text-[var(--text-muted)] text-xs mt-0.5">{user?.email}</div>
                <div className="mt-2">
                  <Badge text={currentPlan.name} color="#e8202f" />
                </div>
                <div className="text-[var(--text-muted)] text-xs mt-1.5">Member since {new Date(user?.joinedAt || Date.now()).getFullYear()}</div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-[var(--border)]">
                {[
                  { val: '34', label: 'Classes' },
                  { val: '8', label: 'This mo.' },
                  { val: '5', label: 'Streak' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-display font-bold text-white text-lg leading-none">{s.val}</div>
                    <div className="text-[var(--text-muted)] text-[10px] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav */}
            <nav className="card p-2 space-y-0.5">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                    tab === t.id
                      ? 'bg-[var(--accent)]/12 text-[var(--accent)] font-medium'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-primary)]'
                  }`}>
                  <t.icon size={15} />
                  {t.label}
                  {tab === t.id && <ChevronRight size={13} className="ml-auto" />}
                </button>
              ))}
              <div className="h-px bg-[var(--border)] my-1" />
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-left">
                <LogOut size={15} /> Sign Out
              </button>
            </nav>
          </aside>

          {/* ── Main Content ───────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* PROFILE */}
            {tab === 'profile' && (
              <>
                <div>
                  <h2 className="font-display font-black text-white text-3xl uppercase">My Profile</h2>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">Manage your personal information</p>
                </div>
                <div className="card p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1.5">Full Name</label>
                      <input value={name} onChange={e => setName(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1.5">Email</label>
                      <input value={user?.email || ''} disabled
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[var(--text-muted)] text-sm cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1.5">Phone</label>
                      <input value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1.5">Location</label>
                      <input value={location} onChange={e => setLoc(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1.5">Bio / About (optional)</label>
                    <textarea rows={3} placeholder="Tell us a bit about yourself…"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-[var(--accent)] transition-colors" />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={saveProfile} className="btn-primary flex items-center gap-2 text-sm px-6">
                      {saved ? <><CheckCircle size={14} />Saved</> : <><Edit2 size={14} />Save Profile</>}
                    </button>
                  </div>
                </div>

                {/* Photo upload */}
                <div className="card p-6">
                  <h3 className="font-display font-bold text-white uppercase mb-3">Profile Photo</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                      <span className="font-display font-black text-[var(--accent)] text-2xl">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
                    </div>
                    <div>
                      <button className="btn-secondary text-sm px-4 flex items-center gap-2"><Camera size={13} /> Upload Photo</button>
                      <p className="text-[var(--text-muted)] text-xs mt-1.5">JPG or PNG, max 2MB</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* MEMBERSHIP */}
            {tab === 'membership' && (
              <>
                <div>
                  <h2 className="font-display font-black text-white text-3xl uppercase">Membership</h2>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">Your plan, billing, and options</p>
                </div>

                {/* Current plan */}
                <div className="card p-6 border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-1">Current Plan</div>
                      <div className="font-display font-black text-white text-3xl">{currentPlan.name}</div>
                      <div className="text-[var(--text-secondary)] text-sm mt-0.5">{currentPlan.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-black text-white text-3xl">{currentPlan.price}</div>
                      <div className="text-[var(--text-muted)] text-xs">SEK/month</div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-[var(--border)]">
                    {[
                      { label: 'Status',       val: 'Active',      color: '#34c759' },
                      { label: 'Next billing', val: 'Jun 1, 2026', color: '#fff'    },
                      { label: 'Member since', val: 'Jan 2024',    color: '#fff'    },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="text-xs text-[var(--text-muted)] mb-0.5">{s.label}</div>
                        <div className="text-sm font-semibold" style={{ color: s.color }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan picker */}
                <div>
                  <h3 className="font-display font-bold text-white uppercase mb-3 text-lg">Change Plan</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {PLANS.map(p => (
                      <div key={p.id}
                        className={`card p-5 cursor-pointer transition-all ${p.id === currentPlan.id ? 'border-[var(--accent)]/50 bg-[var(--accent)]/5' : 'hover:border-[var(--accent)]/30'}`}
                        onClick={() => toast.success(`Upgrade to ${p.name} coming soon — contact info@mmafit.se`)}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-display font-bold text-white">{p.name}</span>
                          {p.id === currentPlan.id && <Badge text="Current" color="#e8202f" />}
                        </div>
                        <div className="font-display font-black text-white text-2xl mb-1">{p.price}<span className="text-xs font-normal text-[var(--text-muted)]"> SEK/mo</span></div>
                        <div className="text-[var(--text-secondary)] text-xs">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing history */}
                <div className="card overflow-hidden">
                  <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
                    <h3 className="font-display font-bold text-white uppercase">Billing History</h3>
                    <button className="flex items-center gap-1.5 text-xs text-[var(--accent)] font-medium"><Download size={13} /> Export</button>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
                      <tr>
                        {['Date','Plan','Amount','Status',''].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: 'May 1, 2026', plan: 'Pro', amount: 499, status: 'Upcoming' },
                        { date: 'Apr 1, 2026', plan: 'Pro', amount: 499, status: 'Paid'     },
                        { date: 'Mar 1, 2026', plan: 'Pro', amount: 499, status: 'Paid'     },
                        { date: 'Feb 1, 2026', plan: 'Pro', amount: 499, status: 'Paid'     },
                      ].map((b, i) => (
                        <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg-card)] transition-colors">
                          <td className="px-5 py-3 text-[var(--text-secondary)]">{b.date}</td>
                          <td className="px-5 py-3 text-white font-medium">{b.plan}</td>
                          <td className="px-5 py-3 text-white">{b.amount} SEK</td>
                          <td className="px-5 py-3"><Badge text={b.status} color={b.status === 'Paid' ? '#34c759' : '#9b59b6'} /></td>
                          <td className="px-5 py-3">
                            {b.status === 'Paid' && (
                              <button className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1"><Download size={11} /> PDF</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cancel zone */}
                <div className="card p-5 border border-red-900/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold mb-1">Cancel Membership</div>
                      <p className="text-[var(--text-secondary)] text-xs leading-relaxed">Your access continues until the end of the billing period. Cancel with 30 days notice.</p>
                    </div>
                    <button onClick={() => toast.error('To cancel, email info@mmafit.se with your request')}
                      className="text-xs text-red-400 border border-red-900/50 px-3 py-1.5 rounded-lg hover:bg-red-900/10 transition-colors shrink-0">
                      Cancel Plan
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* CLASS HISTORY */}
            {tab === 'history' && (
              <>
                <div>
                  <h2 className="font-display font-black text-white text-3xl uppercase">Class History</h2>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">Your attendance record and workout stats</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { val: '34',    label: 'Total Classes',   color: '#e8202f' },
                    { val: '18,4k', label: 'Total Calories',  color: '#ff6b35' },
                    { val: '28h',   label: 'Hours Trained',   color: '#f5a623' },
                    { val: '94%',   label: 'Attendance Rate', color: '#34c759' },
                  ].map(s => (
                    <div key={s.label} className="card p-4 text-center">
                      <div className="font-display font-black text-white text-2xl leading-none" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-[var(--text-muted)] text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="card overflow-hidden">
                  <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
                    <h3 className="font-display font-bold text-white uppercase">Recent Classes</h3>
                    <button className="flex items-center gap-1.5 text-xs text-[var(--accent)] font-medium"><Download size={13} /> Export CSV</button>
                  </div>
                  <div className="divide-y divide-[var(--border)]">
                    {CLASS_HISTORY.map((c, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-[var(--bg-card)] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-10 rounded-full ${c.attended ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />
                          <div>
                            <div className="text-white text-sm font-medium">{c.class}</div>
                            <div className="text-[var(--text-muted)] text-xs">{c.trainer} · {c.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                          <span className="flex items-center gap-1"><Clock size={11} /> {c.duration} min</span>
                          <span className="flex items-center gap-1"><Flame size={11} className="text-orange-400" /> {c.calories} kcal</span>
                          <Badge text={c.attended ? 'Attended' : 'Missed'} color={c.attended ? '#34c759' : '#666'} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* PAYMENT */}
            {tab === 'payment' && (
              <>
                <div>
                  <h2 className="font-display font-black text-white text-3xl uppercase">Payment Method</h2>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">Manage your card via Stripe</p>
                </div>
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-white uppercase">Saved Cards</h3>
                    <button className="btn-secondary text-xs px-4">+ Add Card</button>
                  </div>
                  {/* Active card */}
                  <div className="relative overflow-hidden rounded-2xl p-5 mb-4"
                    style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-10 h-7 rounded bg-gradient-to-br from-[var(--gold)] to-orange-400" />
                      <Badge text="Default" color="#34c759" />
                    </div>
                    <div className="font-mono text-white text-lg tracking-widest mb-3">•••• •••• •••• 4242</div>
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>Anna Lindström</span>
                      <span>Expires 08/28</span>
                    </div>
                    <div className="absolute top-4 right-14 w-16 h-16 rounded-full bg-white/5" />
                    <div className="absolute top-2 right-8 w-24 h-24 rounded-full bg-white/3" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => toast.success('Manage your payment method via Stripe — email info@mmafit.se')}
                      className="btn-secondary text-sm px-5 flex items-center gap-2"><CreditCard size={13} /> Update Card</button>
                    <button className="text-xs text-red-400 hover:underline">Remove</button>
                  </div>
                </div>
                <div className="card p-5 flex items-start gap-3">
                  <Lock size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Payments are processed securely via <span className="text-white">Stripe</span>. Your card details are never stored on MMAFit servers. PCI-DSS compliant.
                  </p>
                </div>
              </>
            )}

            {/* NOTIFICATIONS */}
            {tab === 'notifications' && (
              <>
                <div>
                  <h2 className="font-display font-black text-white text-3xl uppercase">Notifications</h2>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">Choose what you hear from us</p>
                </div>
                <div className="card p-6 space-y-1">
                  {[
                    { key: 'classReminders',   label: 'Class Reminders',          desc: '1 hour before your booked class' },
                    { key: 'newChoreography',  label: 'New Choreography Drops',   desc: 'When monthly choreography updates are released' },
                    { key: 'newClasses',       label: 'New Class Added',          desc: 'When a new class slot opens at your location' },
                    { key: 'promos',           label: 'Promotions & Offers',      desc: 'Discounts, events, and special announcements' },
                    { key: 'weeklyRecap',      label: 'Weekly Progress Recap',    desc: 'Your training summary every Sunday' },
                    { key: 'pushNotifs',       label: 'Push Notifications (App)', desc: 'Browser and mobile push alerts' },
                  ].map(n => (
                    <div key={n.key} className="flex items-center justify-between py-3.5 border-b border-[var(--border)] last:border-0">
                      <div>
                        <div className="text-white text-sm font-medium">{n.label}</div>
                        <div className="text-[var(--text-muted)] text-xs mt-0.5">{n.desc}</div>
                      </div>
                      <button
                        onClick={() => {
                          setNotifs(p => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))
                          toast.success('Preference saved')
                        }}
                        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifs[n.key as keyof typeof notifs] ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}>
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs[n.key as keyof typeof notifs] ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* SECURITY */}
            {tab === 'security' && (
              <>
                <div>
                  <h2 className="font-display font-black text-white text-3xl uppercase">Security</h2>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">Keep your account safe</p>
                </div>

                {/* Change password */}
                <div className="card p-6">
                  <h3 className="font-display font-bold text-white uppercase mb-4">Change Password</h3>
                  <div className="space-y-3 max-w-sm">
                    {[
                      { label: 'Current Password', key: 'current' },
                      { label: 'New Password',     key: 'next'    },
                      { label: 'Confirm New',      key: 'confirm' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1.5">{f.label}</label>
                        <div className="relative">
                          <input
                            type={showPw ? 'text' : 'password'}
                            value={pwForm[f.key as keyof typeof pwForm]}
                            onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-white text-sm pr-10 focus:outline-none focus:border-[var(--accent)] transition-colors"
                            placeholder="••••••••" />
                          <button type="button" onClick={() => setShowPw(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => toast.success('Password updated successfully')}
                      className="btn-primary text-sm px-6 flex items-center gap-2 mt-2"><Shield size={13} /> Update Password</button>
                  </div>
                </div>

                {/* Active sessions */}
                <div className="card p-6">
                  <h3 className="font-display font-bold text-white uppercase mb-4">Active Sessions</h3>
                  {[
                    { device: 'MacBook Pro — Chrome', location: 'Stockholm, Sweden', last: 'Now · Current session', active: true },
                    { device: 'iPhone 15 — Safari',   location: 'Stockholm, Sweden', last: '2 hours ago',           active: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                      <div>
                        <div className="text-white text-sm font-medium flex items-center gap-2">
                          {s.device}
                          {s.active && <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />}
                        </div>
                        <div className="text-[var(--text-muted)] text-xs mt-0.5">{s.location} · {s.last}</div>
                      </div>
                      {!s.active && (
                        <button onClick={() => toast.success('Session terminated')}
                          className="text-xs text-red-400 hover:underline">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Danger zone */}
                <div className="card p-5 border border-red-900/30">
                  <h3 className="font-display font-bold text-red-400 uppercase mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} /> Danger Zone
                  </h3>
                  <p className="text-[var(--text-secondary)] text-xs mb-4 leading-relaxed">
                    Deleting your account is permanent. All your data, class history, and membership will be removed. This cannot be undone.
                  </p>
                  <button onClick={() => toast.error('To delete your account, email info@mmafit.se — we\'ll confirm within 24h')}
                    className="text-xs text-red-400 border border-red-900/50 px-4 py-2 rounded-lg hover:bg-red-900/10 transition-colors">
                    Delete Account
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
