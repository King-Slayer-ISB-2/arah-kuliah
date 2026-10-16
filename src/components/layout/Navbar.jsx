import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/quiz', label: 'Kuis' },
  { to: '/hasil', label: 'Hasil' },
  { to: '/jurusan', label: 'Jurusan' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-line bg-surface">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6"
      >
        <NavLink to="/" className="inline-flex min-h-11 items-center text-lg font-bold text-brand-700">
          ArahKuliah
        </NavLink>
        <button
          type="button"
          className="min-h-11 rounded-control border-2 border-control px-3 text-sm font-medium sm:hidden"
          aria-expanded={open}
          aria-controls="menu-utama"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Tutup menu' : 'Menu'}
        </button>
        <ul
          id="menu-utama"
          className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-1 sm:flex sm:w-auto sm:flex-row`}
        >
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block min-h-11 rounded-control px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-brand-100 text-brand-900 underline' : 'text-ink hover:bg-brand-50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
