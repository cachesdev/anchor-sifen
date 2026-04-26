![logo](page_1_image_2_v2.jpg) ![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

# NOTA TÉCNICA N° 2

**Fecha:** 16/07/2020

**Cambios desde la fecha:** 14/10/2019 al 16/07/2020

**<u>Referencia</u>:** Correcciones y ajustes sobre el MT versión 150

## 1. <u>FORMATO</u>

1.1. Se modifican los siguientes campos:

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
        <td>D3</td>
        <td>D208</td>
        <td>iTipIDRec</td>
        <td>Tipo de documento de identidad del receptor</td>
        <td>D200</td>
        <td>N</td>
        <td>1</td>
        <td>0-1</td>
        <td>Obligatorio si D201 = 2 y D202 ≠ 4<br/><mark>No informar si D201 = 1 o D202=4</mark><br/>1= Cédula paraguaya<br/>2= Pasaporte<br/>3= Cédula extranjera<br/>4= Carnet de residencia<br/>5= Innominado<br/>6=Tarjeta Diplomática de exoneración fiscal<br/>9= Otro</td>
    </tr>
    <tr>
        <td>D3</td>
        <td>D210</td>
        <td>dNumIDRec</td>
        <td>Número de documento de identidad</td>
        <td>D200</td>
        <td>A</td>
        <td>1-20</td>
        <td>0-1</td>
        <td>Obligatorio si D201 = 2 y D202 ≠ 4<br/><mark>No informar si D201 = 1 o D202=4</mark><br/>En caso de DE innominado, completar con 0 (cero)</td>
    </tr>
  </tbody>
</table>

Páginas: 71, 72

## 2. <u>VALIDACIONES</u>

2.1. Se eliminan las siguientes validaciones:

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
        <td><mark>63</mark></td>
        <td><mark>D208d</mark></td>
        <td><mark>El tipo de documento de identidad del receptor no es requerido</mark></td>
        <td><mark>1322</mark></td>
        <td><mark>Si la naturaleza del receptor es Contribuyente (D201=1) o el tipo de operación es igual a B2F (D202=4), el tipo de documento de identidad no debe ser informado</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td><mark>66</mark></td>
        <td><mark>D210a</mark></td>
        <td><mark>El número de documento de identidad del receptor no es requerido</mark></td>
        <td><mark>1323</mark></td>
        <td><mark>Si la naturaleza del receptor es contribuyente (D201=1) o el tipo de operación es igual a B2F (D202=4), el número de documento de identidad no debe ser informado</mark></td>
        <td>R</td>
    </tr>
  </tbody>
</table>

Páginas: 166, 167

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
        <td>Amanda González</td>
        <td>16/07/2020</td>
        <td>Carlos Mendoza</td>
        <td> </td>
        <td> </td>
    </tr>
  </tbody>
</table>

1
