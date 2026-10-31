import StatsPanel from '../components/StatsPanel.jsx'
import { PRINCIPLES, SERVICES, SITE } from '../data/site.js'

export default function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-title"
      className="border-t border-line py-20 md:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1.45fr_0.8fr] lg:gap-16">
        <div>
          <p className="label">02 — Sobre mí</p>
          <h2
            id="sobre-mi-title"
            className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl"
          >
            Aprender construyendo.
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-muted md:text-base">
            <p className="text-base text-white md:text-lg">
              Soy Ousman Krubally. Programo, leo y escribo. Me interesa el punto exacto en el que
              una idea se convierte en algo que otra persona puede usar.
            </p>
            <p>
              Trabajo con JavaScript, React y Node.js. Me formo de manera continua —cursos,
              ejercicios y proyectos propios publicados en GitHub— y vuelvo sobre lo que hago hasta
              entender por qué funciona. Cuando algo falla, lo investigo; cuando funciona, también.
            </p>
            <p>
              Acabo de migrar Matta’s Kitchen a Next.js 16; falta desplegar esa versión. Mientras,
              sigo cuidando este portafolio: rendimiento, accesibilidad y código que se pueda leer.
              Antes de prometer algo, prefiero enseñarlo funcionando.
            </p>
          </div>

          <ul className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.title} className="grid gap-2 py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                <span className="font-mono text-[0.58rem] tracking-[0.2em] text-ochre">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{principle.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 border-t border-line pt-12">
            <p className="label">03 — Servicios</p>
            <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
              Lo que puedo construir contigo.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Alcance claro, sin piezas de más. Si algo no lo sé hacer todavía, lo digo antes de
              empezar.
            </p>

            <ul className="mt-7 max-w-2xl divide-y divide-line border-y border-line">
              {SERVICES.map((service, index) => (
                <li key={service.title} className="grid gap-2 py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                  <span className="font-mono text-[0.58rem] tracking-[0.2em] text-ochre">
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-white">{service.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white underline decoration-ochre/60 decoration-1 underline-offset-4 transition-colors hover:text-ochre"
            >
              Perfil de GitHub ↗
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <StatsPanel />
      </div>
    </section>
  )
}
