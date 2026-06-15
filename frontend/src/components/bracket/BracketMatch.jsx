import { motion } from 'framer-motion'
import FlagImage from '@/components/common/FlagImage'
import { useTournamentStore } from '@/store/tournamentStore'

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function BracketMatch({ round, matchIndex, onTeamClick, mirrored = false, highlight = false }) {
  const { knockoutMatches, pickKnockoutWinner, getTeamById } = useTournamentStore()

  const match =
    round === 'THIRD'
      ? knockoutMatches.THIRD?.[0]
      : round === 'FINAL'
      ? knockoutMatches.FINAL?.[0]
      : knockoutMatches[round]?.[matchIndex]

  if (!match) return null

  const team1 = match.team1 ? getTeamById(match.team1) : null
  const team2 = match.team2 ? getTeamById(match.team2) : null
  const winner = match.winner

  const handlePick = (teamId) => {
    if (!teamId) return
    if (round === 'THIRD') {
      useTournamentStore.getState().pickThirdPlaceWinner(teamId)
    } else {
      pickKnockoutWinner(round, matchIndex, teamId)
    }
  }

  const TeamSlot = ({ team, teamId, isTop }) => {
    const isWinner = winner === teamId
    const isLoser = winner && winner !== teamId
    const canPick = team1 && team2 && teamId

    return (
      <button
        onClick={() => canPick && handlePick(teamId)}
        onMouseEnter={() => team && onTeamClick?.(team)}
        disabled={!canPick}
        className={`w-full flex items-center gap-2 px-2.5 py-1.5 transition-all duration-150 cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-gold)]/60
          ${mirrored ? 'flex-row-reverse text-right' : 'text-left'}
          ${isTop ? 'rounded-t-lg border-b border-[var(--color-border-subtle)]' : 'rounded-b-lg'}
          ${isWinner
            ? 'bg-[var(--color-gold)]/15 text-[var(--color-gold)]'
            : isLoser
            ? 'opacity-35 text-[var(--color-fg-muted)]'
            : canPick
            ? 'hover:bg-[var(--color-surface-elevated)] text-[var(--color-fg)]'
            : 'text-[var(--color-fg-faint)]'
          }`}
      >
        {team ? (
          <>
            <FlagImage src={team.flagUrl} teamName={team.teamName} size="sm" />
            <span className={`flex-1 text-[11px] font-semibold truncate ${mirrored ? 'text-right' : ''}`}>
              {team.teamName}
            </span>
            {isWinner && (
              <motion.svg
                initial={prefersReduced ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="w-3 h-3 shrink-0 text-[var(--color-gold)]"
              >
                <path d="M3 8.5l3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </>
        ) : (
          <span className="text-[10px] italic text-[var(--color-fg-faint)]">TBD</span>
        )}
      </button>
    )
  }

  return (
    <div
      className={`bg-[var(--color-surface)] border rounded-lg overflow-hidden w-full min-w-0
        ${highlight ? 'border-[var(--color-gold)]/40 shadow-lg shadow-[var(--color-gold)]/10' : 'border-[var(--color-border)]'}`}
    >
      <TeamSlot team={team1} teamId={match.team1} isTop />
      <TeamSlot team={team2} teamId={match.team2} isTop={false} />
    </div>
  )
}
