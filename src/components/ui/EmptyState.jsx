import Icon from './Icon.jsx'
import Heading from './Heading.jsx'

export default function EmptyState({
  title,
  description,
  icon = 'compass',
  children,
  className = '',
}) {
  return (
    <div
      className={`rounded-card border border-dashed border-control/40 bg-surface/80 p-8 text-center sm:p-12 ${className}`.trim()}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <Icon name={icon} size={32} />
      </div>
      <Heading level={3} className="mt-4">
        {title}
      </Heading>
      {description && <p className="mx-auto mt-2 max-w-md text-muted">{description}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  )
}
