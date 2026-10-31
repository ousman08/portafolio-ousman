import { useEffect, useReducer, useRef, useState } from 'react'
import { Link } from '../router.jsx'
import {
  initialGame,
  reducer,
  currentChamber,
  totalChambers,
  endingFor,
  readDiscovered,
  addDiscovered,
  clearDiscovered,
} from '../game/engine.js'
import { INTRO, GATE, ROUTE_CLOSING, TOTAL_ENDINGS } from '../game/story.js'
import '../styles/umbral.css'

/**
 * EL UMBRAL — vista del juego.
 * Historia corta con decisiones, dos enigmas, dos rutas y cinco finales.
 * Funciona sin conexión: todo el contenido está en el bundle.
 */
export default function Umbral() {
  const [state, dispatch] = useReducer(reducer, initialGame)
  const [discovered, setDiscovered] = useState(() => readDiscovered())
  const headingRef = useRef(null)

  // Al cambiar de escena, el foco va al título: permite leer y navegar con teclado
  // sin perderse en el cambio de contenido.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [state.step, state.index, state.phase])

  // Registra el final alcanzado (solo en este navegador).
  useEffect(() => {
    if (state.step !== 'ending') return
    const ending = endingFor(state)
    setDiscovered((prev) => {
      if (prev.includes(ending.id)) return prev
      const next = addDiscovered(ending.id)
      return next
    })
  }, [state.step, state.finalChoice, state.lights.length])

  const restart = () => dispatch({ type: 'RESTART' })

  const chamber = state.step === 'chamber' ? currentChamber(state) : null
  const accent =
    state.step === 'ending' ? endingFor(state).accent : chamber?.accent ?? (state.step === 'gate' ? 'blue' : 'gold')

  return (
    <section className="umbral" data-accent={accent} aria-labelledby="umbral-title">
      <div className="shell umbral__inner">
        {state.step === 'intro' ? (
          <Intro headingRef={headingRef} discovered={discovered} onStart={(route) => dispatch({ type: 'START', route })} />
        ) : (
          <>
            <div className="umbral__topbar">
              <span className="label">{state.step === 'ending' ? 'Partida terminada' : 'El Umbral'}</span>
              <div className="umbral__tools">
                {state.step !== 'ending' && (
                  <button type="button" className="umbral__tool" onClick={restart}>
                    Reiniciar partida
                  </button>
                )}
                <Link to="/" className="umbral__tool">
                  Salir
                </Link>
              </div>
            </div>

            <Progress state={state} />

            <div className="umbral__stage">
              <div className="umbral__door" aria-hidden="true" />

              {state.step === 'chamber' && chamber && (
                <Chamber
                  state={state}
                  chamber={chamber}
                  headingRef={headingRef}
                  dispatch={dispatch}
                />
              )}

              {state.step === 'gate' && <Gate state={state} headingRef={headingRef} dispatch={dispatch} />}

              {state.step === 'ending' && (
                <Ending state={state} headingRef={headingRef} discovered={discovered} restart={restart} />
              )}
            </div>

            {chamber && state.phase !== 'result' && (
              <p className="umbral__hint">
                Consejo: puedes recorrer todas las opciones con <kbd>Tab</kbd> y elegir con{' '}
                <kbd>Enter</kbd>.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Intro */

function Intro({ headingRef, discovered, onStart }) {
  return (
    <div className="umbral__intro">
      <p className="label">{INTRO.eyebrow}</p>
      <h1 id="umbral-title" ref={headingRef} tabIndex={-1} className="umbral__title">
        {INTRO.title}
      </h1>
      <p className="umbral__subtitle">{INTRO.subtitle}</p>

      <div className="umbral__intro-text">
        {INTRO.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <p className="label umbral__question">{INTRO.question}</p>
      <div className="umbral__choices">
        {INTRO.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="umbral-choice"
            onClick={() => onStart(choice.route)}
          >
            <span className="umbral-choice__label">{choice.label}</span>
            <span className="umbral-choice__hint">{choice.hint}</span>
          </button>
        ))}
      </div>

      <dl className="umbral__meta">
        <div>
          <dt>Duración</dt>
          <dd>5 minutos</dd>
        </div>
        <div>
          <dt>Finales</dt>
          <dd>
            {discovered.length} de {TOTAL_ENDINGS} descubiertos
          </dd>
        </div>
        <div>
          <dt>Conexión</dt>
          <dd>Ninguna necesaria</dd>
        </div>
      </dl>

      <p className="umbral__hint">
        Contiene dos enigmas originales y decisiones que cambian el recorrido. Puedes repetir la
        partida para descubrir otros desenlaces.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------- Progreso */

function Progress({ state }) {
  const chambers = ['Primera cámara', 'Segunda cámara', 'La puerta']

  const activeIndex = state.step === 'gate' ? 2 : state.step === 'ending' ? 3 : state.index

  return (
    <nav className="umbral__progress" aria-label="Progreso de la partida">
      <ol>
        {chambers.map((label, i) => (
          <li
            key={label + i}
            aria-current={i === activeIndex ? 'step' : undefined}
            data-done={i < activeIndex || state.step === 'ending'}
          >
            <span className="umbral__progress-dot" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ol>
      <p className="umbral__embers" aria-label={`Brasas encendidas: ${state.lights.length} de 2`}>
        <span className="gold" aria-hidden="true">
          {state.lights.includes('memoria') ? '◆' : '◇'}
        </span>
        <span className="red" aria-hidden="true">
          {state.lights.includes('fuego') ? '▲' : '△'}
        </span>
        <span className="blue" aria-hidden="true">
          {state.step === 'ending' ? '●' : '○'}
        </span>
      </p>
    </nav>
  )
}

/* --------------------------------------------------------------- Cámara */

function Chamber({ state, chamber, headingRef, dispatch }) {
  const { phase, last } = state
  const selected = state.picks.find((pick) => pick.chamber === chamber.id)
  const riddle = chamber.riddle
  const ariaLabelId = `${chamber.id}-riddle`

  return (
    <div className="umbral-scene" data-chamber={chamber.id}>
      <p className="label">{chamber.eyebrow}</p>
      <h2 ref={headingRef} tabIndex={-1} className="umbral__heading">
        {chamber.name}
      </h2>

      {phase === 'choice' && (
        <>
          <p className="umbral__text">{chamber.scene}</p>
          <p className="label umbral__question">{chamber.choiceLabel}</p>
          <div className="umbral__choices">
            {chamber.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className="umbral-choice"
                onClick={() => dispatch({ type: 'PICK', choiceId: choice.id })}
              >
                <span className="umbral-choice__label">{choice.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {phase === 'riddle' && (
        <>
          {selected && <p className="umbral__echo">{selected.response}</p>}
          <div className="umbral__riddle" role="group" aria-labelledby={ariaLabelId}>
            <p id={ariaLabelId} className="umbral__riddle-text">
              {riddle.prompt}
            </p>
            <div className="umbral__choices">
              {riddle.options.map((option, i) => (
                <button
                  key={option.id}
                  type="button"
                  className="umbral-choice umbral-choice--option"
                  onClick={() => dispatch({ type: 'ANSWER', answerId: option.id })}
                >
                  <span className="umbral-choice__key" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="umbral-choice__label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {phase === 'result' && last && (
        <div className="umbral__result" role="status" aria-live="polite">
          <p className={`umbral__result-badge ${last.correct ? 'is-correct' : 'is-wrong'}`}>
            {last.correct ? 'Has encendido una brasa' : 'Has dejado una marca'}
          </p>
          <p className="umbral__text">{last.correct ? riddle.success : riddle.failure}</p>
          <button
            type="button"
            className="btn btn--gold"
            onClick={() => dispatch({ type: 'NEXT' })}
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- Puerta */

function Gate({ state, headingRef, dispatch }) {
  return (
    <div className="umbral-scene" data-chamber="pregunta">
      <p className="label">{GATE.eyebrow}</p>
      <h2 ref={headingRef} tabIndex={-1} className="umbral__heading">
        {GATE.title}
      </h2>
      <p className="umbral__text">{GATE.scene}</p>
      <p className="umbral__quote">{GATE.line}</p>
      <div className="umbral__choices">
        {GATE.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="umbral-choice"
            onClick={() => dispatch({ type: 'FINAL', choiceId: choice.id })}
          >
            <span className="umbral-choice__label">{choice.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Final */

function Ending({ state, headingRef, discovered, restart }) {
  const ending = endingFor(state)
  const routeNote = ROUTE_CLOSING[state.route]

  return (
    <div className="umbral-scene umbral-scene--ending">
      <p className="label">{ending.label}</p>
      <h2 ref={headingRef} tabIndex={-1} className="umbral__heading umbral__heading--ending">
        {ending.title}
      </h2>
      <p className="umbral__text">{ending.text}</p>
      <blockquote className="umbral__reflection">{ending.reflection}</blockquote>

      <dl className="umbral__summary">
        <div>
          <dt>Brasas</dt>
          <dd>{state.lights.length} de 2</dd>
        </div>
        <div>
          <dt>Marcas</dt>
          <dd>{state.marks}</dd>
        </div>
        <div>
          <dt>Entrada</dt>
          <dd>{state.route === 'escucha' ? 'Escuchando' : 'Golpeando'}</dd>
        </div>
        <div>
          <dt>Finales vistos</dt>
          <dd>
            {discovered.length} de {TOTAL_ENDINGS}
          </dd>
        </div>
      </dl>

      <p className="umbral__hint">{routeNote}</p>

      {state.picks.length > 0 && (
        <details className="umbral__log">
          <summary>Tu recorrido, paso a paso</summary>
          <ol>
            {state.picks.map((pick) => (
              <li key={pick.chamber + pick.choiceId}>
                <span className="mono muted">
                  {pick.chamber === 'memoria' ? 'Archivo' : 'Forja'}
                </span>{' '}
                {pick.response}
              </li>
            ))}
          </ol>
        </details>
      )}

      <div className="umbral__choices umbral__choices--row">
        <button type="button" className="btn btn--gold" onClick={restart}>
          Volver a entrar
        </button>
        <Link to="/huellas" className="btn btn--blue">
          Dejar una huella
        </Link>
        <Link to="/" className="btn btn--outline">
          Volver al portafolio
        </Link>
      </div>

      <p className="umbral__hint">
        Los finales descubiertos se guardan solo en este navegador.{' '}
        <button
          type="button"
          className="umbral__tool"
          onClick={() => {
            clearDiscovered()
            window.location.reload()
          }}
        >
          Borrar progreso local
        </button>
      </p>
    </div>
  )
}
