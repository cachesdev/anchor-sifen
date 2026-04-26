![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_1_image_1_v2.jpg)

# NOTA TÉCNICA N° 26

**Fecha:** 06/06/2025

<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>09/06/2025</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>16/06/2025</td>
    </tr>
  </tbody>
</table>

<u>**Referencia:**</u> Correcciones y ajustes sobre el MT versión 150

### **<u>1. Formato de Campos XML</u>**

1.1. <u>En Campos que describen los ítems de la operación (E700-E899) se modifican las siguientes observaciones.</u>

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
        <td>E8</td>
        <td>E704</td>
        <td>dDncpG</td>
        <td>Código DNCP –<br/>Nivel General</td>
        <td>E700</td>
        <td>A</td>
        <td>8</td>
        <td>0-1</td>
        <td><mark>Opcional</mark> si D202 = 3<br/>Informar se existe el código de la DNCP<br/>Colocar 0 (cero) a la izquierda para completar los espacios vacíos</td>
    </tr>
    <tr>
        <td>E8</td>
        <td>E705</td>
        <td>dDncpE</td>
        <td>Código DNCP –<br/>Nivel Especifico</td>
        <td>E700</td>
        <td>A</td>
        <td>3-4</td>
        <td>0-1</td>
        <td><mark>Opcional</mark> si D202 = 3<br/>Informar se existe el código de la DNCP<br/>Colocar 0 (cero) a la izquierda para completar los espacios vacíos</td>
    </tr>
  </tbody>
</table>

1.2. <u>En Campos de informaciones de Compras Públicas (E020-E029) se modifica la siguiente observación.</u>

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
        <td>E1.1</td>
        <td>E020</td>
        <td>gCompPub</td>
        <td>Campos que describen las informaciones de compras públicas</td>
        <td>E010</td>
        <td>G</td>
        <td> </td>
        <td>0-1</td>
        <td><mark>Opcional</mark> si D202 = 3 (Tipo de operación B2G)</td>
    </tr>
  </tbody>
</table>

### **<u>2. Validaciones</u>**

2.1. <u>Se excluyen las siguientes reglas de validación en E1.1. GRUPO DE INFORMACIONES DE COMPRAS PÚBLICAS (E020-E029).</u>

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
        <td><mark>E020</mark></td>
        <td><mark>Grupo de informaciones de Compras Públicas es obligatorio</mark></td>
        <td><mark>1400</mark></td>
        <td><mark>El grupo de informaciones de Compras Públicas es obligatorio para tipo de operación B2G (D202=3)</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>E020a</mark></td>
        <td><mark>Grupo de informaciones de Compras Públicas no requerido para el tipo de operación</mark></td>
        <td><mark>1401</mark></td>
        <td><mark>El grupo de informaciones de Compras Públicas solo es permitido para tipo de operación B2G (D202=3)</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

1

![e-kuatia logo](page_2_image_1_v2.jpg)
**e-kuatia**
Sistema Integrado de Facturación
Electrónica Nacional

2.2. <u>Se excluyen las siguientes reglas de validación E8. Campos que describen los ítems de la operación (E700-E899).</u>

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
        <td><mark>E704</mark></td>
        <td><mark>Código de DNCP - Nivel General es obligatorio para el tipo de operación B2G</mark></td>
        <td><mark>1800</mark></td>
        <td><mark>Si el tipo de operación seleccionado es igual a B2G (D202=3), es obligatorio informar el Código DNCP – Nivel General (E704)</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>E705</mark></td>
        <td><mark>Código de DNCP – Nivel Específico es obligatorio</mark></td>
        <td><mark>1801</mark></td>
        <td><mark>Si se informa el Código de DNCP – Nivel General (E704) es obligatorio informar el código de DNCP – Nivel Específico (E705)</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

# Histórico del Documento

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
        <td>Martha Rojas</td>
        <td>05/06/2025</td>
        <td>Jonathan Garay</td>
        <td>06/06/2025</td>
        <td>Elaboración del documento, modificaciones de campos, creación de validaciones.</td>
    </tr>
  </tbody>
</table>

2
