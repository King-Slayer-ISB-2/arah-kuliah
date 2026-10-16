import Icon from '../ui/Icon.jsx'

export default function JourneyTrail({ steps, currentIndex }) {
  return (
    <div className="rounded-card border border-line bg-surface p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {steps.map((step, idx) => {
          const isPassed = idx < currentIndex
          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isPassed
                    ? 'bg-brand-700 text-white shadow-xs'
                    : 'border-2 border-line bg-canvas text-muted'
                }`}
              >
                {isPassed ? <Icon name="check" size={16} /> : idx + 1}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted">Tahap {idx + 1}</p>
                <p className="truncate text-sm font-semibold text-ink">{step}</p>
              </div>

              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden flex-1 sm:block h-0.5 min-w-[1.5rem] bg-sun-400 mx-2"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
