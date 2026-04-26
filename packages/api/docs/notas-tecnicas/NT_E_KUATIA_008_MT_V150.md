![logo](page_1_image_1_v2.jpg)
![e-kuatia logo](page_1_image_2_v2.jpg)
Sistema Integrado de Facturación Electrónica Nacional

# NOTA TÉCNICA N° 008

**Fecha**: 21/09/2021

**Cambios desde la fecha 16/09/2021 al 21/09/2021**

**<u>Referencia</u>**: Correcciones y ajustes sobre el MT versión 150

## 1. Formato de campos XML

### 1.1. En el grupo de Póliza de seguros (EA790-EA799)se modifica el siguiente campo: (Página 94)

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
        <td>E9.3.1</td>
        <td>EA797</td>
        <td>dCodInt</td>
        <td>Código interno del ítem</td>
        <td>EA790</td>
        <td>A</td>
        <td><mark>1-50</mark></td>
        <td>0-1</td>
        <td>Como referencia al campo E701, si desea asociar la póliza al ítem</td>
    </tr>
  </tbody>
</table>

### 1.2. En el Campos que describen los subtotales y totales de la transacción documentada (F001-F099) se modifican y eliminan las fórmulas de los siguientes campos: (Página 106)

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
        <td>F</td>
        <td>F023</td>
        <td>dTotalGs</td>
        <td>Total general de la operación en Guaraníes</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p(0-8)</td>
        <td>0-1</td>
        <td>Si D015 ≠ PYG y D017 = 1, corresponde al cálculo aritmético:<br/>F014 * D018<br/>Si D015 ≠ PYG y D017 = 2, corresponde a la suma de todas las ocurrencias de EA009<br/>Este campo no debe existir si D015=PYG<br/>No informar si D015 = PYG<br/><mark>Cuando C002=4 corresponde a F014</mark></td>
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
        <td>21/09/2021</td>
        <td>DPF vía correo de fecha 16/09/2021</td>
        <td> </td>
        <td>Conforme al Ticket 157092.<br/>se elimina la diferencia que cuenta con relación a la Autofactura campo F023</td>
    </tr>
  </tbody>
</table>

1
