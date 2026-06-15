import { motion } from 'framer-motion'
import { useTournamentStore, GROUP_LETTERS } from '@/store/tournamentStore'
import GroupCard from '@/components/groups/GroupCard'

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function GroupStagePage() {
  const { teams, groupsCompletedCount, allGroupsComplete, setStage } = useTournamentStore()
  const completed = groupsCompletedCount()

  const teamsByGroup = (letter) => teams.filter((t) => t.groupName === letter)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.15em] mb-1">Step 1 of 3</p>
        <h1
          className="text-4xl font-black uppercase text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Group Stage
        </h1>
        <p className="text-[var(--color-fg-muted)] text-sm">
          Pick the 1st, 2nd, and 3rd place finisher in all 12 groups.
        </p>

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-gold)] rounded-full transition-all duration-500"
              style={{ width: `${(completed / 12) * 100}%` }}
            />
          </div>
          <span className="text-xs text-[var(--color-fg-muted)] shrink-0 font-medium tabular-nums">
            {completed}/12
          </span>
        </div>
      </div>

      {/* Group grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {GROUP_LETTERS.map((letter, i) => (
          <motion.div
            key={letter}
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04, ease: 'easeOut' }}
          >
            <GroupCard groupLetter={letter} teams={teamsByGroup(letter)} />
          </motion.div>
        ))}
      </div>

      {/* Next button */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={() => setStage('thirdplace')}
          disabled={!allGroupsComplete()}
          className={`px-8 py-3 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer
            ${allGroupsComplete()
              ? 'bg-[var(--color-gold)] text-[var(--color-bg)] hover:bg-[var(--color-gold-dim)] hover:scale-105 active:scale-95 shadow-lg shadow-[var(--color-gold)]/20'
              : 'bg-[var(--color-surface-elevated)] text-[var(--color-fg-faint)] cursor-not-allowed'
            }`}
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
        >
          {allGroupsComplete() ? 'NEXT: PICK 3RD PLACE TEAMS →' : `Complete all 12 groups (${completed}/12)`}
        </button>
      </div>
    </div>
  )
}
