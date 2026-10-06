# Design

## Context

El sitio vive en `public/` (HTML/CSS/JS, sin build). Hoy existe `netlify.toml` y el README documenta Netlify; eso se elimina. El working copy en `deeplinks-tester` **no tiene `.git`**. El remoto destino ya existe vacío y privado: `https://github.com/arturo-herrera-stori/kyc-deeplinks.git`. Ver proposal.md para el porqué.

## Goals / Non-Goals

**Goals:**

- Conectar el proyecto local al repo `kyc-deeplinks` (`git init`, `origin`, commit inicial, push `main`).
- Publicar `public/` en GitHub Pages de forma automática desde `main`.
- Quitar por completo la dependencia de Netlify (archivo + docs).
- Documentar solo Pages para este owner/repo.

**Non-Goals:**

- Custom domain.
- Gestionar o borrar un sitio Netlify ya desplegado en la cuenta de Netlify (queda fuera del repo).
- Replicar en Pages los headers CSP que hoy define `netlify.toml` (se pierden al borrar el archivo; aceptado).
- Cambiar catálogo, UI o tests del deeplink builder.
- Renombrar la carpeta local `deeplinks-tester`.

## Decisions

### 1. Tratar el working copy como “existing repository”

**Elección:** `git init` → `.gitignore` → add/commit → `git remote add origin …/kyc-deeplinks.git` → `git branch -M main` → `git push -u origin main`.

**Por qué:** El código ya existe; el remoto está vacío. No usar el bloque “create a new repository” de GitHub (README vacío que choca con el nuestro).

### 2. GitHub Actions + `upload-pages-artifact` / `deploy-pages`

**Elección:** Workflow en `.github/workflows/pages.yml` en push a `main` que publica el contenido de `public/`.

**Alternativas:** `docs/`, rama `gh-pages` — descartadas.

### 3. Eliminar Netlify del repo

**Elección:** Borrar `netlify.toml`; reescribir la sección de publicación del README y la mención en “Estructura”; actualizar el requisito de `kyc-deeplink-builder` para no citar Netlify.

**Por qué:** Un solo destino de hosting evita docs contradictorias. Los headers de seguridad de Netlify no se portan a Pages en este change.

### 4. URL de Pages

Documentar `https://arturo-herrera-stori.github.io/kyc-deeplinks/`. Los href relativos de `public/` ya funcionan bajo `/kyc-deeplinks/`.

### 5. Visibilidad del repo vs Pages (pendiente de confirmación)

El repo se creó **Private**. En el plan gratuito, Pages para privados no está disponible.

| Opción | Efecto |
|--------|--------|
| A. Hacer el repo **Public** | Pages gratis; catálogo DEV/QA visible |
| B. Mantener **Private** + plan Pro/Team | Pages privado; requiere facturación |
| C. Solo push del código, diferir Pages live | Remoto listo; site live después |

## Risks / Trade-offs

- [Repo Private sin plan de pago] → Pages no publica; mitigar con Public o upgrade.
- [Pérdida de headers CSP al borrar `netlify.toml`] → Aceptado; el sitio ya carga jsDelivr; endurecer Pages queda fuera.
- [Sitio Netlify legado sigue vivo] → Fuera de alcance; apagarlo manualmente en Netlify si aplica.
- [Primera activación manual de Pages] → Settings → Source = GitHub Actions.
- [Credenciales de push] → Auth local del usuario; no secrets en el repo.

## Migration Plan

1. Quitar Netlify del árbol (`netlify.toml` + README) y añadir workflow + docs de Pages.
2. Init + ignore + commit + remote + push a `kyc-deeplinks`.
3. Ajustar visibilidad del repo si hace falta para Pages.
4. Settings → Pages → Source: GitHub Actions; verificar URL.
5. (Opcional, manual) Desactivar el sitio viejo en Netlify.
6. Rollback de Pages: desactivar Pages o revertir el workflow; el código en GitHub permanece.

## Open Questions

1. **¿El repo `kyc-deeplinks` debe quedar Public (Pages gratis) o Private (Pages con plan de pago)?** Bloquea si el site live es criterio de aceptación inmediato.
