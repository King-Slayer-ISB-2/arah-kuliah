import { useMemo, useState } from 'react'
import { questions } from '../data/questions.js'
import { majors } from '../data/majors.js'
import { mockRecommendations } from '../data/recommendations.js'
import { useQuiz } from '../context/quizContext.js'
import { firstMissingIndex, calculateRecommendations } from '../utils/quiz.js'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Heading from '../components/ui/Heading.jsx'
import Icon from '../components/ui/Icon.jsx'
import Section from '../components/ui/Section.jsx'
import RestartButton from '../components/results/RestartButton.jsx'
import RecommendationCard from '../components/results/RecommendationCard.jsx'
import JourneyTrail from '../components/journey/JourneyTrail.jsx'

const stageLabels = questions.map((q) => q.stage)

export default function ResultsPage() {
  const { answers } = useQuiz()
  const [copied, setCopied] = useState(false)
  const ready = firstMissingIndex(questions, answers) === -1

  // Dynamic recommendations based on user's specific answers
  const recommendations = useMemo(() => {
    if (!ready) return mockRecommendations
    try {
      const calculated = calculateRecommendations(answers, majors)
      return calculated.length > 0 ? calculated.slice(0, 3) : mockRecommendations
    } catch {
      return mockRecommendations
    }
  }, [answers, ready])

  const handleCopySummary = () => {
    const textSummary = `Hasil Eksplorasi ArahKuliah:\n` +
      recommendations
        .map(
          (r, i) =>
            `${i + 1}. ${r.title} (${r.category}) - Kecocokan: ${r.score}%\n   Alasan: ${
              Array.isArray(r.whyItMatches) ? r.whyItMatches[0] : r.whyItMatches
            }\n`,
        )
        .join('\n') +
      `\nCatatan: Hasil ini merupakan titik awal eksplorasi, bukan tes psikologi atau penentu mutlak masa depan.`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textSummary)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (!ready) {
    return (
      <Section>
        <Heading level={1} size={2} className="mb-4 text-center">
          Hasil eksplorasi
        </Heading>
        <EmptyState
          title="Hasil belum tersedia"
          description="Selesaikan kuis dulu agar ArahKuliah bisa menampilkan bidang dan jurusan yang paling relevan untuk kamu pertimbangkan."
        >
          <Button to="/quiz">
            Mulai Kuis Sekarang <Icon name="arrow-right" size={16} />
          </Button>
        </EmptyState>
      </Section>
    )
  }

  return (
    <>
      {/* Hero Result Section */}
      <Section className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge tone="accent">Perjalanan Eksplorasi Selesai</Badge>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-control border border-line bg-surface px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-ink hover:bg-brand-50 cursor-pointer transition-colors"
            >
              <Icon name={copied ? 'check' : 'share'} size={16} className={copied ? 'text-success-700' : 'text-brand-700'} />
              {copied ? 'Tersalin ke Clipboard!' : 'Salin Ringkasan'}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-control border border-line bg-surface px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-ink hover:bg-brand-50 cursor-pointer transition-colors"
            >
              <Icon name="book-open" size={16} className="text-brand-700" />
              Cetak Hasil
            </button>
          </div>
        </div>

        <Heading level={1} className="mt-4">
          Ini titik awal eksplorasi jurusanmu
        </Heading>
        <p className="mt-3 max-w-3xl text-base sm:text-lg text-muted leading-relaxed">
          Berdasarkan kombinasi minat, kegiatan yang kamu senangi, peran yang kamu sukai, kekuatan yang dirasakan, dan caramu belajar, berikut beberapa bidang yang layak kamu pelajari lebih dalam.
        </p>
      </Section>

      {/* Exploration Trail */}
      <Section className="pt-2" aria-labelledby="judul-perjalanan">
        <Heading level={2} size={3} id="judul-perjalanan" className="mb-4">
          Tahap yang sudah kamu lewati
        </Heading>
        <JourneyTrail steps={stageLabels} currentIndex={stageLabels.length} />
      </Section>

      {/* Major Recommendations Grid */}
      <Section aria-labelledby="judul-rekomendasi">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <Heading level={2} id="judul-rekomendasi">
              Bidang & Jurusan untuk Dipertimbangkan
            </Heading>
            <p className="mt-1 text-sm text-muted">
              Pilihan disusun berdasarkan tingkat relevansi tertinggi terhadap jawabanmu.
            </p>
          </div>
          <Button to="/jurusan" variant="ghost" size="sm">
            Lihat semua katalog jurusan <Icon name="arrow-right" size={16} />
          </Button>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {recommendations.map((r) => (
            <li key={r.id}>
              <RecommendationCard {...r} exploreTo={`/jurusan?buka=${r.id}`} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Mandatory Disclaimer & Reflection Section */}
      <Section aria-labelledby="judul-disclaimer">
        <Card className="border-2 border-brand-200 bg-brand-50/80 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
              <Icon name="info" size={24} />
            </div>
            <div>
              <Heading level={3} id="judul-disclaimer" className="text-lg sm:text-xl font-bold text-brand-900">
                Penting: ArahKuliah adalah Bahan Diskusi Awal, Bukan Keputusan Mutlak
              </Heading>
              <p className="mt-2 text-sm sm:text-base text-ink/90 leading-relaxed">
                ArahKuliah <strong>bukan alat tes psikologi klinis</strong>, bukan alat diagnosis kepribadian, dan <strong>tidak menentukan mutlak masa depanmu</strong>. Hasil di atas adalah peta kemungkinan yang dihitung dari pilihan jawaban saat ini.
              </p>
              <p className="mt-2 text-sm sm:text-base text-ink/90 leading-relaxed">
                Sebelum menentukan pilihan final, pertimbangkan faktor-faktor penting lainnya: kurikulum perguruan tinggi yang dituju, kemampuan akademik, kesiapan biaya, lokasi kampus, prospek karier jangka panjang, serta diskusi dengan orang tua, guru BK, konselor, maupun mahasiswa aktif di bidang tersebut.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Actionable Next Steps Checklist */}
      <Section aria-labelledby="judul-langkah-lanjut">
        <Heading level={2} size={3} id="judul-langkah-lanjut" className="mb-4">
          Langkah Tindak Lanjut yang Dianjurkan
        </Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-line bg-surface p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-control bg-sun-100 text-sun-800 font-bold">
              1
            </div>
            <h3 className="mt-3 text-base font-bold text-ink">
              Bawa Hasil ke Guru BK
            </h3>
            <p className="mt-1 text-sm text-muted">
              Tunjukkan rekomendasi dan alasan ini ke guru Bimbingan Konseling (BK) di sekolahmu untuk mencocokkan dengan nilai rapormu.
            </p>
          </Card>

          <Card className="border border-line bg-surface p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-control bg-sun-100 text-sun-800 font-bold">
              2
            </div>
            <h3 className="mt-3 text-base font-bold text-ink">
              Diskusi Santai dengan Orang Tua
            </h3>
            <p className="mt-1 text-sm text-muted">
              Ajak orang tua melihat pilihan bidang ini bersama. Bicarakan keselarasan harapan, kesiapan pembiayaan, dan lokasi kampus.
            </p>
          </Card>

          <Card className="border border-line bg-surface p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-control bg-sun-100 text-sun-800 font-bold">
              3
            </div>
            <h3 className="mt-3 text-base font-bold text-ink">
              Cek Kurikulum Kampus Tujuan
            </h3>
            <p className="mt-1 text-sm text-muted">
              Buka website resmi program studi di PTN/PTS sasaran. Periksa silabus mata kuliah tahun pertama untuk melihat kecocokannya.
            </p>
          </Card>
        </div>
      </Section>

      {/* Navigation Buttons */}
      <Section className="flex flex-wrap items-center gap-3 border-t border-line pt-8">
        <Button to="/jurusan">
          Jelajahi Semua Jurusan <Icon name="arrow-right" size={18} />
        </Button>
        <RestartButton />
      </Section>
    </>
  )
}
