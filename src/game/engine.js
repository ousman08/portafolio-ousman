import { CHAMBERS, ROUTES, ENDINGS } from './story.js'

/**
 * Motor de El Umbral: función pura, sin efectos ni red.
 * El progreso de cada partida vive solo en memoria; lo único que se guarda
 * en el navegador es la lista de finales ya descubiertos (para invitar a
 * volver a jugar) y se puede borrar desde la propia pantalla.
 */

export const initialGame = {
  step: 'intro', // intro | chamber | gate | ending
  route: null, // 'escucha' | 'fuego'
  index: 0, // cámara actual
  phase: 'choice', // choice | riddle | result
  picks: [], // decisiones tomadas (para el resumen final)
  lights: [], // brasas conseguidas
  marks: 0, // respuestas falladas
  last: null, // { correct, answerId }
  finalChoice: null,
}

export function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...initialGame, step: 'chamber', route: action.route, phase: 'choice' }

    case 'PICK': {
      const chamber = currentChamber(state)
      const choice = chamber.choices.find((item) => item.id === action.choiceId)
      if (!choice) return state
      return {
        ...state,
        picks: [...state.picks, { chamber: chamber.id, choiceId: choice.id, response: choice.response }],
        phase: 'riddle',
      }
    }

    case 'ANSWER': {
      const chamber = currentChamber(state)
      const correct = action.answerId === chamber.riddle.correct
      return {
        ...state,
        phase: 'result',
        lights: correct ? [...state.lights, chamber.id] : state.lights,
        marks: state.marks + (correct ? 0 : 1),
        last: { correct, answerId: action.answerId },
      }
    }

    case 'NEXT': {
      const next = state.index + 1
      if (next >= ROUTES[state.route].length) return { ...state, step: 'gate' }
      return { ...state, index: next, phase: 'choice' }
    }

    case 'FINAL':
      return { ...state, finalChoice: action.choiceId, step: 'ending' }

    case 'RESTART':
      return { ...initialGame }

    default:
      return state
  }
}

export function currentChamber(state) {
  return CHAMBERS[ROUTES[state.route][state.index]]
}

export function totalChambers(state) {
  return state.route ? ROUTES[state.route].length : 2
}

const ENDING_BY_CHOICE = {
  herramienta: 'constructor',
  pregunta: 'pregunta',
  huella: 'testigo',
}

export function endingFor(state) {
  if (state.lights.length === 0) return ENDINGS['umbral-vacio']
  if (state.lights.length < 2) return ENDINGS['el-que-vuelve']
  return ENDINGS[ENDING_BY_CHOICE[state.finalChoice]] ?? ENDINGS['el-que-vuelve']
}

/* ---------- Finales descubiertos (solo en este navegador) ---------- */

const STORAGE_KEY = 'ousman.umbral.finales.v1'

export function readDiscovered() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function addDiscovered(id) {
  try {
    const current = new Set(readDiscovered())
    current.add(id)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current]))
    return [...current]
  } catch {
    return readDiscovered()
  }
}

export function clearDiscovered() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* Sin localStorage (modo privado): no es crítico, se ignora. */
  }
}
