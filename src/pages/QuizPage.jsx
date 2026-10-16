import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data/questions.js'
import { useQuiz } from '../context/quizContext.js'
import { firstMissingIndex, isAnswered, requiredMessage } from '../utils/quiz.js'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Heading from '../components/ui/Heading.jsx'
import AnswerSummary from '../components/quiz/AnswerSummary.jsx'
import ProgressIndicator from '../components/quiz/ProgressIndicator.jsx'
import QuestionCard from '../components/quiz/QuestionCard.jsx'
import QuestionRenderer from '../components/quiz/QuestionRenderer.jsx'
import RestartButton from '../components/results/RestartButton.jsx'
import QuizNavigation from '../components/quiz/QuizNavigation.jsx'
import ValidationMessage from '../components/quiz/ValidationMessage.jsx'

const REVIEW = questions.length // indeks langkah ringkasan (setelah pertanyaan terakhir)
const stageLabels = [...questions.map((q) => q.stage), 'Ringkasan']

export default function QuizPage() {
  const { answers, currentStep, setCurrentStep } = useQuiz()
  const navigate = useNavigate()
  // Langkah tempat pesan validasi ditampilkan (null = tidak ada). Otomatis hilang saat pindah langkah.
  const [errorStep, setErrorStep] = useState(null)
  // true bila pengguna membuka sebuah pertanyaan dari ringkasan untuk mengubah jawabannya
  const [editingFromReview, setEditingFromReview] = useState(false)

  const inReview = currentStep === REVIEW
  const question = inReview ? null : questions[currentStep]
  const answered = question ? isAnswered(question, answers) : true

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  function goNext() {
    if (!answered) {
      setErrorStep(currentStep)
      return
    }
    if (editingFromReview) {
      setEditingFromReview(false)
      setCurrentStep(REVIEW)
      return
    }
    setCurrentStep(currentStep + 1)
  }

  function goBack() {
    if (editingFromReview) {
      setEditingFromReview(false)
      setCurrentStep(REVIEW)
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  function editAnswer(index) {
    setEditingFromReview(true)
    setCurrentStep(index)
  }

  function showResults() {
    const missing = firstMissingIndex(questions, answers)
    if (missing === -1) navigate('/hasil')
    else {
      setCurrentStep(missing)
      setErrorStep(missing)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Heading level={1} size={2} className="mb-2">
        {inReview ? 'Periksa jawabanmu' : 'Eksplorasi minatmu'}
      </Heading>
      <p className="mb-6 text-muted">
        {inReview
          ? 'Pastikan semuanya sudah sesuai. Kamu bisa mengubah jawaban mana pun sebelum melihat hasil.'
          : 'Tidak ada jawaban benar atau salah. Pilih yang paling terasa seperti kamu.'}
      </p>
      <ProgressIndicator steps={stageLabels} currentStep={currentStep} />

      {inReview ? (
        Object.keys(answers).length === 0 ? (
          <EmptyState title="Belum ada jawaban" description="Jawab beberapa pertanyaan dulu agar ada yang bisa diringkas.">
            <Button onClick={() => setCurrentStep(0)}>Mulai dari pertanyaan pertama</Button>
          </EmptyState>
        ) : (
          <>
            <AnswerSummary questions={questions} answers={answers} onEdit={editAnswer} />
            <QuizNavigation
              onBack={() => setCurrentStep(REVIEW - 1)}
              onNext={showResults}
              nextLabel="Lihat hasil"
            />
            <div className="mt-4 border-t border-line pt-4">
              <RestartButton />
            </div>
          </>
        )
      ) : (
        <>
          <QuestionCard question={question}>
            <QuestionRenderer question={question} />
            <ValidationMessage message={errorStep === currentStep && !answered ? requiredMessage(question) : ''} />
          </QuestionCard>
          <QuizNavigation
            canGoBack={currentStep > 0 || editingFromReview}
            onBack={goBack}
            onNext={goNext}
            backLabel={editingFromReview ? 'Batal' : 'Kembali'}
            nextLabel={
              editingFromReview
                ? 'Simpan dan kembali ke ringkasan'
                : currentStep === REVIEW - 1
                  ? 'Tinjau jawaban'
                  : 'Lanjut'
            }
          />
        </>
      )}
    </div>
  )
}
