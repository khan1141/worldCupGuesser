// FIFA 2026 World Cup — R32 bracket matchup definitions
// Slot sources: { type: 'group', group: 'A', place: 'first'|'second' }
//               { type: 'third', index: 0-7 }  (user-selected 3rd place teams, in selection order)

export const R32_MATCHUPS = [
  // Left bracket — group pairs AB and CD
  { id: 'R32_M00', slot1: { type: 'group', group: 'A', place: 'first'  }, slot2: { type: 'group', group: 'B', place: 'second' } },
  { id: 'R32_M01', slot1: { type: 'group', group: 'C', place: 'first'  }, slot2: { type: 'group', group: 'D', place: 'second' } },
  { id: 'R32_M02', slot1: { type: 'group', group: 'B', place: 'first'  }, slot2: { type: 'group', group: 'A', place: 'second' } },
  { id: 'R32_M03', slot1: { type: 'group', group: 'D', place: 'first'  }, slot2: { type: 'group', group: 'C', place: 'second' } },
  // Left bracket — group pairs EF with 3rd-place teams
  { id: 'R32_M04', slot1: { type: 'group', group: 'E', place: 'first'  }, slot2: { type: 'third', index: 0 } },
  { id: 'R32_M05', slot1: { type: 'group', group: 'F', place: 'first'  }, slot2: { type: 'third', index: 1 } },
  { id: 'R32_M06', slot1: { type: 'group', group: 'E', place: 'second' }, slot2: { type: 'third', index: 2 } },
  { id: 'R32_M07', slot1: { type: 'group', group: 'F', place: 'second' }, slot2: { type: 'third', index: 3 } },
  // Right bracket — group pairs GH and IJ
  { id: 'R32_M08', slot1: { type: 'group', group: 'G', place: 'first'  }, slot2: { type: 'group', group: 'H', place: 'second' } },
  { id: 'R32_M09', slot1: { type: 'group', group: 'I', place: 'first'  }, slot2: { type: 'group', group: 'J', place: 'second' } },
  { id: 'R32_M10', slot1: { type: 'group', group: 'H', place: 'first'  }, slot2: { type: 'group', group: 'G', place: 'second' } },
  { id: 'R32_M11', slot1: { type: 'group', group: 'J', place: 'first'  }, slot2: { type: 'group', group: 'I', place: 'second' } },
  // Right bracket — group pairs KL with 3rd-place teams
  { id: 'R32_M12', slot1: { type: 'group', group: 'K', place: 'first'  }, slot2: { type: 'third', index: 4 } },
  { id: 'R32_M13', slot1: { type: 'group', group: 'L', place: 'first'  }, slot2: { type: 'third', index: 5 } },
  { id: 'R32_M14', slot1: { type: 'group', group: 'K', place: 'second' }, slot2: { type: 'third', index: 6 } },
  { id: 'R32_M15', slot1: { type: 'group', group: 'L', place: 'second' }, slot2: { type: 'third', index: 7 } },
]

// Human-readable round labels
export const ROUND_LABELS = {
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF:  'Quarter-finals',
  SF:  'Semi-finals',
  THIRD: '3rd Place',
  FINAL: 'Final',
}

export const ROUNDS_ORDER = ['R32', 'R16', 'QF', 'SF', 'THIRD', 'FINAL']

