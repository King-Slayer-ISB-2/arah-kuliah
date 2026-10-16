import Icon from '../ui/Icon.jsx'

export default function CatalogFilters({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
  onReset,
  resultCount,
}) {
  const hasFilter = query.trim() !== '' || category !== ''

  return (
    <div className="mt-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <label htmlFor="search-majors" className="sr-only">
          Cari jurusan, keahlian, atau mata kuliah
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
          <Icon name="search" size={20} />
        </div>
        <input
          id="search-majors"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari jurusan, minat, keahlian, atau mata kuliah (cth: AI, desain, biologi, data)..."
          className="w-full rounded-control border-2 border-control/30 bg-surface py-3 pr-10 pl-11 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand-700 focus:outline-hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Hapus kata kunci pencarian"
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted hover:text-ink cursor-pointer"
          >
            <Icon name="x" size={18} />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange('')}
          className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
            category === ''
              ? 'bg-brand-700 text-white shadow-xs'
              : 'border border-line bg-surface text-ink hover:border-brand-700 hover:bg-brand-50'
          }`}
        >
          Semua Kategori
        </button>

        {categories.map((cat) => {
          const isSelected = category === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-brand-700 text-white shadow-xs'
                  : 'border border-line bg-surface text-ink hover:border-brand-700 hover:bg-brand-50'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Result Count & Reset Action */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-muted">
        <span>
          Menemukan <strong className="text-ink">{resultCount}</strong> jurusan
        </span>
        {hasFilter && (
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer font-semibold text-brand-700 hover:underline"
          >
            Hapus filter & pencarian
          </button>
        )}
      </div>
    </div>
  )
}
