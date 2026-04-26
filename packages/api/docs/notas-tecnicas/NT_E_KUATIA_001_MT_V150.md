![e-kuatia logo](page_1_image_2_v2.jpg)

# VOLUNTARIEDAD CONTROLADA DE FACTURACIÓN ELECTRÓNICA SIFEN

## Nota Técnica Número 1

**Fecha**: 14-10-2019

**Cambios desde la fecha** 10-09-2019 al 14-10-2019

**Referencia**: Correcciones y ajustes sobre el MT versión 150

### A- Formato de campos (XML):

1- Especificación de la fórmula a utilizar para hallar el Descuento global sobre el precio unitario por ítem (incluidos impuestos) (dDescGloItem) (Página 88)


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
        <td>E8.1.1</td>
        <td>EA004</td>
        <td>dDescGloItem</td>
        <td>Descuento global sobre el precio unitario por ítem (incluidos impuestos)</td>
        <td>EA001</td>
        <td>N</td>
        <td>1-15p (0-8)</td>
        <td>0-1</td>
        <td>Si se cuenta con un descuento global, debe ser aplicado (no es prorrateo) a cada uno de los ítems, independientemente de que un ítem cuente con un descuento particular.<br/><mark>[F010 * E721 / 100]</mark></td>
    </tr>
  </tbody>
</table>

2- En el grupo *Campos que describen los subtotales y totales de la transacción documentada (F001-F099)* se realizó una verificación de las fórmulas utilizadas. (Página 103)


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
        <td>F009</td>
        <td>dTotDesc</td>
        <td>Total descuento particular por ítem</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p (0-8)</td>
        <td>1-1</td>
        <td><mark>Suma de la multiplicación de cada descuento particular por ítem por la cantidad de ese ítem (sumatoria de EA002*E711)</mark></td>
    </tr>
    <tr>
        <td>F</td>
        <td>F033</td>
        <td>dTotDescGlotem</td>
        <td>Total descuento global por ítem</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p (0-8)</td>
        <td>1-1</td>
        <td><mark>Sumatoria de la multiplicación de cada descuento global por ítem por la cantidad de ese ítem (sumatoria de EA004*E711)</mark></td>
    </tr>
  </tbody>
</table>

![abstract shapes logo](page_2_image_2_v2.jpg)
![e-kuatia logo](image_url_placeholder)

<table>
  <tbody>
    <tr>
        <td>F</td>
        <td>F034</td>
        <td>dTotAntIte<br/>m</td>
        <td>Total Anticipo por ítem</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p<br/>(0-8)</td>
        <td>1-1</td>
        <td><mark>Sumatoria de todas las ocurrencias de anticipos por ítem por la cantidad del ítem (EA006*E711)</mark></td>
    </tr>
    <tr>
        <td>F</td>
        <td>F035</td>
        <td>dTotAnt</td>
        <td>Total Anticipo global por ítem</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p<br/>(0-8)</td>
        <td>1-1</td>
        <td><mark>Sumatoria de todas las ocurrencias de anticipos globales por ítem por la cantidad del ítem (EA007*E711)</mark></td>
    </tr>
    <tr>
        <td>F</td>
        <td>F011</td>
        <td>dDescTotal</td>
        <td>Total Descuentos de la operación</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p<br/>(0-8)</td>
        <td>1-1</td>
        <td><mark>Sumatoria de todos los descuentos (Global por Ítem y particular por ítem) de cada ítem (F009+F033)</mark></td>
    </tr>
    <tr>
        <td>F</td>
        <td>F012</td>
        <td>dAnticipo</td>
        <td>Total Anticipos de la operación</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p<br/>(0-8)</td>
        <td>1-1</td>
        <td><mark>Sumatoria de todos los Anticipos (Global por Ítem y particular por ítem)<br/>F034 + F035</mark></td>
    </tr>
    <tr>
        <td>F</td>
        <td>F014</td>
        <td>dTotGralOp<br/>e</td>
        <td>Total Neto de la operación</td>
        <td>F001</td>
        <td>N</td>
        <td>1-15p<br/>(0-8)</td>
        <td>1-1</td>
        <td><mark>Corresponde al cálculo aritmético<br/>F008-F013+F025</mark></td>
    </tr>
  </tbody>
