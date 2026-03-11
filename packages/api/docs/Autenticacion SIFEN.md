# Autenticación y Seguridad — API SIFEN

> Información extraída del Manual Técnico SIFEN v150.

---

## 1. Modelo de Comunicación

La comunicación entre los contribuyentes y la SET se realiza mediante **Web Services SOAP 1.2** sobre **Internet**, usando el protocolo **TLS 1.2 con autenticación mutua** (mTLS). Esto significa que tanto el servidor SIFEN como el cliente (contribuyente) deben presentar certificados digitales para establecer la conexión.

- **Estándar WS:** WS-I Basic Profile 1.1
- **Protocolo SOAP:** versión 1.2, Style/Encoding: `Document/Literal`
- **Mensajes:** XML dentro del `soap:Body`

El request SOAP tiene esta estructura:

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
    <soap:Header/>
    <soap:Body>
        <!-- contenido XML del servicio -->
    </soap:Body>
</soap:Envelope>
```

El SOAP header debe incluir un elemento `deHeaderMsg`:

```xml
<soap12:Header>
  <deHeaderMsg xmlns="https://www.sifen.gov.py/De/wsdl/siRecepDe">
  </deHeaderMsg>
</soap12:Header>
```

Si el `HeaderMsg` no está presente, se retorna error **0180** (`AF01` — "Elemento de HeaderMsg inexistente en el SOAP Header").

---

## 2. Certificado Digital (X.509 v3)

El SIFEN requiere un **certificado digital X.509 v3** emitido por cualquiera de los **PSC** (Prestadores de Servicios de Certificación) habilitados por el Ministerio de Industria y Comercio (MIC) como administrador de la Autoridad Certificadora Raíz del Paraguay.

- **PSC habilitados:** <https://www.acraiz.gov.py/html/Certif_1PrestaServ.html>
- **Tipos aceptados:**
  - **F1:** Certificado de Firma Digital por Software
  - **F2:** Certificado de Firma Digital por Hardware

### 2.1. El certificado se usa para DOS propósitos simultáneos

#### a) Firma de mensajes de datos (XML Signing)

Se usa para firmar digitalmente el documento electrónico (DE), evento, y/o cualquier otro archivo XML. El certificado debe contener:

- El **RUC del contribuyente emisor**
- La clave prevista para la función de **firma digital**

#### b) Autenticación TLS mutua (mTLS — Transmisión)

Se usa para establecer la conexión TLS entre el servidor del contribuyente y el servidor del SIFEN. El certificado debe contener:

- El **RUC del contribuyente emisor** (propietario responsable de la transmisión)
- La extensión **Extended Key Usage** con el permiso **`clientAuth`**

### 2.2. Ubicación del RUC en el certificado

| Tipo de certificado  | Campo X509 v3            | Nombre / OID                  |
| -------------------- | ------------------------ | ----------------------------- |
| **Persona jurídica** | `Subject`                | `SerialNumber` (OID: 2.5.4.5) |
| **Persona física**   | `SubjectAlternativeName` | `SerialNumber` (OID: 2.5.4.5) |

En ambos casos, el RUC se codifica así:

```none
RUCXXXXXXXXX-X
```

Es decir: la palabra `RUC` en mayúsculas, seguida del número de RUC con guión y dígito verificador, **sin espacios**.

> **Nota persona física:** Si se opta por certificado de persona física, debe ser de un empleado dependiente del contribuyente, y el certificado debe contener obligatoriamente el nombre y RUC de la entidad donde trabaja el titular.

---

## 3. Firma Digital XML (Enveloped Signature)

Todos los DE enviados al SIFEN deben estar firmados con **XML Digital Signature** en formato **Enveloped**.

### 3.1. Especificaciones técnicas

| Aspecto                   | Valor                                                                           |
| ------------------------- | ------------------------------------------------------------------------------- |
| **Estándar**              | XML Digital Signature, formato Enveloped — <http://www.w3.org/TR/xmldsig-core/> |
| **Tamaño de clave**       | RSA 2048 (software) / RSA 2048 o 4096 (hardware)                                |
| **Función criptográfica** | RSA                                                                             |
| **Message digest**        | SHA-256                                                                         |
| **Codificación**          | Base64                                                                          |
| **Canonicalización**      | C14N — <http://www.w3.org/TR/2001/REC-xml-c14n-20010315>                        |
| **Transforms**            | Enveloped + Exclusive C14N (`http://www.w3.org/2001/10/xml-exc-c14n#`)          |

