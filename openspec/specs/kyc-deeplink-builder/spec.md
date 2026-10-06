# kyc-deeplink-builder Specification

## Purpose

Permite a QA y desarrolladores armar, previsualizar, copiar y abrir los deeplinks KYC de la app Stori para los ambientes DEV y QA, desde una página web estática.

## Requirements

### Requirement: Tipos de deeplink

La página SHALL ofrecer exactamente tres tipos de deeplink, seleccionables de forma exclusiva y con estas etiquetas: `Flow`, `Flow + Destination + Level` y `Destination + Level`. Cada tipo SHALL producir una URL con scheme `stori://`, host `kyc` y solo los parámetros de su tipo, en este orden:

| Tipo | URL |
|------|-----|
| `Flow` | `stori://kyc?flow={flow}` |
| `Flow + Destination + Level` | `stori://kyc?flow={flow}&destination={destination}&level={level}` |
| `Destination + Level` | `stori://kyc?destination={destination}&level={level}` |

#### Scenario: Tipo Flow
- **WHEN** el usuario elige el tipo `Flow` y el flow `CREDIT_L1_MX`
- **THEN** el deeplink generado es `stori://kyc?flow=CREDIT_L1_MX`

#### Scenario: Tipo Flow + Destination + Level
- **WHEN** el usuario elige el tipo `Flow + Destination + Level`, el ambiente QA, el flow `LUNA_L1_MX`, el destination `LUNA - New MP` y el level `L1`
- **THEN** el deeplink generado es `stori://kyc?flow=LUNA_L1_MX&destination=fc3221926378667141&level=L1`

#### Scenario: Tipo Destination + Level
- **WHEN** el usuario elige el tipo `Destination + Level`, el ambiente DEV, el destination `T2P` y el level `L2`
- **THEN** el deeplink generado es `stori://kyc?destination=fc2981118026611077&level=L2`

#### Scenario: Solo se muestran los controles del tipo elegido
- **WHEN** el usuario elige el tipo `Flow`
- **THEN** los controles de destination y level no se muestran y el deeplink no incluye esos parámetros

### Requirement: Catálogo de flows

La página SHALL ofrecer estos flows, mostrando la etiqueta y enviando el valor:

| Etiqueta | Valor |
|----------|-------|
| CREDIT L1 MX | `CREDIT_L1_MX` |
| CREDIT L2 MX | `CREDIT_L2_MX` |
| CREDIT L1 FOREIGNER | `CREDIT_L1_FOREIGNER` |
| CREDIT L1 MX OCR | `CREDIT_L1_MX_OCR` |
| DEPOSITS L2 MX | `DEPOSITS_L2_MX` |
| LUNA L1 MX | `LUNA_L1_MX` |

#### Scenario: Todos los flows disponibles
- **WHEN** el usuario elige un tipo que incluye flow
- **THEN** puede seleccionar cualquiera de los seis flows del catálogo y solo esos

### Requirement: Catálogo de levels

La página SHALL ofrecer los levels `L1` y `L2`.

#### Scenario: Levels disponibles
- **WHEN** el usuario elige un tipo que incluye level
- **THEN** puede seleccionar `L1` o `L2` y ningún otro valor

### Requirement: Level preseleccionado según el flow

En el tipo `Flow + Destination + Level`, al seleccionar un flow la página SHALL preseleccionar el level que indica su nombre (`L1` para `CREDIT_L1_MX`, `CREDIT_L1_FOREIGNER`, `CREDIT_L1_MX_OCR` y `LUNA_L1_MX`; `L2` para `CREDIT_L2_MX` y `DEPOSITS_L2_MX`). El usuario SHALL poder cambiar el level después, incluso a uno que no coincida con el flow.

#### Scenario: Preselección al cambiar de flow
- **WHEN** en el tipo `Flow + Destination + Level` el usuario selecciona `DEPOSITS_L2_MX`
- **THEN** el level queda en `L2`

#### Scenario: Combinación no coincidente a propósito
- **WHEN** con `DEPOSITS_L2_MX` seleccionado el usuario cambia el level a `L1`
- **THEN** el deeplink generado usa `level=L1` sin mostrar error

### Requirement: Destinations por ambiente

