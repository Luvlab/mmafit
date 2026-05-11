import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import CartSidebar from './components/CartSidebar'
import { useAuthStore } from './store/authStore'

import HomePage from './pages/HomePage'
import ProgramsPage from './pages/ProgramsPage'
import SchedulePage from './pages/SchedulePage'
import TrainersPage from './pages/TrainersPage'
import MembershipPage from './pages/MembershipPage'
import ShopPage from './pages/ShopPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CertificationPage from './pages/CertificationPage'
import FranchisePage from './pages/FranchisePage'
import AccountPage from './pages/AccountPage'

// VITE_APP_MODE: "admin" | "crew" | undefined (public)
const APP_MODE = import.meta.env.VITE_APP_MODE as string | undefined

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PortalRoot() {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <Navigate to="/login" replace />
}

// All public site routes — reused for both background render and normal render
function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/trainers" element={<TrainersPage />} />
      <Route path="/membership" element={<MembershipPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/certification" element={<CertificationPage />} />
      <Route path="/franchise" element={<FranchisePage />} />
      {/* Direct /login access without background state — full page */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<HomePage />} />
    </>
  )
}

function Layout() {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location } | null
  const bgLocation = state?.backgroundLocation

  // Modal mode: public site, at /login, navigated with backgroundLocation state
  const isLoginModal = !APP_MODE && location.pathname === '/login' && !!bgLocation

  // Hide navbar on full-page login/register (not when modal) or in portal mode
  const hideNav = (!isLoginModal && ['/login', '/register'].includes(location.pathname)) || !!APP_MODE

  return (
    <>
      {!isLoginModal && <ScrollToTop />}
      {!hideNav && <Navbar />}
      <CartSidebar />

      <main className="page-content">
        <Routes location={bgLocation ?? location}>
          {APP_MODE ? (
            // Portal mode — login is always full-page
            <>
              <Route path="/" element={<PortalRoot />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <PublicRoutes />
          )}
        </Routes>
      </main>

      {!hideNav && <Footer />}
      {!hideNav && <MobileTabBar />}

      {/* Login modal overlay — only on public site when backgroundLocation is set */}
      {isLoginModal && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
