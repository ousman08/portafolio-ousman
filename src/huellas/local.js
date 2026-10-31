/**
 * Utilidades locales de Huellas.
 *
 * IMPORTANTE: nada de esto es contenido público. Solo guarda:
 *  - aportaciones hechas en MODO DEMOSTRACIÓN (sin backend), y
 *  - favoritos del visitante.
 * Se guardan en este navegador y así se indica en la interfaz.
 */

const PENDING_KEY = 'ousman.huellas.demo.v1'
const FAVORITES_KEY = 'ousman.huellas.favoritas.v1'

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* almacenamiento bloqueado: se ignora sin romper la interfaz */
  }
}

export function readLocalContributions() {
  return read(PENDING_KEY, [])
}

export function addLocalContribution(item) {
  const next = [item, ...readLocalContributions()].slice(0, 30)
  write(PENDING_KEY, next)
  return next
}

export function clearLocalContributions() {
  write(PENDING_KEY, [])
}

export function readFavorites() {
  return read(FAVORITES_KEY, [])
}

export function toggleFavorite(id) {
  const current = new Set(readFavorites())
  if (current.has(id)) current.delete(id)
  else current.add(id)
  const next = [...current]
  write(FAVORITES_KEY, next)
  return next
}

export function formatHuellaDate(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}
