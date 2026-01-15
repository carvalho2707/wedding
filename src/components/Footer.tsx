import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-sage-500 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-script text-3xl text-cream-100 mb-4">
          Nina & Tiago
        </p>
        <p className="text-cream-200 text-sm">
          {t('footer.message')}
        </p>
        <p className="text-cream-300 text-xs mt-4">
          13.06.2026
        </p>
      </div>
    </footer>
  )
}
