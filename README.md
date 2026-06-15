# World Cup 2026 Predictor

A web app for predicting the entire FIFA World Cup 2026 — pick how every group finishes, choose the best third‑place teams, then call the full knockout bracket all the way to the final. Built with a "living festival" interface: an animated, depth‑aware backdrop instead of a flat background image, with celebratory confetti in the winning nation's colors when you crown a champion.

## Gameplay

The tournament follows the 48‑team / 12‑group FIFA 2026 format:

1. **Group stage** — for each of the 12 groups (A–L), pick the 1st, 2nd, and 3rd place finisher.
2. **Best third‑place teams** — select 8 of the 12 third‑placed teams to advance.
3. **Knockout bracket** — fill out the Round of 32 → Round of 16 → Quarter‑finals → Semi‑finals → Final, plus the third‑place playoff. Picks propagate automatically to the next round, and crowning a champion triggers a confetti celebration.

Your predictions are saved in the browser (localStorage), so progress persists between visits.

## Tech stack

**Frontend** — React 19 + Vite, Tailwind CSS v4, Framer Motion (animation), Zustand (state + persistence), `canvas-confetti`.

**Backend** — Spring Boot 4 + PostgreSQL. Seeds the 48 qualified teams on first startup and exposes the team API plus a Claude AI proxy endpoint for tournament insights.

The frontend works fully standalone: if the backend is offline it falls back to a bundled team list and locally bundled flag images, so you can play without running the server.

## Project structure

```
worldCupGuesser/
├─ frontend/                 # React + Vite app (port 5173)
│  ├─ public/flags/          # Team flag images (PNG, by FIFA code)
│  └─ src/
│     ├─ components/
│     │  ├─ festival/        # Living backdrop: FestivalHero, FestivalBand
│     │  ├─ bracket/         # Wallchart bracket UI
│     │  ├─ groups/          # Group-stage pickers
│     │  ├─ layout/          # App shell + stage navigation
│     │  └─ common/          # FlagImage, TeamCard
│     ├─ pages/              # Home, GroupStage, ThirdPlace, Bracket, Summary
│     ├─ store/              # Zustand tournament store (bracket propagation)
│     ├─ hooks/              # useParallax (depth-on-motion)
│     ├─ lib/                # confetti helper
│     └─ data/               # team list, bracket structure, team colors
└─ backend/                  # Spring Boot API (port 8080)
   └─ src/main/resources/static/flags/   # Flag images served by the API
```

## The "living festival" UI

Rather than a static photo, the atmosphere is rebuilt in pure CSS/SVG so it animates and stays responsive and accessible. It is composed in three layers:

- **Atmosphere** — a sunset gradient sky, slowly drifting bokeh orbs, twinkling string lights, swaying flag bunting, and a crowd silhouette.
- **Celebration** — confetti fired only on a real event (crowning a champion), tinted with the winning nation's flag colors.
- **Content** — the actual prediction UI sits on calm, fully readable surfaces above the atmosphere.

Subtle **parallax** (sky drifts slowest, bokeh fastest) on mouse‑move and scroll gives depth. All motion is `transform`/`opacity` only, respects `prefers-reduced-motion`, and scales back on mobile.

## Getting started

### Prerequisites
- Node.js 18+
- (Optional) Java 21+ and PostgreSQL 16+ if you want to run the backend

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. This is all you need to play — the app uses bundled team data and flags when the backend isn't running.

### Backend (optional)

The backend adds persistent team data and the Claude AI insight endpoint.

1. Start PostgreSQL and create a database named `worldcupdb`.
2. Provide configuration via environment variables:
   - `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` — database connection
   - `ANTHROPIC_API_KEY` — required for the Claude AI insight feature
3. Run it:

```bash
cd backend
./mvnw spring-boot:run
```

The API serves on http://localhost:8080, and the frontend's Vite dev server proxies `/api` to it automatically.

## Scripts (frontend)

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
