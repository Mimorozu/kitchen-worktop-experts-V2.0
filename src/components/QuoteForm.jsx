// src/components/QuoteForm.jsx
import { useState } from 'react'
import ReactGA from 'react-ga4'

const MATERIALS = [
    { id: 'quartz', label: 'Quartz' },
    { id: 'granite', label: 'Granite' },
    { id: 'marble', label: 'Marble' },
    { id: 'porcelain', label: 'Porcelain' },
    { id: 'unsure', label: 'Not Sure Yet' },
]

const SIZES = [
    { id: 'small', label: 'Small', description: 'Worktop runs only', src: '/kitchen-small.webp' },
    { id: 'medium', label: 'Medium', description: 'Small island and worktops', src: '/medium-kitchen.webp' },
    { id: 'large', label: 'Large', description: 'Large island and worktops', src: '/kitchen-large.webp' },
]

// Step order: material → size → postcode → contact
const STEP_NAMES = {
    1: 'material',
    2: 'size',
    3: 'postcode',
    4: 'contact',
}

export default function QuoteForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [answers, setAnswers] = useState({
        material: '',
        size: '',
        postcode: '',
        name: '',
        email: '',
        phone: '',
    })

    function trackStep(stepNumber, stepName) {
        ReactGA.event({
            category: 'Lead',
            action: 'form_step',
            label: stepName,
            value: stepNumber,
        })
    }

    function handleAnswer(field, value) {
        if (field === 'material' && !answers.material) {
            ReactGA.event({ category: 'Lead', action: 'form_started' })
        }
        setAnswers(prev => ({ ...prev, [field]: value }))
    }

    function nextStep() {
        trackStep(step, STEP_NAMES[step])
        setStep(s => s + 1)
    }

    function prevStep() {
        setStep(s => s - 1)
    }

    function selectOption(field, value) {
        handleAnswer(field, value)
        if (!window.matchMedia('(pointer: coarse)').matches) return
        setTimeout(nextStep, 300)
    }

    async function handleSubmit() {
        setIsSubmitting(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_CRM_API_URL}/api/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_CRM_API_KEY
                },
                body: JSON.stringify({
                    name: answers.name,
                    email: answers.email,
                    postcode: answers.postcode,
                    material: answers.material,
                    size: answers.size,
                    phone: answers.phone || 'Not provided',
                    source: 'Website'
                })
            })

            if (!response.ok) {
                throw new Error(`Lead submission failed with status ${response.status}`)
            }

            ReactGA.event({
                category: 'Lead',
                action: 'form_submitted',
                label: answers.material,
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
            <div className="form__header-outer">
                <div className="pricing__header">
                    <p className="section__eyebrow">Free Quote</p>
                    <h2 className="section__heading">Want An Estimate<br /> For Your Kitchen?</h2>
                </div>
            </div>

            <div className="form__inner">

                <div className="form__header">
                    <div className="form__social-proof">
                        <span className="form__stars">★★★★★</span>
                        <span>Trusted by 120+ Birmingham homeowners</span>
                    </div>
                    <p className="form__urgency">Fitting slots available from June — book early to secure yours</p>
                    <p className="form__reassurance">Free · No obligation · Takes 60 seconds</p>
                    {step < 5 && (
                        <div className="form__progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4} aria-label={`Step ${step} of 4`}>
                            <p className="form__progress-label">Step {step} of 4</p>
                            <div className="form__progress-track">
                                <div className="form__progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 1 — Material */}
                {step === 1 && (
                    <div className="form__step">
                        <h3 className="form__question">What material are you interested in?</h3>
                        <p className="form__note">Not a commitment — can be changed at any time.</p>
                        <div className="form__options">
                            {MATERIALS.map((m) => (
                                <button
                                    key={m.id}
                                    className={`form__option ${answers.material === m.id ? 'form__option--selected' : ''}`}
                                    onClick={() => selectOption('material', m.id)}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                        <button className="form__next form__next--auto-advance" onClick={nextStep} disabled={!answers.material}>
                            Next →
                        </button>
                    </div>
                )}

                {/* Step 2 — Kitchen size */}
                {step === 2 && (
                    <div className="form__step">
                        <h3 className="form__question">What size is your kitchen?</h3>
                        <div className="form__sizes">
                            {SIZES.map((s) => (
                                <button
                                    key={s.id}
                                    className={`form__size-option ${answers.size === s.id ? 'form__size-option--selected' : ''}`}
                                    onClick={() => selectOption('size', s.id)}
                                >
                                    <img src={s.src} alt={s.label} className="form__size-img" loading="lazy" />
                                    <span className="form__size-label">{s.label}</span>
                                    <span className="form__size-desc">{s.description}</span>
                                </button>
                            ))}
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <button className="form__next form__next--auto-advance" onClick={nextStep} disabled={!answers.size}>Next →</button>
                        </div>
                    </div>
                )}

                {/* Step 3 — Postcode */}
                {step === 3 && (
                    <div className="form__step">
                        <h3 className="form__question">What is your postcode?</h3>
                        <p className="form__note">We use this to match you with a local specialist.</p>
                        <div className="form__fields">
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Postcode"
                                autoComplete="postal-code"
                                value={answers.postcode}
                                onChange={(e) => handleAnswer('postcode', e.target.value)}
                            />
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <button className="form__next" onClick={nextStep} disabled={!answers.postcode}>Next →</button>
                        </div>
                    </div>
                )}

                {/* Step 4 — Contact */}
                {step === 4 && (
                    <div className="form__step">
                        <h3 className="form__question">Almost done — where shall we send your quote?</h3>
                        <p className="form__note">No spam. Ever. We only use your details for your quote.</p>
                        <div className="form__fields">
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Full Name"
                                autoComplete="name"
                                value={answers.name}
                                onChange={(e) => handleAnswer('name', e.target.value)}
                            />
                            <input
                                className="form__input"
                                type="email"
                                placeholder="Email Address"
                                autoComplete="email"
                                value={answers.email}
                                onChange={(e) => handleAnswer('email', e.target.value)}
                            />
                            <input
                                className="form__input"
                                type="tel"
                                placeholder="Phone Number"
                                autoComplete="tel"
                                value={answers.phone}
                                onChange={(e) => handleAnswer('phone', e.target.value)}
                            />
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <button
                                className="form__next"
                                onClick={handleSubmit}
                                disabled={!answers.name || !answers.email || !answers.phone || isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Get My Free Quote →'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 5 — Success */}
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
