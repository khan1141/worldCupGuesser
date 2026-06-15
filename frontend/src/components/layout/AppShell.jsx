import StageNav from './StageNav'

export default function AppShell({ children }) {
  return (
    <div className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-fg)]">
      <StageNav />
      <main>{children}</main>
    </div>
  )
}
