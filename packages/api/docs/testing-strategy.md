# Testing Strategy

## Overview

`@anchor-sifen/api` is a TypeScript library that generates, validates, signs, and submits SIFEN (Paraguay tax authority) electronic documents. It runs on **vitest v4.0.16** with test factories powered by `@faker-js/faker`.

The codebase is ~85% pure functions — most modules have zero I/O, zero network, and zero crypto side effects. This makes the vast majority of the code directly testable without mocking.

### Architecture

```
User Input (FacturaElectronicaInput)
  → [xml-gen] valibot schema validation → field calculation (Big.js) → business rule validation
  → [xml-gen] clean-to-raw mapping → XML serialization
  → [xml-sign] XAdES digital signature (RSA-SHA256, C14N)
  → [qr] QR code URL generation and attachment
  → [soap] SOAP client → SIFEN API  ← UNTESTABLE (see below)
```

### Module Map

| Module         | Files     | Side Effects                                   | Testability                                                                       |
| -------------- | --------- | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `xml-gen/`     | 33 files  | `crypto.getRandomValues()` + `new Date()` only | Fully testable with minimal mocking                                               |
| `xml-sign/`    | 2 files   | RSA signing via `xml-crypto`                   | Testable with self-signed test keys                                               |
| `qr/`          | 2 files   | `crypto.createHash('sha256')` (deterministic)  | Fully testable                                                                    |
| `certificate/` | 2 files   | `readFileSync` + forge PKCS#12 parsing         | Needs small refactor or test key material                                         |
| `soap/`        | 13 files  | HTTPS SOAP calls, TLS client certs             | **Service clients NOT testable** (per scope); parsers and validators ARE testable |
| `client/`      | 2 files   | Composes all of the above                      | Testable with mocked sub-modules                                                  |
| `sifen/types/` | ~20 files | None (type definitions only)                   | N/A                                                                               |
| `gen/`         | 12+ files | None (static reference data)                   | N/A                                                                               |
| `result.ts`    | 1 file    | None                                           | Trivially testable                                                                |
| `test-utils/`  | 13 files  | None                                           | Already tested                                                                    |

### What Cannot Be Tested

The `soap` module's service clients (`consulta-ruc.ts`, `consulta.ts`, `consulta-lote.ts`, `recibe.ts`, `recibe-lote.ts`, `evento.ts`, `client.ts`) make actual HTTPS SOAP calls to the SIFEN API with TLS client certificate authentication. These are excluded from the test plan by design — mocking the `soap` npm package, the underlying HTTP layer, and the WSDL-based client generation is disproportionate effort and the API itself is not accessible.

However, the SOAP module's **parsers, validators, and error types** ARE testable and ARE included.

### Existing Testing Assets

| Asset                             | What It Provides                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| Vitest v4.0.16                    | Test runner, already configured (`"test": "vitest"`)                                             |
| 31 base factories                 | Generate complete "clean" type objects (with `Big` values, random enums, all fields populated)   |
| 15 input factories                | Generate user-facing `FacturaElectronicaInput` objects (auto-calc fields stripped, `Big→NumBig`) |
| `factories.test.ts`               | 17 existing tests validating factory output shapes + a smoke test over all 31 base factories     |
| `faker` v10.4.0                   | Used by factories for random data generation                                                     |
| `createFacturaElectronicaInput()` | Single call produces a fully valid input ready for `buildFacturaElectronica()`                   |

---

## Testing Phases

### Phase 1: Pure Logic Unit Tests

**Goal:** Cover all utility functions that have zero side effects and zero dependencies.
**Complexity:** Low. No mocking required.
**Estimated tests:** ~45

These provide quick wins and catch regressions in foundational code used everywhere.

#### 1a. `result.ts` — Result type factories

- `Ok()` sets `success: true` and stores the value
- `Err()` sets `success: false` and stores the error
- Discriminated union narrowing works correctly (`if (result.success)` narrows to value branch)
- `Ok` with different types (string, number, object, undefined legal values)
- `Err` with different error types

#### 1b. `big.ts` — Big.js wrappers

- `toBig(number)` produces a `Big` instance
- `toBig(Big)` returns the same instance (identity)
- `toOptionalBig(number)` returns `Big` instance
- `toOptionalBig(undefined)` returns `undefined`
- `toOptionalBig(null)` returns `undefined`
- `bigOrZero(number)` returns `Big` instance
- `bigOrZero(undefined)` returns `Big(0)` (zero fallback)
- `bigOrZero(null)` returns `Big(0)`
- `ZERO`, `ONE`, `HUNDRED` are correctly typed `Big` constants

#### 1c. `ruc.ts` — RUC parsing and DV calculation

