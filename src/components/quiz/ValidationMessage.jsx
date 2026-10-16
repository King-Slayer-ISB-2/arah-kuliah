import Icon from '../ui/Icon.jsx'

export default function ValidationMessage({ message }) {
  if (!message) return null

  return (
    <div
      role="alert"
      className="mt-4 flex items-center gap-2.5 rounded-control border border-red-200 bg-error-50 px-4 py-3 text-sm font-medium text-error-700 animate-fade-up"
    >
      <Icon name="alert-circle" size={18} className="shrink-0 text-error-700" />
      <span>{message}</span>
    </div>
  )
}
