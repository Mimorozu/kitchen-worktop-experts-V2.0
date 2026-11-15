// src/pages/QuartzBirminghamPage.jsx
// Landing page for paid search traffic (quartz worktops Birmingham).
// Puts the quote form near the top so ad visitors don't have to scroll the homepage.
import Seo from '../components/Seo'
import QuoteForm from '../components/QuoteForm'

const POINTS = [
  { title: 'Local to Birmingham', text: 'Based in the West Midlands, so we can visit, measure and fit without long delays.' },
  { title: 'Free, no-obligation quote', text: 'Tell us your material, kitchen size and postcode. A local specialist gets back to you.' },
  { title: 'Supply and fit', text: 'Quartz, granite, marble and porcelain worktops, supplied and fitted by our team.' },
]

const MATERIALS = ['Quartz', 'Granite', 'Marble', 'Porcelain']

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Quartz worktop supply and fitting, Birmingham',
  serviceType: 'Kitchen worktop installation',
  areaServed: { '@type': 'City', name: 'Birmingham' },
  provider: { '@type': 'LocalBusiness', name: 'Kitchen Worktop Experts', url: 'https://www.kitchenworktopexperts.co.uk' },
}

export default function QuartzBirminghamPage() {
  const scrollToQuote = () => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Seo
        title="Quartz Worktops Birmingham | Free Quote | Kitchen Worktop Experts"
        description="Quartz worktops supplied and fitted in Birmingham and the West Midlands. Free, no-obligation quote from local specialists. Get your estimate in 60 seconds."
        path="/quartz-worktops-birmingham"
        jsonLd={jsonLd}
      />

      <section className="lp-hero">
        <div className="lp-hero__inner">
          <p className="section__eyebrow">Birmingham &amp; West Midlands</p>
          <h1 className="lp-hero__heading">Get your custom quote in 60 seconds</h1>
          <p className="lp-hero__sub">Free quote in 60 seconds. No obligation. We supply and fit your worktops.</p>
          <button className="lp-hero__cta" onClick={scrollToQuote}>Get My Free Quote →</button>
          <p className="lp-hero__phone">Or call <a href="tel:07389185503">07389 185503</a></p>
        </div>
      </section>

      <section className="lp-points">
        {POINTS.map((p) => (
          <div className="lp-point" key={p.title}>
            <h2 className="lp-point__title">{p.title}</h2>
            <p className="lp-point__text">{p.text}</p>
          </div>
        ))}
      </section>

      <section className="lp-materials">
        <p className="section__eyebrow">Materials</p>
        <h2 className="section__heading">Choose Your Worktop Material</h2>
        <ul className="lp-materials__list">
          {MATERIALS.map((m) => (
            <li key={m} className="lp-materials__item">{m}</li>
          ))}
        </ul>
        <p className="lp-materials__note">Not sure yet? Tell us your kitchen and we'll help you choose.</p>
      </section>

      <QuoteForm />
    </>
  )
}
