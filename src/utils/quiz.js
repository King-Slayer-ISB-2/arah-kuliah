import { majors } from '../data/majors.js'
import { questions } from '../data/questions.js'

/**
 * Memeriksa apakah pertanyaan saat ini sudah dijawab.
 */
export function isAnswered(question, answers) {
  if (!question) return true
  const ans = answers[question.id]
  if (ans === undefined || ans === null) return false
  if (Array.isArray(ans)) return ans.length > 0
  return ans !== ''
}

/**
 * Mencari indeks pertanyaan pertama yang belum dijawab.
 * Mengembalikan -1 jika semua sudah lengkap.
 */
export function firstMissingIndex(questionList, answers) {
  return questionList.findIndex((q) => !isAnswered(q, answers))
}

/**
 * Pesan validasi saat pertanyaan belum diisi.
 */
export function requiredMessage(question) {
  if (!question) return 'Harap lengkapi jawaban terlebih dahulu.'
  if (question.type === 'multiple') {
    return 'Pilih minimal satu opsi yang paling mewakili dirimu.'
  }
  return 'Pilih salah satu jawaban yang paling terasa seperti dirimu untuk melanjutkan.'
}

/**
 * Menghitung rekomendasi bidang & jurusan kuliah berdasarkan jawaban kuis pengguna.
 * Menghasilkan kecocokan dinamis, alasan kontekstual, dan skor relevansi.
 */
export function calculateRecommendations(answers = {}, majorList = majors) {
  // Ambil data opsi yang dipilih pengguna
  const selectedOptions = {}
  questions.forEach((q) => {
    const chosenId = answers[q.id]
    if (chosenId) {
      const option = q.options.find((opt) => opt.id === chosenId)
      if (option) {
        selectedOptions[q.id] = { ...option, stage: q.stage }
      }
    }
  })

  const scoredMajors = majorList.map((major) => {
    let score = 50 // Base baseline
    const matchReasons = []

    // 1. Minat matching
    if (selectedOptions.minat) {
      const minat = selectedOptions.minat
      if (major.fieldTags.includes(minat.field)) {
        score += 25
        matchReasons.push(
          `Relevan dengan minat utamamu pada "${minat.label}", di mana konsep ini menjadi inti kurikulum perkuliahan.`,
        )
      }
    }

    // 2. Hobi matching
    if (selectedOptions.hobi) {
      const hobi = selectedOptions.hobi
      if (major.fieldTags.includes(hobi.field)) {
        score += 15
        matchReasons.push(
          `Sesuai dengan kebiasaan waktu luangmu (${hobi.label.toLowerCase()}), sehingga aktivitas belajar akan terasa menyenangkan.`,
        )
      }
    }

    // 3. Preferensi Aktivitas matching
    if (selectedOptions.aktivitas) {
      const aktivitas = selectedOptions.aktivitas
      if (major.fieldTags.includes(aktivitas.field)) {
        score += 15
        matchReasons.push(
          `Mendukung gaya peran proyek yang kamu sukai, yaitu ${aktivitas.label.toLowerCase()}.`,
        )
      }
    }

    // 4. Kekuatan Diri matching
    if (selectedOptions.kekuatan) {
      const kekuatan = selectedOptions.kekuatan
      if (major.fieldTags.includes(kekuatan.field)) {
        score += 15
        matchReasons.push(
          `Mengoptimalkan kekuatan alamimu dalam ${kekuatan.label.toLowerCase()} untuk menyelesaikan tantangan akademik.`,
        )
      }
    }

    // 5. Gaya Belajar matching
    if (selectedOptions.gaya_belajar) {
      const gaya = selectedOptions.gaya_belajar
      if (major.styleTags && major.styleTags.includes(gaya.style)) {
        score += 10
        matchReasons.push(
          `Metode pengajaran banyak menerapkan format ${gaya.label.toLowerCase()} yang cocok dengan caramu menyerap materi.`,
        )
      }
    }

    // Pastikan batas persentase wajar (60% - 98%)
    const normalizedScore = Math.min(Math.max(score, 62), 98)

    // Alasan fallback jika sedikit kesamaan eksplisit
    if (matchReasons.length === 0) {
      matchReasons.push(
        'Menyediakan peluang pengembangan keterampilan analitis dan praktis yang relevan untuk eksplorasi tahap awalmu.',
      )
    }

    return {
      id: major.id,
      title: major.name,
      category: major.category,
      degree: major.degree,
      score: normalizedScore,
      summary: major.summary,
      description: major.description,
      whyItMatches: matchReasons,
      courses: major.courses.slice(0, 3),
      allCourses: major.courses,
      activities: major.activities.slice(0, 2),
      allActivities: major.activities,
      reflectionQuestions: major.reflectionQuestions,
      careers: major.careers,
      skills: major.skills,
    }
  })

  // Urutkan berdasarkan skor tertinggi
  return scoredMajors.sort((a, b) => b.score - a.score)
}
