import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            i18n.language === lang.code
              ? 'bg-sage-500 text-white'
              : 'text-sage-600 hover:bg-sage-100'
          }`}
          title={lang.label}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  )
}