- `extraerRuc("1234567-8")` → `"1234567"`
- `extraerRuc("12345678-9")` → `"12345678"`
- `extraerRuc(" 80001234-5 ")` → `"80001234"` (trims whitespace)
- `extraerRuc("80001234")` → `"80001234"` (no dash, returns as-is)
- `calcularDv("1234567")` returns correct modulo 11 digit
- `calcularDv("80001234")` returns correct modulo 11 digit
- `calcularDv` with max base parameter
- `calcularDv` with alphanumeric input (expands chars to ASCII codes)
- `calcularDv` with known SIFEN RUC examples (verify against spec)
- `calcularDv` edge case: remainder 0 or 1 → DV = 0

#### 1d. `soap/validation.ts` — SOAP input validation

- `escapeXml("foo & bar")` → `"foo &amp; bar"` (ampersand)
- `escapeXml("a < b > c")` → `"a &lt; b &gt; c"` (angle brackets)
- `escapeXml('say "hello"')` → `"say &quot;hello&quot;"` (double quotes)
- `escapeXml("plain text")` → `"plain text"` (no entities needed)
- `escapeXml("")` → `""` (empty string)
- `normalizeSignedXml(validXml)` returns trimmed XML string
- `normalizeSignedXml(emptyString)` throws (non-empty validation)
- `normalizeSignedXml(whitespace)` throws (trimmed to empty)
- `normalizeSignedXml(xmlOver1MB)` throws (size limit)
- `normalizeControlId("12345")` returns `"12345"` (valid numeric)
- `normalizeControlId(undefined)` auto-generates a timestamp-based ID
- `normalizeControlId("abc")` throws (non-numeric)
- `normalizeControlId("1234567890123456")` throws (exceeds 15 digits)

#### 1e. `soap/errors.ts` — Error mapping

- `mapSoapError` with message containing `ENOTFOUND` → Spanish connection error
- `mapSoapError` with message containing `ECONNREFUSED` → Spanish connection error
- `mapSoapError` with message containing `ETIMEDOUT` → Spanish connection error
- `mapSoapError` with message containing `socket hang up` → Spanish connection error
- `mapSoapError` with unknown error → preserves original message with "Error de request SIFEN:" prefix

#### 1f. `soap/sifen-error.ts` — SifenError class

- Constructor sets `sifenCodigo`, `sifenMessage`, `details`, `rawObject`
- `isSifenRejection` returns `true` when `sifenCodigo` is defined
- `isSifenRejection` returns `false` when `sifenCodigo` is undefined
- `message` uses `sifenMessage` when available
- `message` falls back to `details` when `sifenMessage` is undefined
- `message` falls back to default when both are undefined
- `name` is `"SifenError"`

#### 1g. `xml-gen/derive/config.ts` — Derivation configuration

- `obtenerConfig('FacturaElectronica')` returns config with `ea008Formula: 'standard'`
- `obtenerConfig('AutofacturaElectronica')` returns config with `ea008Formula: 'autofactura'`
- `obtenerConfig('NotaCreditoElectronica')` returns correct config
- `obtenerConfig('NotaDebitoElectronica')` returns correct config
- `obtenerConfig('NotaRemisionElectronica')` returns correct config
- `obtenerConfig` for each of the 8 defined DE types returns non-null config
- `obtenerConfig` with unknown type throws or returns undefined (verify behavior)
- Each config has all required fields: `ea008Formula`, `aplicaValorItem`, `aplicaIvaItem`, `aplicaCondicionOperacion`, `aplicaTransporte`, `aplicaSubtotales`, `subtotalesIncluyeIva`, `totalBrutoFormula`, `totalGsFormula`

---

### Phase 2: Validation & Mapping Tests

**Goal:** Cover the computational core — schema validation, clean-to-raw mapping, business rule engine.
**Complexity:** Low-Medium. Uses factories for test data, all functions are pure.
**Estimated tests:** ~55

#### 2a. `xml-gen/validation/runner.ts` — Rule execution engine

- `validate(doc, rules)` returns empty array when all rules pass
- `validate(doc, rules)` returns error when a rule's `check()` returns `false`
- `validate(doc, rules)` skips rule when `when()` returns `false` (even if `check()` would fail)
- `validate(doc, rules)` collects errors from multiple failing rules
- `validate(doc, rules)` catches thrown errors in `check()` and produces error entries
- `validate(doc, rules)` catches thrown errors in `when()` and produces error entries
- `validate(doc, rules)` includes `id`, `message`, and `rule.description` in error objects
- `validateItems(doc, items, rules)` applies rules to each item with correct index
- `validateItems` skips items where `when()` returns false
- `validateItems` combines document and item context correctly

#### 2b. `xml-gen/mapper/helpers.ts` — Mapper utilities

