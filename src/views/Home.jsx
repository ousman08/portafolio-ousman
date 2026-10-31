import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Projects from '../sections/Projects.jsx'
import Experiences from '../sections/Experiences.jsx'
import Contact from '../sections/Contact.jsx'
import '../styles/sections.css'

/**
 * Vista de inicio: portada + secciones profesionales.
 * Las experiencias (El Umbral, Huellas, Conocimiento, Mapa) viven en
 * `src/views/` y se enlazan desde la portada y la cabecera.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Contact />
    </>
  )
}
