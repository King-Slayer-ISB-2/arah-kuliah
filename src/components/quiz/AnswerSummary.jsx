import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

export default function AnswerSummary({ questions, answers, onEdit }) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const chosenId = answers[question.id]
        const chosenOption = question.options?.find((o) => o.id === chosenId)

        return (
          <Card
            key={question.id}
            className="flex flex-col justify-between gap-4 border border-line bg-surface p-4 sm:flex-row sm:items-center sm:p-5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge tone="brand">
                  Langkah {index + 1}: {question.stage}
                </Badge>
                {!chosenOption && (
                  <Badge tone="accent">Belum dijawab</Badge>
                )}
              </div>

              <h3 className="text-base font-semibold text-ink">
                {question.title}
              </h3>

              {chosenOption ? (
                <div className="mt-2 flex items-start gap-2 text-sm text-brand-900 font-medium bg-brand-50/70 p-2.5 rounded-control border border-brand-100">
                  <Icon name="check-circle" size={18} className="text-brand-700 mt-0.5" />
                  <div>
                    <span className="font-bold">{chosenOption.label}</span>
                    {chosenOption.description && (
                      <p className="text-xs text-muted font-normal mt-0.5">
                        {chosenOption.description}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm italic text-muted">
                  Pertanyaan ini belum dipilih.
                </p>
              )}
            </div>

            <div className="shrink-0 pt-2 sm:pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(index)}
                aria-label={`Ubah jawaban pertanyaan ${question.stage}`}
              >
                Ubah
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
