/**
 * Datos verificables del sitio.
 * Regla: solo información comprobable (GitHub público, web publicada,
 * repositorios locales con remoto verificado). Lo que falta se marca `null`
 * y la interfaz lo indica como "pendiente" en lugar de inventarlo.
 */

export const SITE = {
  name: 'Ousman Krubally',
  shortName: 'OUSMAN',
  role: 'Desarrollador web',
  stack: ['JavaScript', 'React', 'Node.js'],
  // Fuente: bio pública de github.com/ousman08
  sourceBio: 'https://github.com/ousman08',

  contact: {
    // Correo configurado como identidad git global del autor y usado en sus proyectos.
    email: 'oman7910@gmail.com',
    github: 'https://github.com/ousman08',
    // No se ha localizado un perfil LinkedIn verificable: no se enlaza.
    linkedin: null,
    // No existe un CV de desarrollo verificado: se indica como pendiente.
    resume: null,
  },
}

// La navegación crece por fases a medida que cada sección existe de verdad
// (evita enlaces a contenido que todavía no está construido).
export const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/#sobre-mi', label: 'Sobre mí' },
  { to: '/#proyectos', label: 'Proyectos' },
  { to: '/conocimiento', label: 'Conocimiento' },
  { to: '/huellas', label: 'Huellas' },
  { to: '/umbral', label: 'El Umbral', accent: true },
  { to: '/#contacto', label: 'Contacto' },
]
