# Cómo agregar un nuevo tipo de Documento Electrónico

Esta guía describe los archivos que hay que crear o modificar para añadir un
nuevo tipo de DE (NotaCredito, NotaDebito, NotaRemision, etc.). Sigue los
patrones de FacturaElectronica (C002=1) y AutofacturaElectronica (C002=4).

---

## Resumen de archivos a tocar

| # | Archivo | Acción |
|---|---------|--------|
| 1 | `src/sifen/types/nuevo-de.ts` | **Crear** — tipo clean wrapper |
| 2 | `src/sifen/types/nuevo-de-input.ts` | **Crear** — tipo de input del usuario |
| 3 | `src/sifen/types/index.ts` | **Modificar** — agregar exports |
| 4 | `src/xml-gen/schema/nuevo-de.ts` | **Crear** — schema valibot + normalización |
| 5 | `src/xml-gen/schema/index.ts` | **Modificar** — agregar export |
| 6 | `src/xml-gen/derive/config.ts` | **Modificar** — agregar entrada en `configPorTipoDE` |
| 7 | `src/xml-gen/nuevo-de.ts` | **Crear** — función `buildNuevoDe()` |
| 8 | `src/xml-gen/index.ts` | **Modificar** — agregar export |

---

## Paso 1: Tipos — Clean wrapper (`nuevo-de.ts`)

Define el tipo que extiende `DEC` con los campos requeridos específicos de este
DE. Usá `OmitDeep` para quitar grupos que no aplican y `SetRequiredDeep` para
hacer obligatorios los que sí.

```typescript
// src/sifen/types/nuevo-de.ts
import type {
  DatosEspecificosPorTipoDE,
  DatosGeneralesOperacion,
  DEC,
  OperacionDE,
  Timbrado
} from './clean/de';
import type { SubtotalesTotales } from './clean/f';
import type { TipoDocumentoElectronicoLabel } from './enums';
import type { OmitDeep, SetRequired, SetRequiredDeep, Simplify, SimplifyDeep } from 'type-fest';

export type Timbrado_MiDE = Timbrado;
export type OperacionDE_MiDE = Simplify<SetRequired<OperacionDE, 'codigoSeguridad'>>;

export type DatosGeneralesOperacion_MiDE = SimplifyDeep<
  SetRequiredDeep<DatosGeneralesOperacion, 'operacionComercial' | 'emisor.digitoVerificadorEmisor'>
>;

// Acá va la parte más específica: qué grupos de E001 son obligatorios,
// cuáles se omiten, y qué campos de items son obligatorios.
export type DatosEspecificosPorTipoDE_MiDE = SimplifyDeep<
  SetRequiredDeep<
    OmitDeep<
      DatosEspecificosPorTipoDE,
      // Quitá los grupos que NO aplican a este tipo de DE.
      // Ej: para NCE/NDE omitir facturaElectronica, autofacturaElectronica,
      // notaRemisionElectronica.
      | 'facturaElectronica'
      | 'autofacturaElectronica'
      | 'notaRemisionElectronica'
    >,
    // Hacé obligatorios los grupos que SÍ aplican y los campos de items.
    | 'notaCreditoDebitoElectronica'
    | 'itemsOperacion'
    | `itemsOperacion.${number}.valorItem`
    | `itemsOperacion.${number}.valorItem.valorRestaItem.porcentajeDescuentoItem`
  >
>;

export interface MiDocumentoElectronico extends Omit<
  DEC,
  | 'operacionDE'
  | 'timbrado'
  | 'datosGeneralesOperacion'
  | 'datosEspecificosPorTipoDE'
  | 'subtotalesTotales'
> {
  tipoDE: Extract<TipoDocumentoElectronicoLabel, 'MiDocumentoElectronico'>;
  operacionDE: OperacionDE_MiDE;
  timbrado: Timbrado_MiDE;
  datosGeneralesOperacion: DatosGeneralesOperacion_MiDE;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_MiDE;
  subtotalesTotales: SubtotalesTotales;
}
```

### Campos que se suelen omitir de `DatosEspecificosPorTipoDE` según C002:

| Grupo en E001 | C002=1 (FE) | C002=4 (AFE) | C002=5,6 (NCE/NDE) | C002=7 (NRE) |
|---|---|---|---|---|
| `facturaElectronica` | Obligatorio | Omitir | Omitir | Omitir |
| `autofacturaElectronica` | Omitir | Obligatorio | Omitir | Omitir |
| `notaCreditoDebitoElectronica` | Omitir | Omitir | Obligatorio | Omitir |
| `notaRemisionElectronica` | Omitir | Omitir | Omitir | Obligatorio |
| `condicionOperacion` | Obligatorio | Obligatorio | Omitir | Omitir |
| `itemsOperacion` | Obligatorio | Obligatorio | Obligatorio | — |
| `transporte` | Opcional | Omitir | Omitir | Obligatorio |

