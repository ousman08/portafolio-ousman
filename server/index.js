/**
 * API de Huellas + servidor estático (Node puro, sin dependencias).
 *
 *   node server/index.js
 *
 * Variables de entorno (ver server/.env.example):
 *   PORT, ALLOWED_ORIGINS, ADMIN_TOKEN, DATA_FILE, SITE_URL
 *
 * Medidas implementadas:
 *  - Validación y normalización en servidor (server/validate.js).
 *  - Límites de longitud, frecuencia y tamaño de petición.
 *  - Moderación previa: toda aportación nace "pending" y no se publica
 *    hasta que una persona con el token de administración la aprueba.
 *  - Denuncias: 3 denuncias ocultan la aportación automáticamente ("review").
 *  - La IP nunca se almacena ni se registra: solo se usa un HMAC con una
 *    sal aleatoria en memoria para limitar frecuencia.
 */

import http from 'node:http'
import fs from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { createStore } from './store.js'
import { validateContribution, validateReport, CATEGORY_IDS } from './validate.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/* ---------- .env mínimo (sin dependencias) ---------- */
async function loadEnv(file) {
  try {
    const raw = await fs.readFile(file, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const index = trimmed.indexOf('=')
      if (index === -1) continue
      const key = trimmed.slice(0, index).trim()
      const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, '')
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    /* No hay .env: se usan las variables del entorno. */
  }
}

await loadEnv(path.join(__dirname, '.env'))

const PORT = Number(process.env.PORT || 8787)
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173'
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || `${SITE_URL},http://localhost:5173,http://localhost:4173`)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'huellas.json')
const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const MAX_BODY = 8 * 1024

const store = createStore(DATA_FILE)
await store.init()

/* ---------- Utilidades HTTP ---------- */

function baseHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()')
}

function sendJson(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  })
  res.end(body)
}

function applyCors(req, res) {
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Max-Age', '86400')
    return true
  }
  return false
}

async function readJson(req) {
  const type = req.headers['content-type'] || ''
  if (!type.includes('application/json')) {
    const error = new Error('Envíа el cuerpo como application/json.')
    error.status = 415
    throw error
  }
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BODY) {
      const error = new Error('La petición es demasiado grande.')
      error.status = 413
      throw error
    }
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
  } catch {
    const error = new Error('JSON no válido.')
    error.status = 400
    throw error
  }
}

/* ---------- Límite de frecuencia (en memoria, sin datos personales) ---------- */

const SALT = crypto.randomBytes(32)
const buckets = new Map()

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for']
  const ip = String(forwarded?.split(',')[0] || req.socket.remoteAddress || 'desconocido').trim()
  // HMAC con sal efímera: no permite recuperar la IP ni sobrevive al reinicio.
  return crypto.createHmac('sha256', SALT).update(ip).digest('base64url').slice(0, 18)
}

function hit(key, limit, windowMs) {
  const now = Date.now()
  const times = (buckets.get(key) || []).filter((time) => now - time < windowMs)
  if (times.length >= limit) {
    buckets.set(key, times)
    return { allowed: false, retryAfter: Math.ceil((windowMs - (now - times[0])) / 1000) }
  }
  times.push(now)
  buckets.set(key, times)
  return { allowed: true }
}

setInterval(() => {
  const now = Date.now()
  for (const [key, times] of buckets) {
    if (!times.some((time) => now - time < 60 * 60 * 1000)) buckets.delete(key)
  }
}, 10 * 60 * 1000).unref()

/* ---------- Autenticación de administración ---------- */

function isAdmin(req) {
  if (!ADMIN_TOKEN || ADMIN_TOKEN.length < 24) return false
  const header = req.headers.authorization || ''
  const provided = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!provided) return false
  const a = crypto.createHash('sha256').update(provided).digest()
  const b = crypto.createHash('sha256').update(ADMIN_TOKEN).digest()
  return crypto.timingSafeEqual(a, b)
}

