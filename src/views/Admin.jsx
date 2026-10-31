import { useEffect, useState } from 'react'
import { Link } from '../router.jsx'
import { adminQueue, adminReview, hasBackend } from '../huellas/api.js'
import '../styles/huellas.css'

/**
 * Administración de Huellas.
 * El token se guarda en sessionStorage (se borra al cerrar la pestaña) y
 * nunca se incluye en el bundle. Sin token válido, el servidor responde 401.
 * En modo demostración esta pantalla no opera.
 */
export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('huellas.admin') || '')
  const [queue, setQueue] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async (value = token) => {
    if (!hasBackend) {
      setError('No hay backend configurado (VITE_API_URL).')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await adminQueue(value)
      setQueue(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Administración de Huellas'
  }, [])

  const decide = async (id, action) => {
    try {
      await adminReview(token, id, action)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="section admin" aria-labelledby="admin-title">
      <div className="shell admin__inner">
        <p className="label">Huellas · Administración</p>
        <h1 id="admin-title" className="normas__title">
          Cola de moderación
        </h1>
        <p className="muted">
          Esta pantalla no está pensada para visitantes. El acceso requiere el token del servidor
          (<code>ADMIN_TOKEN</code>); no se guarda en el código.
        </p>

        <form
          className="admin__login"
          onSubmit={(event) => {
            event.preventDefault()
            sessionStorage.setItem('huellas.admin', token)
            load()
          }}
        >
          <div className="field">
            <label htmlFor="admin-token">Token de administración</label>
            <input
              id="admin-token"
              type="password"
              autoComplete="off"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Introduce el token del servidor"
            />
          </div>
          <button type="submit" className="btn btn--gold" disabled={loading}>
            {loading ? 'Cargando…' : 'Ver cola'}
          </button>
        </form>

        {error && (
          <p className="huellas__status is-error" role="alert">
            {error}
          </p>
        )}

        {queue && (
          <div className="admin__queue">
            <h2>Pendientes ({queue.pending.length})</h2>
            {queue.pending.length === 0 && <p className="muted">No hay aportaciones pendientes.</p>}
            <ul>
              {queue.pending.map((item) => (
                <li key={item.id} className="admin__item">
                  <p className="label">{item.category}</p>
                  <p>{item.text}</p>
                  <p className="mono muted">
                    {item.alias || 'Anónimo'} · {new Date(item.createdAt).toLocaleString('es-ES')}
                  </p>
                  <div className="admin__actions">
                    <button type="button" className="btn btn--gold" onClick={() => decide(item.id, 'approve')}>
                      Aprobar
                    </button>
                    <button type="button" className="btn btn--red" onClick={() => decide(item.id, 'reject')}>
                      Rechazar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h2>Denunciadas ({queue.reported.length})</h2>
            {queue.reported.length === 0 && <p className="muted">No hay denuncias.</p>}
            <ul>
              {queue.reported.map((item) => (
                <li key={item.id} className="admin__item">
                  <p className="label">{item.category}</p>
                  <p>{item.text}</p>
                  <p className="small muted">
                    Estado: {item.status} · denuncias: {item.reports.map((report) => report.reason).join(', ')}
                  </p>
                  <div className="admin__actions">
                    <button type="button" className="btn btn--gold" onClick={() => decide(item.id, 'approve')}>
                      Mantener publicada
                    </button>
                    <button type="button" className="btn btn--red" onClick={() => decide(item.id, 'reject')}>
                      Retirar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="small muted">
          <Link to="/huellas" className="link">
            Volver a Huellas
          </Link>
        </p>
      </div>
    </section>
  )
}
