![Logo](page_1_image_1_v2.jpg)
![e-kuatia Logo](page_1_image_2_v2.jpg)
**Sistema Integrado de Facturación Electrónica Nacional**

# NOTA TÉCNICA N° 12

**Fecha:** 21/02/2023

**<u>Referencia</u>:** Correcciones y ajustes sobre el MT versión 150

### 1. Validaciones

#### <u>1.1. En Campos inherentes a la operación comercial (D010-D099) se agrega la siguiente validación:</u>

<table>
  <thead>
    <tr>
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
        <td>D022</td>
        <td>Moneda de la operación no corresponde al tipo de documento informado</td>
        <td>1213</td>
        <td>Si el tipo de documento informado es Autofactura Electrónica (C002=4) la moneda de la operación debe ser igual a PYG (D015=PYG)</td>
        <td>R</td>
    </tr>
      </mark>
  </tbody>
</table>

**Observación:** _Conforme a lo dispuesto en el Dictamen DEINT N° 344 de fecha 27 de Diciembre del 2022_

### Histórico del Documento

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
        <td>Jonathan Garay</td>
        <td>21/02/2023</td>
        <td>José Vernazza</td>
        <td>21/02/2023</td>
        <td>Validación 1213 – Conforme lo dispuesto en el Dictamen DEINT Nro. 344</td>
    </tr>
  </tbody>
</table>

1
