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

**Aceptado (namespace por defecto):**

```xml
<rEnviConsRUC xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dId>0</dId>
  <dRUCCons>1609922</dRUCCons>
</rEnviConsRUC>
```

SIFEN aparenta hacer validación basada en strings en lugar de parsing XML consciente de namespaces. Esto está explícitamente indicado en el Manual Técnico v150, sección 7.2.4:

> _"No incorporar: Prefijos en el namespace de las etiquetas"_

### Impacto en node-soap

La librería `node-soap` agrega prefijos `xsns:` a los elementos por defecto al serializar desde objetos JS. No existe opción de configuración para desactivar esto. La solución es inyectar XML crudo mediante la propiedad `$xml` en lugar de pasar objetos estructurados:

```typescript
await client.rEnviConsRUCAsync(
  {
    $xml: `<dId>${dv}</dId><dRUCCons>${ruc}</dRUCCons>`
  },
  {
    overrideRootElement: {
      namespace: '',
      xmlnsAttributes: [{ name: 'xmlns', value: 'http://ekuatia.set.gov.py/sifen/xsd' }]
    }
  }
);
```

---

## 2. El orden de los elementos debe seguir xs:sequence

SIFEN aplica estrictamente el orden de elementos definido en el XSD mediante `<xs:sequence>`. Enviar campos fuera de orden produce error **0160 — "XML Mal Formado"**.

Por ejemplo, `rEnviConsRUC` requiere `dId` antes de `dRUCCons`:

```xml
<!-- Definición XSD -->
<xs:sequence>
  <xs:element name="dId" type="dIdType"/>
  <xs:element name="dRUCCons" type="tRuc"/>
</xs:sequence>
```

`node-soap` serializa las claves de los objetos JS en su orden de enumeración, que puede no coincidir con la secuencia del schema. Esta es otra razón por la cual la inyección de `$xml` crudo es necesaria en los servicios de consulta.

---

## 3. Respuestas de error genéricas en endpoint incorrecto

Cuando un request llega al endpoint equivocado de SIFEN (ej.: enviar un payload `rEnviConsRUC` al servicio `recibe`), el servidor **no** retorna un SOAP fault correcto. En cambio, retorna el schema de respuesta `rRetEnviDe` (respuesta de recepción de DE) con código de error 0160:

```xml
<ns2:rRetEnviDe xmlns:ns2="http://ekuatia.set.gov.py/sifen/xsd">
  <ns2:rProtDe>
    <ns2:dEstRes>Rechazado</ns2:dEstRes>
    <ns2:gResProc>
      <ns2:dCodRes>0160</ns2:dCodRes>
      <ns2:dMsgRes>XML Mal Formado.</ns2:dMsgRes>
    </ns2:gResProc>
  </ns2:rProtDe>
</ns2:rRetEnviDe>
```

Esto dificulta el debugging porque:

- `node-soap` intenta deserializar la respuesta como el tipo esperado, resultando en `undefined`
- El mensaje "XML Mal Formado" es engañoso — el XML es perfectamente válido, solo está dirigido al servicio equivocado

**Causa común:** Las URLs de los endpoints usan rutas con **guiones**, pero los nombres de archivo WSDL usan camelCase:

| Clave de config | URL correcta del endpoint      | Incorrecta (camelCase)            |
| --------------- | ------------------------------ | --------------------------------- |
| `consultaRuc`   | `consultas/consulta-ruc.wsdl`  | ~~`consultas/consultaRuc.wsdl`~~  |
| `consultaLote`  | `consultas/consulta-lote.wsdl` | ~~`consultas/consultaLote.wsdl`~~ |
| `recibeLote`    | `async/recibe-lote.wsdl`       | ~~`async/recibeLote.wsdl`~~       |

Las URLs canónicas son las que aparecen en el elemento `<soap12:address location="...">` de cada archivo WSDL.

---

## 4. Reglas adicionales de formato XML

Del Manual Técnico v150, sección 7.2.4 — todo lo siguiente causa rechazo:

- **Sin espacios en blanco** dentro o alrededor de las etiquetas: sin line-feeds, retornos de carro, tabulaciones, ni espacios entre elementos
- **Sin etiquetas vacías**: no incluir `<dField/>` ni `<dField></dField>` para campos opcionales sin valor. Simplemente omitirlos
- **Sin valores negativos** en campos numéricos
- **Sin comentarios XML** (`<!-- -->`), ni elementos `<annotation>` o `<documentation>`
- **Los nombres de campos son case-sensitive**: `<gOpeDE>` ≠ `<GopeDE>` ≠ `<gopede>`
- **Una sola declaración XML**: solo un `<?xml version="1.0" encoding="UTF-8"?>` por payload, incluso para envíos de lote
- **Solo UTF-8**: cualquier otro encoding es rechazado (código de error 0107)

---

## 5. Declaraciones de namespace

El único namespace aceptado es el namespace de SIFEN. Cualquier otro namespace produce error **0104**.

```xml
<!-- Correcto -->
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://ekuatia.set.gov.py/sifen/xsd siRecepDE_v150.xsd">
```

Excepción: el elemento `<Signature>` declara su propio namespace de forma inline:

```xml
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
```

---

## 6. Requisito del SOAP Header

Cada request debe incluir el elemento `deHeaderMsg` en el SOAP header, aunque esté vacío:

```xml
<soap:Header>
  <deHeaderMsg xmlns="http://ekuatia.set.gov.py/sifen/xsd"></deHeaderMsg>
</soap:Header>
```

Si falta, retorna error **0180** — "Elemento de HeaderMsg inexistente en el SOAP Header".

---

## 7. `ClientSSLSecurity` trata strings como rutas de archivo

Al usar `ClientSSLSecurity` de `node-soap`, pasar contenido PEM como strings causa que internamente llame `fs.readFileSync()` sobre el string, interpretándolo como una ruta de archivo. Se deben pasar instancias de `Buffer`:

```typescript
// Incorrecto — intenta leer el contenido PEM como nombre de archivo
client.setSecurity(new soap.ClientSSLSecurity(privateKeyPem, certPem, opts));

// Correcto — pasa el contenido PEM directamente a la capa TLS de Node
client.setSecurity(
  new soap.ClientSSLSecurity(Buffer.from(privateKeyPem), Buffer.from(certPem), opts)

client.setSecurity(new soap.ClientSSLSecurity(privateKeyPem, certPem, opts));

// Correcto — pasa el contenido PEM directamente a la capa TLS de Node
client.setSecurity(new soap.ClientSSLSecurity(Buffer.from(privateKeyPem), Buffer.from(certPem), opts));
```
