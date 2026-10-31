import '../styles/hero.css'
import { Link } from '../router.jsx'
import { SITE } from '../data/site.js'

const LETTERS = 'OUSMAN'.split('')

/**
 * Portada: nombre, especialidad, mensaje y acceso a las tres acciones clave
 * (proyectos, experiencia interactiva, contacto).
 * Sin contadores ni barras de progreso: solo información verificable.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <span className="hero__slash" aria-hidden="true" />

      <div className="shell hero__grid">
        <div>
          <p className="label hero__eyebrow">Portafolio · {new Date().getFullYear()}</p>

          <h1 id="hero-title" className="hero__title" aria-label="Ousman">
            {LETTERS.map((letter, i) => (
              <span key={letter} style={{ animationDelay: `${i * 70}ms` }} aria-hidden="true">
                {letter}
              </span>
            ))}
          </h1>

          <div className="hero__role">
            <h2>
              Desarrollador <em>web</em>
            </h2>
            <span className="label label--dim">{SITE.stack.join(' · ')}</span>
          </div>

          <p className="hero__message">
            <strong>Construyo, aprendo y resuelvo.</strong> Diseño y programo productos web reales:
            desde la idea hasta la interfaz que alguien usa cada día.
          </p>

          <div className="hero__actions">
            <Link to="/#proyectos" className="btn btn--gold">
              Ver proyectos
            </Link>
            <Link to="/umbral" className="btn btn--blue">
              Entrar en El Umbral
            </Link>
            <Link to="/#contacto" className="btn btn--outline">
              Contacto
            </Link>
          </div>
        </div>

        {/* Raíl lateral: datos reales, sin métricas inventadas */}
        <aside className="hero__rail" aria-label="Ficha rápida">
          <dl>
            <div className="rail-item">
              <dt>Enfoque</dt>
              <dd>Front-end y full-stack con JavaScript</dd>
            </div>
            <div className="rail-item">
              <dt>Proyecto destacado</dt>
              <dd>
                <a
                  href="https://mattas-kitchen.vercel.app"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Matta&rsquo;s Kitchen ↗
                </a>
              </dd>
            </div>
            <div className="rail-item">
              <dt>Código</dt>
              <dd>
                <a href={SITE.contact.github} target="_blank" rel="noreferrer noopener">
                  github.com/ousman08 ↗
                </a>
              </dd>
            </div>
            <div className="rail-item">
              <dt>Estado</dt>
              <dd className="hero__status">Abierto a oportunidades y proyectos</dd>
            </div>
          </dl>
        </aside>
      </div>

      <span className="hero__scroll" aria-hidden="true">
        Desplázate
      </span>
    </section>
  )
}
