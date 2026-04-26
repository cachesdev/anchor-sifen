![Logo](page_1_image_1_v2.jpg)
![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

# NOTA TÉCNICA N° 007

**Fecha**: 01/02/2022

**Cambios desde la fecha 01/02/2022al 01/02/2022**

<u>**Referencia**</u>: Correcciones y ajustes sobre el MT versión 150

## B. Campos inherentes a la operación de Documentos Electrónicos (B001-B099)


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
        <td>B</td>
        <td>B001</td>
        <td>gOpeDE</td>
        <td>Campos<br/>inherentes a la<br/>operación de DE</td>
        <td>A001</td>
        <td>G</td>
        <td> </td>
        <td>1-1</td>
        <td>Esta información debe ser<br/>impresa en el KuDE.<br/>Cuando el tipo de documento<br/>es Nota de remisión (C002=7)<br/>es obligatorio informar el<br/>mensaje según el Art. 3 Inc. 7<br/>de la Resolución general Nro.<br/>41/2014</td>
    </tr>
    <tr>
        <td>B</td>
        <td>B006</td>
        <td>dInfoFisc</td>
        <td>Información de<br/>interés del Fisco<br/>respecto al DE</td>
        <td>B001</td>
        <td>A</td>
        <td>1-3000</td>
        <td>0-1</td>
        <td><mark>En caso de realizar Factura<br/>Exportación, en este campo en<br/>la FE se debe completar con los<br/>siguientes datos y en este orden<br/>de conformidad al Art 20<br/>numeral 15 del Decreto N°<br/>10797/2013:<br/>a) Tipo de Operación,<br/>b) Condición de Negociación,<br/>(CIF, FOB, otros.)<br/>c) País de Destino,<br/>d) Empresa Fletera o Exportador<br/>Nacional,<br/>e) Agente de Transporte,<br/>f) Instrucciones de Pago para el<br/>cliente (Beneficiario, Banco, N°<br/>de cuenta, Código SWIFT,<br/>Cartas de Crédito, otro).<br/>g) Número/s de Conocimiento/s<br/>de Embarque.<br/>h) Número/s de Manifiesto/s<br/>Internacional/es de Carga.<br/>i) Número de barcaza o<br/>remolcador, descripción y<br/>cantidad del bien transportado<br/>(en los casos de Flete<br/>Internacional),<br/>j) Las demás informaciones que<br/>sean fijadas por la<br/>Administración Tributaria, en<br/>normas de carácter general ".</mark></td>
    </tr>
  </tbody>
</table>

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
        <td>Sara Ramirez</td>
        <td>01/02/2022</td>
        <td>Martha Rojas</td>
        <td>24/02/2022</td>
        <td>Modificar el campo de<br/>interés del fisco<br/>incluyendo<br/>observaciones de<br/>Factura Exportador<br/>hasta tanto se defina el<br/>documento de Factura<br/>Electrónica de<br/>Exportador timbrado.<br/><br/>Y reenumerar la nota<br/>técnica para su<br/>publicación.</td>
    </tr>
  </tbody>
</table>

1

![logo](page_2_image_2_v2.jpg)
![logo](image_url_placeholder)
# Sistema Integrado de Facturación Electrónica Nacional

Ejemplo de Representación gráfica

# KUDE de Factura Electrónica de Exportación

![e-kuatia logo](image_url_placeholder)

**Sistema Integrado de Factura Electrónica Nacional**
Avenida González Vidal N° 1434
Ciudad: Asunción

**Teléfono**: 021 417 7017
**Facturacionelectrónica@set.gov.py**
**Actividad Económica**: Facturación Electrónica

**RUC**: 2365438-8
**Timbrado N°**: 1000332
**Fecha de Inicio de Vigencia**: 01/01/2022

**FACTURA ELECTRÓNICA (exportación)**
**001-001-0000001**

---

* **Fecha y hora de emisión**: 22-01-2022 14:22:00
* **RUC/Documento de identidad N°**: 2166160711
* **Condición de Venta**:
    * Contado [x]
    * Crédito [ ]
* **Nombre o razón social**: TLG Uruguay SA.
* **Cuotas**:     
* **Tipo de Cambio**: 6850
* **Dirección**: Avda Las américas 8332 - Uruguay
* **Moneda**: USD
* **Teléfono**: 598 81539732
* **Tipo de Cambio Global o por Item**: GLOBAL
* **Correo electrónico**: jorges@gmail.com
* **Tipo de transacción**: Venta de Mercadería
* **Tipo de documento asociado**: FE o preimpreso

---


<table>
  <thead>
    <tr>
        <th>Cód.</th>
        <th>Descripción</th>
        <th>Unidad de Medida</th>
        <th>Cantidad</th>
        <th>Precio Unitario</th>
        <th>Totales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>2</td>
        <td>Monitores</td>
        <td>UNI</td>
        <td>5</td>
        <td>300,00</td>
        <td>1.500,00</td>
    </tr>
    <tr>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td>TOTAL</td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td>1.500,00</td>
    </tr>
  </tbody>
</table>

---


<table>
  <tbody>
    <tr>
        <td>Tipo de Operación*:</td>
        <td>Exportación</td>
    </tr>
    <tr>
        <td>Condición de Negociación:</td>
        <td>FCA</td>
    </tr>
    <tr>
        <td>País de Destino:</td>
        <td>Uruguay</td>
    </tr>
    <tr>
        <td>Empresa Fletera o Exportador Nacional:</td>
        <td>Transporte FARINA TALAVERA</td>
    </tr>
    <tr>
        <td>Agente de Transporte:</td>
        <td>LIZ GARAY</td>
    </tr>
    <tr>
        <td>N° de Conocimientos de Embarque:</td>
        <td> </td>
    </tr>
    <tr>
        <td>N° de Manifiesto Internacional de Carga:</td>
        <td> </td>
    </tr>
    <tr>
        <td>Numero de Barcaza o Remolcador:</td>
        <td> </td>
    </tr>
    <tr>
        <td>Instrucción del Pago:</td>
        <td> </td>
    </tr>
  </tbody>
</table>

---

![qr code](page_2_image_1_v2.jpg)

Consulte la validez de esta Factura Electrónica de Exportación con el número CDC impreso abajo
https://ekuatia.set.gov.py/consultas/

CDC 0102 3654 3880 0100 1000 0001 1202 2012 2158 7326 0988

ESTE DOCUMENTO ES UNA REPRESENTACIÓN GRÁFICA DE UN DOCUMENTO ELECTRÓNICO (XML)
Información de interés del facturador electrónico emisor

*Este campo se extrae de los datos e información del campo "Información adicional de interés del fisco respecto al DE", campo que se ha definido para registrar la información adicional que deben diligenciar los exportadores (Decreto N° 10797/2013 art. 20).

2