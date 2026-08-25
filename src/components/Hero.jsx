// src/components/Hero.jsx


export default function Hero() {
  return (
    <section className="hero">

      <div className="hero__content">
        <p className="hero__eyebrow">
        Birmingham's Worktop Specialists
        </p>
        <h1 className="hero__headline">
          Let's make your vision a reality
        </h1>
        <p className="hero__sub">
          Quartz, granite & marble from trusted suppliers
        </p>
        
        {/* call to action button + scroll to element by ID */}
        <button
          className="hero__cta"
          onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
        >
          Get My Free Quote →
        </button>
        <p className="hero__reassurance">Free · No obligation · Takes 60 seconds</p>
      </div>

      <div className="hero__gallery">
        <img src='/hero-img.jpg' className="hero__gallery-img" fetchpriority="high" alt="Kitchen worktop" />
      </div>

    </section>
  )
}