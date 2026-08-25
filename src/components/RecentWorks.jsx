// src/components/RecentWorks.jsx
import { useRef, useState } from 'react'

// Placeholder pairings from the existing photo library — swap in real
// before/after shots from finished jobs once they're available.
const PROJECTS = [
    {
        id: 'solihull-refit',
        title: 'Solihull Kitchen Renovation',
        before: '/bad-kitchen.jpeg',
        after: '/good-kitchen.jpg',
    },
    {
        id: 'edgbaston-renovation',
        title: 'Edgbaston Refit',
        before: '/bad-8.jpeg',
        after: '/good-8.jpg',
    },
]

export default function RecentWorks() {
    return (
        <section className="recent-works">

            <div className="pricing__header">
                <p className="section__eyebrow">Recent Works</p>
                <h2 className="section__heading">See The 
                    Results</h2>
            </div>

            <div className="recent-works__track">
                {PROJECTS.map((project) => (
                    <div className="recent-works__card" key={project.id}>
                        <BeforeAfterSlider
                            before={project.before}
                            after={project.after}
                            alt={project.title}
                        />
                        <div className="recent-works__meta">
                            <p className="recent-works__title">{project.title}</p>
                            <p className="recent-works__material">{project.material}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

function BeforeAfterSlider({ before, after, alt }) {
    const [position, setPosition] = useState(50)
    const containerRef = useRef(null)
    const draggingRef = useRef(false)

    const updateFromClientX = (clientX) => {
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const pct = ((clientX - rect.left) / rect.width) * 100
        setPosition(Math.min(100, Math.max(0, pct)))
    }

    const handlePointerDown = (e) => {
        draggingRef.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        updateFromClientX(e.clientX)
    }

    const handlePointerMove = (e) => {
        if (!draggingRef.current) return
        updateFromClientX(e.clientX)
    }

    const stopDragging = (e) => {
        draggingRef.current = false
        if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId)
        }
    }

    return (
        <div
            className="recent-works__compare"
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
        >
            <img className="recent-works__img" src={after} alt={`${alt} — after`} draggable={false} />

            <div className="recent-works__before-wrap" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
                <img className="recent-works__img" src={before} alt={`${alt} — before`} draggable={false} />
            </div>

            <span className="recent-works__tag recent-works__tag--before">Before</span>
            <span className="recent-works__tag recent-works__tag--after">After</span>

            <div className="recent-works__handle" style={{ left: `${position}%` }}>
                <span className="recent-works__handle-grip">⟷</span>
            </div>

            <input
                className="recent-works__range"
                type="range"
                min={0}
                max={100}
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
                aria-label={`Reveal before and after for ${alt}`}
            />
        </div>
    )
}
