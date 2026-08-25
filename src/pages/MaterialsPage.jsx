import Seo from '../components/Seo'
import Materials from '../components/Materials'

export default function MaterialsPage() {
    return (
        <>
            <Seo
                title="Our Materials | Kitchen Worktop Experts"
                description="Explore our full range of quartz, granite and marble worktop colours — filter by colour to find the right stone for your kitchen."
                path="/materials"
            />
            <Materials />
        </>
    )
}
