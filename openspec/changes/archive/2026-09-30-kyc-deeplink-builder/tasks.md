# Tasks

## 1. Estructura del proyecto

- [x] 1.1 Crear `public/`, `public/css/`, `public/js/` y `tests/`, y un `package.json` mínimo (`"private": true`, `"type": "module"`, script `"test": "node --test tests/"`, sin dependencias); verificar con `npm test` que el comando corre (aunque aún no haya pruebas)
- [x] 1.2 Crear `netlify.toml` con `publish = "public"`, sin build command, y los headers de CSP, `X-Content-Type-Options`, `Referrer-Policy` y `Cache-Control` del diseño; verificar revisando que el archivo coincide con la decisión 8 de `design.md`

## 2. Catálogo y construcción de deeplinks

- [x] 2.1 Implementar `public/js/catalog.js` con `ENVIRONMENTS` (solo DEV y QA), `FLOWS` (6, con `level` y `group`), `LEVELS`, `DESTINATIONS` (3, con IDs de DEV y QA) y `LINK_TYPES` (3, con `params` ordenados), todo congelado; verificar con `rg -i prod public/` que no hay rastro de PROD
- [x] 2.2 Implementar `buildDeeplink()` en `public/js/deeplink.js` usando `URLSearchParams` y el orden de `params`, lanzando `Error` ante valores fuera del catálogo
- [x] 2.3 Escribir `tests/deeplink.test.js` con los tres escenarios de URL del spec, el cambio de ambiente (`LUNA - Old MP` DEV vs QA), los seis flows con su level esperado y los errores por valores desconocidos; verificar que `npm test` pasa

## 3. Interfaz

- [x] 3.1 Escribir `public/index.html` con encabezado, selector de ambiente, selector de tipo, grupos de flow/destination/level, vista previa, botones "Abrir en la app" y "Copiar", contenedor del QR con región `aria-live`, el `<script>` de `qrcode-generator` desde jsDelivr (versión exacta + `integrity` calculado + `crossorigin`) y `<script type="module" src="js/app.js">`; sin estilos ni scripts inline; verificar que la página carga sin errores de consola servida con `npx serve public`
- [x] 3.2 Escribir `public/css/styles.css` mobile-first, conservando la paleta por grupo (crédito verde, débito azul, Luna morado), con estados seleccionados visibles y foco de teclado; verificar en 360 px de ancho que no hay desplazamiento horizontal
- [x] 3.3 Implementar en `public/js/app.js` el estado con valores por defecto, el renderizado de controles desde el catálogo, mostrar/ocultar grupos según el tipo y la preselección de level por flow; verificar en el navegador los escenarios "Estado inicial", "Solo se muestran los controles del tipo elegido", "Preselección al cambiar de flow" y "Combinación no coincidente a propósito"
- [x] 3.4 Implementar la persistencia del ambiente en `localStorage` (validada y con `try/catch`); verificar que al elegir QA y recargar se mantiene QA, y que con un valor inválido guardado arranca en DEV
- [x] 3.5 Implementar la vista previa en vivo, el `href` de "Abrir en la app" y "Copiar" con confirmación y fallback; verificar que el portapapeles contiene exactamente el deeplink mostrado
- [x] 3.6 Implementar el QR en SVG que se regenera con cada cambio y el aviso cuando la librería no carga; verificar escaneando con un teléfono que el contenido coincide con la vista previa, y bloqueando jsDelivr en DevTools que aparece el aviso y lo demás sigue funcionando

## 4. Reemplazo y documentación

- [x] 4.1 Eliminar `Stori Deeplinks QA.html` y verificar que sus seis flows están en el catálogo nuevo
- [x] 4.2 Escribir `README.md` con propósito, cómo servir en local, cómo correr `npm test`, cómo agregar un flow o destination en `catalog.js` y cómo publicar en Netlify (repo conectado o Netlify Drop); verificar que los comandos documentados funcionan tal como están escritos

## 5. Verificación integral

- [ ] 5.1 Desplegar en Netlify y verificar en el sitio publicado: que `/openspec/config.yaml` y `/package.json` responden 404, que los headers de `netlify.toml` están presentes y que el QR carga sin violaciones de CSP en consola
- [ ] 5.2 En un teléfono con la app de DEV y otro (o el mismo) con la de QA, abrir un deeplink de cada tipo con "Abrir en la app" y escaneando el QR, y verificar que la app recibe los parámetros esperados
