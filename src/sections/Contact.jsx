import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data/site.js'

const EMPTY_FORM = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Escribe tu nombre (mínimo 2 caracteres).'
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Cuéntame algo más: al menos 10 caracteres.'
  }

  return errors
}

/**
 * Contacto sin backend: valida en el navegador y prepara un correo real.
 * Nada se envía a un servidor ni se guarda.
 */
export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    setStatus('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      document.getElementById(`contacto-${firstError}`)?.focus()
      setStatus('Revisa los campos marcados antes de continuar.')
      return
    }

    const subject = `Contacto desde el portafolio — ${values.name.trim()}`
    const body = [
      `Nombre: ${values.name.trim()}`,
      `Correo: ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n')

    setStatus('Abriendo tu cliente de correo con el mensaje preparado…')
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
    } catch {
      setCopied(false)
      setStatus(`No se pudo copiar. El correo es ${SITE.email}.`)
      return
    }

    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 2500)
  }

  const fieldClass =
    'w-full rounded-lg border border-line bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-faint transition-colors focus:border-ochre/70 focus:outline-none'

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="border-t border-line py-20 md:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p className="label">04 — Contacto</p>
          <h2
            id="contacto-title"
            className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl"
          >
            ¿Construimos
            <br />
            algo?
          </h2>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Si tienes un negocio que necesita una web, un proyecto que encarrilar o una vacante
            junior donde encaje, escríbeme. Leo todo y contesto.
          </p>

          <p className="mt-6 flex items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]"
            />
            {SITE.availability}
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-[#050505] p-5">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-faint">
              Correo directo
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 block break-all text-lg font-medium text-white transition-colors hover:text-ochre"
            >
              {SITE.email}
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="min-h-11 rounded-full border border-line px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-neutral-300 transition-colors hover:border-ochre/60 hover:text-ochre"
              >
                {copied ? 'Copiado ✓' : 'Copiar correo'}
              </button>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-faint transition-colors hover:text-white"
              >
                {SITE.githubHandle} ↗
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line p-6 md:p-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="contacto-name"
                className="mb-2 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted"
              >
                Nombre
              </label>
              <input
                id="contacto-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'contacto-name-error' : undefined}
                className={fieldClass}
                placeholder="Tu nombre"
              />
              {errors.name && (
                <p id="contacto-name-error" className="mt-2 text-xs text-red-300">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contacto-email"
                className="mb-2 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted"
              >
                Correo
              </label>
              <input
                id="contacto-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'contacto-email-error' : undefined}
                className={fieldClass}
                placeholder="nombre@dominio.com"
              />
              {errors.email && (
                <p id="contacto-email-error" className="mt-2 text-xs text-red-300">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contacto-message"
                className="mb-2 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted"
              >
                Mensaje
              </label>
              <textarea
                id="contacto-message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'contacto-message-error' : undefined}
                className={`${fieldClass} resize-y`}
                placeholder="Qué necesitas, para cuándo y con qué presupuesto cuentas."
              />
              {errors.message && (
                <p id="contacto-message-error" className="mt-2 text-xs text-red-300">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-6 w-full">
            Preparar correo
          </button>

          <p className="mt-4 text-center text-[0.66rem] leading-relaxed text-faint">
            Este formulario no envía datos a ningún servidor: abre tu cliente de correo con el
            mensaje listo para revisar.
          </p>

          <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-ochre">
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}
