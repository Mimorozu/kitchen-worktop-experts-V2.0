// src/components/Footer.jsx

export default function Footer() {
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
          <button
            className="footer__button"
            onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
          >
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