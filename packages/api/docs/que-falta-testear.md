# Qué falta testear

## Cobertura actual

334 tests en 30 archivos cubren:

- **Fase 1** — Utilidades puras (`result`, `big`, `ruc`, `soap/validation`, `soap/errors`, `soap/sifen-error`, `derive/config`)
- **Fase 2** — Sistema de validación, mappers clean→raw (`validation/runner`, `mapper/*`)
- **Fase 3** — Lógica de derivación (`derive/base`, `operacion-de`, `ruc-dv`, `item`, `subtotal`, `derive`)
- **Fase 4** — Pipeline y parsers (`response-parsers`, `de-pipeline`, `generator`, `errors`, `buildLote`)
- **Fase 5** — Firma, QR y certificado (`certificate-manager`, `xml-signer`, `qr-generator`)
- **Infra** — Fábricas de datos de prueba para FacturaElectrónica (input y DEC)
- **Fixes** — 3 bugs encontrados y corregidos (`padEnd→padStart`, CDC no numérico, `pickFrom→pickKey` en monedas)

---

## Lo que falta

### 1. `normalizeFacturaElectronica` y schema valibot

**Archivo:** `src/xml-gen/schema/factura-electronica.ts`

**Qué hace:** Recibe un `FacturaElectronicaInput`, normaliza campos (convierte `NumBig→Big`, pone seeds a campos derivables, borra DVs de transportista/procesadora), construye subtotales vacíos, y lo envuelve en el schema `facturaElectronicaSchema` para que `prepareDE` lo valide.

**Por qué no está testeado:** Solo se prueba indirectamente a través del pipeline (`de-pipeline.test.ts`). No hay tests unitarios que verifiquen los pasos de normalización individualmente — por ejemplo, que `digitoVerificadorProcesadoraTarjeta` se borra, o que `codigoSeguridad` se siembra en 0.

**Cómo testearlo:** Unit tests directos llamando a `normalizeFacturaElectronica(input)` y verificando campo por campo:

```ts
const input = createFacturaElectronicaInput();
const result = normalizeFacturaElectronica(input);
expect(result.operacionDE.codigoSeguridad).toBe(0);
expect(result.timbrado.tipoDocumento).toBe(1);
expect(result.ivaItem.baseGravadaIvaItem.eq(0)).toBe(true);
// etc.
```

**Prioridad:** Media. El pipeline ya lo valida en integración, pero tests unitarios harían el debugging mucho más rápido.

---

### 2. `normalizeAutofacturaElectronica`

**Archivo:** `src/xml-gen/schema/autofactura-electronica.ts`

**Qué hace:** Similar a FE pero con reglas distintas: `tipoDocumento=4`, descuentos/anticipos van a `undefined` en vez de 0, `totalGsFormula='igualF014'`.

**Por qué no está testeado:** No hay implementación de Autofactura Electrónica (AFE) lista para usar — el tipo `AutofacturaElectronicaDE` existe pero no hay factory ni input pipeline completo. Solo existe el schema.

**Cómo testearlo:** Crear una factory `createAutofacturaElectronicaInput` (similar a la de FE), luego tests unitarios de `normalizeAutofacturaElectronica` y tests de pipeline con `autofacturaElectronicaSchema`.

**Prioridad:** Baja. El tipo no está en uso aún. Cuando se implemente AFE, estos tests deben escribirse junto con el código.

---

### 3. Reglas de validación de negocio

**Archivos:** `src/xml-gen/validation/rules/calculated-document.ts`, `calculated-items.ts`

**Qué hacen:** Nada — son placeholders con `when: () => false`. El runner (`validate`, `validateItems`) y el orquestador (`validateCalculated`) están 100% testeados, pero las reglas concretas no existen.

**Por qué no está testeado:** No hay reglas que testear. El MT v150 contiene decenas de reglas de negocio (totales vs subtotales, cálculos de IVA, consistencia de timbrado, etc.) que deben implementarse como objetos `ValidationRule`.

**Cómo testearlo:** Cuando se implementen las reglas:

```ts
const de = createFacturaElectronicaDec({ ... });
const errors = validateCalculated(de);
expect(errors).toEqual([{ id: 'RULE_X', message: '...' }]);
```

El runner ya está probado — solo hay que pasarle reglas reales y verificar que disparen en los casos correctos.

**Prioridad:** Alta. Es el siguiente gran bloque de funcionalidad pendiente.

---

### 4. `CertificateManager.loadPKCS12` HECHO.

---

### 5. `SifenAPI` (cliente de alto nivel)

**Archivo:** `src/client/sifen-client.ts`

**Qué hace:** Compone `CertificateManager`, `XMLSigner`, `SifenSoapClient` y expone métodos como `signXML`, `generateQR`, `attachQR`, `consultaRUC`, `recibeLote`, etc.

**Por qué no está testeado:** El constructor instancia `CertificateManager` y `SifenSoapClient` directamente. `CertificateManager.readPKCS12` requiere archivo en disco. `SifenSoapClient` requiere red. Sin inyección de dependencias, no se puede testear en aislamiento.

**Qué sí está testeado:** `buildLote` (exportado y testeado directamente).

**Cómo testearlo:** Inyectar dependencias en el constructor:

```ts
constructor(config: SIFENConfig, deps?: {
  xmlSigner?: XMLSigner;
  certManager?: CertificateManager;
  soapClient?: SifenSoapClient;
})
```

