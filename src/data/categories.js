/**
 * Fuente única de categorías y motivos de denuncia.
 * La importan tanto la interfaz (src/) como el servidor (server/validate.js),
 * para que nunca se desincronicen.
 */

export const CATEGORIES = [
  { id: 'leccion', label: 'Lección aprendida', short: 'Lección' },
  { id: 'consejo', label: 'Consejo', short: 'Consejo' },
  { id: 'frase', label: 'Frase original', short: 'Frase' },
  { id: 'reflexion', label: 'Reflexión', short: 'Reflexión' },
  { id: 'pregunta', label: 'Pregunta', short: 'Pregunta' },
  { id: 'libro', label: 'Aprendizaje de un libro', short: 'Libro' },
  { id: 'victoria', label: 'Pequeña victoria', short: 'Victoria' },
]

export const CATEGORY_IDS = CATEGORIES.map((category) => category.id)

export const categoryLabel = (id) =>
  CATEGORIES.find((category) => category.id === id)?.label ?? 'Sin categoría'

export const REPORT_REASONS = [
  { id: 'spam', label: 'Spam o publicidad' },
  { id: 'ofensivo', label: 'Lenguaje ofensivo' },
  { id: 'datos-personales', label: 'Datos personales de terceros' },
  { id: 'otro', label: 'Otro motivo' },
]
