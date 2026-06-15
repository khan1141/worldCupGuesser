// Elbow connectors between bracket rounds. Renders `count` bracket shapes
// (one per match in the inner round) that visually join each pair of feeder
// matches and point toward the center of the bracket.
// pt-6 offsets the round-label header height so elbows align with the match area.
export default function Connectors({ count, mirrored = false }) {
  return (
    <div className="flex flex-col self-stretch w-4 shrink-0 pt-6" aria-hidden="true">
      <div className="flex flex-col justify-around flex-1">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col justify-center">
            <div
              className={`h-1/2 min-h-8 border-t border-b border-[var(--color-border)]
                ${mirrored ? 'border-l rounded-l' : 'border-r rounded-r'}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
