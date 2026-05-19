// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
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

  return (
    <nav className="navbar" ref={navRef}>
      <p className="navbar__logo">Kitchen Worktop Experts</p>

      {/* Burger menu */}
      <button
        className="navbar__burger"
        onClick={() => setIsOpen(!isOpen)} // on click, isOpen varibale switiches to true
        aria-label="Toggle menu"
      >
        {/* conditional rendering for burger display */}
        {isOpen ? '✕' : '☰'} 
      </button>
     
      <div className={`navbar__links${isOpen ? ' navbar__links--open' : ''}`}>
        <Link className="navbar__link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link className="navbar__link" to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <a className="navbar__phone" href="tel:07389185503" onClick={() => setIsOpen(false)}>07389 185503</a>
        <a className="navbar__cta" href="/#quote" onClick={() => setIsOpen(false)}>Get a Quote</a>
      </div>
    </nav>
  )
}