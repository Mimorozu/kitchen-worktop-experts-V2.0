import { useState, useEffect } from 'react'

export default function StickyQuoteCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    const form = document.querySelector('#quote')
    if (!hero || !form) return

    const heroObserver = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.1 }
    )
    const formObserver = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(false) },
      { threshold: 0.2 }
    )

    heroObserver.observe(hero)
    formObserver.observe(form)

    return () => { heroObserver.disconnect(); formObserver.disconnect() }
  }, [])

  return (
    <a
      className={`sticky-cta${visible ? ' sticky-cta--visible' : ''}`}
      href="#quote"
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })
      }}
    >
      Get My Free Quote →
    </a>
  )
}
