// src/components/Statement.jsx
import { Fragment } from 'react'
import { useScrollReveal } from './useScrollReveal'

const EYEBROW = 'Point of View'

// Placeholder copy — swap once the client signs off on messaging.
const LEAD = "Choosing from a small sample isn't a decision, it's a guess."
const SUPPORT = "We take the guesswork out: you see your kitchen, with your stone in it, before a single cut is made."

export default function Statement() {
  const ref = useScrollReveal()

  return (
    <div className="statement">
      <div ref={ref} className="statement__text">
        <p className="section__eyebrow statement__eyebrow">
          <Words text={EYEBROW} />
        </p>
        <p className="statement__lead">
          <Words text={LEAD} />
        </p>
        <p className="statement__support">
          <Words text={SUPPORT} />
        </p>
        <button
          className="statement__cta"
          data-word
          onClick={() => document.getElementById('quote').scrollIntoView({ behavior: 'smooth' })}
        >
          Get My Free Quote
        </button>
      </div>
    </div>
  )
}

function Words({ text }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="statement__word" data-word>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </>
  )
}
