![Logo of the Ministry of Finance of Paraguay](page_1_image_1_v2.jpg)
![e-kuatia logo](image_url_placeholder)
**Sistema Integrado de Facturación Electrónica Nacional**

# NOTA TÉCNICA N° 010

Fecha: 04/02/2022

**Cambios desde la fecha 01/02/2021 al 04/02/2022**

<u>Referencia</u>: Correcciones y ajustes sobre el MT versión 150

1. <u>**Formato de campos XML**</u>

1.1. <u>En campos firmados del Documento Electrónico (A001-A099) se elimina el siguiente campo:</u> **(Página 62)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>A</td>
        <td>A005</td>
        <td>dSisFact</td>
        <td>Sistema de facturación</td>
        <td>A001</td>
        <td>N</td>
        <td>1</td>
        <td>1-1</td>
        <td>1=Sistema de facturación del contribuyente<br/><mark eliminado>2=SIFEN solución gratuita</mark></td>
    </tr>
  </tbody>
</table>

1.2. <u>En el Campos inherentes a la operación comercial (D010-D099) se modifica el siguiente campo:</u> **(Página 66)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>D1</td>
        <td>D012</td>
        <td>dDesTipTra</td>
        <td>Descripción del tipo de transacción</td>
        <td>D010</td>
        <td>A</td>
        <td>5-<mark modificado>39</mark></td>
        <td>0-1</td>
        <td>Obligatorio si existe el campo D011<br/>1= “Venta de mercadería”<br/>2= “Prestación de servicios”<br/>3= “Mixto (Venta de mercadería y servicios)<mark modificado>”</mark><br/>4= “Venta de activo fijo”<br/>5= “Venta de divisas”<br/>6= “Compra de divisas”<br/>7= “Promoción o entrega de muestras”<br/>8= “Donación”<br/>9= “Anticipo”<br/>10= “Compra de productos”<br/>11= “Compra de servicios”<br/>12= “Venta de crédito fiscal”<br/>13= ”Muestras médicas (Art. 3 RG 24/2014)”</td>
    </tr>
  </tbody>
</table>

1.3. <u>En el Campos que componen la Nota de Remisión Electrónica (E500-E599) se modifica el siguiente campo:</u> **(Página 79)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>E6</td>
        <td>E505</td>
        <td>dKmR</td>
        <td>Kilómetros estimados de recorrido</td>
        <td>E500</td>
        <td>N</td>
        <td>1-5</td>
        <td><mark modificado>1</mark>-1</td>
        <td> </td>
    </tr>
  </tbody>
</table>

1.4. <u>En el Grupo de rastreo de la mercadería (E750-<mark modificado>E761</mark>) se modifica los campos de observación y longitud, se elimina los siguientes campos y se agrega los campos de nombre de producto:</u> **(Página 90 y 91)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>E8.4</td>
        <td>E751</td>
        <td>dNumLote</td>
        <td>Número de lote</td>
        <td>E750</td>
        <td>A</td>
        <td>1-80</td>
        <td>0-1</td>
        <td><mark modificado>Obligados por Art. 1 de la RG N° 106/2021 – Agroquímicos</mark></td>
    </tr>
    <mark eliminado>
    <tr>
        <td>E8.4</td>
        <td>E756</td>
        <td>dNomImp</td>
        <td>Nombre del Importador</td>
        <td>E750</td>
        <td>A</td>
        <td>4-60</td>
        <td>0-1</td>
        <td>Obligados por la RG N° 16/2019 – Agroquímicos</td>
    </tr>
    <tr>
        <td>E8.4</td>
        <td>E757</td>
        <td>dDirImp</td>
        <td>Dirección de Importador</td>
        <td>E750</td>
        <td>A</td>
        <td>1-255</td>
        <td>0-1</td>
        <td>Obligados por la RG N° 16/2019 – Agroquímicos</td>
    </tr>
    </mark>
  </tbody>
</table>

1

Sistema Integrado de Facturación Electrónica Nacional

![Logo](page_2_image_2_v2.jpg) ![e-kuatia](image_url_placeholder)

