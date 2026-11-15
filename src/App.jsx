import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import StackRow from './components/StackRow.jsx'
import Hero from './sections/Hero.jsx'
import Projects from './sections/Projects.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import { useI18n } from './i18n/LanguageProvider.jsx'

export default function App() {
  const { ui } = useI18n()

  return (
    <>
      <a href="#contenido" className="skip-link">
        {ui.skipToContent}
      </a>

      <Navbar />

      <main id="contenido" tabIndex="-1" className="pt-16">
        <Hero />
        <StackRow />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
