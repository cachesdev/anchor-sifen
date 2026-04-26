![e-kuatia logo](page_1_image_1_v2.jpg)
**e-kuatia**
Sistema Integrado de Facturación
Electrónica Nacional

# NOTA TÉCNICA N° 23

**Fecha:** 27/08/2024


<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>30 de agosto de 2024</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>27 de setiembre de 2024</td>
    </tr>
  </tbody>
</table>

**Referencia:** Correcciones y ajustes sobre el Manual Técnico versión 150

## 1. FORMATO DE CAMPOS XML

1.1. <u>En campos que identifican al receptor del Documento Electrónico DE (D200-D299) se modifican los siguientes campos:</u> (**Página 86**)


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
        <td>D3</td>
        <td>D208</td>
        <td>iTipIDRec</td>
        <td>Tipo de documento de identidad del receptor</td>
        <td>D200</td>
        <td>N</td>
        <td>1</td>
        <td>0-1</td>
        <td>Obligatorio si D201 = 2 <mark>y D202 ≠ 4</mark><br/><mark>No informar si D201 = 1</mark><br/>1= Cédula paraguaya<br/>2= Pasaporte<br/>3= Cédula extranjera<br/>4= Carnet de residencia<br/>5= Innominado<br/>6=Tarjeta Diplomática de exoneración fiscal<br/>9= Otro</td>
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
        <td>Obligatorio si D201 = 2 <mark>y D202 ≠ 4</mark><br/><mark>No informar si D201 = 1</mark><br/>En caso de DE innominado, completar con 0 (cero)</td>
    </tr>
  </tbody>
</table>

**Observación:** Inclusión en cumplimiento a lo establecido en el Art 6° (Numeral 1) del Decreto N° 872/2023.

1.2. <u>En campos que describen los ítems de la operación (E700-E899) se modifica el siguiente campo en la Longitud.</u> (**Página 86**)


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
        <td>E711</td>
        <td>dCantProSer</td>
        <td>Cantidad del producto y/o servicio</td>
        <td>E700</td>
        <td>N</td>
        <td>1-10p<mark>(0-8)</mark></td>
        <td>1-1</td>
        <td> </td>
    </tr>
  </tbody>
</table>

1

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_2_image_1_v2.jpg)

1.3. <u>En el de Sector Energía Eléctrica (E791-E799) se modifica el siguiente campo en la ocurrencia.</u> **(Página 93)**


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
        <td>E9.2</td>
        <td>E791</td>
        <td>gGrupEner</td>
        <td>Grupo del sector de energía eléctrica</td>
        <td>E790</td>
        <td>G</td>
        <td> </td>
        <td><mark>0-9</mark></td>
        <td> </td>
    </tr>
    <tr>
        <td>E9.2</td>
        <td>E797</td>
        <td>dConKwh</td>
        <td>Consumo</td>
        <td>E791</td>
        <td>N</td>
        <td>1-11p2</td>
        <td>0-1</td>
        <td>Corresponde a la diferencia entre <mark>E796-E795</mark></td>
    </tr>
  </tbody>
</table>

1.4. <u>H. Campos que identifican al documento asociado (H001-H049) se incorpora el siguiente campo.</u> **(Página 110)**


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
        <td><mark>H</mark></td>
        <td><mark>H018</mark></td>
        <td><mark>dRucFus</mark></td>
        <td><mark>RUC fusionado</mark></td>
        <td><mark>H001</mark></td>
        <td><mark>A</mark></td>
        <td><mark>3-8</mark></td>
        <td><mark>0-1</mark></td>
        <td><mark>Obligatorio cuando el CDC del DTE referenciado corresponda a un RUC fusionado</mark></td>
    </tr>
  </tbody>
</table>

**Observación:** Inclusión opcional de acuerdo a las necesidades de los facturadores electrónicos.

## 2. VALIDACIONES

