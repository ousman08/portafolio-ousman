# Portafolio de Ousman Krubally

Portafolio personal de **Ousman Krubally**, desarrollador web (JavaScript, React, Node.js).
Identidad visual oscura con dorado, rojo y azul, y un emblema de martillo hecho en SVG.

Además del currículum, el sitio incluye tres piezas construidas desde cero:

- **El Umbral** — juego narrativo con dos rutas, enigmas y cinco finales.
- **Huellas** — archivo colectivo de aportaciones con moderación previa y backend propio.
- **Conocimiento y mapa de ideas** — archivo de lecturas/notas y visualización de las huellas.

---

## 1. Requisitos

- **Node.js 20 o superior** (probado con Node 24).
- **pnpm 11** (el proyecto usa `pnpm`; hay `pnpm-lock.yaml`).

```bash
node --version
pnpm --version
```

## 2. Puesta en marcha

```bash
pnpm install          # instala React, Vite y el plugin de React
pnpm dev              # servidor de desarrollo en http://localhost:5173
```

Compilar y servir el resultado:

```bash
pnpm build            # genera dist/
pnpm preview          # sirve dist/ en http://localhost:4173
```

> `pnpm-workspace.yaml` autoriza explícitamente el único script de instalación que
> necesita el proyecto (`esbuild`, el binario que usa Vite). Es un ajuste de pnpm 11,
> no una dependencia adicional.

## 3. Backend de Huellas (opcional pero recomendado)

El sitio funciona **sin backend**: en ese caso Huellas arranca en *modo demostración
local* (datos de ejemplo etiquetados y envíos guardados solo en el navegador). Para
publicar aportaciones de verdad hace falta el servidor incluido.

```bash
cp server/.env.example server/.env     # ajusta ADMIN_TOKEN y los orígenes
pnpm server                            # API + build estático en http://localhost:8787
pnpm server:dev                        # igual, con recarga automática (node --watch)
```

Para que el cliente converse con la API, define `VITE_API_URL` **en tiempo de
compilación**:

```bash
cp .env.example .env
# .env →  VITE_API_URL=http://localhost:8787
pnpm build
pnpm server
```

El servidor sirve `dist/` y la API en el mismo puerto, así que con esta configuración
basta con abrir `http://localhost:8787`.

### Variables de entorno

| Archivo          | Variable          | Para qué sirve                                                        |
| ---------------- | ----------------- | --------------------------------------------------------------------- |
| `.env`           | `VITE_API_URL`    | URL del backend. Vacía = modo demostración.                           |
| `server/.env`    | `PORT`            | Puerto del servidor (por defecto `8787`).                             |
| `server/.env`    | `SITE_URL`        | Origen por defecto si no defines `ALLOWED_ORIGINS`.                   |
| `server/.env`    | `ALLOWED_ORIGINS` | Orígenes permitidos por CORS, separados por comas (sin barra final).  |
| `server/.env`    | `ADMIN_TOKEN`     | Token de moderación, mínimo 24 caracteres. Sin él, `/api/admin/*` da 503. |
| `server/.env`    | `DATA_FILE`       | Ruta del JSON de datos (por defecto `server/data/huellas.json`).       |

`server/.env` y `server/data/` están en `.gitignore`: **no se suben al repositorio**.

### API

| Método | Ruta                                   | Quién      | Qué hace                                    |
| ------ | -------------------------------------- | ---------- | ------------------------------------------- |
| GET    | `/api/health`                          | público    | Estado del servicio.                        |
| GET    | `/api/huellas?category=&q=`            | público    | Huellas aprobadas (máx. 200).               |
| GET    | `/api/huellas/random`                  | público    | Una huella aprobada al azar.                |
| POST   | `/api/huellas`                         | público    | Envía una huella. Nace **pendiente**.       |
| POST   | `/api/huellas/:id/report`              | público    | Denuncia con motivo.                        |
| GET    | `/api/admin/queue`                     | admin      | Pendientes y denunciadas.                   |
| POST   | `/api/admin/huellas/:id/approve`       | admin      | Publica una huella.                         |
| POST   | `/api/admin/huellas/:id/reject`        | admin      | Rechaza o retira una huella.                |

Las rutas de administración requieren `Authorization: Bearer <ADMIN_TOKEN>`.

