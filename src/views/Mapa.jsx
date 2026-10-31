import { useEffect, useMemo, useState } from 'react'
import { Link } from '../router.jsx'
import { CATEGORIES, categoryLabel } from '../data/categories.js'
import { DEMO_HUELLAS } from '../data/huellas.seed.js'
import { hasBackend, listHuellas } from '../huellas/api.js'
import { formatHuellaDate } from '../huellas/local.js'
import '../styles/mapa.css'

/**
 * MAPA DE IDEAS — las huellas como puntos de luz conectados a su categoría.
 *
 * - Los datos salen del mismo backend que Huellas (o de los ejemplos de
 *   demostración, claramente marcados).
 * - La posición de cada nodo es determinista (hash del id), así que el mapa
 *   no baila entre visitas.
 * - Debajo del mapa hay una lista equivalente navegable con teclado.
 */

const WIDTH = 900
const HEIGHT = 640
const CX = WIDTH / 2
const CY = HEIGHT / 2
const HUB_RADIUS = 195

const ACCENTS = ['#c9a24b', '#3a8dff', '#e0243a']

function hashToUnit(seed) {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

export default function Mapa() {
  const [items, setItems] = useState(hasBackend ? [] : DEMO_HUELLAS)
  const [loading, setLoading] = useState(hasBackend)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!hasBackend) return undefined
    let active = true
    setLoading(true)
    listHuellas()
      .then((data) => {
        if (active) setItems(data.items)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const hubs = useMemo(
    () =>
      CATEGORIES.map((cat, index) => {
        const angle = (index / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2
        return {
          ...cat,
          accent: ACCENTS[index % ACCENTS.length],
          x: CX + Math.cos(angle) * HUB_RADIUS,
          y: CY + Math.sin(angle) * HUB_RADIUS,
        }
      }),
    []
  )

  const nodes = useMemo(() => {
    const byCategory = new Map()
    for (const item of items) {
      const list = byCategory.get(item.category) ?? []
      list.push(item)
      byCategory.set(item.category, list)
    }

    return [...byCategory.entries()].flatMap(([catId, list]) => {
      const hub = hubs.find((h) => h.id === catId)
      if (!hub) return []
      const total = list.length
      return list.map((item, index) => {
        const base = hashToUnit(item.id)
        const angle = (index / Math.max(total, 1)) * Math.PI * 2 + base * Math.PI * 2 * 0.15
        const distance = 52 + (index % 4) * 22 + base * 16
        return {
          item,
          hub,
          x: hub.x + Math.cos(angle) * distance,
          y: hub.y + Math.sin(angle) * distance,
          r: 4 + Math.min(textLength(item.text) / 120, 4),
        }
      })
    })
  }, [items, hubs])

  const visibleNodes = category ? nodes.filter((node) => node.item.category === category) : nodes
  const visibleCategories = new Set(visibleNodes.map((node) => node.item.category))

  const openNode = (node) => setSelected(node)

  return (
    <section className="section mapa" aria-labelledby="mapa-title">
      <div className="shell">
        <header className="mapa__header">
          <div>
            <p className="label">Mapa de ideas</p>
            <h1 id="mapa-title" className="mapa__title">
              Constelación
              <br />
              de huellas.
            </h1>
          </div>
          <p className="mapa__intro">
            Cada punto es una aportación real; cada línea la une a la categoría de la que nace. Pasa
            el cursor o recorre los nodos con el teclado. Ningún punto representa una ubicación
            geográfica.
          </p>
        </header>

        {!hasBackend && (
          <p className="mapa__note" role="note">
            <strong>Demostración:</strong> los nodos provienen de las aportaciones de ejemplo. Al
            conectar el backend, el mapa se dibuja con el archivo público real.
          </p>
        )}

        <div className="mapa__filters" role="group" aria-label="Filtrar el mapa por categoría">
          <button
            type="button"
            className="chip"
            aria-pressed={category === ''}
            onClick={() => setCategory('')}
          >
            Todas ({nodes.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = nodes.filter((node) => node.item.category === cat.id).length
            return (
              <button
                key={cat.id}
                type="button"
                className="chip"
                aria-pressed={category === cat.id}
                onClick={() => setCategory((current) => (current === cat.id ? '' : cat.id))}
                disabled={count === 0 && category !== cat.id}
              >
                {cat.short} ({count})
              </button>
            )
          })}
        </div>

        <div className="mapa__stage">
          <svg
            className="mapa__svg"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="group"
            aria-label="Mapa interactivo de huellas agrupadas por categoría"
          >
            <defs>
              <radialGradient id="mapa-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r="300" fill="url(#mapa-glow)" />

            {/* Conexiones hub → huella */}
            {visibleNodes.map((node) => (
              <line
                key={`line-${node.item.id}`}
                x1={node.hub.x}
                y1={node.hub.y}
                x2={node.x}
                y2={node.y}
                stroke={node.hub.accent}
                strokeWidth="1"
                strokeOpacity="0.22"
              />
            ))}

            {/* Categorías */}
            {hubs.map((hub) => {
              const active = visibleCategories.has(hub.id)
              return (
                <g key={hub.id} opacity={active ? 1 : 0.35}>
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="9"
                    fill="#07070a"
                    stroke={hub.accent}
                    strokeWidth="1.5"
                  />
                  <circle cx={hub.x} cy={hub.y} r="3" fill={hub.accent} />
                  <text
                    x={hub.x}
                    y={hub.y + (hub.y > CY ? 28 : -18)}
                    textAnchor="middle"
                    className="mapa__hub-label"
                    fill={hub.accent}
                  >
                    {hub.short}
                  </text>
                </g>
              )
            })}

            {/* Huellas */}
            {visibleNodes.map((node) => {
              const isSelected = selected?.item.id === node.item.id
              const dim = category && node.item.category !== category
              return (
                <g
                  key={node.item.id}
                  className="mapa__node"
                  opacity={dim ? 0.25 : 1}
                  onClick={() => openNode(node)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openNode(node)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${categoryLabel(node.item.category)}: ${truncate(node.item.text, 90)}`}
                >
                  <circle cx={node.x} cy={node.y} r={node.r + 7} fill={node.hub.accent} opacity="0.12" />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={node.hub.accent}
                    className="mapa__dot"
                  />
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 5}
                      fill="none"
                      stroke={node.hub.accent}
                      strokeWidth="1"
                    />
                  )}
                </g>
              )
            })}
          </svg>

          <aside className="mapa__panel" aria-live="polite">
            {selected ? (
              <>
                <p className="label">{categoryLabel(selected.item.category)}</p>
                <blockquote className="mapa__panel-text">{selected.item.text}</blockquote>
                <p className="mono muted">
                  {selected.item.alias || 'Anónimo'} · {formatHuellaDate(selected.item.createdAt)}
                </p>
                <div className="mapa__panel-actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setSelected(null)}>
                    Cerrar
                  </button>
                  <Link to="/huellas" className="btn btn--outline">
                    Ver en Huellas
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="label label--dim">Cómo leerlo</p>
                <p className="small muted">
                  Los nodos grandes son categorías. Las luces pequeñas son aportaciones. Selecciona
                  una para leerla aquí mismo.
                </p>
                <p className="small muted">
                  {loading ? 'Cargando el archivo…' : `${nodes.length} huellas en el mapa.`}
                </p>
                {error && <p className="small is-error">{error}</p>}
              </>
            )}
          </aside>
        </div>

        <details className="mapa__list">
          <summary>Lista de todas las huellas del mapa ({visibleNodes.length})</summary>
          <ul>
            {visibleNodes.map((node) => (
              <li key={`list-${node.item.id}`}>
                <button type="button" onClick={() => openNode(node)}>
                  <span className="label">{categoryLabel(node.item.category)}</span>
                  <span>{truncate(node.item.text, 140)}</span>
                </button>
              </li>
            ))}
          </ul>
        </details>

        <p className="small muted mapa__footer">
          Datos del mismo archivo que <Link to="/huellas">Huellas</Link>. Sin geolocalización ni
          información sensible: cada nodo es solo texto.
        </p>
      </div>
    </section>
  )
}

function textLength(text) {
  return [...(text ?? '')].length
}

function truncate(text, max) {
  return textLength(text) > max ? `${[...text].slice(0, max).join('')}…` : text
}
