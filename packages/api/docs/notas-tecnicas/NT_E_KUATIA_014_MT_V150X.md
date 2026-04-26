![Logo](page_1_image_1_v2.jpg)
![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

# NOTA TÉCNICA N° 14

**Fecha:** 20/03/2023

<table>
  <tbody>
    <tr>
        <td><mark>Fecha puesta a disposición para el Ambiente de Test</mark></td>
        <td>31 de Mayo del 2023</td>
    </tr>
    <tr>
        <td><mark>Fecha puesta a disposición para el Ambiente de Producción</mark></td>
        <td>08 de Agosto del 2023</td>
    </tr>
  </tbody>
</table>

**<u>Referencia</u>:** Correcciones y ajustes sobre el MT versión 150

## 1. **<u>Formato de Campos XML</u>**

**1.1** <u>Se agrega el Grupo: Evento de Nominación de Factura Electrónica (Formato del evento de nominación).</u>

<table>
  <thead>
    <tr>
        <th>Grup<br/>o</th>
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
        <td>GENFE001</td>
        <td>rGEveNom</td>
        <td>Raíz Gestión de Eventos<br/>Nominación</td>
        <td>GDE007</td>
        <td>G</td>
        <td>-</td>
        <td>-</td>
        <td>Elemento raíz</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE002</td>
        <td>Id</td>
        <td>Identificador del DTE</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>44</td>
        <td>1-1</td>
        <td>Se informa el código de control (CDC)</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE003</td>
        <td>mOtEve</td>
        <td>Motivo del Evento</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>5-500</td>
        <td>1-1</td>
        <td>Campo abierto</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE004</td>
        <td>iNatRec</td>
        <td>Naturaleza del receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1</td>
        <td>1-1</td>
        <td>1= contribuyente<br/>2= no contribuyente</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE027</td>
        <td>iTiOpe</td>
        <td>Tipo de operación</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1</td>
        <td>1-1</td>
        <td>1= B2B<br/>2= B2C<br/>4= B2F</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE005</td>
        <td>cPaisRec</td>
        <td>Código de país del receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>3</td>
        <td>1-1</td>
        <td>Según XSD de Codificación de Países</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE006</td>
        <td>dDesPaisRe</td>
        <td>Descripción del país receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>4-50</td>
        <td>1-1</td>
        <td>Referente al campo GENFE005</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE007</td>
        <td>iTiContRec</td>
        <td>Tipo de contribuyente receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1</td>
        <td>0-1</td>
        <td>Obligatorio si GENFE004=1<br/>No informar si GENFE004=2<br/>1= Persona Física<br/>2= Persona Jurídica</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE008</td>
        <td>dRucRec</td>
        <td>RUC del receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>3-8</td>
        <td>0-1</td>
        <td>Obligatorio si GENFE004=1<br/>No informar si GENFE004=2</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE009</td>
        <td>dDVRec</td>
        <td>Dígito verificador del RUC del receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1</td>
        <td>0-1</td>
        <td>Obligatorio si existe el campo GENFE008<br/>Según algoritmo módulo 11</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE010</td>
        <td>iTipIDRec</td>
        <td>Tipo de documento de identidad del receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1</td>
        <td>0-1</td>
        <td>Obligatorio si GENFE004=2<br/>1=Cédula paraguaya<br/>2=Pasaporte<br/>3=Cédula extranjera<br/>4=Carnet de residencia<br/>5=Tarjeta Diplomática de exoneración fiscal<br/>9=Otro</td>
    </tr>
  </tbody>
</table>

![logo](page_2_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

<table>
  <tbody>
    <tr>
        <td>GDE</td>
        <td>GENFE011</td>
        <td>dDTipIDRec</td>
        <td>Descripción del<br/>tipo de<br/>documento de<br/>identidad</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>9-41</td>
        <td>0-1</td>
        <td>Obligatorio si existe el<br/>campo GENFE010<br/>1= “Cédula paraguaya”<br/>2= “Pasaporte”<br/>3= “Cédula extranjera”<br/>4= “Carnet de<br/>residencia”<br/>5= “Tarjeta<br/>Diplomática de<br/>exoneración fiscal”<br/>Si GENFE010=9 Se<br/>deberá informar el<br/>tipo de documento de<br/>identidad del receptor</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE012</td>
        <td>dNumIDRec</td>
        <td>Número de<br/>documento de<br/>identidad</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>1-20</td>
        <td>0-1</td>
        <td>Obligatorio si<br/>GENFE004=2</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE013</td>
        <td>dNomRec</td>
        <td>Nombre o razón<br/>social del<br/>receptor del DTE</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>4-255</td>
        <td>1-1</td>
        <td> </td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE014</td>
        <td>dNomFanRec</td>
        <td>Nombre de<br/>fantasía</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>4-255</td>
        <td>0-1</td>
        <td>Campo abierto</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE015</td>
        <td>dDirRec</td>
        <td>Dirección del<br/>receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>1-255</td>
        <td>0-1</td>
        <td>Campo abierto</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE016</td>
        <td>dNumCasRec</td>
        <td>Número de casa<br/>del receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1-6</td>
        <td>0-1</td>
        <td>Campo obligatorio si<br/>se informa el campo<br/>GENFE015</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE017</td>
        <td>cDepRec</td>
        <td>Código del<br/>departamento<br/>del receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1-2</td>
        <td>0-1</td>
        <td>Según XSD de<br/>Departamentos</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE018</td>
        <td>dDesDepRec</td>
        <td>Descripción del<br/>departamento<br/>del receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>6-16</td>
        <td>0-1</td>
        <td>Referente al campo<br/>GENFE017</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE019</td>
        <td>cDisRec</td>
        <td>Código del<br/>distrito del<br/>receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1-4</td>
        <td>0-1</td>
        <td>Según Tabla 2.1 –<br/>Departamentos,<br/>Distritos Y Ciudades</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE020</td>
        <td>dDesDisRec</td>
        <td>Descripción del<br/>distrito del<br/>receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>1-30</td>
        <td>0-1</td>
        <td>Obligatorio si existe el<br/>campo GENFE019</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE021</td>
        <td>cCiuRec</td>
        <td>Código de la<br/>ciudad del<br/>receptor</td>
        <td>GENFE001</td>
        <td>N</td>
        <td>1-5</td>
        <td>0-1</td>
        <td>Según Tabla 2.1 –<br/>Departamentos,<br/>Distritos Y Ciudades</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE022</td>
        <td>dDesCiuRec</td>
        <td>Descripción de la<br/>ciudad del<br/>receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>1-30</td>
        <td>0-1</td>
        <td>Referente al campo<br/>GENFE021</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE023</td>
        <td>dTelRec</td>
        <td>Número de<br/>teléfono del<br/>receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>6-15</td>
        <td>0-1</td>
        <td>Debe incluir el prefijo<br/>de la ciudad si<br/>GENFE005= PRY</td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE024</td>
        <td>dCelRec</td>
        <td>Número de<br/>celular del<br/>receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>10-20</td>
        <td>0-1</td>
        <td> </td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE025</td>
        <td>dEmailRec</td>
        <td>Correo<br/>electrónico del<br/>receptor</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>3-80</td>
        <td>0-1</td>
        <td> </td>
    </tr>
    <tr>
        <td>GDE</td>
        <td>GENFE026</td>
        <td>dCodCliente</td>
        <td>Código del cliente</td>
        <td>GENFE001</td>
        <td>A</td>
        <td>3-15</td>
        <td>0-1</td>
        <td> </td>
    </tr>
  </tbody>
</table>

![Logo](page_3_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)
**Sistema Integrado de Facturación Electrónica Nacional**

# 2. Validaciones

## 2.1 <u>SE AGREGAN LAS SIGUIENTES REGLAS DE VALIDACIÓN PARA EL EVENTO NOMINACIÓN DE FACTURA ELECTRÓNICA</u>

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
        <td>GENFE002</td>
        <td>CDC inválido</td>
        <td>4451</td>
        <td>Debe validar que el CDC (GENFE002) cuente con los 44 caracteres según las reglas de estructuración del CDC (longitud, y/o dígito verificador)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE002a</td>
        <td>El CDC informado no existe en la base de datos del SIFEN o ha sido cancelado</td>
        <td>4452</td>
        <td>El identificador del CDC (GENFE002) no se encuentra en la base de datos del SIFEN o se encuentra cancelado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE002b</td>
        <td>El CDC del DTE informado ya cuenta con un evento previo de nominación de factura electrónica</td>
        <td>4453</td>
        <td>El DTE (GENFE002) ya cuenta con un evento previo de nominación de factura electrónica</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE002c</td>
        <td>El tipo de documento del CDC informado no corresponde a Factura electrónica</td>
        <td>4454</td>
        <td>El CDC informado no corresponde Factura Electrónica (GENFE002)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE006</td>
        <td>Descripción del país receptor no corresponde al código</td>
        <td>4456</td>
        <td>La descripción del país del receptor no coincidente con lo informado en el campo GENFE005</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE007</td>
        <td>Es obligatorio informar el tipo de contribuyente receptor</td>
        <td>4457</td>
        <td>Si la naturaleza del receptor es contribuyente (GENFE004=1) el tipo de contribuyente receptor debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE007a</td>
        <td>Tipo de contribuyente receptor inválido</td>
        <td>4458</td>
        <td>Si la naturaleza del receptor es NO contribuyente (GENFE004=2), el tipo de contribuyente receptor (GENFE007) no debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE008</td>
        <td>Es obligatorio informar el RUC del receptor contribuyente</td>
        <td>4459</td>
        <td>Si la naturaleza del receptor es contribuyente (GENFE004=1), el RUC del receptor debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE008a</td>
        <td>RUC del receptor no requerido</td>
        <td>4460</td>
        <td>Si la naturaleza del receptor es NO contribuyente (GENFE004=2), el RUC del receptor (GENFE008) no debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE008b</td>
        <td>RUC del receptor inexistente en la base de datos de Marangatu</td>
        <td>4461</td>
        <td>El RUC informado no existe en la base de datos de Marangatu</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE008c</td>
        <td>El RUC se encuentra inactivo para el tipo de contribuyente receptor</td>
        <td>4462</td>
        <td>Si la naturaleza del receptor es contribuyente (GENFE004=1), el RUC del receptor en Marangatu debe contar con un estado distinto a CANCELADO o CANCELADO DEFINITIVO</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE009</td>
        <td>Dígito Verificador del RUC del receptor incorrecto</td>
        <td>4463</td>
        <td>El Dígito Verificador ingresado no corresponde al módulo 11 del RUC</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE010</td>
        <td>Es obligatorio informar el tipo de documento de identidad del receptor</td>
        <td>4464</td>
        <td>Si la naturaleza del receptor es NO contribuyente (GENFE004=2), el tipo de documento de identidad debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE010a</td>
        <td>Tipo de documento de identidad del receptor no requerido</td>
        <td>4465</td>
        <td>Si la naturaleza del receptor es contribuyente (GENFE004=1), el tipo de documento de identidad del receptor (GENFE010) no debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE011</td>
        <td>Descripción del tipo de documento de identidad del receptor no corresponde al código</td>
        <td>4466</td>
        <td>La descripción del tipo de documento de identidad del receptor no coincidente con lo informado en el campo GENFE010</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE012</td>
        <td>Es obligatorio informar el número de documento de identidad del receptor</td>
        <td>4467</td>
        <td>Si la naturaleza del receptor es NO contribuyente (GENFE004=2), el número de documento de identidad debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE002d</td>
        <td>El RUC del Emisor del evento no corresponde al emisor de la factura electrónica</td>
        <td>4468</td>
        <td>El RUC del Emisor de la Factura Electrónica debe ser el mismo que el RUC del Emisor del evento.</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

![decorative graphic](page_4_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)

# Sistema Integrado de Facturación Electrónica Nacional

<table>
  <tbody>
    <tr>
        <td>GENFE002e</td>
        <td>El receptor de la Factura electrónica debe ser innominado</td>
        <td>4469</td>
        <td>El tipo de documento de identidad del receptor informada en la factura electrónica debe ser igual a innominado (D208=5)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE016</td>
        <td>Es obligatorio informar el número de casa del receptor</td>
        <td>4470</td>
        <td>Si se informa la dirección del receptor (GENFE015) es obligatorio informar el número de casa (GENFE016)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE018</td>
        <td>Descripción del departamento del receptor no corresponde al código.</td>
        <td>4471</td>
        <td>Descripción del departamento del receptor no coincidente con lo informado en el campo GENFE017.</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE020</td>
        <td>Descripción del distrito de receptor no corresponde al código</td>
        <td>4472</td>
        <td>Descripción del distrito del receptor no coincidente con lo informado en el campo GENFE019</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE022</td>
        <td>Descripción de la ciudad del receptor no corresponde al código</td>
        <td>4473</td>
        <td>Descripción de la ciudad del receptor no coincidente con lo informado en el campo GENFE021</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE021</td>
        <td>El Departamento, el Distrito y la Ciudad del receptor no están relacionados</td>
        <td>4474</td>
        <td>Debe haber relación entre el departamento (GENFE017), el distrito (GENFE019) y la ciudad (GENFE021)<br/>Según Tabla 2.1 – Departamentos, Distritos y Ciudades</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE004</td>
        <td>Naturaleza del receptor incorrecto para el tipo de operación informado</td>
        <td>4475</td>
        <td>Si el tipo de operación es B2B (GENFE027=1), la naturaleza del receptor debe ser contribuyente (GENFE004=1)<br/>Si el tipo de operación es B2C o B2F (GENFE027=2 o 4), la naturaleza del receptor debe ser no contribuyente (GENFE004=2)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE005</td>
        <td>Código de país del receptor inválido para el tipo de operación informado</td>
        <td>4476</td>
        <td>Si el tipo de operación es B2F (GENFE027=4), el país informado debe ser diferente a PRY (GENFE005≠PRY).<br/>Si el tipo de operación es diferente de B2F (GENFE027≠4) el país informado debe ser igual a PRY (GENFE005=PRY)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE012</td>
        <td>El número de documento de identidad del receptor no es requerido</td>
        <td>4477</td>
        <td>Si la naturaleza del receptor es contribuyente, el número de documento de identidad no debe ser informado</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GENFE015</td>
        <td>Dirección del receptor no informado para el tipo de documento electrónico</td>
        <td>4478</td>
        <td>Si el tipo de operación es B2F, es obligatorio informar la dirección del receptor (GENFE015)</td>
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
        <td>Jonathan Garay</td>
        <td>11/11/2022</td>
        <td>Martha Rojas</td>
        <td>18/11/2022</td>
        <td>Elaboración del Documento, Formato de Campos y Validaciones</td>
    </tr>
    <tr>
        <td>Jonathan Garay</td>
        <td>04/05/2023</td>
        <td>Martha Rojas</td>
        <td>05/05/2023</td>
        <td>Se incluye el Campo de Tipo de operación y se realizan ajustes respecto a las Validaciones.</td>
    </tr>
  </tbody>
</table>
