
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CalendarDays,
  Coffee,
  Menu,
  X
} from 'lucide-react'

import './Navbar.css'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Location', href: '/#location' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const homeHref = pathname === '/' ? '#home' : '/'
  const isMenuPage = pathname === '/menu'
  const navigationLinks = isMenuPage
    ? [
      { name: 'Menu', href: '/menu' },
      { name: 'Locations', href: '/#location' },
    ]
    : links.map((link) => (
      link.name === 'Home' ? { ...link, href: homeHref } : link
    ))

  const closeMenu = () => setMobileOpen(false)
  const isActive = (href) => (
    ((href === '/' || href === '#home') && pathname === '/') ||
    (href === '/menu' && pathname === '/menu')
  )

  return (
    <header className={`site-header${isMenuPage ? ' menu-site-header' : ''}`}>

      <nav className="navbar">

        <Link
          className="brand"
          to={homeHref}
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <Coffee size={39} strokeWidth={1.5} />
          </span>

          <span className="brand-name">
            The Coffee Chapter
          </span>
        </Link>

        <div className="desktop-nav">

          {navigationLinks.map((link) => (
            <Link
              className={`nav-link${isActive(link.href) ? ' active' : ''}`}
              to={link.href}
              key={link.name}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}

          <Link
            className={`reserve-button${isMenuPage ? ' menu-reserve-button' : ''}`}
            to="/reservation"
          >
            <CalendarDays size={17} />
            <span>Reserve a Table</span>
          </Link>

        </div>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={
            mobileOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen
            ? <X size={25} />
            : <Menu size={25} />
          }
        </button>

      </nav>

      {mobileOpen && (
        <div className="mobile-nav">

          {navigationLinks.map(link => (
            <Link
              className={isActive(link.href) ? 'active' : ''}
              to={link.href}
              key={link.name}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}

          <Link
            className={`reserve-button${isMenuPage ? ' menu-reserve-button' : ''}`}
            to="/reservation"
            onClick={closeMenu}
          >
            <CalendarDays size={17} />
            Reserve a Table
          </Link>

        </div>
      )}

    </header>
  )
}

export default Navbar
