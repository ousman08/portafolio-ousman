/**
 * Marca gráfica: un martillo geométrico dentro de un marco redondeado.
 * Guiño al oficio de construir. Hereda el color del texto, así que sirve
 * en blanco (cabecera), ocre (pie) o negro sobre ocre (favicon).
 */
export default function Emblem({ size = 34, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      style={{ display: 'block', flex: 'none' }}
    >
      <rect x="1" y="1" width="38" height="38" rx="9" stroke="currentColor" strokeOpacity="0.35" />
      <g fill="currentColor" transform="rotate(-38 20 20)">
        <rect x="9.6" y="9.4" width="20.8" height="5.4" rx="1.2" />
        <rect x="18.4" y="14.2" width="3.2" height="16.4" rx="1.6" />
      </g>
    </svg>
  )
}
