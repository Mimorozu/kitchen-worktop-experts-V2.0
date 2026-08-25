import Seo from '../components/Seo'
import Gallery from '../components/Gallery'

export default function GalleryPage() {
    return (
        <>
            <Seo
                title="Gallery | Kitchen Worktop Experts"
                description="Browse our most popular quartz and granite worktop designs — real slabs and fitted kitchens across Birmingham and the West Midlands."
                path="/gallery"
            />
            <Gallery />
        </>
    )
}
