/**
 * Logos de tecnología en SVG, monocromos (heredan `currentColor`).
 * Trazos simplificados y reconocibles; el nombre textual va siempre al lado,
 * por eso los iconos son decorativos para lectores de pantalla.
 */

const base = {
  viewBox: '0 0 24 24',
  width: 22,
  height: 22,
  'aria-hidden': 'true',
  focusable: 'false',
  style: { display: 'block', flex: 'none' },
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Icon({ children }) {
  return <svg {...base}>{children}</svg>
}

const ICONS = {
  react: (
    <Icon>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <g {...stroke}>
        <ellipse cx="12" cy="12" rx="9.4" ry="3.7" />
        <ellipse cx="12" cy="12" rx="9.4" ry="3.7" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.4" ry="3.7" transform="rotate(120 12 12)" />
      </g>
    </Icon>
  ),

  next: (
    <Icon>
      <circle cx="12" cy="12" r="10" {...stroke} strokeWidth="1.1" />
      <path d="M8.4 16V8l7.2 8V8" {...stroke} strokeWidth="1.4" />
    </Icon>
  ),

  node: (
    <Icon>
      <path d="M12 2.2 20.5 7v10L12 21.8 3.5 17V7Z" {...stroke} strokeWidth="1.1" />
      <path d="M9 15.2V9.4l6 5.8V9.4" {...stroke} strokeWidth="1.25" />
    </Icon>
  ),

  javascript: (
    <Icon>
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="2.2" {...stroke} strokeWidth="1.1" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="8.2"
        fontWeight="700"
        fill="currentColor"
      >
        JS
      </text>
    </Icon>
  ),

  tailwind: (
    <Icon>
      <path
        d="M3 9.6c1.5-3.1 3.6-4.7 6.2-4.7 3.9 0 4.4 3 6.9 3.5 1.7.4 3.2-.2 4.4-1.9-1.5 3.1-3.6 4.7-6.2 4.7-3.9 0-4.4-3-6.9-3.5C5.7 7.3 4.2 7.9 3 9.6Z"
        fill="currentColor"
      />
      <path
        d="M3 16.1c1.5-3.1 3.6-4.7 6.2-4.7 3.9 0 4.4 3 6.9 3.5 1.7.4 3.2-.2 4.4-1.9-1.5 3.1-3.6 4.7-6.2 4.7-3.9 0-4.4-3-6.9-3.5-1.7-.4-3.2.2-4.4 1.9Z"
        fill="currentColor"
      />
    </Icon>
  ),

  html: (
    <Icon>
      <path d="M4 3h16l-1.5 16.2L12 21.2l-6.5-2Z" {...stroke} strokeWidth="1.1" />
      <text
        x="12"
        y="15.6"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="7.6"
        fontWeight="700"
        fill="currentColor"
      >
        5
      </text>
    </Icon>
  ),

  css: (
    <Icon>
      <path d="M4 3h16l-1.5 16.2L12 21.2l-6.5-2Z" {...stroke} strokeWidth="1.1" />
      <text
        x="12"
        y="15.6"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="7.6"
        fontWeight="700"
        fill="currentColor"
      >
        3
      </text>
    </Icon>
  ),

  git: (
    <Icon>
      <path d="M12 2.6 21.4 12 12 21.4 2.6 12Z" {...stroke} strokeWidth="1.1" />
      <path d="M12 6.4v11.2" {...stroke} strokeWidth="1.2" />
      <circle cx="12" cy="5.8" r="1.7" fill="currentColor" />
      <circle cx="12" cy="18.2" r="1.7" fill="currentColor" />
      <path d="m12 11.6 4.4-4.2" {...stroke} strokeWidth="1.2" />
      <circle cx="17" cy="6.9" r="1.6" fill="currentColor" />
    </Icon>
  ),

  vercel: (
    <Icon>
      <path d="M12 3.4 22 20.6H2Z" fill="currentColor" />
    </Icon>
  ),
}

export default function TechnologyIcon({ id }) {
  return ICONS[id] ?? null
}