### 3.2. Estructura de la firma (Schema XML)

| ID   | Campo                    | Descripción      | Observaciones                                                                                           |
| ---- | ------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------- |
| XS01 | `Signature`              | Raíz             | namespace: `http://www.w3.org/2000/09/xmldsig#`                                                         |
| XS02 | `SignedInfo`             | Grupo            | Información de la firma                                                                                 |
| XS03 | `CanonicalizationMethod` | Grupo            | Método canónico                                                                                         |
| XS04 | `Algorithm` (attr)       | Atributo de XS03 | `https://www.w3.org/TR/2001/REC-xml-c14n-20010315`                                                      |
| XS05 | `SignatureMethod`        | Grupo            | Método de firma                                                                                         |
| XS06 | `Algorithm` (attr)       | Atributo de XS05 | `http://www.w3.org/2001/04/xmldsig-more#rsa-sha256`                                                     |
| XS07 | `Reference`              | Grupo            | —                                                                                                       |
| XS08 | `URI` (attr)             | Atributo de XS07 | `#` + CDC (Código de Control)                                                                           |
| XS10 | `Transforms`             | Grupo            | —                                                                                                       |
| XS12 | `Transform`              | Grupo (x2)       | —                                                                                                       |
| XS13 | `Algorithm` (attr)       | Atributo de XS12 | 1) `http://www.w3.org/2000/09/xmldsig#enveloped-signature` 2) `http://www.w3.org/2001/10/xml-exc-c14n#` |
| XS15 | `DigestMethod`           | Grupo            | —                                                                                                       |
| XS16 | `Algorithm` (attr)       | Atributo de XS15 | SHA-256                                                                                                 |
| XS17 | `DigestValue`            | Elemento         | Hash SHA-256                                                                                            |
| XS18 | `SignatureValue`         | Elemento         | —                                                                                                       |
| XS19 | `KeyInfo`                | Grupo            | —                                                                                                       |
| XS20 | `X509Data`               | Grupo            | —                                                                                                       |
| XS21 | `X509Certificate`        | Elemento         | Certificado digital X.509 v3 completo                                                                   |

### 3.3. Elementos que NO deben incluirse

En la firma **no incluir** (ya están en el certificado):

- `<X509SubjectName>`
- `<X509IssuerSerial>`
- `<X509IssuerName>`
- `<X509SKI>`
- `<KeyValue>`, `<RSAKeyValue>`, `<Modulus>`, `<Exponent>`

### 3.4. Ejemplo completo de firma

```xml
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://ekuatia.set.gov.py/sifen/xsd/siRecepDE_v150.xsd">
    <dVerFor>150</dVerFor>
    <DE Id="0144444401700100100145282201170125158732260988">
        ...
    </DE>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
            <CanonicalizationMethod
                Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
            <SignatureMethod
                Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
            <Reference URI="#0144444401700100100145282201170125158732260988">
                <Transforms>
                    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                    <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                </Transforms>
                <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                <DigestValue>Nt2UmpjUHuu2DT6CJc2mtKhhqbq94LHSak1IsEOtuWk=</DigestValue>
            </Reference>
        </SignedInfo>
        <SignatureValue>DWN1my9sH4FI7ygPT3KF1ce...</SignatureValue>
        <KeyInfo>
            <X509Data>
                <X509Certificate>MIIIxzCCBq+gAwIBAgITXAA...</X509Certificate>
            </X509Data>
        </KeyInfo>
    </Signature>
</rDE>
```

### 3.5. Namespace de la firma

