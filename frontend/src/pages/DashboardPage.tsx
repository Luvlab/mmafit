import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Calendar, ShoppingBag, TrendingUp,
  Settings, LogOut, Bell, Search, BarChart2, DollarSign,
  Megaphone, FileText, ChevronRight, ArrowUpRight, ArrowDownRight,
  CheckCircle, Clock, Package, UserPlus, Star, Zap, Mail,
  Instagram, Target, PieChart, Wallet, ReceiptText, BookOpen,
  Shield, Award
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { PROGRAMS, TRAINERS, TESTIMONIALS } from '../services/api'
import toast from 'react-hot-toast'

// ── Sidebar navigation ───────────────────────────────────────────────────────
const MEMBER_NAV = [
  { icon: LayoutDashboard, label: 'Overview',     id: 'overview', group: '' },
  { icon: Calendar,        label: 'My Classes',   id: 'classes',  group: '' },
  { icon: TrendingUp,      label: 'Progress',     id: 'progress', group: '' },
  { icon: ShoppingBag,     label: 'Orders',       id: 'orders',   group: '' },
  { icon: Settings,        label: 'Profile',      id: 'profile',  group: '' },
]

const ADMIN_NAV = [
  { icon: LayoutDashboard, label: 'Overview',        id: 'overview',    group: 'Main' },
  { icon: Users,           label: 'Members',         id: 'members',     group: 'Main' },
  { icon: Calendar,        label: 'Classes',         id: 'classes',     group: 'Main' },
  { icon: UserPlus,        label: 'Staff',           id: 'staff',       group: 'Main' },
  { icon: Package,         label: 'Shop',            id: 'shop',        group: 'Main' },
  { icon: Megaphone,       label: 'Marketing',       id: 'marketing',   group: 'Business' },
  { icon: Target,          label: 'Events',          id: 'events',      group: 'Business' },
  { icon: Instagram,       label: 'Social Media',    id: 'social',      group: 'Business' },
  { icon: ReceiptText,     label: 'Bookkeeping',     id: 'bookkeeping', group: 'Finance' },
  { icon: DollarSign,      label: 'Revenue',         id: 'revenue',     group: 'Finance' },
  { icon: FileText,        label: 'Tax Reports',     id: 'tax',         group: 'Finance' },
  { icon: Shield,          label: 'Permissions',     id: 'permissions', group: 'Admin' },
  { icon: Settings,        label: 'Settings',        id: 'settings',    group: 'Admin' },
]

