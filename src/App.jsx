import { Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import HomePage from './pages/HomePage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import MajorsPage from './pages/MajorsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="hasil" element={<ResultsPage />} />
        <Route path="jurusan" element={<MajorsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
