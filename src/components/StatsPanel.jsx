import { SITE, STATS } from '../data/site.js'

/** Panel «En Números». Sticky en escritorio, estático en móvil. */
export default function StatsPanel() {
  return (
    <aside aria-labelledby="numeros-title" className="self-start lg:sticky lg:top-24">
      <div className="rounded-2xl border border-line bg-[#050505] p-6">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="numeros-title"
            className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ochre"
          >
            En números
          </h2>
          <span className="font-mono text-[0.58rem] tracking-[0.16em] text-faint">2026</span>
        </div>

        <ul className="mt-5 divide-y divide-line">
          {STATS.map((stat) => (
            <li key={stat.label} className="flex items-baseline justify-between gap-4 py-4">
              <span className="text-3xl font-light tabular-nums tracking-tight text-white">
                {stat.value}
              </span>
              <span className="max-w-[8.5rem] text-right text-[0.72rem] leading-snug text-muted">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-line pt-5">
          <p className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
            />
            Ahora
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-white">{SITE.currently}</p>
        </div>

        <a
          href="#contacto"
          className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-line px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-ochre/60 hover:text-ochre"
        >
          Hablemos
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  )
}
