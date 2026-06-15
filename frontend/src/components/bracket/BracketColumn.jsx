import { motion } from 'framer-motion'
import BracketMatch from './BracketMatch'
import { ROUND_LABELS } from '@/data/bracketStructure'

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// One vertical column of a mirrored bracket: a round label + the matches
// belonging to one side of the draw (e.g. R16 indices [4..7] for the right half).
export default function BracketColumn({ round, indices, mirrored = false, onTeamClick, delay = 0 }) {
  const label = ROUND_LABELS[round] || round

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, x: mirrored ? 16 : -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className="flex flex-col flex-1 min-w-0 self-stretch"
    >
      <div className="text-center mb-2 h-4 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-fg-muted)]">
          {label}
        </span>
      </div>

      <div className="flex flex-col justify-around flex-1 gap-2">
        {indices.map((i) => (
          <BracketMatch
            key={i}
            round={round}
            matchIndex={i}
            mirrored={mirrored}
            onTeamClick={onTeamClick}
          />
        ))}
      </div>
    </motion.div>
  )
}
