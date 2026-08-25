import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import MaterialsPage from './pages/MaterialsPage'
import GuidesPage from './pages/GuidesPage'
import GuidePage from './pages/GuidePage'
import StickyQuoteCTA from './components/StickyQuoteCTA'

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
            </Routes>
            <Footer />
            <StickyQuoteCTA />
        </BrowserRouter>
    )
}
