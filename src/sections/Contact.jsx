import { useState } from 'react'
import { SITE } from '../data/site.js'

/**
 * Contacto.
 * El formulario NO envía datos a ningún servidor: valida los campos y abre
 * el cliente de correo con el mensaje preparado. Es funcional y transparente;
 * si más adelante se conecta un servicio de correo (SMTP), se sustituye el
 * manejador `handleSubmit` por la llamada al endpoint.
 */
export default function Contact() {
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: 'Oportunidad laboral', message: '' })

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()

    const body = `Nombre: ${form.name}\nCorreo: ${form.email}\n\n${form.message}`
    const mailto = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
      `[Portafolio] ${form.subject}`
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setStatus({
      type: 'ok',
      text: 'He preparado el mensaje en tu aplicación de correo. Pulsa «Enviar» allí para que me llegue.',
    })
  }

  return (
    <section id="contacto" className="section contact" aria-labelledby="contacto-title">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="label">03 — Contacto</p>
            <h2 id="contacto-title" className="section-head__title" style={{ marginTop: '0.8rem' }}>
              Abrir una puerta.
            </h2>
          </div>
          <p className="section-head__intro">
            Si buscas a alguien para un equipo, o necesitas una web que funcione de verdad, escríbeme.
            Respondo personalmente.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__ctas">
            <a
              className="contact__cta"
              href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent('[Portafolio] Oportunidad laboral')}`}
            >
              <span className="label">Para empresas</span>
              <h3>Contratar a un desarrollador</h3>
              <p className="muted small">
                Búsqueda de empleo, prácticas o proyectos en equipo. Cuéntame el puesto y el stack.
              </p>
              <span className="contact__cta-link">Escribir sobre empleo →</span>
            </a>

            <a
              className="contact__cta"
              href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent('[Portafolio] Proyecto web')}`}
            >
              <span className="label label--red">Para clientes</span>
              <h3>Construir una web</h3>
              <p className="muted small">
                Páginas de negocio, catálogos y aplicaciones pequeñas. Sin prometer lo que no puedo
                entregar.
              </p>
              <span className="contact__cta-link">Contar mi proyecto →</span>
            </a>

            <ul className="contact__list">
              <li>
                <span className="label label--dim">Correo</span>
                <a className="link" href={`mailto:${SITE.contact.email}`}>
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <span className="label label--dim">GitHub</span>
                <a className="link link--external" href={SITE.contact.github} target="_blank" rel="noreferrer noopener">
                  github.com/ousman08
                </a>
              </li>
              <li>
                <span className="label label--dim">LinkedIn</span>
                <span className="muted small">
                  Pendiente de publicar un perfil verificado. No se enlaza nada provisional.
                </span>
              </li>
              <li>
                <span className="label label--dim">Currículum</span>
                <span className="muted small">
                  Todavía no existe un CV de desarrollo en PDF. Puedo enviarlo por correo cuando esté
                  listo.
                </span>
              </li>
            </ul>
          </div>

          <div className="contact__form-wrap">
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <p className="label">Mensaje directo</p>

              <div className="field">
                <label htmlFor="cf-name">Nombre</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength="80"
                  value={form.name}
                  onChange={update('name')}
                />
              </div>

              <div className="field">
                <label htmlFor="cf-email">Tu correo</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength="120"
                  value={form.email}
                  onChange={update('email')}
                />
              </div>

              <div className="field">
                <label htmlFor="cf-subject">Motivo</label>
                <select id="cf-subject" name="subject" value={form.subject} onChange={update('subject')}>
                  <option>Oportunidad laboral</option>
                  <option>Proyecto web</option>
                  <option>Colaboración</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="cf-message">Mensaje</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows="5"
                  required
                  maxLength="2000"
                  value={form.message}
                  onChange={update('message')}
                />
              </div>

              <button type="submit" className="btn btn--gold">
                Preparar correo
              </button>

              <p className="form-note">
                El formulario no guarda datos en este sitio: abre tu aplicación de correo con el
                mensaje ya escrito. Nada se envía hasta que lo envíes tú.
              </p>

              {status && (
                <p className="form-status" role="status" aria-live="polite">
                  {status.text}
                </p>
              )}

              <p className="small muted">
                Prefiero el correo directo a cualquier formulario opaco. También puedes escribirme a{' '}
                <a className="link" href={`mailto:${SITE.contact.email}`}>
                  {SITE.contact.email}
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
