import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function AppShell() {
  const { pathname } = useLocation()

  // Kembali ke atas setiap pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Lewati ke konten
      </a>
      <Navbar />
      <main id="konten" className="mx-auto w-full max-w-page flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
