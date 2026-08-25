import Seo from '../components/Seo'
import Hero from '../components/Hero'
// import TrustBar from '../components/TrustBar' // kept for later use
import Statement from '../components/Statement'
import RecentWorks from '../components/RecentWorks'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'
import QuoteForm from '../components/QuoteForm'

export default function Home() {
    return (
        <>
            <Seo
                title="Quartz & Granite Kitchen Worktops Birmingham | Kitchen Worktop Experts"
                description="Premium quartz and granite kitchen worktops supply and fit in Birmingham and the West Midlands. Get a free quote from trusted local worktop specialists. Fast installation, expert fitting."
                path="/"
            />
            <Hero />
            {/* <TrustBar /> */}
            <Statement />
            <RecentWorks />
            <Pricing />
            <HowItWorks />

            <QuoteForm />
        </>
    )
}
