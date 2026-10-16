import React, { useState, useEffect, useMemo } from 'react';

// --- MOCK DATA JURUSAN ---
const MAJORS_DATA = [
  {
    id: 'teknik-informatika',
    name: 'Teknik Informatika',
    category: 'Saintek',
    matchCategory: 'Investigatif',
    rating: 4.9,
    keketatan: 'Sangat Tinggi (1:45)',
    salary: 'Rp 8 - 25 Jt/bln',
    desc: 'Mempelajari prinsip ilmu komputer, rekayasa perangkat lunak, algoritma, kecerdasan buatan (AI), dan arsitektur sistem digital.',
    courses: ['Algoritma & Struktur Data', 'Pemrograman Web & Mobile', 'Kecerdasan Buatan', 'Basis Data', 'Keamanan Siber'],
    careers: ['Software Engineer', 'Data Scientist', 'AI Specialist', 'Cybersecurity Analyst', 'DevOps Engineer'],
    campuses: ['Institut Teknologi Bandung (ITB)', 'Universitas Indonesia (UI)', 'Universitas Gadjah Mada (UGM)', 'ITS Surabaya', 'Telkom University'],
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'psikologi',
    name: 'Psikologi',
    category: 'Soshum',
    matchCategory: 'Sosial',
    rating: 4.8,
    keketatan: 'Tinggi (1:35)',
    salary: 'Rp 6 - 16 Jt/bln',
    desc: 'Memahami perilaku manusia, proses mental, kesehatan jiwa, dinamika interaksi sosial, serta metode asesmen psikologi.',
    courses: ['Psikologi Perkembangan', 'Psikologi Klinis', 'Psikologi Industri & Organisasi', 'Biopsikologi', 'Metode Penelitian Psikologi'],
    careers: ['HR / People Operations', 'Konselor Kesehatan Mental', 'Talent Acquisition', 'UX Researcher', 'Konsultan Karir'],
    campuses: ['Universitas Indonesia (UI)', 'Universitas Gadjah Mada (UGM)', 'Universitas Padjadjaran (UNPAD)', 'Universitas Airlangga', 'BINUS'],
    badgeColor: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'desain-komunikasi-visual',
    name: 'Desain Komunikasi Visual (DKV)',
    category: 'Soshum',
    matchCategory: 'Artistik',
    rating: 4.7,
    keketatan: 'Tinggi (1:30)',
    salary: 'Rp 5 - 18 Jt/bln',
    desc: 'Mengubah gagasan kreatif menjadi komunikasi visual yang efektif melalui ilustrasi, tipografi, branding, fotografi, dan animasi.',
    courses: ['Nirmana 2D & 3D', 'Branding & Identitas Visual', 'Desain UI/UX', 'Ilustrasi Digital', 'Motion Graphic'],
    careers: ['UI/UX Designer', 'Creative Director', 'Graphic Designer', 'Illustrator', 'Art Director'],
    campuses: ['ITB Bandung', 'ISI Yogyakarta', 'Telkom University', 'BINUS University', 'Institut Kesenian Jakarta (IKJ)'],
    badgeColor: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'kedokteran',
    name: 'Pendidikan Kedokteran',
    category: 'Saintek',
    matchCategory: 'Investigatif',
    rating: 4.9,
    keketatan: 'Sangat Tinggi (1:60)',
    salary: 'Rp 10 - 35 Jt/bln',
    desc: 'Mempelajari ilmu medis, pencegahan, diagnosis, serta perawatan dan penyembuhan penyakit pada manusia secara menyeluruh.',
    courses: ['Anatomi & Fisiologi', 'Farmakologi', 'Patologi Klinik', 'Keterampilan Klinis', 'Etika Kedokteran'],
    careers: ['Dokter Umum', 'Dokter Spesialis', 'Peneliti Medis', 'Manajer Rumah Sakit', 'Konsultan Kesehatan'],
    campuses: ['Universitas Indonesia (UI)', 'Universitas Gadjah Mada (UGM)', 'Universitas Airlangga (UNAIR)', 'UNPAD', 'Diponegoro'],
    badgeColor: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'manajemen-bisnis',
    name: 'Manajemen & Bisnis',
    category: 'Soshum',
    matchCategory: 'Giat (Enterprising)',
    rating: 4.8,
    keketatan: 'Sangat Tinggi (1:42)',
    salary: 'Rp 7 - 20 Jt/bln',
    desc: 'Mempelajari tata kelola organisasi, pengelolaan keuangan, strategi pemasaran, kepemimpinan, dan inovasi bisnis digital.',
    courses: ['Manajemen Pemasaran', 'Keuangan Perusahaan', 'Strategi Bisnis', 'Kewirausahaan', 'Perilaku Organisasi'],
    careers: ['Business Analyst', 'Product Manager', 'Management Consultant', 'Marketing Lead', 'Entrepreneur'],
    campuses: ['SBM ITB', 'Universitas Indonesia (UI)', 'UGM Yogyakarta', 'Universitas Airlangga', 'Prasetiya Mulya'],
    badgeColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'ilmu-komunikasi',
    name: 'Ilmu Komunikasi',
    category: 'Soshum',
    matchCategory: 'Sosial',
    rating: 4.7,
    keketatan: 'Tinggi (1:38)',
    salary: 'Rp 5 - 15 Jt/bln',
    desc: 'Mempelajari proses penyampaian pesan efektif melalui berbagai media, hubungan masyarakat (PR), jurnalistik, dan media digital.',
    courses: ['Public Relations', 'Komunikasi Massa', 'Perencanaan Media', 'Jurnalistik Digital', 'Strategi Branding'],
    careers: ['Public Relations Officer', 'Social Media Manager', 'Content Strategist', 'Journalist / Editor', 'Corporate Secretary'],
    campuses: ['Universitas Indonesia (UI)', 'UGM Yogyakarta', 'UNPAD Bandung', 'LSPR Jakarta', 'Universitas Diponegoro'],
    badgeColor: 'bg-teal-100 text-teal-700'
  }
];

