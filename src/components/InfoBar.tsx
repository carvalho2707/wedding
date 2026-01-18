import {useTranslation} from 'react-i18next'

export default function InfoBar() {
    const {t} = useTranslation()

    const infoItems = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            ),
            label: t('info.date'),
            value: t('info.dateValue'),
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            ),
            label: t('info.time'),
            value: t('info.timeValue'),
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
            ),
            label: t('info.location'),
            value: 'Quinta do Joinal',
            link: 'https://maps.app.goo.gl/n5UTxkPRu7ifYwF69',
        },
    ]

    return (
        <div className="bg-sage-500 py-6">
            <div className="max-w-4xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {infoItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-cream-100 mb-2">{item.icon}</div>
                            <p className="text-cream-200 text-xs uppercase tracking-wider mb-1">
                                {item.label}
                            </p>
                            {item.link ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white font-medium hover:text-cream-200 transition-colors underline underline-offset-2"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-white font-medium">{item.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
