# Spec Delta

## MODIFIED Requirements

### Requirement: Catálogo de flows

La página SHALL ofrecer estos flows, mostrando la etiqueta y enviando el valor:

| Etiqueta | Valor |
|----------|-------|
| CREDIT L1 MX | `CREDIT_L1_MX` |
| CREDIT L2 MX | `CREDIT_L2_MX` |
| CREDIT L1 FOREIGNER | `CREDIT_L1_FOREIGNER` |
| DEPOSITS L2 MX | `DEPOSITS_L2_MX` |
| LUNA L1 MX | `LUNA_L1_MX` |

#### Scenario: Todos los flows disponibles
- **WHEN** el usuario elige un tipo que incluye flow
- **THEN** puede seleccionar cualquiera de los cinco flows del catálogo y solo esos

### Requirement: Level preseleccionado según el flow

En el tipo `Flow + Destination + Level`, al seleccionar un flow la página SHALL preseleccionar el level que indica su nombre (`L1` para `CREDIT_L1_MX`, `CREDIT_L1_FOREIGNER` y `LUNA_L1_MX`; `L2` para `CREDIT_L2_MX` y `DEPOSITS_L2_MX`). El usuario SHALL poder cambiar el level después, incluso a uno que no coincida con el flow.

#### Scenario: Preselección al cambiar de flow
- **WHEN** en el tipo `Flow + Destination + Level` el usuario selecciona `DEPOSITS_L2_MX`
- **THEN** el level queda en `L2`

#### Scenario: Combinación no coincidente a propósito
- **WHEN** con `DEPOSITS_L2_MX` seleccionado el usuario cambia el level a `L1`
- **THEN** el deeplink generado usa `level=L1` sin mostrar error
