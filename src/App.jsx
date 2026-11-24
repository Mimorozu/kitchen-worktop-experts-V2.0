import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import MaterialsPage from './pages/MaterialsPage'
import GuidesPage from './pages/GuidesPage'
import GuidePage from './pages/GuidePage'
import QuartzBirminghamPage from './pages/QuartzBirminghamPage'
import LegalPage from './pages/LegalPage'
import { LEGAL_DOCS } from './data/legal'
import StickyQuoteCTA from './components/StickyQuoteCTA'
import CookieBanner from './components/CookieBanner'

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/materials" element={<MaterialsPage />} />
                <Route path="/guides" element={<GuidesPage />} />
                <Route path="/guides/:slug" element={<GuidePage />} />
                <Route path="/quartz-worktops-birmingham" element={<QuartzBirminghamPage />} />
                <Route path="/privacy" element={<LegalPage doc={LEGAL_DOCS.privacy} />} />
                <Route path="/terms" element={<LegalPage doc={LEGAL_DOCS.terms} />} />
                <Route path="/cookies" element={<LegalPage doc={LEGAL_DOCS.cookies} />} />
            </Routes>
            <Footer />
            <StickyQuoteCTA />
            <CookieBanner />
        </BrowserRouter>
    )
}
