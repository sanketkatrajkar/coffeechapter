import { ArrowRight, Coffee, MapPin } from 'lucide-react'
import CafeStorySection from './CafeStorySection'
import Reservation from './Reservation'
import './CafeSections.css'

const menuItems = [
  {
    name: 'Velvet Cappuccino',
    description: 'Rich espresso, silky steamed milk, and a soft dusting of cocoa.',
    category: 'A cafe favorite',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85',
    alt: 'Cappuccino with delicate latte art',
  },
  {
    name: 'Honey Oat Latte',
    description: 'A smooth espresso classic with oat milk and a touch of honey.',
    category: 'A little sweetness',
    image:
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=85',
    alt: 'Iced coffee with milk',
  },
  {
    name: 'The Daily Pour',
    description: 'Freshly brewed, thoughtfully sourced, and ready for your day.',
    category: 'Brewed fresh',
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=85',
    alt: 'Fresh coffee being prepared in a cafe',
  },
]

function CafeSections() {
  return (
    <>
      <section className="menu-section page-section" id="menu">
        <div className="section-heading">
          <p className="section-eyebrow">Good things, freshly made</p>
          <h2>A few of our <em>favorites.</em></h2>
          <p className="section-intro">
            From your first morning coffee to a slow afternoon treat, find
            something made for the moment.
          </p>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <article className="menu-card" key={item.name}>
              <div className="menu-card-image">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="menu-card-number">0{index + 1}</span>
              </div>
              <div className="menu-card-copy">
                <p className="menu-card-category">{item.category}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CafeStorySection />

      <section className="story-section page-section" id="story">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85"
            alt="Warm, welcoming coffee shop interior"
            loading="lazy"
          />
          <div className="story-image-note">
            <Coffee size={20} aria-hidden="true" />
            <span>A little pause in your day</span>
          </div>
        </div>
        <div className="story-copy">
          <p className="section-eyebrow">A place to slow down</p>
          <h2>More than coffee.<br />A moment <em>to yourself.</em></h2>
          <p>
            We believe the best days are made of little things: a familiar
            favorite, a new discovery, and the time to enjoy it. The Coffee
            Chapter is here for all of them.
          </p>
          <a className="text-link" href="#location">
            Come say hello <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <Reservation />

      <section className="visit-section page-section" id="location">
        <div className="visit-card">
          <div className="visit-copy">
            <p className="section-eyebrow">Your next coffee break</p>
            <h2>We saved you<br />a <em>little moment.</em></h2>
            <p>
              Stop by for a fresh cup, a favorite bite, and a warm welcome.
              We can’t wait to see you.
            </p>
            <a
              className="visit-button"
              href="https://www.google.com/maps/search/?api=1&query=The+Coffee+Chapter+Karvenagar"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={17} aria-hidden="true" />
              Find us on the map
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="visit-details">
            <div className="visit-detail-icon">
              <MapPin size={22} aria-hidden="true" />
            </div>
            <h3>Find us in Karvenagar</h3>
            <p>
              Visit our Karvenagar outlet for a fresh cup, a favorite bite,
              and a warm welcome.
            </p>
            <a href="#reserve">
              Reserve a table <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

    </>
  )
}

export default CafeSections
