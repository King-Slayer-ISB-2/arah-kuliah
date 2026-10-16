import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../../context/quizContext.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Modal from '../ui/Modal.jsx'

export default function RestartButton({ variant = 'outline', className = '' }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const { resetQuiz } = useQuiz()
  const navigate = useNavigate()

  const handleRestart = () => {
    resetQuiz()
    setShowConfirm(false)
    navigate('/quiz')
  }

  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={() => setShowConfirm(true)}
      >
        <Icon name="rotate-ccw" size={18} />
        Ulangi Kuis
      </Button>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Ulangi Eksplorasi Kuis?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Semua jawaban yang tersimpan akan diatur ulang dari awal. Kamu bisa mencoba memilih kombinasi minat lain untuk melihat variasi jurusan baru.
          </p>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={handleRestart}
            >
              Ya, Mulai dari Awal
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
