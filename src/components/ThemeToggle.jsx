import { useI18n } from '../i18n/LanguageProvider.jsx'
import { useTheme } from '../theme/useTheme.js'

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="3.1" />
      <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.5 9.6A5.7 5.7 0 0 1 6.4 2.5a5.9 5.9 0 1 0 7.1 7.1Z" />
    </svg>
  )
}

const OPTIONS = [
  { id: 'light', labelKey: 'themeLight', Icon: SunIcon },
  { id: 'dark', labelKey: 'themeDark', Icon: MoonIcon },
]

/**
 * Selector de tema claro / oscuro. Igual que el de idioma: `aria-pressed`
 * comunica cuál está activo y cada botón lleva su nombre accesible.
 * El estado vive en `useTheme`, así que los dos selectores (cabecera y menú
 * móvil) se mantienen sincronizados.
 */
export default function ThemeToggle({ className = '' }) {
  const { ui } = useI18n()
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label={ui.themeLabel}
      className={`flex items-center gap-1 ${className}`}
    >
      {OPTIONS.map(({ id, labelKey, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => setTheme(id)}
          aria-pressed={theme === id}
          aria-label={ui[labelKey]}
          className={`inline-flex min-h-6 min-w-6 items-center justify-center rounded-sm px-1 py-1 transition-colors ${
            theme === id ? 'text-ochre' : 'text-muted hover:text-fg'
          }`}
        >
          <Icon />
        </button>
      ))}
    </div>
  )
}