<table>
  <tbody>
      <mark eliminado>
    <tr>
        <td>E8.4</td>
        <td>E758</td>
        <td>dNumFir</td>
        <td>Número de registro de la firma del importador</td>
        <td>E750</td>
        <td>A</td>
        <td>20</td>
        <td>0-1</td>
        <td>Obligados por la RG N° 16/2019 – Agroquímicos</td>
    </tr>
      </mark>
    <tr>
        <td>E8.4</td>
        <td>E759</td>
        <td>dNumReg</td>
        <td>Número de registro del producto otorgado por el SENAVE</td>
        <td>E750</td>
        <td>A</td>
        <td><mark modificado>1</mark>-20</td>
        <td>0-1</td>
        <td><mark modificado>Obligados por el Art. 1 de la RG N° 106/2021 – Agroquímicos</mark></td>
    </tr>
    <tr>
        <td>E8.4</td>
        <td>E760</td>
        <td>dNumRegEntCom</td>
        <td>Número de registro de entidad comercial otorgado por el SENAVE</td>
        <td>E750</td>
        <td>A</td>
        <td><mark modificado>1</mark>-20</td>
        <td>0-1</td>
        <td><mark modificado>Obligados por el Art. 1 de la RG N° 106/2021 – Agroquímicos</mark></td>
    </tr>
    <mark agregado>
    <tr>
        <td>E8.4</td>
        <td>E761</td>
        <td>dNomPro</td>
        <td>Nombre del Producto</td>
        <td>E750</td>
        <td>A</td>
        <td>1-30</td>
        <td>0-1</td>
        <td>Obligados por el Art. 1 de la RG N° 106/2021 – Agroquímicos</td>
    </tr>
    </mark>
  </tbody>
</table>

1.5. <u>En el Campos que identifican al transportista (persona física o jurídica) (E980-E999) se modifica el siguiente campo:</u> **(Página 101)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td> </td>
        <td>E980</td>
        <td>gCamTrans</td>
        <td>Campos que identifican al transportista</td>
        <td>E10.4</td>
        <td>G</td>
        <td> </td>
        <td>0-1</td>
        <td>Obligatorio si C002 = 7<br/>No informar si C002 = 4, 5, 6<br/><mark eliminado>Opcional cuando E903=1 y E967=1</mark></td>
    </tr>
    <tr>
        <td>E10.4</td>
        <td>E992</td>
        <td>dDomFisc</td>
        <td>Domicilio fiscal del transportista</td>
        <td>E980</td>
        <td>A</td>
        <td>1-150</td>
        <td><mark modificado>1</mark>-1</td>
        <td><mark agregado>Obligatorio por RG N° 41/2014</mark></td>
    </tr>
    <tr>
        <td>E10.4</td>
        <td>E993</td>
        <td>dDirChof</td>
        <td>Dirección del chofer</td>
        <td>E980</td>
        <td>A</td>
        <td>1-255</td>
        <td><mark modificado>1</mark>-1</td>
        <td><mark agregado>Obligatorio por por RG N° 41/2014</mark></td>
    </tr>
  </tbody>
</table>

1.6. <u>En el Campos que identifican al documento asociado (H001-H049) se elimina la siguiente observación ya que no aplica:</u> **(Página 109)**

<table>
  <thead>
    <tr>
      <th>Grupo</th>
      <th>ID</th>
      <th>Campo</th>
      <th>Descripción</th>
      <th>Nodo Padre</th>
      <th>Tipo Dato</th>
      <th>Longitud</th>
      <th>Ocurrencia</th>
      <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>H<br/><mark>C1</mark></td>
      <td>H009</td>
      <td>iTipoDocAso</td>
      <td>Tipo de documento impreso</td>
      <td>H001</td>
      <td>N</td>
      <td>1</td>
      <td>0-1</td>
      <td>Obligatorio si H002=2<br/>No informar si H002 =<br/>1 o 3<br/>1= Factura<br/>2= Nota de crédito<br/>3= Nota de débito<br/>4= Nota de remisión<br/><mark eliminado>5= Comprobante de retención</mark></td>
    </tr>
    <tr>
      <td>H<br/><mark>C1</mark></td>
      <td>H010</td>
      <td>dDTipoDocAso</td>
      <td>Descripción del tipo de documento impreso</td>
      <td>H001</td>
      <td>A</td>
      <td>7-16</td>
      <td>0-1</td>
      <td>Obligatorio si existe el<br/>campo H009<br/>1= “Factura”<br/>2= “Nota de crédito”<br/>3= “Nota de débito”<br/>4= “Nota de remisión”<br/><mark eliminado>5= “Comprobante de retención”</mark></td>
    </tr>
  </tbody>
