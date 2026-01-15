import { useTranslation } from 'react-i18next'
import { useCountdown } from '../hooks/useCountdown'

// Wedding date: June 13, 2026 at 11:30 AM (Portugal time)
const WEDDING_DATE = new Date('2026-06-13T11:30:00+01:00')

export default function Countdown() {
  const { t } = useTranslation()
  const timeLeft = useCountdown(WEDDING_DATE)

  const timeUnits = [
    { value: timeLeft.days, label: t('countdown.days') },
    { value: timeLeft.hours, label: t('countdown.hours') },
    { value: timeLeft.minutes, label: t('countdown.minutes') },
    { value: timeLeft.seconds, label: t('countdown.seconds') },
  ]

  return (
    <div className="py-12 px-4 bg-cream-100">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sage-500 text-sm mb-6">{t('countdown.title')}</p>
        <div className="flex justify-center gap-4 md:gap-8">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white rounded-lg shadow-sm px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px]">
                <span className="text-2xl md:text-4xl font-light text-sage-700">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-sage-500 text-xs mt-2 uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
