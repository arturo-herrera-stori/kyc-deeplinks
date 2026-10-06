# github-pages-hosting Specification

## Purpose
Publica el sitio estático del constructor de deeplinks KYC en GitHub Pages a partir del contenido de `public/`, con un despliegue reproducible desde el repositorio GitHub canónico y sin dependencia de Netlify.

## Requirements

### Requirement: Repositorio GitHub canónico
El código del proyecto SHALL publicarse en el repositorio GitHub `arturo-herrera-stori/kyc-deeplinks`, con la rama principal `main` como rama de despliegue. El remoto `origin` del working copy SHALL apuntar a ese repositorio.

#### Scenario: Origin apunta al repo nuevo
- **WHEN** se inspecciona el remoto `origin` del proyecto
- **THEN** la URL es `https://github.com/arturo-herrera-stori/kyc-deeplinks.git` (o el equivalente SSH del mismo repo)

#### Scenario: main existe en el remoto
- **WHEN** se consulta el remoto tras el setup inicial
- **THEN** la rama `main` está presente en `origin` con el contenido del proyecto (incluido `public/`)

### Requirement: Publicar solo el contenido de public
El despliegue a GitHub Pages SHALL publicar el contenido de la carpeta `public/` como raíz del sitio. La raíz del repositorio (README, openspec, tests, package.json, workflows) MUST NOT quedar expuesta como la raíz del sitio.

#### Scenario: Sitio servido desde public
- **WHEN** un visitante abre la URL de GitHub Pages del repositorio
- **THEN** se sirve `index.html` y los assets de `public/` (CSS, JS, favicon) y no archivos de la raíz del repo

### Requirement: Despliegue automático desde la rama principal
El repositorio SHALL incluir un flujo de despliegue que, ante un push a la rama principal que afecte el sitio publicado, actualice GitHub Pages con el contenido vigente de `public/`.

#### Scenario: Push a main actualiza Pages
- **WHEN** se hace push a la rama principal con cambios en `public/` (o en el flujo de despliegue)
- **THEN** el flujo de despliegue publica el contenido actual de `public/` en GitHub Pages

### Requirement: Sin dependencia de Netlify
El proyecto MUST NOT incluir configuración ni documentación de despliegue a Netlify. En particular, MUST NOT existir `netlify.toml`, y el README MUST NOT indicar Netlify como destino de publicación.

#### Scenario: netlify.toml eliminado
- **WHEN** se lista la raíz del repositorio
- **THEN** no existe el archivo `netlify.toml`

#### Scenario: README sin Netlify
- **WHEN** un colaborador lee el README
- **THEN** no hay sección ni instrucciones de publicación en Netlify

### Requirement: Documentación de publicación
El README SHALL documentar cómo habilitar GitHub Pages para `arturo-herrera-stori/kyc-deeplinks` y que el origen publicado es el artefacto del flujo de despliegue (no la raíz del repo ni una carpeta `docs/` accidental). La URL documentada SHALL reflejar el path `/kyc-deeplinks/`.

#### Scenario: README explica Pages para este repo
- **WHEN** un colaborador lee el README
- **THEN** encuentra instrucciones para activar Pages en este repo y entiende que se publica `public/` bajo la URL de Pages del proyecto