</table>

1.7. <u>En el Grupo: Evento Inutilización (Formato del evento de inutilización) Se agrega número de serie al evento de Inutilización: C3</u> **(Página 122)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocu</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
      <mark agregado>
    <tr>
        <td>GDE</td>
        <td>GEI009</td>
        <td>dSerieNum</td>
        <td>Serie del número del documento</td>
        <td>GEI001</td>
        <td>A</td>
        <td>2</td>
        <td>0-1</td>
        <td> </td>
    </tr>
      </mark>
  </tbody>
</table>

1.8. <u>En el campo XDe del Schema XML 2: siRecepDE_v150.xsd (WS Recepción DE) se modifica el siguiente campo</u> **(Página 45)**

<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocu</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>ASch03</td>
        <td><mark modificado>xDE</mark></td>
        <td>XML del DE transmitido</td>
        <td>ASch01</td>
        <td>XML</td>
        <td>-</td>
        <td>1-1</td>
        <td>Siguiendo las definiciones del formato del DE</td>
    </tr>
  </tbody>
</table>

2

![Logo of SET](page_3_image_1_v2.jpg) ![Logo of e-kuatia](image_url_placeholder)
**Sistema Integrado de Facturación Electrónica Nacional**

1.9. <u>En el campo rEnviConsDe del schema XML 9: siConsDE_v150.xsd (WS Consulta DE) se modifica el siguiente campo</u> **(Página 50)**

<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocu</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>DSch01</td>
        <td><mark modificado>rEnviConsDeRequest</mark></td>
        <td>Raíz</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>Elemento Raíz</td>
    </tr>
  </tbody>
</table>

1.10. <u>En el grupo E6 Campos que componen la Nota de Remisión Electrónica (E500-E599)</u> **(Página 79)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
      <mark agregado>
    <tr>
        <td>E6</td>
        <td>E507</td>
        <td>cPreFle</td>
        <td>Costo del Flete</td>
        <td>E500</td>
        <td>N</td>
        <td>1-15p(0-8)</td>
        <td>0-1</td>
        <td>Precio del Flete para Situaciones particulares conforme al Art. 3° de la Resolución General N° 41/14</td>
    </tr>
      </mark>
  </tbody>
</table>

1.11. <u>En el Campos de datos del Timbrado (C001-C099) se modifica en la observación</u> **(Página 64)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Longitud</th>
        <th>Ocurrencia</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>C</td>
        <td>C008</td>
        <td>dFelniT</td>
        <td>Fecha inicio de vigencia del timbrado</td>
        <td>C001</td>
        <td>F</td>
        <td>10</td>
        <td>1-1</td>
        <td>Formato AAAA-MM-DD. Ejemplo <mark modificado>2018-05-31</mark>.<br/><br/>Para el KuDE el formato de la fecha de inicio de vigencia debe contener los guiones separadores <mark modificado>y representarse con el formato DD-MM-AAAA. Ejemplo: 31-05-2018</mark></td>
    </tr>
  </tbody>
</table>

# 2. **VALIDACIONES**

2.1. <u>D3. Datos que identifican al receptor del Documento Electrónico DE (D200 - D299) se modifican y elimina las siguientes validaciones y se agrega nueva validación:</u> **(Páginas 165, 166, 167, 189)**