La página SHALL ofrecer un selector de ambiente con solo `DEV` y `QA`, y los destinations `T2P`, `LUNA - New MP` y `LUNA - Old MP`. El usuario elige el destination por nombre y la página SHALL enviar el ID del ambiente seleccionado:

| Destination | DEV | QA |
|-------------|-----|-----|
| T2P | `fc2981118026611077` | `fc2980055818713477` |
| LUNA - New MP | `fc3220397196754053` | `fc3221926378667141` |
| LUNA - Old MP | `fc2717945212542021` | `fc2777295705517381` |

La página y los archivos publicados MUST NOT incluir un ambiente PROD ni IDs de destination de PROD.

#### Scenario: Cambio de ambiente
- **WHEN** con el destination `LUNA - Old MP` seleccionado el usuario cambia el ambiente de DEV a QA
- **THEN** el deeplink cambia de `destination=fc2717945212542021` a `destination=fc2777295705517381` sin cambiar los demás parámetros

#### Scenario: Sin PROD
- **WHEN** el usuario revisa el selector de ambiente
- **THEN** solo existen las opciones `DEV` y `QA`

### Requirement: Ambiente recordado

La página SHALL recordar en el navegador el último ambiente seleccionado y usarlo al volver a abrirse. Si no hay un valor guardado válido, SHALL usar `DEV`. La página MUST NOT guardar ningún otro dato (ni historial ni favoritos).

#### Scenario: Reapertura
- **WHEN** el usuario selecciona QA, cierra la página y la vuelve a abrir en el mismo navegador
- **THEN** el ambiente seleccionado es QA

#### Scenario: Primera visita
- **WHEN** el usuario abre la página por primera vez
- **THEN** el ambiente seleccionado es DEV

### Requirement: Deeplink siempre válido y en vivo

La página SHALL tener siempre una selección completa para el tipo activo, de modo que siempre exista un deeplink válido; al abrirse SHALL mostrar el tipo `Flow` con el primer flow del catálogo. Cualquier cambio de ambiente, tipo, flow, destination o level SHALL actualizar de inmediato la vista previa del deeplink.

#### Scenario: Estado inicial
- **WHEN** el usuario abre la página por primera vez
- **THEN** la vista previa muestra `stori://kyc?flow=CREDIT_L1_MX`

#### Scenario: Actualización en vivo
- **WHEN** el usuario cambia cualquier selección
- **THEN** la vista previa muestra el nuevo deeplink sin pulsar ningún botón adicional

### Requirement: Abrir en la app

La página SHALL ofrecer una acción "Abrir en la app" que navega al deeplink generado para que el sistema operativo lo entregue a la app Stori.

#### Scenario: Abrir desde el teléfono
- **WHEN** el usuario pulsa "Abrir en la app" en un teléfono con la app Stori instalada
- **THEN** el sistema operativo abre la app con el deeplink mostrado en la vista previa

### Requirement: Copiar deeplink

La página SHALL ofrecer una acción "Copiar" que copia al portapapeles el deeplink mostrado y confirma visualmente la copia. Si el navegador no permite copiar, SHALL indicarlo y dejar el texto del deeplink seleccionable para copiarlo a mano.

#### Scenario: Copia exitosa
- **WHEN** el usuario pulsa "Copiar"
- **THEN** el portapapeles contiene exactamente el deeplink de la vista previa y la página muestra una confirmación temporal

#### Scenario: Copia no disponible
- **WHEN** el navegador rechaza el acceso al portapapeles
- **THEN** la página informa que no pudo copiar y el deeplink sigue visible como texto seleccionable

### Requirement: Publicación como sitio estático

El sitio SHALL poder publicarse como sitio estático sin paso de build, sirviendo solo el contenido de la página (no archivos de planificación ni configuración del repositorio). La página SHALL ser usable en pantallas de teléfono. El proyecto MUST NOT requerir Netlify para publicarse.

#### Scenario: Solo se publica el sitio
- **WHEN** el sitio está desplegado en el host de publicación configurado para el proyecto
- **THEN** rutas como `/openspec/config.yaml` o `/package.json` responden 404

#### Scenario: Uso en teléfono
- **WHEN** el usuario abre la página en un teléfono de 360 px de ancho
- **THEN** todos los controles y acciones se ven y se usan sin desplazamiento horizontal