// ── KPI card ─────────────────────────────────────────────────────────────────
function KPI({ label, value, delta, positive = true, icon: Icon, color = 'var(--accent)' }: any) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {delta && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? 'text-green-400' : 'text-[var(--accent)]'}`}>
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
          </span>
        )}
      </div>
      <div className="font-display font-black text-white text-3xl leading-none">{value}</div>
      <div className="text-[var(--text-muted)] text-xs mt-1">{label}</div>
    </div>
  )
}

// ── Member overview panel ─────────────────────────────────────────────────────
function MemberOverview() {
  const { user } = useAuthStore()
  const UPCOMING = [
    { id: '1', class: 'MMAFit Original', trainer: 'Bertrand Amoussou', date: 'Tomorrow', time: '07:00', color: '#e8202f' },
    { id: '2', class: 'MMAFit Battle',   trainer: 'Marcus Holm',        date: 'Wed',      time: '18:00', color: '#ff6b35' },
    { id: '3', class: 'MMAFit Flow',     trainer: 'Kayo Shekoni',       date: 'Thu',      time: '11:30', color: '#27ae60' },
  ]
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="card p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full translate-x-8 -translate-y-8" />
        <div className="relative">
          <p className="text-[var(--text-secondary)] text-sm">Welcome back,</p>
          <h2 className="font-display font-black text-white text-3xl mt-0.5">{user?.name ?? 'Fighter'}</h2>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="badge badge-red text-xs capitalize">{user?.membershipTier ?? 'Starter'} Plan</span>
            <span className="text-xs text-[var(--text-muted)]">Member since {new Date(user?.joinedAt ?? '').toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' })}</span>
          </div>
        </div>
      </div>
      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPI label="Classes this month"  value="8"     delta="+2"    icon={Calendar}  color="var(--accent)" />
        <KPI label="Total classes"       value="47"    delta="+12%"  icon={Zap}       color="#f5a623" />
        <KPI label="Calories burned"     value="28.4k" delta="+8%"   icon={TrendingUp} color="#27ae60" />
        <KPI label="Streak (days)"       value="12"    delta="+3"    icon={Star}      color="#9b59b6" />
      </div>
      {/* Upcoming classes */}
      <div>
        <h3 className="font-display font-bold text-white text-lg uppercase mb-4">Upcoming Classes</h3>
        <div className="space-y-3">
          {UPCOMING.map((cls) => (
            <div key={cls.id} className="card p-4 flex items-center gap-4" style={{ borderLeftWidth: 3, borderLeftColor: cls.color }}>
              <div className="shrink-0">
                <div className="font-display font-bold text-white text-sm">{cls.date}</div>
                <div className="text-[var(--text-muted)] text-xs">{cls.time}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{cls.class}</div>
                <div className="text-[var(--text-muted)] text-xs">{cls.trainer}</div>
              </div>
              <button onClick={() => toast.success('Booking cancelled')} className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Cancel</button>
            </div>
          ))}
        </div>
      </div>
      {/* Progress chart placeholder */}
      <div className="card p-5">
        <h3 className="font-display font-bold text-white text-lg uppercase mb-4">Weekly Activity</h3>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-sm transition-all" style={{ height: `${h}%`, background: i === 4 ? 'var(--accent)' : 'var(--bg-card-hover)' }} />
              <span className="text-[9px] text-[var(--text-muted)]">{'MTWTFSS'[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Admin Overview panel ──────────────────────────────────────────────────────
function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-black text-white text-3xl uppercase">Operations Overview</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">MMAFit Sweden · May 2026</p>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Total Members"     value="2,418"  delta="+12%"  positive icon={Users}       color="var(--accent)" />
        <KPI label="Monthly Revenue"   value="€24.8k" delta="+8%"   positive icon={DollarSign}  color="#27ae60" />
        <KPI label="Classes/Week"      value="40"     delta="+4"    positive icon={Calendar}    color="#f5a623" />
        <KPI label="Avg Attendance"    value="84%"    delta="+3%"   positive icon={TrendingUp}  color="#9b59b6" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="New Members (mo)" value="127"    delta="+22%"  positive icon={UserPlus}    color="#3498db" />
        <KPI label="Churn Rate"        value="3.2%"   delta="-1.1%" positive icon={ArrowDownRight} color="#e74c3c" />
        <KPI label="Shop Revenue"      value="€4.1k"  delta="+15%"  positive icon={ShoppingBag} color="#f5a623" />
        <KPI label="Cert. Sold"        value="18"     delta="+6"    positive icon={Award}       color="#9b59b6" />
      </div>

      {/* Recent activity + Top programs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-display font-bold text-white text-base uppercase mb-4 flex items-center justify-between">
            Recent Members
            <button className="text-xs text-[var(--accent)] font-sans normal-case font-normal">View all</button>
          </h3>
          <div className="space-y-3">
            {['Emma S.','Johan B.','Amira H.','Lars N.','Fatima D.'].map((name, i) => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold text-sm shrink-0">{name[0]}</div>
                <div className="flex-1"><div className="text-sm text-white">{name}</div><div className="text-xs text-[var(--text-muted)]">Joined {['today','yesterday','2d ago','3d ago','5d ago'][i]}</div></div>
                <span className="badge badge-green text-[10px]">Active</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-display font-bold text-white text-base uppercase mb-4">Top Programs</h3>
          <div className="space-y-3">
            {[
              { name: 'MMAFit Original', pct: 92, color: '#e8202f' },
              { name: 'MMAFit Battle',   pct: 88, color: '#ff6b35' },
              { name: 'MMAFit Rhythm',   pct: 76, color: '#9b59b6' },
              { name: 'MMAFit Power',    pct: 71, color: '#f5a623' },
              { name: 'MMAFit Flow',     pct: 58, color: '#27ae60' },
            ].map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">{p.name}</span>
                  <span className="text-white font-medium">{p.pct}%</span>
                </div>
                <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue mini chart */}
      <div className="card p-5">
        <h3 className="font-display font-bold text-white text-base uppercase mb-1">Revenue Last 6 Months</h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">Memberships + Shop + Certifications</p>
        <div className="flex items-end gap-2 h-28">
          {[{ v:18, m:'Nov' },{ v:21, m:'Dec' },{ v:19, m:'Jan' },{ v:22, m:'Feb' },{ v:23, m:'Mar' },{ v:24.8, m:'Apr' }].map((d) => (
            <div key={d.m} className="flex-1 flex flex-col items-center gap-1">
              <div className="text-xs text-[var(--text-secondary)]">{d.m === 'Apr' ? `€${d.v}k` : ''}</div>
              <div className="w-full rounded-t-sm" style={{ height: `${(d.v / 25) * 100}%`, background: d.m === 'Apr' ? 'var(--accent)' : 'var(--bg-card-hover)' }} />
              <span className="text-[10px] text-[var(--text-muted)]">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="font-display font-bold text-white text-base uppercase mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: UserPlus,  label: 'Add Member',   color: 'var(--accent)' },
            { icon: Calendar,  label: 'New Class',    color: '#f5a623' },
            { icon: Mail,      label: 'Send Campaign',color: '#3498db' },
            { icon: FileText,  label: 'Export Report',color: '#27ae60' },
          ].map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => toast.success(`${label} — coming soon`)} className="card p-4 flex flex-col items-center gap-2 hover:border-[var(--border-light)] transition-all text-center">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-xs text-[var(--text-secondary)] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Marketing panel ───────────────────────────────────────────────────────────
function MarketingPanel() {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-white text-2xl uppercase">Marketing Tools</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { icon: Mail,       title: 'Email Campaigns', desc: 'Create and send newsletters to all members or segments. Track opens and clicks.', badge: '3 scheduled', color: '#3498db' },
          { icon: Instagram,  title: 'Social Feed',     desc: 'Schedule and manage Instagram posts for @mmafit.academy. Sync class promos.', badge: 'Live', color: '#e91e8c' },
          { icon: Target,     title: 'Promo Codes',     desc: 'Generate discount codes for membership, shop items, or certification fees.', badge: '12 active', color: '#f5a623' },
          { icon: Megaphone,  title: 'Announcements',   desc: 'Push in-app notifications and SMS to members about new classes or offers.', badge: '', color: 'var(--accent)' },
          { icon: Star,       title: 'Referral Program',desc: 'Manage referral links. Members earn credits when they bring friends.', badge: '48 referrals', color: '#27ae60' },
          { icon: BarChart2,  title: 'Analytics',       desc: 'Track traffic, conversions, and campaign performance across all channels.', badge: '', color: '#9b59b6' },
        ].map(({ icon: Icon, title, desc, badge, color }) => (
          <div key={title} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon size={18} style={{ color }} />
              </div>
              {badge && <span className="badge badge-green text-[10px]">{badge}</span>}
            </div>
            <h3 className="font-display font-bold text-white text-base">{title}</h3>
            <p className="text-[var(--text-secondary)] text-xs mt-1 leading-relaxed">{desc}</p>
            <button onClick={() => toast.success(`${title} — launching soon`)} className="btn-ghost mt-3 text-xs px-0 text-[var(--accent)]">
              Open <ChevronRight size={12} />
            </button>
          </div>
        ))}
      </div>
      {/* Email campaign builder placeholder */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-white text-lg uppercase mb-4">Quick Email</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Segment</label>
            <select className="input-dark">
              <option>All Members (2,418)</option>
              <option>Pro Plan Members (847)</option>
              <option>Elite Members (203)</option>
              <option>Inactive (90+ days)</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Subject</label>
            <input className="input-dark" placeholder="Your subject line…" />
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Message</label>
            <textarea className="input-dark resize-none" rows={4} placeholder="Write your message…" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => toast.success('Email scheduled!')} className="btn-primary">Send Campaign</button>
            <button onClick={() => toast.success('Saved as draft')} className="btn-secondary">Save Draft</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Bookkeeping panel ─────────────────────────────────────────────────────────
function BookkeepingPanel() {
  const TRANSACTIONS = [
    { id: 'T001', type: 'Membership',   member: 'Emma Svensson',   amount: 499,  date: '2026-05-07', status: 'paid',   category: 'Revenue' },
    { id: 'T002', type: 'Shop',         member: 'Johan Berg',      amount: 698,  date: '2026-05-07', status: 'paid',   category: 'Revenue' },
    { id: 'T003', type: 'Membership',   member: 'Amira Hassan',    amount: 299,  date: '2026-05-06', status: 'paid',   category: 'Revenue' },
    { id: 'T004', type: 'Certification',member: 'Marcus Trainer',  amount: 380,  date: '2026-05-06', status: 'paid',   category: 'Revenue' },
    { id: 'T005', type: 'Refund',       member: 'Lars Nilsson',    amount: -299, date: '2026-05-05', status: 'refund', category: 'Refund' },
    { id: 'T006', type: 'Franchise',    member: 'Gym Stockholm AB', amount: 450, date: '2026-05-04', status: 'paid',   category: 'Revenue' },
    { id: 'T007', type: 'Staff Salary', member: 'Sofia Lindqvist', amount: -4500,date: '2026-05-01', status: 'paid',   category: 'Expense' },
    { id: 'T008', type: 'Rent',         member: 'Studio Nord',     amount: -3200,date: '2026-05-01', status: 'paid',   category: 'Expense' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-display font-black text-white text-2xl uppercase">Bookkeeping</h2>
        <button onClick={() => toast.success('Exporting CSV…')} className="btn-secondary text-sm !py-2 !px-4">
          Export CSV
        </button>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Revenue (MTD)"    value="€24.8k" delta="+8%"  positive icon={DollarSign}  color="#27ae60" />
        <KPI label="Expenses (MTD)"   value="€11.2k" delta="-3%"  positive icon={Wallet}      color="var(--accent)" />
        <KPI label="Net Profit (MTD)" value="€13.6k" delta="+14%" positive icon={TrendingUp}  color="#3498db" />
        <KPI label="Outstanding"      value="€840"   delta=""            icon={Clock}       color="#f5a623" />
      </div>
      {/* Transactions table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="font-display font-bold text-white text-base uppercase">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] text-xs uppercase tracking-wide">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Party</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-card-hover)] transition-colors">
                  <td className="p-3 text-[var(--text-muted)] font-mono text-xs">{t.id}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{t.type}</td>
                  <td className="p-3 text-white">{t.member}</td>
                  <td className="p-3 text-[var(--text-muted)] text-xs">{t.date}</td>
                  <td className={`p-3 text-right font-display font-bold text-base ${t.amount > 0 ? 'text-green-400' : 'text-[var(--accent)]'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount} SEK
                  </td>
                  <td className="p-3">
                    <span className={`badge text-[10px] ${
                      t.status === 'paid' ? 'badge-green' :
                      t.status === 'refund' ? 'badge-red' : 'badge-gold'
                    }`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Tax Reports panel ─────────────────────────────────────────────────────────
function TaxPanel() {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-white text-2xl uppercase">Tax Reports & Guidance</h2>
      <div className="card p-5 border-[var(--accent)]/40 bg-[var(--accent)]/5">
        <div className="flex gap-3">
          <Shield size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white text-sm">Swedish Tax Compliance Note</h3>
            <p className="text-[var(--text-secondary)] text-xs mt-1 leading-relaxed">
              MMAFit Sweden is subject to Skatteverket reporting. Membership fees are subject to 25% momsregistrering. Instructor salaries require AG-deklaration.
              This dashboard automates VAT summaries and provides export templates for Skatteverket integration.
            </p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { title: 'Q1 2026 VAT Report', period: 'Jan–Mar 2026', vat: '€4,820', status: 'Filed', color: '#27ae60' },
          { title: 'Q2 2026 VAT Report', period: 'Apr–Jun 2026', vat: '€3,100 (partial)', status: 'Pending', color: '#f5a623' },
          { title: 'FY 2025 Annual',     period: 'Full Year 2025', vat: '€17,240', status: 'Filed', color: '#27ae60' },
          { title: 'Employer Tax',       period: 'May 2026',       vat: '€2,340', status: 'Due Jun 12', color: 'var(--accent)' },
        ].map((r) => (
          <div key={r.title} className="card p-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-white text-base">{r.title}</h3>
              <p className="text-[var(--text-muted)] text-xs mt-0.5">{r.period}</p>
              <p className="text-white text-sm font-semibold mt-2">{r.vat}</p>
            </div>
            <span className="badge text-[10px] shrink-0 mt-1" style={{ background: `${r.color}15`, color: r.color, borderColor: `${r.color}30` }}>{r.status}</span>
          </div>
        ))}
      </div>
      {/* Guidance */}
      <div className="card p-5">
        <h3 className="font-display font-bold text-white text-base uppercase mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-[var(--accent)]" /> Staff Tax Guidance
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Instructor Contracts', text: 'All instructors must be registered as anställda or as F-skatt (sole traders). Ensure Skatteverket registration before first payment.' },
            { title: 'F-skatt vs Salary', text: 'Certified MMAFit instructors running classes independently may invoice via F-skatt. Employed instructors receive payroll with taxes deducted at source.' },
            { title: 'Expense Deductions', text: 'Studio rent, music licensing, equipment, and certification costs are deductible business expenses. Keep all receipts.' },
            { title: 'Moms (VAT)', text: 'Membership fees and shop sales are 25% moms. Export CSV from Bookkeeping tab for monthly momsdeklaration.' },
            { title: 'Annual Reporting', text: 'Submit Årsredovisning via Bolagsverket by June 30 each year. Use the export function below to generate a report for your accountant.' },
          ].map(({ title, text }) => (
            <div key={title} className="py-3 border-b border-[var(--border)] last:border-0">
              <h4 className="text-sm font-semibold text-white">{title}</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <button onClick={() => toast.success('Exporting tax report PDF…')} className="btn-primary mt-5">
          <FileText size={15} /> Export Tax Summary PDF
        </button>
      </div>
    </div>
  )
}

