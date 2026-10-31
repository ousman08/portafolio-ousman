import { BOOKS, READINGS, NOTES, EDITORIAL_POLICY } from '../data/knowledge.js'
import { Link } from '../router.jsx'
import '../styles/knowledge.css'

/**
 * ARCHIVO DEL CONOCIMIENTO.
 * Todo el contenido vive en src/data/knowledge.js para poder ampliarlo sin
 * tocar el diseño. Las citas sin referencia verificable no se publican.
 */
export default function Conocimiento() {
  return (
    <section className="section knowledge" aria-labelledby="conocimiento-title">
      <div className="shell">
        <header className="knowledge__header">
          <div>
            <p className="label">Archivo del conocimiento</p>
            <h1 id="conocimiento-title" className="knowledge__title">
              Lo que queda
              <br />
              después de leer.
            </h1>
          </div>
          <p className="knowledge__intro">
            Libros, notas y reflexiones que merecen conservarse. Un archivo pequeño y honesto: cada
            idea indica de dónde viene y qué parte es interpretación propia.
          </p>
        </header>

        <div className="knowledge__layout">
          <aside className="knowledge__toc" aria-label="Índice del archivo">
            <p className="label label--dim">Índice</p>
            <ol>
              <li>
                <a href="#estanteria">01 · Estantería</a>
              </li>
              <li>
                <a href="#cuaderno">02 · Cuaderno</a>
              </li>
              <li>
                <a href="#politica">03 · Criterio editorial</a>
              </li>
            </ol>
            <p className="small muted">
              También puedes dejar una idea en <Link to="/huellas">Huellas</Link> o recorrer el{' '}
              <Link to="/mapa">mapa de ideas</Link>.
            </p>
          </aside>

          <div className="knowledge__content">
            <section id="estanteria" aria-labelledby="estanteria-title">
              <h2 id="estanteria-title" className="knowledge__section-title">
                01 · Estantería
              </h2>

              {BOOKS.map((book) => (
                <article key={book.id} className="book">
                  <div className="book__spine" aria-hidden="true">
                    <span>{book.status}</span>
                  </div>
                  <div className="book__body">
                    <p className="label">
                      {book.year} · {book.status}
                    </p>
                    <h3 className="book__title">{book.title}</h3>
                    <p className="book__author">{book.author}</p>
                    <p>{book.summary}</p>
                    <blockquote className="book__takeaway">{book.takeaway}</blockquote>
                    <p className="mono muted book__note">{book.note}</p>
                  </div>
                </article>
              ))}

              <div className="readings">
                <h3 className="readings__title">Lectura y estudio</h3>
                <ul>
                  {READINGS.map((reading) => (
                    <li key={reading.id}>
                      <div>
                        <p className="readings__name">{reading.title}</p>
                        <p className="label label--dim">{reading.kind}</p>
                      </div>
                      <p className="small muted">{reading.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="cuaderno" aria-labelledby="cuaderno-title">
              <h2 id="cuaderno-title" className="knowledge__section-title">
                02 · Cuaderno
              </h2>

              <div className="notes">
                {NOTES.map((note, index) => (
                  <article key={note.id} className="note">
                    <p className="label">
                      {String(index + 1).padStart(2, '0')} · {note.theme}
                    </p>
                    <h3 className="note__title">{note.title}</h3>
                    <p className="note__excerpt">{note.excerpt}</p>
                    <details className="note__more">
                      <summary>Leer la nota completa</summary>
                      <div className="note__body">
                        {note.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            </section>

            <section id="politica" aria-labelledby="politica-title">
              <h2 id="politica-title" className="knowledge__section-title">
                03 · Criterio editorial
              </h2>
              <ul className="policy">
                {EDITORIAL_POLICY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="small muted">
                Si encuentras un error de atribución o una referencia incompleta, escríbeme y lo
                corrijo.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
