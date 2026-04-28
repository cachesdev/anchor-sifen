![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_1_image_1_v2.jpg)

# NOTA TÉCNICA Nº 16

**Fecha:** 14/08/2023

<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>25 de Agosto del 2023</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>22 de Septiembre del 2023</td>
    </tr>
  </tbody>
</table>

**<u>Referencia:</u>** Correcciones y ajustes sobre el MT versión 150 sobre mejoras y adecuaciones necesarias relacionadas con la nueva Ley de servicios de confianza

## 1. <u>FORMATO</u>

### 1.1. <u>Se modifican los siguientes campos y observaciones:</u>

**<u>Sección 7.6. Estándar de firma digital</u>**

Schema XML 1: xmldsig-core-schema- v150.xsd (Estándar de la Firma Digital)

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Campo</th>
      <th>Descripción</th>
      <th>Nodo Padre</th>
      <th>Ocurrencia</th>
      <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>XS02</td>
      <td><mark modificado>SignedInfo</mark></td>
      <td>G</td>
      <td>XS01</td>
      <td>1-1</td>
      <td>Grupo de información de la firma</td>
    </tr>
    <tr>
      <td>XS03</td>
      <td>CanonicalizationMeth<br/>od</td>
      <td>G</td>
      <td>XS02</td>
      <td>1-1</td>
      <td><mark modificado>Grupo del método de canonicalización</mark></td>
    </tr>
    <tr>
      <td>XS04</td>
      <td>Algorithm</td>
      <td>A</td>
      <td>XS03</td>
      <td>1-1</td>
      <td><mark modificado>Atributo Algorithm de CanonicalizationMethod<br/><br/>Atributos válidos:<br/><br/>http://www.w3.org/TR/2001/REC-xml-c14n-20010315 (Inclusiva)<br/><br/>http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments (Inclusiva con comentarios)<br/><br/>http://www.w3.org/2001/10/xml-exc-c14n (Exclusiva)<br/><br/>http://www.w3.org/2001/10/xml-exc-c14n#WithComments (Exclusiva con comentarios)</mark></td>
    </tr>
    <tr>
      <td>XS05</td>
      <td>SignatureMethod</td>
      <td>G</td>
      <td>XS02</td>
      <td>1-1</td>
      <td><mark modificado>Tag del método de firma</mark></td>
    </tr>
    <tr>
      <td>XS06</td>
      <td>Algorithm</td>
      <td>A</td>
      <td>XS05</td>
      <td>1-1</td>
      <td><mark modificado>Atributo Algorithm de SignatureMethod<br/><br/>Atributos válidos:<br/><br/>http://www.w3.org/2001/04/xmldsig-more#rsa-sha256 (RSA-SHA-256) <br/> http://www.w3.org/2001/04/xmldsig-more#rsa-sha384 (RSA-SHA-384) <br/> http://www.w3.org/2001/04/xmldsig-more#rsa-sha512 (RSA-SHA-512)</mark></td>
    </tr>
  </tbody>
</table>

1

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional logo](page_2_image_1_v2.jpg)

