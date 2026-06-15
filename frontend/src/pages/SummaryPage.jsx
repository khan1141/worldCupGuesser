import { motion } from 'framer-motion'
import { useTournamentStore, GROUP_LETTERS } from '@/store/tournamentStore'
import FlagImage from '@/components/common/FlagImage'

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function SummaryPage() {
  const { knockoutMatches, groupPlacement, teams, getTeamById, setStage } = useTournamentStore()

  const champion = knockoutMatches.FINAL?.[0]?.winner
    ? getTeamById(knockoutMatches.FINAL[0].winner)
    : null

  const thirdPlace = knockoutMatches.THIRD?.[0]?.winner
    ? getTeamById(knockoutMatches.THIRD[0].winner)
    : null

  const rounds = [
    { id: 'R32', label: 'Round of 32', matches: knockoutMatches.R32 || [] },
    { id: 'R16', label: 'Round of 16', matches: knockoutMatches.R16 || [] },
    { id: 'QF',  label: 'Quarter-finals', matches: knockoutMatches.QF || [] },
    { id: 'SF',  label: 'Semi-finals', matches: knockoutMatches.SF || [] },
  ]

  const copyPicks = () => {
    const lines = ['🏆 My FIFA World Cup 2026 Predictions', '']
    lines.push('── GROUP STAGE ──')
    GROUP_LETTERS.forEach((g) => {
      const p = groupPlacement[g]
      const t1 = getTeamById(p.first)?.teamName ?? '-'
      const t2 = getTeamById(p.second)?.teamName ?? '-'
      const t3 = getTeamById(p.third)?.teamName ?? '-'
      lines.push(`Group ${g}: 1. ${t1}  2. ${t2}  3. ${t3}`)
    })
    lines.push('')
    rounds.forEach(({ label, matches }) => {
      lines.push(`── ${label.toUpperCase()} ──`)
      matches.forEach((m, i) => {
        const t1 = getTeamById(m.team1)?.teamName ?? 'TBD'
        const t2 = getTeamById(m.team2)?.teamName ?? 'TBD'
        const w = getTeamById(m.winner)?.teamName ?? '?'
        lines.push(`M${i + 1}: ${t1} vs ${t2} → ${w}`)
      })
      lines.push('')
    })
    if (champion) lines.push(`🥇 CHAMPION: ${champion.teamName}`)
    if (thirdPlace) lines.push(`🥉 3RD PLACE: ${thirdPlace.teamName}`)

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      alert('Predictions copied to clipboard!')
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        {champion ? (
          <>
            <p className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Your World Cup 2026 Champion
            </p>
            <div className="flex flex-col items-center gap-3 mb-4">
              <FlagImage src={champion.flagUrl} teamName={champion.teamName} size="xl" />
              <h1
                className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase text-[var(--color-gold)] leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {champion.teamName}
              </h1>
            </div>
            {thirdPlace && (
              <p className="text-[var(--color-fg-muted)] text-sm">
                3rd place: <span className="font-semibold text-[var(--color-fg)]">{thirdPlace.teamName}</span>
              </p>
            )}
          </>
        ) : (
          <h1
            className="text-4xl font-black uppercase text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your Predictions
          </h1>
        )}
      </motion.div>

      {/* Knockout results */}
      {rounds.map(({ id, label, matches }, ri) => {
        const completedMatches = matches.filter((m) => m.winner)
        if (completedMatches.length === 0) return null

        return (
          <motion.div
            key={id}
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: ri * 0.1 }}
            className="mb-6"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-fg-muted)] mb-3">
              {label}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {completedMatches.map((m, i) => {
                const w = getTeamById(m.winner)
                const loser = getTeamById(m.winner === m.team1 ? m.team2 : m.team1)
                return (
                  <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 text-xs">
                    <div className="flex items-center gap-1.5 mb-1">
                      {w && <FlagImage src={w.flagUrl} teamName={w.teamName} size="sm" />}
                      <span className="font-bold text-[var(--color-fg)] truncate">{w?.teamName ?? 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-40">
                      {loser && <FlagImage src={loser.flagUrl} teamName={loser.teamName} size="sm" />}
                      <span className="text-[var(--color-fg-muted)] truncate">{loser?.teamName ?? 'TBD'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )
      })}

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
        <button
          onClick={copyPicks}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-gold)]/40 transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
        >
          COPY PREDICTIONS
        </button>
        <button
          onClick={() => setStage('bracket')}
          className="px-6 py-3 rounded-xl font-bold text-sm text-[var(--color-fg-muted)] border border-[var(--color-border)] hover:border-[var(--color-fg-faint)] transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
        >
          ← EDIT BRACKET
        </button>
        <button
          onClick={() => useTournamentStore.getState().reset()}
          className="px-6 py-3 rounded-xl font-bold text-sm text-[var(--color-danger)]/70 border border-[var(--color-danger)]/20 hover:border-[var(--color-danger)]/40 transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
        >
          START OVER
        </button>
      </div>
    </div>
  )
}
