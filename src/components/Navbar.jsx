import { useEffect, useRef, useState } from 'react'
import Emblem from './Emblem.jsx'
import { NAV, SITE } from '../data/site.js'

/**
 * Cabecera fija y menú móvil accesible:
 * - el panel solo existe en el DOM cuando está abierto (nada tabulable oculto);
 * - Escape cierra y devuelve el foco al botón;
 * - el foco queda atrapado dentro del panel mientras está abierto;
 * - el fondo no hace scroll y `main` queda `inert`.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // Resalta la sección visible en el menú de escritorio.
  useEffect(() => {
    const sections = NAV.map((item) => document.querySelector(item.href)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return

    const toggle = toggleRef.current
    const panel = panelRef.current
    const main = document.querySelector('main')
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    if (main) main.inert = true
    panel?.querySelector('a, button')?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        toggle?.focus()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusables = panel.querySelectorAll('a[href], button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      if (main) main.inert = false
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Si la ventana pasa a escritorio con el menú abierto, se cierra para no
  // dejar el scroll bloqueado en una vista donde el panel ya no se ve.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-black/80 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <a
            href="#inicio"
            onClick={close}
            className="flex items-center gap-2.5 rounded-sm text-white transition-colors hover:text-ochre"
          >
            <Emblem size={27} />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
              Ousman
            </span>
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? 'true' : undefined}
                className={`text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors hover:text-white ${
                  active === item.href ? 'text-ochre' : 'text-muted'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contacto" className="btn btn-primary hidden lg:inline-flex">
            Hablemos
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={open ? 'menu-movil' : undefined}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-ochre lg:hidden"
          >
            <span className="sr-only">Menú</span>
            <span
              aria-hidden="true"
              className={`absolute h-px w-5 bg-current transition-transform duration-300 ${
                open ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-5 bg-current transition-transform duration-300 ${
                open ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </header>

      {open && (
        <div
          id="menu-movil"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-black lg:hidden"
        >
          <nav aria-label="Navegación móvil" className="shell flex min-h-full flex-col py-10">
            <ul className="divide-y divide-line">
              {NAV.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex items-baseline justify-between py-4 text-2xl font-light tracking-tight text-white transition-colors hover:text-ochre"
                  >
                    {item.label}
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] text-faint">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-4">
              <a href="#contacto" onClick={close} className="btn btn-primary w-full">
                Hablemos
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="block break-all text-sm text-muted transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted transition-colors hover:text-white"
              >
                {SITE.githubHandle}
              </a>
            </div>

            <p className="mt-auto flex items-center gap-2 pt-10 text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {SITE.availability}
            </p>
          </nav>
        </div>
      )}
    </>
  )
}
