import { useTranslation } from 'react-i18next'

const VENUE_URL = 'https://maps.app.goo.gl/n5UTxkPRu7ifYwF69'

export default function Map() {
  const { t } = useTranslation()

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-script text-4xl text-sage-700 text-center mb-4">
          {t('map.title')}
        </h2>
        <p className="text-sage-600 text-center text-lg mb-8">
          {t('map.venue')}
        </p>

        {/* Map Container */}
        <div className="rounded-lg overflow-hidden shadow-sm mb-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.1658504905395!2d-9.201537148589278!3d38.670681106398824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ecb28e1ff3ddd%3A0x7d1b0dd293356467!2sQuinta%20do%20Joinal!5e0!3m2!1sen!2spt!4v1768462939326!5m2!1sen!2spt"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Quinta do Joinal - Wedding Venue"
            className="w-full"
          />
        </div>

        {/* Directions Button */}
        <div className="text-center">
          <a
            href={VENUE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            {t('map.directions')}
          </a>
        </div>
      </div>
    </div>
  )
}
