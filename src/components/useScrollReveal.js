// src/components/useScrollReveal.js
import { useEffect, useRef } from 'react'

// Reveals each `data-word` descendant of the returned ref as its container scrolls through
// the viewport: words sharpen into focus left to right, scrubbed continuously by scroll
// position (so scrolling back up un-reveals them too) rather than snapping in once via
// IntersectionObserver. Progress is written straight to each word's `--progress` custom
// property to skip React re-renders on scroll.
export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = Array.from(el.querySelectorAll('[data-word]'))
    if (words.length === 0) return

    let frame = 0

    // Each word starts revealing one slot after the previous one, but takes SPREAD slots
    // to fully resolve — so 2-3 adjacent words are always mid-transition together instead
    // of finishing one at a time, which read as a mechanical hard-cut sweep at SPREAD = 1.
    const SPREAD = 2.5
    const smoothstep = (t) => t * t * (3 - 2 * t)

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Progress 0 when the container's top is at the bottom of the viewport, 1 once it's
      // scrolled a further 0.55 viewport heights up.
      const start = vh
      const end = vh * 0.45
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1)

      // Total slots the sweep travels: one per word, plus the extra SPREAD the last word
      // needs to finish — without this, the last ~SPREAD words never reach full opacity
      // even at progress 1, since their window would run past the end of the sweep.
      const totalSlots = words.length - 1 + SPREAD
      const scaled = progress * totalSlots
      words.forEach((word, i) => {
        const wordProgress = Math.min(Math.max((scaled - i) / SPREAD, 0), 1)
        word.style.setProperty('--progress', String(smoothstep(wordProgress)))
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return ref
}
