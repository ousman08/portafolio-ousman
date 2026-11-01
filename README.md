# Portafolio — Ousman Krubally

Página personal de una sola ruta para presentar proyectos reales, el stack en uso y una vía de
contacto directa. Negro puro, tipografía Inter auto-hospedada y ocre como único acento.

**Estado:** sitio estático listo para desplegar, sin backend, sin cookies y sin analítica.

**Repositorio:** https://github.com/ousman08/portafolio-ousman

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** (plugin oficial de Vite)
- JavaScript moderno, sin router
- Inter variable auto-hospedada (`src/assets/fonts/inter-latin.woff2`)
- Despliegue estático en Vercel (`dist/`)

Dependencias de runtime: solo `react` y `react-dom`. Tailwind es dependencia de desarrollo.

## Estructura

```
index.html                 Metadatos, Open Graph, JSON-LD, preload de Inter
vercel.json                Cabeceras de seguridad y caché
public/
  favicon.svg              Emblema del martillo
  og-image.png             Tarjeta social 1200×630
  robots.txt
  404.html                 Página de error estática, sin JavaScript
  img/                     Retrato y capturas de página completa
src/
  App.jsx                  Composición de la página
  main.jsx
  styles/app.css           Tokens, base, botones, skip-link y vista previa
  data/site.js             Datos de contacto, navegación, cifras y servicios
  data/projects.js         Fichas de proyectos y repos de práctica
  data/stack.js            Tecnologías de la fila de logos
  icons/Technologies.jsx   Logos SVG monocromos
  components/              Navbar, tarjeta, panel de cifras, pie, emblema
  sections/                Hero, Projects, About, Contact
```

## Comandos

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # genera dist/
pnpm preview    # sirve dist/ en local
```

Requiere Node ≥ 20.19.

## Editar contenido

- **Textos y contacto:** `src/data/site.js`.
- **Proyectos:** `src/data/projects.js`. Cada ficha incluye problema, solución, decisiones,
  pendientes, enlaces y la captura de vista previa.
- **Tecnologías:** `src/data/stack.js` y el icono correspondiente en `src/icons/Technologies.jsx`.

No hay contenido inventado: las cifras son 2 proyectos publicados, 4 repositorios de práctica y
9 tecnologías. El tercer proyecto es **este portafolio**, porque es real y se puede inspeccionar.

### Capturas de las tarjetas

Las tarjetas muestran una captura de **página completa** que se desliza dentro de un marco 16:10 al
pasar el ratón o al enfocar con el teclado. Al sustituir una captura:

1. Mantén la proporción vertical (las actuales miden 1280 px de ancho).
2. Actualiza `width`, `height` y `pan` en `src/data/projects.js`.
3. Calcula `pan` como `-100 × (1 − 0.625 / (alto / ancho))`. Ejemplo: 1280×4483 → `-82%`.

La vista previa de «Este portafolio» es `public/img/portafolio.webp` y se capturó de esta misma
página a 1280 px de ancho.

### Retrato

`public/img/ousman-avatar.webp` mide **256×256 px**, suficiente para la tarjeta actual pero justo
para pantallas de alta densidad. Para mejorarlo, sustituye el archivo por una original de al menos
1000 px (idealmente 1200×1500, proporción 4:5) y actualiza los atributos `width`/`height` de la
imagen en `src/sections/Hero.jsx`. El CSS ya recorta en 4:5 y aplica blanco y negro con contraste
alto, así que la foto debe estar bien iluminada y centrada.

## Formulario de contacto

No hay servidor: el formulario valida nombre, correo y mensaje en el navegador y abre el cliente de
correo con el texto preparado. Nada se envía ni se guarda. También hay un botón para copiar la
dirección y enlaces directos a correo y GitHub.

## Accesibilidad

- Enlace «Saltar al contenido» funcional con anclas nativas (sin router por hash).
- Menú móvil: solo existe en el DOM cuando está abierto, bloquea el scroll, aísla `main` con
  `inert`, atrapa el foco, cierra con Escape y devuelve el foco al botón.
- Formulario con `label` asociado, `aria-invalid`, errores descritos y foco en el primer campo
  inválido.
- Contraste mínimo de texto ≥ 6:1 sobre negro; foco visible azul; `prefers-reduced-motion`
  desactiva transiciones y el desplazamiento de las capturas.
- Un solo `h1`, jerarquía de encabezados sin saltos, imágenes con `alt` y enlaces externos con
  `noopener noreferrer`.

## Rendimiento

Medido con Chrome headless (DevTools Protocol), sin Lighthouse:

| Escenario | FCP | LCP | CLS |
|---|---|---|---|
| Móvil 390×844 · CPU 4× · 4G | 824 ms | 824 ms | 0 |
| Escritorio 1440×900 | 144 ms | 144 ms | 0 |

Peso inicial aproximado (gzip): HTML 1,1 kB · CSS 7,4 kB · JS 78,1 kB · Inter 48,3 kB · retrato
4 kB. Las capturas de proyectos se cargan en diferido.

## Despliegue en Vercel

1. Importa el repositorio. Vercel detecta Vite; el directorio de salida es `dist`.
2. `vercel.json` aplica CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
   `Permissions-Policy`, HSTS y caché para `assets/` e `img/`.
3. **Al asignar el dominio definitivo**, completa los metadatos que hoy no pueden ser absolutos:
   - `og:image` y `twitter:image` → `https://TU-DOMINIO/og-image.png`
   - añade `og:url` con la URL canónica y un `<link rel="canonical">`
   - añade `Sitemap:` en `public/robots.txt` y crea `public/sitemap.xml`
4. Si editas el bloque JSON-LD inline de `index.html`, **recalcula el hash de la CSP**:

```bash
node -e "const fs=require('fs'),c=require('crypto');const m=fs.readFileSync('index.html','utf8').match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);console.log('sha256-'+c.createHash('sha256').update(m[1]).digest('base64'))"
```

Sustituye el valor `sha256-…` de `script-src` en `vercel.json`. El sitio no está desplegado en
`portafolio-ousman.vercel.app` (responde 404), por eso no se declara canonical ni `og:url` todavía.

## Verificación realizada

- `pnpm build` sin errores ni avisos.
- `pnpm audit --prod`: sin vulnerabilidades conocidas.
- Sin desbordamiento horizontal entre 360 y 1440 px.
- Las 9 URLs externas (webs y repositorios) responden 200.
- Formulario vacío: 3 errores visibles, `aria-invalid` y foco en el primer campo.
- Menú móvil cerrado: 0 enlaces en el DOM; abierto: foco atrapado; Escape devuelve el foco.
- Capturas y retrato cargan con sus dimensiones reales.
