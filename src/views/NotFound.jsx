import { Link } from '../router.jsx'

/**
 * 404: útil de verdad — explica el error, ofrece rutas de vuelta
 * y permite volver a escribir la dirección a mano.
 */
export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '55vh' }}>
      <div className="shell" style={{ maxWidth: '720px' }}>
        <p className="label label--red">Error 404</p>
        <h1 className="display" style={{ fontSize: 'var(--step-4)', margin: '0.6rem 0 1rem' }}>
          Esta puerta no existe.
        </h1>
        <p className="lede" style={{ marginBottom: '2rem' }}>
          La dirección que has visitado no corresponde a ninguna sección del portafolio. Puede que
          se haya movido o que falte una letra.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
          <Link to="/" className="btn btn--gold">
            Volver al inicio
          </Link>
          <Link to="/#proyectos" className="btn btn--outline">
            Ver proyectos
          </Link>
          <a href="mailto:oman7910@gmail.com" className="btn btn--ghost">
            Avisar del problema por correo
          </a>
        </div>
      </div>
    </section>
  )
}
