import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, majors } from '../data/majors.js'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Heading from '../components/ui/Heading.jsx'
import Section from '../components/ui/Section.jsx'
import CatalogFilters from '../components/majors/CatalogFilters.jsx'
import MajorCard from '../components/majors/MajorCard.jsx'
import MajorDetailModal from '../components/majors/MajorDetailModal.jsx'

export default function MajorsPage() {
  // Jurusan yang sedang dibuka disimpan di URL (?buka=id) agar tombol Kembali menutup detail
  // dan tautan dari halaman hasil dapat langsung membuka jurusan yang sesuai.
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = majors.find((m) => m.id === searchParams.get('buka'))

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const keyword = query.trim().toLowerCase()
  const visible = majors.filter(
    (m) =>
      (category === '' || m.category === category) &&
      (keyword === '' ||
        [m.name, m.summary, m.category, ...m.courses, ...m.skills].some((t) => t.toLowerCase().includes(keyword))),
  )
  // Filter kategori hanya tampil bila data memiliki kategori yang konsisten
  const usedCategories = categories.filter((c) => majors.some((m) => m.category === c))
  const resetFilters = () => {
    setQuery('')
    setCategory('')
  }

  return (
    <Section>
      <Heading level={1}>Jelajahi jurusan</Heading>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Kenali berbagai bidang kuliah dan apa yang biasanya dipelajari. Informasi di sini berupa
        gambaran umum. Nama jurusan dan kurikulum tiap kampus berbeda, jadi periksa langsung ke
        kampus yang kamu tuju.
      </p>

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
            <div className="mt-6">
              <EmptyState
                title="Tidak ada jurusan yang cocok"
                description="Coba kata kunci lain, pilih kategori yang berbeda, atau hapus semua filter."
              >
                <Button onClick={resetFilters}>Hapus pencarian dan filter</Button>
              </EmptyState>
            </div>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((m) => (
                <li key={m.id}>
                  <MajorCard major={m} onOpen={(id) => setSearchParams({ buka: id })} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {selected && <MajorDetailModal key={selected.id} major={selected} onClose={() => setSearchParams({}, { replace: true })} />}
    </Section>
  )
}