<table>
  <tbody>
    <tr>
        <td>XS07</td>
        <td>Reference</td>
        <td>G</td>
        <td>XS02</td>
        <td>1-1</td>
        <td><mark modificado>Grupo de referencia de la firma</mark></td>
    </tr>
    <tr>
        <td>XS08</td>
        <td>URI</td>
        <td>A</td>
        <td>XS07</td>
        <td>1-1</td>
        <td><mark modificado>Atributo URI del tag Reference que identifica el grupo de campos que están firmados</mark></td>
    </tr>
    <tr>
        <td>XS10</td>
        <td>Transforms</td>
        <td>G</td>
        <td>XS07</td>
        <td>1-1</td>
        <td><mark modificado>Grupo de algoritmos de transformación</mark></td>
    </tr>
    <tr>
        <td><mark modificado>XS12</mark></td>
        <td><mark modificado>Transform</mark></td>
        <td>G</td>
        <td>XS10</td>
        <td><mark modificado>1-1</mark></td>
        <td><mark modificado>Tag del algoritmo de transformación</mark></td>
    </tr>
    <tr>
        <td>XS13</td>
        <td>Algorithm</td>
        <td>A</td>
        <td>XS12</td>
        <td><mark modificado>1-1</mark></td>
        <td><mark modificado>Atributo Algorithm del tag Transform<br/>Atributo válido:<br/>http://www.w3.org/2000/09/xmldsig#enveloped-signature (Enveloped Signature)</mark></td>
    </tr>
    <tr>
        <td>XS15</td>
        <td>DigestMethod</td>
        <td>G</td>
        <td>XS07</td>
        <td>1-1</td>
        <td><mark modificado>Grupo del DigestMethod</mark></td>
    </tr>
    <tr>
        <td>XS16</td>
        <td>Algortihm</td>
        <td>A</td>
        <td>XS15</td>
        <td>1-1</td>
        <td><mark modificado>Atributo Algorithm del tag DigestMethod<br/><br/>Atributos válidos:<br/><br/>http://www.w3.org/2001/04/xmlenc#sha256 (SHA-256)<br/>http://www.w3.org/2001/04/xmldsig-more#sha384 (SHA-384)<br/>http://www.w3.org/2001/04/xmlenc#sha512 (SHA-512)</mark></td>
    </tr>
    <tr>
        <td>XS17</td>
        <td>DigestValue</td>
        <td>E</td>
        <td>XS07</td>
        <td>1</td>
        <td><mark modificado>Digest Value (Valor retornado por el algoritmo definido en XS16)</mark></td>
    </tr>
    <tr>
        <td>XS18</td>
        <td>SignatureValue</td>
        <td>E</td>
        <td>XS01</td>
        <td>1-1</td>
        <td><mark modificado>Signature Value (Valor de la firma retornado por el algoritmo definido en XS06)</mark></td>
    </tr>
    <tr>
        <td>XS19</td>
        <td>KeyInfo</td>
        <td>G</td>
        <td>XS01</td>
        <td>1-1</td>
        <td><mark modificado>Grupo del KeyInfo (Información de la clave)</mark></td>
    </tr>
    <tr>
        <td>XS20</td>
        <td>X509Data</td>
        <td>G</td>
        <td>XS19</td>
        <td>1-1</td>
        <td><mark modificado>Grupo X509Data</mark></td>
    </tr>
    <tr>
        <td>XS21</td>
        <td>X509Certificate</td>
        <td>E</td>
        <td>XS20</td>
        <td>1-1</td>
        <td><mark modificado>Certificado Cualificado de Firma Electrónica X509.v3</mark></td>
    </tr>
  </tbody>
</table>

**Páginas: 38.**

<u>1.2. Se eliminan los siguientes campos de la misma tabla</u>

<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
      <mark eliminado>
    <tr>
        <td>XS14</td>
        <td>XPath</td>
        <td>E</td>
        <td>XS12</td>
        <td>0-n</td>
        <td>XPath</td>
    </tr>
      </mark>
  </tbody>
</table>

<u>1.3 Se modifican las siguientes observaciones</u>

2

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_3_image_1_v2.jpg)

## Sección 12.2.4 Validación de certificado de firma

<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Resultado de validación</th>
        <th>C;odig o</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td rowspan="4">AC01</td>
        <td rowspan="4">Certificado inválido</td>
        <td rowspan="4">0120</td>
        <td>No existe el certificado de firma en el mensaje</td>
        <td rowspan="4">R</td>
    </tr>
    <tr>
        <td>No se aceptan certificados del PSC</td>
    </tr>
    <tr>
        <td>KeyUsage no define &lt;b&gt;firma digital&lt;/b&gt; y no &lt;b&gt;Repudio&lt;/b&gt;</td>
    </tr>
    <tr>
        <td><mark agregado>Cadena de certificación inválida</mark></td>
    </tr>
  </tbody>
