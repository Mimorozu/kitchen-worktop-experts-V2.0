import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4' // Google analytics
import './index.css'
import App from './App.jsx'

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID) // Google analytics

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
