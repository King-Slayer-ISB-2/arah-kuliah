export default function HeroArt({ className = '' }) {
  return (
    <div className={`relative select-none ${className}`}>
      {/* Decorative ambient background blur */}
      <div className="absolute -top-6 -left-6 h-48 w-48 rounded-full bg-brand-100/60 blur-2xl" />
      <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-sun-100/70 blur-2xl" />

      <svg
        viewBox="0 0 460 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full drop-shadow-md"
        aria-hidden="true"
      >
        {/* Card backdrop */}
        <rect
          x="15"
          y="15"
          width="430"
          height="350"
          rx="24"
          fill="#ffffff"
          stroke="#e0e7ff"
          strokeWidth="2"
        />

        {/* Top bar decor */}
        <rect x="35" y="35" width="12" height="12" rx="6" fill="#fcd34d" />
        <rect x="55" y="35" width="12" height="12" rx="6" fill="#c7d2fe" />
        <rect x="75" y="35" width="12" height="12" rx="6" fill="#e0e7ff" />

        {/* Winding Adventure Trail */}
        <path
          d="M60 280 C 110 280, 100 180, 170 180 C 240 180, 220 100, 310 100 C 380 100, 390 200, 390 280"
          stroke="#c7d2fe"
          strokeWidth="4"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />

        {/* Milestone Node 1: Minat (Start) */}
        <g transform="translate(60, 280)">
          <circle r="22" fill="#eef2ff" stroke="#4338ca" strokeWidth="2.5" />
          <path
            d="M-7 -7 L7 7 M-7 7 L7 -7"
            stroke="#4338ca"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle r="4" fill="#4338ca" />
          <text
            x="0"
            y="36"
            textAnchor="middle"
            fill="#1e1b4b"
            fontSize="12"
            fontWeight="bold"
          >
            1. Minat
          </text>
        </g>

        {/* Milestone Node 2: Hobi & Aktivitas */}
        <g transform="translate(170, 180)">
          <circle r="24" fill="#fef3c7" stroke="#fbbf24" strokeWidth="3" />
          {/* Lightbulb shape */}
          <path
            d="M-5 4 h10 M-3 7 h6 M-6 -2 a6 6 0 0 1 12 0 c0 3 -2 4 -3 5 h-6 c-1 -1 -3 -2 -3 -5 z"
            fill="#fbbf24"
            stroke="#92400e"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="38"
            textAnchor="middle"
            fill="#1e1b4b"
            fontSize="12"
            fontWeight="bold"
          >
            2. Aktivitas
          </text>
        </g>

        {/* Milestone Node 3: Kekuatan & Gaya Belajar */}
        <g transform="translate(310, 100)">
          <circle r="22" fill="#eef2ff" stroke="#4338ca" strokeWidth="2.5" />
          {/* Compass / Star */}
          <polygon
            points="0,-9 3,-2 9,0 3,2 0,9 -3,2 -9,0 -3,-2"
            fill="#4338ca"
          />
          <text
            x="0"
            y="-30"
            textAnchor="middle"
            fill="#1e1b4b"
            fontSize="12"
            fontWeight="bold"
          >
            3. Kekuatan
          </text>
        </g>

        {/* Milestone Node 4: Arah Tujuan (Finish / Cap) */}
        <g transform="translate(390, 280)">
          <circle r="26" fill="#4338ca" />
          {/* Graduation Cap */}
          <polygon points="0,-10 14,-2 0,6 -14,-2" fill="#ffffff" />
          <path d="M-9 0 v8 c3 3 15 3 18 0 v-8" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <line x1="8" y1="-2" x2="14" y2="8" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="14" cy="9" r="1.5" fill="#fbbf24" />
          <text
            x="0"
            y="42"
            textAnchor="middle"
            fill="#4338ca"
            fontSize="12"
            fontWeight="bold"
          >
            Arah Kuliahmu
          </text>
        </g>

        {/* Floating Card: Rekomendasi Bidang */}
        <g transform="translate(195, 230)">
          <rect
            width="170"
            height="85"
            rx="14"
            fill="#ffffff"
            stroke="#e5e7eb"
            strokeWidth="1.5"
            filter="drop-shadow(0 6px 12px rgba(30, 27, 75, 0.08))"
          />
          <rect x="14" y="14" width="24" height="24" rx="6" fill="#eef2ff" />
          <circle cx="26" cy="26" r="5" fill="#4338ca" />
          <text x="46" y="24" fill="#1e1b4b" fontSize="12" fontWeight="bold">
            Peta Pilihan
          </text>
          <text x="46" y="38" fill="#4b5563" fontSize="10">
            Kecocokan & Alasan
          </text>
          <rect x="14" y="52" width="142" height="6" rx="3" fill="#e0e7ff" />
          <rect x="14" y="52" width="105" height="6" rx="3" fill="#fbbf24" />
          <text x="14" y="72" fill="#047857" fontSize="10" fontWeight="bold">
            ✓ Siap dieksplorasi
          </text>
        </g>

        {/* Sparkles & Stars */}
        <g transform="translate(110, 95)">
          <path d="M0 -6 L2 -1 L7 0 L2 1 L0 6 L-2 1 L-7 0 L-2 -1 Z" fill="#fbbf24" />
        </g>
        <g transform="translate(370, 70)">
          <path d="M0 -5 L1.5 -1 L5 0 L1.5 1 L0 5 L-1.5 1 L-5 0 L-1.5 -1 Z" fill="#4338ca" opacity="0.6" />
        </g>
        <g transform="translate(100, 210)">
          <circle r="3" fill="#fbbf24" />
        </g>
        <g transform="translate(350, 190)">
          <circle r="4" fill="#c7d2fe" />
        </g>
      </svg>
    </div>
  )
}
