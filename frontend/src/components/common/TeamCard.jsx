import FlagImage from './FlagImage'

export default function TeamCard({ team, size = 'md', className = '', dimmed = false }) {
  if (!team) {
    return (
      <span className={`${className} inline-flex items-center gap-2 text-[var(--color-fg-faint)] italic text-sm`}>
        TBD
      </span>
    )
  }

  return (
    <span
      className={`${className} inline-flex items-center gap-2 ${dimmed ? 'opacity-40' : ''}`}
      title={team.teamName}
    >
      <FlagImage src={team.flagUrl} teamName={team.teamName} size={size} />
      <span className="font-medium text-[var(--color-fg)] leading-none truncate">{team.teamName}</span>
    </span>
  )
}