function adminGuard(res) {
  if (!ADMIN_TOKEN || ADMIN_TOKEN.length < 24) {
    sendJson(res, 503, {
      error: 'La administración no está configurada. Define ADMIN_TOKEN (mínimo 24 caracteres) en el servidor.',
    })
    return false
  }
  return true
}

/* ---------- Proyección pública (nunca expone denuncias ni metadatos) ---------- */

const publicItem = (item) => ({
  id: item.id,
  category: item.category,
  text: item.text,
  alias: item.alias ?? null,
  createdAt: item.approvedAt ?? item.createdAt,
})

/* ---------- Rutas ---------- */

async function handleApi(req, res, url) {
  const { pathname, searchParams } = url
  const key = clientKey(req)

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  const global = hit(`api:${key}`, 120, 60_000)
  if (!global.allowed) {
    return sendJson(res, 429, { error: 'Demasiadas peticiones. Espera un momento.' }, { 'Retry-After': String(global.retryAfter) })
  }

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, { ok: true, service: 'huellas', adminConfigured: Boolean(ADMIN_TOKEN && ADMIN_TOKEN.length >= 24) })
  }

  // --- Listado público (solo aprobadas) ---
  if (req.method === 'GET' && pathname === '/api/huellas') {
    const category = searchParams.get('category') || undefined
    const query = searchParams.get('q') || undefined
    if (category && !CATEGORY_IDS.includes(category)) {
      return sendJson(res, 400, { error: 'Categoría no válida.' })
    }
    const items = store.approved({ category, query }).slice(0, 200).map(publicItem)
    return sendJson(res, 200, { items, total: items.length })
  }

  if (req.method === 'GET' && pathname === '/api/huellas/random') {
    const items = store.approved({})
    if (items.length === 0) return sendJson(res, 404, { error: 'Todavía no hay huellas publicadas.' })
    const item = items[crypto.randomInt(items.length)]
    return sendJson(res, 200, { item: publicItem(item) })
  }

  // --- Crear aportación (queda pendiente de moderación) ---
  if (req.method === 'POST' && pathname === '/api/huellas') {
    const burst = hit(`post:${key}`, 1, 45_000)
    if (!burst.allowed) {
      return sendJson(res, 429, { error: `Espera ${burst.retryAfter} s antes de enviar otra huella.` }, { 'Retry-After': String(burst.retryAfter) })
    }
    const window = hit(`post-window:${key}`, 4, 30 * 60_000)
    if (!window.allowed) {
      return sendJson(res, 429, { error: 'Has enviado varias huellas seguidas. Inténtalo más tarde.' })
    }

    const body = await readJson(req)
    const check = validateContribution(body)
    if (!check.ok) return sendJson(res, 422, { error: 'Revisa los campos marcados.', fields: check.errors })

    const item = {
      id: crypto.randomUUID(),
      category: check.value.category,
      text: check.value.text,
      alias: check.value.alias,
      status: 'pending',
      createdAt: new Date().toISOString(),
      reports: [],
    }
    await store.add(item)
    return sendJson(res, 201, {
      ok: true,
      id: item.id,
      message: 'Tu huella queda pendiente de revisión antes de publicarse.',
    })
  }

  // --- Denunciar ---
  const reportMatch = pathname.match(/^\/api\/huellas\/([\w-]+)\/report$/)
  if (req.method === 'POST' && reportMatch) {
    const limit = hit(`report:${key}`, 10, 60 * 60_000)
    if (!limit.allowed) {
      return sendJson(res, 429, { error: 'Demasiadas denuncias seguidas.' })
    }
    const body = await readJson(req)
    const check = validateReport(body)
    if (!check.ok) return sendJson(res, 422, { error: 'Motivo no válido.', fields: check.errors })

    const item = store.find(reportMatch[1])
    if (!item) return sendJson(res, 404, { error: 'La huella no existe.' })

    // Se guarda solo el motivo y un HMAC del denunciante (para evitar duplicados).
    await store.report(item.id, {
      reason: check.value.reason,
      at: new Date().toISOString(),
      reporter: key,
    })
    return sendJson(res, 200, {
      ok: true,
      message: 'Gracias. La denuncia queda registrada y la revisaremos.',
    })
  }

  // --- Administración ---
  if (pathname.startsWith('/api/admin/')) {
    if (!adminGuard(res)) return
    if (!isAdmin(req)) return sendJson(res, 401, { error: 'Token de administración no válido.' })

    if (req.method === 'GET' && pathname === '/api/admin/queue') {
      const pending = store.pending()
      const reported = store.reported().map((item) => ({
        ...publicItem(item),
        status: item.status,
        reports: (item.reports || []).map((r) => ({ reason: r.reason, at: r.at })),
      }))
      return sendJson(res, 200, { pending, reported })
    }

    const actionMatch = pathname.match(/^\/api\/admin\/huellas\/([\w-]+)\/(approve|reject)$/)
    if (req.method === 'POST' && actionMatch) {
      const [, id, action] = actionMatch
      const item = store.find(id)
      if (!item) return sendJson(res, 404, { error: 'No existe.' })
      const patch =
        action === 'approve'
          ? { status: 'approved', approvedAt: new Date().toISOString() }
          : { status: 'rejected', rejectedAt: new Date().toISOString() }
      await store.update(id, patch)
      return sendJson(res, 200, { ok: true, id, status: patch.status })
    }

    return sendJson(res, 404, { error: 'Ruta de administración no encontrada.' })
  }

  return sendJson(res, 404, { error: 'Ruta no encontrada.' })
}

