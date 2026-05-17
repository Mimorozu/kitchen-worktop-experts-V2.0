// src/components/Navbar.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <p className="navbar__logo">Kitchen Worktop Experts</p>

      <button
        className="navbar__burger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <div className={`navbar__links${isOpen ? ' navbar__links--open' : ''}`}>
        <Link className="navbar__link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link className="navbar__link" to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <a className="navbar__cta" href="/#quote" onClick={() => setIsOpen(false)}>Get a Quote</a>
      </div>
    </nav>
  )
}