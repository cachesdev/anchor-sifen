![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_1_image_1_v2.jpg)

# NOTA TÉCNICA N° 21

**Fecha**: 29/12/2023

<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>01/01/2024</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>01/01/2024</td>
    </tr>
  </tbody>
</table>

<u>**Referencia**</u>: Correcciones y ajustes sobre el Manual Técnico versión 150

## 1. <u>Validaciones</u>

1.1. <u>En Datos que identifican al receptor del Documento Electrónico DE (D200 - D299) se modifica la siguiente validación.</u> (Página 166)

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
    <tr>
        <td>D208c</td>
        <td>Tipo de documento de identidad del receptor incorrecto para el total general de la operación en guaraníes</td>
        <td>1321</td>
        <td><mark eliminado>Si el Tipo de transacción es distinto a Muestras médicas (D011≠13),</mark> <mark modificado>El</mark> Tipo de documento de identidad del receptor no puede ser Innominado (D208≠5) cuando el total general de la operación en guaraníes (cuando la moneda es extranjera) o el total general de la operación (cuando la moneda es PYG) es mayor <mark eliminado>o igual</mark> a <mark modificado>35.000.000</mark> (F023 ><mark eliminado>=</mark> <mark modificado>35000000</mark> o F014 ><mark eliminado>=</mark> <mark modificado>35000000</mark>)</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

**Observación**: _Conforme a lo dispuesto en el Artículo N° 6 del Decreto N° 872/2023_

VER NOTA TÉCNICA N° 24 DESDE EL 01/01/2025

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
        <td>20/12/2023</td>
        <td>Martha Rojas</td>
        <td>21/12/2023</td>
        <td>Elaboración del Documento, Formato de Campos y Validaciones</td>
    </tr>
  </tbody>
</table>

1
