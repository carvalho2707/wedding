import {useTranslation} from 'react-i18next'

export default function Hero() {
    const {t} = useTranslation()

    return (
        <section className="min-h-screen flex flex-col items-center justify-center pt-16 pb-8 px-4">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Left Photo */}
                    <div className="hidden md:flex justify-end">
                        <div
                            className="photo-frame relative w-64 h-80 lg:w-80 lg:h-[26rem] xl:w-96 xl:h-[30rem] bg-white p-2 shadow-lg -rotate-6 overflow-hidden">
                            <img
                                src="/images/photo1.jpg"
                                alt="Nina & Tiago"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Center Content */}
                    <div className="text-center md:col-span-1">
                        <p className="text-sage-500 text-sm md:text-base mb-4 tracking-wide">
                            {t('hero.invitation')}
                        </p>
                        <h1 className="font-script text-5xl md:text-7xl text-sage-700 mb-6">
                            Nina & Tiago
                        </h1>
                        <a
                            href="#rsvp"
                            className="inline-block bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-colors"
                        >
                            {t('hero.rsvpButton')} &rarr;
                        </a>
                    </div>

                    {/* Right Photo */}
                    <div className="hidden md:flex justify-start">
                        <div
                            className="photo-frame relative w-64 h-80 lg:w-80 lg:h-[26rem] xl:w-96 xl:h-[30rem] bg-white p-2 shadow-lg rotate-6 overflow-hidden">
                            <img
                                src="/images/photo2.jpg"
                                alt="Nina & Tiago"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Photos */}
                <div className="flex md:hidden justify-center gap-4 mt-8">
                    <div className="photo-frame relative w-40 h-52 bg-white p-1.5 shadow-lg -rotate-3 overflow-hidden">
                        <img
                            src="/images/photo1.jpg"
                            alt="Nina & Tiago"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="photo-frame relative w-40 h-52 bg-white p-1.5 shadow-lg rotate-3 overflow-hidden">
                        <img
                            src="/images/photo2.jpg"
                            alt="Nina & Tiago"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
