# Design

## Context

Hoy el proyecto es un único archivo, `Stori Deeplinks QA.html`, con CSS embebido y seis `<a href="stori://kyc?flow=...">`. No hay JavaScript, build, pruebas ni configuración de hosting. El scheme `stori://` es el mismo en todos los ambientes; lo único que cambia entre DEV y QA es el ID de cada destination. Motivación y alcance: ver `proposal.md`. Comportamiento esperado: ver `specs/kyc-deeplink-builder/spec.md`.

## Goals / Non-Goals

**Goals:**
- Sitio estático sin build, desplegable en el plan gratuito de Netlify.
- Separar datos (catálogo), lógica pura (armar la URL) e interfaz, para que agregar un flow o destination sea editar una sola línea.
- Lógica de construcción de URL verificable con pruebas automáticas sin navegador.

**Non-Goals:**
- Frameworks, bundlers o dependencias npm.
- Probar el deeplink dentro de la app (eso lo hace QA en el dispositivo).
- Cualquier dato de PROD.

## Decisions

### 1. Estructura de archivos

```
deeplinks-tester/
+-- netlify.toml
+-- package.json            <- solo "type": "module" y script "test"
+-- README.md
+-- public/                 <- carpeta publicada
|   +-- index.html
|   +-- css/styles.css
|   +-- js/
|       +-- catalog.js      <- datos
|       +-- deeplink.js     <- lógica pura
|       +-- app.js          <- estado, DOM, eventos
+-- tests/
    +-- deeplink.test.js
```

Dependencias: `catalog.js` -> `deeplink.js` -> `app.js` -> `index.html`. Solo `app.js` toca el DOM.

*Alternativa considerada:* mantener un único HTML. Se descarta porque mezcla datos, lógica y estilos, e impide probar la lógica aislada. *Alternativa:* Vite u otro bundler. Se descarta porque agrega build y dependencias para una página pequeña.

### 2. Módulos ES nativos

`index.html` carga `js/app.js` con `<script type="module">`. Los navegadores móviles actuales los soportan y Node puede importar los mismos archivos en las pruebas. Consecuencia: la página no funciona abriéndola como `file://`; en local se sirve con un servidor estático (`npx serve public` o `python3 -m http.server -d public`), documentado en el `README.md`.

### 3. Modelo de datos del catálogo

`catalog.js` exporta constantes inmutables (`Object.freeze`):

- `ENVIRONMENTS`: `[{ id: 'DEV', label: 'DEV' }, { id: 'QA', label: 'QA' }]`.
- `FLOWS`: `[{ value: 'CREDIT_L1_MX', label: 'CREDIT L1 MX', level: 'L1', group: 'credit' }, ...]`. El campo `level` alimenta la preselección; `group` (`credit`, `deposits`, `luna`) conserva el código de colores de la página actual.
- `LEVELS`: `['L1', 'L2']`.
- `DESTINATIONS`: `[{ id: 't2p', label: 'T2P', ids: { DEV: 'fc...', QA: 'fc...' } }, ...]`.
- `LINK_TYPES`: `[{ id: 'flow', label: 'Flow', params: ['flow'] }, { id: 'flow-destination-level', label: 'Flow + Destination + Level', params: ['flow', 'destination', 'level'] }, { id: 'destination-level', label: 'Destination + Level', params: ['destination', 'level'] }]`.

El orden de `params` define el orden de los parámetros en la URL. La UI se genera recorriendo estos arreglos, sin opciones escritas en el HTML.

*Alternativa:* un JSON cargado con `fetch`. Se descarta porque agrega una petición y manejo de errores sin beneficio real.

### 4. Construcción de la URL

`deeplink.js` exporta `buildDeeplink({ type, environment, flow, destination, level })`, que devuelve el string. Busca el tipo en `LINK_TYPES`, resuelve el ID del destination para el ambiente y arma la query con `URLSearchParams` en el orden de `params`, anteponiendo `stori://kyc?`. Si un valor no existe en el catálogo, lanza un `Error`: la UI nunca debería provocarlo y las pruebas lo cubren.