- `parseRuc("1234567-8")` → `{ ruc: "1234567", dv: "8" }`
- `parseRuc("8000123-5")` → `{ ruc: "8000123", dv: "5" }`
- `parseRuc` with no dash → throws or returns whole string as `ruc`
- `bigToFixed(Big("123.456"), 2)` → `"123.46"` (rounding)
- `bigToFixed(Big("100"), 0)` → `"100"` (integer)
- `optionalBigToFixed(Big("50"), 2)` → `"50.00"`
- `optionalBigToFixed(undefined, 2)` → `undefined`
- `formatDateTime(new Date(2024, 0, 15, 10, 30, 0))` → correct ISO string in `America/Asuncion` timezone
- `formatDateTime(undefined)` → `undefined`
- `formatDateOnly(new Date(2024, 0, 15))` → `"2024-01-15"` format
- `formatDateOnly(undefined)` → `undefined`
- `resolveRequiredDescription` resolves known currency code → description
- `resolveRequiredDescription` throws on unknown code
- `resolveOptionalDescription` resolves known code → description
- `resolveOptionalDescription` returns `undefined` on unknown code
- `resolveCurrencyDescription`, `resolveCountryDescription`, `resolveDepartmentDescription`, `resolveDistrictDescription`, `resolveCityDescription` — each resolves known codes
- `requireDefined(value)` returns value when defined, throws when undefined
- `resolveRequiredNumericDv` / `resolveOptionalNumericDv` / `resolveOptionalStringDv` — correct DV resolution from ParsedRuc

#### 2c. `xml-gen/mapper/de.ts` — Top-level DE mapping

- `mapTimbradoToRaw()` pads `establecimiento` to 3 characters with leading zeros
- `mapTimbradoToRaw()` pads `puntoExpedicion` to 3 characters with leading zeros
- `mapTimbradoToRaw()` pads `numeroDocumento` to 7 characters with leading zeros
- `mapTimbradoToRaw()` formats `fechaInicioVigencia` as date-only
- `mapOperacionDEToRaw()` transfers all fields correctly
- `mapDatosGeneralesOperacionToRaw()` delegates to sub-mappers

#### 2d. `xml-gen/mapper/d.ts` — Emisor/Receptor/OperacionComercial mapping

- `mapEmisorToRaw()` parses RUC correctly, resolves DV
- `mapEmisorToRaw()` maps 17+ fields (nombre, direccion, telefono, correo, etc.)
- `mapEmisorToRaw()` maps nested `actividadesEconomicas` array
- `mapEmisorToRaw()` maps nested `responsableDE`
- `mapEmisorToRaw()` resolves department/city descriptions
- `mapReceptorToRaw()` maps with RUC present (includes DV)
- `mapReceptorToRaw()` maps without RUC (no DV, no RUC fields in output)
- `mapReceptorToRaw()` handles `naturalezaReceptor` correctly
- `mapOperacionComercialToRaw()` maps currency, exchange rate, obligations
- `mapOperacionComercialToRaw()` resolves currency/country descriptions

#### 2e. `xml-gen/mapper/e.ts` — Items, IVA, Transporte, Condicion mapping

Key mappers to test (19 total — cover the critical ones thoroughly, spot-check the rest):

- `mapItemOperacionToRaw()` — codigo, descripcion, unidadMedida, cantidad, pais
- `mapValorItemToRaw()` — precioUnitario, totalBruto as fixed strings
- `mapValorRestaItemToRaw()` — descuentos, anticipos, totales as fixed strings
- `mapIvaItemToRaw()` — tasa, baseGravada, liquidacion, baseExenta
- `mapIvaItemToRaw()` — formaAfectacionTributaria with label lookup
- `mapCondicionOperacionToRaw()` — Condicion = Contado with 1 pago
- `mapCondicionOperacionToRaw()` — Condicion = Credito with cuotas
- `mapPagoContadoEntregaInicialToRaw()` — all tipoPago variants
- `mapPagoTarjetaCreditoDebitoToRaw()` — tarjeta fields
- `mapPagoChequeToRaw()` — cheque fields
- `mapTransporteToRaw()` — modalidad, responsable, transportista
- `mapTransportistaToRaw()` — all transportista fields with optional DV

#### 2f. `xml-gen/mapper/f.ts` — Subtotal mapping

- `mapSubtotalesTotalesToRaw()` maps all 22 subtotal fields from `Big` to fixed-decimal strings
- Verify precision: 2 decimal places for currency amounts
- Verify rounding behavior at boundary values
- Verify handling of zero values

#### 2g. `xml-gen/mapper/g.ts` & `h.ts` — Uso general / Documento asociado

- `mapUsoGeneralToRaw()` maps all uso general fields
- `mapCargaToRaw()` maps carga fields
- `mapDocumentoElectronicoAsociadoToRaw()` maps tipo and conditional fields

---

### Phase 3: Derivation Logic Tests

**Goal:** Validate all tax/math calculations — this is the highest-value phase, as the formulas implement SIFEN MT v150 spec pages 87-103.
**Complexity:** Medium. Requires `Date` and `crypto` mocking for 2 of the 5 sub-modules.
**Estimated tests:** ~50

**Mocking setup:**

```ts
// For base.ts: Freeze time
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

// For operacion-de.ts: Deterministic random
vi.stubGlobal('crypto', {
  getRandomValues: (arr: Uint32Array) => {
    arr[0] = 123456789; // Fixed seed
    return arr;
  }
});
```

