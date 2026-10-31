import ProjectCard from '../components/ProjectCard.jsx'
import { LEARNING_REPOS, PROJECTS } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="label">01 — Proyectos</p>
            <h2
              id="proyectos-title"
              className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl"
            >
              Trabajo real,
              <br />
              no maquetas.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
            Tres piezas reales. Cada ficha cuenta el problema, la solución y lo que todavía falta,
            sin adornos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:items-start lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-[#050505] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Repositorios de práctica
            </h3>
            <p className="text-[0.7rem] text-faint">
              Ejercicios y cursos. No son productos, pero están abiertos.
            </p>
          </div>

          <ul className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {LEARNING_REPOS.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 border-b border-line py-3 transition-colors"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-neutral-300 transition-colors group-hover:text-white">
                      {repo.name}
                    </span>
                    <span className="flex-none font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
                      {repo.tech}
                    </span>
                  </span>
                  <span className="pr-10 text-xs leading-relaxed text-faint">
                    {repo.description}
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
