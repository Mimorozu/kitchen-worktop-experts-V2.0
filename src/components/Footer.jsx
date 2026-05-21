// src/components/Footer.jsx
import { useNavigate } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Materials', path: '/materials' },
]

const AREAS = [
  'Birmingham', 'Wolverhampton', 'Coventry',
  'Dudley', 'Walsall', 'Solihull',
]

export default function Footer() {
  const navigate = useNavigate()

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  return (
    <footer className="footer">

      {/* Gold accent line at top */}
      <div className="footer__accent" />

      <div className="footer__inner">

        {/* Brand column */}
        <div className="footer__brand">
          <p className="footer__logo">Kitchen Worktop Experts</p>
          <p className="footer__tagline">
            Supplying homeowners with luxury worktops across the West Midlands.
          </p>
          <div className="footer__contact">
            <a href="tel:+441213456789" className="footer__contact-link">
              📞 07389 185503
            </a>
            <a href="mailto:hello@kitchenworktopexperts.co.uk" className="footer__contact-link">
              ✉ office@kitchenworktopexperts.co.uk
            </a>
          </div>
        </div>

        {/* Quick links column */}
        <nav className="footer__links" aria-label="Footer navigation">
          <p className="footer__col-heading">Quick Links</p>
          <ul className="footer__link-list">
            {QUICK_LINKS.map(({ label, path }) => (
              <li key={path}>
                <button className="footer__link" onClick={() => { navigate(path); window.scrollTo(0, 0) }}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA column */}
        <div className="footer__cta">
          <p className="footer__cta-heading">Get quotes from your local specialists</p>
          <p className="footer__cta-sub">Free, no-obligation. Takes 2 minutes.</p>
          <button className="footer__button" onClick={() => scrollTo('quote')}>
            Get My Free Quote →
          </button>
        </div>

      </div>

      {/* Service areas strip */}
      <div className="footer__areas">
        <span className="footer__areas-label">Serving:</span>
        {AREAS.map((area, i) => (
          <span key={area} className="footer__area">
            {area}{i < AREAS.length - 1 ? ' · ' : ''}
          </span>
        ))}
        <span className="footer__area"> & surrounding areas</span>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Kitchen Worktop Experts. All rights reserved.</p>
        <p>Website by <span className="footer__credit">KWE Digital</span></p>
      </div>

    </footer>
  )
}
