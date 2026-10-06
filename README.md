# Stori KYC Deeplinks

Página web para armar, abrir, copiar y escanear (QR) los deeplinks KYC de la app Stori en los ambientes **DEV** y **QA**.

Tipos de deeplink:

| Tipo | URL |
|------|-----|
| Flow | `stori://kyc?flow={flow}` |
| Flow + Destination + Level | `stori://kyc?flow={flow}&destination={destination}&level={level}` |
| Destination + Level | `stori://kyc?destination={destination}&level={level}` |

El ID de cada destination depende del ambiente seleccionado. PROD no está incluido a propósito.

## Estructura

```
public/            <- lo único que se publica
  index.html
  favicon.svg
  css/styles.css
  js/catalog.js    <- flows, levels, destinations por ambiente y tipos de link
  js/deeplink.js   <- arma la URL (sin DOM)
  js/app.js        <- interfaz
tests/             <- pruebas de deeplink.js
.github/workflows/ <- despliegue a GitHub Pages
```

Sin build ni dependencias npm. La librería de QR se carga desde jsDelivr con versión fija e integridad SRI.

## Correr en local

La página usa módulos ES, así que no funciona abriendo `index.html` directo (`file://`). Sírvela con un servidor estático:

```bash
npm start                          # npx serve public
# o
python3 -m http.server -d public 8000
```

Para probar en el teléfono, abre la IP de tu computadora en la misma red (por ejemplo `http://192.168.1.20:8000`) o escanea el QR que muestra la página.

## Pruebas

```bash
npm test
```

Requiere Node.js 20 o superior.

## Agregar un flow o destination

Todo vive en `public/js/catalog.js`; la interfaz se genera sola.

- **Flow:** agrega un objeto a `FLOWS` con `value` (lo que va en la URL), `label`, `level` (el que se preselecciona) y `group` (`credit`, `deposits` o `luna`, define el color).
- **Destination:** agrega un objeto a `DESTINATIONS` con `id`, `label` e `ids` con un ID para **cada** ambiente (`DEV` y `QA`).

Después corre `npm test`: una prueba valida que todos los destinations tengan ID para cada ambiente.

## Publicar en GitHub Pages

El repo canónico es [`arturo-herrera-stori/kyc-deeplinks`](https://github.com/arturo-herrera-stori/kyc-deeplinks). El workflow `.github/workflows/pages.yml` publica solo el contenido de `public/` en cada push a `main` que toque esa carpeta (o el propio workflow).

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Tras el primer deploy exitoso, el sitio queda en:
   `https://arturo-herrera-stori.github.io/kyc-deeplinks/`

Nota: en repos **privados**, GitHub Pages requiere un plan de pago (Pro/Team/Enterprise). En repos públicos Pages es gratuito.