---

## Paso 2: Tipos — Input (`nuevo-de-input.ts`)

Define qué campos puede proveer el usuario. Omití los campos que son derivados
por el engine (totalBrutoOperacionItem, porcentajeDescuentoItem,
valorTotalOperacionItem, baseGravadaIvaItem, etc.).

```typescript
// src/sifen/types/nuevo-de-input.ts
import type { OmitDeep } from 'type-fest';
import type { UsoGeneral } from './clean/g';
import type { DocumentoElectronicoAsociado } from './clean/h';
import type {
  OperacionDE_MiDE,
  Timbrado_MiDE,
  DatosGeneralesOperacion_MiDE,
  DatosEspecificosPorTipoDE_MiDE
} from './nuevo-de';
import type { DeepNumBig, NumBig } from './big';

export type OperacionDE_MiDE_Input = DeepNumBig<Omit<OperacionDE_MiDE, 'codigoSeguridad'>>;

export type Timbrado_MiDE_Input = Omit<Timbrado_MiDE, 'tipoDocumento'>;

type Emisor_MiDE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_MiDE['emisor'], 'digitoVerificadorEmisor'>
>;

type Receptor_MiDE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_MiDE['receptor'], 'digitoVerificadorReceptor'>
>;

export type DatosGeneralesOperacion_MiDE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_MiDE, 'emisor' | 'receptor'>
> & {
  emisor: Emisor_MiDE_Input;
  receptor: Receptor_MiDE_Input;
};

// Repetí para condicionOperacion, transporte, etc. si aplican.
// El patrón es igual al de factura-electronica-input.ts.

type ItemOperacion_MiDE_Input = DeepNumBig<
  OmitDeep<
    DatosEspecificosPorTipoDE_MiDE['itemsOperacion'][number],
    // Campos que el engine deriva automáticamente:
    | 'valorItem.totalBrutoOperacionItem'
    | 'valorItem.valorRestaItem.descuentoGlobalItem'
    | 'valorItem.valorRestaItem.porcentajeDescuentoItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItemGs'
    | 'ivaItem.baseGravadaIvaItem'
    | 'ivaItem.liquidacionIvaItem'
    | 'ivaItem.baseExenta'
  >
>;

// Armar el tipo compuesto para datosEspecificosPorTipoDE...
// (seguir patrón de factura-electronica-input.ts)

export interface MiDocumentoElectronicoInput {
  id_cdc: string;
  operacionDE: OperacionDE_MiDE_Input;
  timbrado: Timbrado_MiDE_Input;
  datosGeneralesOperacion: DatosGeneralesOperacion_MiDE_Input;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_MiDE_Input;
  subtotalesTotales: { comisionOperacion?: NumBig; porcentajeDescuentoGlobal?: NumBig };
  camposUsoGeneral?: UsoGeneral;
  camposDocumentoElectronicoAsociado?: DocumentoElectronicoAsociado;
}
```

### Campos que SIEMPRE van en el OmitDeep del item input:

Estos son derivados por el engine. El usuario nunca los provee:

- `valorItem.totalBrutoOperacionItem` (E727)
- `valorItem.valorRestaItem.descuentoGlobalItem` (EA004)
- `valorItem.valorRestaItem.porcentajeDescuentoItem` (EA003)
- `valorItem.valorRestaItem.valorTotalOperacionItem` (EA008)
- `valorItem.valorRestaItem.valorTotalOperacionItemGs` (EA009)

### Campos que van en el OmitDeep del item input SOLO si el DE tiene IVA:

- `ivaItem.baseGravadaIvaItem` (E735)
- `ivaItem.liquidacionIvaItem` (E736)
- `ivaItem.baseExenta` (E737)

---

## Paso 3: Registrar exports en `sifen/types/index.ts`

```typescript
export * from './nuevo-de';
export * from './nuevo-de-input';
```

---

## Paso 4: Schema valibot + normalización (`xml-gen/schema/nuevo-de.ts`)

Creá una función `normalizeMiDocumentoElectronico` que:
1. Clona el input y hace trim de strings
2. Setea `tipoDE`, `timbrado.tipoDocumento` al valor numérico correcto
3. Inicializa campos derivados a cero/undefined
4. Normaliza cada item (convierte `number` a `Big`, zerea campos derivados)
5. Normaliza condicionOperacion, transporte, etc. si aplican
6. Crea el objeto `subtotalesTotales` inicializado a cero (leyendo
   `porcentajeDescuentoGlobal` y `comisionOperacion` del input del usuario)

