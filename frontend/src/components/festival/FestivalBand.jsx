import FestivalHero from './FestivalHero'

/**
 * FestivalBand — a short FestivalHero preset for inner-page headers.
 * Carries the festival vibe across the app without sitting behind data:
 * just the sky + a couple of orbs + lights. No silhouette, no bunting.
 */
export default function FestivalBand({ className = '' }) {
  return (
    <FestivalHero
      className={className}
      orbCount={3}
      lightCount={6}
      intensity={0.7}
      showBunting={false}
      showSilhouette={false}
    />
  )
}