La declaración `xmlns` de la firma se hace **dentro** de la etiqueta `<Signature>`, no en el elemento raíz:

```xml
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
```

---

## 4. Validaciones de Autenticación del SIFEN

### 4.1. Validación del certificado de transmisión (TLS) — Códigos 0001–0007

Estas validaciones son ejecutadas por el protocolo TLS durante el handshake:

| ID   | Validación                                                  | Código | Motivos de rechazo                                                                                     |
| ---- | ----------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| AA01 | Certificado de Transmisor Inválido                          | 0001   | Certificado inexistente, versión incorrecta, es de una AC, o `ExtendedKeyUsage` no define `clientAuth` |
| AA02 | Plazo de validez expirado                                   | 0002   | Certificado fuera de su período de validez                                                             |
| AA03 | Cadena de Certificación                                     | 0003   | PSC no habilitado en el país, PSC revocado, o certificado no firmado por el PSC emisor                 |
| AA04 | LCR del Certificado Transmisor                              | 0004   | No existe la dirección de la LCR (CRL DistributionPoint), LCR indisponible, o LCR inválida             |
| AA05 | Certificado del transmisor revocado                         | 0005   | —                                                                                                      |
| AA06 | Certificado Raíz no pertenece al MIC                        | 0006   | —                                                                                                      |
| AA07 | No existe la extensión del RUC del emisor en el certificado | 0007   | Persona jurídica → `SerialNumber`; Persona física → `SubjectAlternativeName`                           |

> Las validaciones AA01 a AA05 son realizadas por el propio protocolo TLS.

### 4.2. Validación del certificado de firma — Códigos 0120–0126

| ID   | Validación                                       | Código | Motivos de rechazo                                                                                                               |
| ---- | ------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| AC01 | Certificado inválido                             | 0120   | No existe certificado de firma en el mensaje, no se aceptan certificados de PSC, `KeyUsage` no define firma digital y no repudio |
| AC02 | Plazo de validez del certificado inválido        | 0121   | Fechas de inicio o fin de validez inválidas                                                                                      |
| AC03 | No existe la extensión del RUC en el certificado | 0122   | Persona Física → `SubjectAlternativeName`; Persona Jurídica → `SerialNumber`                                                     |
| AC04 | Cadena de certificación inválida                 | 0123   | PSC no habilitado por el MIC, PSC revocado, certificado no firmado por el PSC                                                    |
| AC05 | Problema en la LCR del certificado de firma      | 0124   | Dirección de LCR no informada, error de acceso, LCR inexistente                                                                  |
| AC06 | Certificado de firma revocado                    | 0125   | —                                                                                                                                |
| AC07 | Certificado raíz no corresponde al MIC           | 0126   | —                                                                                                                                |

### 4.3. Validación de la firma digital — Códigos 0140–0142

| ID   | Validación                                                        | Código | Motivos de rechazo                                                                         |
| ---- | ----------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------ |
| AD01 | Firma difiere del estándar                                        | 0140   | Falta `Reference URI` en la firma, o `Transform Algorithm` (C14N y Enveloped) no informado |
| AD02 | `SignatureValue` diferente del calculado                          | 0141   | Firma no coincide con el cálculo PKI                                                       |
| AD03 | RUC del certificado de firma no pertenece al contribuyente emisor | 0142   | —                                                                                          |

### 4.4. Validaciones genéricas de los WS — Códigos 0160–0183

| ID   | Validación                                                                                     | Código |
| ---- | ---------------------------------------------------------------------------------------------- | ------ |
| AE01 | XML malformado                                                                                 | 0160   |
| AE02 | Servidor momentáneamente sin respuesta                                                         | 0161   |
| AE03 | Servidor paralizado, sin tiempo de regreso                                                     | 0162   |
| AE04 | Versión del formato del WS no soportada                                                        | 0163   |
| AF01 | Elemento `HeaderMsg` inexistente en el SOAP Header                                             | 0180   |
| AF04 | RUC del certificado de conexión no pertenece a contribuyente activo en la base de datos de RUC | 0183   |

