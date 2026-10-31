/**
 * Datos verificables del sitio.
 * Solo información comprobable (GitHub público, webs publicadas, repos
 * locales con remoto verificado). Lo que falta se omite; no se inventa.
 */

export const SITE = {
  name: 'Ousman Krubally',
  role: 'Desarrollador Full Stack',
  email: 'oman7910@gmail.com',
  github: 'https://github.com/ousman08',
  githubHandle: 'github.com/ousman08',
  availability: 'Disponible para trabajar y colaborar',
  // Dato real: el repositorio local de Matta's Kitchen ya está migrado a Next.js 16.
  currently: 'Matta’s Kitchen migrada a Next.js 16, pendiente de desplegar.',
}

export const NAV = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack', label: 'Stack' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
]

/**
 * Cifras del bloque «En Números».
 * Todas se pueden comprobar en esta misma página o en GitHub.
 */
export const STATS = [
  { value: '02', label: 'proyectos publicados' },
  { value: '04', label: 'repositorios de práctica' },
  { value: '09', label: 'tecnologías en uso' },
]

export const SERVICES = [
  {
    title: 'Webs de negocio',
    text: 'Landings, catálogos y pedidos por WhatsApp o correo. Sin pasarelas ni piezas que el negocio no necesita.',
  },
  {
    title: 'Front-end a medida',
    text: 'React, Next.js y Tailwind. Interfaces rápidas, accesibles y fáciles de mantener.',
  },
  {
    title: 'Puesta en marcha',
    text: 'Build, despliegue y ajustes de rendimiento. Del repositorio al dominio, sin prometer de más.',
  },
]

export const PRINCIPLES = [
  {
    title: 'Construir antes que prometer',
    text: 'Prefiero mostrar código y proyectos antes que enumerar capacidades.',
  },
  {
    title: 'Aprender en público',
    text: 'Repositorios abiertos, aunque el resultado todavía sea imperfecto.',
  },
  {
    title: 'Resolver problemas reales',
    text: 'Un catálogo, un carrito, un pedido: cosas que alguien usa de verdad.',
  },
]
