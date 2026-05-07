import { Link, useLocation } from 'react-router-dom'
import { Home, CalendarDays, Users, ShoppingBag, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const TABS = [
  { label: 'Home',     href: '/',          icon: Home },
  { label: 'Schedule', href: '/schedule',  icon: CalendarDays },
  { label: 'Trainers', href: '/trainers',  icon: Users },
  { label: 'Shop',     href: '/shop',      icon: ShoppingBag },
]

export default function MobileTabBar() {
  const { pathname } = useLocation()
  const { isAuthenticated } = useAuthStore()

  const tabs = isAuthenticated
    ? [...TABS, { label: 'Me', href: '/dashboard', icon: LayoutDashboard }]
    : TABS

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[var(--bg-secondary)]/95 backdrop-blur-md border-t border-[var(--border)] safe-area-pb">
      <div className="flex items-stretch h-16">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              to={href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
