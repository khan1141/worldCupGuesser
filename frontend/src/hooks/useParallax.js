import { useEffect, useRef } from 'react'

/**
 * useParallax — depth-on-motion for the festival atmosphere.
 *
 * Returns a `register(amplitude)` helper that hands back a ref. On
 * mouse-move and scroll, each registered element is translated by its
 * amplitude (px), with closer/bigger amplitudes reading as "nearer".
 * Sky should use a small amplitude, bokeh a larger one, silhouette tiny.
 *
 * Guardrails:
 *  - transform: translate3d only (GPU, no layout)
 *  - throttled to one update per animation frame
 *  - disabled entirely under prefers-reduced-motion
 *  - mouse parallax disabled on touch / coarse-pointer devices;
 *    gentle scroll parallax stays
 */
export function useParallax() {
  const layers = useRef([]) // { el, amp }
  const state = useRef({ mx: 0, my: 0, scroll: 0 })
  const frame = useRef(0)

  const register = (amplitude) => (el) => {
    if (!el) return
    const existing = layers.current.find((l) => l.el === el)
    if (existing) existing.amp = amplitude
    else layers.current.push({ el, amp: amplitude })
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches

    const apply = () => {
      frame.current = 0
      const { mx, my, scroll } = state.current
      for (const { el, amp } of layers.current) {
        const x = mx * amp
        const y = my * amp + scroll * amp * 0.4
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      }
    }

    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(apply)
    }

    const onMove = (e) => {
      state.current.mx = (e.clientX / window.innerWidth - 0.5) * 2 // -1..1
      state.current.my = (e.clientY / window.innerHeight - 0.5) * 2
      schedule()
    }

    const onScroll = () => {
      // Normalize a little scroll into a small parallax nudge.
      state.current.scroll = Math.min(window.scrollY / 600, 1)
      schedule()
    }

    if (!coarse) window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return register
}
