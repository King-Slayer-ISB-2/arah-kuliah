import { createContext, useContext } from 'react'

export const QuizContext = createContext(null)

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz harus digunakan di dalam QuizProvider')
  }
  return context
}
