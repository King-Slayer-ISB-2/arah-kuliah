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
    title: 'Mulai dari dirimu',
    text: 'Pertanyaan singkat tentang minat, hobi, kegiatan yang kamu sukai, dan cara kamu belajar.',
  },
  {
    icon: 'pin',
    title: 'Ada alasan di balik hasil',
    text: 'Setiap bidang yang muncul disertai alasan, contoh mata kuliah, dan aktivitas yang mungkin kamu temui.',
  },
  {
    icon: 'flag',
    title: 'Tanpa jawaban benar atau salah',
    text: 'Ini bukan ujian. Pilih yang paling terasa seperti kamu, lalu lihat kemungkinan yang bisa dijelajahi.',
  },
]

const steps = [
  'Jawab pertanyaan singkat.',
  'Tinjau dan ubah jawabanmu bila perlu.',
  'Lihat beberapa bidang yang bisa dipertimbangkan.',
  'Jelajahi jurusannya dan diskusikan dengan guru BK atau orang tuamu.',
]

export default function HomePage() {
  return (
    <>
      <Section className="grid items-center gap-8 md:grid-cols-2">
        <div className="animate-fade-up">
          <Badge tone="accent">Eksplorasi jurusan untuk siswa SMA/SMK</Badge>
          <Heading level={1} className="mt-4">
            Temukan arah kuliah yang layak kamu jelajahi
          </Heading>
          <p className="mt-4 text-lg text-muted">
            Jawab beberapa pertanyaan tentang minat dan caramu belajar. ArahKuliah menunjukkan
            beberapa bidang untuk dipertimbangkan, lengkap dengan alasannya.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/quiz">
              Mulai eksplorasi <Icon name="arrow-right" />
            </Button>
            <Button to="/jurusan" variant="secondary">
              Lihat daftar jurusan
            </Button>
          </div>
        </div>
        <HeroArt className="animate-fade-up mx-auto w-full max-w-md" />
      </Section>

      <Section aria-labelledby="judul-manfaat">
        <Heading level={2} id="judul-manfaat">
          Kenapa ArahKuliah
        </Heading>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title}>
              <Card interactive className="h-full">
                <Icon name={b.icon} size={28} className="text-brand-700" />
                <Heading level={3} className="mt-3">
                  {b.title}
                </Heading>
                <p className="mt-2 text-muted">{b.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="judul-langkah">
        <Heading level={2} id="judul-langkah">
          Cara kerjanya
        </Heading>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s} className="group flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun-400 font-bold text-ink transition-transform duration-200 motion-safe:group-hover:scale-110">
                {i + 1}
              </span>
              <p className="pt-1.5">{s}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Card className="bg-brand-50">
          <Heading level={3}>Hasil adalah titik awal, bukan keputusan</Heading>
          <p className="mt-2 text-muted">
            ArahKuliah bukan tes psikologi dan tidak menentukan masa depanmu. Hasilnya adalah bahan
            eksplorasi awal. Pertimbangkan juga kurikulum, kemampuan akademik, biaya, lokasi, dan
            peluang karier, serta berdiskusilah dengan orang tua, guru, atau konselor.
          </p>
        </Card>
      </Section>
    </>
  )
}
