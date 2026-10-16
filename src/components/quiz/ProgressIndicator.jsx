import Icon from '../ui/Icon.jsx'

export default function ProgressIndicator({ steps, currentStep }) {
  const total = steps.length
  const progressPercent = Math.round(((currentStep + 1) / total) * 100)

  return (
    <div className="mb-8" aria-label="Progres Kuis">
      {/* Header bar with text and percentage */}
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-brand-900">
          Langkah {currentStep + 1} dari {total}:{' '}
          <span className="text-brand-700">{steps[currentStep]}</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-sun-100 px-2.5 py-0.5 text-xs font-bold text-sun-800">
          {progressPercent}% selesai
        </span>
      </div>

      {/* Progress Bar Container */}
      <div
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progres kuis ${progressPercent} persen`}
        className="h-2.5 w-full overflow-hidden rounded-full bg-brand-100"
      >
        <div
          className="h-full rounded-full bg-sun-400 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Milestone Checkpoint Trail (Horizontal on sm+) */}
      <nav aria-label="Daftar tahapan kuis" className="mt-4 hidden sm:block">
        <ol className="flex items-center justify-between">
          {steps.map((label, idx) => {
            const isCompleted = idx < currentStep
            const isCurrent = idx === currentStep

            return (
              <li key={label} className="relative flex flex-1 flex-col items-center">
                {/* Connecting Line between steps */}
                {idx > 0 && (
                  <div
                    aria-hidden="true"
                    className={`absolute top-4 -left-1/2 h-0.5 w-full -translate-y-1/2 transition-colors duration-200 ${
                      idx <= currentStep ? 'bg-sun-400' : 'bg-line'
                    }`}
                  />
                )}

                {/* Circle milestone indicator */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${
                    isCompleted
                      ? 'bg-brand-700 text-white shadow-xs'
                      : isCurrent
                        ? 'border-2 border-brand-700 bg-sun-400 text-ink shadow-xs ring-4 ring-brand-100'
                        : 'border-2 border-control/30 bg-surface text-muted'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Icon name="check" size={14} />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Label text */}
                <span
                  className={`mt-1.5 text-center text-xs transition-colors ${
                    isCurrent
                      ? 'font-bold text-brand-900'
                      : isCompleted
                        ? 'font-medium text-ink'
                        : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
