![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_1_image_1_v2.jpg)

# NOTA TÉCNICA N° 25

**Fecha:** 23/04/2024

<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>28/04/2025</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>28/04/2025</td>
    </tr>
  </tbody>
</table>

**<u>Referencia</u>**: Correcciones y ajustes sobre el Manual Técnico versión 150

## 1. <u>Validaciones</u>

1.1. <u>En la sección 11.6.1 REGLAS DE VALIDACIÓN PARA CANCELACIÓN se excluye la siguiente validación:</u>
**(Página 134)**

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
        <td><mark>GEC002c</mark></td>
        <td><mark>CDC ya se ha confirmado por el receptor</mark></td>
        <td><mark>4004</mark></td>
        <td><mark>Cuando el último evento del receptor sobre un CDC (GEC002) es una confirmación parcial o total, no se permite realizar la cancelación por parte del emisor</mark></td>
        <td><mark>R</mark></td>
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
        <td>Jonathan Garay</td>
        <td>23/04/2025</td>
        <td>Martha Rojas</td>
        <td>23/04/2025</td>
        <td>Elaboración del Documento, Formato de Campos y Validaciones</td>
    </tr>
  </tbody>
</table>

1
