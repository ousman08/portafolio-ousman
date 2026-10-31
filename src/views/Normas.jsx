import { Link } from '../router.jsx'
import { SITE } from '../data/site.js'
import '../styles/huellas.css'

/**
 * Reglas de uso y privacidad de Huellas.
 * Texto claro y sin promesas imposibles: el anonimato no es absoluto y toda
 * aportación pasa por revisión manual antes de publicarse.
 */
export default function Normas() {
  return (
    <section className="section normas" aria-labelledby="normas-title">
      <div className="shell normas__inner">
        <p className="label">Huellas · Normas</p>
        <h1 id="normas-title" className="normas__title">
          Reglas de uso y privacidad
        </h1>
        <p className="lede">
          Huellas es un espacio pequeño para compartir lo aprendido. Para que siga siendo útil, hay
          unas reglas mínimas y una explicación honesta de qué datos se guardan.
        </p>

        <h2>Qué se puede compartir</h2>
        <ul>
          <li>Lecciones aprendidas, consejos, frases originales, reflexiones y preguntas.</li>
          <li>Aprendizajes de libros (con tus palabras; no copies textos con derechos de autor).</li>
          <li>Pequeñas victorias personales, sin datos que te identifiquen.</li>
        </ul>

        <h2>Qué no está permitido</h2>
        <ul>
          <li>Insultos, acoso, discurso de odio o contenido ilegal.</li>
          <li>Datos personales de terceros (nombres completos, teléfonos, direcciones, correos).</li>
          <li>Spam, publicidad, enlaces comerciales o más de un enlace por aportación.</li>
          <li>Suplantar a otra persona o usar un seudónimo que induzca a confusión.</li>
          <li>Texto generado en masa sin aportar nada (se elimina sin aviso).</li>
        </ul>

        <h2>Moderación</h2>
        <p>
          Ninguna aportación se publica automáticamente. Cada envío queda en estado{' '}
          <strong>pendiente</strong> y una persona lo revisa antes de hacerlo público. Cualquier
          visitante puede denunciar una huella publicada; tres denuncias la ocultan de forma
          preventiva mientras se revisa. La moderación puede rechazar o retirar contenido sin
          explicación pública, especialmente si incumple estas reglas.
        </p>

        <h2>Qué datos se guardan</h2>
        <ul>
          <li>El texto de la aportación y la categoría que elijas.</li>
          <li>El seudónimo, si decides escribir uno. Es opcional.</li>
          <li>La fecha de envío y de publicación, y el estado de moderación.</li>
          <li>El motivo de las denuncias recibidas (para poder revisarlas).</li>
        </ul>
        <p>
          <strong>No se crean cuentas</strong> y no se piden correo ni nombre. La dirección IP no se
          almacena ni se escribe en registros: solo se usa un resumen criptográfico temporal, con una
          sal que cambia al reiniciar el servidor, para evitar envíos masivos.
        </p>

        <h2>Sobre el anonimato</h2>
        <p>
          Publicar sin cuenta reduce tus datos al mínimo, pero <strong>el anonimato no es absoluto</strong>:
          el contenido que escribas puede identificarte por lo que cuentas. No incluyas información
          personal tuya ni de otras personas. Cualquier enlace que añadas es visible para todo el mundo.
        </p>

        <h2>Conservación y retirada</h2>
        <p>
          Las aportaciones aprobadas permanecen publicadas hasta que se retiran. Si quieres retirar
          una tuya (o solicitar la retirada de un dato personal), escribe a{' '}
          <a className="link" href={`mailto:${SITE.contact.email}`}>
            {SITE.contact.email}
          </a>{' '}
          indicando el texto exacto. Se eliminará lo antes posible.
        </p>

        <h2>Base legal y responsable</h2>
        <p>
          El tratamiento se basa en tu consentimiento al enviar la aportación (art. 6.1.a RGPD) y en
          el interés legítimo de proteger el servicio frente a abusos. Responsable: {SITE.name}. Este
          texto es una base razonable para un proyecto personal; si el sitio crece, conviene
          revisarlo con asesoramiento legal.
        </p>

        <h2>Cookies y almacenamiento local</h2>
        <p>
          Este sitio no usa cookies de seguimiento ni analítica de terceros. El navegador guarda
          únicamente tus favoritos, los finales descubiertos de El Umbral y, en modo demostración,
          las aportaciones que escribas. Puedes borrarlos desde tu navegador en cualquier momento.
        </p>

        <div className="normas__actions">
          <Link to="/huellas" className="btn btn--gold">
            Volver a Huellas
          </Link>
          <Link to="/" className="btn btn--outline">
            Ir al portafolio
          </Link>
        </div>
      </div>
    </section>
  )
}
