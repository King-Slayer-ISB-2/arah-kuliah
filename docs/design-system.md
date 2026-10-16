# Design System ArahKuliah — "Adventure Journey"

Konsep: eksplorasi jurusan terasa seperti **perjalanan menemukan kemungkinan**, bukan ujian
dengan jawaban benar/salah. Nada visual: optimistis, ramah, eksploratif, modern.

**Sumber tunggal token:** blok `@theme` di `src/index.css`. Jangan menulis hex warna langsung
di komponen; pakai utilitas token (mis. `bg-brand-700`, `text-ink`, `rounded-card`).

## Warna dan perannya

| Token | Hex | Peran |
| --- | --- | --- |
| `brand-700` | `#4338ca` | Tombol utama, link, fokus, tahap aktif |
| `brand-800` / `brand-900` | `#3730a3` / `#312e81` | Hover/active, heading kontras tinggi |
| `brand-50` / `100` / `200` | `#eef2ff` / `#e0e7ff` / `#c7d2fe` | Latar lembut, item terpilih, garis dekoratif |
| `sun-400` / `sun-300` | `#fbbf24` / `#fcd34d` | Aksen: isi progres, milestone, penekanan |
| `sun-100` / `sun-800` | `#fef3c7` / `#92400e` | Latar dan teks badge aksen |
| `canvas` | `#f8f9fc` | Latar halaman |
| `surface` | `#ffffff` | Kartu dan panel |
| `ink` | `#1e1b4b` | Teks utama |
| `muted` | `#4b5563` | Teks sekunder |
| `line` | `#e5e7eb` | Garis dekoratif/pemisah |
| `control` | `#6b7280` | Border kontrol interaktif (input, kartu pilihan) |
| `success-700` / `success-50` | `#047857` / `#ecfdf5` | Status berhasil |
| `error-700` / `error-50` | `#b91c1c` / `#fef2f2` | Status error/validasi |

### Kontras (dihitung dengan rumus WCAG 2.x)

| Pasangan | Rasio | Syarat |
| --- | --- | --- |
| ink di canvas / surface | 15,2 / 16,0 | 4,5:1 teks |
| muted di surface / canvas | 7,6 / 7,2 | 4,5:1 teks |
| putih di brand-700 | 7,9 | 4,5:1 teks |
| brand-900 di brand-100 | 9,3 | 4,5:1 teks |
| ink di sun-400 | 9,6 | 4,5:1 teks |
| sun-800 di sun-100 | 6,4 | 4,5:1 teks |
| success-700 di success-50 | 5,2 | 4,5:1 teks |
| error-700 di error-50 | 5,9 | 4,5:1 teks |
| border `control` di surface | 4,8 | 3:1 komponen UI |
| fokus brand-700 di canvas | 7,5 | 3:1 komponen UI |

Aturan: teks **tidak** memakai `sun-*` sebagai warna teks di atas putih (kontras rendah).
Warna aksen dipakai sebagai latar, dengan teks `ink`.

## Tipografi

Font: sistem sans-serif (`--font-sans`), tanpa memuat font eksternal agar ringan.

| Peran | Kelas Tailwind |
| --- | --- |
| Judul halaman (h1) | `text-3xl sm:text-5xl font-extrabold tracking-tight` |
| Judul bagian (h2) | `text-2xl sm:text-3xl font-bold` |
| Judul kartu (h3) | `text-lg font-semibold` |
| Isi | `text-base` (16px), `leading-relaxed` untuk paragraf panjang |
| Label/keterangan | `text-sm` |

Satu `h1` per halaman; urutan heading tidak melompat.

## Spacing, radius, shadow, container

- Spacing memakai skala Tailwind (kelipatan 4px): gap kecil `2`, antar elemen `4`, antar bagian `8`–`12`.
- Radius: `rounded-control` (0,75rem) untuk tombol/input; `rounded-card` (1rem) untuk kartu.
- Shadow: `shadow-card` untuk kartu diam; `shadow-lift` untuk hover/modal.
- Lebar konten: `max-w-page` (64rem), padding horizontal `px-4 sm:px-6`.

## Ikon dan ilustrasi

- Ikon: SVG inline, garis 2px, sudut membulat, ukuran 20–24px, mewarisi `currentColor`
  (komponen `Icon`). Tidak ada library ikon tambahan.
- Ilustrasi: bentuk geometris sederhana (jalur putus-putus, lingkaran checkpoint, bendera).
  Tidak ada gambar raster berat.

## Tombol, kartu, dan form

- **Tombol:** tinggi minimal 44px (`min-h-11`). Varian `primary` (isi brand-700, teks putih),
  `secondary` (garis brand-700, latar putih), `ghost` (tanpa border, teks brand-700).
- **Kartu:** latar `surface`, `rounded-card`, border `line`, `shadow-card`.
- **Kartu pilihan / input:** border 2px `control`; padding minimal `p-4`.

## State interaktif

Semua state harus dapat dibedakan **tanpa mengandalkan warna saja**.

| State | Aturan visual | Pembeda non-warna |
| --- | --- | --- |
| default | Border `control`, latar putih | — |
| hover | Latar `brand-50`, shadow naik | Perubahan bayangan |
| focus | Outline 3px `brand-700`, offset 2px | Outline tebal |
| selected | Border `brand-700` tebal, latar `brand-50` | Ikon centang + teks "Dipilih" |
| disabled | Opasitas 50%, kursor `not-allowed` | Tidak bisa diklik, atribut `disabled` |
| success | `success-700` di `success-50` | Ikon centang + teks |
| error | `error-700` di `error-50`, `role="alert"` | Ikon peringatan + pesan teks |

## Gerak

Animasi singkat (≤ 200ms) dan opsional. `prefers-reduced-motion` dihormati di `src/index.css`.

## Catatan kesepakatan tim

Token disepakati sebelum dipakai di banyak halaman. Perubahan token dilakukan lewat PR
yang mengubah `src/index.css` dan dokumen ini sekaligus.
