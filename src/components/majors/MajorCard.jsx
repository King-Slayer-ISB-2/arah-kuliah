import { useQuiz } from '../../context/quizContext.js'
import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import Icon from '../ui/Icon.jsx'

export default function MajorCard({ major, onOpen }) {
  const { isMajorSaved, toggleSaveMajor } = useQuiz()
  const isSaved = isMajorSaved(major.id)

  return (
    <Card className="flex h-full flex-col justify-between border-2 border-line bg-surface p-5 transition-all duration-200 hover:border-brand-300 hover:shadow-lift">
      <div>
        <div className="flex items-start justify-between gap-2">
          <Badge tone="brand">{major.category}</Badge>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleSaveMajor(major.id)
            }}
            aria-label={isSaved ? `Hapus bookmark ${major.name}` : `Simpan ${major.name}`}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-control transition-colors cursor-pointer ${
              isSaved
                ? 'bg-brand-100 text-brand-800'
                : 'text-muted hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            <Icon name={isSaved ? 'bookmark-check' : 'bookmark'} size={18} />
          </button>
        </div>

        <h3 className="mt-3 text-lg font-bold text-ink">
          {major.name}
        </h3>
        <p className="mt-0.5 text-xs text-muted font-medium">{major.degree}</p>

        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
          {major.summary}
        </p>

        {/* Courses preview */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-muted">Contoh Mata Kuliah:</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {major.courses.slice(0, 2).map((c) => (
              <span
                key={c}
                className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-medium text-ink border border-line"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Careers preview */}
        {major.careers && major.careers.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-muted">Prospek Karier:</p>
            <p className="mt-1 text-xs text-ink/80 truncate">
              {major.careers.slice(0, 2).join(' • ')}
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-line pt-3">
        <button
          type="button"
          onClick={() => onOpen(major.id)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-control border-2 border-brand-700 bg-surface px-4 py-2 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50 cursor-pointer focus-visible:outline-3 focus-visible:outline-brand-700"
        >
          Lihat Selengkapnya
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </Card>
  )
}
