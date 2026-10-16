import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuiz } from '../../context/quizContext.js'
import Icon from '../ui/Icon.jsx'

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/quiz', label: 'Kuis Kuisan' },
  { to: '/hasil', label: 'Hasil' },
  { to: '/jurusan', label: 'Katalog Jurusan' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { savedMajors } = useQuiz()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-xs">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6"
      >
        <NavLink
          to="/"
          className="inline-flex min-h-11 items-center gap-2.5 text-xl font-extrabold tracking-tight text-brand-700"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-control bg-brand-700 text-white shadow-xs">
            <Icon name="compass" size={20} className="text-white" />
          </span>
          <span>ArahKuliah</span>
        </NavLink>

        <button
          type="button"
          className="min-h-11 rounded-control border-2 border-control px-3.5 text-sm font-semibold sm:hidden hover:bg-brand-50 cursor-pointer"
          aria-expanded={open}
          aria-controls="menu-utama"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Tutup' : 'Menu'}
        </button>

        <ul
          id="menu-utama"
          className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-1.5 pt-2 pb-1 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-2 sm:pt-0 sm:pb-0`}
        >
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `inline-flex min-h-11 w-full items-center justify-center rounded-control px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-100 text-brand-900 border border-brand-200'
                      : 'text-ink hover:bg-brand-50 hover:text-brand-800'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}

          {/* Bookmarked Majors indicator if any saved */}
          {savedMajors && savedMajors.length > 0 && (
            <li>
              <NavLink
                to="/jurusan"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-control bg-sun-100 px-3 py-2 text-xs font-bold text-sun-800 border border-sun-300 hover:bg-sun-200 transition-colors"
                title={`${savedMajors.length} jurusan tersimpan`}
              >
                <Icon name="bookmark-check" size={14} />
                <span>{savedMajors.length} Tersimpan</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
