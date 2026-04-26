![logo](page_1_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

# NOTA TÉCNICA N° 13

**Fecha:** 20/03/2023


<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>21 de Abril del 2023</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>17 de Junio del 2023</td>
    </tr>
  </tbody>
</table>

**<u>Referencia</u>:** Correcciones y ajustes sobre el MT versión 150

## 1. <u>Formato de Campos XML</u>

**1.1** En Campos que describen el IVA de la operación por ítem (E730-E739) se modifica el siguiente campo de Observaciones. (**Página 90**)


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
        <td>E8.2</td>
        <td>E735</td>
        <td>dBasGravIVA</td>
        <td>Base gravada del<br/>IVA por ítem</td>
        <td>E730</td>
        <td>N</td>
        <td>1-15p(0-8)</td>
        <td>1-1</td>
        <td>Si E731 = 1 o 4 este<br/>campo es igual al<br/>resultado del cálculo:<br/><br/>[100 * EA008 * E733] /<br/>[10000 + (E734 * E733)]<br/><br/>Si E731 = 2 o 3 este<br/>campo es igual 0</td>
    </tr>
  </tbody>
</table>

**1.2** En Campos que describen el IVA de la operación por ítem (E730-E739) se agregan los siguientes campos. (**Página 90**)


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
        <td><mark>E8.2</mark></td>
        <td><mark>E737</mark></td>
        <td><mark>dBasExe</mark></td>
        <td><mark>Base Exenta por<br/>ítem</mark></td>
        <td><mark>E730</mark></td>
        <td><mark>N</mark></td>
        <td><mark>1-15p(0-8)</mark></td>
        <td><mark>1-1</mark></td>
        <td><mark>Si E731 = 4 este campo es<br/>igual al resultado del<br/>cálculo:<br/><br/>[100 * EA008 * (100 –<br/>E733)] / [10000 + (E734 *<br/>E733)]<br/><br/>Si E731 = 1 , 2 o 3 este<br/>campo es igual 0</mark></td>
    </tr>
  </tbody>
</table>

**1.3** En Campos que describen los subtotales y totales de la transacción documentada (F001-F099) se modifican los siguientes campos de Observaciones. (**Página 103**)


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
        <td>F002</td>
        <td>dSubExe</td>
        <td>Subtotal de la<br/>operación exenta</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p(0-8)</td>
        <td>0-1</td>
        <td>Suma de todas las<br/>ocurrencias de EA008<br/>(Valor total de la<br/>operación por ítem)<br/>cuando la operación sea<br/>exenta (Si E731 = 3), más<br/>Todas las ocurrencias de<br/>la Base Exenta (E737)<br/>cuando la operación sea<br/>Gravado Parcial (Si E731 =<br/>4).</td>
    </tr>
  </tbody>
</table>

![Logo](page_2_image_2_v2.jpg)
![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

<table>
  <tbody>
    <tr>
        <td>F</td>
        <td>F004</td>
        <td>dSub5</td>
        <td>Subtotal de la operación con IVA incluido a la tasa 5%</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p(0-8)</td>
        <td>0-1</td>
        <td>Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 5% (E734=5) y (Si E731 = 1), más todas las ocurrencias de (E735 + E736) cuando la operación sea a la tasa del 5% (E734=5) y (Si E731 = 4).<br/>No debe existir el campo si D013 ≠ 1 o D013 ≠ 5</td>
    </tr>
    <tr>
        <td>F</td>
        <td>F005</td>
        <td>dSub10</td>
        <td>Subtotal de la operación con IVA incluido a la tasa 10%</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p(0-8)</td>
        <td>0-1</td>
        <td>Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 10% (E734=10) y (Si E731 = 1), más todas las ocurrencias de (E735 + E736) cuando la operación sea a la tasa del 10% (E734=10) y (Si E731 = 4).<br/>No debe existir el campo si D013 ≠ 1 o D013 ≠ 5</td>
    </tr>
  </tbody>
</table>

# 2. <u>Validaciones</u>

## 2.1 En Campos que describen el IVA de la operación (E730-E739) se agrega la siguiente validación. (Página 178)


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
        <td><mark>283</mark></td>
        <td><mark>E737</mark></td>
        <td><mark>Error en el cálculo de la base exenta por ítem</mark></td>
        <td><mark>1921</mark></td>
        <td><mark>Cálculo de la base exenta por ítem incorrecto.<br/>Si E731 = 4 este campo es igual al resultado del cálculo:<br/>[100 * EA008 * (100 – E733)] / [10000 + (E734 * E733)]<br/>Si E731 = 1 , 2 o 3 este campo es igual 0</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

## 2.2 En Campos que describen el IVA de la operación (E730-E739) se modifican los siguientes campos de Observación. (Página 178)


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
        <td>158</td>
        <td>E735a</td>
        <td>Error en el cálculo de la base gravada del IVA por ítem para tasa del 5%</td>
        <td>1910</td>
        <td>Cálculo de la base gravada del IVA por ítem incorrecto.<br/>Si E734 = 5 este campo es igual al resultado del cálculo:<br/><mark>[100 * EA008 * E733] / [10000 + (E734 * E733)]</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>159</td>
        <td>E735b</td>
        <td>Error en el cálculo de la base gravada del IVA por ítem para tasa del 10%</td>
        <td>1911</td>
        <td>Cálculo de la base gravada del IVA por ítem incorrecto.<br/>Si E734 = 10 este campo es igual al resultado del cálculo:<br/><mark>[100 * EA008 * E733] / [10000 + (E734 * E733)]</mark></td>
        <td>R</td>
    </tr>
  </tbody>
</table>

![Logo](page_3_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)
**Sistema Integrado de Facturación Electrónica Nacional**

<table>
  <tbody>
    <tr>
        <td>213</td>
        <td>F002a</td>
        <td>Cálculo del subtotal de la operación exenta incorrecto</td>
        <td>2353</td>
        <td><mark>Error en el cálculo del subtotal de la operación exenta</mark><br/>El cálculo debe corresponder a la suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea exenta (Si E731 = 3), más<br/><mark>Todas las ocurrencias de la Base Exenta (E737) cuando la operación sea Gravado Parcial (Si E731 = 4).</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>217</td>
        <td>F004a</td>
        <td>Cálculo del subtotal de la operación gravada al 5% incorrecto</td>
        <td>2357</td>
        <td><mark>Error en el cálculo del subtotal de la operación gravada al 5%</mark><br/>El cálculo debe corresponder a la suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 5% (E734=5) y (Si E731 = 1), más todas las ocurrencias de (E735 + E736) cuando la operación sea a la tasa del 5% (E734=5) y (Si E731 = 4).<br/>No debe existir el campo si D013 ≠ 1 o D013 ≠ 5</td>
        <td>R</td>
    </tr>
    <tr>
        <td>219</td>
        <td>F005a</td>
        <td>Cálculo del subtotal de la operación gravada al 10% incorrecto</td>
        <td>2359</td>
        <td><mark>Error en el cálculo del subtotal de la operación gravada al 10%</mark><br/>El cálculo debe corresponder a la suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 10% (E734=10) y (Si E731 = 1), más todas las ocurrencias de (E735 + E736) cuando la operación sea a la tasa del 10% (E734=10) y (Si E731 = 4).<br/>No debe existir el campo si D013 ≠ 1 o D013 ≠ 5</td>
        <td>R</td>
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
        <td>Jonathan Garay</td>
        <td>10/11/2022</td>
        <td>Marta Rojas</td>
        <td>11/11/2022</td>
        <td>Elaboración del Documento, Formato de Campos y Validaciones</td>
    </tr>
  </tbody>
</table>