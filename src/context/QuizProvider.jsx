import { useState, useEffect } from 'react'
import { QuizContext } from './quizContext.js'

const ANSWERS_STORAGE_KEY = 'arahkuliah_answers'
const STEP_STORAGE_KEY = 'arahkuliah_current_step'
const SAVED_MAJORS_KEY = 'arahkuliah_saved_majors'

export default function QuizProvider({ children }) {
  // Load initial answers from localStorage
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(ANSWERS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Load current step from localStorage
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STEP_STORAGE_KEY)
      return saved ? parseInt(saved, 10) : 0
    } catch {
      return 0
    }
  })

  // Saved bookmarks
  const [savedMajors, setSavedMajors] = useState(() => {
    try {
      const saved = localStorage.getItem(SAVED_MAJORS_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Persist answers
  useEffect(() => {
    try {
      localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers))
    } catch (e) {
      console.warn('Gagal menyimpan jawaban ke localStorage', e)
    }
  }, [answers])

  // Persist step
  useEffect(() => {
    try {
      localStorage.setItem(STEP_STORAGE_KEY, currentStep.toString())
    } catch (e) {
      console.warn('Gagal menyimpan step ke localStorage', e)
    }
  }, [currentStep])

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_MAJORS_KEY, JSON.stringify(savedMajors))
    } catch (e) {
      console.warn('Gagal menyimpan bookmark ke localStorage', e)
    }
  }, [savedMajors])

  const setAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const resetQuiz = () => {
    setAnswers({})
    setCurrentStep(0)
    try {
      localStorage.removeItem(ANSWERS_STORAGE_KEY)
      localStorage.removeItem(STEP_STORAGE_KEY)
    } catch (e) {
      console.warn('Gagal mereset quiz di localStorage', e)
    }
  }

  const toggleSaveMajor = (majorId) => {
    setSavedMajors((prev) =>
      prev.includes(majorId) ? prev.filter((id) => id !== majorId) : [...prev, majorId],
    )
  }

  const isMajorSaved = (majorId) => savedMajors.includes(majorId)

  const value = {
    answers,
    setAnswers,
    setAnswer,
    currentStep,
    setCurrentStep,
    resetQuiz,
    savedMajors,
    toggleSaveMajor,
    isMajorSaved,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
