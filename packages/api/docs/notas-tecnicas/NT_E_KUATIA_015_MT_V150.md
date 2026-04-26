![e-kuatia logo](page_1_image_1_v2.jpg)
**e-kuatia**
Sistema Integrado de Facturación
Electrónica Nacional

# NOTA TÉCNICA N° 15

**Fecha:** 14/08/2023


<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>21 de Agosto del 2023</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>21 de Septiembre del 2023</td>
    </tr>
  </tbody>
</table>

**Referencia:** Correcciones y ajustes sobre el MT versión 150

## 1. <u>Validaciones</u>

1.1. <u>En Campos que identifican al documento asociado (H001-H049) se agrega la siguiente validación.</u>

(Páginas 189)


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
        <td>H004i</td>
        <td>El receptor informado en el CDC asociado no corresponde al informado en el evento de Nominación de Factura Electrónica</td>
        <td>2442</td>
        <td>Si el tipo de documento asociado es electrónico (H002=1) el CDC debe coincidir al receptor informado en el evento de Nominación de Factura Electrónica</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

Observación: *Validación referente al Evento de Nominación de Factura Electrónica*

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
        <td>24/07/2023</td>
        <td>Martha Rojas</td>
        <td>08/08/2023</td>
        <td>Elaboración del Documento, Formato de Campos y Validaciones</td>
    </tr>
  </tbody>
</table>

1