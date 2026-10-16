export default function Badge({ tone = 'neutral', className = '', children, ...props }) {
  const tones = {
    accent: 'bg-sun-100 text-sun-800 border border-sun-300/80',
    brand: 'bg-brand-50 text-brand-900 border border-brand-200',
    neutral: 'bg-canvas text-muted border border-line',
    success: 'bg-success-50 text-success-700 border border-emerald-200',
    outline: 'bg-surface text-ink border border-control',
  }

  const toneClass = tones[tone] || tones.neutral

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${toneClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
}
