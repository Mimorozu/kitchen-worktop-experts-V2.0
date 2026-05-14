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

const QUARTZ_STYLES = [
    {
        id: 'marble-effect',
        label: 'Marble Effect',
        description: 'Soft veining, elegant look',
        src: '/marble-effect.png',
        position: 'center 55%',
    },
    {
        id: 'subtle-pattern',
        label: 'Subtle Pattern',
        description: 'Delicate texture, versatile',
        src: '/subtle-pattern.png',
        position: 'center 30%',
    },
    {
        id: 'minimalist',
        label: 'Minimalist',
        description: 'Clean, solid, modern',
        src: '/minimalist.png',
        position: 'center bottom',
    },
]

const SIZES = [
    {
        id: 'small',
        label: 'Small',
        description: 'Worktop runs, only',
        src: '/kitchen-small.png',
    },
    {
        id: 'medium',
        label: 'Medium',
        description: 'Small island and worktops',
        src: '/medium-kitchen.jpg',
    },
    {
        id: 'large',
        label: 'Large',
        description: 'Large Island and worktops',
        src: '/kitchen-large.jpg',
    },
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

// Maps each step number to a readable name for GA4
const STEP_NAMES = {
    1: 'material',
    2: 'size',
    3: 'photo',
    4: 'budget',
    5: 'timeline',
    6: 'contact',
}

export default function QuoteForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showQuartzStyles, setShowQuartzStyles] = useState(false)
    const [uploadedFile, setUploadedFile] = useState(null)
    const [uploadedUrl, setUploadedUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [answers, setAnswers] = useState({
        material: '',
        quartzStyle: '',
        size: '',
        budget: '',
        timeline: '',
        name: '',
        email: '',
        phone: '',
        postcode: '',
    })

    // Fires a step-level GA4 event so we can see drop-off in the funnel
    function trackStep(stepNumber, stepName) {
        ReactGA.event({
            category: 'Lead',
            action: 'form_step',
            label: stepName,
            value: stepNumber,
        })
    }

    function handleAnswer(field, value) {
        // Fire form_started the very first time a user selects a material —
        // this tells us how many people engaged with the form vs just scrolled past
        if (field === 'material' && !answers.material) {
            ReactGA.event({
                category: 'Lead',
                action: 'form_started',
            })
        }

        setAnswers({ ...answers, [field]: value })

        if (field === 'material' && value === 'quartz') {
            setShowQuartzStyles(true)
        }
        if (field === 'material' && value !== 'quartz') {
            setShowQuartzStyles(false)
            setAnswers(prev => ({ ...prev, quartzStyle: '', material: value }))
        }
    }

    function nextStep() {
        // Track which step the user just completed before advancing
        trackStep(step, STEP_NAMES[step])
        setStep(step + 1)
    }

    function prevStep() {
        setStep(step - 1)
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0]
        if (!file) return

        setIsUploading(true)
        setUploadedFile(file)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )
            const data = await response.json()
            setUploadedUrl(data.secure_url)

        } catch (error) {
            console.error('Upload failed:', error)
            alert('File upload failed. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    async function handleSubmit() {
        if (isUploading) return
        setIsSubmitting(true)

        const token = import.meta.env.VITE_AIRTABLE_TOKEN
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID
        const table = import.meta.env.VITE_AIRTABLE_TABLE

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
                        Quartzstyle: answers.quartzStyle,
                        Size: answers.size,
                        Budget: answers.budget,
                        Timeline: answers.timeline,
                        Photo: uploadedUrl || '',
                    }
                })
            })

            // This fires only after Airtable confirms success —
            // so a gap between form_step:contact and form_submitted
            // means the submission itself is failing
            ReactGA.event({
                category: 'Lead',
                action: 'form_submitted',
                label: answers.material,
            })

            setStep(7)

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
                    <p className="form__step-indicator">Step {step} of 6</p>
                </div>

                {step === 1 && (
                    <div className="form__step">
                        {!showQuartzStyles ? (
                            <>
                                <h3 className="form__question">
                                    What material are you interested in?
                                </h3>
                                <p className="form__note">
                                    This is not a commitment and can be changed at any time.
                                </p>
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
                                <button
                                    className="form__next"
                                    onClick={nextStep}
                                    disabled={!answers.material}
                                >
                                    Next →
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="form__question">
                                    Which quartz style interests you?
                                </h3>
                                <p className="form__note">
                                    This is not a commitment and can be changed at any time.
                                </p>
                                <div className="form__sizes">
                                    {QUARTZ_STYLES.map((s) => (
                                        <button
                                            key={s.id}
                                            className={`form__size-option ${answers.quartzStyle === s.id ? 'form__size-option--selected' : ''}`}
                                            onClick={() => handleAnswer('quartzStyle', s.id)}
                                        >
                                            <img
                                                src={s.src}
                                                alt={s.label}
                                                className="form__size-img"
                                                style={{ objectPosition: s.position }}
                                            />
                                            <span className="form__size-label">{s.label}</span>
                                            <span className="form__size-desc">{s.description}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="form__nav">
                                    <button
                                        className="form__back"
                                        onClick={() => setShowQuartzStyles(false)}
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        className="form__next"
                                        onClick={nextStep}
                                        disabled={!answers.quartzStyle}
                                    >
                                        Next →
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="form__step">
                        <h3 className="form__question">What size is your kitchen?</h3>
                        <div className="form__sizes">
                            {SIZES.map((s) => (
                                <button
                                    key={s.id}
                                    className={`form__size-option ${answers.size === s.id ? 'form__size-option--selected' : ''}`}
                                    onClick={() => handleAnswer('size', s.id)}
                                >
                                    <img
                                        src={s.src}
                                        alt={s.label}
                                        className="form__size-img"
                                    />
                                    <span className="form__size-label">{s.label}</span>
                                    <span className="form__size-desc">{s.description}</span>
                                </button>
                            ))}
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <button className="form__next" onClick={nextStep} disabled={!answers.size}>Next →</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form__step">
                        <h3 className="form__question">
                            Got a photo or plan of your kitchen?
                        </h3>
                        <p className="form__note">
                            This helps us prepare a more accurate quote.
                            If you don't have one, you can skip this step.
                        </p>
                        <div className="form__upload">
                            <label className="form__upload-label" htmlFor="file-upload">
                                {uploadedFile ? (
                                    <div className="form__upload-success">
                                        <span className="form__upload-icon">✓</span>
                                        <span className="form__upload-filename">{uploadedFile.name}</span>
                                        {isUploading && <span className="form__upload-status">Uploading...</span>}
                                        {uploadedUrl && <span className="form__upload-status">Uploaded ✓</span>}
                                    </div>
                                ) : (
                                    <div className="form__upload-placeholder">
                                        <span className="form__upload-icon">↑</span>
                                        <span className="form__upload-text">Click to upload a photo or PDF</span>
                                        <span className="form__upload-hint">JPG, PNG, WEBP or PDF · Max 10MB</span>
                                    </div>
                                )}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,application/pdf"
                                onChange={handleFileUpload}
                                className="form__upload-input"
                            />
                        </div>
                        <div className="form__nav">
                            <button className="form__back" onClick={prevStep}>← Back</button>
                            <div className="form__nav-right">
                                <button className="form__skip" onClick={nextStep}>
                                    Skip →
                                </button>
                                <button
                                    className="form__next"
                                    onClick={nextStep}
                                    disabled={isUploading}
                                >
                                    {isUploading ? 'Uploading...' : 'Next →'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
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

                {step === 5 && (
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

                {step === 6 && (
                    <div className="form__step">
                        <h3 className="form__question">Almost done — where shall we send your quote?</h3>
                        <p className="form__note">
                            No spam. Ever. We only use your details for your quote.
                        </p>
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

                {step === 7 && (
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