#### 3a. `xml-gen/derive/base.ts` — Base derived fields

- Sets `fechaFirma` to current date/time (verify with frozen timers)
- Parses last character of `id_cdc` as `digitoVerificadorId` (numeric)
- Handles `id_cdc` where last char is not a digit (verify behavior)
- Mutates the input object in place (verify no new object created)

#### 3b. `xml-gen/derive/operacion-de.ts` — Codigo de seguridad

- Generates a `codigoSeguridad` in range 100000000 to 999999999 (9 digits)
- Generated code is an integer (no decimals)
- Each call produces a different value (with real crypto; test determinism with mocked crypto)
- Does not overwrite existing `codigoSeguridad` if already set (verify behavior)

#### 3c. `xml-gen/derive/ruc-dv.ts` — RUC DV derivation

- Derives emisor DV from `rucEmisor` (always)
- Derives receptor DV from `rucReceptor` when present
- Derives procesadora tarjeta DV when condicion operacion applies
- Derives transportista/agente DVs when transporte applies
- Does NOT derive DV when RUC is undefined
- Verify DV values match `calcularDv` output (cross-check with Phase 1)
- Each derived DV is a number, not a string

#### 3d. `xml-gen/derive/item.ts` — Per-item calculations (MT v150, p.87-91)

Test each formula independently with hand-calculated expected values:

- **E727 `totalBrutoOperacionItem`** = `precioUnitario * cantidad`
  - Test: precio=5000, cantidad=3 → 15000
  - Test: precio=100.50, cantidad=2 → 201
  - Test: cantidad=0 → 0
  - Test: precio=0 → 0

- **EA003 `porcentajeDescuentoItem`** = `(descParticular * 100) / precioUnitario`
  - Test: desc=1000, precio=10000 → 10
  - Test: desc=0 → 0
  - Test: desc=precio → 100

- **EA008 `valorTotalOperacionItem`** (standard formula):
  - = `(precioUnitario - descParticular - descGlobal - anticParticular - anticGlobal) * cantidad`
  - Test: precio=10000, descParticular=1000, descGlobal=500, anticParticular=0, anticGlobal=0, cantidad=2 → 17000
  - Test: all discounts zero → precioUnitario \* cantidad
  - Test: discounts exceed price → negative (verify clamping behavior if any)

- **EA008 `valorTotalOperacionItem`** (autofactura formula):
  - = `precioUnitario * cantidad` (no discounts applied)
  - Test: same input as standard — different result

- **EA009 `valorTotalOperacionItemGs`** = `EA008 * tipoCambioItem` (when tipoCambioItem defined)
  - Test: EA008=17000, tipoCambio=7500 → 127500000
  - Test: tipoCambio not defined → EA009 undefined

- **E735 `baseGravadaIvaItem`** (NT-13 formula):
  - `[100 * EA008 * proporcionGravada] / [10000 + (tasa * proporcionGravada)]`
  - Test: EA008=100000, proporcion=100, tasa=10 → ~9090.91
  - Test: proporcion=0 → 0
  - Test: tasa=5 → different value

- **E736 `liquidacionIvaItem`** = `baseGravada * tasa / 100`
  - Test: base=9090.91, tasa=10 → 909.091
  - Test: base=0 → 0

- **E737 `baseExenta`** — only set when `GravadoParcial` (E731=4)
  - Test: E731=4 → baseExenta = EA008 - baseGravada
  - Test: E731=1 (Gravado) → baseExenta = 0 or undefined (verify)

- **All derivations** use `Big` for precision; verify no floating-point errors
- **Big.js rounding:** verify rounding mode (ROUND_HALF_UP, etc.)

#### 3e. `xml-gen/derive/subtotal.ts` — Subtotal/total accumulation (MT v150, p.92-103)

- **Item classification by IVA type:**
  - Exento → accumulates to `subtotalExenta`
  - Exonerado → accumulates to `subtotalExonerada`
  - Gravado 5% → accumulates to `subtotalGravada5`
  - Gravado 10% → accumulates to `subtotalGravada10`
  - GravadoParcial → splits into gravada + exenta portions

- **F008 `totalBrutoOperacion`** = sum of all `totalBrutoOperacionItem` (E727)

- **F009-F012** = accumulated descuentos/anticipos (total, particular, global)

- **F013 `redondeo`** (MT v150, p.102-103):
  - PYG: round to multiples of 50
    - Test: 10025 → redondeo = -25 (rounds to 10000)
    - Test: 10049 → redondeo = -49 (rounds to 10000)
    - Test: 10050 → redondeo = 0 (already multiple of 50)
    - Test: 10051 → redondeo = -1 (rounds to 10050)
  - Foreign currency: round to multiples of 0.50
    - Test: 10.30 → redondeo = -0.30
    - Test: 10.60 → redondeo = -0.10
    - Test: 10.50 → redondeo = 0

