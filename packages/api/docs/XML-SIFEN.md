# Problemas y Particularidades del XML — API SIFEN

> Lecciones aprendidas integrando con la API SOAP de SIFEN (SET Paraguay).
> Estas restricciones **no** son estándar SOAP/XML — son particularidades de la implementación de SIFEN.

---

## 1. Los prefijos de namespace están prohibidos

SIFEN rechaza cualquier XML que use prefijos de namespace en los elementos, a pesar de que la forma con prefijo y la forma sin prefijo son semánticamente idénticas según la especificación W3C de XML Namespaces.

**Rechazado (con prefijo):**

```xml
<xsns:rEnviConsRUC xmlns:xsns="http://ekuatia.set.gov.py/sifen/xsd">
  <xsns:dId>0</xsns:dId>
  <xsns:dRUCCons>1609922</xsns:dRUCCons>
</xsns:rEnviConsRUC>
```

**Aceptado (namespace por defecto, sin prefijos en hijos):**

```xml
<rEnviConsRUC xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dId>0</dId>
  <dRUCCons>1609922</dRUCCons>
</rEnviConsRUC>
```

SIFEN aparenta hacer validación basada en strings en lugar de parsing XML consciente de namespaces. Manual Técnico v150, sección 7.2.4:

> _"No incorporar: Prefijos en el namespace de las etiquetas"_

### Impacto en node-soap

La librería `node-soap` agrega prefijos `xsns:` a los elementos al serializar desde objetos JS. No existe opción de configuración para desactivar esto. La solución es inyectar XML crudo mediante la propiedad `$xml` **en todos los endpoints sin excepción**:

```typescript
await client.rEnviDeAsync(
  {
    $xml: `<dId>${controlId}</dId><xDE>${xmlDE}</xDE>`
  } as never,
  {
    overrideRootElement: {
      namespace: '',
      xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
    }
  }
);
```

`overrideRootElement` asegura que el namespace por defecto se declare en el elemento raíz del body. `$xml` inyecta los hijos sin prefijos.

**Campos que contienen XML embebido** (ej: `xDE`, `dEvReg`) no deben escaparse. Los demás sí (`escapeXml`).

### endpoints y sus campos

| Endpoint      | Root              | Hijos                     |
| ------------- | ----------------- | ------------------------- |
| recibe        | `rEnviDe`         | `dId`, `xDE` (XML)        |
| recibeLote    | `rEnvioLote`      | `dId`, `xDE` (base64 ZIP) |
| consulta DE   | `rEnviConsDe`     | `dId`, `dCDC`             |
| consulta Lote | `rEnviConsLoteDe` | `dId`, `dProtConsLote`    |
| consulta RUC  | `rEnviConsRUC`    | `dId`, `dRUCCons`         |
| evento        | `rEnviEventoDe`   | `dId`, `dEvReg` (XML)     |

---

## 2. El orden de los elementos debe seguir xs:sequence

SIFEN aplica estrictamente el orden de elementos definido en el XSD. Enviar campos fuera de orden produce error **0160 — "XML Mal Formado"**.

`node-soap` serializa las claves de los objetos JS en su orden de enumeración, que puede no coincidir con la secuencia del schema. Esta es otra razón por la cual la inyección de `$xml` crudo es necesaria — controlamos el orden exacto.

---

## 3. Respuestas de SIFEN: gResProc como objeto vs array

`node-soap` deserializa elementos XML con ocurrencia `0-n` como un **objeto** cuando hay un solo elemento, en lugar de un array. Esto rompe los esquemas Valibot que esperan `v.array(...)`.

**Solución:** normalizar con una función helper antes de la validación:

```typescript
function ensureArray<T>(value: unknown): T[] {
  if (!value) return [];
  return Array.isArray(value) ? (value as T[]) : [value as T];
}
```

Aplicar en `parseRecibe`, `parseConsultaLote` y `parseEvento` tanto al array externo como a los `gResProc` anidados.

### dProtAut como string

`dProtAut` es un decimal de hasta 28 dígitos en el XSD (`xs:decimal`, totalDigits 28). Esto **excede** `Number.MAX_SAFE_INTEGER` en JavaScript. `node-soap` lo retorna como string, por lo que los esquemas Valibot deben usar `v.string()`, nunca `v.number()`.

### Id ausente en respuestas de rechazo

Las respuestas de rechazo no incluyen el campo `Id` (CDC). El esquema de `recibe` debe declararlo como `v.optional(v.string())`.

---

## 4. Reglas de formato del DE

Del Manual Técnico v150, sección 7.2.4:

- **Sin whitespace entre etiquetas**: `prettyPrint: false` obligatorio
- **Sin declaración XML en DEs individuales**: `headless: true` en `generateDEXML`
- **Sin etiquetas vacías**: omitir campos opcionales sin valor; no incluir `<dField/>` ni `<dField></dField>`
- **Sin valores negativos** en campos numéricos
- **Campos opcionales con valor cero**: deben **omitirse** del XML. Solo los campos `1-1` (obligatorios) pueden contener cero
- **Strings sin espacios al inicio ni al final**: los datos de entrada deben recortarse (`trim`) antes del mapeo
- **Sin comentarios XML** (`<!-- -->`), ni elementos `<annotation>` o `<documentation>`
- **Nombres case-sensitive**: `<gOpeDE>` ≠ `<GopeDE>` ≠ `<gopede>`
- **Solo UTF-8**: cualquier otro encoding es rechazado (error 0107)

