# Spec Delta

## MODIFIED Requirements

### Requirement: Destinations por ambiente

La página SHALL ofrecer un selector de ambiente con solo `DEV` y `QA`, y los destinations `T2P`, `LUNA - New MP`, `LUNA - Old MP` y `UAP`. El usuario elige el destination por nombre y la página SHALL enviar el ID del ambiente seleccionado:

| Destination | DEV | QA |
|-------------|-----|-----|
| T2P | `fc2981118026611077` | `fc2980055818713477` |
| LUNA - New MP | `fc3220397196754053` | `fc3221926378667141` |
| LUNA - Old MP | `fc2717945212542021` | `fc2777295705517381` |
| UAP | `fc2664661432842565` | `fc2664660149516613` |

La página y los archivos publicados MUST NOT incluir un ambiente PROD ni IDs de destination de PROD.

#### Scenario: Cambio de ambiente
- **WHEN** con el destination `LUNA - Old MP` seleccionado el usuario cambia el ambiente de DEV a QA
- **THEN** el deeplink cambia de `destination=fc2717945212542021` a `destination=fc2777295705517381` sin cambiar los demás parámetros

#### Scenario: Sin PROD
- **WHEN** el usuario revisa el selector de ambiente
- **THEN** solo existen las opciones `DEV` y `QA`
