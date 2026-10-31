import { SITE } from '../data/site.js'

function ArrowDown() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line"
    >
      {/* Halo ocre muy contenido detrás del retrato. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 hidden h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.16),transparent_65%)] blur-2xl lg:block"
      />

      <div className="shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="relative">
          <p className="label">Portafolio · 2026</p>

          <h1
            id="hero-title"
            className="mt-5 text-[clamp(2.9rem,9vw,5.6rem)] font-light leading-[0.9] tracking-[-0.045em] text-white"
          >
            Ousman
            <br />
            <span className="font-semibold">Krubally</span>
          </h1>

          <p className="mt-5 text-base text-white/90 md:text-lg">
            Desarrollador <span className="font-medium text-ochre">Full Stack</span>
          </p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Construyo webs de negocio y productos que la gente usa de verdad: catálogos, carritos y
            pedidos. React, Next.js y Node.js, con el detalle puesto en el rendimiento y la
            accesibilidad.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos
              <ArrowDown />
            </a>
            <a href="#contacto" className="btn btn-outline">
              Hablemos
            </a>
          </div>

          <p className="mt-7 flex items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]"
            />
            {SITE.availability}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] lg:mx-0 lg:ml-auto lg:max-w-[24rem]">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,75,0.18),transparent_70%)] blur-xl"
          />

          <figure className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#080808]">
            <img
              src="img/ousman-avatar.webp"
              alt="Retrato en blanco y negro de Ousman Krubally"
              width="256"
              height="256"
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top grayscale contrast-125 brightness-95"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent_58%)]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-white/55">
                  Retrato
                </p>
                <p className="mt-1 text-sm font-medium text-white">{SITE.name}</p>
              </div>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/55 [writing-mode:vertical-rl]">
                Portafolio · MMXXVI
              </span>
            </figcaption>
          </figure>

          <span
            aria-hidden="true"
            className="absolute -left-2 top-6 hidden h-24 w-px bg-gradient-to-b from-transparent via-ochre/60 to-transparent lg:block"
          />
        </div>
      </div>
    </section>
  )
}
