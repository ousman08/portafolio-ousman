import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Almacén JSON con escritura atómica.
 * Suficiente para un volumen pequeño y sin dependencias externas.
 * Si el proyecto crece, esta interfaz se puede sustituir por SQLite/Postgres
 * sin tocar las rutas HTTP.
 */
export function createStore(file) {
  let data = { version: 1, items: [] }
  let writing = Promise.resolve()

  async function load() {
    try {
      const raw = await fs.readFile(file, 'utf8')
      const parsed = JSON.parse(raw)
      if (!parsed || !Array.isArray(parsed.items)) throw new Error('Formato inesperado')
      data = parsed
    } catch (error) {
      if (error.code !== 'ENOENT') {
        // Un archivo corrupto no debe tumbar el servidor: se conserva copia y se empieza vacío.
        const backup = `${file}.corrupt-${Date.now()}`
        try {
          await fs.rename(file, backup)
        } catch {
          /* sin permisos: se ignora */
        }
      }
      data = { version: 1, items: [] }
    }
  }

  function persist() {
    writing = writing
      .then(async () => {
        await fs.mkdir(path.dirname(file), { recursive: true })
        const tmp = `${file}.tmp`
        await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8')
        await fs.rename(tmp, file)
      })
      .catch((error) => {
        console.error('[huellas] no se pudo guardar:', error.message)
      })
    return writing
  }

  return {
    async init() {
      await load()
    },

    approved({ category, query } = {}) {
      const q = query?.toLocaleLowerCase('es').trim()
      return data.items
        .filter((item) => item.status === 'approved')
        .filter((item) => (category ? item.category === category : true))
        .filter((item) =>
          q ? `${item.text} ${item.alias ?? ''}`.toLocaleLowerCase('es').includes(q) : true
        )
        .sort((a, b) => new Date(b.approvedAt ?? b.createdAt) - new Date(a.approvedAt ?? a.createdAt))
    },

    find(id) {
      return data.items.find((item) => item.id === id) ?? null
    },

    async add(item) {
      data.items.push(item)
      await persist()
      return item
    },

    async update(id, patch) {
      const item = this.find(id)
      if (!item) return null
      Object.assign(item, patch)
      await persist()
      return item
    },

    async report(id, report) {
      const item = this.find(id)
      if (!item) return null
      item.reports = Array.isArray(item.reports) ? item.reports : []
      // Una misma persona (HMAC efímero) cuenta una sola vez por huella:
      // así nadie puede ocultar una aportación denunciándola tres veces.
      if (report.reporter && item.reports.some((entry) => entry.reporter === report.reporter)) {
        return item
      }
      item.reports.push(report)
      // Ocultado automático preventivo: nunca se publica sin revisión humana.
      if (item.reports.length >= 3 && item.status === 'approved') {
        item.status = 'review'
        item.autoHiddenAt = new Date().toISOString()
      }
      await persist()
      return item
    },

    pending() {
      return data.items
        .filter((item) => item.status === 'pending')
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    },

    reported() {
      return data.items
        .filter((item) => Array.isArray(item.reports) && item.reports.length > 0)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
  }
}
