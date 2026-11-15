import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portafolio-theme'
const THEMES = ['dark', 'light']
const EVENT = 'portafolio:theme'

/**
 * Tema inicial: el ya aplicado en <html>, o el guardado por el usuario.
 * Si no hay nada, oscuro (la identidad del sitio).
 */
export function getInitialTheme() {
  const applied = document.documentElement.dataset.theme
  if (THEMES.includes(applied)) return applied

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (THEMES.includes(saved)) return saved
  } catch {
    // Almacenamiento bloqueado: se sigue con el tema por defecto.
  }

  return 'dark'
}

/**
 * Aplica el tema cambiando un atributo en <html>. Todo el color sale de
 * variables CSS, así que no hay que repintar ni recalcular clases.
 * Avisa al resto de selectores montados (escritorio y menú móvil).
 */
export function applyTheme(theme) {
  if (!THEMES.includes(theme)) return

  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000')

  document.dispatchEvent(new CustomEvent(EVENT, { detail: theme }))
}

/** Estado del tema compartido entre todos los selectores de la página. */
export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    const onChange = (event) => setThemeState(event.detail)
    document.addEventListener(EVENT, onChange)
    return () => document.removeEventListener(EVENT, onChange)
  }, [])

  const setTheme = (next) => {
    if (!THEMES.includes(next)) return

    applyTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin persistencia: el cambio sigue funcionando en esta visita.
    }
  }

  return { theme, setTheme }
}
