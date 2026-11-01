/**
 * Proyectos reales y verificables.
 * Cada dato procede del repositorio local, del remoto de GitHub o de la web
 * publicada. Lo que falta se dice; no se inventa.
 *
 * `preview.src` apunta a una captura de página completa. La tarjeta la desliza
 * dentro de un marco 16:10 al pasar el ratón o al enfocar con el teclado.
 */

export const PROJECTS = [
  {
    id: 'mattas-kitchen',
    name: "Matta's Kitchen",
    year: '2026',
    kind: 'Web de negocio · catálogo y pedidos',
    status: 'Publicada · Next.js pendiente',
    summary:
      'Web para un negocio de catering: catálogo de 12 productos con precios en libras, carrito persistente y cierre de pedido por WhatsApp o correo, sin pasarela de pago.',
    problem:
      'Reunir en una sola página el catálogo, los precios y la forma de pedir de un negocio de cocina, sin construir ni contratar una pasarela de pago.',
    solution:
      'Una aplicación React con el catálogo como única fuente de verdad, carrito en el navegador y un resumen de pedido que se envía por WhatsApp o correo.',
    tech: ['Next.js 16', 'React 19', 'Vite', 'pnpm', 'Vercel'],
    highlights: [
      'Catálogo centralizado en un único archivo de datos: precios y productos se editan sin tocar los componentes.',
      'Carrito con persistencia en localStorage, cálculo de totales y feedback inmediato al añadir, sin librerías de estado.',
      'Pedido conversacional: resumen + WhatsApp o correo, sin integrar medios de pago.',
      'Fuentes auto-hospedadas, imágenes locales y política de privacidad propia.',
      'Migración de Vite + React Router a Next.js App Router completada en el repositorio.',
    ],
    pending: [
      'La URL pública todavía sirve el build de Vite; la versión Next.js está terminada en el repositorio pero pendiente de desplegar.',
      'Algunas fotografías de producto son temporales.',
      'La interfaz está en inglés: la traducción sigue sin decidir.',
    ],
    links: [
      { label: 'Web publicada', href: 'https://mattas-kitchen.vercel.app' },
      { label: 'Código en GitHub', href: 'https://github.com/ousman08/mattas-kitchen' },
    ],
    preview: {
      src: 'img/mattas-kitchen.webp',
      alt: 'Página completa de Matta’s Kitchen: portada, catálogo y política de privacidad.',
      width: 1280,
      height: 2311,
      pan: '-65%',
    },
  },
  {
    id: 'website-cafeteria',
    name: 'Website Cafeteria',
    year: '2026',
    kind: 'Landing estática · HTML, CSS y JavaScript',
    status: 'Publicada',
    summary:
      'Página de cafetería construida sin frameworks: cabecera, banner, categorías y un catálogo de productos con tarjetas.',
    problem:
      'Practicar una web completa de principio a fin —estructura, estilos y comportamiento— sin apoyarse en frameworks.',
    solution:
      'HTML5 semántico, CSS escrito a mano y JavaScript para la interacción, publicado como sitio estático en Vercel.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    highlights: [
      'Cero dependencias: el sitio se sirve como archivos estáticos.',
      'Composición por secciones reutilizables: cabecera, categorías y catálogo.',
      'Publicado con despliegue automático desde GitHub.',
    ],
    pending: [
      'El repositorio no tiene descripción ni licencia publicadas.',
      'El catálogo está en inglés (menú de ejemplo de cafetería).',
    ],
    links: [
      { label: 'Web publicada', href: 'https://website-cafeteria-ten.vercel.app' },
      { label: 'Código en GitHub', href: 'https://github.com/ousman08/WebsiteCafeteria' },
    ],
    preview: {
      src: 'img/website-cafeteria.webp',
      alt: 'Página completa de Website Cafeteria: cabecera, categorías y catálogo.',
      width: 1280,
      height: 2133,
      pan: '-62%',
    },
  },
  {
    id: 'este-portafolio',
    name: 'Este portafolio',
    year: '2026',
    kind: 'Sitio personal · React y Tailwind',
    status: 'En local · lista para desplegar',
    summary:
      'La página que estás viendo: una sola ruta, sin router, sin analítica y sin peticiones a terceros. Todo el peso está en el contenido.',
    problem:
      'Tener un portafolio que cargue rápido, funcione con teclado y no dependa de servicios externos ni de una base de datos.',
    solution:
      'React 19 y Vite generan una página estática; Tailwind aporta el sistema visual. Las anclas son nativas, la tipografía se auto-hospeda y el formulario valida antes de abrir el correo.',
    tech: ['React 19', 'Tailwind CSS 4', 'Vite 7', 'Vercel'],
    highlights: [
      'Sin router: las anclas nativas eliminan el fallo del enlace «saltar al contenido».',
      'Menú móvil con foco atrapado, Escape y bloqueo de scroll; invisible para el teclado cuando está cerrado.',
      'Capturas reales de página completa que se deslizan dentro de cada tarjeta, solo con CSS.',
      'Inter auto-hospedada y cero peticiones a terceros: sin cookies ni analítica.',
    ],
    pending: [
      'Falta asignar el dominio definitivo y completar canonical y Open Graph con URLs absolutas.',
      'La foto del retrato está a 256 px; falta una original en alta resolución.',
    ],
    links: [
      {
        label: 'Código en GitHub',
        href: 'https://github.com/ousman08/portafolio-ousman',
      },
    ],
    preview: {
      src: 'img/portafolio.webp',
      alt: 'Página completa de este portafolio.',
      width: 1280,
      height: 4471,
      pan: '-82%',
    },
  },
]

/** Repositorios de aprendizaje: se muestran aparte, sin inflarlos como producto. */
export const LEARNING_REPOS = [
  {
    name: 'jscamp',
    description: 'Contenido y ejercicios del JSCamp de InfoJobs.',
    tech: 'JavaScript',
    href: 'https://github.com/ousman08/jscamp',
  },
  {
    name: 'git-fazt',
    description: 'Prácticas de maquetación y CSS siguiendo un curso.',
    tech: 'HTML · CSS',
    href: 'https://github.com/ousman08/git-fazt',
  },
  {
    name: 'Laboratorio_ciber',
    description: 'Ejercicios y notas de laboratorio de ciberseguridad y Python.',
    tech: 'Python',
    href: 'https://github.com/ousman08/Laboratorio_ciber',
  },
  {
    name: 'calculadora-divertida',
    description: 'Calculadora pequeña hecha con HTML y JavaScript.',
    tech: 'HTML · JavaScript',
    href: 'https://github.com/ousman08/calculadora-divertida',
  },
]