2.1. <u>En datos que identifican al receptor del Documento Electrónico DE (D200 - D299) se modifica la siguiente validación.</u> **(Página 167)**


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
        <td>D208e</td>
        <td>El adquiriente del comprobante de venta informado no se encuentra identificado. Favor verifique el dato ingresado.</td>
        <td>1331</td>
        <td>Si el tipo de documento electrónico <mark>seleccionado es igual a Nota de Crédito, Nota de Débito o Nota de Remisión Electrónica (C002 = 5, 6, 7)</mark>, el tipo de documento de identidad del receptor no puede ser INNOMINADO (D208 ≠ 5)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>D210</td>
        <td>Es obligatorio informar el número de documento de identidad del receptor</td>
        <td>1314</td>
        <td>Si la naturaleza del receptor es NO contribuyente (D201=2) <mark>y el tipo de operación es diferente a B2F (D202≠4)</mark>, el número de documento de identidad debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td><mark>D208f</mark></td>
        <td>Tipo de documento de identidad del receptor incorrecto para el tipo de operación</td>
        <td><mark>1333</mark></td>
        <td><mark>El Tipo de documento de identidad del receptor no puede ser innominado (D208=5), cuando el tipo de operación es distinto a B2C (D202 ≠ 2)</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>D210b</mark></td>
        <td>El número de documento de identidad del receptor no es requerido</td>
        <td><mark>1334</mark></td>
        <td><mark>Si la naturaleza del receptor es contribuyente (D201=1) el número de documento de identidad no debe ser informado</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>D208g</mark></td>
        <td>El tipo de documento de identidad del receptor es requerido</td>
        <td><mark>1335</mark></td>
        <td><mark>Si la naturaleza del receptor es NO Contribuyente (D201=2), el tipo de documento de identidad del receptor debe ser informado</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

2

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_3_image_1_v2.jpg)

## 2.2. <u>H. Campos que identifican al documento asociado (H001-H049) se modifica la siguiente validación. (Página 191)</u>


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
        <td>H001</td>
        <td>Documento asociado es obligatorio para el tipo de documento electrónico seleccionado</td>
        <td>2400</td>
        <td>Si el tipo de documento electrónico seleccionado es igual a Autofactura, Nota de Crédito Electrónica, Nota de Débito Electrónica <mark>o Comprobante de Retención (C002=4, 5, 6 o 8)</mark>, es obligatorio informar el grupo de campos que identifican al documento asociado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>H004g</td>
        <td>El CDC asociado no corresponde al emisor del documento electrónico.</td>
        <td>2439</td>
        <td>Si el tipo de documento asociado es electrónico (H002=1) el CDC debe corresponder al emisor <mark>y/o RUC Fusionado</mark> del documento al cual se asocia.</td>
        <td>R</td>
    </tr>
    <tr>
        <td><mark>H018</mark></td>
        <td><mark>El RUC Fusionado no corresponde al emisor del CDC asociado.</mark></td>
        <td><mark>2443</mark></td>
        <td><mark>Si se informa el campo H018 (dRucFus), este debe corresponder al RUC del emisor del CDC asociado informado en el campo H004 (dCdCDERef)</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>H018a</mark></td>
        <td><mark>El RUC Fusionado no requerido.</mark></td>
        <td><mark>2444</mark></td>
        <td><mark>Si el tipo de documento electrónico seleccionado es distinto a Nota de Crédito, Nota de Débito o Nota de Remisión (C002 ≠ 5, 6 o 7) el campo RUC Fusionado no debe ser informado.</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

# 3. <u>CODIFICACIONES</u>

## 3. 1. Se amplía el listado de unidades de medidas (Páginas 211 y 212).

**TABLA 5 – CODIFICACIÓN DE UNIDADES DE MEDIDA**


