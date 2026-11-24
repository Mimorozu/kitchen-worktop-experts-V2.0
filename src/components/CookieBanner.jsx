// src/components/CookieBanner.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getConsent, setConsent } from '../lib/consent'

export default function CookieBanner() {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(() => getConsent() === null)

    if (!visible) return null

    function choose(value) {
        setConsent(value)
        setVisible(false)
    }

    return (
        <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
            <p className="cookie-banner__text">
                We use cookies to understand how our site is used and to measure our advertising.
                You can accept or reject them. <button className="cookie-banner__link" onClick={() => navigate('/cookies')}>Cookie Notice</button>
            </p>
            <div className="cookie-banner__actions">
                <button className="cookie-banner__btn cookie-banner__btn--ghost" onClick={() => choose('denied')}>Reject</button>
                <button className="cookie-banner__btn" onClick={() => choose('granted')}>Accept</button>
            </div>
        </div>
    )
}
