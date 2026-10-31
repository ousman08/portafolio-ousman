/**
 * Reglas de validación de Huellas, compartidas por navegador y servidor.
 * El servidor SIEMPRE vuelve a validar: nunca se confía en el cliente.
 * El texto se guarda como texto plano; React lo pinta como nodo de texto
 * (nunca innerHTML), así que no puede ejecutarse HTML/JS.
 */

import { CATEGORIES, CATEGORY_IDS, REPORT_REASONS } from '../data/categories.js'

export { CATEGORIES, CATEGORY_IDS, REPORT_REASONS }

const REPORT_REASON_IDS = REPORT_REASONS.map((reason) => reason.id)

const TEXT_MIN = 12
const TEXT_MAX = 420
const ALIAS_MAX = 24

const countChars = (text) => [...text].length

/** Normaliza sin destruir el contenido: NFC, sin controles raros, espacios limpios. */
export function normalizeText(raw) {
  return String(raw)
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const BLOCKED_PATTERNS = [
  /<\s*script/i,
  /<\s*iframe/i,
  /javascript\s*:/i,
  /on\w+\s*=\s*["']/i,
  /data:text\/html/i,
]

/** Devuelve { ok, errors: {campo: mensaje} | null, value }. */
export function validateContribution(body) {
  const errors = {}
  const text = typeof body?.text === 'string' ? normalizeText(body.text) : ''
  const aliasRaw = typeof body?.alias === 'string' ? normalizeText(body.alias) : ''
  const category = typeof body?.category === 'string' ? body.category.trim() : ''

  const length = countChars(text)
  if (length < TEXT_MIN) errors.text = `Escribe al menos ${TEXT_MIN} caracteres.`
  if (length > TEXT_MAX) errors.text = `Máximo ${TEXT_MAX} caracteres.`
  if (BLOCKED_PATTERNS.some((re) => re.test(text))) {
    errors.text = 'El texto contiene código o etiquetas no permitidas.'
  }
  if ((text.match(/https?:\/\//gi) || []).length > 1) {
    errors.text = 'Solo se permite un enlace por aportación.'
  }
  if (/(.)\1{7,}/u.test(text)) {
    errors.text = 'Hay demasiados caracteres repetidos.'
  }
  if (countChars(text.replace(/\s/g, '')) < 6) {
    errors.text = 'El texto no tiene contenido suficiente.'
  }

  if (!CATEGORY_IDS.includes(category)) {
    errors.category = 'Elige una categoría válida.'
  }

  let alias = null
  if (aliasRaw) {
    if (countChars(aliasRaw) < 2) errors.alias = 'El seudónimo debe tener al menos 2 caracteres.'
    if (countChars(aliasRaw) > ALIAS_MAX) errors.alias = `Máximo ${ALIAS_MAX} caracteres.`
    if (!/^[\p{L}\p{N} ._-]+$/u.test(aliasRaw)) {
      errors.alias = 'El seudónimo solo admite letras, números, espacios, puntos, guiones y guion bajo.'
    }
    alias = aliasRaw
  }

  if (body?.accepted !== true) {
    errors.accepted = 'Debes aceptar las reglas antes de enviar.'
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    errors: null,
    value: { text, alias, category },
  }
}

export function validateReport(body) {
  const reason = typeof body?.reason === 'string' ? body.reason.trim() : ''
  if (!REPORT_REASON_IDS.includes(reason)) {
    return { ok: false, errors: { reason: 'Motivo de denuncia no válido.' } }
  }
  return { ok: true, errors: null, value: { reason } }
}
