# Spec Delta

## MODIFIED Requirements

### Requirement: Publicación como sitio estático

El sitio SHALL poder publicarse como sitio estático sin paso de build, sirviendo solo el contenido de la página (no archivos de planificación ni configuración del repositorio). La página SHALL ser usable en pantallas de teléfono. El proyecto MUST NOT requerir Netlify para publicarse.

#### Scenario: Solo se publica el sitio
- **WHEN** el sitio está desplegado en el host de publicación configurado para el proyecto
- **THEN** rutas como `/openspec/config.yaml` o `/package.json` responden 404

#### Scenario: Uso en teléfono
- **WHEN** el usuario abre la página en un teléfono de 360 px de ancho
- **THEN** todos los controles y acciones se ven y se usan sin desplazamiento horizontal