</table>

## **B- Validaciones**

**1- Las siguientes validaciones sufren modificaciones:**


<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Mensaje de validación</th>
        <th>Código</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>C004b</td>
        <td>El número de timbrado no se encuentra vigente a la fecha de emisión del comprobante</td>
        <td>1103</td>
        <td><mark>Número de timbrado no vigente<br/>(D002 no es posterior a la fecha de inicio de vigencia del timbrado (C008)</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>EA004</td>
        <td>El descuento global sobre el precio unitario por ítem no coincidente con lo informado</td>
        <td>1862</td>
        <td><mark>El descuento global sobre el precio unitario por ítem no coincide con lo informado en el porcentaje de descuento global sobre total de la operación (F010)<br/>Según la siguiente fórmula: [F010 * E721 / 100]<br/>Puede haber una variación de 0.8</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>F011</td>
        <td>Cálculo del descuento sobre el total de la operación incorrecto</td>
        <td>2364</td>
        <td><mark>Error en el cálculo del descuento sobre el total de la operación<br/>Es la sumatoria de F009 y F033</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>F014</td>
        <td>Cálculo del total general de la operación incorrecto</td>
        <td>2365</td>
        <td><mark>Error en el cálculo del total general de la operación<br/>Cuando C002=1, 5 o 6 el cálculo debe ser igual a F008-F013+F025</mark></td>
        <td>R</td>
    </tr>
  </tbody>
</table>

**Páginas: 160, 176, 184**

![Abstract green shapes logo](page_3_image_2_v2.jpg)
![e-kuatia logo](image_url_placeholder)

# **2- Se agregan las siguientes validaciones:**


<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Mensaje de validación</th>
        <th>Código</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>EA004<br/>a</td>
        <td>Descuento global sobre el precio unitario por ítem no informado</td>
        <td>1860</td>
        <td>Si el campo de porcentaje de descuento global sobre total de la operación (F010) tiene un valor mayor a 0 (cero), es obligatorio indicar el descuento global sobre el precio unitario por ítem</td>
        <td>R</td>
    </tr>
    <tr>
        <td>F033</td>
        <td>Cálculo del total descuento global por ítem incorrecto</td>
        <td>2383</td>
        <td>Error en el cálculo del total descuento global por ítem<br/>Cálculo debe ser igual la suma de todas las ocurrencias de EA004 multiplicado por la cantidad EA004*E711</td>
        <td>R</td>
    </tr>
    <tr>
        <td>F034</td>
        <td>Cálculo del total anticipo por ítem incorrecto</td>
        <td>2384</td>
        <td>Error en el cálculo del total anticipo por ítem<br/>Cálculo debe ser igual la suma de todas las ocurrencias de EA006 multiplicado por la cantidad EA006*E711</td>
        <td>R</td>
    </tr>
    <tr>
        <td>F035</td>
        <td>Cálculo del total anticipo global por ítem incorrecto</td>
        <td>2387</td>
        <td>Error en el cálculo del total anticipo por ítem<br/>Cálculo debe ser igual la suma de todas las ocurrencias de EA007 multiplicado por la cantidad EA007*E711</td>
        <td>R</td>
    </tr>
    <tr>
        <td>F012</td>
        <td>Cálculo del total anticipos de la operación incorrecto</td>
        <td>2388</td>
        <td>Error en el cálculo del total anticipos de la operación<br/>Es la sumatoria de F034 y F035</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

# Histórico del Documento


<table>
  <thead>
    <tr>
        <th>Autor</th>
        <th>Fecha de Elaboración</th>
        <th>Revisor</th>
        <th>Fecha Revisión</th>
        <th>Principales Alteraciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Mabel Peña</td>
        <td>14/10/2019</td>
        <td>Carlos Mendoza</td>
        <td>14/10/2019</td>
        <td>Creación</td>
    </tr>
  </tbody>
</table>