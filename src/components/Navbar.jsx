// src/components/Navbar.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom' // mavigating with code

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false) // variable staring as falsy

  return (
    <nav className="navbar">
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
     
      <div className={`navbar__links${isOpen ? ' navbar__links--open' : ''}`}>  {/* toogling class names */}
        <Link className="navbar__link" to="/" onClick={() => setIsOpen(false)}>Home</Link> {/* navigate + close burger */}
        <Link className="navbar__link" to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <a className="navbar__cta" href="/#quote" onClick={() => setIsOpen(false)}>Get a Quote</a>
      </div>
    </nav>
  )
}