// ── Members panel ─────────────────────────────────────────────────────────────
function MembersPanel() {
  const MEMBERS = [
    { name: 'Emma Svensson',  email: 'emma@test.se',   plan: 'Pro',   status: 'Active',   joined: '2023-03' },
    { name: 'Johan Berg',     email: 'johan@test.se',  plan: 'Elite', status: 'Active',   joined: '2023-06' },
    { name: 'Amira Hassan',   email: 'amira@test.se',  plan: 'Starter',status:'Active',   joined: '2024-01' },
    { name: 'Lars Nilsson',   email: 'lars@test.se',   plan: 'Pro',   status: 'Active',   joined: '2023-08' },
    { name: 'Fatima Diallo',  email: 'fatima@test.se', plan: 'Starter',status:'Inactive', joined: '2024-03' },
    { name: 'Erik Johansson', email: 'erik@test.se',   plan: 'Elite', status: 'Active',   joined: '2022-11' },
  ]
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-display font-black text-white text-2xl uppercase">Members</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input className="input-dark pl-8 py-2 text-sm w-48" placeholder="Search…" />
          </div>
          <button onClick={() => toast.success('Add member — coming soon')} className="btn-primary !py-2 !px-4 !text-sm">
            <UserPlus size={14} /> Add
          </button>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] text-xs uppercase tracking-wide">
                <th className="p-3 text-left">Member</th>
                <th className="p-3 text-left hidden sm:table-cell">Email</th>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-left hidden md:table-cell">Joined</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m) => (
                <tr key={m.email} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-card-hover)] transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] text-xs font-bold shrink-0">{m.name[0]}</div>
                      <span className="text-white font-medium text-sm">{m.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-[var(--text-secondary)] text-xs hidden sm:table-cell">{m.email}</td>
                  <td className="p-3">
                    <span className={`badge text-[10px] ${m.plan === 'Elite' ? 'badge-gold' : m.plan === 'Pro' ? 'badge-red' : ''}`} style={m.plan === 'Starter' ? { background: 'rgba(160,160,160,0.12)', color: '#aaa', borderColor: 'rgba(160,160,160,0.25)' } : {}}>
                      {m.plan}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--text-muted)] text-xs hidden md:table-cell">{m.joined}</td>
                  <td className="p-3">
                    <span className={`badge text-[10px] ${m.status === 'Active' ? 'badge-green' : ''}`} style={m.status === 'Inactive' ? { background: 'rgba(232,32,47,0.12)', color: '#e8202f', borderColor: 'rgba(232,32,47,0.25)' } : {}}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-xs text-[var(--text-muted)] hover:text-white transition-colors">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Staff panel ───────────────────────────────────────────────────────────────