### Moderación y privacidad

- **Nada se publica solo.** Toda aportación nace en estado `pending` y una persona la
  aprueba desde `/#/admin` (el token se guarda en `sessionStorage`, nunca en el código).
- **Denuncias:** tres denuncias de personas distintas ocultan la huella
  automáticamente (`review`) hasta que se revisa. Una misma persona solo cuenta una vez.
- **Datos mínimos:** no hay cuentas ni correo. La IP **no se almacena ni se registra**;
  solo se usa un HMAC con una sal aleatoria en memoria para limitar frecuencia.
- **Límites:** 120 peticiones/minuto por persona, 1 envío cada 45 s, 4 cada 30 min,
  10 denuncias/hora, cuerpo máximo de 8 KB, `Content-Type` JSON obligatorio.
- **Validación doble:** las reglas viven en `src/lib/huellas.js` y el servidor las
  reutiliza (`server/validate.js`). El servidor siempre vuelve a validar.
- **Cabeceras:** `nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`
  y una `Content-Security-Policy` estricta, tanto en el HTML como en las respuestas JSON.

## 4. Despliegue

El frontend es estático y usa rutas con `#` (`#/proyectos`), así que funciona en
cualquier hosting sin reglas de reescritura: Vercel, Netlify, GitHub Pages o un
servidor propio.

1. Compila con la URL de tu API: `VITE_API_URL=https://api.tudominio.com pnpm build`.
2. Sube `dist/` a tu hosting.
3. Ejecuta `node server/index.js` donde tengas Node (VPS, Railway, Fly.io…),
   con `ADMIN_TOKEN` largo y `ALLOWED_ORIGINS` limitado a tu dominio.
4. Sirve la API por HTTPS: el navegador bloquea peticiones desde una página HTTPS
   hacia una API HTTP.

## 5. Editar contenido

Todo el contenido vive en archivos de datos, separado de los componentes:

| Quiero cambiar…              | Archivo                            |
| ---------------------------- | ---------------------------------- |
| Datos de contacto y menú     | `src/data/site.js`                 |
| Proyectos y repos de estudio | `src/data/projects.js`             |
| Categorías y motivos         | `src/data/categories.js`           |
| Huellas de demostración      | `src/data/huellas.seed.js`         |
| Archivo de conocimiento      | `src/data/knowledge.js`            |
| Textos del juego             | `src/game/story.js` (motor: `engine.js`) |
| Reglas de validación         | `src/lib/huellas.js`               |

Regla del proyecto: **nada inventado**. Si un dato (por ejemplo un perfil de LinkedIn
o un CV de desarrollo) no se puede verificar, se deja `null` y la interfaz lo muestra
como pendiente en lugar de rellenarlo.

## 6. Estructura

```
src/
  App.jsx              rutas, título, scroll y foco
  router.jsx           router propio por hash (sin dependencias)
  components/          cabecera, pie, emblema
  sections/            secciones de la portada (hero, sobre mí, proyectos…)
  views/               Umbral, Huellas, Conocimiento, Mapa, Normas, Admin, 404
  game/                historia y motor de El Umbral
  huellas/             cliente de la API y almacenamiento local
  lib/                 validación compartida con el servidor
  data/                contenido editable
  styles/              CSS por capas y por vista
  assets/fonts/        Fraunces e Inter auto-hospedadas (woff2, latin)
server/
  index.js             API + servidor estático (Node puro, sin dependencias)
  store.js             almacén JSON con escritura atómica
  validate.js          reexporta la validación compartida
public/img/            capturas optimizadas a WebP
```

## 7. Accesibilidad y rendimiento

- HTML semántico, un solo `h1` por vista, enlace «Saltar al contenido», `aria-*` en
  menú, formularios y estados, y foco visible en todo lo que se alcanza con `Tab`.
- Se respeta `prefers-reduced-motion`: animaciones y transiciones a `0s`.
- Sin analítica, sin cookies de seguimiento y sin peticiones a terceros.
- Vistas pesadas cargadas bajo demanda; el CSS va dividido por ruta.

---

© Ousman Krubally. El código de este portafolio es de uso personal; el contenido
(proyectos, textos y datos) describe trabajo real del autor.
