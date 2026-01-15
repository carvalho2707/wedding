import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

interface Child {
  name: string
  ageGroup: string
}

export default function RSVP() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    dietary: '',
  })
  const [songs, setSongs] = useState<string[]>([''])
  const [bringingPartner, setBringingPartner] = useState(false)
  const [partnerName, setPartnerName] = useState('')
  const [children, setChildren] = useState<Child[]>([])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const addChild = () => {
    setChildren([...children, { name: '', ageGroup: '' }])
  }

  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index))
  }

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updated = [...children]
    updated[index][field] = value
    setChildren(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.attending) return

    setStatus('submitting')

    const validChildren = children.filter(c => c.name.trim() !== '')
    const submitData = {
      ...formData,
      songs: songs.filter(s => s.trim() !== ''),
      partner: bringingPartner ? partnerName : null,
      children: validChildren,
      guestCount: 1 + (bringingPartner && partnerName.trim() ? 1 : 0) + validChildren.length,
    }

    try {
      if (!GOOGLE_SCRIPT_URL) {
        console.log('RSVP Data (no backend configured):', submitData)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStatus('success')
        localStorage.setItem('rsvp_submitted', 'true')
        return
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      setStatus('success')
      localStorage.setItem('rsvp_submitted', 'true')
    } catch (error) {
      console.error('RSVP submission error:', error)
      setStatus('error')
    }
  }

  const hasSubmitted = localStorage.getItem('rsvp_submitted') === 'true'

  if (hasSubmitted && status !== 'success') {
    return (
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-cream-200 rounded-lg p-8">
            <p className="text-sage-600">{t('rsvp.alreadySubmitted')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-cream-200 rounded-lg p-8">
            <div className="text-sage-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sage-700 font-medium">{t('rsvp.success')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-cream-200 rounded-lg p-8 shadow-sm">
          <p className="text-sage-500 text-sm text-center mb-2">{t('hero.invitation')}</p>
          <h2 className="font-script text-4xl text-sage-700 text-center mb-2">
            Nina & Tiago
          </h2>
          <p className="text-sage-500 text-sm text-center mb-8">
            {t('rsvp.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Guest Name */}
            <div>
              <label htmlFor="name" className="block text-sage-600 text-sm mb-2">
                {t('rsvp.name')}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('rsvp.namePlaceholder')}
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white"
              />
            </div>

            {/* Song Requests */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sage-600 text-sm">
                  {t('rsvp.song')}
                </label>
                <button
                  type="button"
                  onClick={() => setSongs([...songs, ''])}
                  className="text-sage-500 hover:text-sage-700 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('rsvp.addSong')}
                </button>
              </div>
              <div className="space-y-2">
                {songs.map((song, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={song}
                      onChange={(e) => {
                        const updated = [...songs]
                        updated[index] = e.target.value
                        setSongs(updated)
                      }}
                      placeholder={t('rsvp.songPlaceholder')}
                      className="flex-1 px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white"
                    />
                    {songs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setSongs(songs.filter((_, i) => i !== index))}
                        className="p-2 text-sage-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Partner */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bringingPartner}
                  onChange={(e) => {
                    setBringingPartner(e.target.checked)
                    if (!e.target.checked) setPartnerName('')
                  }}
                  className="w-4 h-4 text-sage-500 border-sage-300 rounded focus:ring-sage-400"
                />
                <span className="text-sage-600 text-sm">{t('rsvp.bringingPartner')}</span>
              </label>
              {bringingPartner && (
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder={t('rsvp.partnerNamePlaceholder')}
                  className="mt-3 w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white"
                />
              )}
            </div>

            {/* Children */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sage-600 text-sm">
                  {t('rsvp.children')}
                </label>
                <button
                  type="button"
                  onClick={addChild}
                  className="text-sage-500 hover:text-sage-700 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('rsvp.addChild')}
                </button>
              </div>

              {children.length > 0 && (
                <div className="space-y-3">
                  {children.map((child, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={child.name}
                          onChange={(e) => updateChild(index, 'name', e.target.value)}
                          placeholder={t('rsvp.childNamePlaceholder')}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white text-sm"
                        />
                      </div>
                      <div className="w-32">
                        <select
                          value={child.ageGroup}
                          onChange={(e) => updateChild(index, 'ageGroup', e.target.value)}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white text-sm"
                        >
                          <option value="">{t('rsvp.age')}</option>
                          <option value="0-3">{t('rsvp.age0to3')}</option>
                          <option value="4-9">{t('rsvp.age4to9')}</option>
                          <option value="10+">{t('rsvp.age10plus')}</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        className="p-2 text-sage-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Attending */}
            <div>
              <label className="block text-sage-600 text-sm mb-2">
                {t('rsvp.attending')}
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    formData.attending === 'yes'
                      ? 'bg-sage-500 text-white'
                      : 'bg-white border border-sage-200 text-sage-600 hover:bg-sage-50'
                  }`}
                >
                  {t('rsvp.yes')}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    formData.attending === 'no'
                      ? 'bg-sage-500 text-white'
                      : 'bg-white border border-sage-200 text-sage-600 hover:bg-sage-50'
                  }`}
                >
                  {t('rsvp.no')}
                </button>
              </div>
            </div>

            {/* Dietary Restrictions - only show when attending */}
            {formData.attending === 'yes' && (
              <div>
                <label htmlFor="dietary" className="block text-sage-600 text-sm mb-2">
                  {t('rsvp.dietary')}
                </label>
                <textarea
                  id="dietary"
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  placeholder={t('rsvp.dietaryPlaceholder')}
                  rows={3}
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white resize-none"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!formData.name || !formData.attending || status === 'submitting'}
              className="w-full bg-sage-500 hover:bg-sage-600 disabled:bg-sage-300 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {status === 'submitting' ? t('rsvp.submitting') : t('rsvp.submit')}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">{t('rsvp.error')}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
