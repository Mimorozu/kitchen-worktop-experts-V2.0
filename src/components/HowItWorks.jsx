// src/components/HowItWorks.jsx

const STEPS = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    description: 'Fill in our 60-second quote form. Postcode, Material and size — that\'s all we need.',
  },
  {
    number: '02',
    title: 'Get Your Price Instantly',
    description: 'We can provide you with an estimate based on the information you give us.',
  },
  {
    number: '03',
    title: 'Get Your Worktop Fitted',
    description: 'Your specialist emails you to confirm your design and arrange a template and fit. It\'s that easy.'
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