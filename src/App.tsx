import Navigation from './components/Navigation'
import Hero from './components/Hero'
import InfoBar from './components/InfoBar'
import Timeline from './components/Timeline'
import Countdown from './components/Countdown'
import RSVP from './components/RSVP'
import Map from './components/Map'
import FAQ from './components/FAQ'
import Contacts from './components/Contacts'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-cream-50 floral-bg">
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <InfoBar />
        <section id="timeline">
          <Timeline />
        </section>
        <Countdown />
        <section id="rsvp">
          <RSVP />
        </section>
        <section id="map">
          <Map />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="contacts">
          <Contacts />
        </section>
        <Footer />
      </main>
    </div>
  )
}

export default App
