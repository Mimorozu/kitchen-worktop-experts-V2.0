// src/components/HowItWorks.jsx

const STEPS = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    description: 'Fill in our 60-second quote form. Material, size, budget and postcode — that\'s all we need.',
  },
  {
    number: '02',
    title: 'We Match You Instantly',
    description: 'We connect you with the best local specialist for your area and budget. No middlemen, no markup.',
  },
  {
    number: '03',
    title: 'Get Your Worktop Fitted',
    description: 'Your specialist contacts you within the hour to arrange a site visit. Most installs happen within the week.',
  },
]

export default function HowItWorks() {
  return (
    <section className="hiw">

      <div className="hiw__header">
        <p className="section__eyebrow">The Process</p>
        <h2 className="section__heading">From Quote to Kitchen<br />in Three Steps</h2>
      </div>

      <div className="hiw__steps">
        {STEPS.map((step) => (
          <div className="hiw__step" key={step.number}>
            <span className="hiw__number">{step.number}</span>
            <h3 className="hiw__title">{step.title}</h3>
            <p className="hiw__desc">{step.description}</p>
          </div>
        ))}
      </div>

    </section>
  )
}