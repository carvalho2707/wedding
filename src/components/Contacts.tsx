import { useTranslation } from 'react-i18next'

interface Contact {
  role: string
  name: string
  phone: string
}

// Update with actual contact information
const contacts: Contact[] = [
  {
    role: 'bestMan',
    name: 'João Pecorelli',
    phone: '+351 912 469 793',
  },
  {
    role: 'bestMan',
    name: 'Francisco Montez',
    phone: '+351 913 072 520',
  },
  {
    role: 'bridesmaid',
    name: 'Kim-Laura',
    phone: '+49 151 52321675',
  },
  {
    role: 'bridesmaid',
    name: 'Julia ',
    phone: '+49 176 28538222',
  },
]

export default function Contacts() {
  const { t } = useTranslation()

  const formatWhatsAppUrl = (phone: string) => {
    const cleaned = phone.replace(/\s/g, '').replace('+', '')
    return `https://wa.me/${cleaned}`
  }

  const formatPhoneUrl = (phone: string) => {
    return `tel:${phone.replace(/\s/g, '')}`
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-script text-4xl text-sage-700 text-center mb-4">
          {t('contacts.title')}
        </h2>
        <p className="text-sage-500 text-center mb-12">
          {t('contacts.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-cream-100 rounded-lg p-6 text-center">
              <p className="text-sage-500 text-sm uppercase tracking-wider mb-2">
                {t(`contacts.${contact.role}`)}
              </p>
              <h3 className="text-sage-700 font-medium text-lg mb-4">
                {contact.name}
              </h3>
              <div className="flex justify-center gap-3">
                <a
                  href={formatPhoneUrl(contact.phone)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-sage-50 text-sage-600 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-sage-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('contacts.call')}
                </a>
                <a
                  href={formatWhatsAppUrl(contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('contacts.whatsapp')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