```typescript
// src/xml-gen/schema/nuevo-de.ts
import * as v from 'valibot';
import type { MiDocumentoElectronico, MiDocumentoElectronicoInput } from '../../sifen/types';
import { toBig, toOptionalBig } from '../big';
import { clone } from '../clone';
import { trimStrings } from '../trim';
import { enumsSchema } from './schema';

function normalizeItem(
  item: MiDocumentoElectronico['datosEspecificosPorTipoDE']['itemsOperacion'][number]
): void {
  item.cantidadProductoServicio = toBig(item.cantidadProductoServicio);
  // ... otras normalizaciones de cantidad, etc.
  const vi = item.valorItem;
  vi.precioUnitario = toBig(vi.precioUnitario);
  vi.tipoCambioItem = toOptionalBig(vi.tipoCambioItem);
  vi.totalBrutoOperacionItem = toBig(0);
  const vr = vi.valorRestaItem;
  vr.descuentoParticularItem = toOptionalBig(vr.descuentoParticularItem);
  vr.descuentoGlobalItem = toBig(0);            // ← siempre cero (derivado de F010)
  vr.anticipoParticularItem = toOptionalBig(vr.anticipoParticularItem);
  vr.anticipoGlobalItem = toOptionalBig(vr.anticipoGlobalItem);
  vr.porcentajeDescuentoItem = toBig(0);
  vr.valorTotalOperacionItem = toBig(0);
  vr.valorTotalOperacionItemGs = undefined;

  if (!item.ivaItem) return;
  item.ivaItem.proporcionGravadaIva = toBig(item.ivaItem.proporcionGravadaIva);
  item.ivaItem.baseGravadaIvaItem = toBig(0);
  item.ivaItem.liquidacionIvaItem = toBig(0);
  item.ivaItem.baseExenta = toBig(0);
}

export function normalizeMiDocumentoElectronico(
  input: MiDocumentoElectronicoInput
): MiDocumentoElectronico {
  const out = clone(input, 'input') as unknown as MiDocumentoElectronico;
  trimStrings(out);
  out.tipoDE = 'MiDocumentoElectronico';
  out.timbrado.tipoDocumento = /* valor numérico de C002 */;
  out.digitoVerificadorId = 0;
  out.fechaFirma = new Date(0);
  out.operacionDE.codigoSeguridad = 0;

  // Normalizar operacionComercial, emisor, receptor, condicionOperacion...
  // (copiar de factura-electronica.ts o autofactura-electronica.ts)

  for (const item of out.datosEspecificosPorTipoDE.itemsOperacion) normalizeItem(item);

  out.subtotalesTotales = {
    subtotalExenta: undefined,
    subtotalExonerada: undefined,
    subtotalIva5: undefined,
    subtotalIva10: undefined,
    totalBrutoOperacion: toBig(0),
    totalDescuentoParticular: toBig(0),
    totalDescuentoGlobal: toBig(0),
    totalAnticipoItem: toBig(0),
    totalAnticipoGlobal: toBig(0),
    porcentajeDescuentoGlobal: toBig(out.subtotalesTotales?.porcentajeDescuentoGlobal ?? 0),
    totalDescuentosOperacion: toBig(0),
    totalAnticiposOperacion: toBig(0),
    redondeoOperacion: toBig(0),
    comisionOperacion: toOptionalBig(out.subtotalesTotales?.comisionOperacion),
    totalNetoOperacion: toBig(0),
    liquidacionIva5: undefined,
    liquidacionIva10: undefined,
    liquidacionTotalIva5: undefined,
    liquidacionTotalIva10: undefined,
    liquidacionIvaComision: undefined,
    liquidacionTotalIva: undefined,
    totalBaseGravada5: undefined,
    totalBaseGravada10: undefined,
    totalBaseGravadaIva: undefined,
    totalOperacionGs: undefined
  };
  return out;
}

export const miDocumentoElectronicoSchema = v.pipe(
  enumsSchema,
  v.rawTransform(({ dataset, NEVER }) => {
    if (!dataset.typed) return NEVER;
    return normalizeMiDocumentoElectronico(
      dataset.value as unknown as MiDocumentoElectronicoInput
    );
  })
);
```

### Checklist de normalización por tipo de DE:

| Aspecto | FE | AFE | NCE/NDE | NRE |
|---------|----|-----|---------|-----|
| `tipoDocumento` numérico | 1 | 4 | 5 o 6 | 7 |
| Descuentos/anticipos en items | `toOptionalBig` | `undefined` (no aplican) | `toOptionalBig` | `undefined` (sin valorItem) |
| `porcentajeDescuentoGlobal` del input | Sí | Sí | Sí | N/A (sin subtotales) |
| IVA en items | Normalizar | No normalizar (sin IVA) | Normalizar | No normalizar |
| `condicionOperacion` | Normalizar | Normalizar (sin pagoCredito) | No | No |
| `transporte` | Normalizar transportista | No | No | Normalizar |

