export default function Card({
  interactive = false,
  className = '',
  children,
  onClick,
  ...props
}) {
  const interactiveClasses = interactive
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift hover:border-brand-200'
    : ''

  return (
    <div
      onClick={onClick}
      className={`rounded-card border border-line bg-surface p-5 sm:p-6 shadow-card ${interactiveClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
