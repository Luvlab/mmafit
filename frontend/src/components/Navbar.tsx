import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Classes', href: '/programs' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Membership', href: '/membership' },
  { label: 'Certification', href: '/certification' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const { pathname } = location
  const { isAuthenticated, user, logout } = useAuthStore()
  const { count, toggleCart } = useCartStore()
  const cartCount = count()

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      <div className="container-app flex items-center justify-between h-16 md:h-18">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[var(--accent)] rounded flex items-center justify-center">
            <span className="font-display font-black text-white text-sm leading-none">M</span>
          </div>
          <span className="font-display font-black text-white text-2xl tracking-tight uppercase leading-none">
            MMAFit
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href ? 'text-white' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCart}
            className="relative p-2 text-[var(--text-secondary)] hover:text-white transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
              </button>
              <div className="absolute top-full right-0 mt-1 w-44 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/dashboard" className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card-hover)] transition-colors">Dashboard</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card-hover)] transition-colors">Sign out</button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" state={{ backgroundLocation: location }} className="btn-ghost text-sm">Sign in</Link>
              <Link to="/register" className="btn-primary !py-2 !px-4 !text-sm">Join Now</Link>
            </div>
          )}

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white transition-colors"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[var(--bg-secondary)] border-t border-[var(--border)] px-4 pt-4 pb-6 space-y-1 animate-slide-down">
          {NAV.map((item) => (
            <Link key={item.href} to={item.href} className="block py-3 text-[var(--text-secondary)] hover:text-white border-b border-[var(--border)] last:border-0 text-sm">
              {item.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="pt-4 flex flex-col gap-3">
              <Link to="/login" state={{ backgroundLocation: location }} className="btn-secondary w-full justify-center">Sign in</Link>
              <Link to="/register" className="btn-primary w-full justify-center">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
