import { Suspense, lazy, useEffect } from 'react'
import { useRoute } from './router.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import Home from './views/Home.jsx'
import NotFound from './views/NotFound.jsx'

// Las vistas pesadas (juego, huellas, mapa) se cargan bajo demanda:
// la portada y el 404 no descargan su código hasta que el visitante entra.
const Umbral = lazy(() => import('./views/Umbral.jsx'))
const Huellas = lazy(() => import('./views/Huellas.jsx'))
const Conocimiento = lazy(() => import('./views/Conocimiento.jsx'))
const Mapa = lazy(() => import('./views/Mapa.jsx'))
const Normas = lazy(() => import('./views/Normas.jsx'))
const Admin = lazy(() => import('./views/Admin.jsx'))

// El pie se monta siempre con la página, así que vive en su propio chunk:
// no compite con la primera pintura del contenido.
const FooterDeferred = lazy(() => import('./components/DeferredFooter.jsx'))

const ROUTES = [
  { path: '/', view: Home, title: 'Ousman Krubally — Desarrollador web' },
  { path: '/umbral', view: Umbral, title: 'El Umbral — Ousman Krubally' },
  { path: '/huellas', view: Huellas, title: 'Huellas — Ousman Krubally' },
  { path: '/conocimiento', view: Conocimiento, title: 'Archivo del conocimiento — Ousman Krubally' },
  { path: '/mapa', view: Mapa, title: 'Mapa de ideas — Ousman Krubally' },
  { path: '/normas', view: Normas, title: 'Reglas y privacidad — Huellas' },
  { path: '/admin', view: Admin, title: 'Administración — Huellas', noindex: true },
]

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export default function App() {
  const { path, anchor } = useRoute()

  const match = ROUTES.find((route) => route.path === path)
  const View = match?.view ?? NotFound

  // Título, robots y posición de scroll en cada navegación.
  useEffect(() => {
    document.title = match?.title ?? 'Página no encontrada — Ousman Krubally'

    let robots = document.querySelector('meta[name="robots"]')
    if (match?.noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.setAttribute('name', 'robots')
        document.head.appendChild(robots)
      }
      robots.setAttribute('content', 'noindex, nofollow')
    } else if (robots) {
      robots.remove()
    }

    if (anchor) {
      const target = document.getElementById(anchor)
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [path, anchor, match])

  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <SiteHeader />

      <main id="contenido" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="shell" style={{ paddingBlock: '6rem', textAlign: 'center' }}>
              <p className="label">Cargando…</p>
            </div>
          }
        >
          <View />
        </Suspense>
      </main>

      <FooterDeferred />
    </>
  )
}
