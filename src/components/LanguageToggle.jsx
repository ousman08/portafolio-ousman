import { useI18n } from '../i18n/LanguageProvider.jsx'

/** Los nombres de idioma se muestran siempre en su propia lengua. */
const OPTIONS = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
]

/**
 * Selector ES / EN. `aria-pressed` comunica el idioma activo y cada botón
 * lleva el nombre completo del idioma como etiqueta accesible.
 */
export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, ui } = useI18n()

  return (
    <div
      role="group"
      aria-label={ui.languageLabel}
      className={`flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] ${className}`}
    >
      {OPTIONS.map((option, index) => (
        <span key={option.code} className="flex items-center gap-1">
          {index > 0 && (
            <span aria-hidden="true" className="text-white/25">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={lang === option.code}
            aria-label={option.label}
            className={`inline-flex min-h-6 min-w-6 items-center justify-center rounded-sm px-1 py-1 transition-colors ${
              lang === option.code ? 'text-ochre' : 'text-muted hover:text-white'
            }`}
          >
            {option.short}
          </button>
        </span>
      ))}
    </div>
  )
}