- **F014 `totalNeto`** = F008 - F009 - F010 - F011 - F012 + F025 + F013 (verify sign conventions)

- **F015 `liquidacionIva5`** / **F016 `liquidacionIva10`** = sum of E736 per rate

- **F017 `totalIVA`** = F015 + F016

- **F018 `baseGravada5`** / **F019 `baseGravada10`** = sum of E735 per rate

- **F020 `totalBaseGravada`** = F018 + F019

- **F023 `totalOperacionGs`** (MT v150, p.93):
  - When `condicionTipoCambio` is 1 or 4: F023 = F014 \* tipoCambio
  - When `condicionTipoCambio` is 2: F023 = sum of EA009 (item-level Gs totals)

- **F025 `comision`** and **F026 `ivaComision`** — verify accumulation

- **Integration:** Feed a document with 2 items through `applyItemDerivedFields` then `applySubtotalesDerivedFields` and verify all subtotals match hand-calculated values

#### 3f. `xml-gen/derive/derive.ts` — Calculation orchestrator

- `calculateFields()` clones the input before mutating (verify no mutation of input)
- Derivation order: base → operacion-de → ruc-dv → item → subtotal (verify order matters)
- `calculateFieldsResult()` returns `Ok(result)` on success
- `calculateFieldsResult()` returns `Err(XMLGenCalculationError)` on exception
- Error preserves the cause chain for debugging

---

### Phase 4: XML Generation Pipeline & API Response Parsers

**Goal:** Test schema validation, the full `prepareDE` pipeline, XML serialization, and SOAP response parsing.
**Complexity:** Medium. Uses factories for input; mock `Date` and `crypto` for derivation.
**Estimated tests:** ~40

#### 4a. `soap/response-parsers.ts` — SOAP response parsing

All 6 parsers accept `raw: unknown` (plain object). Test both success and failure paths.

- **`parseRecibeLote(raw)`:**
  - Returns `Ok` when `dCodRes === '0300'` with all fields present
  - Returns `Ok` with optional fields (`dProtConsLote`, `dTpoProces`)
  - Returns `Err` when `dCodRes !== '0300'` (SIFEN rejection)
  - Returns `Err` when `raw` is not an object
  - Returns `Err` when required fields are missing
  - Returns `Err` when field types are wrong (e.g., number instead of string)

- **`parseConsultaRuc(raw)`:**
  - Returns `Ok` when `dCodRes === '0502'` with RUC container present
  - Returns `Ok` when `dCodRes === '0502'` without RUC container
  - Returns `Err` on wrong result code
  - Verifies nested `xContRUC` parsing (dRUCCons, dRazCons, dCodEstCons, etc.)

- **`parseConsultaDE(raw)`:**
  - Returns `Ok` when `dCodRes === '0422'`
  - Verifies `dFecProc` is parsed as `Date`
  - Verifies `xContenDE` XML string is preserved
  - Returns `Err` on wrong result code

- **`parseConsultaLote(raw)`:**
  - Returns `Ok` when `dCodResLot === '0362'`
  - Verifies `gResProcLote` array parsing with multiple items
  - Verifies nested `gResProc` validations inside each lote result
  - Returns `Err` on wrong result code

- **`parseRecibe(raw)`:**
  - Returns `Ok` when `dEstRes === 'Aprobado'`
  - Returns `Ok` when `dEstRes === 'Aprobado con observación'`
  - Returns `Err` on rejected estado
  - Verifies `rProtDe` access path

- **`parseEvento(raw)`:**
  - Returns `Ok` when ALL results have `estado` starting with `"Aprobado"`
  - Returns `Err` when ANY result has non-approved estado
  - Verifies `gResProcEVe` array parsing

#### 4b. `xml-gen/schema/` — Schema validation and normalization

- **`normalizeFacturaElectronica(input)`:**
  - Sets `tipoDE = 'FacturaElectronica'` and `tipoDocumento = 1`
  - Seeds `digitoVerificadorId = 0`, `fechaFirma = new Date(0)`, `codigoSeguridad = 0`
  - Converts all numeric fields to `Big` instances
  - Seeds subtotales with zeros and Big values
  - Erases `digitoVerificadorProcesadoraTarjeta` on credit/debit cards
  - Erases transportista DVs
  - Does not mutate the input (uses `structuredClone`)

- **`normalizeAutofacturaElectronica(input)`:**
  - Sets `tipoDocumento = 4`
  - Sets descuentos/anticipos to `undefined` instead of 0 (AFE no discounts)
  - Sets `totalGsFormula` to `'igualF014'`
  - Same cloning/normalization patterns as FE

- **`facturaElectronicaSchema`** (valibot):
  - `v.safeParse(schema, validInput)` → success with filled optional fields
  - `v.safeParse(schema, {})` → failure with issues for missing required fields
  - `v.safeParse(schema, inputWithWrongEnum)` → failure with enum validation error

