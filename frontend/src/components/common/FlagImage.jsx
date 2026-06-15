import { useState } from 'react'

export default function FlagImage({ src, teamName, className = '', size = 'md' }) {
  const [error, setError] = useState(false)

  const sizes = {
    sm: 'w-6 h-4',
    md: 'w-8 h-5',
    lg: 'w-10 h-7',
    xl: 'w-14 h-10',
  }

  const textSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }

  const initials = teamName
    ? teamName.split(' ').map((w) => w[0]).join('').slice(0, 3).toUpperCase()
    : '?'

  if (!src || error) {
    return (
      <span
        className={`${sizes[size]} ${className} inline-flex items-center justify-center rounded bg-[var(--color-border)] text-[var(--color-fg-muted)] font-bold ${textSizes[size]} shrink-0`}
        title={teamName}
      >
        {initials}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={teamName}
      onError={() => setError(true)}
      loading="lazy"
      className={`${sizes[size]} ${className} object-cover rounded shrink-0`}
      style={{ aspectRatio: '4/3' }}
    />
  )
}
