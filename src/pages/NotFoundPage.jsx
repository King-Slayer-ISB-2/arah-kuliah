import Button from '../components/ui/Button.jsx'
import Heading from '../components/ui/Heading.jsx'
import Section from '../components/ui/Section.jsx'

export default function NotFoundPage() {
  return (
    <Section className="text-center">
      <Heading level={1} size={2}>
        Halaman tidak ditemukan
      </Heading>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Alamat yang kamu buka tidak ada. Mungkin salah ketik, atau halamannya sudah pindah.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button to="/">Kembali ke beranda</Button>
        <Button to="/quiz" variant="secondary">
          Mulai kuis
        </Button>
      </div>
    </Section>
  )
}
