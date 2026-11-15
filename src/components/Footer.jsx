import Emblem from './Emblem.jsx'
import { useI18n } from '../i18n/LanguageProvider.jsx'

export default function Footer() {
  const { site, ui } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-ochre">
            <Emblem size={26} />
          </span>
          <p className="text-sm text-muted">
            <span className="text-fg">{site.name}</span> · {site.role}
          </p>
        </div>

        <nav aria-label={ui.footerNavAria} className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
          >
            GitHub
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
          >
            {ui.footerEmail}
          </a>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
          >
            {ui.footerWhatsapp}
          </a>
          <a
            href="#inicio"
            className="text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
          >
            {ui.backToTop}
          </a>
        </nav>

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
          {ui.footerNote(year)}
        </p>
      </div>
    </footer>
  )
}
