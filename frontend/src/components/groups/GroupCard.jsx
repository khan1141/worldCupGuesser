import { useTournamentStore } from '@/store/tournamentStore'
import FlagImage from '@/components/common/FlagImage'

const SLOTS = [
  { key: 'first',  label: '1st', color: 'text-[var(--color-gold)]'   },
  { key: 'second', label: '2nd', color: 'text-[var(--color-fg-muted)]' },
  { key: 'third',  label: '3rd', color: 'text-[var(--color-fg-faint)]' },
]

export default function GroupCard({ groupLetter, teams }) {
  const { groupPlacement, pickGroupSlot, isGroupComplete } = useTournamentStore()
  const placement = groupPlacement[groupLetter]
  const complete = isGroupComplete(groupLetter)

  return (
    <div
      className={`rounded-xl border p-4 transition-colors duration-200 ${
        complete
          ? 'bg-[var(--color-surface)] border-[var(--color-gold)]/30'
          : 'bg-[var(--color-surface)] border-[var(--color-border)]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center text-[var(--color-gold)] font-black text-base"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {groupLetter}
          </span>
          <span className="text-[var(--color-fg-muted)] text-xs font-medium uppercase tracking-wider">
            Group {groupLetter}
          </span>
        </div>
        {complete && (
          <span className="w-5 h-5 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-[var(--color-gold)]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>

      {/* Placement rows */}
      <div className="space-y-2">
        {SLOTS.map(({ key, label, color }) => {
          const selectedId = placement[key]

          return (
            <div key={key} className="flex items-center gap-2">
              <span className={`text-xs font-bold w-7 shrink-0 ${color}`}>{label}</span>
              <select
                value={selectedId ?? ''}
                onChange={(e) => {
                  // Option values are strings; resolve back to the team's real
                  // id (numeric from backend, string code from offline fallback).
                  const picked = teams.find((t) => String(t.id) === e.target.value)
                  pickGroupSlot(groupLetter, key, picked ? picked.id : null)
                }}
                className="flex-1 min-w-0 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-fg)] appearance-none cursor-pointer hover:border-[var(--color-gold)]/50 focus:outline-none focus:border-[var(--color-gold)]/70 transition-colors"
              >
                <option value="">— Pick team —</option>
                {teams.map((team) => {
                  const taken =
                    Object.entries(placement).some(([k, v]) => k !== key && v === team.id)
                  return (
                    <option key={team.id} value={team.id} disabled={taken}>
                      {taken ? `✗ ${team.teamName}` : team.teamName}
                    </option>
                  )
                })}
              </select>
              {selectedId && (
                <FlagImage
                  src={teams.find((t) => t.id === selectedId)?.flagUrl}
                  teamName={teams.find((t) => t.id === selectedId)?.teamName}
                  size="sm"
                  className="shrink-0"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