// --- MOCK QUESTIONS UNTUK QUIZ ---
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Aktivitas mana yang paling sering membuat kamu lupa waktu saat senggang?",
    options: [
      { text: "Mengulik kodingan, merakit barang, atau menyelesaikan teka-teki logika.", type: "Investigatif" },
      { text: "Mendengarkan curhat teman dan memberikan solusi emosional.", type: "Sosial" },
      { text: "Menggambar, mendesain postingan IG, atau menulis cerita ide kreatif.", type: "Artistik" },
      { text: "Mengatur agenda acara kelompok atau jualan online produk unik.", type: "Giat (Enterprising)" }
    ]
  },
  {
    id: 2,
    question: "Ketika ada kerja kelompok di sekolah, peran apa yang biasa kamu ambil?",
    options: [
      { text: "Bagian analisis data, bikin rumus excel, atau riset materi mendalam.", type: "Investigatif" },
      { text: "Penengah yang memastikan semua anggota merasa nyaman dan terlibat.", type: "Sosial" },
      { text: "Penanggung jawab slide presentasi visual dan desain poster karya.", type: "Artistik" },
      { text: "Ketua kelompok yang bagi tugas dan memimpin presentasi di depan kelas.", type: "Giat (Enterprising)" }
    ]
  },
  {
    id: 3,
    question: "Mata pelajaran SMA mana yang terasa paling menyenangkan buat kamu?",
    options: [
      { text: "Matematika, Fisika, Biologi, atau Informatika.", type: "Investigatif" },
      { text: "Sosiologi, Sejarah, Bahasa Indonesia, atau Agama.", type: "Sosial" },
      { text: "Seni Budaya, Bahasa Asing, atau Prakarya.", type: "Artistik" },
      { text: "Ekonomi, Kewirausahaan, atau Geografi.", type: "Giat (Enterprising)" }
    ]
  },
  {
    id: 4,
    question: "Apa impian kondisi tempat kerja idamanmu di masa depan?",
    options: [
      { text: "Laboratorium canggih atau kantor tech startup penuh tantangan data.", type: "Investigatif" },
      { text: "Lingkungan sosial yang berdampak langsung pada kesejahteraan manusia.", type: "Sosial" },
      { text: "Studio kreatif yang bebas ekspresi, estetik, dan tidak kaku.", type: "Artistik" },
      { text: "Gedung perkantoran tinggi sebagai pimpinan tim bisnis atau pemilik bisnis.", type: "Giat (Enterprising)" }
    ]
  }
];

