/**
 * Diccionario español — idioma por defecto.
 *
 * El contenido verificable sigue viviendo en `src/data/` y se reutiliza
 * aquí: así no hay dos copias del mismo texto. `ui` reúne las cadenas que
 * antes estaban repartidas por los componentes.
 */

import { NAV, PRINCIPLES, SERVICES, SITE, STATS } from '../data/site.js'
import { LEARNING_REPOS, PROJECTS } from '../data/projects.js'

export const es = {
  lang: 'es',

  meta: {
    title: 'Ousman Krubally — Desarrollador Full Stack',
    description:
      'Portafolio de Ousman Krubally, desarrollador full stack. Proyectos reales con React, Next.js y Node.js: catálogos, carritos y webs de negocio.',
    shortDescription:
      'Proyectos reales con React, Next.js y Node.js. Sin humo: problema, solución y lo que falta.',
    ogLocale: 'es_ES',
  },

  ui: {
    skipToContent: 'Saltar al contenido',

    // Navegación
    mainNavAria: 'Navegación principal',
    mobileNavAria: 'Navegación móvil',
    menuDialogAria: 'Menú de navegación',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    languageLabel: 'Idioma',
    talk: 'Hablemos',

    // Portada
    heroLabel: 'Portafolio · 2026',
    heroRoleBefore: 'Desarrollador',
    heroRoleHighlight: 'Full Stack',
    heroIntro:
      'Construyo webs de negocio y productos que la gente usa de verdad: catálogos, carritos y pedidos. React, Next.js y Node.js, con el detalle puesto en el rendimiento y la accesibilidad.',
    seeProjects: 'Ver proyectos',
    portrait: 'Retrato',
    portfolioRoman: 'Portafolio · MMXXVI',
    portraitAlt: 'Retrato en blanco y negro de Ousman Krubally',

    // Herramientas
    tools: 'Herramientas',

    // Proyectos
    projectsLabel: '01 — Proyectos',
    projectsTitleBefore: 'Trabajo real,',
    projectsTitleAfter: 'no maquetas.',
    projectsIntro:
      'Tres piezas reales. Cada ficha cuenta el problema, la solución y lo que todavía falta, sin adornos.',
    practiceTitle: 'Repositorios de práctica',
    practiceNote: 'Ejercicios y cursos. No son productos, pero están abiertos.',
    fullPage: 'Página completa',
    technologies: 'Tecnologías',
    openCase: 'Ver caso técnico',
    closeCase: 'Cerrar caso técnico',
    caseAria: (name) => `Caso técnico de ${name}`,
    problem: 'Problema',
    solution: 'Solución',
    decisions: 'Decisiones',
    pending: 'Pendiente',

    // Sobre mí
    aboutLabel: '02 — Sobre mí',
    aboutTitle: 'Aprender construyendo.',
    aboutLead:
      'Soy Ousman Krubally. Programo, leo y escribo. Me interesa el punto exacto en el que una idea se convierte en algo que otra persona puede usar.',
    aboutBodyOne:
      'Trabajo con JavaScript, React y Node.js. Me formo de manera continua —cursos, ejercicios y proyectos propios publicados en GitHub— y vuelvo sobre lo que hago hasta entender por qué funciona. Cuando algo falla, lo investigo; cuando funciona, también.',
    aboutBodyTwo:
      'Acabo de migrar Matta’s Kitchen a Next.js 16; falta desplegar esa versión. Mientras, sigo cuidando este portafolio: rendimiento, accesibilidad y código que se pueda leer. Antes de prometer algo, prefiero enseñarlo funcionando.',
    servicesLabel: '03 — Servicios',
    servicesTitle: 'Lo que puedo construir contigo.',
    servicesIntro:
      'Alcance claro, sin piezas de más. Si algo no lo sé hacer todavía, lo digo antes de empezar.',
    githubProfile: 'Perfil de GitHub ↗',
    numbersTitle: 'En números',
    now: 'Ahora',

    // Contacto
    contactLabel: '04 — Contacto',
    contactTitleBefore: '¿Construimos',
    contactTitleAfter: 'algo?',
    contactIntro:
      'Si tienes un negocio que necesita una web, un proyecto que encarrilar o una vacante junior donde encaje, escríbeme. Leo todo y contesto.',
    directEmail: 'Correo directo',
    copyEmail: 'Copiar correo',
    copiedEmail: 'Copiado ✓',
    formName: 'Nombre',
    formEmail: 'Correo',
    formMessage: 'Mensaje',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'nombre@dominio.com',
    messagePlaceholder: 'Qué necesitas, para cuándo y con qué presupuesto cuentas.',
    prepareEmail: 'Preparar correo',
    formNote:
      'Este formulario no envía datos a ningún servidor: abre tu cliente de correo con el mensaje listo para revisar.',
    errorName: 'Escribe tu nombre (mínimo 2 caracteres).',
    errorEmail: 'Escribe un correo válido, por ejemplo nombre@dominio.com.',
    errorMessage: 'Cuéntame algo más: al menos 10 caracteres.',
    statusReview: 'Revisa los campos marcados antes de continuar.',
    statusOpening: 'Abriendo tu cliente de correo con el mensaje preparado…',
    statusCopyFailed: (email) => `No se pudo copiar. El correo es ${email}.`,
    mailSubject: (name) => `Contacto desde el portafolio — ${name}`,
    mailName: 'Nombre:',
    mailEmail: 'Correo:',

    // Pie
    footerNavAria: 'Enlaces del pie',
    footerEmail: 'Correo',
    backToTop: 'Volver arriba ↑',
    footerNote: (year) => `© ${year} · Sin cookies ni analítica`,
  },

  site: SITE,
  nav: NAV,
  stats: STATS,
  services: SERVICES,
  principles: PRINCIPLES,
  projects: PROJECTS,
  learningRepos: LEARNING_REPOS,
}