<table>
  <thead>
    <tr>
        <th>N° Val</th>
        <th>ID</th>
        <th>Mensaje de la Validación</th>
        <th>Código</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>46</td>
        <td>D202</td>
        <td>El tipo de operación no compatible con la naturaleza del receptor</td>
        <td>1300</td>
        <td>Si el tipo de documento no es autofactura (C002 ≠ 4) y si la naturaleza del receptor es No contribuyente (D201=2), el tipo de operación debe ser B2C (D202=2).<br/><br/><mark modificado>Si la naturaleza del receptor es No contribuyente (D201=2), el tipo de operación debe ser B2C (D202=2) o B2F (D202=4).</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>70</td>
        <td>D220</td>
        <td>Descripción del departamento del <mark modificado>receptor</mark> no corresponde al código</td>
        <td>1325</td>
        <td>Descripción del departamento del <mark modificado>receptor</mark> no coincidente con lo informado en el campo D219</td>
        <td>R</td>
    </tr>
    <mark eliminado>
    <tr>
        <td> </td>
        <td><b</td>
        <td>Tipo de documento de identidad del receptor incorrecto para el tipo de operación</td>
        <td>1319</td>
        <td>El Tipo de documento de identidad del receptor no puede ser innominado (D208=5), cuando el tipo de operación es distinto a B2C (D202 ≠ 2)</td>
        <td>R</td>
    </tr>
    </mark>
    <mark agregado>
    <tr>
        <td> </td>
        <td>D208e</td>
        <td>El adquiriente del comprobante de venta informado no se encuentra identificado. Favor verifique el dato ingresado.</td>
        <td>1331</td>
        <td>Si el tipo de documento electrónico es Nota de Crédito (C002 = 5) o Nota de Débito (C002 = 6), el tipo de documento de identidad del receptor no puede ser INNOMINADO (D208 ≠ 5)</td>
        <td>R</td>
    </tr>
    </mark>
  </tbody>
</table>

3

