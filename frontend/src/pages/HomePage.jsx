import { motion } from 'framer-motion'
import { useTournamentStore } from '@/store/tournamentStore'
import FestivalHero from '@/components/festival/FestivalHero'

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const fade = (delay = 0) =>
  prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay, ease: 'easeOut' } }

export default function HomePage() {
  const setStage = useTournamentStore((s) => s.setStage)

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Layer 1 — living festival atmosphere */}
      <FestivalHero orbCount={6} lightCount={9} />

      {/* Layer 3 — content sits above the atmosphere */}
      <div className="relative z-10 flex flex-col items-center">
      {/* Trophy icon area */}
      <motion.div {...fade(0)} className="mb-6">
        <div className="w-20 h-20 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-[var(--color-gold)]" fill="currentColor">
            <path d="M6 2h12l-1 5H7L6 2zm1 5l1 5a4 4 0 0 0 8 0l1-5H7zm5 8a6 6 0 0 1-5.92-5H4a2 2 0 0 1-2-2V6h3.07L6 2h12l.93 4H22v2a2 2 0 0 1-2 2h-1.08A6 6 0 0 1 12 15zm0 2c1.1 0 2 .45 2 1v1H10v-1c0-.55.9-1 2-1zm-3 3h6v1H9v-1z" />
          </svg>
        </div>
      </motion.div>

      {/* Main heading */}
      <motion.div {...fade(0.1)} className="text-center mb-4">
        <p
          className="text-[var(--color-gold)] text-sm font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          FIFA World Cup
        </p>
        <h1
          className="text-[clamp(3.5rem,12vw,8rem)] font-black leading-none tracking-tight uppercase text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          2026
        </h1>
        <h2
          className="text-[clamp(1.5rem,5vw,3rem)] font-bold leading-tight tracking-wide uppercase text-[var(--color-fg-muted)] mt-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Predictor
        </h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p {...fade(0.2)} className="text-[var(--color-fg-muted)] text-base text-center max-w-sm mb-10 leading-relaxed">
        Pick every group placement, choose the best third-place teams, and call the entire bracket all the way to the final.
      </motion.p>

      {/* CTA */}
      <motion.div {...fade(0.3)} className="flex flex-col items-center gap-3">
        <button
          onClick={() => setStage('groups')}
          className="group relative px-10 py-4 bg-[var(--color-gold)] text-[var(--color-bg)] font-bold text-lg rounded-xl hover:bg-[var(--color-gold-dim)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[var(--color-gold)]/20 cursor-pointer"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
        >
          START PREDICTING
        </button>
        <p className="text-xs text-[var(--color-fg-faint)]">48 teams · 12 groups · 64 matches</p>
      </motion.div>
      </div>

      {/* Bottom info strip */}
      <motion.div
        {...fade(0.4)}
        className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-8 text-[var(--color-fg-muted)] text-xs"
      >
        {['USA', 'CANADA', 'MEXICO'].map((host) => (
          <span key={host} className="tracking-widest uppercase">{host}</span>
        ))}
      </motion.div>
    </div>
  )
}