<table>
  <thead>
    <tr>
        <th colspan="3">CODIFICACIÓN DE UNIDADES DE MEDIDA</th>
    </tr>
    <tr>
        <th>Código</th>
        <th>Representación</th>
        <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>111</td>
        <td>4A</td>
        <td>Bovinas</td>
    </tr>
    <tr>
        <td>112</td>
        <td>Ci</td>
        <td>Curie</td>
    </tr>
    <tr>
        <td>113</td>
        <td>DOC</td>
        <td>Docena</td>
    </tr>
    <tr>
        <td>114</td>
        <td>GLL</td>
        <td>Galones (US) (3,7843 LT)</td>
    </tr>
    <tr>
        <td>115</td>
        <td>GRO</td>
        <td>Gruesas</td>
    </tr>
    <tr>
        <td>116</td>
        <td>E4</td>
        <td>Kilogramo Bruto</td>
    </tr>
    <tr>
        <td>117</td>
        <td>KT</td>
        <td>Kits</td>
    </tr>
    <tr>
        <td>118</td>
        <td>M5</td>
        <td>Microcurie</td>
    </tr>
    <tr>
        <td>119</td>
        <td>MCU</td>
        <td>Milicurie</td>
    </tr>
    <tr>
        <td>120</td>
        <td>MIL</td>
        <td>Millar</td>
    </tr>
    <tr>
        <td>121</td>
        <td>PAR</td>
        <td>Par</td>
    </tr>
    <tr>
        <td>122</td>
        <td>FOT</td>
        <td>Pies</td>
    </tr>
    <tr>
        <td>123</td>
        <td>FTK</td>
        <td>Pies Cuadradas</td>
    </tr>
    <tr>
        <td>124</td>
        <td>PCE</td>
        <td>Piezas</td>
    </tr>
    <tr>
        <td>125</td>
        <td>KLT</td>
        <td>Quilate</td>
    </tr>
    <tr>
        <td>126</td>
        <td>RM</td>
        <td>Resmas</td>
    </tr>
    <tr>
        <td>127</td>
        <td>RO</td>
        <td>Rollos</td>
    </tr>
    <tr>
        <td>128</td>
        <td>kWh</td>
        <td>1000 Kilowatt Hora</td>
    </tr>
    <tr>
        <td>129</td>
        <td>U(JGO)</td>
        <td>Mazos</td>
    </tr>
    <tr>
        <td>130</td>
        <td>DR</td>
        <td>Tambores</td>
    </tr>
    <tr>
        <td>131</td>
        <td>BX</td>
        <td>Caja</td>
    </tr>
    <tr>
        <td>132</td>
        <td>SET</td>
        <td>Juego</td>
    </tr>
    <tr>
        <td>133</td>
        <td>PK</td>
        <td>Paquete</td>
    </tr>
    <tr>
        <td>134</td>
        <td>BG</td>
        <td>Bolsa</td>
    </tr>
    <tr>
        <td>135</td>
        <td>DPC</td>
        <td>Docena Par</td>
    </tr>
    <tr>
        <td>136</td>
        <td>JR</td>
        <td>Pote</td>
    </tr>
  </tbody>
</table>

3

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_4_image_1_v2.jpg)

<table>
  <thead>
    <tr>
        <th colspan="3">CODIFICACIÓN DE UNIDADES DE MEDIDA</th>
    </tr>
    <tr>
        <th>**Código**</th>
        <th>**Representación**</th>
        <th>**Descripción**</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>137</td>
        <td>BL</td>
        <td>Fardos</td>
    </tr>
    <tr>
        <td>138</td>
        <td>AB</td>
        <td>Bulto</td>
    </tr>
    <tr>
        <td>139</td>
        <td>BK</td>
        <td>Cesta</td>
    </tr>
    <tr>
        <td>140</td>
        <td>BW</td>
        <td>Peso Base</td>
    </tr>
  </tbody>
</table>

**Observación:** Inclusión opcional de acuerdo a las necesidades de los facturadores electrónicos.
**Fuente:** Códigos para las Unidades de Medición que se usan en el Comercio Internacional.

## Histórico del Documento


<table>
  <thead>
    <tr>
        <th>**AUTOR**</th>
        <th>**FECHA DE ELABORACIÓN**</th>
        <th>**REVISOR**</th>
        <th>**FECHA DE REVISIÓN**</th>
        <th>**PRINCIPALES ALTERACIONES**</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Jonathan Garay</td>
        <td>18/06/2024</td>
        <td>Martha Rojas</td>
        <td>28/06/2024</td>
        <td>Formato de campos y validaciones. Actualización de Tabla.</td>
    </tr>
    <tr>
        <td>Verónica Avalos</td>
        <td>07/06/2024</td>
        <td>Martha Rojas</td>
        <td>02/08/2024</td>
        <td>Elaboración del documento. Inclusión de nuevas unidades de medida.</td>
    </tr>
  </tbody>
</table>

4