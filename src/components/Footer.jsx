// src/components/Footer.jsx
import { useNavigate } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Materials', path: '/materials' },
  { label: 'Guides', path: '/guides' },
]

const AREAS = [
  'Birmingham', 'Wolverhampton', 'Coventry',
  'Dudley', 'Walsall', 'Solihull',
]

export default function Footer() {
  const navigate = useNavigate() // navigate user programatically 

  // function to scroll the user to the quote form
  function scrollTo(id) {
    const el = document.getElementById(id) // get the quote form with element by ID
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' }) // if el is true use a built in function to smmoothly scroll the viewport to the element
    } else {
      navigate('/') // if not found, navigate home where the quote form is
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) //wait 150ms for the page to render and try and scroll again
      }, 150)
    }
  }

  return (
    <footer className="footer">

      <div className="footer__inner">

        {/* Brand column */}
        <div className="footer__brand">
          <div className="footer__wordmark">
            <span className="footer__wordmark-top">Kitchen Worktop</span>
            <span className="footer__wordmark-rule" />
            <span className="footer__wordmark-bottom">Experts</span>
          </div>
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

        {/* CTA card */}
        <div className="footer__cta">
          <p className="footer__cta-heading">Get quotes from your local specialists</p>
          <p className="footer__cta-sub">Free, no-obligation. Takes 2 minutes.</p>
          <button className="footer__button" onClick={() => scrollTo('quote')}>
            Get My Free Quote →
          </button>
        </div>

        {/* Quick links row */}
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
