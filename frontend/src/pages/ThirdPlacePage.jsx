import { motion } from 'framer-motion'
import { useTournamentStore, GROUP_LETTERS } from '@/store/tournamentStore'
import FlagImage from '@/components/common/FlagImage'

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ThirdPlacePage() {
  const { teams, groupPlacement, selectedThirdPlace, toggleThirdPlace, setStage } = useTournamentStore()
  const canProceed = selectedThirdPlace.length === 8

  const thirdPlaceEntries = GROUP_LETTERS.map((letter) => {
    const thirdId = groupPlacement[letter].third
    const team = thirdId ? teams.find((t) => t.id === thirdId) : null
    return { letter, team, teamId: thirdId }
  }).filter((e) => e.team !== null)

  const handleProceed = () => {
    useTournamentStore.getState().buildR32()
    setStage('bracket')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.15em] mb-1">Step 2 of 3</p>
        <h1
          className="text-4xl font-black uppercase text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Best 3rd Place Teams
        </h1>
        <p className="text-[var(--color-fg-muted)] text-sm">
          Choose 8 of the 12 third-place teams to advance to the Round of 32.
        </p>

        {/* Counter */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-cyan)] rounded-full transition-all duration-500"
              style={{ width: `${(selectedThirdPlace.length / 8) * 100}%` }}
            />
          </div>
          <span className={`text-xs font-medium shrink-0 tabular-nums ${canProceed ? 'text-[var(--color-cyan)]' : 'text-[var(--color-fg-muted)]'}`}>
            {selectedThirdPlace.length}/8 selected
          </span>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        {thirdPlaceEntries.map(({ letter, team, teamId }, i) => {
          const isSelected = selectedThirdPlace.includes(teamId)
          const isDisabled = !isSelected && selectedThirdPlace.length >= 8

          return (
            <motion.button
              key={letter}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              onClick={() => !isDisabled && toggleThirdPlace(teamId)}
              disabled={isDisabled}
              className={`relative p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer
                ${isSelected
                  ? 'bg-[var(--color-cyan)]/10 border-[var(--color-cyan)]/50 shadow-md shadow-[var(--color-cyan)]/10'
                  : isDisabled
                  ? 'bg-[var(--color-surface)] border-[var(--color-border)] opacity-40 cursor-not-allowed'
                  : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-fg-faint)]'
                }`}
            >
              {/* Group badge */}
              <span className="absolute top-2 right-2 text-[10px] font-bold text-[var(--color-fg-faint)] uppercase tracking-wider">
                G-{letter}
              </span>

              {/* Check indicator */}
              {isSelected && (
                <span className="absolute top-2 left-2 w-4 h-4 rounded-full bg-[var(--color-cyan)] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[var(--color-bg)]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}

              <div className="mt-3 flex flex-col items-center gap-2">
                <FlagImage src={team.flagUrl} teamName={team.teamName} size="xl" />
                <span className="text-sm font-semibold text-[var(--color-fg)] text-center leading-tight">
                  {team.teamName}
                </span>
                {team.fifaRanking && (
                  <span className="text-[10px] text-[var(--color-fg-faint)]">FIFA #{team.fifaRanking}</span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStage('groups')}
          className="px-6 py-3 rounded-xl font-bold text-sm text-[var(--color-fg-muted)] border border-[var(--color-border)] hover:border-[var(--color-fg-faint)] transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
        >
          ← BACK
        </button>
        <button
          onClick={handleProceed}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer
            ${canProceed
              ? 'bg-[var(--color-gold)] text-[var(--color-bg)] hover:bg-[var(--color-gold-dim)] hover:scale-105 active:scale-95 shadow-lg shadow-[var(--color-gold)]/20'
              : 'bg-[var(--color-surface-elevated)] text-[var(--color-fg-faint)] cursor-not-allowed'
            }`}
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
        >
          NEXT: BRACKET →
        </button>
      </div>
    </div>
  )
}
