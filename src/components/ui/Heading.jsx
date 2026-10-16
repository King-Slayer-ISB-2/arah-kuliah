export default function Heading({ level = 2, size, className = '', id, children, ...props }) {
  const Tag = `h${Math.min(Math.max(level, 1), 6)}`
  const visualLevel = size ?? level

  const sizeClasses = {
    1: 'text-3xl sm:text-5xl font-extrabold tracking-tight text-ink',
    2: 'text-2xl sm:text-3xl font-bold tracking-tight text-ink',
    3: 'text-lg sm:text-xl font-semibold text-ink',
    4: 'text-base font-semibold text-ink',
  }

  const selectedSize = sizeClasses[visualLevel] || sizeClasses[2]

  return (
    <Tag id={id} className={`${selectedSize} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}