![e-kuatia logo](page_4_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

**2.2. <u>Se agregan las siguientes validaciones:</u>** D2.2 Campos que identifican al responsable de la generación del DE (D140-D160) (Página 164)

<table>
  <thead>
    <tr>
        <th>N° Val</th>
        <th>ID</th>
        <th>Mensaje de la Validación</th>
        <th>Código</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
      <mark agregado>
    <tr>
        <td> </td>
        <td></td>
        <td>Descripción del tipo de documento de identidad del responsable de la generación del DE no corresponde al código</td>
        <td>1265</td>
        <td>Descripción del tipo de documento de identidad del responsable de la generación del DE no coincidente a lo informado en el campo D141</td>
        <td>R</td>
    </tr>
      </mark>
  </tbody>
</table>

**2.3. <u>H. Campos que identifican al documento asociado (H001-H049) se agrega dos nuevas validaciones y se modifica una.</u> **C11** (Páginas 189)**

<table>
  <thead>
    <tr>
        <th>N° Val</th>
        <th>ID</th>
        <th>Mensaje de la Validación</th>
        <th>Código</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
      <mark agregado>
    <tr>
        <td> </td>
        <td>H004g</td>
        <td>El CDC asociado no corresponde al emisor del documento electrónico.</td>
        <td>2439</td>
        <td>Si el tipo de documento asociado es electrónico (H002=1) el CDC debe corresponder al emisor del documento al cual se asocia.</td>
        <td>R</td>
    </tr>
    <tr>
        <td> </td>
        <td>H004h</td>
        <td>El CDC asociado no corresponde al receptor del documento electrónico.</td>
        <td>2441</td>
        <td>Si el tipo de documento asociado es electrónico (H002=1) el CDC debe coincidir al receptor del documento al cual se asocia.</td>
        <td>R</td>
    </tr>
    </mark>
    <tr>
        <td>255<br/>**C22**</td>
        <td>H005b</td>
        <td><mark modificado> El número de timbrado informado corresponde a un timbrado electrónico existente en la base de datos del SIFEN</mark></td>
        <td>2440</td>
        <td>Si el tipo de documento asociado seleccionado es igual a impreso (H002=2), no se debe informar un timbrado electrónico.</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

### 3. **<u>URL</u>**

**3.1. Se modifica la URL de Consulta QR: (Página 208)**

Ambiente de Producción: <mark modificado>https://ekuatia.set.gov.py/consultas/qr?</mark>
Ambiente de Test: <mark modificado>https://ekuatia.set.gov.py/consultas-test/qr?</mark>

### 4. **<u>Conformación del Código QR</u> **C18\*\*\*\*

**En la Sección 13.8.2. se agregan las siguientes observaciones adicionales para el código QR: (Página 205)**

1. Cuando el documento electrónico no tiene IVA se debe especificar el valor 0 para el campo dTotIVA.

2. Si el Código de Seguridad del Contribuyente no está vigente en la fecha de emisión del documento electrónico se retornará el error 2501.

### 5. **<u>Codificaciones</u>**

**5.1. Se Corrige en el manual la descripción en la Tabla 6 – Códigos de Afectación (Página 213)**

#### TABLA 6 – CODIGOS DE AFECTACION

<table>
  <thead>
    <tr>
        <th>Código</th>
        <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>1</td>
        <td>Gravado IVA</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Exonerado (<mark modificado>Art. 100 - Ley 6380/2019</mark>)</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Exento</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Gravado parcial</td>
    </tr>
  </tbody>
</table>

### 6. **<u>Namespace</u> **C23\*\*\*\*

**6.1. Se modifica el ejemplo de namespace utilizado en Eventos: (Página 31)**

4

![Abstract green squares logo](page_5_image_2_v2.jpg)
![e-kuatia logo](image_url_placeholder)
**Sistema Integrado de Facturación Electrónica Nacional**

```xml
<xsd:rEnviEventoDe>
    <xsd:dId>156</xsd:dId>
    <xsd:dEvReg>
        <gGroupGesEve
            xsi:schemaLocation="http://ekuatia.set.gov.py/sifen/xsd siRecepEvento_v150.xsd"
            xmlns="http://ekuatia.set.gov.py/sifen/xsd"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <rGesEve>
                <rEve Id="?">
                    <dFecFirma>2020-01-23T06:21:29</dFecFirma>
                    <dVerFor>150</dVerFor>
                    <gGroupTiEvt>
                        --Aquí campos del evento a enviar
                    </gGroupTiEvt>
                </rEve>
                <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
                    --Aquí campos de la firma
                </Signature>
            </rGesEve>
        </gGroupGesEve>
    </xsd:dEvReg>
</xsd:rEnviEventoDe>
```

# 7. Convenciones referenciadas en tablas

## 7.1. Se Corrige en el manual la descripción en la Tabla B – Tipos de Datos en los Archivos XML (Página 33)

<table>
  <thead>
    <tr>
        <th>Tipo</th>
        <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>N</td>
        <td>Numérico: Vea los diversos formatos en la Tabla <mark modificado>D</mark></td>
    </tr>
  </tbody>
</table>

# Histórico del Documento

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
        <td>Amanda González</td>
        <td>01/02/2021</td>
        <td>Carlos Mendoza</td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td>Sara Ramírez</td>
        <td>12/04/2021</td>
        <td>Carlos Mendoza</td>
        <td>30/04/2021</td>
        <td>Formatos de campo y Validaciones</td>
    </tr>
    <tr>
        <td>Sara Ramírez</td>
        <td>28/05/2021</td>
        <td>Carlos Mendoza</td>
        <td>22/06/2021</td>
        <td>últimas correcciones de códigos</td>
    </tr>
    <tr>
        <td>Sara Ramirez</td>
        <td>19/10/2021</td>
        <td>Andrea Riera</td>
        <td>22/07/2021</td>
        <td>Formatos de campo, Validaciones y Tabla</td>
    </tr>
    <tr>
        <td>Sara Ramirez</td>
        <td>04/02/2022</td>
        <td>Andrea Riera</td>
        <td>25/01/2022</td>
        <td>Formatos de campo, Validaciones y Tabla.</td>
    </tr>
  </tbody>
</table>

5