/* ---------- Estáticos (build de Vite) ---------- */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

async function serveStatic(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { error: 'Método no permitido.' })
  }

  let pathname
  try {
    pathname = decodeURIComponent(url.pathname)
  } catch {
    return sendJson(res, 400, { error: 'Ruta no válida.' })
  }

  if (pathname === '/') pathname = '/index.html'
  const resolved = path.resolve(DIST_DIR, `.${pathname}`)

  // Evita salir del directorio del build (path traversal).
  if (!resolved.startsWith(DIST_DIR + path.sep)) {
    return sendJson(res, 403, { error: 'Prohibido.' })
  }

  let filePath = resolved
  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) throw new Error('no es archivo')
  } catch {
    // SPA: cualquier ruta desconocida devuelve la app (el router resuelve el 404).
    filePath = path.join(DIST_DIR, 'index.html')
  }

  const ext = path.extname(filePath).toLowerCase()
  const cache = filePath.includes(`${path.sep}assets${path.sep}`)
    ? 'public, max-age=31536000, immutable'
    : 'no-cache'

  try {
    const stat = await fs.stat(filePath)
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': cache,
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
    })
    if (req.method === 'HEAD') return res.end()
    createReadStream(filePath).pipe(res)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('No encontrado. Ejecuta `pnpm build` para generar la web.')
  }
}

/* ---------- Servidor ---------- */

const server = http.createServer(async (req, res) => {
  baseHeaders(res)
  const corsAllowed = applyCors(req, res)
  if (req.method === 'OPTIONS' && !corsAllowed) {
    res.writeHead(403)
    return res.end()
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  try {
    if (url.pathname.startsWith('/api/')) {
      res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'")
      await handleApi(req, res, url)
    } else {
      await serveStatic(req, res, url)
    }
  } catch (error) {
    // Nunca se expone el stack ni detalles internos al cliente.
    console.error('[huellas]', error.message)
    if (!res.headersSent) {
      sendJson(res, error.status || 500, { error: error.status ? error.message : 'Error interno del servidor.' })
    } else {
      res.end()
    }
  }
})

server.listen(PORT, () => {
  console.log(`Huellas API en http://localhost:${PORT}`)
  console.log(`Orígenes permitidos: ${ALLOWED_ORIGINS.join(', ')}`)
  console.log(ADMIN_TOKEN && ADMIN_TOKEN.length >= 24 ? 'Administración activada.' : 'Administración desactivada (falta ADMIN_TOKEN).')
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
  })
}
