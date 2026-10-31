import { useId, useState } from 'react'

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  )
}

/**
 * Tarjeta de proyecto con captura de página completa: al pasar el ratón o
 * enfocar, la imagen se desliza dentro del marco 16:10 (solo CSS).
 * El caso técnico se despliega en la propia tarjeta, sin cambiar de página.
 */
export default function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[#050505] transition-colors duration-300 hover:border-ochre/45">
      <div className="preview relative aspect-[16/10] overflow-hidden border-b border-line bg-[#0b0b0b]">
        <img
          src={project.preview.src}
          alt={project.preview.alt}
          width={project.preview.width}
          height={project.preview.height}
          loading="lazy"
          decoding="async"
          style={{ '--pan': project.preview.pan }}
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
          Página completa
        </span>
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/70 px-2 py-1 font-mono text-[0.55rem] tracking-[0.16em] text-white/60 backdrop-blur-sm"
        >
          0{index + 1}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
          <span>{project.year}</span>
          <span className="truncate text-right text-ochre/90">{project.status}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
          {project.links[0] ? (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-ochre"
            >
              {project.name}
              <ExternalArrow />
            </a>
          ) : (
            project.name
          )}
        </h3>

        <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-faint">
          {project.kind}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologías">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[0.62rem] font-medium tracking-wide text-neutral-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-left text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-ochre"
        >
          {open ? 'Cerrar caso técnico' : 'Ver caso técnico'}
          <span
            aria-hidden="true"
            className={`relative h-3 w-3 text-ochre transition-transform duration-300 ${
              open ? 'rotate-45' : ''
            }`}
          >
            <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
          </span>
        </button>
      </div>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-label={`Caso técnico de ${project.name}`}
          className="border-t border-line bg-white/[0.02] px-5 py-6"
        >
          <dl className="space-y-5">
            <div>
              <dt className="label">Problema</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</dd>
            </div>
            <div>
              <dt className="label">Solución</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{project.solution}</dd>
            </div>
          </dl>

          <p className="label mt-6">Decisiones</p>
          <ul className="mt-2 space-y-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-neutral-300">
                <span aria-hidden="true" className="mt-2 h-px w-3 flex-none bg-ochre" />
                {item}
              </li>
            ))}
          </ul>

          <p className="label mt-6 text-faint">Pendiente</p>
          <ul className="mt-2 space-y-2">
            {project.pending.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-faint">
                <span aria-hidden="true" className="mt-2 h-px w-3 flex-none bg-white/25" />
                {item}
              </li>
            ))}
          </ul>

          {project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ochre transition-colors hover:text-ochre-bright"
                >
                  {link.label}
                  <ExternalArrow />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  )
}
