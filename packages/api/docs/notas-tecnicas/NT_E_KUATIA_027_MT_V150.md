![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_1_image_1_v2.jpg)

# **NOTA TÉCNICA N° 27**

**Fecha:** 09/03/2026

<table>
  <thead>
    <tr>
        <th>Fecha puesta a disposición para el Ambiente de Test</th>
        <th>09/03/2026</th>
    </tr>
    <tr>
        <th>Fecha puesta a disposición para el Ambiente de Producción</th>
        <th>09/03/2026</th>
    </tr>
  </thead>
</table>

<u>**Referencia:**</u> Correcciones y ajustes sobre el Manual Técnico versión 150

## 1. <u>**FORMATO DE CAMPOS DE XML**</u>

1.1. <u>En el Evento de Nominación de Factura Electrónica (Formato del evento de nominación) se modifican los siguientes campos:</u>

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
    <tr>
        <td>GDE</td>
        <td>GENFE010</td>
        <td>iTipIDRec</td>
        <td>Tipo de documento de identidad del receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1</td>
        <td>0-1</td>
        <td>Obligatorio si GENFE004=2<br/>1=Cédula paraguaya<br/>2=Pasaporte<br/>3=Cédula extranjera<br/>4=Carnet de residencia<br/><mark modificado>6</mark>=Tarjeta Diplomática de exoneración fiscal<br/>9=Otro</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE011</td>
        <td>dDTipIDRec</td>
        <td>Descripción del tipo de documento de identidad</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>9-41</td>
        <td>0-1</td>
        <td>Obligatorio si existe el campo GENFE010<br/>1= “Cédula paraguaya”<br/>2= “Pasaporte”<br/>3= “Cédula extranjera”<br/>4= “Carnet de residencia”<br/><mark modificado>6</mark>= “Tarjeta Diplomática de exoneración fiscal”<br/>Si GENFE010=9 Se deberá informar el tipo de documento de identidad del receptor</td>
    </tr>
  </tbody>
</table>

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
        <td>05/03/2026</td>
        <td>Martha Rojas</td>
        <td>05/03/2026</td>
        <td>Elaboración del Documento, Formato de Campos y Validaciones</td>
    </tr>
  </tbody>
</table>

1