function StaffPanel() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-display font-black text-white text-2xl uppercase">Staff Management</h2>
        <button onClick={() => toast.success('Add staff — coming soon')} className="btn-primary !py-2 !px-4 !text-sm">
          <UserPlus size={14} /> Add Staff
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Bertrand Amoussou', role: 'Co-Founder / Head Trainer', status: 'Active', classes: 12, type: 'F-skatt', salary: '—' },
          { name: 'Kayo Shekoni',      role: 'Co-Founder / Creative Dir', status: 'Active', classes: 10, type: 'F-skatt', salary: '—' },
          { name: 'Sofia Lindqvist',   role: 'Senior Instructor',          status: 'Active', classes: 8,  type: 'Anställd', salary: '32,000 SEK' },
          { name: 'Marcus Holm',       role: 'Strength Coach',             status: 'Active', classes: 9,  type: 'Anställd', salary: '30,000 SEK' },
          { name: 'Admin User',        role: 'Office / Admin',             status: 'Active', classes: 0,  type: 'Anställd', salary: '28,000 SEK' },
        ].map((s) => (
          <div key={s.name} className="card p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold">{s.name[0]}</div>
              <span className="badge badge-green text-[10px]">{s.status}</span>
            </div>
            <h3 className="font-semibold text-white mt-3">{s.name}</h3>
            <p className="text-[var(--text-secondary)] text-xs mt-0.5">{s.role}</p>
            <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-3 gap-2 text-center">
              <div><div className="font-bold text-white text-sm">{s.classes}</div><div className="text-[10px] text-[var(--text-muted)]">Classes/wk</div></div>
              <div><div className="font-bold text-white text-xs">{s.type}</div><div className="text-[10px] text-[var(--text-muted)]">Contract</div></div>
              <div><div className="font-bold text-white text-xs">{s.salary}</div><div className="text-[10px] text-[var(--text-muted)]">Monthly</div></div>
            </div>
            <button onClick={() => toast.success('Edit staff — coming soon')} className="btn-ghost mt-3 text-xs px-0 w-full justify-center">Manage</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'
  const [activePanel, setActivePanel] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const NAV = isAdmin ? ADMIN_NAV : MEMBER_NAV

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-black text-white text-3xl uppercase mb-4">Sign In Required</h2>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    )
  }

  const PANELS: Record<string, React.ReactNode> = {
    overview:    isAdmin ? <AdminOverview /> : <MemberOverview />,
    marketing:   <MarketingPanel />,
    bookkeeping: <BookkeepingPanel />,
    tax:         <TaxPanel />,
    members:     <MembersPanel />,
    staff:       <StaffPanel />,
  }

  const panel = PANELS[activePanel] ?? (
    <div className="card p-8 text-center">
      <h3 className="font-display font-black text-white text-xl uppercase mb-2">{NAV.find(n=>n.id===activePanel)?.label}</h3>
      <p className="text-[var(--text-secondary)] text-sm">This section is coming soon.</p>
    </div>
  )

  // Group admin nav
  const groups = isAdmin
    ? [...new Set(ADMIN_NAV.map((n) => n.group))]
    : ['']

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16 flex">

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-16 h-[calc(100vh-4rem)] z-40
        bg-[var(--bg-secondary)] border-r border-[var(--border)]
        flex flex-col overflow-y-auto
        transition-all duration-300
        ${sidebarOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full md:translate-x-0'}
        md:w-56 shrink-0
      `}>
        {/* User card */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-[var(--text-muted)] truncate capitalize">{user?.role}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-4">
          {groups.map((group) => (
            <div key={group}>
              {group && isAdmin && (
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] px-3 mb-1">{group}</p>
              )}
              {NAV.filter((n) => !isAdmin || n.group === group).map(({ icon: Icon, label, id }) => (
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

        {/* Logout */}
        <div className="p-3 border-t border-[var(--border)]">
          <button
            onClick={() => { logout(); navigate('/') }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)] transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-16 z-20 bg-[var(--bg-primary)]/95 backdrop-blur border-b border-[var(--border)] px-4 md:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[var(--text-secondary)] hover:text-white">
              <LayoutDashboard size={18} />
            </button>
            <span className="font-display font-bold text-white text-sm uppercase tracking-wide">
              {NAV.find((n) => n.id === activePanel)?.label ?? 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[var(--text-secondary)] hover:text-white transition-colors relative">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
            </button>
          </div>
        </div>

        {/* Panel */}
        <div className="p-4 md:p-6 max-w-5xl">
          {panel}
        </div>
      </div>
    </div>
  )
}
