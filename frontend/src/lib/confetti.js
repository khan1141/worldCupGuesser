import confetti from 'canvas-confetti'

const FESTIVAL_COLORS = ['#EC4899', '#22D3EE', '#FACC15', '#A3E635', '#F6A24A']

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Celebratory burst — fired ONLY on real events (e.g. crowning a champion),
 * never idle. No-op for users who prefer reduced motion.
 *
 * @param {string[]} [colors] override colors (e.g. a nation's palette)
 */
export function celebrate(colors = FESTIVAL_COLORS) {
  if (prefersReduced()) return

  const base = {
    colors,
    disableForReducedMotion: true,
    zIndex: 60,
    scalar: 1.1,
  }

  // Two side cannons converging toward center.
  confetti({ ...base, particleCount: 70, spread: 70, angle: 60, origin: { x: 0, y: 0.7 } })
  confetti({ ...base, particleCount: 70, spread: 70, angle: 120, origin: { x: 1, y: 0.7 } })

  // A delayed top-center shower for a second wave.
  setTimeout(() => {
    confetti({ ...base, particleCount: 90, spread: 100, startVelocity: 45, origin: { x: 0.5, y: 0.2 } })
  }, 220)
}
