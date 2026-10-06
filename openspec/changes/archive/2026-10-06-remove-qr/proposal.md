# Proposal

## Why

El generador de QR añadía dependencia de CDN (jsDelivr), UI y código que QA ya no necesita: el flujo principal es vista previa, **Copiar** y **Abrir en la app**. El README en español tampoco reflejaba bien el uso actual del catálogo y los flujos.

## What Changes

- Eliminar contenedor QR, script `qrcode-generator`, `renderQr()` y estilos asociados.
- Actualizar el spec principal del builder: quitar el requisito de QR y las menciones en “Deeplink siempre válido y en vivo” y en Purpose.
- Reescribir `README.md` en inglés, visual y orientado a uso (enums, flujos, deploy en Pages).

## Capabilities

### Modified Capabilities

- `kyc-deeplink-builder`: sin QR; vista previa en vivo solo actualiza el texto del deeplink; documentación de uso en README.

## Impact

- `public/index.html`, `public/js/app.js`, `public/css/styles.css`
- `README.md`
- `openspec/specs/kyc-deeplink-builder/spec.md` (ya aplicado en implementación previa al archivo de este cambio)

## Non-Goals

- Cambiar catálogo, tipos de deeplink o lógica de `deeplink.js`.
- Nuevas features de UI más allá de quitar QR.
