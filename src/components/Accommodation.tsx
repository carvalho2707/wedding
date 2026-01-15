import { useTranslation } from 'react-i18next'

interface Hotel {
  name: string
  address: string
  specialRate?: string
  bookingUrl?: string
}

// Add hotels here when you have special rates
const hotels: Hotel[] = [
  // Example:
  // {
  //   name: 'Hotel Example',
  //   address: '123 Main Street, City',
  //   specialRate: '10% off with code WEDDING',
  //   bookingUrl: 'https://example.com/book',
  // },
]

export default function Accommodation() {
  const { t } = useTranslation()

  return (
    <div className="py-16 px-4 bg-cream-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-script text-4xl text-sage-700 text-center mb-4">
          {t('accommodation.title')}
        </h2>
        <p className="text-sage-500 text-center mb-12">
          {t('accommodation.subtitle')}
        </p>

        {hotels.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-sage-700 font-medium mb-2">{hotel.name}</h3>
                <p className="text-sage-500 text-sm mb-4">{hotel.address}</p>
                {hotel.specialRate && (
                  <p className="text-sage-600 text-sm mb-4 bg-sage-50 px-3 py-2 rounded">
                    {t('accommodation.specialRate')}: {hotel.specialRate}
                  </p>
                )}
                {hotel.bookingUrl && (
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    {t('accommodation.bookNow')}
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-sage-300 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-sage-500 italic">{t('accommodation.comingSoon')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
