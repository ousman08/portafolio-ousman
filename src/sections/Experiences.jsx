import { Link } from '../router.jsx'

/**
 * Puertas: acceso a las experiencias del sitio.
 * Cada tarjeta enlaza a contenido que existe (juego, archivo, mapa, normas).
 */
const DOORS = [
  {
    to: '/umbral',
    number: '01',
    title: 'El Umbral',
    meta: 'Juego narrativo · 5 minutos',
    text: 'Cruza una puerta que no está en los mapas. Dos enigmas, dos rutas y cinco finales.',
    accent: 'blue',
  },
  {
    to: '/huellas',
    number: '02',
    title: 'Huellas',
    meta: 'Archivo colectivo',
    text: 'Lecciones, preguntas y pequeñas victorias. Lo que alguien aprende puede servirle a otra persona.',
    accent: 'gold',
  },
  {
    to: '/mapa',
    number: '03',
    title: 'Mapa de ideas',
    meta: 'Visualización',
    text: 'Las huellas como puntos de luz conectados a su categoría. Sin datos personales, solo ideas.',
    accent: 'blue',
  },
  {
    to: '/conocimiento',
    number: '04',
    title: 'Conocimiento',
    meta: 'Libros y notas',
    text: 'Lecturas, cuaderno de reflexiones y un criterio editorial claro sobre citas y referencias.',
    accent: 'red',
  },
]

export default function Experiences() {
  return (
    <section id="experiencias" className="section experiences" aria-labelledby="experiencias-title">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="label">04 — Más allá del currículum</p>
            <h2 id="experiencias-title" className="section-head__title" style={{ marginTop: '0.8rem' }}>
              Cuatro puertas.
            </h2>
          </div>
          <p className="section-head__intro">
            Un portafolio también puede ser un lugar. Estas cuatro piezas están construidas desde
            cero y funcionan directamente en el navegador, pensadas para explorar sin prisa.
          </p>
        </div>

        <ul className="doors">
          {DOORS.map((door) => (
            <li key={door.to}>
              <Link to={door.to} className={`door door--${door.accent}`}>
                <span className="door__number mono" aria-hidden="true">
                  {door.number}
                </span>
                <span className="door__body">
                  <span className="door__meta">{door.meta}</span>
                  <span className="door__title">{door.title}</span>
                  <span className="door__text">{door.text}</span>
                </span>
                <span className="door__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
