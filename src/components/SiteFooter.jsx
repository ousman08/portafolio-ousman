import Emblem from './Emblem.jsx'
import { Link } from '../router.jsx'
import { SITE } from '../data/site.js'

const YEAR = new Date().getFullYear()

/**
 * Pie del sitio: identidad, mapa del sitio y contacto.
 * Los enlaces sin perfil verificado no aparecen (ver src/data/site.js).
 */
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <div className="brand">
              <Emblem size={34} />
              <span className="brand__name">
                OUS<span>MAN</span>
              </span>
            </div>
            <p className="muted small" style={{ marginTop: '1rem', maxWidth: '38ch' }}>
              Construir, aprender, resolver. Portafolio de {SITE.name}, desarrollador web.
            </p>
          </div>

          <nav aria-label="Mapa del sitio">
            <p className="label label--dim">Secciones</p>
            <ul className="footer__list">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/#sobre-mi">Sobre mí</Link>
              </li>
              <li>
                <Link to="/#proyectos">Proyectos</Link>
              </li>
              <li>
                <Link to="/conocimiento">Conocimiento</Link>
              </li>
              <li>
                <Link to="/huellas">Huellas</Link>
              </li>
              <li>
                <Link to="/umbral">El Umbral</Link>
              </li>
              <li>
                <Link to="/mapa">Mapa de ideas</Link>
              </li>
              <li>
                <Link to="/#contacto">Contacto</Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="label label--dim">Contacto</p>
            <ul className="footer__list">
              <li>
                <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
              </li>
              <li>
                <a href={SITE.contact.github} target="_blank" rel="noreferrer noopener">
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {YEAR} {SITE.name}
          </span>
          <span className="mono">Negro · Dorado · Rojo · Azul</span>
        </div>
      </div>
    </footer>
  )
}
