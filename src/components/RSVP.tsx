import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

interface Guest {
  name: string
  age: string
}

export default function RSVP() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    dietary: '',
  })
  const [songs, setSongs] = useState<string[]>([''])
  const [guests, setGuests] = useState<Guest[]>([])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const addGuest = () => {
    setGuests([...guests, { name: '', age: '' }])
  }

  const removeGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index))
  }

  const updateGuest = (index: number, field: keyof Guest, value: string) => {
    const updated = [...guests]
    updated[index][field] = value
    setGuests(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.attending) return

    setStatus('submitting')

    const submitData = {
      ...formData,
      songs: songs.filter(s => s.trim() !== ''),
      guests: guests.filter(g => g.name.trim() !== ''),
      guestCount: guests.filter(g => g.name.trim() !== '').length + 1,
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

            {/* Additional Guests */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sage-600 text-sm">
                  {t('rsvp.additionalGuests')}
                </label>
                <button
                  type="button"
                  onClick={addGuest}
                  className="text-sage-500 hover:text-sage-700 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('rsvp.addGuest')}
                </button>
              </div>

              {guests.length > 0 && (
                <div className="space-y-3">
                  {guests.map((guest, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={guest.name}
                          onChange={(e) => updateGuest(index, 'name', e.target.value)}
                          placeholder={t('rsvp.guestNamePlaceholder')}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white text-sm"
                        />
                      </div>
                      <div className="w-20">
                        <input
                          type="number"
                          min="0"
                          max="120"
                          value={guest.age}
                          onChange={(e) => updateGuest(index, 'age', e.target.value)}
                          placeholder={t('rsvp.age')}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeGuest(index)}
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
