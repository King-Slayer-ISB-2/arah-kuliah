import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import Heading from '../ui/Heading.jsx'

export default function QuestionCard({ question, children }) {
  if (!question) return null

  return (
    <Card className="border-2 border-line/80 bg-surface shadow-card transition-all duration-200">
      <div className="mb-4 flex items-center justify-between">
        <Badge tone="brand">Tahap: {question.stage}</Badge>
        <span className="text-xs font-semibold text-muted">
          Pilihan Tunggal
        </span>
      </div>

      <Heading level={2} size={2} className="text-xl sm:text-2xl font-bold text-ink">
        {question.title}
      </Heading>

      {question.description && (
        <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
          {question.description}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </Card>
  )
}
