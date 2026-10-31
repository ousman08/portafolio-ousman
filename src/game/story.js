/**
 * EL UMBRAL — historia original.
 *
 * Todo el texto y los enigmas son propios. La partida es 100 % local:
 * no hay peticiones de red ni servicios externos.
 *
 * Estructura:
 *  - INTRO: entrada y elección de ruta (escuchar / golpear).
 *  - CHAMBERS: dos cámaras (memoria y fuego), en orden distinto según la ruta.
 *  - GATE: decisión final.
 *  - ENDINGS: cinco desenlaces posibles.
 */

export const INTRO = {
  eyebrow: 'Experiencia interactiva',
  title: 'El Umbral',
  subtitle: 'Una historia breve sobre lo que se construye y lo que se deja atrás.',
  paragraphs: [
    'Hay una puerta al final de la calle que no aparece en los mapas. No tiene pomo: tiene un yunque diminuto incrustado a la altura de la mano.',
    'Al tocarlo, la noche se vuelve más nítida. Al otro lado, una mujer de espaldas aviva tres brasas. No se gira.',
    '—Has llegado tarde —dice—. O temprano. Aquí es lo mismo. Esta puerta solo se abre para quien trae algo que reparar.',
  ],
  question: '¿Cómo cruzas?',
  choices: [
    {
      id: 'escucha',
      label: 'Escuchar el rumor que atraviesa la pared',
      hint: 'Entras sin hacer ruido. Empiezas por la memoria.',
      route: 'escucha',
    },
    {
      id: 'fuego',
      label: 'Golpear el yunque, una sola vez',
      hint: 'El eco responde antes que tú. Empiezas por la forja.',
      route: 'fuego',
    },
  ],
}

export const CHAMBERS = {
  memoria: {
    id: 'memoria',
    name: 'El archivo de voces',
    accent: 'gold',
    glyph: '◆',
    eyebrow: 'Cámara de la memoria',
    scene:
      'La cámara huele a papel y a polvo de carbón. Estanterías sin fondo guardan objetos que no conoces: una cuchara quemada, un cuaderno con las páginas en blanco, una llave sin puerta. La mujer habla desde detrás de ti: —Todo lo que se construye deja una voz. Antes de seguir, decide cuál quieres escuchar.',
    choiceLabel: 'Elige un objeto y escúchalo',
    choices: [
      {
        id: 'cuaderno',
        label: 'El cuaderno en blanco',
        response:
          'Pasas las páginas. Están vacías, pero el papel conserva la presión de una escritura que ya no está. —Eso también es memoria —dice ella.',
      },
      {
        id: 'cuchara',
        label: 'La cuchara quemada',
        response:
          'El metal está curvado por el calor. Alguien cocinó tantas veces con ella que el mango tiene la forma de una mano. —Eso también es oficio.',
      },
      {
        id: 'llave',
        label: 'La llave sin puerta',
        response:
          'La llave no abre ninguna casa que exista. Aun así, la guardas un momento. —Eso también es esperanza —dice ella, sin ironía.',
      },
    ],
    riddle: {
      prompt:
        'Guardo lo que ya no está y solo existo mientras alguien me recuerda. Cuanto más me nombro, más me gasto. ¿Qué soy?',
      options: [
        { id: 'piedra', label: 'La piedra' },
        { id: 'memoria', label: 'La memoria' },
        { id: 'nombre', label: 'El nombre' },
      ],
      correct: 'memoria',
      success:
        'La mujer asiente. Una brasa dorada se desprende del aire y se posa en tu muñeca: no pesa, pero se nota.',
      failure:
        'El objeto sigue en la estantería. La mujer no se enfada: solo anota algo en un cuaderno. Una marca gris aparece en tu mano.',
    },
  },

  fuego: {
    id: 'fuego',
    name: 'La forja',
    accent: 'red',
    glyph: '▲',
    eyebrow: 'Cámara del fuego',
    scene:
      'La cámara es un horno abierto en mitad de la noche. El calor no quema: pesa. En el yunque hay una pieza de metal a medio hacer. La mujer la señala con la barbilla: —El hierro no obedece a la prisa. Si golpeas antes de tiempo, lo rompes; si esperas demasiado, se enfría. Toda decisión tiene su temperatura.',
    choiceLabel: '¿Qué haces ante el yunque?',
    choices: [
      {
        id: 'avivar',
        label: 'Avivar la braza',
        response:
          'El fuego crece de golpe y la sombra de la mujer se estira hasta la pared del fondo. Ella no parpadea. —La prisa también enseña, aunque cobra intereses.',
      },
      {
        id: 'esperar',
        label: 'Esperar en silencio',
        response:
          'El metal cambia de color lentamente, del rojo al naranja, del naranja al gris. Cuando por fin hablas, la mujer ya sabe lo que vas a decir. —Has entendido lo importante: no todo se puede forzar.',
      },
    ],
    riddle: {
      prompt:
        'Nazco del roce, me apaga el miedo y me alimenta la prisa. Si me ignoras, me apago; si me guardas, me consumo. ¿Qué soy?',
      options: [
        { id: 'hierro', label: 'El hierro' },
        { id: 'paciencia', label: 'La paciencia' },
        { id: 'fuego', label: 'El fuego' },
      ],
      correct: 'fuego',
      success:
        'Una brasa roja salta del yunque y se queda suspendida junto a tu hombro. La mujer sonríe apenas: —Eso es. Ni luz ni calor: las dos cosas a la vez.',
      failure:
        'El metal se enfría antes de que decidas. La mujer retira la pieza con unas pinzas y la deja a un lado. Otra marca, esta vez roja, se dibuja en tu palma.',
    },
  },
}

