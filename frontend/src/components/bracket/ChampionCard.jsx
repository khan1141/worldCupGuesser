import { motion } from 'framer-motion'
import FlagImage from '@/components/common/FlagImage'

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lucide "trophy" icon, inlined
function TrophyIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

export default function ChampionCard({ team }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <TrophyIcon
        className={`w-9 h-9 transition-colors duration-300
          ${team ? 'text-[var(--color-gold)] drop-shadow-[0_0_12px_rgba(250,204,21,0.45)]' : 'text-[var(--color-fg-faint)]'}`}
      />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
        Champion
      </span>

      {team ? (
        <motion.div
          key={team.id}
          initial={prefersReduced ? {} : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/40 shadow-[0_0_30px_rgba(250,204,21,0.15)]"
        >
          <FlagImage src={team.flagUrl} teamName={team.teamName} size="md" />
          <span
            className="text-lg font-black uppercase text-[var(--color-gold)] leading-none"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}
          >
            {team.teamName}
          </span>
        </motion.div>
      ) : (
        <span className="text-[11px] italic text-[var(--color-fg-faint)] px-4 py-2.5 border border-dashed border-[var(--color-border)] rounded-xl">
          Pick your champion
        </span>
      )}
    </div>
  )
}