</table>

**Páginas**: 152.

## Sección 12.2.5 Validación de la firma digital

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Resultado de validación</th>
      <th>Códíg<br/>o</th>
      <th>Observación</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6">AD01</td>
      <td rowspan="6">Firma difiere del estándar<br/><mark agregado>[Detalle del error]</mark></td>
      <td rowspan="6">0140</td>
      <td>No fue firmado el documento completo (falta Reference URI en la firma)</td>
      <td rowspan="6">R</td>
    </tr>
    <tr>
      <td>Transform Algorithm previsto en la firma (<mark modificado>Enveloped Signature</mark>) no informado o no válido</td>
    </tr>
    <tr>
      <td><mark agregado>Canonicalization Method previsto en la firma no informado o no válido</mark></td>
    </tr>
    <tr>
      <td><mark agregado>Signature Method previsto en la firma no informado o no válido</mark></td>
    </tr>
    <tr>
      <td><mark agregado>Digest Method previsto en la firma no informado o no válido</mark></td>
    </tr>
    <tr>
      <td><mark agregado>Reference URI no coincide con el atributo Id del documento</mark></td>
    </tr>
    <tr>
      <td rowspan="9">AD02</td>
      <td rowspan="9">Valor de la firma<br/>(SignatureValue) diferente del<br/>calculado por el PKI <mark agregado>[Detalle<br/>del error]</mark></td>
      <td rowspan="9">0141</td>
      <td><mark agregado>XML modificado luego de la firma o mal firmado</mark></td>
      <td rowspan="9">R</td>
    </tr>
    <tr>
      <td><mark eliminado>Certificado del PCSC no habilitado por el MIC</mark></td>
    </tr>
    <tr>
      <td><mark eliminado>Certificado del PCSC revocado</mark></td>
    </tr>
    <tr>
      <td><mark eliminado>Certificado no está firmado por el PCSC</mark></td>
    </tr>
    <tr>
      <td><mark eliminado>Dirección de la LCR no informada<br/>(CRLDistributionPoint)</mark></td>
    </tr>
    <tr>
      <td><mark eliminado>Error en el acceso a la LCR</mark></td>
    </tr>
    <tr>
      <td><mark eliminado>LCR inexistente</mark></td>
    </tr>
    <tr>
      <td><mark eliminado>Certificado de firma revocado</mark></td>
    </tr>
    <tr>
      <td><mark eliminado>Certificado raíz no corresponde al MIC</mark></td>
    </tr>
  </tbody>
</table>

**Páginas**: 153.

3

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_4_image_1_v2.jpg)

## <u>Sección 12.4. Validaciones del formato</u>

### <u>Subsección I. Información de la Firma Digital del DTE (I001-I049)</u>

<table>
  <thead>
    <tr>
        <th>Nro. Val</th>
        <th>ID</th>
        <th>Mensaje de validación</th>
        <th>Código</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td rowspan="10">278</td>
        <td rowspan="10">I002</td>
        <td rowspan="10">Certificado digital no vigente<br/>al momento de firma del DE<br/>[Detalle del error]</td>
        <td rowspan="10">2450</td>
        <td>El certificado digital (I002) debe estar vigente(no<br/>revocado) al momento de la firma digital (A004)</td>
        <td rowspan="10">R</td>
    </tr>
    <tr>
        <td><mark agregado>Certificado del PCSC no habilitado por el MIC</mark></td>
    </tr>
    <tr>
        <td><mark agregado>Certificado del PCSC revocado</mark></td>
    </tr>
    <tr>
        <td><mark agregado>Certificado no está firmado por el PCSC</mark></td>
    </tr>
    <tr>
        <td><mark agregado>Dirección de la LCR no informada<br/>(CRLDistributionPoint)</mark></td>
    </tr>
    <tr>
        <td><mark agregado>Error en el acceso a la LCR</mark></td>
    </tr>
    <tr>
        <td><mark agregado>LCR inexistente</mark></td>
    </tr>
    <tr>
        <td><mark agregado>Certificado de firma revocado</mark></td>
    </tr>
    <tr>
        <td><mark agregado>Certificado raíz no corresponde al MIC</mark></td>
    </tr>
    <tr>
        <td><mark agregado>Certificado expirado</mark></td>
    </tr>
  </tbody>
