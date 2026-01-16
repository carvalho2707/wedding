import { useTranslation } from 'react-i18next'

export default function Timeline() {
  const { t } = useTranslation()

  const events = [
    { time: '12:00', label: t('timeline.cocktail'), icon: '/images/cocktail.png' },
    { time: '13:00', label: t('timeline.ceremony'), icon: '/images/wedding-arch.png' },
    { time: '14:00', label: t('timeline.lunch'), icon: '/images/dinner.png' },
    { time: '16:00', label: t('timeline.dancing'), icon: '/images/disco-ball.png' },
    { time: '19:00', label: t('timeline.buffet'), icon: '/images/food-tray.png' },
    { time: '20:30', label: t('timeline.cake'), icon: '/images/wedding-cake.png' },
    { time: '22:00', label: t('timeline.midnightSnack'), icon: '/images/burger.png' },
  ]

  return (
    <div className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="font-script text-4xl text-sage-700 text-center mb-10">
          {t('timeline.title')}
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-sage-300" />

          <div className="flex flex-col -space-y-3.5">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0

              return (
                <div key={index} className="relative grid grid-cols-[1fr_20px_1fr] items-center">
                  {/* Left content */}
                  {isLeft ? (
                    <div className="text-right pr-6">
                      <img src={event.icon} alt="" className="w-10 h-10 mb-1 inline-block" />
                      <p className="text-sm font-medium text-sage-700">{event.time}</p>
                      <p className="text-sage-500 text-base uppercase tracking-wider">{event.label}</p>
                    </div>
                  ) : (
                    <div />
                  )}

                  {/* Dot on line */}
                  <div className="flex justify-center">
                    <div className="w-2 h-2 bg-sage-400 rounded-full" />
                  </div>

                  {/* Right content */}
                  {!isLeft ? (
                    <div className="text-left pl-6">
                      <img src={event.icon} alt="" className="w-10 h-10 mb-1 inline-block" />
                      <p className="text-sm font-medium text-sage-700">{event.time}</p>
                      <p className="text-sage-500 text-base uppercase tracking-wider">{event.label}</p>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