---

## 5. Endpoints de los Web Services

### Producción (`sifen.set.gov.py`)

| Servicio                  | URL                                                                |
| ------------------------- | ------------------------------------------------------------------ |
| Recepción DE (sync)       | `https://sifen.set.gov.py/de/ws/sync/recibe.wsdl?wsdl`             |
| Recepción Lote DE (async) | `https://sifen.set.gov.py/de/ws/async/recibe-lote.wsdl?wsdl`       |
| Evento                    | `https://sifen.set.gov.py/de/ws/eventos/evento.wsdl?wsdl`          |
| Consulta Lote             | `https://sifen.set.gov.py/de/ws/consultas/consulta-lote.wsdl?wsdl` |
| Consulta RUC              | `https://sifen.set.gov.py/de/ws/consultas/consulta-ruc.wsdl?wsdl`  |
| Consulta DE               | `https://sifen.set.gov.py/de/ws/consultas/consulta.wsdl?wsdl`      |

### Test (`sifen-test.set.gov.py`)

| Servicio                  | URL                                                                     |
| ------------------------- | ----------------------------------------------------------------------- |
| Recepción DE (sync)       | `https://sifen-test.set.gov.py/de/ws/sync/recibe.wsd?wsdl`              |
| Recepción Lote DE (async) | `https://sifen-test.set.gov.py/de/ws/async/recibe-lote.wsdl?wsdl`       |
| Evento                    | `https://sifen-test.set.gov.py/de/ws/eventos/evento.wsdl?wsdl`          |
| Consulta DE               | `https://sifen-test.set.gov.py/de/ws/consultas/consulta.wsdl?wsdl`      |
| Consulta Lote             | `https://sifen-test.set.gov.py/de/ws/consultas/consulta-lote.wsdl?wsdl` |
| Consulta RUC              | `https://sifen-test.set.gov.py/de/ws/consultas/consulta-ruc.wsdl?wsdl`  |

> **Nota:** El acceso a estos servicios dependerá de la política de seguridad de la SET, que puede limitar o restringir la utilización por contribuyente, por dirección IP, u otros mecanismos.

### Servidores NTP (sincronización de horario)

- `aravo1.set.gov.py`
- `aravo2.set.gov.py`

---

## 6. Procedimiento de Validación de Firma Digital (lado SIFEN)

El SIFEN valida la firma de cada DE recibido con el siguiente procedimiento:

1. Extraer la clave pública del certificado digital
2. Verificar el plazo de validez del certificado digital del emisor
3. Validar la cadena de confianza, identificando al PSC y las LCR de la cadena
4. Verificar que el certificado utilizado es del contribuyente (no de una AC)
5. Validar la integridad de las LCR utilizadas
6. Verificar el plazo de validez de cada LCR (Effective Date y NextUpdate) en relación al momento de la firma

> El SIFEN se encarga de consultar la Lista de Certificados Revocados (LCR) al momento de la validación. El contribuyente **no** necesita anexar esta lista al firmar.

---

## 7. Resumen: Qué necesita un cliente para autenticarse

1. **Obtener un certificado digital X.509 v3** de un PSC habilitado por el MIC (tipo F1 software o F2 hardware)
2. El certificado debe contener:
   - El **RUC** del contribuyente (en `SerialNumber` si es persona jurídica, o `SubjectAlternativeName` si es persona física)
   - **Extended Key Usage** con `clientAuth` (para mTLS)
   - **KeyUsage** con firma digital y no repudio (para XML signing)
3. **Configurar TLS 1.2 con certificado de cliente** (mTLS) al conectarse a los endpoints SIFEN
4. **Firmar cada DE** con XML Digital Signature (Enveloped, RSA-SHA256), incluyendo el certificado X.509 completo en `<X509Certificate>`
5. Incluir el elemento `deHeaderMsg` en el SOAP Header de cada request
6. Transmitir el DE firmado dentro del `soap:Body` según el schema del WS correspondiente
