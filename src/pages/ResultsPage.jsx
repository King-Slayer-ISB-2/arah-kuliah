import { questions } from '../data/questions.js'
import { mockRecommendations } from '../data/recommendations.js'
import { useQuiz } from '../context/quizContext.js'
import { firstMissingIndex } from '../utils/quiz.js'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
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
  const ready = firstMissingIndex(questions, answers) === -1

  if (!ready) {
    return (
      <Section>
        <Heading level={1} size={2} className="mb-4 text-center">
          Hasil eksplorasi
        </Heading>
        <EmptyState
          title="Hasil belum tersedia"
          description="Selesaikan kuis dulu agar ArahKuliah bisa menampilkan bidang yang bisa kamu jelajahi."
        >
          <Button to="/quiz">Mulai kuis</Button>
        </EmptyState>
      </Section>
    )
  }

  return (
    <>
      <Section className="pb-4">
        <Badge tone="accent">Perjalananmu selesai</Badge>
        <Heading level={1} className="mt-3">
          Ini titik awal eksplorasimu
        </Heading>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Berikut beberapa bidang yang bisa kamu pertimbangkan. Hasil ini bahan eksplorasi awal,
          bukan keputusan akhir. Contoh rekomendasi di bawah masih berupa data contoh.
        </p>
      </Section>

      <Section className="pt-2" aria-labelledby="judul-perjalanan">
        <Heading level={2} size={3} id="judul-perjalanan" className="mb-4">
          Tahap yang sudah kamu lewati
        </Heading>
        <JourneyTrail steps={stageLabels} currentIndex={stageLabels.length} />
      </Section>

      <Section aria-labelledby="judul-rekomendasi">
        <Heading level={2} id="judul-rekomendasi">
          Bidang untuk dipertimbangkan
        </Heading>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {mockRecommendations.map((r) => (
            <li key={r.id}>
              <RecommendationCard {...r} exploreTo={`/jurusan?buka=${r.id}`} />
            </li>
          ))}
        </ul>
      </Section>

      <Section className="flex flex-wrap gap-3">
        <Button to="/jurusan">
          Jelajahi jurusan <Icon name="arrow-right" />
        </Button>
        <RestartButton />
      </Section>
    </>
  )
}
