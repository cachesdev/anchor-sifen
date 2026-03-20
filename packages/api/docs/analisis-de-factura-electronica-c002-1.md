# Analisis dinamico DE - Factura Electronica (C002=1)

## Objetivo

Documentar la logica dinamica del tipo Documento Electronico cuando `C002/iTiDE = 1` (Factura Electronica, FE), para construir validaciones y tipos separados por tipo de DE.

## Alcance y fuente

- Fuente principal: `docs/Manual Tecnico 150.md` (secciones `AA` a `J`, y `12.4 Validaciones del formato`).
- Este documento se centra en reglas que afectan FE (`C002=1`) en presencia/ausencia de grupos, obligatoriedad condicional y dependencias entre ramas.
- No cubre eventos (`cap. 11`) salvo reglas de documento asociado que impactan el armado del DE FE.

## 1. Discriminador principal FE

- `C002 = 1` identifica FE.
- `C003` debe coincidir con `C002` (descripcion del tipo de DE).
- El CDC (`A002`) debe ser compatible con `C002` y otros campos estructurales (validacion de compatibilidad del CDC).

## 2. Matriz de grupos para FE (C002=1)

| Grupo/ID                           | Estado en FE       | Regla principal                          |
| ---------------------------------- | ------------------ | ---------------------------------------- |
| `AA001` `rDE`                      | Requerido          | Raiz del XML                             |
| `AA002` `dVerFor`                  | Requerido          | Version 150                              |
| `A001`                             | Requerido          | Grupo firmado                            |
| `B001`                             | Requerido          | Datos operativos DE                      |
| `C001`                             | Requerido          | Timbrado                                 |
| `D001`                             | Requerido          | Datos generales DE                       |
| `D010`                             | Requerido          | Obligatorio para todo `C002 != 7`        |
| `D100`                             | Requerido          | Emisor                                   |
| `D200`                             | Requerido          | Receptor                                 |
| `E001`                             | Requerido          | Contenedor de campos por tipo DE         |
| `E010` (FE)                        | Requerido          | Obligatorio si `C002=1`                  |
| `E300` (AFE)                       | Prohibido          | No informar si `C002 != 4`               |
| `E400` (NCE/NDE)                   | Prohibido          | No informar si `C002 != 5 o 6`           |
| `E500` (NRE)                       | Prohibido          | No informar si `C002 != 7`               |
| `E600` (condicion operacion)       | Requerido          | Obligatorio si `C002=1 o 4`              |
| `E700` (items)                     | Requerido          | `1-999` ocurrencias                      |
| `E720` (precio por item)           | Requerido          | Obligatorio si `C002 != 7`               |
| `E730` (IVA por item)              | Condicional        | Requerido segun `D013` (ver seccion 3.6) |
| `E900` (transporte)                | Opcional permitido | En FE esta permitido; no es obligatorio  |
| `E920` (local salida)              | Opcional permitido | En FE esta permitido                     |
| `E940` (local entrega)             | Opcional permitido | En FE esta permitido                     |
| `E960` (vehiculo)                  | Opcional permitido | En FE esta permitido                     |
| `E980` (transportista)             | Opcional permitido | En FE esta permitido                     |
| `F001` (totales)                   | Requerido          | Obligatorio si `C002 != 7`               |
| `G001` (complementarios generales) | Opcional           | Sin restriccion por `C002`               |
| `G050` (carga)                     | Opcional permitido | Solo permitido para `C002=1 o 7`         |
| `H001` (doc asociado)              | Opcional permitido | Opcional para `C002=1 o 7`               |
| `I001` (firma XMLDSig)             | Requerido          | Firma digital                            |
| `J001` (fuera de firma)            | Requerido          | QR y datos fuera de firma                |

## 3. Sub-discriminadores principales en FE

### 3.1 Operacion comercial (`D010`)

- `D011` (tipo de transaccion) es obligatorio para FE.
- `D013` (tipo de impuesto afectado) es obligatorio para FE.
- `D015` (moneda) abre rama de tipo de cambio:
  - Si `D015 != PYG` -> `D017` obligatorio.
  - Si `D017=1` (global) -> `D018` obligatorio, `E725` no debe existir.
  - Si `D017=2` (por item) -> `E725` obligatorio por item, `D018` no debe existir.
  - Si `D015=PYG` -> `D017`, `D018`, `E725`, `F023` no deben existir.

### 3.2 Receptor (`D200`) y tipo de operacion (`D202`)

Reglas que impactan FE aunque no dependan solo de `C002`:

- Si `D201=2` (no contribuyente) y `C002 != 4`, entonces `D202` debe ser `2` (B2C).
- Si `D202=4` (B2F), entonces `D201=2`.
- Si `D202=4`, direccion del receptor (`D213`) es obligatoria (en FE esta es la via principal para obligar `D213`).
- Si `D201=1` entonces `D205`/`D206` obligatorios y `D208`/`D210` no deben informarse.
- Si `D201=2` y `D202 != 4`, `D208` y `D210` obligatorios.

### 3.3 Grupo FE (`E010`)

- `E011` y `E012` requeridos en FE.
- `E013` opcional.
- `E020` (Compras Publicas) obligatorio si `D202=3` (B2G).
- Regla FE especifica de validacion: si `E606=16` (pago bancario), entonces `E011` debe ser `5` (operacion bancaria).

