# Portafolio de Ousman Krubally

Página de una sola parte para mostrar mis proyectos y facilitar que me contacten.
Hecha con React y Vite. Sin servidor, sin cookies y sin coste.

- **Web (versión de prueba):** https://portafolio-ousman.vercel.app
- **Código:** https://github.com/ousman08/portafolio-ousman

## Arrancar en tu ordenador

Necesitas Node 20 o más y pnpm.

```bash
pnpm install
pnpm dev      # abre http://localhost:5173
```

Para generar la versión que publica Vercel: `pnpm build` (crea la carpeta `dist/`).

## Dónde cambiar las cosas

| Quieres cambiar... | Archivo |
|---|---|
| Tu correo, teléfono o enlaces | `src/data/site.js` |
| Los proyectos | `src/data/projects.js` |
| Las tecnologías | `src/data/stack.js` |
| Los textos en español o inglés | `src/i18n/es.js` y `src/i18n/en.js` |
| Los colores | `src/styles/app.css` |

## Cómo funciona el contacto

El formulario **no envía nada a un servidor**. Rellena nombre, correo y mensaje, y
se abre una ventana con el texto ya escrito para que tú lo revises y lo envíes:

- **Gmail** en el navegador. No hace falta tener instalado ningún programa de correo.
- **WhatsApp** en el móvil, o **WhatsApp Web** en el ordenador.

También hay botones para copiar el correo y el teléfono.

Correo: oman7910@gmail.com · WhatsApp: +34 632 54 85 07

## Idioma y tema

Hay un selector para español/inglés y otro para tema claro/oscuro. La elección se
guarda en el navegador (`localStorage`). No son cookies.

## Publicación

Vercel publica la web automáticamente cada vez que se sube un cambio a `main`.
La dirección actual es de prueba. Más adelante, con un dominio definitivo, habrá
que poner la imagen y la URL de compartir, y añadir el CV.

Si algún día cambias el bloque JSON-LD de `index.html` o el script del `404.html`,
también hay que actualizar sus huellas (hashes) en `vercel.json`, o el navegador
las bloqueará.
