/**
 * Cliente de la API de Huellas.
 *
 * Configuración: VITE_API_URL (por ejemplo https://api.tudominio.com).
 * Si no está definida, la interfaz funciona en MODO DEMOSTRACIÓN claramente
 * etiquetado: no hay backend, no se publica nada y no se simula que se envía.
 */

const API = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export const hasBackend = Boolean(API)

export class ApiError extends Error {
  constructor(message, fields = null, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.fields = fields
    this.status = status
  }
}

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })
  } catch {
    throw new ApiError('No se pudo conectar con el servidor de Huellas.')
  }

  let payload = null
  try {
    payload = await response.json()
  } catch {
    /* respuesta sin JSON */
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.error || 'No se pudo completar la operación.',
      payload?.fields ?? null,
      response.status
    )
  }
  return payload
}

export function listHuellas({ category, q } = {}) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (q) params.set('q', q)
  const suffix = params.toString() ? `?${params}` : ''
  return request(`/api/huellas${suffix}`, { method: 'GET' })
}

export function randomHuella() {
  return request('/api/huellas/random', { method: 'GET' })
}

export function createHuella(payload) {
  return request('/api/huellas', { method: 'POST', body: JSON.stringify(payload) })
}

export function reportHuella(id, reason) {
  return request(`/api/huellas/${encodeURIComponent(id)}/report`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  })
}

/* ---------- Administración (token introducido por la persona admin) ---------- */

export function adminQueue(token) {
  return request('/api/admin/queue', { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
}

export function adminReview(token, id, action) {
  return request(`/api/admin/huellas/${encodeURIComponent(id)}/${action}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
}
