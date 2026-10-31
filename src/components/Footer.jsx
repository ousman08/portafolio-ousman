import Emblem from './Emblem.jsx'
import { SITE } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-ochre">
            <Emblem size={26} />
          </span>
          <p className="text-sm text-muted">
            <span className="text-white">{SITE.name}</span> · {SITE.role}
          </p>
        </div>

        <nav aria-label="Enlaces del pie" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-white"
          >
            Correo
          </a>
          <a
            href="#inicio"
            className="text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-white"
          >
            Volver arriba ↑
          </a>
        </nav>

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
          © {year} · Sin cookies ni analítica
        </p>
      </div>
    </footer>
  )
}
