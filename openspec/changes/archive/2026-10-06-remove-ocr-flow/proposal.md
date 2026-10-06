# Proposal

## Why

El flow `CREDIT_L1_MX_OCR` ya no se usa en pruebas KYC; mantenerlo en el catálogo confunde a QA y duplica un camino L1 MX estándar.

## What Changes

- Quitar `CREDIT_L1_MX_OCR` de `FLOWS` en `catalog.js` (la UI se regenera sola).
- Actualizar tests, README y spec del builder (cinco flows, texto de preselección L1).

## Capabilities

### Modified Capabilities

- `kyc-deeplink-builder`: catálogo de flows sin OCR; escenarios que citaban seis flows pasan a cinco.

## Impact

- `public/js/catalog.js`, `tests/deeplink.test.js`, `README.md`, `openspec/specs/kyc-deeplink-builder/spec.md`
- La app Stori puede seguir aceptando `flow=CREDIT_L1_MX_OCR` si la URL se arma manualmente; esta herramienta deja de ofrecerlo.

## Non-Goals

- Cambiar tipos de deeplink, destinations o ambientes.