// Official FIFA 2026 World Cup teams — draw held December 5, 2025
export const FIFA_2026_TEAMS = [
  // ─── GROUP A ─────────────────────────────────────────────────────────────
  { teamName: 'Mexico',               groupName: 'A', confederation: 'CONCACAF', fifaRanking: 16,  flagUrl: '/flags/MEX.png' },
  { teamName: 'South Africa',         groupName: 'A', confederation: 'CAF',      fifaRanking: 66,  flagUrl: '/flags/RSA.png' },
  { teamName: 'Korea Republic',       groupName: 'A', confederation: 'AFC',      fifaRanking: 23,  flagUrl: '/flags/KOR.png' },
  { teamName: 'Czech Republic',       groupName: 'A', confederation: 'UEFA',     fifaRanking: 40,  flagUrl: '/flags/CZE.png' },

  // ─── GROUP B ─────────────────────────────────────────────────────────────
  { teamName: 'Canada',               groupName: 'B', confederation: 'CONCACAF', fifaRanking: 40,  flagUrl: '/flags/CAN.png' },
  { teamName: 'Bosnia & Herzegovina', groupName: 'B', confederation: 'UEFA',     fifaRanking: 55,  flagUrl: '/flags/BIH.png' },
  { teamName: 'Qatar',                groupName: 'B', confederation: 'AFC',      fifaRanking: 34,  flagUrl: '/flags/QAT.png' },
  { teamName: 'Switzerland',          groupName: 'B', confederation: 'UEFA',     fifaRanking: 19,  flagUrl: '/flags/SUI.png' },

  // ─── GROUP C ─────────────────────────────────────────────────────────────
  { teamName: 'Brazil',               groupName: 'C', confederation: 'CONMEBOL', fifaRanking: 5,   flagUrl: '/flags/BRA.png' },
  { teamName: 'Morocco',              groupName: 'C', confederation: 'CAF',      fifaRanking: 14,  flagUrl: '/flags/MAR.png' },
  { teamName: 'Haiti',                groupName: 'C', confederation: 'CONCACAF', fifaRanking: 87,  flagUrl: '/flags/HAI.png' },
  { teamName: 'Scotland',             groupName: 'C', confederation: 'UEFA',     fifaRanking: 38,  flagUrl: '/flags/SCO.png' },

  // ─── GROUP D ─────────────────────────────────────────────────────────────
  { teamName: 'USA',                  groupName: 'D', confederation: 'CONCACAF', fifaRanking: 11,  flagUrl: '/flags/USA.png' },
  { teamName: 'Paraguay',             groupName: 'D', confederation: 'CONMEBOL', fifaRanking: 60,  flagUrl: '/flags/PAR.png' },
  { teamName: 'Australia',            groupName: 'D', confederation: 'AFC',      fifaRanking: 22,  flagUrl: '/flags/AUS.png' },
  { teamName: 'Turkey',               groupName: 'D', confederation: 'UEFA',     fifaRanking: 29,  flagUrl: '/flags/TUR.png' },

  // ─── GROUP E ─────────────────────────────────────────────────────────────
  { teamName: 'Germany',              groupName: 'E', confederation: 'UEFA',     fifaRanking: 12,  flagUrl: '/flags/GER.png' },
  { teamName: 'Curacao',              groupName: 'E', confederation: 'CONCACAF', fifaRanking: 82,  flagUrl: '/flags/CUW.png' },
  { teamName: 'Ivory Coast',          groupName: 'E', confederation: 'CAF',      fifaRanking: 60,  flagUrl: '/flags/CIV.png' },
  { teamName: 'Ecuador',              groupName: 'E', confederation: 'CONMEBOL', fifaRanking: 44,  flagUrl: '/flags/ECU.png' },

  // ─── GROUP F ─────────────────────────────────────────────────────────────
  { teamName: 'Netherlands',          groupName: 'F', confederation: 'UEFA',     fifaRanking: 7,   flagUrl: '/flags/NED.png' },
  { teamName: 'Japan',                groupName: 'F', confederation: 'AFC',      fifaRanking: 18,  flagUrl: '/flags/JPN.png' },
  { teamName: 'Sweden',               groupName: 'F', confederation: 'UEFA',     fifaRanking: 24,  flagUrl: '/flags/SWE.png' },
  { teamName: 'Tunisia',              groupName: 'F', confederation: 'CAF',      fifaRanking: 32,  flagUrl: '/flags/TUN.png' },

  // ─── GROUP G ─────────────────────────────────────────────────────────────
  { teamName: 'Belgium',              groupName: 'G', confederation: 'UEFA',     fifaRanking: 3,   flagUrl: '/flags/BEL.png' },
  { teamName: 'Egypt',                groupName: 'G', confederation: 'CAF',      fifaRanking: 36,  flagUrl: '/flags/EGY.png' },
  { teamName: 'Iran',                 groupName: 'G', confederation: 'AFC',      fifaRanking: 21,  flagUrl: '/flags/IRN.png' },
  { teamName: 'New Zealand',          groupName: 'G', confederation: 'OFC',      fifaRanking: 98,  flagUrl: '/flags/NZL.png' },

  // ─── GROUP H ─────────────────────────────────────────────────────────────
  { teamName: 'Spain',                groupName: 'H', confederation: 'UEFA',     fifaRanking: 2,   flagUrl: '/flags/ESP.png' },
  { teamName: 'Cape Verde',           groupName: 'H', confederation: 'CAF',      fifaRanking: 78,  flagUrl: '/flags/CPV.png' },
  { teamName: 'Saudi Arabia',         groupName: 'H', confederation: 'AFC',      fifaRanking: 58,  flagUrl: '/flags/KSA.png' },
  { teamName: 'Uruguay',              groupName: 'H', confederation: 'CONMEBOL', fifaRanking: 15,  flagUrl: '/flags/URU.png' },

  // ─── GROUP I ─────────────────────────────────────────────────────────────
  { teamName: 'France',               groupName: 'I', confederation: 'UEFA',     fifaRanking: 2,   flagUrl: '/flags/FRA.png' },
  { teamName: 'Senegal',              groupName: 'I', confederation: 'CAF',      fifaRanking: 20,  flagUrl: '/flags/SEN.png' },
  { teamName: 'Iraq',                 groupName: 'I', confederation: 'AFC',      fifaRanking: 63,  flagUrl: '/flags/IRQ.png' },
  { teamName: 'Norway',               groupName: 'I', confederation: 'UEFA',     fifaRanking: 26,  flagUrl: '/flags/NOR.png' },

  // ─── GROUP J ─────────────────────────────────────────────────────────────
  { teamName: 'Argentina',            groupName: 'J', confederation: 'CONMEBOL', fifaRanking: 1,   flagUrl: '/flags/ARG.png' },
  { teamName: 'Algeria',              groupName: 'J', confederation: 'CAF',      fifaRanking: 35,  flagUrl: '/flags/ALG.png' },
  { teamName: 'Austria',              groupName: 'J', confederation: 'UEFA',     fifaRanking: 25,  flagUrl: '/flags/AUT.png' },
  { teamName: 'Jordan',               groupName: 'J', confederation: 'AFC',      fifaRanking: 70,  flagUrl: '/flags/JOR.png' },

  // ─── GROUP K ─────────────────────────────────────────────────────────────
  { teamName: 'Portugal',             groupName: 'K', confederation: 'UEFA',     fifaRanking: 6,   flagUrl: '/flags/POR.png' },
  { teamName: 'DR Congo',             groupName: 'K', confederation: 'CAF',      fifaRanking: 56,  flagUrl: '/flags/COD.png' },
  { teamName: 'Uzbekistan',           groupName: 'K', confederation: 'AFC',      fifaRanking: 70,  flagUrl: '/flags/UZB.png' },
  { teamName: 'Colombia',             groupName: 'K', confederation: 'CONMEBOL', fifaRanking: 9,   flagUrl: '/flags/COL.png' },

  // ─── GROUP L ─────────────────────────────────────────────────────────────
  { teamName: 'England',              groupName: 'L', confederation: 'UEFA',     fifaRanking: 5,   flagUrl: '/flags/ENG.png' },
  { teamName: 'Croatia',              groupName: 'L', confederation: 'UEFA',     fifaRanking: 10,  flagUrl: '/flags/CRO.png' },
  { teamName: 'Ghana',                groupName: 'L', confederation: 'CAF',      fifaRanking: 60,  flagUrl: '/flags/GHA.png' },
  { teamName: 'Panama',               groupName: 'L', confederation: 'CONCACAF', fifaRanking: 77,  flagUrl: '/flags/PAN.png' },
]
