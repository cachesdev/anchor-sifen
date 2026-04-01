# Manual para LLMs: Analisis de DE en Manual Tecnico 150

## Objetivo

Este manual explica como analizar el tipo `Documento Electronico (DE)` del Manual Tecnico 150 de forma rapida, consistente y con bajo consumo de contexto/tokens.

Esta guia esta pensada para generar archivos por tipo de DE (`C002`), por ejemplo:

- `C002=1` Factura Electronica
- `C002=4` Autofactura Electronica
- `C002=5` Nota de Credito Electronica
- etc.

## Resultado esperado

Cada analisis por tipo DE debe producir, como minimo:

- Discriminador principal (`C002`) y reglas base.
- Matriz de grupos: `Requerido`, `Opcional`, `Prohibido`, `Condicional`.
- Dependencias cruzadas entre ramas (ejemplo: `D015 -> D017 -> E725/F023`).
- Reglas de presencia y no-presencia por campo relevante.
- Formulas y reglas de calculo (si aplican).
- Arbol de decision para tipado/validacion.
- Inconsistencias detectadas en el manual convertido.

## Regla de oro de eficiencia

No leer completo `Manual Tecnico 150.md` de punta a punta.

Primero ubicar anclas con busqueda, luego leer ventanas de lineas alrededor de esas anclas.

## Fuentes a usar siempre

- `docs/Indice.md`
- `docs/Manual Tecnico 150.md`
- `docs/XML SIFEN Quirks.md` (apoyo para particularidades de formato/xml, no para reglas de negocio DE)
- Analisis previos en `docs/analisis-de-*.md` para mantener formato de salida uniforme.

## Flujo recomendado (token-efficient)

### Paso 1: Definir scope exacto

Definir explicitamente:

- Tipo objetivo (`C002` valor).
- Si el analisis incluye solo formato (`AA..J`) o tambien validaciones (`12.4`).
- Nivel de detalle esperado (grupo, campo, formula, todo).

### Paso 2: Mapear navegacion con el indice

Leer `docs/Indice.md` para localizar:

- Inicio de formato DE (`AA. Campos que identifican el formato electronico XML`).
- Seccion de validaciones (`12.4`).
- Pistas de paginado por pie de pagina (`septiembre de 2019 N`).

### Paso 3: Buscar anclas con regex

Usar busquedas para ubicar lineas relevantes antes de leer bloques.

Patrones utiles:

```bash
rg -n "C002|iTiDE|AA\. Campos|## AA\.|## 12\.4|Obligatorio si C002|No informar si C002|C002=|C002 !=" docs/Manual\ Tecnico\ 150.md
```

Para reglas por tipo objetivo (ejemplo `C002=1`):

```bash
rg -n "C002 ?= ?1|C002=1|C002 ?!= ?1|C002≠1|Factura Electronica" docs/Manual\ Tecnico\ 150.md
```

Para ramas clave:

```bash
rg -n "D010|D011|D013|D015|E010|E600|E700|E720|E730|E900|F001|G050|H001" docs/Manual\ Tecnico\ 150.md
```

### Paso 4: Leer solo ventanas de contexto

Leer bloques de 80 a 300 lineas alrededor de anclas.

Orden sugerido:

1. `AA` + `A` + `B` + `C` (estructura y discriminador).
2. `D` + `E` + `F` + `G` + `H` (reglas de formato).
3. `12.4` para los mismos IDs (reglas de validacion).

### Paso 5: Construir matriz por grupo

Para cada grupo (`D010`, `E010`, `E600`, etc.) decidir estado para el `C002` objetivo:

- `Requerido`
- `Opcional`
- `Prohibido`
- `Condicional`

La matriz debe ser la primera salida tecnica, porque ordena todo el resto del analisis.

### Paso 6: Extraer sub-discriminadores

Luego de la matriz, extraer dependencias que cambian estructura:

- Moneda / tipo de cambio (`D015`, `D017`, `D018`, `E725`, `F023`).
- Impuesto (`D013`, `E730`, subtotales IVA).
- Condicion de operacion (`E601`, `E605`, `E640`, `E650`).
- Receptor / tipo operacion (`D201`, `D202`, `D208`, `D210`, `D213`).
- Documento asociado (`H001`, `H002`, `H004`, etc.).

### Paso 7: Resolver conflictos de fuente

Si una regla de tabla de formato y otra de validacion difieren:

- Priorizar comportamiento de `12.4` para implementacion de validaciones.
- Mantener nota de conflicto en seccion de inconsistencias.

### Paso 8: Generar arbol de decision

Crear un arbol corto (if/then) para tipado y validacion.

Debe responder:

- Que se exige siempre para el `C002` objetivo.
- Que se prohibe siempre.
- Que depende de otros campos (condiciones).

### Paso 9: QA rapido

Antes de cerrar:

- Verificar que todas las ramas clave esten cubiertas.
- Verificar que no haya contradicciones internas en el analisis.
- Verificar que cada regla fuerte tenga ancla en manual (ID o texto).

## Reglas de normalizacion sugeridas

Convertir texto del manual a reglas canonicas:

- `Obligatorio si X` -> `requiredWhen(X)`
- `No informar si Y` -> `forbiddenWhen(Y)`
- `Obligatorio si existe Z` -> `requiredWhen(exists(Z))`
- `Debe ser ...` -> `constraint(...)`
- `Corresponde al calculo ...` -> `formula(...)`

Modelo sugerido (conceptual):

```ts
interface DERule {
  source: 'formato' | 'validacion';
  groupOrField: string; // Ej: E600, D015, H001
  kind: 'requiredWhen' | 'forbiddenWhen' | 'constraint' | 'formula';
  condition?: string; // Ej: C002==1 && D015!=PYG
  expression?: string; // Ej: F014 = F008 - F011 - F012 - F013
  note?: string;
}
```

## Estructura sugerida para cada archivo de analisis (`C002=x`)

Usar siempre la misma estructura:

1. Objetivo
2. Alcance y fuente
3. Discriminador principal
4. Matriz de grupos para `C002=x`
5. Sub-discriminadores principales
6. Arbol de decision minimo
7. Inconsistencias/advertencias
8. Recomendacion para modelado de tipos

## Quirks conocidos del repo/manual convertido

- El manual en markdown viene de PDF y contiene ruido de pie de pagina (`septiembre de 2019 N`).
- Hay repeticiones/duplicados de texto y algunos IDs problematicos por conversion.
- Se detecto una errata conocida en `D3` alrededor de `D213`/`dNumCasRec`.
- Hay condiciones textuales ambiguas en algunas tablas; validar contra `12.4`.

## Estrategia para no perder tiempo/contexto

- No abrir el manual completo.
- Buscar primero, leer despues.
- Trabajar por bloques (`C`, `D`, `E`, `F`, `H`, luego `12.4` de esos mismos bloques).
- Usar un formato de salida fijo para que futuros analisis sean comparables.
- Reutilizar el ultimo analisis del mismo repo como plantilla.

## Prompt base recomendado para futuros LLMs

```text
Analiza Manual Tecnico 150 para C002=<valor> y genera un archivo en docs con:
1) discriminador, 2) matriz de grupos requerido/opcional/prohibido/condicional,
3) dependencias cruzadas, 4) formulas aplicables, 5) arbol de decision,
6) inconsistencias del manual convertido.

No leas el manual completo. Usa Indice + busquedas regex + ventanas por linea.
Prioriza reglas de 12.4 cuando haya conflicto con tablas de formato.
```

## Checklist final (antes de entregar)

- Matriz de grupos completa para el `C002` objetivo.
- Ramas `D015`, `D013`, `E601`, `D201/D202`, `H001` evaluadas.
- Reglas de no-presencia (`No informar`) incluidas.
- Formulas clave identificadas.
- Conflictos documentados.
- Archivo guardado en `docs/` con nombre explicito por tipo o proposito.
