import SiteFooter from './SiteFooter.jsx'

/**
 * Pie del sitio cargado en diferido (chunk aparte).
 *
 * El pie no aporta contenido principal, así que no debe competir con la
 * primera pintura. Al vivir en su propio módulo, Vite lo separa del paquete
 * inicial y la tarjeta de contenido aparece antes.
 */
export default function DeferredFooter() {
  return <SiteFooter />
}
