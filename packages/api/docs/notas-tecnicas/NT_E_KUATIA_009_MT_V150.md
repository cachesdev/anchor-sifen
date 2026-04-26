![Logo of abstract green shapes](page_1_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

# NOTA TÉCNICA N° 009

**Fecha:** 09/09/2021

**Cambios desde la fecha 08/09/2021 al 09/09/2021**

<u>Referencia:</u> Correcciones y ajustes sobre el MT versión 150

## 1. <u>Formato de campos XML</u>

1.1. <u>En el Campos que describen los ítems de la operación (E700-E899) se modifica el siguiente campo:</u> **(Página 85)**

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
        <td>E8</td>
        <td>E701</td>
        <td>dCodInt</td>
        <td>Código interno</td>
        <td>E700</td>
        <td>A</td>
        <td><mark>1-50</mark></td>
        <td>1-1</td>
        <td>Código interno de identificación de la mercadería o servicio de responsabilidad del emisor. No se pueden tener ítems distintos de mercadería o servicio con el mismo código interno en su catastro de productos o servicios. Este código se puede repetir en el DE siempre que el producto o servicio sea el mismo.</td>
    </tr>
    <tr>
        <td>E8</td>
        <td>E708</td>
        <td>dDesProSer</td>
        <td>Descripción del producto y/o servicio</td>
        <td>E700</td>
        <td>A</td>
        <td><mark>1-2000</mark></td>
        <td>1-1</td>
        <td>Equivalente a nombre del producto establecido en la RG 24/2019</td>
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
        <td>Sara Ramírez</td>
        <td>28/05/2021</td>
        <td>Carlos Mendoza</td>
        <td>22/06/2021</td>
        <td>últimas correcciones de códigos</td>
    </tr>
    <tr>
        <td>Sara Ramírez</td>
        <td>09/09/2021</td>
        <td>Dictamen DPTT Nº 127/2021 y parecer de DPF vía correo de fecha 08/09/2021</td>
        <td> </td>
        <td>Conforme al Ticket 253918 , se amplia la longitud del campo E708</td>
    </tr>
  </tbody>
</table>

1
