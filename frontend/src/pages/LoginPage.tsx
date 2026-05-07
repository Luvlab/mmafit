import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Demo login
    await new Promise((r) => setTimeout(r, 800))
    login({ id: '1', email, name: email.split('@')[0], role: 'member', joinedAt: new Date().toISOString() }, 'demo-token')
    toast.success('Welcome back!')
    navigate('/dashboard')
    setLoading(false)
  }

  const demoLogin = () => {
    login({ id: '99', email: 'admin@mmafit.se', name: 'Admin', role: 'admin', membershipTier: 'elite', joinedAt: new Date().toISOString() }, 'admin-token')
    toast.success('Logged in as Admin')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-primary)]/90 to-[var(--bg-primary)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--accent)]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center p-4">
        {/* Back link */}
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Back to site
        </Link>

        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-10">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center">
              <span className="font-display font-black text-white text-lg">M</span>
            </div>
            <span className="font-display font-black text-white text-2xl uppercase tracking-tight">MMAFit</span>
          </Link>

          <div className="card p-7">
            <h1 className="font-display font-black text-white text-3xl uppercase mb-1">Welcome Back</h1>
            <p className="text-[var(--text-secondary)] text-sm mb-7">Sign in to your account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-dark"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1.5 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-dark pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <Link to="#" className="text-xs text-[var(--accent)] hover:underline">Forgot password?</Link>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 relative flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-xs text-[var(--text-muted)]">or</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>
            <button onClick={demoLogin} className="btn-secondary w-full justify-center text-sm">
              Demo — Admin Login
            </button>

            <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
              New to MMAFit?{' '}
              <Link to="/register" className="text-[var(--accent)] hover:underline font-medium">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
