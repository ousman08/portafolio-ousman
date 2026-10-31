import { PROJECTS, LEARNING_REPOS } from '../data/projects.js'

/**
 * Proyectos reales.
 * - Destacado: ficha amplia con capturas y detalles desplegables (<details>).
 * - Secundario: misma estructura, más compacta.
 * - Aprendizaje: repositorios honestamente etiquetados como ejercicios.
 */
export default function Projects() {
  const [featured, ...rest] = PROJECTS

  return (
    <section id="proyectos" className="section projects" aria-labelledby="proyectos-title">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="label">02 — Proyectos</p>
            <h2 id="proyectos-title" className="section-head__title" style={{ marginTop: '0.8rem' }}>
              Cosas que existen.
            </h2>
          </div>
          <p className="section-head__intro">
            Pocos proyectos, explicados de verdad: qué hacen, con qué están construidos, qué
            decisiones tienen detrás y qué queda pendiente. Cada enlace apunta a una web o un
            repositorio que puedes abrir ahora.
          </p>
        </div>

        <ProjectCard project={featured} featured />

        <div className="projects__grid">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="learning">
          <div className="learning__head">
            <p className="label label--dim">Aprendizaje y laboratorio</p>
            <p className="small muted">
              Ejercicios y prácticas en repositorios públicos. No son productos: son parte del
              proceso, y los muestro como tal.
            </p>
          </div>
          <ul className="learning__list">
            {LEARNING_REPOS.map((repo) => (
              <li key={repo.name}>
                <a href={repo.href} target="_blank" rel="noreferrer noopener" className="learning__item">
                  <span className="learning__name">{repo.name}</span>
                  <span className="learning__desc">{repo.description}</span>
                  <span className="mono learning__tech">{repo.tech}</span>
                  <span aria-hidden="true" className="learning__arrow">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project${featured ? ' project--featured' : ''}`} aria-labelledby={`p-${project.id}`}>
      <div className="project__media">
        {project.images.map((image, index) => (
          <div
            key={image.src}
            className={`project__shot project__shot--${image.variant ?? (index === 0 ? 'wide' : 'phone')}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={featured && index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="project__body">
        <div className="project__meta">
          <span className="label">{featured ? 'Proyecto destacado' : 'Proyecto'}</span>
          <span className="mono muted">
            {project.year} · {project.status}
          </span>
        </div>

        <h3 id={`p-${project.id}`} className="project__title">
          {project.name}
        </h3>
        <p className="project__kind mono">{project.kind}</p>
        <p className="project__summary">{project.summary}</p>

        <ul className="techlist" aria-label="Tecnologías">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project__actions">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer noopener' : undefined}
              className={link.label.includes('Web') ? 'btn btn--gold' : 'btn btn--outline'}
            >
              {link.label}
              {link.external ? ' ↗' : ''}
            </a>
          ))}
        </div>

        <details className="project__details">
          <summary>Ficha completa · decisiones y pendientes</summary>
          <div className="project__details-body">
            <div>
              <h4>Qué resuelve</h4>
              <p>{project.problem}</p>
            </div>
            <div>
              <h4>Qué se construyó</h4>
              <p>{project.solution}</p>
            </div>
            <div>
              <h4>Decisiones destacadas</h4>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {project.pending.length > 0 && (
              <div>
                <h4 className="gold">Pendiente</h4>
                <ul>
                  {project.pending.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      </div>
    </article>
  )
}
