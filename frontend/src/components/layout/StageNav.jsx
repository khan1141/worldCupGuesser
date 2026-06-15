import { useTournamentStore } from '@/store/tournamentStore'
import FestivalBand from '@/components/festival/FestivalBand'

const STAGES = [
  { id: 'groups',     label: 'Groups'  },
  { id: 'thirdplace', label: '3rd Place' },
  { id: 'bracket',    label: 'Bracket' },
  { id: 'summary',    label: 'Summary' },
]

export default function StageNav() {
  const { currentStage, setStage, allGroupsComplete, selectedThirdPlace } = useTournamentStore()

  const stageOrder = ['home', 'groups', 'thirdplace', 'bracket', 'summary']
  const currentIndex = stageOrder.indexOf(currentStage)

  const canNavigateTo = (stageId) => {
    const targetIndex = stageOrder.indexOf(stageId)
    if (targetIndex <= currentIndex) return true
    if (stageId === 'thirdplace') return allGroupsComplete()
    if (stageId === 'bracket') return allGroupsComplete() && selectedThirdPlace.length === 8
    return false
  }

  if (currentStage === 'home') return null

  return (
    <nav className="sticky top-0 z-40 w-full overflow-hidden border-b border-[var(--color-border)]">
      {/* Festival band backdrop + readability scrim */}
      <FestivalBand />
      <div className="absolute inset-0 bg-[var(--color-bg)]/60 backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setStage('home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-[var(--color-gold)] font-display font-black text-xl tracking-tight">WC</span>
          <span className="text-[var(--color-fg-muted)] text-sm">2026</span>
        </button>

        {/* Stage breadcrumb */}
        <ol className="flex items-center gap-1 text-sm">
          {STAGES.map((stage, i) => {
            const stageIdx = stageOrder.indexOf(stage.id)
            const isActive = currentStage === stage.id
            const isDone = stageIdx < currentIndex
            const canNav = canNavigateTo(stage.id)

            return (
              <li key={stage.id} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="text-[var(--color-fg-faint)] mx-1">/</span>
                )}
                <button
                  onClick={() => canNav && setStage(stage.id)}
                  disabled={!canNav}
                  className={`px-2 py-1 rounded font-medium transition-colors cursor-pointer
                    ${isActive
                      ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/10'
                      : isDone
                      ? 'text-[var(--color-fg)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5'
                      : 'text-[var(--color-fg-faint)] cursor-not-allowed'
                    }`}
                >
                  {stage.label}
                </button>
              </li>
            )
          })}
        </ol>

        {/* Reset */}
        <button
          onClick={() => useTournamentStore.getState().reset()}
          className="text-xs text-[var(--color-fg-faint)] hover:text-[var(--color-danger)] transition-colors cursor-pointer px-2 py-1"
        >
          Reset
        </button>
      </div>
    </nav>
  )
}
