import { useEffect } from 'react'
import './App.css'
import { useTournamentStore } from '@/store/tournamentStore'
import { celebrate } from '@/lib/confetti'
import { colorsForTeam } from '@/data/teamColors'
import { FIFA_2026_TEAMS } from '@/data/bracketStructure'
import AppShell from '@/components/layout/AppShell'
import HomePage from '@/pages/HomePage'
import GroupStagePage from '@/pages/GroupStagePage'
import ThirdPlacePage from '@/pages/ThirdPlacePage'
import BracketPage from '@/pages/BracketPage'
import SummaryPage from '@/pages/SummaryPage'

function PageRouter() {
  const currentStage = useTournamentStore((s) => s.currentStage)

  switch (currentStage) {
    case 'home':      return <HomePage />
    case 'groups':    return <GroupStagePage />
    case 'thirdplace':return <ThirdPlacePage />
    case 'bracket':   return <BracketPage />
    case 'summary':   return <SummaryPage />
    default:          return <HomePage />
  }
}

export default function App() {
  const setTeams = useTournamentStore((s) => s.setTeams)

  useEffect(() => {
    // Static fallback so the game is fully playable without the backend.
    // The backend (when up) returns richer team objects with numeric ids.
    const fallbackTeams = () =>
      FIFA_2026_TEAMS.map((t) => ({
        ...t,
        id: t.flagUrl.split('/').pop().replace(/\.\w+$/, ''), // e.g. BRA
      }))

    fetch('/api/v1/national-teams')
      .then((r) => r.json())
      .then((data) => setTeams(Array.isArray(data) && data.length ? data : fallbackTeams()))
      .catch(() => setTeams(fallbackTeams())) // backend offline
  }, [setTeams])

  // Celebrate the moment a champion is crowned (Final winner null -> set).
  useEffect(() => {
    let prev = useTournamentStore.getState().knockoutMatches.FINAL[0]?.winner ?? null
    return useTournamentStore.subscribe((state) => {
      const winner = state.knockoutMatches.FINAL[0]?.winner ?? null
      if (winner && winner !== prev) {
        const team = state.getTeamById(winner)
        celebrate(colorsForTeam(team) ?? undefined) // champion colors, else festival palette
      }
      prev = winner
    })
  }, [])

  // DEV-ONLY: fast-forward to a ready-to-crown final. Type wcCrownDemo()
  // in the browser console, then click a team in the Final to fire confetti.
  useEffect(() => {
    if (!import.meta.env.DEV) return
    window.wcStore = useTournamentStore
    window.wcCrownDemo = () => {
      const s = useTournamentStore.getState()
      const byGroup = {}
      s.teams.forEach((t) => (byGroup[t.groupName] ??= []).push(t))
      const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
      GROUPS.forEach((g) => {
        const [a, b, c] = byGroup[g] || []
        if (a) s.pickGroupSlot(g, 'first', a.id)
        if (b) s.pickGroupSlot(g, 'second', b.id)
        if (c) s.pickGroupSlot(g, 'third', c.id)
      })
      GROUPS.slice(0, 8).forEach((g) =>
        s.toggleThirdPlace(useTournamentStore.getState().groupPlacement[g].third),
      )
      s.buildR32()
      ;['R32', 'R16', 'QF', 'SF'].forEach((round) => {
        useTournamentStore.getState().knockoutMatches[round].forEach((m, i) => {
          const w = m.team1 ?? m.team2
          if (w) useTournamentStore.getState().pickKnockoutWinner(round, i, w)
        })
      })
      s.setStage('bracket')
      const f = useTournamentStore.getState().knockoutMatches.FINAL[0]
      const name = (id) => s.getTeamById(id)?.teamName ?? '—'
      console.log(`Final is set: ${name(f.team1)} vs ${name(f.team2)} — click one to crown them.`)
    }
  }, [])

  return (
    <AppShell>
      <PageRouter />
    </AppShell>
  )
}
