import { useTranslation } from 'react-i18next'

export default function Timeline() {
  const { t } = useTranslation()

  const events = [
    { time: '12:00', label: t('timeline.cocktail') },
    { time: '13:00', label: t('timeline.ceremony') },
    { time: '14:00', label: t('timeline.lunch') },
    { time: '16:00', label: t('timeline.dancing') },
    { time: '19:00', label: t('timeline.buffet') },
    { time: '20:30', label: t('timeline.cake') },
    { time: '22:00', label: t('timeline.midnightSnack') },
  ]

  return (
    <div className="py-12 px-4">
      <div className="max-w-xs mx-auto">
        <h2 className="font-script text-4xl text-sage-700 text-center mb-8">
          {t('timeline.title')}
        </h2>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-14 text-right text-sage-700 font-light">{event.time}</span>
              <div className="w-2 h-2 bg-sage-400 rounded-full flex-shrink-0" />
              <span className="text-sage-600 text-sm uppercase tracking-wide">{event.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