- **`autofacturaElectronicaSchema`** (valibot):
  - Same pattern as FE schema

- **`enumsSchema`:**
  - All 42+ enum fields accept valid codes
  - All enum fields reject invalid codes

#### 4c. `xml-gen/de-pipeline.ts` — Full `prepareDE` pipeline

- **Success path:**
  - `prepareDE(validInput, schema, 'FacturaElectronica')` returns `Ok(PreparedDE)`
  - Result has `raw`, `cdc`, and all required fields
  - `raw` contains the mapped-to-raw DE structure
  - `cdc` matches the input `id_cdc`

- **Input validation failure:**
  - `prepareDE(invalidInput, schema, ...)` returns `Err(XMLGenInputValidationError)`
  - Error contains valibot issue details

- **Calculation failure:**
  - `prepareDE(validatedButProblematic, ...)` returns `Err(XMLGenCalculationError)`

- **Business validation failure:**
  - When a business rule fails, returns `Err(XMLGenBusinessValidationError)`
  - Error contains array of `ValidationError` objects

- **Mapping failure:**
  - `prepareDE` with missing required description → `Err(XMLGenMappingError)`

- **Error serialization:**
  - `serializeError(XMLGenBuildError)` produces a plain object with `name`, `message`, `details`, `issues`, `cause`
  - Nested causes are recursively serialized
  - Non-error types are safely serialized

#### 4d. `xml-gen/generator.ts` — XML generation

- `generateDEXML({ raw, cdc })` produces a valid XML string
- XML contains correct namespace declarations (`SIFEN_XSD_NAMESPACE`, `XSI_NAMESPACE`)
- XML contains correct `schemaLocation`
- CDC is in the `DE` element's `Id` attribute
- Date fields are in the correct format
- Special characters in text content are XML-escaped
- Produces well-formed XML (parseable by any XML parser)
- Verify output against known-good XML structure
- `buildFacturaElectronica(input)` → XML is structurally complete (test via `parseAndVerify`)

#### 4e. `xml-gen/errors.ts` — Error classes and serialization

- `XMLGenInputValidationError` factory creates errors with issues
- `XMLGenCalculationError` factory creates calculation errors
- `XMLGenBusinessValidationError` factory creates validation errors
- `XMLGenMappingError` factory creates mapping errors
- `XMLGenBuildError` union type covers all 4 variants
- `serializeError` handles each error type:
  - Preserves `name`, `message`, `details` fields
  - Preserves `issues` array for validation errors
  - Recursively serializes nested `cause` errors
  - Handles circular references safely (verify behavior)
  - Handles non-error objects (plain objects, primitives)

#### 4f. `client/` — `buildLote` function

- `buildLote([xml1])` produces a valid `<rLoteDE>` XML envelope
- `buildLote([xml1, xml2])` wraps multiple DEs in one lote
- `buildLote([])` produces empty envelope
- XML declarations (`<?xml ...?>`) are stripped from each DE
- Output XML is well-formed

---

### Phase 5: Signing, QR, Certificate, and Integration

**Goal:** End-to-end testing of the signing, QR generation, and certificate modules.
**Complexity:** High. Requires test key material generation and/or small refactors.
**Estimated tests:** ~30

#### 5a. `certificate/certificate-manager.ts` — Certificate operations

**Refactoring needed:** Add `loadPKCS12FromBuffer(buffer: Buffer, password: string)` to accept pre-loaded bytes instead of only file paths. Tests can generate key material in memory using `node-forge` (already a dependency).

- **`pemToBase64(pem)`:**
  - Strips `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`
  - Strips whitespace and newlines
  - Produces a single-line base64 string

- **`extractCI(cert)`:**
  - Extracts CI from subject `serialNumber` attribute (OID 2.5.4.5) with `"CI"` prefix
  - Extracts CI from Subject Alternative Name when serialNumber not present
  - Handles missing CI (verify behavior — throw or undefined?)
  - Handles CI without `"CI"` prefix (verify behavior)

- **`validateCertificate(certData)`:**
  - Valid certificate (notBefore < now < notAfter) passes without throwing
  - Expired certificate throws `CertError`
  - Not-yet-valid certificate throws `CertError`
  - `CertError` includes descriptive message about the validity range

- **`loadPKCS12FromBuffer(buffer, password)`:**
  - Successfully loads a valid PKCS#12 buffer
  - Returns complete `CertificateData` with all fields populated
  - `ci` is extracted correctly
  - Wrong password throws
  - Corrupted buffer throws

#### 5b. `xml-sign/xml-signer.ts` — XML digital signature

**Setup:** Generate a self-signed X.509 certificate + RSA key pair in test setup. Can use `node-forge` (already a dependency) to create a 2048-bit RSA test key.

**Refactoring needed:** Extract `extractCDC(doc: Document): string` and `extractDigestValue(signedXml: string): string` as exported functions.

