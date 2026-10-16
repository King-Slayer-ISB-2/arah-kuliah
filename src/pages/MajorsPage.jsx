import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, majors } from '../data/majors.js'
import { useQuiz } from '../context/quizContext.js'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Heading from '../components/ui/Heading.jsx'
import Icon from '../components/ui/Icon.jsx'
import Section from '../components/ui/Section.jsx'
import CatalogFilters from '../components/majors/CatalogFilters.jsx'
import MajorCard from '../components/majors/MajorCard.jsx'
import MajorDetailModal from '../components/majors/MajorDetailModal.jsx'

export default function MajorsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { savedMajors } = useQuiz()
  const selected = majors.find((m) => m.id === searchParams.get('buka'))

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [onlySaved, setOnlySaved] = useState(false)

  const keyword = query.trim().toLowerCase()
  const visible = majors.filter(
    (m) =>
      (!onlySaved || savedMajors.includes(m.id)) &&
      (category === '' || m.category === category) &&
      (keyword === '' ||
        [m.name, m.summary, m.category, ...m.courses, ...m.skills, ...m.careers].some((t) =>
          t.toLowerCase().includes(keyword),
        )),
  )

  const usedCategories = categories.filter((c) => majors.some((m) => m.category === c))

  const resetFilters = () => {
    setQuery('')
    setCategory('')
    setOnlySaved(false)
  }

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Heading level={1}>Jelajahi Jurusan Kuliah</Heading>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
            Kenali berbagai program studi, apa yang biasanya dipelajari, proyek mahasiswa, serta prospek kariernya. Informasi ini dapat menjadi bahan diskusi sebelum menentukan pilihan.
          </p>
        </div>

        {savedMajors.length > 0 && (
          <button
            type="button"
            onClick={() => setOnlySaved((prev) => !prev)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-control px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
              onlySaved
                ? 'bg-brand-700 text-white shadow-xs'
                : 'border-2 border-line bg-surface text-ink hover:bg-brand-50'
            }`}
          >
            <Icon name="bookmark-check" size={18} />
            <span>Tersimpan ({savedMajors.length})</span>
          </button>
        )}
      </div>

      {majors.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="Data jurusan belum tersedia" description="Coba muat ulang halaman ini nanti.">
            <Button to="/">Kembali ke beranda</Button>
          </EmptyState>
        </div>
      ) : (
        <>
          <CatalogFilters
            query={query}
            onQueryChange={setQuery}
            categories={usedCategories}
            category={category}
            onCategoryChange={setCategory}
            onReset={resetFilters}
            resultCount={visible.length}
          />

          {visible.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                title={onlySaved ? 'Belum ada jurusan yang disimpan' : 'Tidak ada jurusan yang cocok'}
                description={
                  onlySaved
                    ? 'Klik ikon bookmark pada kartu jurusan mana saja untuk menyimpannya di sini.'
                    : 'Coba gunakan kata kunci lain, pilih kategori yang berbeda, atau hapus filter.'
                }
              >
                <Button onClick={resetFilters}>
                  {onlySaved ? 'Lihat Semua Jurusan' : 'Hapus Pencarian & Filter'}
                </Button>
              </EmptyState>
            </div>
          ) : (
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((m) => (
                <li key={m.id}>
                  <MajorCard major={m} onOpen={(id) => setSearchParams({ buka: id })} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {selected && (
        <MajorDetailModal
          key={selected.id}
          major={selected}
          onClose={() => setSearchParams({}, { replace: true })}
        />
      )}
    </Section>
  )
}
