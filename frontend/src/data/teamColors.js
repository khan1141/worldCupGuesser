// Representative flag/kit colors per nation, keyed by FIFA 3-letter code
// (the code embedded in each team's flagUrl, e.g. /flags/BRA.png -> BRA).
// Used to tint the champion confetti. 2-3 colors each reads best.
export const TEAM_COLORS = {
  // Group A
  MEX: ['#006847', '#CE1126', '#FFFFFF'],
  RSA: ['#007A4D', '#FFB915', '#DE3831'],
  KOR: ['#CD2E3A', '#0047A0', '#FFFFFF'],
  CZE: ['#11457E', '#D7141A', '#FFFFFF'],
  // Group B
  CAN: ['#FF0000', '#FFFFFF'],
  BIH: ['#002395', '#FECB00', '#FFFFFF'],
  QAT: ['#8A1538', '#FFFFFF'],
  SUI: ['#D52B1E', '#FFFFFF'],
  // Group C
  BRA: ['#009C3B', '#FFDF00', '#002776'],
  MAR: ['#C1272D', '#006233'],
  HAI: ['#00209F', '#D21034'],
  SCO: ['#005EB8', '#FFFFFF'],
  // Group D
  USA: ['#B22234', '#3C3B6E', '#FFFFFF'],
  PAR: ['#D52B1E', '#0038A8', '#FFFFFF'],
  AUS: ['#00843D', '#FFCD00'],
  TUR: ['#E30A17', '#FFFFFF'],
  // Group E
  GER: ['#000000', '#DD0000', '#FFCE00'],
  CUW: ['#002B7F', '#F9D90F'],
  CIV: ['#F77F00', '#009E60', '#FFFFFF'],
  ECU: ['#FFDD00', '#034EA2', '#ED1C24'],
  // Group F
  NED: ['#FF7900', '#AE1C28', '#21468B'],
  JPN: ['#BC002D', '#FFFFFF'],
  SWE: ['#006AA7', '#FECC00'],
  TUN: ['#E70013', '#FFFFFF'],
  // Group G
  BEL: ['#000000', '#FAE042', '#ED2939'],
  EGY: ['#CE1126', '#000000', '#FFFFFF'],
  IRN: ['#239F40', '#DA0000', '#FFFFFF'],
  NZL: ['#00247D', '#CC142B', '#FFFFFF'],
  // Group H
  ESP: ['#AA151B', '#F1BF00'],
  CPV: ['#003893', '#CF2027', '#FFFFFF'],
  KSA: ['#006C35', '#FFFFFF'],
  URU: ['#0038A8', '#FCD116', '#FFFFFF'],
  // Group I
  FRA: ['#002395', '#ED2939', '#FFFFFF'],
  SEN: ['#00853F', '#FDEF42', '#E31B23'],
  IRQ: ['#CE1126', '#007A3D', '#000000'],
  NOR: ['#BA0C2F', '#00205B', '#FFFFFF'],
  // Group J
  ARG: ['#75AADB', '#FCBF49', '#FFFFFF'],
  ALG: ['#006233', '#D21034', '#FFFFFF'],
  AUT: ['#ED2939', '#FFFFFF'],
  JOR: ['#007A3B', '#CE1126', '#000000'],
  // Group K
  POR: ['#006600', '#FF0000', '#FFCC00'],
  COD: ['#007FFF', '#F7D618', '#CE1021'],
  UZB: ['#0099B5', '#1EB53A', '#CE1126'],
  COL: ['#FCD116', '#003893', '#CE1126'],
  // Group L
  ENG: ['#CE1124', '#FFFFFF'],
  CRO: ['#FF0000', '#171796', '#FFFFFF'],
  GHA: ['#CE1126', '#FCD116', '#006B3F'],
  PAN: ['#D21034', '#005293', '#FFFFFF'],
}

/**
 * Returns the color array for a team, or null if unknown.
 * Extracts the FIFA code from the team's flagUrl (/flags/XXX.png).
 */
export function colorsForTeam(team) {
  if (!team?.flagUrl) return null
  const code = team.flagUrl.split('/').pop()?.replace(/\.\w+$/, '')?.toUpperCase()
  return (code && TEAM_COLORS[code]) || null
}
