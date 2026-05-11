// src/components/Hero.jsx



export default function Hero() {
  return (
    <section className="hero">

      <p className="hero__eyebrow">
        Serving Birmingham & the West Midlands
      </p>

      <h1 className="hero__headline">
        Get Your Kitchen Worktop <br />
        Fitted. Fast.
      </h1>

      <p className="hero__sub">
        Quartz, granite & marble from trusted local specialists.
        Free quotes, hassle free
      </p>

      <button
        className="hero__cta"
        onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
      >
        Get My Free Quote →
      </button>

      <p className="hero__proof">
        A decade of experience supplying quality worktops
      </p>

    </section>
  )
}