export const GATE = {
  eyebrow: 'La tercera cámara',
  title: 'La puerta del umbral',
  scene:
    'La última cámara no tiene paredes: es un descanso de luz azul, como el interior de una pregunta largamente pensada. La mujer se gira por fin. Tiene la mirada cansada de quien ha visto entrar a mucha gente.',
  line: '—Toda puerta cobra un peaje. No pido oro. Dime qué dejas de ti al otro lado.',
  choices: [
    { id: 'herramienta', label: 'Una herramienta para quien venga después.' },
    { id: 'pregunta', label: 'Una pregunta que aún no tiene respuesta.' },
    { id: 'huella', label: 'Una huella con mi nombre, para que alguien sepa que pasé.' },
  ],
}

export const ENDINGS = {
  constructor: {
    id: 'constructor',
    title: 'El constructor',
    label: 'Final 1 de 5',
    accent: 'gold',
    text: 'La mujer te entrega un martillo pequeño y oxidado. No es un premio: es una tarea. Al cruzar, la puerta no se cierra del todo; queda entornada, como una herramienta apoyada en la pared.',
    reflection: 'Construir no es demostrar lo que sabes, sino dejar algo que funcione sin ti.',
  },
  pregunta: {
    id: 'pregunta',
    title: 'El que pregunta',
    label: 'Final 2 de 5',
    accent: 'blue',
    text: 'No obtienes respuesta, pero la puerta se abre igual. Al otro lado amanece, y una frase te sigue los pasos: las preguntas honestas no se contestan, se habitan. La mujer se queda mirando el yunque, como si esperara tu próxima visita.',
    reflection: 'Sostener una pregunta abierta también es una forma de disciplina.',
  },
  testigo: {
    id: 'testigo',
    title: 'El testigo',
    label: 'Final 3 de 5',
    accent: 'red',
    text: 'Dejas tu nombre en la pared, junto a otros cientos de nombres que no conoces. La mujer sonríe por primera vez: —Ahora alguien sabrá que este lugar existe. Caminas hacia la luz con la sensación de haber formado parte, durante un rato, de algo más grande que tú.',
    reflection: 'Ser recordado importa menos que haber sido útil a alguien.',
  },
  'el-que-vuelve': {
    id: 'el-que-vuelve',
    title: 'El que vuelve',
    label: 'Final 4 de 5',
    accent: 'gold',
    text: 'Sales con una sola brasa y alguna marca. La puerta se cierra sin ruido. No ha sido un fracaso: has visto el mecanismo por dentro.',
    reflection: 'Volver no es fracasar; es aceptar que la primera respuesta no bastaba.',
  },
  'umbral-vacio': {
    id: 'umbral-vacio',
    title: 'El umbral vacío',
    label: 'Final 5 de 5',
    accent: 'blue',
    text: 'No has encendido nada. La puerta sigue ahí, indiferente, esperando. La mujer no te despide: solo señala la calle con la barbilla. Mientras caminas, entiendes que el umbral no era una prueba, sino un espejo.',
    reflection: 'A veces el primer paso es reconocer que todavía no hay nada encendido.',
  },
}

/** Rutas: el orden de las cámaras cambia según cómo se cruza la puerta. */
export const ROUTES = {
  escucha: ['memoria', 'fuego'],
  fuego: ['fuego', 'memoria'],
}

export const ROUTE_CLOSING = {
  escucha: 'Entraste escuchando. Ese detalle cambia el tono de todo lo que vino después.',
  fuego: 'Entraste golpeando. El eco de tu golpe todavía te acompaña.',
}

export const TOTAL_ENDINGS = Object.keys(ENDINGS).length
