import { SITE } from '../data/site.js'

/**
 * Sobre mí.
 * Contenido basado en datos verificables (bio de GitHub, repositorios) y en
 * intereses declarados por el autor. Sin experiencia, clientes ni métricas
 * inventadas. Para cambiar el retrato, sustituye `public/img/ousman-avatar.webp`.
 */
export default function About() {
  return (
    <section id="sobre-mi" className="section about" aria-labelledby="sobre-mi-title">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="label">01 — Sobre mí</p>
            <h2 id="sobre-mi-title" className="section-head__title" style={{ marginTop: '0.8rem' }}>
              Aprender construyendo.
            </h2>
          </div>
          <p className="section-head__intro">
            No colecciono tecnologías: las uso para resolver problemas concretos y explico con
            claridad lo que sé y lo que todavía estoy aprendiendo.
          </p>
        </div>

        <div className="about__grid">
          <figure className="about__portrait">
            <img
              src="img/ousman-avatar.webp"
              alt="Retrato de Ousman Krubally"
              width="256"
              height="256"
              loading="lazy"
            />
            <figcaption>
              <span className="label label--dim">Ousman Krubally</span>
              <span className="mono">Desarrollador web · JavaScript, React, Node.js</span>
            </figcaption>
          </figure>

          <div className="about__text">
            <p className="about__lead">
              Soy Ousman Krubally. Programo, leo y escribo. Me interesa el punto exacto en el que
              una idea se convierte en algo que otra persona puede usar.
            </p>

            <p>
              Trabajo con JavaScript, React y Node.js. Me formo de manera continua —cursos,
              ejercicios y proyectos propios publicados en GitHub— y vuelvo sobre lo que hago hasta
              entender por qué funciona. Cuando algo falla, lo investigo; cuando funciona, también.
            </p>

            <p>
              Fuera del código leo y escribo sobre disciplina y propósito. El Corán, los hadices y
              libros como <em>Padre rico, padre pobre</em> forman parte de mi biblioteca: son
              lectura y estudio, no decoración. En el archivo del conocimiento dejo notas propias y
              procuro separar siempre <strong>la cita</strong> de <strong>la reflexión personal</strong>.
            </p>

            <ul className="about__principles">
              <li>
                <span className="mono gold">Construir antes que prometer</span>
                <p>Prefiero mostrar código y proyectos antes que enumerar capacidades.</p>
              </li>
              <li>
                <span className="mono gold">Aprender en público</span>
                <p>Repositorios abiertos, aunque el resultado todavía sea imperfecto.</p>
              </li>
              <li>
                <span className="mono gold">Resolver problemas reales</span>
                <p>Un catálogo, un carrito, un pedido: cosas que alguien usa de verdad.</p>
              </li>
            </ul>

            <div className="about__links">
              <a className="link link--external" href={SITE.contact.github} target="_blank" rel="noreferrer noopener">
                Perfil de GitHub
              </a>
              <a className="link" href={`mailto:${SITE.contact.email}`}>
                {SITE.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
