import { useQuiz } from '../../context/quizContext.js'
import Modal from '../ui/Modal.jsx'
import Badge from '../ui/Badge.jsx'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'

export default function MajorDetailModal({ major, onClose }) {
  const { isMajorSaved, toggleSaveMajor } = useQuiz()
  const isSaved = isMajorSaved(major.id)

  return (
    <Modal isOpen={true} onClose={onClose} title={major.name} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Top Badges & Degree */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{major.category}</Badge>
            <span className="text-xs font-semibold text-muted bg-canvas px-3 py-1 rounded-full border border-line">
              {major.degree}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleSaveMajor(major.id)}
            className={`inline-flex items-center gap-1.5 rounded-control px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              isSaved
                ? 'bg-brand-100 text-brand-900 border border-brand-200'
                : 'border border-control/30 bg-surface text-ink hover:bg-brand-50'
            }`}
          >
            <Icon name={isSaved ? 'bookmark-check' : 'bookmark'} size={16} />
            {isSaved ? 'Tersimpan di Bookmark' : 'Simpan Jurusan'}
          </button>
        </div>

        {/* Detailed Description */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
            Gambaran Umum Jurusan
          </h3>
          <p className="mt-2 text-base text-ink leading-relaxed">
            {major.description}
          </p>
        </div>

        {/* Courses & Activities Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Courses */}
          <div className="rounded-card border border-line bg-canvas p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-ink">
              <Icon name="book-open" size={18} className="text-brand-700" />
              Contoh Mata Kuliah Khas
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/90">
              {major.courses.map((course, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div className="rounded-card border border-line bg-canvas p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-ink">
              <Icon name="target" size={18} className="text-brand-700" />
              Aktivitas & Proyek Mahasiswa
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/90">
              {major.activities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-800" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills & Career Options */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-bold text-ink">Keterampilan yang Diasah:</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {major.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 border border-brand-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink">Peluang & Prospek Karier:</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {major.careers.map((career, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-sun-100 px-3 py-1 text-xs font-semibold text-sun-800 border border-sun-300/60"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Self-Reflection Questions */}
        {major.reflectionQuestions && major.reflectionQuestions.length > 0 && (
          <div className="rounded-card border-2 border-brand-200 bg-brand-50/70 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-brand-900">
              <Icon name="lightbulb" size={18} className="text-brand-700" />
              Pertanyaan Refleksi untuk Menilai Kecocokanmu:
            </h4>
            <p className="mt-1 text-xs text-muted">
              Gunakan pertanyaan ini untuk merenungkan apakah jurusan ini selaras dengan caramu berkembang:
            </p>
            <ol className="mt-3 space-y-2 text-sm text-ink">
              {major.reflectionQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="italic font-medium">"{q}"</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Disclaimer Reminder */}
        <div className="rounded-control bg-canvas p-4 text-xs text-muted border border-line">
          <strong>Catatan:</strong> Informasi kurikulum dan mata kuliah dapat berbeda di tiap perguruan tinggi (PTN/PTS). Pastikan untuk mengecek situs resmi fakultas atau program studi di kampus yang kamu tuju.
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>
            Tutup Dialog
          </Button>
        </div>
      </div>
    </Modal>
  )
}
