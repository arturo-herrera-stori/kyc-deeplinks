# Proposal

## Why

QA necesita deeplinks con el destination **UAP** en DEV y QA sin armar IDs a mano.

## What Changes

- Añadir `UAP` a `DESTINATIONS` con IDs DEV/QA proporcionados.
- Actualizar spec del builder y README.

## Capabilities

### Modified Capabilities

- `kyc-deeplink-builder`: catálogo de destinations incluye UAP.

## Impact

- `public/js/catalog.js`, `README.md`, `openspec/specs/kyc-deeplink-builder/spec.md`
