import { useEffect, useMemo, useState } from 'react'
import { useParallax } from '@/hooks/useParallax'
import './FestivalHero.css'

/**
 * FestivalHero — Layer 1 "atmosphere" backdrop + gentle bunting.
 *
 * Pure CSS/SVG. Sits behind real content as an absolute, inert
 * decorative layer. No raster images. All motion respects
 * prefers-reduced-motion (see FestivalHero.css + useParallax).
 *
 * Props:
 *   orbCount       drifting bokeh orbs (default 5; halved on mobile)
 *   lightCount     twinkling string lights (default 7)
 *   intensity      0..1 multiplier for orb size/opacity (default 1)
 *   showLights     render the string-light row (default true)
 *   showBunting    render the swaying flag bunting (default true)
 *   showSilhouette render the crowd silhouette (default true)
 *   parallax       enable depth-on-motion (default true)
 *   className      extra classes for the root (e.g. z-index)
 */

const ORB_COLORS = ['#22D3EE', '#EC4899', '#FACC15', '#A3E635']
const BUNTING_COLORS = ['#EC4899', '#FACC15', '#22D3EE', '#A3E635', '#F6A24A']

// Deterministic pseudo-random so the layout is stable across renders.
function rand(seed) {
  const x = Math.sin(seed * 999.13) * 10000
  return x - Math.floor(x)
}

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

export default function FestivalHero({
  orbCount = 5,
  lightCount = 7,
  intensity = 1,
  showLights = true,
  showBunting = true,
  showSilhouette = true,
  parallax = true,
  className = '',
}) {
  const isMobile = useIsMobile()
  const register = useParallax()
  const reg = parallax ? register : () => () => {}

  const effectiveOrbs = isMobile ? Math.ceil(orbCount / 2) : orbCount

  const orbs = useMemo(
    () =>
      Array.from({ length: effectiveOrbs }, (_, i) => {
        const size = (28 + rand(i + 1) * 44) * intensity
        return {
          color: ORB_COLORS[i % ORB_COLORS.length],
          size,
          top: 12 + rand(i + 2) * 56, // %
          left: 6 + rand(i + 3) * 84, // %
          dx: (8 + rand(i + 4) * 16).toFixed(0),
          dy: (-(8 + rand(i + 5) * 14)).toFixed(0),
          dur: (8 + rand(i + 6) * 4).toFixed(1),
          delay: (rand(i + 7) * 3).toFixed(1),
          opacity: (0.45 + rand(i + 8) * 0.2) * intensity,
        }
      }),
    [effectiveOrbs, intensity],
  )

  const lights = useMemo(
    () =>
      Array.from({ length: lightCount }, (_, i) => ({
        left: ((i + 0.5) / lightCount) * 100,
        top: 10 + rand(i + 20) * 18,
        size: 4 + Math.round(rand(i + 21) * 2),
        dur: (2.2 + rand(i + 22) * 1).toFixed(1),
        delay: (rand(i + 23) * 1.4).toFixed(1),
      })),
    [lightCount],
  )

  return (
    <div className={`fh-root ${className}`} aria-hidden="true">
      {/* Sky — slowest parallax */}
      <div className="fh-sky" ref={reg(8)} />

      {/* String lights */}
      {showLights && (
        <div className="fh-layer" ref={reg(10)}>
          {lights.map((l, i) => (
            <span
              key={`l${i}`}
              className="fh-light"
              style={{
                top: `${l.top}%`,
                left: `${l.left}%`,
                width: `${l.size}px`,
                height: `${l.size}px`,
                '--dur': `${l.dur}s`,
                '--delay': `${l.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Bokeh orbs — fastest parallax (nearest) */}
      <div className="fh-layer" ref={reg(18)}>
        {orbs.map((o, i) => (
          <span
            key={`o${i}`}
            className="fh-orb"
            style={{
              top: `${o.top}%`,
              left: `${o.left}%`,
              width: `${o.size}px`,
              height: `${o.size}px`,
              opacity: o.opacity,
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
              '--dx': `${o.dx}px`,
              '--dy': `${o.dy}px`,
              '--dur': `${o.dur}s`,
              '--delay': `${o.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Flag bunting */}
      {showBunting && (
        <div className="fh-bunting" ref={reg(12)}>
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={`b${i}`}
              className="fh-flag"
              style={{
                background: BUNTING_COLORS[i % BUNTING_COLORS.length],
                '--dur': `${(3 + rand(i + 40) * 0.6).toFixed(1)}s`,
                '--delay': `${(i * 0.2).toFixed(1)}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Crowd silhouette — barely moves */}
      {showSilhouette && (
        <svg
          className="fh-silhouette"
          ref={reg(4)}
          width="100%"
          height="120"
          viewBox="0 0 680 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 120 L0 78 L30 78 L30 60 L60 60 L60 80 L95 80 L95 50 L120 50 L120 82 L160 82 L160 66 L195 66 L195 84 L230 84 L230 56 L260 56 L260 86 L300 86 L300 70 L330 70 L330 60 L360 60 L360 88 L400 88 L400 64 L430 64 L430 82 L470 82 L470 54 L500 54 L500 86 L540 86 L540 72 L575 72 L575 60 L610 60 L610 84 L650 84 L650 74 L680 74 L680 120 Z"
            fill="#160826"
          />
          <path
            d="M0 120 L0 100 L40 100 L40 92 L90 92 L90 104 L150 104 L150 96 L210 96 L210 106 L280 106 L280 98 L350 98 L350 108 L430 108 L430 100 L510 100 L510 106 L590 106 L590 98 L680 98 L680 120 Z"
            fill="#0E0518"
          />
        </svg>
      )}

      <div className="fh-vignette" />
    </div>
  )
}
