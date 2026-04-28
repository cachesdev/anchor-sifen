![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_1_image_1_v2.jpg)

# NOTA TÉCNICA N° 17

**Fecha:** 14/08/2023

<table>
  <thead>
    <tr>
        <th>Fecha puesta a disposición para el Ambiente de Test</th>
        <th>24 de Agosto del 2023</th>
    </tr>
    <tr>
        <th>Fecha puesta a disposición para el Ambiente de Producción</th>
        <th>25 de Agosto del 2023</th>
    </tr>
  </thead>
</table>

<u>Referencia:</u> Correcciones y ajustes sobre el MT versión 150

## 1. <u>Validaciones</u>

### <u>2.1 SE MODIFICAN LOS SIGUIENTES MENSAJES DE VALIDACIÓN PARA LOS DATOS QUE IDENTIFICAN AL RECEPTOR DEL DOCUMENTO ELECTRÓNICO DE</u>

<u>(Páginas 167)</u>

### <u>D3. Campos que identifican al receptor del Documento Electrónico DE (D200-D299)</u>

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
        <td>71</td>
        <td>D222</td>
        <td>Descripción del distrito del <mark modificado>receptor</mark> no corresponde al código</td>
        <td>1326</td>
        <td>Descripción del distrito del <mark modificado>receptor</mark> no coincidente con lo informado en el campo D221</td>
        <td>R</td>
    </tr>
    <tr>
        <td>74</td>
        <td>D224</td>
        <td>Descripción de la ciudad del <mark modificado>receptor</mark> no corresponde al código</td>
        <td>1329</td>
        <td>Descripción de la ciudad del <mark modificado>receptor</mark> no coincidente con lo informado en el campo D223</td>
        <td>R</td>
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
        <td>Norma Rojas</td>
        <td>11/08/2023</td>
        <td>Martha Rojas</td>
        <td>17/08/2023</td>
        <td>Elaboración del Documento:<br/>Ajustes de mensaje de validación</td>
    </tr>
  </tbody>
</table>