---

## Paso 5: Registrar schema en `xml-gen/schema/index.ts`

```typescript
export * from './nuevo-de';
```

---

## Paso 6: Config de derivación (`xml-gen/derive/config.ts`)

Agregar una entrada en `configPorTipoDE`. Cada campo describe qué fórmulas y
grupos aplican. Basarse en el MT v150 y las notas técnicas.

```typescript
MiDocumentoElectronico: {
  ea008Formula: 'estandar',          // 'estandar' o 'autofactura'
  aplicaValorItem: true,             // false solo para NRE (C002=7)
  aplicaIvaItem: true,               // false para C002=3,4,7
  aplicaCondicionOperacion: false,   // true solo para C002=1,4
  aplicaTransporte: false,           // true para C002=1,7
  aplicaSubtotales: true,            // false solo para C002=7
  subtotalesIncluyeIva: true,        // false para C002=3,4
  totalBrutoFormula: 'sumaSubtotales', // 'sumaSubtotales' o 'sumaItems'
  totalGsFormula: 'tipoCambio'       // 'tipoCambio' (normal) o 'igualF014' (solo AFE legacy)
},
```

### Valores típicos por C002:

| Campo | C002=1 (FE) | C002=4 (AFE) | C002=5,6 (NCE/NDE) | C002=7 (NRE) |
|-------|-------------|--------------|---------------------|--------------|
| `ea008Formula` | `'estandar'` | `'autofactura'` | `'estandar'` | `'estandar'` |
| `aplicaValorItem` | `true` | `true` | `true` | `false` |
| `aplicaIvaItem` | `true` | `false` | `true` | `false` |
| `aplicaCondicionOperacion` | `true` | `true` | `false` | `false` |
| `aplicaTransporte` | `true` | `false` | `false` | `true` |
| `aplicaSubtotales` | `true` | `true` | `true` | `false` |
| `subtotalesIncluyeIva` | `true` | `false` | `true` | `false` |
| `totalBrutoFormula` | `'sumaSubtotales'` | `'sumaItems'` | `'sumaSubtotales'` | `'sumaSubtotales'` |
| `totalGsFormula` | `'tipoCambio'` | `'tipoCambio'` | `'tipoCambio'` | `'tipoCambio'` |

---

## Paso 7: Función pública `buildNuevoDe()` (`xml-gen/nuevo-de.ts`)

```typescript
// src/xml-gen/nuevo-de.ts
import type { MiDocumentoElectronicoInput } from '../sifen/types';
import { miDocumentoElectronicoSchema } from './schema';
import { prepareDE, type PreparedDE } from './de-pipeline';
import type { Result } from '../result';
import type { XMLGenBuildError } from './errors';

export function buildMiDocumentoElectronico(
  input: MiDocumentoElectronicoInput
): Result<PreparedDE, XMLGenBuildError> {
  return prepareDE(input, miDocumentoElectronicoSchema, 'MiDocumentoElectronico');
}
```

El tercer argumento de `prepareDE` debe coincidir con la key del enum
`tipoDocumentoElectronico` (`enums.ts`) y con la key en `configPorTipoDE`
(`config.ts`).

---

## Paso 8: Registrar en `xml-gen/index.ts`

```typescript
export { buildMiDocumentoElectronico } from './nuevo-de';
```

---

## Paso 9 (opcional): Tests y factories

Crear factories en `src/test-utils/factories/base/` si el DE nuevo requiere
datos específicos que no están cubiertos por las factories genéricas (FE ya
cubre la mayoría).

Agregar tests de derivación en `src/xml-gen/derive/` que verifiquen:
- Las fórmulas de item (EA008, E735, E736) con la config del nuevo DE
- Los subtotales (F002-F026) se acumulan correctamente
- El pipeline completo produce un `PreparedDE` sin errores

Seguir el patrón de `item.test.ts` y `subtotal.test.ts`.

---

## Notas finales

- Los labels de `tipoDocumentoElectronico` en `enums.ts` ya cubren los 8 tipos
  (C002=1 a 8). No hace falta modificar el enum si solo se implementa un tipo
  existente.
- La función `prepareDE` en `de-pipeline.ts` es genérica y acepta cualquier
  tipo que extienda `DEC`. No necesita cambios.
- El orden de derivación en `derive.ts` es fijo para todos los tipos. La
  función `applyGlobalDiscountDerivedFields` (F010 → EA004) corre para todos.
- Si el nuevo DE no usa `subtotalesTotales` (C002=7), la derivación de
  subtotales sale temprano por `config.aplicaSubtotales: false`.
