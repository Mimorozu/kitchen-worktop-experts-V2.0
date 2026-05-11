import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import HowItWorks from './components/HowItWorks'
import QuoteForm from './components/QuoteForm'
import Navbar from './components/Navbar'
            import Footer from './components/Footer'


export default function App() {
    return (
        <div>
            <Navbar />
            <Hero />
            <TrustBar />
            <HowItWorks />
            <QuoteForm />
            <Footer />
        </div>
    )
}