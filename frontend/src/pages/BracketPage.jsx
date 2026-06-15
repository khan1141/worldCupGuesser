import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTournamentStore } from '@/store/tournamentStore'
import BracketColumn from '@/components/bracket/BracketColumn'
import BracketMatch from '@/components/bracket/BracketMatch'
import Connectors from '@/components/bracket/Connectors'
import ChampionCard from '@/components/bracket/ChampionCard'
import AIInsightPanel from '@/components/ai/AIInsightPanel'
import { ROUND_LABELS } from '@/data/bracketStructure'

// Mirrored wallchart: matches 0..7 of each round flow down the left half,
// 8..15 down the right half (store propagation floor(i/2) keeps halves separate).
const LEFT_COLUMNS = [
  { round: 'R32', indices: [0, 1, 2, 3, 4, 5, 6, 7], delay: 0 },
  { round: 'R16', indices: [0, 1, 2, 3], delay: 0.06 },
  { round: 'QF', indices: [0, 1], delay: 0.12 },
  { round: 'SF', indices: [0], delay: 0.18 },
]

const RIGHT_COLUMNS = [
  { round: 'SF', indices: [1], delay: 0.18 },
  { round: 'QF', indices: [2, 3], delay: 0.12 },
  { round: 'R16', indices: [4, 5, 6, 7], delay: 0.06 },
  { round: 'R32', indices: [8, 9, 10, 11, 12, 13, 14, 15], delay: 0 },
]

// Matches in the next (inner) round on one side, used for connector elbows
const CONNECTOR_COUNTS = { R32: 4, R16: 2, QF: 1, SF: 1 }

function RoundLabel({ children }) {
  return (
    <div className="text-center mb-2 h-4 shrink-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-fg-muted)]">
        {children}
      </span>
    </div>
  )
}

export default function BracketPage() {
  const { knockoutMatches, setStage, getTeamById } = useTournamentStore()
  const [hoveredTeam, setHoveredTeam] = useState(null)
  const [aiOpen, setAiOpen] = useState(false)

  const handleTeamHover = (team) => {
    setHoveredTeam(team)
  }

  const finalWinner = knockoutMatches.FINAL?.[0]?.winner
  const isBracketComplete = !!finalWinner
  const champion = finalWinner ? getTeamById(finalWinner) : null

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="max-w-[1700px] mx-auto mb-6">
        <p className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-[0.15em] mb-1">Step 3 of 3</p>
        <div className="flex items-end justify-between">
          <div>
            <h1
              className="text-4xl font-black uppercase text-white mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tournament Bracket
            </h1>
            <p className="text-[var(--color-fg-muted)] text-sm">
              Click a team to pick them as the winner. Both halves converge on the final in the middle.
            </p>
          </div>
          {isBracketComplete && (
            <button
              onClick={() => setStage('summary')}
              className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-bg)] rounded-xl font-bold text-sm hover:bg-[var(--color-gold-dim)] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[var(--color-gold)]/20 cursor-pointer"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
            >
              VIEW SUMMARY →
            </button>
          )}
        </div>
      </div>

      {/* Mirrored bracket — fits one screen on desktop, horizontal scroll on smaller */}
      <div className="overflow-x-auto pb-4">
        <div
          className="flex items-stretch gap-1 px-2 mx-auto min-w-[1240px] max-w-[1700px]"
          style={{ minHeight: '72vh' }}
        >
          {/* Left half: outer rounds advance inward → */}
          {LEFT_COLUMNS.map(({ round, indices, delay }) => (
            <div key={`L-${round}`} className="contents">
              <BracketColumn
                round={round}
                indices={indices}
                onTeamClick={handleTeamHover}
                delay={delay}
              />
              <Connectors count={CONNECTOR_COUNTS[round]} />
            </div>
          ))}

          {/* Center: champion, final, 3rd place */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.24 }}
            className="flex flex-col justify-center items-center gap-6 px-2 flex-[1.3] min-w-[185px] self-stretch"
          >
            <ChampionCard team={champion} />

            <div className="w-full">
              <RoundLabel>{ROUND_LABELS.FINAL}</RoundLabel>
              <BracketMatch round="FINAL" matchIndex={0} onTeamClick={handleTeamHover} highlight />
            </div>

            <div className="w-full border-t border-[var(--color-border)] pt-4">
              <RoundLabel>{ROUND_LABELS.THIRD}</RoundLabel>
              <BracketMatch round="THIRD" matchIndex={0} onTeamClick={handleTeamHover} />
            </div>
          </motion.div>

          {/* Right half: ← inner rounds out to R32, mirrored */}
          {RIGHT_COLUMNS.map(({ round, indices, delay }) => (
            <div key={`R-${round}`} className="contents">
              <Connectors count={CONNECTOR_COUNTS[round]} mirrored />
              <BracketColumn
                round={round}
                indices={indices}
                mirrored
                onTeamClick={handleTeamHover}
                delay={delay}
              />
            </div>
          ))}
        </div>
      </div>

      {/* AI insight panel */}
      <AIInsightPanel
        team={hoveredTeam}
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      {/* Floating AI button when team is hovered */}
      <AnimatePresence>
        {hoveredTeam && !aiOpen && (
          <motion.button
            key="ai-float"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setAiOpen(true)}
            className="fixed bottom-6 right-6 px-4 py-3 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-fg)] hover:border-[var(--color-gold)]/40 transition-colors shadow-xl cursor-pointer flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse" />
            AI: {hoveredTeam.teamName}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