- **`extractCDC(doc)`:**
  - Extracts CDC from `DE` element's `Id` attribute
  - Validates CDC is exactly 44 characters
  - Throws on missing `DE` element
  - Throws on missing `Id` attribute
  - Throws on wrong-length CDC

- **`extractDigestValue(signedXml)`:**
  - Extracts `DigestValue` from a signed XML document
  - Handles namespace-prefixed `DigestValue` elements
  - Handles non-prefixed `DigestValue` elements (fallback)
  - Returns the base64-encoded digest string

- **`sign(xml, certData)`:**
  - Returns `Ok(SignedDocumentResult)` with `signedXml`, `digestValue`, and `cdc`
  - `signedXml` contains `<Signature>` element after the `DE` element
  - Signed XML is well-formed and parseable
  - Signature references the CDC in the URI attribute
  - Returns `Err(XMLSignError)` on malformed input XML
  - Returns `Err(XMLSignError)` when certificate data is invalid

- **`verifySignature(signedXml, certData)`:**
  - Returns `true` for a validly-signed document
  - Returns `false` for a tampered document
  - Returns `false` when using wrong certificate
  - Does not throw (always returns boolean)

#### 5c. `qr/qr-generator.ts` — QR generation

**Setup:** Feed a signed XML (generated via the pipeline in test setup, or a pre-made fixture).

- **`extractQRData(doc)`:**
  - Extracts `cdc`, `fechaEmision`, `rucReceptor`, `totalOperacion`, `totalIVA`, `cantidadItems`, `digestValue`
  - Throws on missing required fields when `required=true` (default)
  - Handles optional `rucReceptor` (not always present)

- **`buildQRUrl(data, idCSC, csc, env)`:**
  - Produces a URL with correct base per environment (`test` vs `prod`)
  - URL includes all hex-encoded parameters
  - URL includes a SHA-256 hash (`cHashQR`) that matches hand-calculated hash
  - Hash is case-insensitive hex

- **`attachQRToSignedXML(signedXml, idCSC, csc, env)`:**
  - Returns `Ok(modifiedXml)` with `<gCamFuFD>` element appended
  - `<dCarQR>` inside contains the QR URL
  - Original XML structure is otherwise preserved
  - Returns `Err(QRGenError)` on invalid XML

- **`getQRUrl(signedXml, idCSC, csc, env)`:**
  - Returns `Ok(urlString)` with the QR consultation URL
  - Does NOT modify the XML (returns only the URL string)
  - Returns `Err(QRGenError)` on invalid XML

- **Integration:** Build → Sign → AttachQR full chain:
  - `buildFacturaElectronica(input)` → sign → attachQR → verify QR element present
  - Verify `getQRUrl` produces URL that matches `attachQRToSignedXML` embedded URL

#### 5d. `client/sifen-client.ts` — SifenAPI composition root

**Setup:** Inject `certificateData` directly to bypass file I/O. Mock `SifenSoapClient` sub-clients.

- **Constructor:**
  - With `certificateData` → does not attempt file I/O
  - With `certificatePath` + `certificatePassword` → delegates to `CertificateManager`
  - Missing both → throws (verify behavior)

- **`signXML(xml)`:**
  - Delegates to `XMLSigner.sign()`
  - Returns `Result<string, XMLSignError>` (wraps the signed XML only)

- **`generateQR(signedXML)`:**
  - Delegates to `getQRUrl()`
  - Uses `this.config.csc` and `this.config.idCSC`

- **`attachQR(signedXML)`:**
  - Delegates to `attachQRToSignedXML()`

- **SOAP methods** (with mocked `SifenSoapClient`):
  - `consultaRUC({ digitoControl, ruc })` returns parsed result
  - `consultaDE({ digitoControl, cdc })` returns parsed result
  - `consultaLote({ digitoControl, numeroLote })` returns parsed result
  - `enviarEvento({ digitoControl, eventoXml })` returns parsed result
  - `recibeLote({ digitoControl, DE })` returns parsed result
  - `recibe({ digitoControl, xmlDE })` returns parsed result

---

### Refactoring Recommendations

These are small, additive changes that unlock testing without architectural disruption:

| #   | File                                 | Change                                                                                            | Reason                                                                                      |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1   | `xml-gen/derive/operacion-de.ts`     | Export `generateCodigoSeguridad()` so `calculateFields()` can accept an optional RNG parameter    | Tests can inject a deterministic RNG instead of `crypto.getRandomValues()`                  |
| 2   | `xml-gen/derive/base.ts`             | Accept optional `now?: Date` parameter in `applyBaseDerivedFields()` (defaulting to `new Date()`) | Tests can pass `new Date(0)` for deterministic timestamps                                   |
| 3   | `certificate/certificate-manager.ts` | Add `loadPKCS12FromBuffer(buffer: Buffer, password: string): CertificateData`                     | Tests can generate PKCS#12 key material in memory with `node-forge`                         |
| 4   | `xml-sign/xml-signer.ts`             | Export `extractCDC(doc: Document): string` and `extractDigestValue(signedXml: string): string`    | These are already pure self-contained functions — exporting them allows direct unit testing |
| 5   | `soap/response-parsers.ts`           | Export valibot schemas (at minimum `gResProcSchema`)                                              | Enables targeted schema-level tests without going through the full parser                   |
| 6   | `soap/validation.ts`                 | Export `ControlIdSchema`                                                                          | Enables targeted regex validation tests                                                     |

