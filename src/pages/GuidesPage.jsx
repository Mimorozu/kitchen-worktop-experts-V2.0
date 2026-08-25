import Seo from '../components/Seo'
import Guides from '../components/Guides'

export default function GuidesPage() {
    return (
        <>
            <Seo
                title="Guides | Kitchen Worktop Experts"
                description="Guides on quartz worktop costs, choosing a material, comparing brands, and installation and aftercare — for homeowners across Birmingham and the West Midlands."
                path="/guides"
            />
            <Guides />
        </>
    )
}
