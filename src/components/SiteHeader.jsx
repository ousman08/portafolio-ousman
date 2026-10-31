import { useEffect, useState } from 'react'
import Emblem from './Emblem.jsx'
import { Link, useRoute } from '../router.jsx'
import { NAV } from '../data/site.js'

/**
 * Cabecera fija con navegación.
 * - Escritorio: fila horizontal con subrayado animado.
 * - Móvil (<900px): botón hamburguesa → panel desplegable (ver global.css).
 */
export default function SiteHeader() {
  const { path, anchor } = useRoute()
  const [open, setOpen] = useState(false)

  // Cierra el menú al cambiar de ruta y al redimensionar a escritorio.
  useEffect(() => setOpen(false), [path, anchor])
  useEffect(() => {
    const onResize = () => window.innerWidth > 900 && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Bloquea el scroll del body mientras el menú móvil está abierto y
  // permite cerrarlo con Escape (teclado).
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const isActive = (to) => {
    if (to === '/') return path === '/' && !anchor
    if (to.startsWith('/#')) return path === '/' && to.split('#')[1] === anchor
    return path === to
  }

  return (
    <header className="header">
      <div className="shell header__inner">
        <Link to="/" className="brand" aria-label="Ousman Krubally — inicio">
          <Emblem size={30} />
          <span className="brand__name">
            OUS<span>MAN</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-principal"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>

        <nav id="nav-principal" className="nav" data-open={open} aria-label="Navegación principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav__link${item.accent ? ' nav__link--accent' : ''}`}
              aria-current={isActive(item.to) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
