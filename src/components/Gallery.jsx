// src/components/Gallery.jsx
import { useState, useEffect } from 'react'

const COLOURS = [
    {
        id: 'bqs-capri',
        name: 'BQS Capri',
        slab_image: '/capri-full-slab.png',
        kitchen_image: '/capri-kitchen.png',
    },
    {
        id: 'bqs-bianco-fontana',
        name: 'BQS Bianco Fontana',
        slab_image: '/fontana-full-slab.png',
        kitchen_image: '/fontana-kitchen.png',
    },
    {
        id: 'bqs-grey-suede',
        name: 'BQS Grey Suede',
        slab_image: '/grey-suede-slab.png',
        kitchen_image: '/grey-suede-kitchen.png',
    },
    {
        id: 'bqs-crema-fiore',
        name: 'BQS Crema Fiore',
        slab_image: '/crema-fiore-slab.png',
        kitchen_image: '/crema-fiore-kitchen.png',
    },
]

export default function Gallery() {
    const [activeImage, setActiveImage] = useState(null)

    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') setActiveImage(null)
        }
        if (activeImage) document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [activeImage])

    return (
        <section className="gallery" id="gallery">

            <div className="gallery__header">
                <p className="section__eyebrow">Gallery</p>
                <h2 className="section__heading">Most Popular Designs</h2>
            </div>

            <div className="gallery-flex-cont">
                <div className="gallery__tiles">
                    {COLOURS.map((colour) => (
                        <div className="gallery__tile" key={colour.id}>
                            <div className="gallery__slab">
                                <img
                                    src={colour.slab_image}
                                    alt={colour.name}
                                    onClick={() => setActiveImage(colour.slab_image)}
                                />
                            </div>
                            <div className="gallery__kitchen">
                                <img
                                    src={colour.kitchen_image}
                                    alt={`${colour.name} in kitchen`}
                                    onClick={() => setActiveImage(colour.kitchen_image)}
                                />
                            </div>
                            <div className="gallery__info">
                                <span className="gallery__name">{colour.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {activeImage && (
                <div className="lightbox" onClick={() => setActiveImage(null)}>
                    <button className="lightbox__close" onClick={() => setActiveImage(null)}>✕</button>
                    <img
                        className="lightbox__img"
                        src={activeImage}
                        alt=""
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

        </section>
    )
}
