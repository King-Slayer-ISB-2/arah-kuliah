import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-8">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold text-brand-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-control bg-brand-700 text-white">
                <Icon name="compass" size={16} />
              </span>
              <span>ArahKuliah</span>
            </Link>
            <p className="mt-2 max-w-md text-xs sm:text-sm text-muted leading-relaxed">
              Platform interaktif eksplorasi jurusan perguruan tinggi untuk siswa SMA/SMK/MA berdasarkan minat, hobi, aktivitas, kekuatan, dan cara belajar.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-medium">
            <Link to="/" className="text-muted hover:text-brand-700">Beranda</Link>
            <Link to="/quiz" className="text-muted hover:text-brand-700">Kuis Eksplorasi</Link>
            <Link to="/hasil" className="text-muted hover:text-brand-700">Hasil Rekomendasi</Link>
            <Link to="/jurusan" className="text-muted hover:text-brand-700">Katalog Jurusan</Link>
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-6 text-xs text-muted leading-relaxed">
          <p>
            <strong>Peringatan Etis:</strong> ArahKuliah bukan tes diagnosis psikologis klinis atau penentu mutlak masa depan. Hasil yang disajikan adalah saran eksplorasi awal untuk bahan diskusi dengan orang tua, guru BK, dan konselor pendidikan.
          </p>
          <p className="mt-2 text-muted/80">
            © {CURRENT_YEAR} ArahKuliah. Membantu generasi muda menemukan arah masa depannya.
          </p>
        </div>
      </div>
    </footer>
  )
}
