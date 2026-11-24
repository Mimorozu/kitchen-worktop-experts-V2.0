// src/pages/QuartzBirminghamPage.jsx
// Landing page for paid search traffic (quartz worktops Birmingham).
// Puts the quote form near the top so ad visitors don't have to scroll the homepage.
import Seo from '../components/Seo'
import QuoteForm from '../components/QuoteForm'
import { BeforeAfterSlider } from '../components/RecentWorks'
import GoogleReviews from '../components/GoogleReviews'

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
          <p className="section__eyebrow">Kitchen Worktop Experts</p>
          <h1 className="lp-hero__heading">Dreaming of a quartz kitchen in Birmingham?</h1>
          <p className="lp-hero__sub">We help you choose your stone and install it. Free quote in 60 seconds, no obligation.</p>
          <div className="lp-hero__compare">
            <BeforeAfterSlider
              before="/bad-kitchen.jpeg"
              after="/good-kitchen.jpg"
              alt="Solihull Kitchen Renovation"
            />
          </div>
        </div>
      </section>

      <div className="lp-cta-band">
        <button className="lp-hero__cta" onClick={scrollToQuote}>Get My Free Quote →</button>
      </div>

      <GoogleReviews />


      <QuoteForm />
    </>
  )
}
