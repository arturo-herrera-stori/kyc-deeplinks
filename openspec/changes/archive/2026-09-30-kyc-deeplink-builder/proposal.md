# Proposal

## Why

La página de QA actual (`Stori Deeplinks QA.html`) es una lista de 6 botones con deeplinks escritos a mano, todos con la forma `stori://kyc?flow=X`. No permite probar los deeplinks que combinan `destination` y `level`, que dependen del ambiente, y cada flow o destination nuevo obliga a editar HTML. Hace falta un constructor sencillo que arme cualquiera de los tres formatos soportados y que se pueda publicar gratis en Netlify.

## What Changes

- Reemplazar los botones estáticos por un **constructor de deeplinks** con tres tipos explícitos:
  - `Flow` → `stori://kyc?flow={flow}`
  - `Flow + Destination + Level` → `stori://kyc?flow={flow}&destination={destination}&level={level}`
  - `Destination + Level` → `stori://kyc?destination={destination}&level={level}`
- Agregar un selector de **ambiente (DEV | QA)** que resuelve automáticamente el ID `fc...` de cada destination. PROD queda fuera a propósito: la herramienta es solo para DEV y QA y no debe publicar datos de PROD.
- Mostrar el deeplink generado en vivo, con acciones para **abrirlo en la app**, **copiarlo** y verlo como **código QR**.
- Mover flows, levels y destinations a un catálogo de datos para que agregar uno nuevo sea una sola línea.
- Reorganizar el proyecto como sitio estático sin build (`public/` + `netlify.toml`) publicable en el plan gratuito de Netlify.
- **BREAKING**: se elimina `Stori Deeplinks QA.html`; la nueva página en `public/index.html` la reemplaza y cubre todos sus flows.

Fuera de alcance: historial, favoritos, destinations personalizados y el ambiente PROD.

## Capabilities

### New Capabilities

- `kyc-deeplink-builder`: construcción, vista previa y apertura de deeplinks KYC de Stori (tipos, catálogo de flows/levels/destinations por ambiente, copiar, QR) y las restricciones de publicación del sitio.

### Modified Capabilities

(ninguna; no existen specs previas en el proyecto)

## Impact

- **Archivos**: se elimina `Stori Deeplinks QA.html`; se agregan `public/` (HTML, CSS, JS), `netlify.toml`, un `package.json` mínimo para correr pruebas con `node --test` y un `README.md` con instrucciones locales y de despliegue.
- **Dependencias**: una librería de QR cargada desde jsDelivr con versión fija e integridad SRI. Sin dependencias npm ni paso de build.
- **Hosting**: sitio estático en Netlify (plan gratuito), publicando solo la carpeta `public/`.
- **Usuarios**: QA y desarrolladores que prueban el flujo KYC en dispositivos con la app de DEV o QA instalada.
