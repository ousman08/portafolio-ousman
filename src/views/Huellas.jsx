import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '../router.jsx'
import { CATEGORIES, categoryLabel, REPORT_REASONS } from '../data/categories.js'
import { DEMO_HUELLAS } from '../data/huellas.seed.js'
import { validateContribution } from '../lib/huellas.js'
import {
  hasBackend,
  listHuellas,
  randomHuella,
  createHuella,
  reportHuella,
} from '../huellas/api.js'
import {
  formatHuellaDate,
  readFavorites,
  readLocalContributions,
  addLocalContribution,
  toggleFavorite,
} from '../huellas/local.js'
import '../styles/huellas.css'

/**
 * HUELLAS — archivo colectivo de aportaciones.
 *
 * Con `VITE_API_URL` configurada, lee y escribe en el backend real
 * (server/index.js) con moderación previa. Sin ella, funciona en modo
 * demostración: datos de ejemplo etiquetados y envíos solo locales.
 */
export default function Huellas() {
  const [items, setItems] = useState(hasBackend ? [] : DEMO_HUELLAS)
  const [loading, setLoading] = useState(hasBackend)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favorites, setFavorites] = useState(readFavorites)
  const [status, setStatus] = useState(null)
  const [spotlight, setSpotlight] = useState(null)
  const [composerOpen, setComposerOpen] = useState(false)
  const [localItems, setLocalItems] = useState(readLocalContributions)

  // Consulta al backend (con retardo al escribir para no saturar).
  useEffect(() => {
    if (!hasBackend) return undefined
    let active = true
    setLoading(true)
    setError(null)
    const timer = setTimeout(
      async () => {
        try {
          const data = await listHuellas({ category, q: query })
          if (active) setItems(data.items)
        } catch (err) {
          if (active) setError(err.message)
        } finally {
          if (active) setLoading(false)
        }
      },
      query ? 320 : 0
    )
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [category, query])

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('es')
    return items.filter((item) => {
      if (category && item.category !== category) return false
      if (onlyFavorites && !favorites.includes(item.id)) return false
      if (!hasBackend && q) {
        return `${item.text} ${item.alias ?? ''}`.toLocaleLowerCase('es').includes(q)
      }
      return true
    })
  }, [items, category, query, onlyFavorites, favorites])

  const notify = (type, text) => setStatus({ type, text })

  const onToggleFavorite = (id) => {
    const next = toggleFavorite(id)
    setFavorites(next)
    notify('ok', next.includes(id) ? 'Guardada en tus favoritos de este navegador.' : 'Quitada de tus favoritos.')
  }

  const copyText = async (item) => {
    const text = `${item.text}\n— ${item.alias || 'Anónimo'}, en Huellas (Ousman)`
    try {
      await navigator.clipboard.writeText(text)
      notify('ok', 'Huella copiada al portapapeles.')
    } catch {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
      notify('ok', 'Huella copiada al portapapeles.')
    }
  }

  const share = async (item) => {
    const text = `${item.text} — ${item.alias || 'Anónimo'} · Huellas`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Huellas · Ousman', text })
        return
      } catch {
        return
      }
    }
    copyText(item)
  }

  const onReport = async (item, reason) => {
    try {
      if (!hasBackend) {
        notify('ok', 'Modo demostración: la denuncia no se ha enviado a ningún servidor.')
        return
      }
      const res = await reportHuella(item.id, reason)
      notify('ok', res.message)
    } catch (err) {
      notify('error', err.message)
    }
  }

  const onRandom = async () => {
    try {
      if (!hasBackend) {
        const pool = visible.length > 0 ? visible : DEMO_HUELLAS
        setSpotlight(pool[Math.floor(Math.random() * pool.length)])
        return
      }
      const data = await randomHuella()
      setSpotlight(data.item)
    } catch (err) {
      notify('error', err.message)
    }
  }

  const publish = async (payload) => {
    const local = validateContribution({ ...payload, accepted: true })
    if (!local.ok) return { ok: false, fields: local.errors }

    if (!hasBackend) {
      const item = {
        id: `local-${Date.now()}`,
        category: payload.category,
        text: local.value.text,
        alias: local.value.alias,
        createdAt: new Date().toISOString(),
        demo: true,
      }
      setLocalItems(addLocalContribution(item))
      notify(
        'ok',
        'Guardada en este navegador (modo demostración). No es pública: falta conectar el servidor.'
      )
      return { ok: true }
    }

    try {
      const res = await createHuella({
        category: payload.category,
        text: payload.text,
        alias: payload.alias,
        accepted: true,
      })
      notify('ok', res.message)
      return { ok: true }
    } catch (err) {
      return { ok: false, fields: err.fields ?? { form: err.message } }
    }
  }

  return (
    <section className="huellas" aria-labelledby="huellas-title">
      <div className="shell">
        <header className="huellas__header">
          <div>
            <p className="label">Archivo colectivo</p>
            <h1 id="huellas-title" className="huellas__title">
              Huellas
            </h1>
            <p className="huellas__intro">
              Lo que una persona aprende puede servirle a otra que nunca llegará a conocerla. Deja
              una lección, una pregunta o una pequeña victoria. Todo se lee con calma y se revisa
              antes de publicarse.
            </p>
          </div>
          <aside className="huellas__aside">
            <p className="mono muted">
              {hasBackend ? 'Conectado al archivo público' : 'Modo demostración local'}
            </p>
            <p className="small muted">
              {hasBackend
                ? 'Las aportaciones nuevas quedan pendientes de revisión.'
                : 'Las huellas mostradas son ejemplos de demostración. Sin backend, tus envíos solo se guardan en este navegador.'}
            </p>
            <Link to="/normas" className="link">
              Reglas y privacidad
            </Link>
            <Link to="/mapa" className="link">
              Ver el mapa de ideas
            </Link>
          </aside>
        </header>

        {!hasBackend && (
          <p className="huellas__banner" role="note">
            <strong>Demostración.</strong> No hay servidor configurado ahora mismo: los datos que ves
            son ejemplos identificados y no representan aportaciones reales. El código del backend y
            la moderación están incluidos en el proyecto.
          </p>
        )}

        <div className="huellas__toolbar">
          <div className="huellas__search">
            <label htmlFor="huellas-q" className="visually-hidden">
              Buscar en las huellas
            </label>
            <input
              id="huellas-q"
              type="search"
              placeholder="Buscar una palabra, una idea…"
              value={query}
              maxLength="80"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="huellas__toolbar-actions">
            <button type="button" className="btn btn--outline" onClick={onRandom}>
              Huella al azar
            </button>
            <button
              type="button"
              className="btn btn--gold"
              aria-expanded={composerOpen}
              aria-controls="huellas-composer"
              onClick={() => setComposerOpen((open) => !open)}
            >
              {composerOpen ? 'Cerrar' : 'Dejar una huella'}
            </button>
          </div>
        </div>

        <div className="huellas__filters" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            className="chip"
            aria-pressed={category === '' && !onlyFavorites}
            onClick={() => {
              setCategory('')
              setOnlyFavorites(false)
            }}
          >
            Todas
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              aria-pressed={category === item.id && !onlyFavorites}
              onClick={() => {
                setCategory(item.id)
                setOnlyFavorites(false)
              }}
            >
              {item.short}
            </button>
          ))}
          <button
            type="button"
            className="chip chip--fav"
            aria-pressed={onlyFavorites}
            onClick={() => setOnlyFavorites((value) => !value)}
          >
            ★ Guardadas ({favorites.length})
          </button>
        </div>

        {spotlight && (
          <div className="huellas__spotlight" role="region" aria-label="Huella al azar">
            <p className="label">Huella al azar</p>
            <blockquote>{spotlight.text}</blockquote>
            <p className="mono muted">
              {spotlight.alias || 'Anónimo'} · {formatHuellaDate(spotlight.createdAt)}
              {spotlight.demo ? ' · demostración' : ''}
            </p>
            <div className="huellas__spotlight-actions">
              <button type="button" className="btn btn--ghost" onClick={() => onToggleFavorite(spotlight.id)}>
                ★ Guardar
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => copyText(spotlight)}>
                Copiar
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setSpotlight(null)}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {composerOpen && (
          <Composer
            onClose={() => setComposerOpen(false)}
            onPublish={publish}
            demo={!hasBackend}
            onMessage={notify}
          />
        )}

        {status && (
          <p
            className={`huellas__status${status.type === 'error' ? ' is-error' : ''}`}
            role="status"
            aria-live="polite"
          >
            {status.text}
          </p>
        )}

        <div className="huellas__list-head">
          <p className="label label--dim">
            {onlyFavorites ? 'Tus guardadas' : 'Aportaciones publicadas'}
          </p>
          <p className="mono muted">
            {loading ? 'Cargando…' : `${visible.length} ${visible.length === 1 ? 'huella' : 'huellas'}`}
          </p>
        </div>

        {error && (
          <p className="huellas__status is-error" role="alert">
            {error} Puedes seguir leyendo las huellas de demostración.
          </p>
        )}

        {!loading && visible.length === 0 && (
          <div className="huellas__empty">
            <p className="display">Todavía no hay nada aquí.</p>
            <p className="muted">
              {onlyFavorites
                ? 'Aún no has guardado ninguna huella. Pulsa ★ en la que quieras conservar.'
                : 'No hay aportaciones que coincidan con la búsqueda. Prueba con otra palabra o categoría.'}
            </p>
          </div>
        )}

        <ul className="huellas__feed">
          {visible.map((item) => (
            <Footprint
              key={item.id}
              item={item}
              saved={favorites.includes(item.id)}
              onFavorite={() => onToggleFavorite(item.id)}
              onCopy={() => copyText(item)}
              onShare={() => share(item)}
              onReport={(reason) => onReport(item, reason)}
            />
          ))}
        </ul>

        {!hasBackend && localItems.length > 0 && (
          <section className="huellas__local" aria-labelledby="local-title">
            <h2 id="local-title" className="huellas__local-title">
              Tus envíos en este navegador
            </h2>
            <p className="small muted">
              Guardados solo aquí. No son públicos y se perderán si borras los datos del navegador.
            </p>
            <ul>
              {localItems.map((item) => (
                <li key={item.id}>
                  <span className="label label--dim">{categoryLabel(item.category)}</span>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ Aportación */

function Footprint({ item, saved, onFavorite, onCopy, onShare, onReport }) {
  const [reporting, setReporting] = useState(false)
  const [reason, setReason] = useState(REPORT_REASONS[0].id)

  return (
    <li className="footprint">
      <div className="footprint__head">
        <span className="label">{categoryLabel(item.category)}</span>
        <span className="mono muted">
          {formatHuellaDate(item.createdAt)}
          {item.demo ? ' · demostración' : ''}
        </span>
      </div>

      <blockquote className="footprint__text">{item.text}</blockquote>

      <div className="footprint__foot">
        <span className="mono">{item.alias || 'Anónimo'}</span>
        <div className="footprint__actions">
          <button
            type="button"
            className="footprint__action"
            aria-pressed={saved}
            onClick={onFavorite}
          >
            <span aria-hidden="true">{saved ? '★' : '☆'}</span> {saved ? 'Guardada' : 'Guardar'}
          </button>
          <button type="button" className="footprint__action" onClick={onCopy}>
            Copiar
          </button>
          <button type="button" className="footprint__action" onClick={onShare}>
            Compartir
          </button>
          <button
            type="button"
            className="footprint__action"
            aria-expanded={reporting}
            onClick={() => setReporting((value) => !value)}
          >
            Denunciar
          </button>
        </div>
      </div>

      {reporting && (
        <form
          className="footprint__report"
          onSubmit={(event) => {
            event.preventDefault()
            onReport(reason)
            setReporting(false)
          }}
        >
          <label htmlFor={`report-${item.id}`} className="small">
            Motivo de la denuncia
          </label>
          <select id={`report-${item.id}`} value={reason} onChange={(event) => setReason(event.target.value)}>
            {REPORT_REASONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn--red">
            Enviar denuncia
          </button>
        </form>
      )}
    </li>
  )
}

/* ------------------------------------------------------------- Formulario */

function Composer({ onClose, onPublish, demo, onMessage }) {
  const [form, setForm] = useState({ category: 'leccion', text: '', alias: '', accepted: false })
  const [fields, setFields] = useState({})
  const [sending, setSending] = useState(false)
  const firstField = useRef(null)

  useEffect(() => {
    firstField.current?.focus()
  }, [])

  const length = [...form.text].length

  const submit = async (event) => {
    event.preventDefault()
    setFields({})
    if (!form.accepted) {
      setFields({ accepted: 'Marca la casilla para confirmar que has leído las reglas.' })
      return
    }
    setSending(true)
    const result = await onPublish(form)
    setSending(false)
    if (result.ok) {
      setForm({ category: 'leccion', text: '', alias: '', accepted: false })
      if (demo) onMessage('ok', 'Guardada en este navegador. En producción quedaría pendiente de revisión.')
      onClose()
    } else {
      setFields(result.fields)
    }
  }

  return (
    <form id="huellas-composer" className="composer" onSubmit={submit} noValidate>
      <div className="composer__head">
        <p className="label">Nueva huella</p>
        <button type="button" className="text-button" onClick={onClose}>
          Cerrar
        </button>
      </div>

      <div className="composer__grid">
        <div className="field">
          <label htmlFor="huella-category">Categoría</label>
          <select
            id="huella-category"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="huella-alias">Seudónimo (opcional)</label>
          <input
            id="huella-alias"
            type="text"
            maxLength="24"
            autoComplete="off"
            placeholder="Anónimo"
            value={form.alias}
            onChange={(event) => setForm((prev) => ({ ...prev, alias: event.target.value }))}
            aria-describedby="alias-help"
          />
          <span id="alias-help" className="field__help">
            No incluyas tu nombre real ni datos personales. El anonimato no está garantizado.
          </span>
          {fields.alias && <span className="field__error">{fields.alias}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="huella-text">Tu aportación</label>
        <textarea
          id="huella-text"
          ref={firstField}
          rows="4"
          maxLength="420"
          value={form.text}
          onChange={(event) => setForm((prev) => ({ ...prev, text: event.target.value }))}
          aria-describedby="text-help"
        />
        <div className="composer__meta">
          <span id="text-help" className="field__help">
            Entre 12 y 420 caracteres. Se publica como texto plano.
          </span>
          <span className={`mono${length > 420 ? ' is-error' : ''}`}>{length}/420</span>
        </div>
        {fields.text && <span className="field__error">{fields.text}</span>}
      </div>

      <label className="composer__check">
        <input
          type="checkbox"
          checked={form.accepted}
          onChange={(event) => setForm((prev) => ({ ...prev, accepted: event.target.checked }))}
        />
        <span>
          He leído las <Link to="/normas">reglas de uso</Link> y acepto que la aportación se revise
          antes de publicarse. No incluyo datos personales de terceros.
        </span>
      </label>
      {fields.accepted && <span className="field__error">{fields.accepted}</span>}
      {fields.form && <span className="field__error">{fields.form}</span>}

      <div className="composer__actions">
        <button type="submit" className="btn btn--gold" disabled={sending}>
          {sending ? 'Enviando…' : demo ? 'Guardar en este navegador' : 'Enviar a revisión'}
        </button>
        <p className="small muted">
          {demo
            ? 'Modo demostración: no se envía nada a un servidor.'
            : 'Se publicará solo después de una revisión manual.'}
        </p>
      </div>
    </form>
  )
}
