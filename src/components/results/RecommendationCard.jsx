import { Link } from 'react-router-dom'
import { useQuiz } from '../../context/quizContext.js'
import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import Icon from '../ui/Icon.jsx'

export default function RecommendationCard({
  id,
  title,
  category,
  degree,
  score,
  summary,
  whyItMatches = [],
  courses = [],
  activities = [],
  reflectionQuestions = [],
  exploreTo,
}) {
  const { isMajorSaved, toggleSaveMajor } = useQuiz()
  const isSaved = isMajorSaved(id)

  const reasons = Array.isArray(whyItMatches) ? whyItMatches : [whyItMatches]

  return (
    <Card className="flex h-full flex-col justify-between border-2 border-line bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-brand-300 hover:shadow-lift">
      <div>
        {/* Header with Category and Compatibility Score */}
        <div className="flex items-start justify-between gap-2">
          <Badge tone="brand">{category}</Badge>
          <div className="flex items-center gap-1.5">
            {score && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sun-100 px-2.5 py-1 text-xs font-bold text-sun-800">
                <Icon name="sparkles" size={13} className="text-sun-800" />
                {score}% Kecocokan
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleSaveMajor(id)}
              aria-label={isSaved ? `Hapus bookmark ${title}` : `Simpan ${title} ke bookmark`}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-control transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-brand-100 text-brand-800'
                  : 'text-muted hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              <Icon name={isSaved ? 'bookmark-check' : 'bookmark'} size={18} />
            </button>
          </div>
        </div>

        {/* Major Title */}
        <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
          {title}
        </h3>
        {degree && (
          <p className="text-xs font-medium text-muted mt-0.5">{degree}</p>
        )}

        <p className="mt-2 text-sm text-muted leading-relaxed">
          {summary}
        </p>

        {/* Why it Matches (Mengapa Cocok Untukmu) */}
        {reasons.length > 0 && (
          <div className="mt-4 rounded-control border border-brand-100 bg-brand-50/60 p-3.5">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-900">
              <Icon name="lightbulb" size={14} className="text-brand-700" />
              Mengapa cocok untukmu:
            </h4>
            <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-ink/90">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sample Courses & Activities */}
        {(courses.length > 0 || activities.length > 0) && (
          <div className="mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
              Contoh Mata Kuliah & Aktivitas:
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {courses.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-ink border border-line"
                >
                  {c}
                </span>
              ))}
              {activities.slice(0, 1).map((a, i) => (
                <span
                  key={`act-${i}`}
                  className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-900 border border-brand-200"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reflection Question */}
        {reflectionQuestions.length > 0 && (
          <div className="mt-4 border-t border-line/60 pt-3">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold text-muted">
              <Icon name="help-circle" size={14} className="text-brand-700" />
              Refleksi Dirimu:
            </h4>
            <p className="mt-1 text-xs sm:text-sm italic text-muted">
              "{reflectionQuestions[0]}"
            </p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 border-t border-line pt-4">
        <Link
          to={exploreTo || `/jurusan?buka=${id}`}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-control bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-800 focus-visible:outline-3 focus-visible:outline-brand-700"
        >
          Pelajari Detail Jurusan
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </Card>
  )
}
