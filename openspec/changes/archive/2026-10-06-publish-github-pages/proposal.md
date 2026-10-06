# Proposal

## Why

El constructor de deeplinks KYC ya es una página estática lista para servir, pero hoy está cableada a Netlify (`netlify.toml` + docs en el README) y el código vive en un directorio local sin Git. El destino nuevo es el repo `arturo-herrera-stori/kyc-deeplinks` con GitHub Pages; Netlify deja de ser necesario y debe eliminarse del proyecto.

## What Changes

- Inicializar Git en el proyecto local (hoy no hay `.git`) y conectar `origin` a `https://github.com/arturo-herrera-stori/kyc-deeplinks.git`.
- Hacer el commit inicial (excluyendo basura local como `.DS_Store`) y push de `main` al repo vacío.
- Añadir un flujo de publicación a GitHub Pages que sirva el contenido de `public/` (no la raíz del repo).
- **Eliminar** `netlify.toml` y toda la documentación/instrucciones de Netlify del README (estructura y sección de publicación).
- Actualizar el README para documentar solo GitHub Pages y la URL de este repo (`…/kyc-deeplinks/`).
- Ajustar el requisito de publicación del builder KYC para que ya no mencione Netlify.
- No cambiar la UI ni la lógica de armado de deeplinks.

## Capabilities

### New Capabilities

- `github-pages-hosting`: Publicación del sitio estático en GitHub Pages a partir de `public/`, con despliegue reproducible desde el repo GitHub canónico y sin dependencia de Netlify.

### Modified Capabilities

- `kyc-deeplink-builder`: El requisito de publicación deja de exigir Netlify; se mantiene publicación estática sin build y usabilidad en teléfono.

## Impact

- `git init`, remote `origin`, primer commit y push a `arturo-herrera-stori/kyc-deeplinks`.
- Nuevo workflow de GitHub Actions que publique `public/`.
- Borrado de `netlify.toml`.
- `README.md` sin referencias a Netlify; sección de Pages para este owner/repo.
- Posible `.gitignore` mínimo (p. ej. `.DS_Store`).
- Delta en `openspec/specs/kyc-deeplink-builder` al archivar.
- El repo remoto se creó como **Private**: GitHub Pages en privados requiere plan de pago, o bien hacer el repo **Public** para Pages gratuito.
- Cualquier sitio Netlify previo queda fuera de alcance (no se gestiona su apagado desde este repo).
