# Tasks

## 1. Quitar Netlify

- [x] 1.1 Eliminar `netlify.toml` de la raíz y verificar que el archivo ya no existe
- [x] 1.2 Actualizar `README.md`: quitar `netlify.toml` de la estructura y reemplazar la sección “Publicar en Netlify…” por instrucciones de GitHub Pages para `arturo-herrera-stori/kyc-deeplinks` (Source = GitHub Actions, se publica `public/`, URL `https://arturo-herrera-stori.github.io/kyc-deeplinks/`); verificar que no quedan menciones a Netlify en el README

## 2. Workflow de GitHub Pages

- [x] 2.1 Crear `.github/workflows/pages.yml` que en push a `main` (paths `public/**` y el propio workflow) suba `public/` con `actions/upload-pages-artifact` y despliegue con `actions/deploy-pages`, con permisos `pages: write` e `id-token: write`; verificar que el YAML es válido (job `deploy` con `environment: github-pages` y artifact = contenido de `public/`)

## 3. Conectar el working copy al repo GitHub

- [x] 3.1 Crear `.gitignore` mínimo (al menos `.DS_Store`) y verificar que no se stagean archivos basura al hacer `git status`
- [x] 3.2 Ejecutar `git init`, `git branch -M main`, primer commit con el contenido del proyecto (sin Netlify, con workflow y README actualizado), y verificar que `git log -1` muestra el commit
- [x] 3.3 Añadir `origin` → `https://github.com/arturo-herrera-stori/kyc-deeplinks.git` y verificar con `git remote -v`
- [x] 3.4 Hacer `git push -u origin main` al repo vacío y verificar en GitHub que `main` contiene `public/` y el workflow, y que **no** aparece `netlify.toml`
- [x] 3.5 Verificar que el Action aparece en la pestaña Actions (el deploy exitoso de Pages puede requerir Source = GitHub Actions y la visibilidad acordada)

## 4. Comprobación local del sitio

- [x] 4.1 Ejecutar `npm test` y confirmar que los tests del deeplink builder siguen pasando
- [x] 4.2 Servir `public/` en local (`npm start`) y verificar que la página carga CSS/JS con rutas relativas (mismo comportamiento esperado bajo Pages en `/kyc-deeplinks/`)