### 3.4 Condicion de operacion (`E600`)

En FE `E600` es obligatorio:

- `E601=1` (contado): `E605` obligatorio.
- `E601=2` (credito): `E640` obligatorio.
- Si `E601=2` y existe `E645` (entrega inicial), `E605` vuelve a ser obligatorio.
- Si `E601=2` y no existe `E645`, `E605` no debe informarse.
- Si `E641=2` (cuotas), `E650` obligatorio.

### 3.5 Items y precios (`E700`, `E720`, `EA...`)

- `E700` siempre requerido (al menos un item).
- `E720` obligatorio en FE (`C002 != 7`).
- `E715` (relevancia mercaderia) en la practica es solo NRE: para FE no debe informarse (validacion `C002!=7`).
- `EA008` (total item) depende de `D013`; para FE usar formula general (la formula simplificada de AFE aplica solo `C002=4`).
- Si existe `E725` (tipo cambio por item), `EA009` obligatorio.
- `E719` obligatorio cuando se usa FE asociada de anticipo (`D011` de FE asociada = 9).

### 3.6 IVA por item (`E730`)

Para FE (`C002=1`):

- Si `D013 in {1,3,4,5}` -> `E730` obligatorio.
- Si `D013=2` (ISC) -> `E730` no debe informarse.
- Dentro de `E730`, formulas de `E735` y `E736` dependen de `E731` y `E734`.

### 3.7 Transporte (`E900`, `E920`, `E940`, `E960`, `E980`)

Para FE, estos grupos estan permitidos de forma opcional.

- No son obligatorios por `C002=1`.
- Si se informan, se aplican sus obligatoriedades internas (por ejemplo `E903` y `E905` en `E900`, y campos requeridos dentro de subgrupos).
- En validaciones, estos grupos se vuelven obligatorios solo para `C002=7`.

### 3.8 Totales (`F001`)

- `F001` obligatorio en FE.
- `F023` obligatorio solo si `D015 != PYG`.
- Para FE, validacion de `F014`: cuando `C002=1` debe cumplir formula de FE/NCE/NDE (ver nota de inconsistencias).

### 3.9 Carga (`G050`)

- En FE esta permitido como opcional (`C002=1 o 7`).
- Para otros tipos (excepto NRE) se prohibe.

### 3.10 Documento asociado (`H001`)

- En FE `H001` es opcional (`0-99`).
- FE no puede usar `H002=3` (constancia electronica).
- Reglas de compatibilidad FE:
  - Si FE se asocia a NRE: `H002=1` con CDC de NRE, o `H002=2` con `H009=4`.
  - Si FE se asocia a FE: solo permitido cuando la FE asociada tenga `D011=9` (anticipo).
  - Si FE asociada (CDC inicia `01`) por anticipo, la moneda debe coincidir (`D015` asociado = `D015` actual).
- En FE no hay restriccion de cardinalidad a 1 documento asociado (esa restriccion aplica a `C002=4,5,6`).

## 4. Arbol de decision minimo para tipado FE

```text
Si C002 != 1 -> no es FE (descartar tipo FE)
Si C002 == 1:
  Requerir E010, E600, E700, E720, F001, D010
  Prohibir E300, E400, E500

  Rama moneda:
    D015==PYG -> prohibir D017/D018/E725/F023
    D015!=PYG -> exigir D017
      D017==1 -> exigir D018, prohibir E725
      D017==2 -> exigir E725 (por item), prohibir D018

  Rama impuesto:
    exigir D013
    D013 in {1,3,4,5} -> exigir E730
    D013==2 -> prohibir E730

  Rama condicion operacion:
    exigir E601
    E601==1 -> exigir E605
    E601==2 -> exigir E640
      si existe E645 -> exigir E605
      si no existe E645 -> prohibir E605

  Rama receptor:
    si D202==4 -> exigir D213 y D201==2
    si D201==2 y D202!=4 -> exigir D208 y D210
    si D201==1 -> exigir D205/D206 y prohibir D208/D210

  Rama asociados H001 (opcional):
    si H002==3 -> error en FE
    si H004 inicia 01 -> FE asociada debe tener D011=9 y misma D015
```

## 5. Inconsistencias / advertencias del manual convertido

- En `D3`, el markdown convertido repite `D213` para `dNumCasRec`; tratarlo como errata de conversion y apoyarse en validaciones (`D218` etc.) para modelar correctamente.
- En `E730` (tabla de formato), la condicion textual aparece ambigua (`C002 != 4 o 7`); la seccion de validaciones aclara explicitamente exclusion de `C002=3,4,7`.
- En `F014`, la descripcion de la tabla de formato y la formula de validacion no coinciden exactamente; para validar contra SIFEN conviene priorizar la regla de validacion `2365` y contrastar en pruebas de integracion.

## 6. Recomendacion para modelado de tipos

- Definir un tipo discriminado raiz por `C002`.
- Para `C002=1`, definir sub-uniones por:
  - `D015` + `D017` (moneda/tipo de cambio)
  - `D013` (impuesto)
  - `E601` (contado/credito)
  - `D201` + `D202` (perfil receptor)
  - `H001` presente/ausente + `H002` + prefijo CDC en `H004`
- Mantener validaciones de formula (`EA008`, `EA009`, `F008`, `F014`, `F023`) separadas de validaciones de presencia para facilitar debug.
