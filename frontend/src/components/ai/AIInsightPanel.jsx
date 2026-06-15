import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClaudeInsight } from './useClaudeInsight'
import FlagImage from '@/components/common/FlagImage'

export default function AIInsightPanel({ team, isOpen, onClose }) {
  const { insight, loading, error, fetchInsight } = useClaudeInsight()

  useEffect(() => {
    if (isOpen && team) fetchInsight(team.teamName)
  }, [isOpen, team, fetchInsight])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-[var(--color-surface)] border-l border-[var(--color-border)] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              {team ? (
                <div className="flex items-center gap-3">
                  <FlagImage src={team.flagUrl} teamName={team.teamName} size="lg" />
                  <div>
                    <p className="font-bold text-[var(--color-fg)]">{team.teamName}</p>
                    <p className="text-xs text-[var(--color-fg-muted)]">{team.confederation}</p>
                  </div>
                </div>
              ) : (
                <span className="text-[var(--color-fg-muted)]">Team Analysis</span>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* AI label */}
            <div className="px-5 pt-4 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)]" />
              <span className="text-xs font-semibold text-[var(--color-cyan)] uppercase tracking-wider">
                Claude AI Analysis
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {loading && (
                <div className="space-y-3 mt-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-border)] mt-1.5 shrink-0 animate-pulse" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-[var(--color-surface-elevated)] rounded animate-pulse" />
                        <div className="h-3 bg-[var(--color-surface-elevated)] rounded animate-pulse w-4/5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {error && !loading && (
                <div className="mt-2 p-3 bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 rounded-lg">
                  <p className="text-xs text-[var(--color-danger)] leading-relaxed">{error}</p>
                </div>
              )}

              {insight && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-3"
                >
                  {insight.split('\n').filter((l) => l.trim()).map((line, i) => (
                    <div key={i} className="flex gap-3 text-sm text-[var(--color-fg)] leading-relaxed">
                      <span className="text-[var(--color-cyan)] mt-0.5 shrink-0">•</span>
                      <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* FIFA ranking footer */}
            {team?.fifaRanking && (
              <div className="px-5 py-4 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
                  <span>FIFA Ranking</span>
                  <span className="font-bold text-[var(--color-fg)]">#{team.fifaRanking}</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