// --- SVG ICONS COMPONENTS (SELF-CONTAINED) ---
const Icons = {
  Compass: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  GraduationCap: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
};

// --- APP ROUTER PROVIDER & CUSTOM NAVIGATOR ---
export default function App() {
  // Current route representation: { path: '/', params: {} }
  const [currentPath, setCurrentPath] = useState('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [latestResult, setLatestResult] = useState(null);

  // Sync scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Client-side navigator
  const navigate = (path) => {
    setCurrentPath(path);
    setMobileMenuOpen(false);
  };

  // Route matching logic
  const renderRouteContent = () => {
    // Exact routes
    if (currentPath === '/') return <HomePage navigate={navigate} />;
    if (currentPath === '/quiz') return <QuizPage navigate={navigate} setLatestResult={setLatestResult} />;
    if (currentPath === '/hasil') return <HasilPage navigate={navigate} latestResult={latestResult} />;
    if (currentPath === '/jurusan') return <JurusanPage navigate={navigate} />;

    // Dynamic Route: /jurusan/:id
    if (currentPath.startsWith('/jurusan/')) {
      const id = currentPath.replace('/jurusan/', '');
      const major = MAJORS_DATA.find((m) => m.id === id);
      if (major) {
        return <DetailJurusanPage major={major} navigate={navigate} />;
      }
    }

    // Fallback 404
    return <NotFoundPage navigate={navigate} currentPath={currentPath} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Visual Navigation Bar Top Banner for Dev/Testing context */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono text-slate-400">Router Active:</span>
          <span className="font-mono text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {currentPath}
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-slate-400">
          <span>Struktur Route SPA</span>
          <span>•</span>
          <span>Arah Kuliah v1.0</span>
        </div>
      </div>

      {/* --- APP SHELL: HEADER / NAVIGATION --- */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Icons.Compass />
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                  ArahKuliah
                </span>
                <span className="block text-[10px] font-medium tracking-wide text-slate-400 uppercase -mt-1">
                  Navigasi Jurusan SMA
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink label="Beranda" active={currentPath === '/'} onClick={() => navigate('/')} />
              <NavLink label="Tes Minat" active={currentPath === '/quiz'} onClick={() => navigate('/quiz')} />
              <NavLink label="Hasil Tes" active={currentPath === '/hasil'} onClick={() => navigate('/hasil')} />
              <NavLink label="Katalog Jurusan" active={currentPath.startsWith('/jurusan')} onClick={() => navigate('/jurusan')} />
            </nav>

            {/* Action CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => navigate('/quiz')}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center space-x-2"
              >
                <Icons.Sparkles />
                <span>Mulai Tes Gratis</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
            <MobileNavLink label="Beranda" active={currentPath === '/'} onClick={() => navigate('/')} />
            <MobileNavLink label="Tes Minat & Bakat" active={currentPath === '/quiz'} onClick={() => navigate('/quiz')} />
            <MobileNavLink label="Hasil Rekomendasi" active={currentPath === '/hasil'} onClick={() => navigate('/hasil')} />
            <MobileNavLink label="Katalog Jurusan" active={currentPath.startsWith('/jurusan')} onClick={() => navigate('/jurusan')} />
            <div className="pt-2">
              <button
                onClick={() => navigate('/quiz')}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-sm"
              >
                Mulai Tes Gratis Sekarang
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- APP SHELL: MAIN CONTENT AREA --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderRouteContent()}
      </main>

      {/* --- APP SHELL: FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Icons.Compass />
                </div>
                <span className="text-lg font-bold">ArahKuliah</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Platform navigasi jurusan kuliah untuk siswa SMA se-Indonesia. Temukan potensi diri dan kurangi risiko salah jurusan.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Navigasi Utama</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-blue-400 transition-colors">Beranda</button></li>
                <li><button onClick={() => navigate('/quiz')} className="hover:text-blue-400 transition-colors">Tes Minat & Bakat</button></li>
                <li><button onClick={() => navigate('/hasil')} className="hover:text-blue-400 transition-colors">Lihat Hasil Quiz</button></li>
                <li><button onClick={() => navigate('/jurusan')} className="hover:text-blue-400 transition-colors">Katalog Jurusan</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Kategori Popular</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/jurusan/teknik-informatika')} className="hover:text-blue-400 transition-colors">Teknik Informatika</button></li>
                <li><button onClick={() => navigate('/jurusan/psikologi')} className="hover:text-blue-400 transition-colors">Psikologi</button></li>
                <li><button onClick={() => navigate('/jurusan/kedokteran')} className="hover:text-blue-400 transition-colors">Kedokteran</button></li>
                <li><button onClick={() => navigate('/jurusan/desain-komunikasi-visual')} className="hover:text-blue-400 transition-colors">DKV & Desain</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Status Aplikasi</h4>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-emerald-400">✓ App Shell & Routing Live</p>
                <p>Environment: Production Ready Client SPA</p>
                <p>Fallback 404 Route Enabled</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Arah Kuliah. Hak Cipta Dilindungi.</p>
            <p className="mt-2 sm:mt-0">Dibuat khusus untuk siswa SMA Indonesia 🇮🇩</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- NAVBAR HELPER COMPONENTS ---
function NavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? 'text-blue-600 bg-blue-50/80 font-semibold'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
      }`}
    >
      {label}
    </button>
  );
}

function MobileNavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-3 py-2 text-base font-medium rounded-lg ${
        active
          ? 'text-blue-600 bg-blue-50 font-semibold'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}


// ==========================================
// 1. ROUTE PAGE: HOME (`/`)
// ==========================================
function HomePage({ navigate }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-950 text-white p-8 md:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-3 py-1 text-xs font-semibold text-blue-200">
            <Icons.Sparkles />
            <span>Fitur Baru: Algoritma Rekomendasi Minat SMA</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Bingung Mau Kuliah Jurusan Apa? <span className="text-blue-300">Temukan Arahmu Disini!</span>
          </h1>

          <p className="text-slate-200 text-base md:text-lg leading-relaxed">
            ArahKuliah membantu siswa SMA memetakan minat, bakat, dan proyeksi karir masa depan agar mantap memilih jurusan perkuliahan tanpa rasa penyesalan.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <button
              onClick={() => navigate('/quiz')}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
            >
              <span>Ikuti Tes Minat Gratis</span>
              <Icons.ArrowRight />
            </button>
            <button
              onClick={() => navigate('/jurusan')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-base font-semibold rounded-xl transition-all text-center"
            >
              Jelajahi Katalog Jurusan
            </button>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="hidden lg:block absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
          <Icons.GraduationCap />
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Icons.Sparkles />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">1. Tes Minat Sederhana</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Cukup jawab pertanyaan seputar kebiasaan dan preferensi belajar untuk mengenali kepribadian dominanmu.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <Icons.BookOpen />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">2. Katalog Jurusan Lengkap</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Akses informasi mata kuliah kunci, prospek kerja, rata-rata gaji, hingga tingkat keketatan kampus PTN/PTS.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <Icons.CheckCircle />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">3. Rekomendasi Terukur</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Dapatkan hasil kecocokan bertingkat yang transparan dan dapat disimpan sebagai panduan memilih SNBP/SNBT.
          </p>
        </div>
      </div>

      {/* Quick Explore Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Jurusan Terfavorit Siswa SMA</h2>
            <p className="text-slate-500 text-sm">Pilihan jurusan paling banyak dicari dan direkomendasikan</p>
          </div>
          <button
            onClick={() => navigate('/jurusan')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>Lihat Semua</span>
            <Icons.ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAJORS_DATA.slice(0, 3).map((major) => (
            <div 
              key={major.id}
              onClick={() => navigate(`/jurusan/${major.id}`)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-300 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${major.badgeColor}`}>
                    {major.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    ★ {major.rating}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">{major.name}</h4>
                <p className="text-slate-600 text-xs line-clamp-2">{major.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Prospek Gaji: {major.salary}</span>
                <Icons.ArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 2. ROUTE PAGE: QUIZ MINAT (`/quiz`)
// ==========================================
function QuizPage({ navigate, setLatestResult }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelectOption = (questionId, optionType) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionType });
  };

  const isCurrentAnswered = selectedAnswers[QUIZ_QUESTIONS[currentStep].id] !== undefined;

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Result
      const counts = {};
      Object.values(selectedAnswers).forEach((type) => {
        counts[type] = (counts[type] || 0) + 1;
      });

      let topType = "Investigatif";
      let maxCount = 0;
      Object.keys(counts).forEach((type) => {
        if (counts[type] > maxCount) {
          maxCount = counts[type];
          topType = type;
        }
      });

      const matchedMajors = MAJORS_DATA.filter((m) => m.matchCategory === topType);
      
      const resultData = {
        topType,
        matchedMajors: matchedMajors.length > 0 ? matchedMajors : [MAJORS_DATA[0], MAJORS_DATA[1]],
        timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      setLatestResult(resultData);
      navigate('/hasil');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeQuestion = QUIZ_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Tes Minat & Bakat
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Temukan Tipe Kepribadian Kuliahmu</h2>
        <p className="text-sm text-slate-500">Jawab pertanyaan berikut secara jujur sesuai karakter dirimu.</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span>Pertanyaan {currentStep + 1} dari {QUIZ_QUESTIONS.length}</span>
          <span>{progressPercent}% Selesai</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {activeQuestion.id}. {activeQuestion.question}
        </h3>

        <div className="space-y-3">
          {activeQuestion.options.map((opt, idx) => {
            const isSelected = selectedAnswers[activeQuestion.id] === opt.type;
            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(activeQuestion.id, opt.type)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 text-slate-900 font-medium shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className="text-sm leading-relaxed">{opt.text}</span>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sebelumnya
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            className={`px-6 py-2.5 text-sm font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2 ${
              isCurrentAnswered
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Selesai & Lihat Hasil' : 'Berikutnya'}</span>
            <Icons.ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. ROUTE PAGE: HASIL QUIZ (`/hasil`)
// ==========================================
function HasilPage({ navigate, latestResult }) {
  if (!latestResult) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <Icons.AlertTriangle />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Belum Ada Hasil Quiz</h2>
        <p className="text-slate-600 text-sm">
          Kamu belum menyelesaikan Tes Minat. Silakan ikuti tes singkat terlebih dahulu untuk mendapatkan rekomendasi jurusan yang akurat.
        </p>
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md"
        >
          Mulai Tes Minat Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-lg space-y-4">
        <div className="flex items-center space-x-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
          <Icons.CheckCircle />
          <span>Hasil Analisis Profil Siswa • {latestResult.timestamp}</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold">
          Karakter Dominanmu: <span className="underline decoration-emerald-300">{latestResult.topType}</span>
        </h1>

        <p className="text-emerald-50 text-sm leading-relaxed max-w-2xl">
          Berdasarkan kombinasi jawabanmu, kamu memiliki kecenderungan minat yang tinggi pada bidang **{latestResult.topType}**. Kamu akan berkembang pesat di jurusan yang membutuhkan keahlian ini!
        </p>
      </div>

      {/* Recommendations Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Rekomendasi Jurusan Paling Cocok</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestResult.matchedMajors.map((major) => (
            <div
              key={major.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${major.badgeColor}`}>
                    {major.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    Kecocokan 95%
                  </span>
                </div>

                <h4 className="text-xl font-bold text-slate-900">{major.name}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{major.desc}</p>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Prospek Karir Utama:</span>
                  <div className="flex flex-wrap gap-1">
                    {major.careers.slice(0, 3).map((c, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => navigate(`/jurusan/${major.id}`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Lihat Detail Kurikulum & Kampus</span>
                  <Icons.ArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action footer */}
      <div className="bg-slate-100 rounded-2xl p-6 text-center space-y-3">
        <h4 className="text-sm font-bold text-slate-800">Ingin Mencoba Tes Ulang?</h4>
        <button
          onClick={() => navigate('/quiz')}
          className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
        >
          Ulangi Tes Minat
        </button>
      </div>
    </div>
  );
}


// ==========================================
// 4. ROUTE PAGE: KATALOG JURUSAN (`/jurusan`)
// ==========================================
function JurusanPage({ navigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredMajors = useMemo(() => {
    return MAJORS_DATA.filter((major) => {
      const matchSearch = major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          major.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'Semua' || major.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Katalog Jurusan Perguruan Tinggi</h1>
        <p className="text-slate-600 text-sm">
          Eksplorasi berbagai pilihan jurusan program sarjana (S1) lengkap dengan prospek kerja dan kampus favoritnya.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icons.Search />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari jurusan (misal: Informatika, Psikologi)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['Semua', 'Saintek', 'Soshum'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Majors Grid */}
      {filteredMajors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMajors.map((major) => (
            <div
              key={major.id}
              onClick={() => navigate(`/jurusan/${major.id}`)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${major.badgeColor}`}>
                    {major.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    Keketatan: {major.keketatan.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {major.name}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {major.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Rata-rata Gaji</span>
                  <span className="font-semibold text-slate-800">{major.salary}</span>
                </div>

                <div className="w-full text-center text-xs font-bold text-blue-600 pt-1 flex items-center justify-center space-x-1">
                  <span>Buka Halaman Detail</span>
                  <Icons.ChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <p className="text-slate-500 text-sm">Tidak ada jurusan yang cocok dengan pencarian "{searchTerm}"</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('Semua'); }}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Reset Filter Pencarian
          </button>
        </div>
      )}
    </div>
  );
}


// ==========================================
// 5. ROUTE PAGE: DETAIL JURUSAN (`/jurusan/:id`)
// ==========================================
function DetailJurusanPage({ major, navigate }) {
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-blue-600">Beranda</button>
        <span>/</span>
        <button onClick={() => navigate('/jurusan')} className="hover:text-blue-600">Katalog Jurusan</button>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{major.name}</span>
      </nav>

      {/* Main Detail Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-lg ${major.badgeColor}`}>
              Rumpun {major.category}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Tipe Minat: {major.matchCategory}
            </span>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
            Keketatan: {major.keketatan}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{major.name}</h1>
          <p className="text-slate-600 text-base leading-relaxed">{major.desc}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-500 font-medium block">Prospek Gaji Lulusan</span>
            <span className="text-lg font-bold text-slate-900">{major.salary}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-500 font-medium block">Rating Kepuasan Lulusan</span>
            <span className="text-lg font-bold text-slate-900">★ {major.rating} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Curriculum & Career Content Tabs/Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mata Kuliah Kunci */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center space-x-2 text-blue-600">
            <Icons.BookOpen />
            <h3 className="text-lg font-bold text-slate-900">Mata Kuliah Utama</h3>
          </div>
          <ul className="space-y-2">
            {major.courses.map((course, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>{course}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prospek Karir */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-600">
            <Icons.Sparkles />
            <h3 className="text-lg font-bold text-slate-900">Peluang Karir Lulusan</h3>
          </div>
          <ul className="space-y-2">
            {major.careers.map((career, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>{career}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Campuses */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Perguruan Tinggi Rekomendasi (PTN & PTS)</h3>
        <div className="flex flex-wrap gap-2">
          {major.campuses.map((campus, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors">
              🏛️ {campus}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Back & Test */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => navigate('/jurusan')}
          className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
        >
          ← Kembali ke Katalog
        </button>

        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
        >
          Cek Kecocokan dengan Dirimu
        </button>
      </div>
    </div>
  );
}


// ==========================================
// 6. ROUTE FALLBACK: 404 NOT FOUND PAGE
// ==========================================
function NotFoundPage({ navigate, currentPath }) {
  return (
    <div className="max-w-md mx-auto text-center py-16 space-y-6">
      <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
        <Icons.AlertTriangle />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Error 404 - Route Tidak Ditemukan
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Halaman Tersesat</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Maaf, route <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600 font-mono">{currentPath}</code> yang kamu tuju tidak ada atau sedang dalam pengembangan.
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
        >
          Kembali ke Beranda ArahKuliah
        </button>
      </div>
    </div>
  );
}