// src/components/Hero.jsx


export default function Hero() {
  return (
    <section className="hero">

      <div className="hero__content">
        <p className="hero__eyebrow">
          Serving Birmingham & the West Midlands
        </p>
        <h1 className="hero__headline">
          Get Your Kitchen Worktop Fitted. Fast.
        </h1>
        <p className="hero__sub">
          Quartz, granite & marble from trusted local specialists.
          Free quotes in under 60 seconds.
        </p>
        <button
          className="hero__cta"
          onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
        >
          Get My Free Quote →
        </button>
      </div>

      <div className="hero__gallery">
            <img src='public/gold-tap.jpg' className="hero__gallery-img"/>
      </div>

    </section>
  )
}