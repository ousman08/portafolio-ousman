import { useEffect, useState } from 'react'

/**
 * Router mínimo por hash (sin dependencias).
 * Ventaja: funciona en cualquier hosting estático sin reglas de reescritura
 * y permite enlaces profundos (#/umbral) compartibles.
 *
 * Formato:  #/ruta            → vista
 *           #/ruta#ancla      → vista + salto a sección con id="ancla"
 */

export function parseHash() {
  const raw = window.location.hash.replace(/^#/, '')
  if (!raw) return { path: '/', anchor: '' }
  const clean = raw.startsWith('/') ? raw : `/${raw}`
  const [pathPart, anchor = ''] = clean.split('#')
  return { path: pathPart || '/', anchor }
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function navigate(to) {
  window.location.hash = to
}

/** Enlace interno que cierra el menú móvil si se le pasa onNavigate. */
export function Link({ to, children, className, onClick, ...rest }) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(event) => {
        onClick?.(event)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
