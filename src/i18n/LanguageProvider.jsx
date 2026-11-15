import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { es } from './es.js'
import { en } from './en.js'

const DICTIONARIES = { es, en }
const STORAGE_KEY = 'portafolio-lang'

const LanguageContext = createContext(null)

/**
 * Detecta el idioma inicial con prioridad:
 *   1. elección guardada por el usuario;
 *   2. idioma del navegador (inglés si alguno de sus idiomas lo es);
 *   3. español.
 * Sin dependencias: `navigator.languages` es nativo.
 */
function detectLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // Almacenamiento bloqueado (modo privado, permisos): se sigue con el navegador.
  }

  const languages =
    navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]

  return languages.some((code) => String(code).toLowerCase().startsWith('en')) ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage)
  const dictionary = DICTIONARIES[lang]

  // Mantiene el documento alineado con el idioma activo: lectores de pantalla,
  // buscadores y previsualizaciones al compartir el enlace.
  useEffect(() => {
    const meta = dictionary.meta
    document.documentElement.lang = lang
    document.title = meta.title

    const setMeta = (selector, content) => {
      document.querySelector(selector)?.setAttribute('content', content)
    }

    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:locale"]', meta.ogLocale)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.shortDescription)
    setMeta('meta[name="twitter:title"]', meta.title)
    setMeta('meta[name="twitter:description"]', meta.shortDescription)
  }, [lang, dictionary])

  const value = useMemo(() => {
    const setLang = (next) => {
      if (next !== 'es' && next !== 'en') return
      setLangState(next)
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Sin persistencia: el cambio sigue funcionando en esta visita.
      }
    }

    return { ...dictionary, lang, setLang }
  }, [dictionary, lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useI18n debe usarse dentro de <LanguageProvider>')
  }
  return context
}
