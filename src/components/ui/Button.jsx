import { Link } from 'react-router-dom'

export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  children,
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-control font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none'

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm',
    md: 'px-5 py-2.5 text-sm sm:text-base',
    lg: 'px-6 py-3 text-base sm:text-lg',
  }

  const variantClasses = {
    primary:
      'bg-brand-700 text-white shadow-sm hover:bg-brand-800 active:bg-brand-900 focus-visible:outline-3 focus-visible:outline-brand-700 focus-visible:outline-offset-2',
    secondary:
      'border-2 border-brand-700 bg-surface text-brand-700 hover:bg-brand-50 active:bg-brand-100 focus-visible:outline-3 focus-visible:outline-brand-700 focus-visible:outline-offset-2',
    ghost:
      'bg-transparent text-brand-700 hover:bg-brand-50 active:bg-brand-100 focus-visible:outline-3 focus-visible:outline-brand-700 focus-visible:outline-offset-2',
    outline:
      'border-2 border-control bg-surface text-ink hover:border-brand-700 hover:bg-brand-50 focus-visible:outline-3 focus-visible:outline-brand-700 focus-visible:outline-offset-2',
    danger:
      'bg-error-700 text-white hover:bg-red-800 focus-visible:outline-3 focus-visible:outline-error-700 focus-visible:outline-offset-2',
  }

  const classes = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`.trim()

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
