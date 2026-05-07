import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import CartSidebar from './components/CartSidebar'

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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const HIDE_NAV = ['/login', '/register']

function Layout() {
  const { pathname } = useLocation()
  const hideNav = HIDE_NAV.includes(pathname)

  return (
    <>
      <ScrollToTop />
      {!hideNav && <Navbar />}
      <CartSidebar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!hideNav && <Footer />}
      {!hideNav && <MobileTabBar />}
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
