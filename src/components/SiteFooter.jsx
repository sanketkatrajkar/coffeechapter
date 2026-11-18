import { Clock3, Coffee, Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import './SiteFooter.css'

const currentYear = new Date().getFullYear()

function SiteFooter() {
  const { pathname } = useLocation()
  const topLink = pathname === '/' ? '#home' : '/'
  const brandLink = pathname === '/' ? '#home' : '/'

  if (pathname === '/') {
    return (
      <footer className="site-footer site-footer--home">
        <div className="site-footer-grid">
          <div className="footer-brand-column">
            <Link className="footer-brand" to="/#home">
              <Coffee size={24} aria-hidden="true" />
              The Coffee Chapter
            </Link>
            <p className="footer-description">
              Thoughtfully brewed coffee, good food, and a welcoming place to
              slow down and enjoy the moment.
            </p>
            <p className="footer-tagline">Coffee · Comfort · Connection</p>
          </div>

          <nav className="footer-column" aria-label="Quick links">
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/#home">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/#story">About</Link></li>
              <li><Link to="/#location">Location</Link></li>
              <li><Link to="/reservation">Reserve a Table</Link></li>
            </ul>
          </nav>

          <div className="footer-column footer-contact">
            <h2>Contact</h2>
            <p>
              <MapPin size={16} aria-hidden="true" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=The+Coffee+Chapter+Karvenagar"
                target="_blank"
                rel="noreferrer"
              >
                Karvenagar outlet
              </a>
            </p>
            <p><MapPin size={16} aria-hidden="true" /><span>Full street address to be provided</span></p>
            <p><Phone size={16} aria-hidden="true" /><span>Phone number to be provided</span></p>
            <p><Mail size={16} aria-hidden="true" /><span>Email address to be provided</span></p>
            <p><Clock3 size={16} aria-hidden="true" /><span>Opening hours to be confirmed</span></p>
          </div>

          <div className="footer-column footer-social">
            <h2>Social Media</h2>
            <p>Official profile links to be provided.</p>
            <div className="footer-social-placeholders" aria-label="Social profile placeholders">
              <span aria-disabled="true" title="Add official social profile URLs">
                <Share2 size={18} aria-hidden="true" />
                <span>Profile links to be provided</span>
              </span>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© {currentYear} The Coffee Chapter. All Rights Reserved.</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    )
  }

  return (
    <footer className="site-footer site-footer--compact">
      <Link className="footer-brand" to={brandLink}>
        <Coffee size={22} aria-hidden="true" />
        The Coffee Chapter
      </Link>
      <p>Coffee · Comfort · Connection</p>
      {topLink === '#home' ? (
        <a href={topLink}>Back to top ↑</a>
      ) : (
        <Link to={topLink}>Back to top ↑</Link>
      )}
    </footer>
  )
}

export default SiteFooter
