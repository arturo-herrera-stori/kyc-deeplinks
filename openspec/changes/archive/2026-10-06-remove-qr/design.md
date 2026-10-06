# Design

## Context

Implementación ya desplegada en `main` (commit `0c3bd72`). Este cambio OpenSpec documenta y archiva ese trabajo retroactivamente.

## Goals

- Quitar toda generación y UI de QR; sin dependencias CDN en runtime.
- Mantener preview, `href` de “Abrir en la app” y copia al portapapeles sincronizados con `buildDeeplink(state)`.

## Decisions

### 1. Sin sustituto de QR

**Elección:** No añadir “compartir” ni deep link corto. En móvil: **Abrir en la app**; en escritorio: **Copiar** o IP local con `npm start`.

### 2. README como guía principal

**Elección:** README en inglés con tablas de flows, destinations por ambiente y tipos de link; emojis para escaneo rápido.

## Non-Goals

- Actualizar diagramas locales en `.tmp/` ni artefactos Archify.