All refactors are:

- **Additive** — add exports or optional parameters, nothing removed or changed
- **Backward-compatible** — all existing callers continue to work unchanged
- **Non-breaking** — default behavior is identical

---

### Test Infrastructure Notes

#### Vitest settings

No `vitest.config.ts` exists yet. The test command is `"test": "vitest"` in `package.json`. Consider adding a config for:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.ts'],
    mockReset: true,
    restoreMocks: true
  }
});
```

#### Mocking patterns

```ts
// Freeze time for deterministic Date
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

// Stub crypto for deterministic random
vi.stubGlobal('crypto', {
  getRandomValues: (arr: Uint32Array) => {
    arr[0] = 987654321;
    return arr;
  }
});

// Use injected certificateData to bypass file I/O
const config: SIFENConfig = {
  environment: 'test',
  certificateData: testCertData, // generated in memory
  idCSC: '0001',
  csc: 'test-csc-key'
};
```

#### Factories

The existing factories in `src/test-utils/factories/` are comprehensive. Use them as the primary source of test data:

```ts
import { createFacturaElectronicaInput } from '../test-utils/factories/input';
import { createItemOperacion } from '../test-utils/factories/base';

// Full valid input
const input = createFacturaElectronicaInput();

// With overrides for specific scenarios
const inputWith2Items = createFacturaElectronicaInput({
  datosEspecificosPorTipoDE: {
    itemsOperacion: [
      createItemOperacion({ valorItem: { precioUnitario: Big(5000) } }),
      createItemOperacion({ valorItem: { precioUnitario: Big(3000) } })
    ]
  }
});
```

---

### Test File Organization

Co-locate tests alongside source files:

```
src/
  result.ts
  result.test.ts          ← new
  xml-gen/
    ruc.ts
    ruc.test.ts           ← new
    big.ts
    big.test.ts           ← new
    derive/
      derive.ts
      derive.test.ts      ← new
      item.test.ts        ← new
      subtotal.test.ts    ← new
      ...
    mapper/
      helpers.test.ts     ← new
      de.test.ts          ← new
      d.test.ts           ← new
      ...
    validation/
      runner.test.ts      ← new
    schema/
      factura-electronica.test.ts  ← new
    de-pipeline.test.ts   ← new
    generator.test.ts     ← new
  soap/
    validation.test.ts    ← new
    errors.test.ts        ← new
    sifen-error.test.ts   ← new
    response-parsers.test.ts ← new
  xml-sign/
    xml-signer.test.ts    ← new
  qr/
    qr-generator.test.ts  ← new
  certificate/
    certificate-manager.test.ts ← new
  client/
    sifen-client.test.ts  ← new
  test-utils/
    factories.test.ts     ← existing (17 tests)
```

---

### Estimated Coverage Summary

| Phase     | Module(s)                                                                                     | Tests    | Complexity | Value                                                           |
| --------- | --------------------------------------------------------------------------------------------- | -------- | ---------- | --------------------------------------------------------------- |
| **1**     | `result`, `big`, `ruc`, `soap/validation`, `soap/errors`, `soap/sifen-error`, `derive/config` | ~45      | Low        | Foundational — catches regressions in utilities used everywhere |
| **2**     | `validation/runner`, `mapper/*` (helpers, de, d, e, f, g, h)                                  | ~55      | Low-Med    | Core correctness of clean→raw transformation                    |
| **3**     | `derive/*` (base, operacion-de, ruc-dv, item, subtotal, derive)                               | ~50      | Medium     | **Critical** — all tax/math formulas per MT v150 spec           |
| **4**     | `response-parsers`, `schema/*`, `de-pipeline`, `generator`, `errors`, `buildLote`             | ~40      | Medium     | End-to-end pipeline correctness                                 |
| **5**     | `certificate`, `xml-sign`, `qr`, `client`                                                     | ~30      | High       | Signing, QR, integration verification                           |
| **Total** |                                                                                               | **~220** |            |                                                                 |

---

### Excluded from Scope

- All `soap/` SOAP service client tests (`consulta-ruc.ts`, `consulta.ts`, `consulta-lote.ts`, `recibe.ts`, `recibe-lote.ts`, `evento.ts`, `soap/client.ts`)
- Any test requiring a live SIFEN API connection
- WSDL type generation / `wsdl-tsclient` output verification
- Generated reference data files (`gen/paises.ts`, `gen/monedas.ts`, `gen/ciudades.ts`, `gen/departamentos.ts`, `gen/distritos.ts`) — these are static lookup tables verified by their generation scripts
