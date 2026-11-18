import { ArrowUpRight } from 'lucide-react'
import './OrderOnlineSection.css'

const orderUrls = {
  zomato: 'ADD_OFFICIAL_ZOMATO_URL_HERE',
  swiggy: 'ADD_OFFICIAL_SWIGGY_URL_HERE',
}

function OrderPartner({ name, label, url }) {
  const isConfigured = /^https?:\/\//i.test(url)
  const className = `order-partner order-partner--${name}`
  const content = (
    <>
      <span className="order-partner-mark" aria-hidden="true">{name === 'zomato' ? '🍕' : '🛵'}</span>
      <span>{label}</span>
      {isConfigured && <ArrowUpRight size={18} aria-hidden="true" />}
    </>
  )

  if (!isConfigured) {
    return (
      <span
        className={`${className} order-partner--unavailable`}
        aria-disabled="true"
        title={`Add The Coffee Chapter's official ${label.replace('Order on ', '')} URL to enable ordering`}
      >
        {content}
      </span>
    )
  }

  return (
    <a className={className} href={url} target="_blank" rel="noreferrer">
      {content}
    </a>
  )
}

function OrderOnlineSection() {
  return (
    <section className="order-online-section page-section" aria-labelledby="order-online-title">
      <div className="order-online-card">
        <div className="order-online-copy">
          <p className="order-online-eyebrow">Good coffee, just a click away</p>
          <h2 id="order-online-title">Order Online</h2>
          <p className="order-online-subtitle">
            Your favourite coffee and delicious bites are just a click away!
          </p>
          <div className="order-online-actions">
            <div className="order-online-partners">
              <OrderPartner name="zomato" label="Order on Zomato" url={orderUrls.zomato} />
              <OrderPartner name="swiggy" label="Order on Swiggy" url={orderUrls.swiggy} />
            </div>
            <p className="order-online-note">
              Ordering links will be available once the official restaurant URLs are provided.
            </p>
          </div>
        </div>
        <div className="order-online-visual">
          <img
            src="/photos/delivery-rider.svg"
            alt="Delivery rider on a red scooter with a coffee delivery box"
            width="760"
            height="620"
          />
        </div>
      </div>
    </section>
  )
}

export default OrderOnlineSection
