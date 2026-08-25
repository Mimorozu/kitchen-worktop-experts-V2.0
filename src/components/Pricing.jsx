// src/components/Pricing.jsx

const TIERS = [
  {
    name: 'The Essentials',
    price: 'From £2,700',
    services: [
      'Supply',
      'Template', 
      'Cut & install',
    ],
  },
  {
    name: 'Designer',
    price: 'From £6,000',
    featured: true,
    services: [
      'Supply',
      'Template', 
      'Cut & install',
      '1 on 1 design session',
      '3D Immersive Experience'
    ],
  },
  {
    name: 'Premium +',
    price: 'From £15,000',
    services: [
      'Catalogue available on request'
    ],
  },
]

export default function Pricing() {
  return (
    <section className="pricing">

      <div className="pricing__header">
        <p className="section__eyebrow">Packages</p>
        <h2 className="section__heading">Find Your Perfect Fit</h2>
      </div>

      <div className="pricing__grid">
        {TIERS.map((tier) => (
          <div className={`pricing__card${tier.featured ? ' pricing__card--featured' : ''}`} key={tier.name}>
            <h3 className="pricing__name">{tier.name}</h3>
            <p className="pricing__price">{tier.price}</p>

            <ul className="pricing__services">
              {tier.services.map((service) => (
                <li className="pricing__service" key={service}>{service}</li>
              ))}
            </ul>

            <button
              className="pricing__cta"
              onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
            >
              Get My Free Quote
            </button>
          </div>
        ))}
      </div>

    </section>
  )
}
