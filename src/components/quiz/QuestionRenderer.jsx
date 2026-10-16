import { useQuiz } from '../../context/quizContext.js'
import Icon from '../ui/Icon.jsx'

export default function QuestionRenderer({ question }) {
  const { answers, setAnswer } = useQuiz()

  if (!question || !question.options) return null

  const currentSelection = answers[question.id]

  const handleSelect = (optionId) => {
    setAnswer(question.id, optionId)
  }

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="sr-only">{question.title}</legend>
      <div className="grid gap-3 sm:gap-4">
        {question.options.map((option) => {
          const isSelected = currentSelection === option.id
          const inputId = `option-${question.id}-${option.id}`

          return (
            <label
              key={option.id}
              htmlFor={inputId}
              className={`group relative flex cursor-pointer items-start gap-3.5 rounded-card border-2 p-4 sm:p-5 transition-all duration-200 select-none ${
                isSelected
                  ? 'border-brand-700 bg-brand-50/80 shadow-xs ring-2 ring-brand-700/20'
                  : 'border-line bg-surface hover:border-brand-700 hover:bg-brand-50/30 hover:shadow-sm'
              }`}
            >
              {/* Native accessible radio input */}
              <input
                type="radio"
                id={inputId}
                name={`question-${question.id}`}
                value={option.id}
                checked={isSelected}
                onChange={() => handleSelect(option.id)}
                className="sr-only"
              />

              {/* Visual Radio Circle Indicator */}
              <div
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-700 bg-brand-700 text-white'
                    : 'border-control/60 bg-surface group-hover:border-brand-700'
                }`}
              >
                {isSelected ? (
                  <Icon name="check" size={14} className="stroke-[3]" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-transparent group-hover:bg-brand-200" />
                )}
              </div>

              {/* Icon badge if option has icon */}
              {option.icon && (
                <div
                  aria-hidden="true"
                  className={`hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-control transition-colors ${
                    isSelected
                      ? 'bg-brand-100 text-brand-800'
                      : 'bg-canvas text-brand-700 group-hover:bg-brand-50'
                  }`}
                >
                  <Icon name={option.icon} size={20} />
                </div>
              )}

              {/* Content text */}
              <div className="flex-1 pr-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span
                    className={`text-base font-semibold leading-snug transition-colors ${
                      isSelected ? 'text-brand-900' : 'text-ink group-hover:text-brand-800'
                    }`}
                  >
                    {option.label}
                  </span>

                  {/* Non-color indicator: Dipilih badge */}
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-200/70 px-2 py-0.5 text-xs font-bold text-brand-900">
                      <Icon name="check" size={12} />
                      Dipilih
                    </span>
                  )}
                </div>

                {option.description && (
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
