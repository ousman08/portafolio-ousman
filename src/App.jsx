import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import StackRow from './components/StackRow.jsx'
import Hero from './sections/Hero.jsx'
import Projects from './sections/Projects.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
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
