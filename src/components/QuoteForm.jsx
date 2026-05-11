// src/components/QuoteForm.jsx
import { useState } from 'react'

const MATERIALS = [
    { id: 'quartz', label: 'Quartz' },
    { id: 'granite', label: 'Granite' },
    { id: 'marble', label: 'Marble' },
    { id: 'porcelain', label: 'Porcelain' },
    { id: 'unsure', label: 'Not Sure Yet' },
]

const BUDGETS = [
    { id: '2to3k', label: '£2,000 – £3,000' },
    { id: '3to6k', label: '£3,000 – £6,000' },
    { id: '6to10k', label: '£6,000 – £10,000' },
    { id: '10kplus', label: '£10,000+' },
]

const TIMELINES = [
    { id: 'asap', label: 'As Soon As Possible' },
    { id: '1month', label: 'Within a Month' },
    { id: '3months', label: 'Within 3 Months' },
    { id: 'planning', label: 'Just Planning Ahead' },
]

export default function QuoteForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [answers, setAnswers] = useState({
        material: '',
        budget: '',
        timeline: '',
        name: '',
        email: '',
        phone: '',
        postcode: '',
    })
    function handleAnswer(field, value) {
        setAnswers({ ...answers, [field]: value })
    }

    function nextStep() {
        setStep(step + 1)
    }

    function prevStep() {
        setStep(step - 1)
    }

    async function handleSubmit() {
        setIsSubmitting(true)

        const token = import.meta.env.VITE_AIRTABLE_TOKEN
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID
        const table = import.meta.env.VITE_AIRTABLE_TABLE

        // temporary debug line
        console.log('token:', token, 'baseId:', baseId, 'table:', table)

        try {
            await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields: {
                        Name: answers.name,
                        Email: answers.email,
                        Phone: answers.phone,
                        Postcode: answers.postcode,
                        Material: answers.material,
                        Budget: answers.budget,
                        Timeline: answers.timeline,
                    }
                })
            })

            setStep(5)

        } catch (error) {
            console.error('Submission failed:', error)
            alert('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="form" id="quote">
            <div className="form__inner">

                <div className="form__header">
                    <p className="section__eyebrow">Free Quote</p>
                    <h2 className="section__heading">Get Your Free<br />Worktop Quote</h2>
                    <p className="form__step-indicator">Step {step} of 4</p>
                </div>

                {step === 1 && (
                    <div className="form__step">
                        <h3 className="form__question">What material are you interested in?</h3>
                        <div className="form__options">
                            {MATERIALS.map((m) => (
                                <button
                                    key={m.id}
                                    className={`form__option ${answers.material === m.id ? 'form__option--selected' : ''}`}
                                    onClick={() => handleAnswer('material', m.id)}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                        <button className="form__next" onClick={nextStep} disabled={!answers.material}>
                            Next →
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="form__step">
                        <h3 className="form__question">What is your budget?</h3>
                        <div className="form__options">
                            {BUDGETS.map((b) => (
                                <button
                                    key={b.id}
                                    className={`form__option ${answers.budget === b.id ? 'form__option--selected' : ''}`}
                                    onClick={() => handleAnswer('budget', b.id)}
                                >
                                    {b.label}
                                </button>
                            ))}
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <button className="form__next" onClick={nextStep} disabled={!answers.budget}>Next →</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form__step">
                        <h3 className="form__question">When do you need it fitted?</h3>
                        <div className="form__options">
                            {TIMELINES.map((t) => (
                                <button
                                    key={t.id}
                                    className={`form__option ${answers.timeline === t.id ? 'form__option--selected' : ''}`}
                                    onClick={() => handleAnswer('timeline', t.id)}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <button className="form__next" onClick={nextStep} disabled={!answers.timeline}>Next →</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="form__step">
                        <h3 className="form__question">Almost done — where shall we send your quote?</h3>
                        <div className="form__fields">
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Full Name"
                                value={answers.name}
                                onChange={(e) => handleAnswer('name', e.target.value)}
                            />
                            <input
                                className="form__input"
                                type="email"
                                placeholder="Email Address"
                                value={answers.email}
                                onChange={(e) => handleAnswer('email', e.target.value)}
                            />
                            <input
                                className="form__input"
                                type="tel"
                                placeholder="Phone Number"
                                value={answers.phone}
                                onChange={(e) => handleAnswer('phone', e.target.value)}
                            />
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Postcode"
                                value={answers.postcode}
                                onChange={(e) => handleAnswer('postcode', e.target.value)}
                            />
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <button
                                className="form__next"
                                onClick={handleSubmit}
                                disabled={!answers.name || !answers.email || !answers.phone || !answers.postcode || isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Get My Free Quote →'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="form__success">
                        <p className="form__success-icon">✓</p>
                        <h3 className="form__success-title">Quote Request Received</h3>
                        <p className="form__success-text">
                            A local specialist will contact you within the hour.
                            Check your email for confirmation.
                        </p>
                    </div>
                )}

            </div>
        </section>
    )
}