Los métodos como `signXML`, `generateQR`, `attachQR` son delegaciones simples — se testean mockeando `XMLSigner` y verificando que se llaman con los parámetros correctos. Los métodos SOAP (`consultaRUC`, `recibeLote`, etc.) son delegaciones a `SifenSoapClient` y tampoco necesitan tests complejos.

**Prioridad:** Baja. Es una capa de composición delgada. El valor de testearla es bajo comparado con el esfuerzo de mockear.

---

### 6. `xml-gen/clone.ts`

**Archivo:** `src/xml-gen/clone.ts`

**Qué hace:** Deep clone con manejo especial de `Date`, `Big`, arrays y objetos. Actualmente usado por `normalizeFacturaElectronica` y `normalizeAutofacturaElectronica`. Antes también lo usaba `calculateFields` pero eso se movió a mutación in-place.

**Por qué no está testeado:** Es una utilidad interna que el pipeline ya ejerce. No tiene tests unitarios propios.

**Cómo testearlo:** Tests sencillos:

```ts
const original = { date: new Date(0), big: new Big(42), nested: { x: 1 } };
const cloned = clone(original);
expect(cloned).not.toBe(original);
expect(cloned.date).not.toBe(original.date);
expect(cloned.big).not.toBe(original.big);
expect(cloned.nested).not.toBe(original.nested);
```

**Prioridad:** Baja. Utilidad simple que el pipeline ya cubre en integración.

---

### 7. `src/xml-gen/factura-electronica.ts` y `autofactura-electronica.ts`

**Archivos:** `src/xml-gen/factura-electronica.ts`, `src/xml-gen/autofactura-electronica.ts`

**Qué hacen:** Funciones `buildFacturaElectronica` y `buildAutofacturaElectronica` — wrappers delgados que llaman a `prepareDE` con el schema correspondiente.

**Por qué no está testeado:** Son one-liners. La lógica real está en `prepareDE`.

**Cómo testearlo:** No necesita tests dedicados. La integración vía pipeline es suficiente.

**Prioridad:** Ninguna.

---

### 8. Errores del pipeline: `XMLGenBusinessValidationError` y `XMLGenMappingError`

**Archivos:** `src/xml-gen/de-pipeline.ts`

**Qué hace:** El pipeline tiene 4 ramas de error: input validation, calculation, business validation, y mapping. Solo las primeras dos están testeadas (input inválido y CDC no numérico). Las ramas de business validation y mapping nunca se ejercitan porque no hay reglas de negocio que fallen ni datos que causen errores de mapping.

**Por qué no está testeado:** Las reglas de negocio son placeholders. Los errores de mapping requieren datos que el lookup de descripciones no pueda resolver (e.g., un código de país inválido). Las factories siempre producen datos válidos que resuelven correctamente.

**Cómo testearlo:**

- **Business validation:** Esperar a tener reglas reales implementadas.
- **Mapping error:** Construir manualmente un `FacturaElectronicaInput` con un `paisReceptor: 'XXX'` (código inválido) y verificar que `prepareDE` retorna `XMLGenMappingError`.

**Prioridad:** Media. El camino feliz está cubierto. Los errores deberían testearse cuando se implementen las reglas.

---

### 9. `xml-gen/schema/schema.ts` (`enumsSchema`)

**Archivo:** `src/xml-gen/schema/schema.ts`

**Qué hace:** Define un valibot `v.looseObject` con validación de enums para todos los códigos SIFEN. Es el primer paso del pipe `facturaElectronicaSchema`.

**Por qué no está testeado:** Se testea indirectamente a través del pipeline. Si un enum es inválido, `prepareDE` falla con `XMLGenInputValidationError`. Pero no hay tests que verifiquen exhaustivamente cada enum.

**Cómo testearlo:** Podría testearse pasando objetos con códigos de enum inválidos a `v.safeParse(enumsSchema, ...)` y verificando que fallen. La cantidad de enums (~42) hace que sea tedioso pero no complejo.

**Prioridad:** Baja. Los enums se validan en integración. Un test exhaustivo sería principalmente documentación.

---

### 10. Módulo SOAP completo

**Archivos:** `src/soap/client.ts`, `consulta.ts`, `consulta-lote.ts`, `consulta-ruc.ts`, `recibe.ts`, `recibe-lote.ts`, `evento.ts`

**Qué hacen:** Clientes SOAP que se comunican con la API de SIFEN.

**Por qué no está testeado:** Requieren conexión HTTPS real con certificados TLS cliente. El paquete `soap` de npm genera clientes a partir de WSDLs, y mockear todo ese stack es desproporcionadamente complejo. Excluido del plan de testing por diseño.

**Cómo testearlo:** No es viable sin acceso a un entorno SIFEN de prueba. En el futuro podría considerarse un enfoque de grabación/reproducción (grabar respuestas reales y reproducirlas en tests), pero no es prioritario.

**Prioridad:** Ninguna por ahora.

---

## Orden recomendado

1. **Reglas de validación de negocio** — implementar y testear. Es el mayor vacío funcional.
2. **`normalizeFacturaElectronica`** — tests unitarios para cada paso de normalización.
3. **`loadPKCS12FromBuffer`** — refactorizar y testear el flujo completo de carga de certificado.
4. **Errores de pipeline** — testear `XMLGenMappingError` y `XMLGenBusinessValidationError`.
5. **AFE** — cuando se implemente, escribir factories y tests en paralelo.
6. **`clone.ts`** — tests unitarios simples.
7. **`SifenAPI`** — solo si se justifica (es una capa de delegación).