</table>

Páginas: 152.

<mark agregado>PCSC : Prestadores Cualificados de Servicios de Confianza. Según Art 4. Definiciones #38 de la Ley 6822</mark>

### <u>1.4 Se modifica la siguiente</u>

<u>Sección 12.2.1 Validaciones del certificado de transmisión. Protocolo TLS</u>

<mark agregado>Retorna un html con el mensaje de error de Acceso Denegado por las políticas de acceso. Estas validaciones se realizan durante la conexion con el servicio y son propias del protocolo TLS.</mark>

<mark agregado>La siguiente tabla muestra las posibles causas</mark>

<table>
  <thead>
    <tr>
        <th>Inconveniente</th>
        <th>Observación</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td rowspan="4">Certificado de Transmisor Inválido</td>
        <td>Certificado de Transmisor inexistente en el mensaje</td>
    </tr>
    <tr>
        <td>Versión incorrecta</td>
    </tr>
    <tr>
        <td>No se aceptan certificados de la AC</td>
    </tr>
    <tr>
        <td>ExtendKeyUsage no define “ClientAuth“</td>
    </tr>
    <tr>
        <td>Plazo de validez del Certificado cualificado de firma electrónica</td>
        <td> </td>
    </tr>
    <tr>
        <td>Cadena de Certificación</td>
        <td>Certificado del emisor no corresponde a un PCSC habilitado en el país</td>
    </tr>
  </tbody>
</table>

4

![e-kuatia logo](page_5_image_1_v2.jpg)
**e-kuatia**
Sistema Integrado de Facturación
Electrónica Nacional

<table>
  <tbody>
    <tr>
        <td> </td>
        <td>Certificado del PCSC revocado</td>
    </tr>
    <tr>
        <td> </td>
        <td>Certificado no firmado por el PCSC emisor del Certificado</td>
    </tr>
    <tr>
        <td rowspan="3">LCR del Certificado Transmisor</td>
        <td>No existe la dirección de la LCR (CRL DistributionPoint)</td>
    </tr>
    <tr>
        <td>LCR indisponible</td>
    </tr>
    <tr>
        <td>LCR invalida</td>
    </tr>
    <tr>
        <td>Certificado del transmisor revocado</td>
        <td> </td>
    </tr>
    <tr>
        <td>Certificado Raíz no pertenece al MIC</td>
        <td> </td>
    </tr>
    <tr>
        <td>No existe la extensión del RUC del emisor en el certificado</td>
        <td>Si el Certificado es de persona jurídica, el RUC debe estar informado en el campo SerialNumber en caso de ser del tipo de Persona Física el RUC, estará informado en el campo: SubjectAlternativeName</td>
    </tr>
    <tr>
        <td><mark agregado>Inconveniente temporal del SIFEN</mark></td>
        <td> </td>
    </tr>
  </tbody>
</table>

**Páginas:** 150.

## Histórico del Documento

<table>
  <thead>
    <tr>
        <th>AUTOR</th>
        <th>FECHA DE ELABORACIÓN</th>
        <th>REVISOR</th>
        <th>FECHA DE REVISIÓN</th>
        <th>PRINCIPALES ALTERACIONES</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Norma Rojas</td>
        <td>05/06/2023</td>
        <td>DTICs</td>
        <td>08/08/2023</td>
        <td>Elaboración del documento</td>
    </tr>
  </tbody>
</table>

5
