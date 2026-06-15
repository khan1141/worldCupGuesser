import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { R32_MATCHUPS } from '@/data/bracketStructure'

export const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L']

const emptyGroupPlacement = () =>
  Object.fromEntries(GROUP_LETTERS.map(g => [g, { first: null, second: null, third: null }]))

const emptyKnockout = () => ({
  R32: Array.from({ length: 16 }, () => ({ team1: null, team2: null, winner: null })),
  R16: Array.from({ length: 8  }, () => ({ team1: null, team2: null, winner: null })),
  QF:  Array.from({ length: 4  }, () => ({ team1: null, team2: null, winner: null })),
  SF:  Array.from({ length: 2  }, () => ({ team1: null, team2: null, winner: null })),
  THIRD: [{ team1: null, team2: null, winner: null }],
  FINAL: [{ team1: null, team2: null, winner: null }],
})

export const useTournamentStore = create(
  persist(
    (set, get) => ({
      // ── Teams (loaded from backend) ──────────────────────────────────────
      teams: [],
      setTeams: (teams) => set({ teams }),

      // ── Stage navigation ─────────────────────────────────────────────────
      // 'home' | 'groups' | 'thirdplace' | 'bracket' | 'summary'
      currentStage: 'home',
      setStage: (stage) => set({ currentStage: stage }),

      // ── Group stage ───────────────────────────────────────────────────────
      groupPlacement: emptyGroupPlacement(),

      pickGroupSlot: (groupLetter, slot, teamId) =>
        set((state) => {
          const group = { ...state.groupPlacement[groupLetter] }
          // Clear this teamId from any other slot in the same group
          for (const key of ['first', 'second', 'third']) {
            if (key !== slot && group[key] === teamId) group[key] = null
          }
          group[slot] = teamId
          return {
            groupPlacement: { ...state.groupPlacement, [groupLetter]: group },
          }
        }),

      // ── Third-place selection (8 of 12) ──────────────────────────────────
      selectedThirdPlace: [],

      toggleThirdPlace: (teamId) =>
        set((state) => {
          const sel = state.selectedThirdPlace
          if (sel.includes(teamId)) return { selectedThirdPlace: sel.filter((id) => id !== teamId) }
          if (sel.length >= 8) return {}
          return { selectedThirdPlace: [...sel, teamId] }
        }),

      // ── Knockout picks ────────────────────────────────────────────────────
      knockoutMatches: emptyKnockout(),

      // Initialise R32 slots from group picks (call after completing group stage)
      buildR32: () => {
        const { groupPlacement, selectedThirdPlace } = get()

        const getTeamId = (source) => {
          if (source.type === 'group') {
            return groupPlacement[source.group]?.[source.place] ?? null
          }
          if (source.type === 'third') {
            return selectedThirdPlace[source.index] ?? null
          }
          return null
        }

        const r32 = R32_MATCHUPS.map((m) => ({
          team1: getTeamId(m.slot1),
          team2: getTeamId(m.slot2),
          winner: null,
        }))

        set((state) => ({
          knockoutMatches: { ...state.knockoutMatches, R32: r32 },
        }))
      },

      // Pick a winner in a round; propagate to next round
      pickKnockoutWinner: (round, matchIndex, winnerId) =>
        set((state) => {
          const rounds = ['R32', 'R16', 'QF', 'SF', 'FINAL']
          const nextRound = {
            R32: 'R16', R16: 'QF', QF: 'SF', SF: 'FINAL',
          }
          // SF losers go to THIRD
          const km = JSON.parse(JSON.stringify(state.knockoutMatches))

          km[round][matchIndex].winner = winnerId

          // Propagate to next round
          const next = nextRound[round]
          if (next) {
            const nextMatchIndex = Math.floor(matchIndex / 2)
            const slot = matchIndex % 2 === 0 ? 'team1' : 'team2'
            if (!km[next][nextMatchIndex]) km[next][nextMatchIndex] = { team1: null, team2: null, winner: null }
            km[next][nextMatchIndex][slot] = winnerId
            // Clear winner if slots changed
            km[next][nextMatchIndex].winner = null
          }

          // SF losers go to THIRD
          if (round === 'SF') {
            const loserSlot = matchIndex === 0 ? 'team1' : 'team2'
            const match = km.SF[matchIndex]
            const loser = winnerId === match.team1 ? match.team2 : match.team1
            if (!km.THIRD[0]) km.THIRD[0] = { team1: null, team2: null, winner: null }
            if (matchIndex === 0) km.THIRD[0].team1 = loser
            else km.THIRD[0].team2 = loser
            km.THIRD[0].winner = null
          }

          return { knockoutMatches: km }
        }),

      pickThirdPlaceWinner: (winnerId) =>
        set((state) => {
          const km = JSON.parse(JSON.stringify(state.knockoutMatches))
          km.THIRD[0].winner = winnerId
          return { knockoutMatches: km }
        }),

      // ── Derived helpers ───────────────────────────────────────────────────
      getTeamById: (id) => get().teams.find((t) => t.id === id) ?? null,

      isGroupComplete: (groupLetter) => {
        const g = get().groupPlacement[groupLetter]
        return g.first !== null && g.second !== null && g.third !== null
      },

      groupsCompletedCount: () =>
        GROUP_LETTERS.filter((g) => {
          const p = get().groupPlacement[g]
          return p.first !== null && p.second !== null && p.third !== null
        }).length,

      allGroupsComplete: () => get().groupsCompletedCount() === 12,

      // ── Reset ─────────────────────────────────────────────────────────────
      reset: () =>
        set({
          currentStage: 'home',
          groupPlacement: emptyGroupPlacement(),
          selectedThirdPlace: [],
          knockoutMatches: emptyKnockout(),
        }),
    }),
    {
      name: 'wc2026-predictions',
      version: 2,
      // Don't persist teams (re-fetched from backend)
      partialize: (state) => ({
        currentStage: state.currentStage,
        groupPlacement: state.groupPlacement,
        selectedThirdPlace: state.selectedThirdPlace,
        knockoutMatches: state.knockoutMatches,
      }),
    }
  )
)
