/**
 * ARCHIVO DEL CONOCIMIENTO — contenido ampliable.
 *
 * Reglas editoriales:
 *  - Las notas de lectura son reflexión propia sobre ideas públicas del libro.
 *  - Las citas textuales llevan siempre su fuente. Si no hay referencia
 *    verificable, no se publica la cita.
 *  - Los textos religiosos se citan por su referencia (sura:aleyato) y se
 *    distingue traducción, explicación y reflexión. Mientras no haya una
 *    referencia comprobada, no se incluye ninguna cita.
 *
 * Para ampliar el archivo basta con añadir objetos a `BOOKS` o a `NOTES`.
 */

export const BOOKS = [
  {
    id: 'padre-rico-padre-pobre',
    title: 'Padre rico, padre pobre',
    author: 'Robert T. Kiyosaki',
    year: '1997',
    status: 'Leído',
    summary:
      'Un libro que plantea la diferencia entre trabajar por dinero y hacer que el dinero trabaje. Su aportación más citada es la distinción entre activos (lo que pone dinero en tu bolsillo) y pasivos (lo que lo saca).',
    takeaway:
      'Más que una receta financiera, me interesa su idea de fondo: aprender a distinguir lo que construye valor de lo que solo da la sensación de avanzar. Esa pregunta se puede aplicar también al código: ¿esto que acabo de añadir me acerca al producto o solo lo hace parecer más lleno?',
    note: 'Reflexión personal. No es asesoramiento financiero.',
  },
]

/** Lecturas de estudio, sin citas textuales sin verificar. */
export const READINGS = [
  {
    id: 'coran',
    title: 'El Corán',
    kind: 'Lectura y estudio',
    note: 'Lectura recurrente. Cuando se cite un pasaje se indicará la sura y el aleyato, la traducción utilizada y se separará la explicación de mi reflexión personal.',
  },
  {
    id: 'hadices',
    title: 'Colecciones de hadices',
    kind: 'Lectura y estudio',
    note: 'Estudio de colecciones reconocidas. Cada texto que se publique llevará su referencia y su grado de autenticidad según la fuente consultada; no se atribuirán dichos sin verificar.',
  },
]

export const NOTES = [
  {
    id: 'disciplina',
    title: 'Disciplina no es intensidad',
    theme: 'Disciplina',
    excerpt:
      'La intensidad impresiona un día; la disciplina sostiene un año. Programar es un buen recordatorio: nadie escribe un proyecto entero en una tarde, pero casi todo se termina escribiendo una parte cada día.',
    body: [
      'Cuando empecé a aprender a programar confundía el entusiasmo con el progreso. Un fin de semana intenso parecía valer más que cinco tardes cortas. Con el tiempo, lo que de verdad movía los proyectos era lo segundo: volver al archivo, leer lo que había escrito ayer y añadir una pieza pequeña.',
      'La disciplina también incluye descansar y leer. Un problema que no se resuelve en dos horas suele resolverse paseando, o al día siguiente, con otra pregunta en la cabeza.',
    ],
  },
  {
    id: 'herramientas',
    title: 'Herramientas que no estorban',
    theme: 'Oficio',
    excerpt:
      'Una buena herramienta desaparece: la usas y piensas en lo que estás haciendo, no en ella. Un martillo no pide atención; el código que escribimos tampoco debería pedirla.',
    body: [
      'Me interesa construir interfaces que no obliguen a aprender la interfaz. Que el botón esté donde se espera, que el texto se lea sin esfuerzo, que cargar no sea una espera. La tecnología pasa a segundo plano y la persona puede hacer lo que venía a hacer.',
      'Eso exige renunciar a cosas: menos adornos, menos pasos, menos dependencias. Casi siempre el resultado es más pequeño y más rápido, y también más fácil de mantener.',
    ],
  },
  {
    id: 'contribucion',
    title: 'Dejar algo mejor de lo que estaba',
    theme: 'Propósito',
    excerpt:
      'No hace falta cambiar el mundo para dejar una contribución. Basta con que algo funcione mejor después de tu paso: un proyecto, una explicación, una huella para quien venga detrás.',
    body: [
      'Pienso en la gente que comparte lo que sabe sin pedir nada a cambio: foros, documentación, un repositorio con un README claro. Así se aprende a programar hoy. Este archivo intenta devolver una parte de eso.',
    ],
  },
]

/** Política editorial visible en la página (transparencia). */
export const EDITORIAL_POLICY = [
  'Las citas textuales se publican solo con referencia verificable.',
  'Los textos del Corán y de los hadices se citarán con su referencia exacta; la traducción, la explicación y la reflexión personal irán siempre diferenciadas.',
  'Las notas de lectura son interpretación propia, no resúmenes oficiales de las obras.',
  'No se atribuyen frases ni ideas a personas sin fuente comprobable.',
]
