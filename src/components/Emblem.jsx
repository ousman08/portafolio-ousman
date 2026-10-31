/**
 * Marca gráfica: martillo geométrico.
 * Es el emblema de identidad del portafolio (guiño al oficio de construir).
 * Se usa en cabecera, portada y pie. `size` controla las dimensiones.
 */
export default function Emblem({ size = 34, spark = true, title = 'Emblema de Ousman Krubally' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      focusable="false"
      style={{ display: 'block', flex: 'none' }}
    >
      <rect x="1" y="1" width="62" height="62" rx="13" fill="#0b0b10" stroke="rgba(201,162,75,.45)" />
      {/* Mango */}
      <path d="M30.5 30.5 45 45" stroke="#c9a24b" strokeWidth="4.5" strokeLinecap="round" />
      {/* Cabeza del martillo */}
      <path d="M17 20h21v9H17z" fill="#c9a24b" />
      <path d="M38 17.5v14" stroke="#e8cd8b" strokeWidth="4" strokeLinecap="round" />
      {spark && <circle cx="46.5" cy="47.5" r="3.2" fill="#e0243a" />}
    </svg>
  )
}
