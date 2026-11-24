import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getConsent, enableTracking } from './lib/consent'
import './index.css'
import App from './App.jsx'

// Only start analytics and session recording if the visitor has already accepted.
if (getConsent() === 'granted') enableTracking()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
