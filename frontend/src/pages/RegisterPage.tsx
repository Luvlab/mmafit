import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const PERKS = ['First class free', 'No commitment required', 'Cancel anytime', 'Join 2,400+ members']

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    login({ id: '2', email: form.email, name: form.name, role: 'member', membershipTier: 'starter', joinedAt: new Date().toISOString() }, 'new-token')
    toast.success('Welcome to MMAFit! 🥊')
    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-primary)]/90 to-[var(--bg-primary)]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[var(--accent)]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Back to site
        </Link>

        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          {/* Left — perks */}
          <div className="hidden md:block">
            <Link to="/" className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center">
                <span className="font-display font-black text-white text-lg">M</span>
              </div>
              <span className="font-display font-black text-white text-2xl uppercase tracking-tight">MMAFit</span>
            </Link>
            <h2 className="font-display font-black text-white text-5xl uppercase leading-tight">
              Start Fighting<br /><span className="text-gradient">For Yourself</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-4 mb-8 text-sm leading-relaxed">
              Join thousands of members who've discovered what it means to move with power, rhythm, and joy.
            </p>
            <ul className="space-y-3">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                  <CheckCircle size={16} className="text-[var(--accent)] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="card p-7">
            <Link to="/" className="flex items-center gap-2 mb-6 md:hidden">
              <div className="w-8 h-8 bg-[var(--accent)] rounded flex items-center justify-center">
                <span className="font-display font-black text-white text-sm">M</span>
              </div>
              <span className="font-display font-black text-white text-xl uppercase">MMAFit</span>
            </Link>
            <h1 className="font-display font-black text-white text-3xl uppercase mb-1">Create Account</h1>
            <p className="text-[var(--text-secondary)] text-sm mb-7">Your first class is free</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Full Name</label>
                <input type="text" value={form.name} onChange={set('name')} className="input-dark" placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Email</label>
                <input type="email" value={form.email} onChange={set('email')} className="input-dark" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Password</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} value={form.password} onChange={set('password')} className="input-dark pr-10" placeholder="Min. 8 characters" required minLength={8} />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)]">By creating an account you agree to our Terms of Service and Privacy Policy.</p>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
                {loading ? 'Creating account…' : 'Start for Free'}
              </button>
            </form>
            <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
              Already a member?{' '}
              <Link to="/login" className="text-[var(--accent)] hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
