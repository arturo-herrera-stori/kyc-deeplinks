# Spec Delta

## Purpose

Permite a QA y desarrolladores armar, previsualizar, copiar y abrir los deeplinks KYC de la app Stori para los ambientes DEV y QA, desde una página web estática.

## MODIFIED Requirements

### Requirement: Deeplink siempre válido y en vivo

La página SHALL tener siempre una selección completa para el tipo activo, de modo que siempre exista un deeplink válido; al abrirse SHALL mostrar el tipo `Flow` con el primer flow del catálogo. Cualquier cambio de ambiente, tipo, flow, destination o level SHALL actualizar de inmediato la vista previa del deeplink.

#### Scenario: Estado inicial
- **WHEN** el usuario abre la página por primera vez
- **THEN** la vista previa muestra `stori://kyc?flow=CREDIT_L1_MX`

#### Scenario: Actualización en vivo
- **WHEN** el usuario cambia cualquier selección
- **THEN** la vista previa muestra el nuevo deeplink sin pulsar ningún botón adicional

## REMOVED Requirements

### Requirement: Código QR del deeplink

La página SHALL mostrar un código QR que codifica exactamente el deeplink de la vista previa, para escanearlo desde un teléfono. Si el QR no puede generarse (por ejemplo, porque no cargó su librería), la página SHALL mostrar un aviso en su lugar y el resto de las funciones SHALL seguir operando.

#### Scenario: QR escaneable
- **WHEN** el usuario escanea el QR con la cámara de un teléfono
- **THEN** el contenido leído es igual al deeplink de la vista previa

#### Scenario: Librería de QR no disponible
- **WHEN** la librería de QR no carga
- **THEN** la página muestra un aviso en el lugar del QR y la vista previa, "Abrir en la app" y "Copiar" siguen funcionando
