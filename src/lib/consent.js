// src/lib/consent.js
// Cookie consent. Google Analytics (which also measures Google Ads) and
// Microsoft Clarity only start after the visitor accepts. Rejecting or ignoring
// the banner means neither loads.
import ReactGA from 'react-ga4'

const KEY = 'kwe-cookie-consent'
const CLARITY_ID = 'wqoax0o2js'
let trackingOn = false

export function getConsent() {
    try {
        return localStorage.getItem(KEY) // 'granted' | 'denied' | null
    } catch {
        return null
    }
}

function loadClarity() {
    if (document.getElementById('clarity-script')) return
    const script = document.createElement('script')
    script.id = 'clarity-script'
    script.async = true
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
    document.head.appendChild(script)
    window.clarity = window.clarity || function () {
        (window.clarity.q = window.clarity.q || []).push(arguments)
    }
}

export function enableTracking() {
    if (trackingOn) return
    trackingOn = true
    ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)
    loadClarity()
}

export function setConsent(choice) {
    try {
        localStorage.setItem(KEY, choice)
    } catch {
        // Storage blocked: the banner will reappear next visit, which is safe.
    }
    if (choice === 'granted') enableTracking()
}

// Safe to call at any time: events are only sent once the visitor has accepted.
export function trackEvent(args) {
    if (trackingOn) ReactGA.event(args)
}
