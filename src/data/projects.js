/**
 * Proyectos reales y verificables.
 * Cada dato de esta lista procede del repositorio local, del remoto de GitHub
 * o de la web publicada; nada es inventado. Los estados "pendiente" reflejan
 * lo que todavía no está hecho y se muestran con transparencia.
 */

export const PROJECTS = [
  {
    id: 'mattas-kitchen',
    name: "Matta's Kitchen",
    featured: true,
    year: '2026',
    kind: 'Web de negocio · catering y pedidos',
    status: 'Publicada · migración en curso',
    summary:
      'Web para un negocio de catering: catálogo de 12 productos con precios en libras, carrito persistente y cierre de pedido por WhatsApp o correo, sin pasarela de pago.',
    problem:
      'Reunir en una sola página el catálogo, los precios y la forma de pedir de un negocio de cocina, sin construir ni contratar una pasarela de pago.',
    solution:
      'Una aplicación React con catálogo como única fuente de verdad, carrito en el navegador y un resumen de pedido que se envía por WhatsApp o correo.',
    tech: ['Next.js 16 (App Router)', 'React 19', 'Vite', 'pnpm', 'Vercel'],
    // Fuente de estos datos: el repositorio ~/mattas-kitchen del autor
    // (package.json, AGENTS.md y MEMORY.md), no una suposición.
    highlights: [
      'Catálogo centralizado en un único archivo de datos: precios y productos se editan sin tocar los componentes.',
      'Carrito con persistencia en localStorage, cálculo de totales y feedback inmediato al añadir (sin librerías de estado).',
      'Pedido conversacional: resumen + WhatsApp/correo, sin integrar medios de pago.',
      'Fuentes auto-hospedadas, imágenes locales y política de privacidad propia.',
      'Migración del proyecto de Vite + React Router a Next.js App Router completada en el repositorio.',
    ],
    pending: [
      'La URL pública todavía sirve el build de Vite; la versión Next.js está terminada en el repositorio pero pendiente de desplegar.',
      'Algunas fotografías de producto son temporales y están marcadas para sustituirse por fotos reales.',
      'La interfaz está en inglés: la traducción sigue sin decidir.',
    ],
    links: [
      { label: 'Web publicada', href: 'https://mattas-kitchen.vercel.app', external: true },
      { label: 'Código en GitHub', href: 'https://github.com/ousman08/mattas-kitchen', external: true },
    ],
    images: [
      {
        src: 'img/mattas-kitchen-hero.webp',
        alt: 'Captura del catálogo de Matta’s Kitchen en la web publicada',
        width: 1000,
        height: 625,
      },
      {
        src: 'img/mattas-kitchen-mobile.webp',
        alt: 'Vista móvil de Matta’s Kitchen',
        width: 340,
        height: 1221,
        variant: 'phone',
      },
    ],
  },
  {
    id: 'website-cafeteria',
    name: 'Website Cafeteria',
    year: '2026',
    kind: 'Landing estática · HTML, CSS y JavaScript',
    status: 'Publicado',
    summary:
      'Página de cafetería construida sin frameworks: cabecera, banner, categorías y un catálogo de productos con tarjetas.',
    problem:
      'Practicar una web completa de principio a fin —estructura, estilos y comportamiento— sin apoyarse en frameworks.',
    solution:
      'HTML5 semántico, CSS a mano y JavaScript para la interacción, publicado como sitio estático en Vercel.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    highlights: [
      'Cero dependencias: el sitio se sirve como archivos estáticos.',
      'Composición por secciones reutilizables (cabecera, categorías, catálogo).',
      'Publicado con despliegue automático desde GitHub.',
    ],
    pending: [
      'El repositorio no tiene descripción ni licencia publicadas.',
      'El catálogo está en inglés (menú de ejemplo de cafetería).',
    ],
    links: [
      { label: 'Web publicada', href: 'https://website-cafeteria-ten.vercel.app', external: true },
      { label: 'Código en GitHub', href: 'https://github.com/ousman08/WebsiteCafeteria', external: true },
    ],
    images: [
      {
        src: 'img/website-cafeteria-hero.webp',
        alt: 'Captura de la página Website Cafeteria',
        width: 1000,
        height: 625,
      },
    ],
  },
]

/**
 * Repositorios de aprendizaje: se muestran aparte, sin inflarlos como
 * proyectos de producto. Todos son públicos y verificables.
 */
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
