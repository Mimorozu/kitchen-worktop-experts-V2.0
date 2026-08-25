// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'

const INTRO_SEEN_KEY = 'kwe-intro-seen'

function getInitialIntroStage(pathname) {
  if (pathname !== '/') return 'done'
  if (typeof window === 'undefined') return 'done'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
  if (sessionStorage.getItem(INTRO_SEEN_KEY)) return 'done'
  return 'pending'
}

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const logoRef = useRef(null)
  const introMarkRef = useRef(null)
  const { pathname } = useLocation()
  const isStatic = pathname === '/materials' || pathname === '/gallery' || pathname.startsWith('/guides')

  const [stage, setStage] = useState(() => getInitialIntroStage(pathname))

  useEffect(() => {
    if (stage === 'done') {
      delete document.body.dataset.intro
    } else {
      document.body.dataset.intro = stage
    }
  }, [stage])

  // Load intro: overlay logo fades in centered, pauses, then flies/shrinks
  // into the real navbar logo's position before the rest of the nav and
  // hero content reveal.
  useEffect(() => {
    // Only orchestrate on the initial mount when the load intro is due to
    // play. Internal setStage calls advance the sequence without re-running
    // or tearing down this effect.
    if (stage !== 'pending') return

    const overlayEl = introMarkRef.current
    const targetEl = logoRef.current
    if (!overlayEl || !targetEl) {
      setStage('done')
      return
    }

    sessionStorage.setItem(INTRO_SEEN_KEY, '1')

    let cancelled = false
    const timers = []
    const animations = []

    const fadeIn = overlayEl.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 1300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
    )
    animations.push(fadeIn)

    fadeIn.onfinish = () => {
      if (cancelled) return
      timers.push(setTimeout(() => {
        if (cancelled) return

        const overlayRect = overlayEl.getBoundingClientRect()
        const targetRect = targetEl.getBoundingClientRect()
        const dx = (targetRect.left + targetRect.width / 2) - (overlayRect.left + overlayRect.width / 2)
        const dy = (targetRect.top + targetRect.height / 2) - (overlayRect.top + overlayRect.height / 2)
        const startScale = getComputedStyle(document.documentElement).getPropertyValue('--intro-logo-scale').trim() || '4.5'

        const flight = overlayEl.animate(
          [
            { transform: `scale(${startScale})` },
            { transform: `translate(${dx}px, ${dy}px) scale(1)` }
          ],
          { duration: 1500, easing: 'cubic-bezier(0.65, 0, 0.15, 1)', fill: 'forwards' }
        )
        animations.push(flight)

        flight.onfinish = () => {
          if (cancelled) return
          setStage('nav')
          timers.push(setTimeout(() => {
            if (cancelled) return
            setStage('hero')
            timers.push(setTimeout(() => {
              if (cancelled) return
              setStage('done')
            }, 1300))
          }, 750))
        }
      }, 900))
    }

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      animations.forEach((a) => a.cancel())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (!isOpen) return
      const insideNav = navRef.current && navRef.current.contains(e.target)
      const insideMenu = menuRef.current && menuRef.current.contains(e.target)
      if (!insideNav && !insideMenu) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  function snapToTop() {
    window.scrollTo(0, 0)
  }

  return (
    <nav className={`navbar${isStatic ? ' navbar--static' : ''}${isScrolled ? ' navbar--scrolled' : ''}`} ref={navRef}>
      <div className="navbar__nav-links">
        <Link className="navbar__link" to="/" onClick={snapToTop}>Home</Link>
        <Link className="navbar__link" to="/gallery" onClick={snapToTop}>Gallery</Link>
        <Link className="navbar__link" to="/materials" onClick={snapToTop}>Materials</Link>
        <Link className="navbar__link" to="/guides" onClick={snapToTop}>Guides</Link>
      </div>

      <Link className="navbar__logo" to="/" ref={logoRef} onClick={snapToTop}>
        <span className="navbar__logo-top">Kitchen Worktop</span>
        <span className="navbar__logo-rule" />
        <span className="navbar__logo-bottom">Experts</span>
      </Link>

      <div className="navbar__actions">
        <a className="navbar__phone" href="tel:07389185503">07389 185503</a>
        <a className="navbar__cta" href="/#quote">Get a Quote</a>
      </div>

      {/* Burger menu */}
      <button
        className="navbar__burger"
        onClick={() => setIsOpen(!isOpen)} // on click, isOpen varibale switiches to true
        aria-label="Toggle menu"
      >
        {/* conditional rendering for burger display */}
        {isOpen ? '✕' : '☰'}
      </button>

      {createPortal(
        <div className={`navbar__links${isOpen ? ' navbar__links--open' : ''}`} ref={menuRef}>
          <Link className="navbar__link" to="/" onClick={() => { setIsOpen(false); snapToTop() }}>Home</Link>
          <Link className="navbar__link" to="/gallery" onClick={() => { setIsOpen(false); snapToTop() }}>Gallery</Link>
          <Link className="navbar__link" to="/materials" onClick={() => { setIsOpen(false); snapToTop() }}>Materials</Link>
          <Link className="navbar__link" to="/guides" onClick={() => { setIsOpen(false); snapToTop() }}>Guides</Link>
          <a
            className="navbar__whatsapp"
            href="https://wa.me/447389185503?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20my%20kitchen%20worktop."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            <span className="navbar__whatsapp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
              </svg>
            </span>
            Message on WhatsApp
          </a>
          <a className="navbar__cta" href="/#quote" onClick={() => setIsOpen(false)}>Get a Quote</a>
        </div>,
        document.body
      )}

      {stage === 'pending' && (
        <div className="intro-logo-overlay" aria-hidden="true">
          <div className="intro-logo-overlay__mark" ref={introMarkRef}>
            <span className="navbar__logo-top">Kitchen Worktop</span>
            <span className="navbar__logo-rule" />
            <span className="navbar__logo-bottom">Experts</span>
          </div>
        </div>
      )}
    </nav>
  )
}
