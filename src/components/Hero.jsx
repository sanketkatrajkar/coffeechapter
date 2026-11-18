
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <main>

      <section className="hero" id="home">

        {/* LEFT CONTENT */}

        <div className="hero-copy">

          <p className="eyebrow">
            <span />
            Welcome to our cafe
          </p>

          <h1>
            Every Cup
            <br />
            Has A <em>Story.</em>
          </h1>

          <p className="hero-description">
            Freshly brewed coffee, delicious bites
            <br className="desktop-break" />
            and moments worth remembering.
          </p>

          <div className="hero-actions">

            <Link
              className="primary-action"
              to="/menu"
            >
              Explore Our Menu
              <ArrowRight size={19} />
            </Link>

            <a
              className="story-action"
              href="#story"
            >
              <span className="play-icon">
                <Play
                  size={15}
                  fill="currentColor"
                />
              </span>

              Watch Our Story
            </a>

          </div>

          <div className="hero-footer">

            <span />

            <p>
              Coffee · Comfort · Connection
            </p>

            <span />

          </div>

        </div>

        {/* RIGHT IMAGE SECTION */}

        <div
          className="hero-visual"
          aria-label="Freshly brewed coffee"
        >

          <div className="visual-backdrop" />

          <div className="coffee-photo">
            <img
              src="/photos/HeroSectionfirst.jpg"
              alt="The Coffee Chapter cafe entrance"
            />
          </div>

          <div className="iced-photo">
            <img
              src="/photos/HeroSectionsecond.jpg"
              alt="A cup of coffee with latte art"
            />
          </div>

          <div
            className="coffee-beans-decoration"
            aria-hidden="true"
          >
            ❧
          </div>

        </div>

      </section>

    </main>
  )
}

export default Hero
