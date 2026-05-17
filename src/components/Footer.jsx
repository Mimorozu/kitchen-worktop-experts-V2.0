// src/components/Footer.jsx
import { useNavigate, useLocation } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function scrollToQuote() {
    const el = document.getElementById('quote')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  return (
    <footer className="footer">

      <div className="footer__inner">

        <div className="footer__brand">
          <p className="footer__logo">Kitchen Worktop Experts</p>
          <p className="footer__tagline">
            Connecting homeowners with trusted worktop specialists across the West Midlands.
          </p>
        </div>

        <div className="footer__cta">
          <p className="footer__cta-text">Ready to transform your kitchen?</p>
          <button className="footer__button" onClick={scrollToQuote}>
            Get My Free Quote →
          </button>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Kitchen Worktop Experts. All rights reserved.</p>
        <p>Serving Birmingham, Wolverhampton, Coventry & surrounding areas.</p>
      </div>

    </footer>
  )
}