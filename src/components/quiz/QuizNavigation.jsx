import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

export default function QuizNavigation({
  canGoBack = true,
  onBack,
  onNext,
  backLabel = 'Kembali',
  nextLabel = 'Lanjut',
}) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {canGoBack && onBack ? (
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            <Icon name="arrow-left" size={18} />
            {backLabel}
          </Button>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
          className="w-full sm:w-auto"
        >
          {nextLabel}
          <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    </div>
  )
}
