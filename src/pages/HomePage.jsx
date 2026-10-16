import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Heading from '../components/ui/Heading.jsx'
import Icon from '../components/ui/Icon.jsx'
import Section from '../components/ui/Section.jsx'
import HeroArt from '../components/home/HeroArt.jsx'

const benefits = [
  {
    icon: 'compass',
    title: 'Mulai dari Mengenali Dirimu',
    text: 'Pertanyaan interaktif mencakup minat utama, hobi waktu luang, peran aktivitas kerja, kekuatan diri, dan gaya belajar favorit.',
  },
  {
    icon: 'pin',
    title: 'Ada Alasan Logis di Balik Hasil',
    text: 'Setiap jurusan yang muncul disertai penjelasan mengapa cocok dengan pilihanmu, contoh mata kuliah nyata, dan aktivitas kampus.',
  },
  {
    icon: 'flag',
    title: 'Tanpa Benar atau Salah',
    text: 'Ini bukan ujian sekolah. Tidak ada skor kelulusan, melainkan peta kemungkinan untuk membuka wawasan sebelum memilih jurusan.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Jawab Pertanyaan Singkat',
    desc: 'Lewati 5 tahap singkat: minat, hobi, preferensi aktivitas, kekuatan, dan gaya belajarmu.',
  },
  {
    num: '2',
    title: 'Periksa & Tinjau Jawaban',
    desc: 'Bebas mengubah pilihan jawaban kapan saja sebelum melihat ringkasan hasil akhir.',
  },
  {
    num: '3',
    title: 'Dapatkan Rekomendasi Jurusan',
    desc: 'Lihat beberapa bidang kuliah yang relevan, lengkap dengan mata kuliah, aktivitas, dan pertanyaan refleksi.',
  },
  {
    num: '4',
    title: 'Diskusikan & Ambil Langkah Lanjut',
    desc: 'Jadikan hasilnya bahan obrolan dengan guru BK, orang tua, serta riset kurikulum kampus tujuan.',
  },
]

const explorationAreas = [
  { name: 'Teknologi & Komputasi', icon: 'sparkles' },
  { name: 'Seni, Desain & Media', icon: 'lightbulb' },
  { name: 'Kesehatan & Kedokteran', icon: 'heart' },
  { name: 'Bisnis & Manajemen', icon: 'briefcase' },
  { name: 'Sosial & Komunikasi', icon: 'user' },
  { name: 'Rekayasa & Teknik Fisik', icon: 'target' },
  { name: 'Hukum & Kebijakan Publik', icon: 'flag' },
  { name: 'Lingkungan & Sains Bahari', icon: 'compass' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="grid items-center gap-10 md:grid-cols-2">
        <div className="animate-fade-up">
          <Badge tone="accent">
            <Icon name="sparkles" size={14} className="text-sun-800" />
            Eksplorasi Jurusan Siswa SMA/SMK/MA
          </Badge>
          <Heading level={1} className="mt-4">
            Temukan arah kuliah yang layak kamu jelajahi
          </Heading>
          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
            Bingung mau kuliah ke mana? ArahKuliah membantu memetakan pilihan jurusan berdasarkan minat, hobi, aktivitas favorit, kekuatan diri, dan caramu belajar — lengkap dengan alasan dan contoh mata kuliahnya.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button to="/quiz" size="lg">
              Mulai Kuis Eksplorasi <Icon name="arrow-right" size={20} />
            </Button>
            <Button to="/jurusan" variant="secondary" size="lg">
              Lihat Katalog Jurusan
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted">
            ⏱️ Waktu pengerjaan sekitar 3–5 menit • Tanpa perlu daftar akun
          </p>
        </div>
        <HeroArt className="animate-fade-up mx-auto w-full max-w-lg" />
      </Section>

      {/* Benefits Section */}
      <Section aria-labelledby="judul-manfaat">
        <div className="text-center sm:text-left">
          <Badge tone="brand">Kenapa ArahKuliah</Badge>
          <Heading level={2} id="judul-manfaat" className="mt-2">
            Dirancang agar eksplorasi terasa ramah dan bermakna
          </Heading>
        </div>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title}>
              <Card interactive className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-control bg-brand-50 text-brand-700">
                    <Icon name={b.icon} size={26} />
                  </div>
                  <Heading level={3} className="mt-4 text-lg">
                    {b.title}
                  </Heading>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{b.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Areas Preview / Categories */}
      <Section aria-labelledby="judul-bidang">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <Badge tone="accent">Pilihan Tanpa Batas</Badge>
            <Heading level={2} id="judul-bidang" className="mt-2">
              Berbagai Bidang Kuliah yang Bisa Kamu Kenali
            </Heading>
          </div>
          <Button to="/jurusan" variant="ghost" size="sm">
            Buka Katalog Lengkap <Icon name="arrow-right" size={16} />
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {explorationAreas.map((area) => (
            <div
              key={area.name}
              className="flex items-center gap-2.5 rounded-control border border-line bg-surface p-3.5 shadow-xs transition-colors hover:border-brand-300 hover:bg-brand-50/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Icon name={area.icon} size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-ink">
                {area.name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* How it Works / Steps */}
      <Section aria-labelledby="judul-langkah">
        <Badge tone="brand">Alur Sederhana</Badge>
        <Heading level={2} id="judul-langkah" className="mt-2">
          Bagaimana ArahKuliah Bekerja
        </Heading>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.num} className="group relative">
              <Card className="h-full border border-line bg-surface p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun-400 font-extrabold text-ink transition-transform duration-200 group-hover:scale-110">
                  {s.num}
                </span>
                <Heading level={3} className="mt-3 text-base font-bold">
                  {s.title}
                </Heading>
                <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                  {s.desc}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* Ethical Disclaimer Card */}
      <Section>
        <Card className="border-2 border-brand-200 bg-brand-50/70 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="brand">Catatan Penting</Badge>
              </div>
              <Heading level={3} className="mt-2 text-lg sm:text-xl font-bold text-brand-900">
                Hasil adalah titik awal diskusi, bukan keputusan mutlak
              </Heading>
              <p className="mt-2 max-w-2xl text-sm text-muted leading-relaxed">
                ArahKuliah bukan alat tes psikologi dan tidak menentukan masa depanmu secara sepihak. Hasilnya merupakan bahan eksplorasi awal. Pilihan kuliah sebaiknya tetap mempertimbangkan kurikulum kampus, kemampuan akademik, biaya, lokasi, peluang karier, serta diskusi terbuka dengan orang tua, guru, atau konselor.
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/quiz">
                Coba Kuis Sekarang <Icon name="arrow-right" size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </>
  )
}