---

## 5. Declaraciones de namespace

El único namespace aceptado es `http://ekuatia.set.gov.py/sifen/xsd`. Excepción: `<Signature>` declara `xmlns="http://www.w3.org/2000/09/xmldsig#"`.

```xml
<!-- Correcto -->
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://ekuatia.set.gov.py/sifen/xsd siRecepDE_v150.xsd">
```

### rLoteDE no lleva namespace

En envíos de lote, el contenedor `<rLoteDE>` debe ser un elemento **sin namespace ni atributos**. Los `rDE` internos llevan sus propias declaraciones de namespace individualmente.

```xml
<!-- Correcto -->
<rLoteDE>
  <rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://ekuatia.set.gov.py/sifen/xsd siRecepDE_v150.xsd">
    <dVerFor>150</dVerFor>
    ...
  </rDE>
</rLoteDE>
```

### rLoteDE no lleva dVerFor

El `rLoteDE` **no** tiene campo de versión. Cada `rDE` interno lleva su propio `<dVerFor>150</dVerFor>`.

---

## 6. CDC y codigoSeguridad

### El codigoSeguridad debe coincidir con el CDC

El `<dCodSeg>` en el XML del DE debe ser **extraído del CDC** (posiciones 35-43, 9 dígitos), no generado aleatoriamente. El CDC es la identidad del DE y sus campos deben ser consistentes con el contenido.

### Zero-padding obligatorio

El manual (sección 10.3) especifica: "En caso de ser un número de menos de 9 dígitos completar con 0 a la izquierda." El rango es `000000001`–`999999999`. El mapper debe formatear `dCodSeg` con `.padStart(9, '0')`.

---

## 7. Código QR

### Parámetros con decimales exactos

`dTotGralOpe` y `dTotIVA` en la URL del QR deben conservar el formato decimal **exacto** del XML, sin redondeo (`Math.round`). SIFEN valida el hash del QR contra los valores exactos del DE.

### dRucRec vs dNumIDRec

El nombre del parámetro en el QR depende de `iNatRec`:

- `iNatRec = 1` (contribuyente): usar `dRucRec`
- `iNatRec ≠ 1` (no contribuyente): usar `dNumIDRec`

Si el campo correspondiente no existe, usar `"0"`.

### Pre-validator usa URL de producción

El pre-validator de SIFEN solo reconoce `https://ekuatia.set.gov.py/consultas/qr` (producción). La URL con `consultas-test` es rechazada por el validador (error 2502), aunque funcione correctamente en el entorno de test real.

### Algoritmo del hash

```
STEP_1 = "nVersion=150&Id={cdc}&dFeEmiDE={hex}&dRucRec={ruc}&dTotGralOpe={total}&dTotIVA={iva}&cItems={count}&DigestValue={hex}&IdCSC={idCSC}"
STEP_2 = STEP_1 + CSC
cHashQR = SHA256(STEP_2)  (hex, lowercase)
```

Solo `dFeEmiDE` y `DigestValue` van en hexadecimal. El CSC se concatena directamente a STEP_1 (sin `&`). El CSC **nunca** va en la URL, solo en el cálculo del hash.

---

## 8. Requisito del SOAP Header

Cada request debe incluir el elemento `deHeaderMsg` en el SOAP header:

```xml
<soap:Header>
  <deHeaderMsg xmlns="http://ekuatia.set.gov.py/sifen/xsd"></deHeaderMsg>
</soap:Header>
```

Si falta, retorna error **0180** — "Elemento de HeaderMsg inexistente en el SOAP Header".

---

## 9. Respuestas de error genéricas en endpoint incorrecto

Cuando un request llega al endpoint equivocado de SIFEN (ej.: enviar un payload `rEnviConsRUC` al servicio `recibe`), el servidor retorna el schema de respuesta `rRetEnviDe` con código de error 0160. El mensaje "XML Mal Formado" es engañoso.

**Causa común:** Las URLs de los endpoints usan rutas con **guiones**:

| Clave de config | URL correcta                   | Incorrecta                        |
| --------------- | ------------------------------ | --------------------------------- |
| `consultaRuc`   | `consultas/consulta-ruc.wsdl`  | ~~`consultas/consultaRuc.wsdl`~~  |
| `consultaLote`  | `consultas/consulta-lote.wsdl` | ~~`consultas/consultaLote.wsdl`~~ |
| `recibeLote`    | `async/recibe-lote.wsdl`       | ~~`async/recibeLote.wsdl`~~       |

---

## 10. `ClientSSLSecurity` trata strings como rutas de archivo

Al usar `ClientSSLSecurity` de `node-soap`, pasar contenido PEM como strings causa que internamente llame `fs.readFileSync()` sobre el string. Se deben pasar instancias de `Buffer`:

```typescript
// Correcto
client.setSecurity(
  new soap.ClientSSLSecurity(Buffer.from(privateKeyPem), Buffer.from(certPem), opts)
);
```

---

## 11. El entorno de test de SIFEN

El entorno de test (`sifen-test.set.gov.py`) tiene disponibilidad intermitente. Si un endpoint funciona en producción pero no en test con el mismo payload, asumir que es una caída del entorno de test y reintentar más tarde.
