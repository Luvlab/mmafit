import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Shield, Users, UserCheck } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

// Portal configuration per VITE_APP_MODE
const APP_MODE = import.meta.env.VITE_APP_MODE as string | undefined

const PORTAL_CONFIG = {
  admin: {
    label: 'Admin Portal',
    subtitle: 'MMAFit Operations — Founders & Management',
    icon: Shield,
    color: '#e8202f',
    allowedRoles: ['admin', 'super_admin'],
    denyMessage: 'Admin portal access is restricted to management accounts.',
  },
  crew: {
    label: 'Crew Portal',
    subtitle: 'MMAFit Crew — Staff & Instructors',
    icon: UserCheck,
    color: '#9b59b6',
    allowedRoles: ['staff', 'trainer', 'super_admin'],
    denyMessage: 'Crew portal is for staff and certified instructors only.',
  },
} as const

const portalCfg = APP_MODE ? PORTAL_CONFIG[APP_MODE as keyof typeof PORTAL_CONFIG] : null

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const SA_EMAILS = ['g@luvlab.io', 'gordoncyrus@gmail.com']
  const SA_PASS = import.meta.env.VITE_SA_PASS || ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const emailLower = email.toLowerCase().trim()

    // Super admin
    if (SA_EMAILS.includes(emailLower)) {
      if (!SA_PASS || password !== SA_PASS) {
        toast.error('Invalid credentials')
        setLoading(false)
        return
      }
      login({ id: '00', email: emailLower, name: 'Gordon Cyrus', role: 'super_admin', joinedAt: new Date().toISOString() }, 'sa-token')
      toast.success('Welcome, Gordon.')
      navigate('/dashboard')
      setLoading(false)
      return
    }

    // Default → member for public site
    login({ id: '1', email: emailLower, name: email.split('@')[0], role: 'member', joinedAt: new Date().toISOString() }, 'demo-token')
    toast.success('Welcome back!')
    navigate('/dashboard')
    setLoading(false)
  }

  // All 4 demo roles — filtered by portal mode
  const allDemoLogins = [
    { label: 'Member',  role: 'member'  as const, id: '10', email: 'anna@example.com',   name: 'Anna Lindström',    tier: 'pro'   as const, icon: '👤' },
    { label: 'Trainer', role: 'trainer' as const, id: '30', email: 'diana@mmafit.se',    name: 'Diana Svensson',    tier: undefined,         icon: '🥊' },
    { label: 'Staff',   role: 'staff'   as const, id: '20', email: 'staff@mmafit.se',    name: 'Staff Member',      tier: undefined,         icon: '🏥' },
    { label: 'Admin',   role: 'admin'   as const, id: '99', email: 'admin@mmafit.se',    name: 'Admin',             tier: 'elite' as const,  icon: '⚙️' },
  ]

  // Filter demos based on portal mode
  const demoLogins = portalCfg
    ? allDemoLogins.filter(d => (portalCfg.allowedRoles as readonly string[]).includes(d.role))
    : allDemoLogins

  const handleDemo = (d: typeof allDemoLogins[0]) => {
    // Portal role guard
    if (portalCfg && !(portalCfg.allowedRoles as readonly string[]).includes(d.role)) {
      toast.error(portalCfg.denyMessage)
      return
    }
    login({ id: d.id, email: d.email, name: d.name, role: d.role, membershipTier: d.tier, joinedAt: new Date().toISOString() }, `demo-${d.role}-token`)
    toast.success(`Logged in as ${d.label}`)
    navigate('/dashboard')
  }

  const PortalIcon = portalCfg?.icon

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-primary)]/90 to-[var(--bg-primary)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ background: portalCfg ? `${portalCfg.color}12` : 'rgba(232,32,47,0.08)' }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center p-4">
        {!APP_MODE && (
          <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back to site
          </Link>
        )}

        <div className="w-full max-w-sm">
          {/* Logo / Portal branding */}
          <div className="flex flex-col items-center gap-2 mb-10">
            {portalCfg ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: portalCfg.color }}>
                    {PortalIcon && <PortalIcon size={20} className="text-white" />}
                  </div>
                  <span className="font-display font-black text-white text-2xl uppercase tracking-tight">MMAFit</span>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: portalCfg.color }}>{portalCfg.label}</div>
                  <div className="text-[var(--text-muted)] text-[10px] mt-0.5">{portalCfg.subtitle}</div>
                </div>
              </>
            ) : (
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center">
                  <span className="font-display font-black text-white text-lg">M</span>
                </div>
                <span className="font-display font-black text-white text-2xl uppercase tracking-tight">MMAFit</span>
              </Link>
            )}
          </div>

          <div className="card p-7">
            {/* Portal access notice */}
            {portalCfg && (
              <div className="mb-5 px-3 py-2.5 rounded-lg border text-xs text-center"
                style={{ borderColor: `${portalCfg.color}30`, background: `${portalCfg.color}08`, color: portalCfg.color }}>
                <Users size={12} className="inline mr-1.5" />
                Access restricted to {portalCfg.allowedRoles.filter(r => r !== 'super_admin').join(' & ')} accounts
              </div>
            )}

            <h1 className="font-display font-black text-white text-3xl uppercase mb-1">Welcome Back</h1>
            <p className="text-[var(--text-secondary)] text-sm mb-7">Sign in to your account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-dark" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Password</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-dark pr-10" placeholder="••••••••" required />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link to="#" className="text-xs text-[var(--accent)] hover:underline">Forgot password?</Link>
                {!APP_MODE && <Link to="/register" className="text-xs text-[var(--text-secondary)] hover:text-white">Create account →</Link>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2"
                style={portalCfg ? { background: portalCfg.color } : {}}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="relative flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-xs text-[var(--text-muted)]">quick demo</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            <div className={`grid gap-2 ${demoLogins.length <= 2 ? 'grid-cols-2' : demoLogins.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {demoLogins.map((d) => (
                <button key={d.role} onClick={() => handleDemo(d)}
                  className="btn-secondary justify-center text-xs py-2.5 flex items-center gap-1.5">
                  <span>{d.icon}</span> {d.label}
                </button>
              ))}
            </div>

            {!APP_MODE && (
              <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
                New to MMAFit?{' '}
                <Link to="/register" className="text-[var(--accent)] hover:underline font-medium">Create account</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
