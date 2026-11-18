import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/LanguageProvider.jsx'

const EMPTY_FORM = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// El mensaje viaja dentro de la URL de WhatsApp: un texto sin límite puede
// hacer que el enlace supere lo que aceptan el navegador o la app.
const MESSAGE_MAX = 500

/**
 * Valida en el navegador. El correo es obligatorio para la vía email y
 * opcional para WhatsApp (si se escribe, tiene que ser válido).
 */
function validate(values, ui, { requireEmail = true } = {}) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = ui.errorName
  }

  const email = values.email.trim()
  if (requireEmail || email.length > 0) {
    if (!EMAIL_PATTERN.test(email)) {
      errors.email = ui.errorEmail
    }
  }

  if (values.message.trim().length < 10) {
    errors.message = ui.errorMessage
  }

  return errors
}

/**
 * Contacto sin backend: valida en el navegador y prepara un mensaje real.
 * El correo abre el cliente de correo y WhatsApp usa un deep link wa.me.
 * Nada se envía a un servidor ni se guarda.
 */
export default function Contact() {
  const { lang, site, ui } = useI18n()
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedNumber, setCopiedNumber] = useState(false)
  const copyTimer = useRef(null)
  const numberTimer = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(copyTimer.current)
      clearTimeout(numberTimer.current)
    },
    [],
  )

  // Los mensajes ya mostrados no deben quedarse en el idioma anterior.
  useEffect(() => {
    setErrors({})
    setStatus('')
    setCopied(false)
    setCopiedNumber(false)
  }, [lang])

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

  function focusFirstError(nextErrors) {
    const firstError = Object.keys(nextErrors)[0]
    if (!firstError) return false
    document.getElementById(`contacto-${firstError}`)?.focus()
    setStatus(ui.statusReview)
    return true
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values, ui)
    setErrors(nextErrors)

    if (focusFirstError(nextErrors)) return

    const subject = ui.mailSubject(values.name.trim())
    const body = [
      `${ui.mailName} ${values.name.trim()}`,
      `${ui.mailEmail} ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n')

    // Gmail en el navegador: funciona sin tener un programa de correo instalado.
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      site.email,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setStatus(ui.statusOpening)
    window.open(gmail, '_blank', 'noopener,noreferrer')
  }

  /** Preparar el mismo mensaje en WhatsApp: sin backend, solo un deep link. */
  function openWhatsapp(web = false) {
    const email = values.email.trim()
    const nextErrors = validate(values, ui, { requireEmail: false })
    setErrors(nextErrors)

    if (focusFirstError(nextErrors)) return

    const text = ui.whatsappMessage(values.name.trim(), email, values.message.trim())
    // En ordenador, el enlace directo a la web evita que se intente abrir la app.
    const url = web
      ? `https://web.whatsapp.com/send?phone=${site.whatsapp.number}&text=${encodeURIComponent(text)}`
      : `${site.whatsapp.href}?text=${encodeURIComponent(text)}`

    setStatus(ui.statusWhatsapp)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      setCopied(false)
      setStatus(ui.statusCopyFailed(site.email))
      return
    }

    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 2500)
  }

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(site.whatsapp.display)
      setCopiedNumber(true)
    } catch {
      setCopiedNumber(false)
      setStatus(ui.statusCopyNumberFailed(site.whatsapp.display))
      return
    }

    clearTimeout(numberTimer.current)
    numberTimer.current = setTimeout(() => setCopiedNumber(false), 2500)
  }

  const fieldClass =
    'w-full rounded-lg border border-line bg-fg/[0.02] px-4 py-3 text-sm text-fg placeholder:text-faint transition-colors focus:border-ochre/70 focus:outline-none'

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="border-t border-line py-20 md:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p className="label">{ui.contactLabel}</p>
          <h2
            id="contacto-title"
            className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-fg md:text-5xl"
          >
            {ui.contactTitleBefore}
            <br />
            {ui.contactTitleAfter}
          </h2>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
            {ui.contactIntro}
          </p>

          <p className="mt-6 flex items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]"
            />
            {site.availability}
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-faint">
              {ui.directContact}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block break-all text-lg font-medium text-fg transition-colors hover:text-ochre"
            >
              {site.email}
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 block text-sm font-medium tabular-nums text-soft transition-colors hover:text-ochre"
            >
              {site.whatsapp.display}
            </a>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-soft transition-colors hover:border-ochre/60 hover:text-ochre"
              >
                {ui.openWhatsapp}
                <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="min-h-11 rounded-full border border-line px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-soft transition-colors hover:border-ochre/60 hover:text-ochre"
              >
                {copied ? ui.copiedEmail : ui.copyEmail}
              </button>
              <button
                type="button"
                onClick={copyNumber}
                className="min-h-11 rounded-full border border-line px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-soft transition-colors hover:border-ochre/60 hover:text-ochre"
              >
                {copiedNumber ? ui.copiedNumber : ui.copyNumber}
              </button>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-faint transition-colors hover:text-fg sm:justify-start"
              >
                {site.githubHandle} ↗
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
                {ui.formName}
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
                placeholder={ui.namePlaceholder}
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
                {ui.formEmail}
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
                placeholder={ui.emailPlaceholder}
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
                {ui.formMessage}
              </label>
              <textarea
                id="contacto-message"
                name="message"
                rows="5"
                maxLength={MESSAGE_MAX}
                value={values.message}
                onChange={handleChange}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'contacto-message-error' : undefined}
                className={`${fieldClass} resize-y`}
                placeholder={ui.messagePlaceholder}
              />
              {errors.message && (
                <p id="contacto-message-error" className="mt-2 text-xs text-red-300">
                  {errors.message}
                </p>
              )}
              {!errors.message && MESSAGE_MAX - values.message.length <= 120 && (
                <p className="mt-2 font-mono text-[0.62rem] tracking-[0.12em] text-faint">
                  {ui.charsLeft(MESSAGE_MAX - values.message.length)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="submit" className="btn btn-primary w-full">
              {ui.prepareEmail}
            </button>
            <button type="button" onClick={() => openWhatsapp()} className="btn btn-outline w-full">
              {ui.sendWhatsapp}
            </button>
            <button
              type="button"
              onClick={() => openWhatsapp(true)}
              className="w-full font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ochre sm:col-span-2"
            >
              {ui.whatsappWeb}
            </button>
          </div>

          <p className="mt-4 text-center text-[0.66rem] leading-relaxed text-faint">
            {ui.formNote}
          </p>

          <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-ochre">
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}
