import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import CafeSections from '../components/CafeSections'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import OrderOnlineSection from '../components/OrderOnlineSection'
import Reservation from '../components/Reservation'
import SiteFooter from '../components/SiteFooter'
import Menu from '../pages/Menu'

function HomePage() 
{
  return (
    <>
      <Hero />
      <CafeSections />
      <OrderOnlineSection />
    </>
  )
}

function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = pathname === '/menu'
      ? 'Our Menu | The Coffee Chapter'
      : pathname === '/reservation'
        ? 'Reserve a Table | The Coffee Chapter'
        : 'The Coffee Chapter | Coffee, Comfort, Connection'

    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView()
      })
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function AppRoutes() {
  return (
    <>
      <RouteEffects />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </>
  )
}

export default AppRoutes
