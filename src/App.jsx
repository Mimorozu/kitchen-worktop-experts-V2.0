import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import StickyQuoteCTA from './components/StickyQuoteCTA'

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
            <Footer />
            <StickyQuoteCTA />
        </BrowserRouter>
    )
}