Se usa `URLSearchParams` para codificar correctamente aunque en el futuro aparezca un valor con caracteres especiales. Los valores actuales no cambian al codificarse.

### 5. Estado y renderizado de la UI

`app.js` mantiene un objeto de estado `{ environment, type, flow, destination, level }` con valores por defecto válidos (DEV o el ambiente guardado, `flow`, `CREDIT_L1_MX`, `T2P`, `L1`), así nunca hay una selección incompleta. Cada cambio actualiza el estado y llama a una función `render()` que muestra u oculta los grupos de controles según `params`, marca las selecciones y actualiza vista previa, `href` del botón y QR.

- Controles: botones tipo *segmented control* / *chips* con `aria-pressed` o radios nativos con estilo, para que sean accesibles con teclado y lector de pantalla.
- Preselección de level: al elegir un flow en el tipo `Flow + Destination + Level`, `state.level = flow.level`. Cambiar el level después no toca el flow.
- "Abrir en la app": un `<a>` cuyo `href` es el deeplink. Es más confiable en móviles que `location.href` desde JS.
- Persistencia: solo `localStorage['kyc-deeplinks:environment']`, validado contra `ENVIRONMENTS` al leer y dentro de `try/catch` (modo privado).

### 6. Copiar

`navigator.clipboard.writeText()` (Netlify sirve HTTPS). Si falla, se muestra "No se pudo copiar" y se selecciona el texto de la vista previa para copiarlo a mano. La confirmación "Copiado" dura unos 2 s y se anuncia con `aria-live="polite"`.

### 7. QR

Librería `qrcode-generator` desde jsDelivr, con versión exacta y atributo `integrity` (SRI) + `crossorigin="anonymous"`. Se genera un SVG (`createSvgTag`) que se inserta en el contenedor, así se escala sin perder nitidez. Nivel de corrección `M`, tipo automático. Si `window.qrcode` no existe, se muestra el aviso y el resto sigue funcionando.

*Alternativa:* incrustar la librería. Se descarta por decisión del usuario, para mantener el código propio limpio.

### 8. Netlify

`netlify.toml`:
- `[build] publish = "public"` y sin `command`, así solo se sirve `public/`.
- Headers para `/*`: `Content-Security-Policy` (`default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`.
- `Cache-Control: public, max-age=0, must-revalidate` para HTML, CSS y JS, para que un cambio de catálogo se vea en cuanto se despliega.

Como la CSP no permite estilos ni scripts inline, todo el CSS y el JS viven en archivos.

## Risks / Trade-offs

- [El CDN de jsDelivr no responde] -> El QR muestra un aviso y el resto de la página funciona. El SRI impide ejecutar una versión alterada.
- [El navegador de escritorio no sabe abrir `stori://`] -> Es esperado; el flujo de escritorio es escanear el QR o copiar el link.
- [Los IDs de DEV y QA quedan públicos en Netlify] -> Son IDs de ambientes no productivos y la página actual ya es pública. PROD queda excluido por spec.
- [`file://` rompe los módulos ES] -> Documentado en el `README.md`, con comandos para servir en local.
- [Un flow nuevo sin level en su nombre] -> El campo `level` del catálogo es explícito; no se deduce del texto.

## Migration Plan

1. Crear la nueva estructura y verificar en local con un servidor estático y en un teléfono (DEV y QA).
2. Eliminar `Stori Deeplinks QA.html` en el mismo cambio.
3. Conectar el repositorio a Netlify (publish `public`, sin build) o arrastrar `public/` a Netlify Drop, y validar el sitio publicado.
4. Si el sitio actual (`stori-kyc-deeplink-test.netlify.app`) se va a reemplazar, apuntar ese mismo sitio de Netlify al nuevo contenido para conservar la URL.

Rollback: volver a desplegar la versión anterior desde el historial de despliegues de Netlify.

## Open Questions

- Si el nuevo sitio reemplaza a `stori-kyc-deeplink-test.netlify.app` o se publica con otra URL. No cambia el código; solo el paso 4 del despliegue.
