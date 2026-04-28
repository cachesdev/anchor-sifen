![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](image_url_placeholder)

# NOTA TÉCNICA N° 18

**Fecha**: 17/11/2023

<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>01 de diciembre de 2023</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>08 de enero de 2024</td>
    </tr>
  </tbody>
</table>

## <u>Referencia</u>:

- Nuevos campos y validaciones para la imputación automática de las ventas al módulo RG90.
- Correcciones en el MT versión 150 referente a los códigos de mensajes que corresponden a la regla de validación para el evento de transporte.

## 1. <u>Campos nuevos</u>

1.1. <u>Para el grupo campos inherentes a la operación comercial (D010-D099) se agrega el siguiente subgrupo y sus campos</u>:

**(Páginas 66,67)**

**D1.1. Campos que identifican las obligaciones afectadas (D030-D040)**

<table>
  <thead>
    <tr>
        <th>Grupo</th>
        <th>ID</th>
        <th>Campo</th>
        <th>Descripción</th>
        <th>Nodo Padre</th>
        <th>Tipo Dato</th>
        <th>Long.</th>
        <th>Ocu.</th>
        <th>Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>D1.1</td>
        <td>D030</td>
        <td>gOblAfe</td>
        <td>Grupo de campos que identifican las obligaciones afectadas</td>
        <td>D010</td>
        <td>G</td>
        <td>-</td>
        <td>0-11</td>
        <td>Detalle del tipo de obligaciones afectadas</td>
    </tr>
    <tr>
        <td>D1.1</td>
        <td>D031</td>
        <td>cOblAfe</td>
        <td>Código de la obligación afectada</td>
        <td>D030</td>
        <td>N</td>
        <td>3</td>
        <td>1-1</td>
        <td>Según Tabla 12 – Tipo de obligaciones.</td>
    </tr>
    <tr>
        <td>D1.1</td>
        <td>D032</td>
        <td>dDesOblAfe</td>
        <td>Descripción de la obligación afectada</td>
        <td>D030</td>
        <td>A</td>
        <td>21-65</td>
        <td>1-1</td>
        <td>Referente al campo D031.</td>
    </tr>
  </tbody>
</table>

## 2. <u>Validaciones nuevas</u>

2.1. <u>Validaciones que identifican las obligaciones afectadas (D030-D040)</u>:

**(Páginas 162,163)**

**D1.1. Campos que identifican las obligaciones afectadas (D030-D040)**

<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Mensaje de la validación</th>
        <th>Código</th>
        <th>Observación</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>D031</td>
        <td>Código de la obligación afectada inexistente</td>
        <td>1220</td>
        <td>Debe ser un código según la tabla 12 - Tipo de obligaciones.</td>
        <td>R</td>
    </tr>
    <tr>
        <td>D032</td>
        <td>Descripción de la obligación afectada no corresponde al código informado</td>
        <td>1221</td>
        <td>Descripción de la obligación afectada no coincidente con lo informado en el campo D031.</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

## 3. <u>Tabla nueva</u>

**TABLA 12 - TIPO DE OBLIGACIONES**

<table>
  <thead>
    <tr>
        <th>CÓDIGO</th>
        <th>DESCRIPCIÓN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>113</td>
        <td>IMPUESTO A LA RENTA IRACIS - REGÍMENES ESPECIALES</td>
    </tr>
    <tr>
        <td>143</td>
        <td>TRIBUTO UNICO MAQUILA</td>
    </tr>
    <tr>
        <td>211</td>
        <td>IMPUESTO AL VALOR AGREGADO - GRAVADAS Y EXONERADAS - EXPORTADORES</td>
    </tr>
    <tr>
        <td>311</td>
        <td>IMPUESTO SELECTIVO AL CONSUMO - GENERAL</td>
    </tr>
    <tr>
        <td>321</td>
        <td>IMPUESTO SELECTIVO AL CONSUMO COMBUSTIBLES</td>
    </tr>
    <tr>
        <td>700</td>
        <td>IMPUESTO A LA RENTA EMPRESARIAL - RÉGIMEN GENERAL</td>
    </tr>
    <tr>
        <td>701</td>
        <td>IMPUESTO A LA RENTA EMPRESARIAL - SIMPLE</td>
    </tr>
    <tr>
        <td>703</td>
        <td>IMPUESTO DE ZONA FRANCA</td>
    </tr>
    <tr>
        <td>702</td>
        <td>IMPUESTO A LA RENTA EMPRESARIAL - RESIMPLE</td>
    </tr>
    <tr>
        <td>715</td>
        <td>IMPUESTO A LA RENTA PERSONAL - SERVICIOS PERSONALES</td>
    </tr>
    <tr>
        <td>716</td>
        <td>IMPUESTO A LA RENTA PERSONAL - RENTAS Y GANANCIAS DE CAPITAL</td>
    </tr>
  </tbody>
</table>

1

![e-kuatia logo](image_url_placeholder)
**e-kuatia**
Sistema Integrado de Facturación Electrónica Nacional

## **4. <u>Validaciones actualizadas</u>**

11.6.7. REGLAS DE VALIDACIÓN PARA EL EVENTO POR ACTUALIZACIÓN DE DATOS: DATOS DEL TRANSPORTE

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
        <td>26</td>
        <td>GET022</td>
        <td>Tipo de transporte requerido para el motivo Cambio de vehículo</td>
        <td><mark modificado>4325</mark></td>
        <td>Cuando el motivo del evento es cambio de vehículo (GET003=4), es obligatorio informar el tipo de transporte (GET022)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>27</td>
        <td>GET023</td>
        <td>Descripción del tipo de transporte es requerida</td>
        <td><mark modificado>4326</mark></td>
        <td>Cuando se informa el código de tipo de transporte (GET022), es obligatorio informar la descripción del tipo de transporte (GET023)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>28</td>
        <td>GET023a</td>
        <td>Descripción del tipo de transporte no corresponde al código</td>
        <td><mark modificado>4327</mark></td>
        <td>Descripción del tipo de transporte no coincidente con lo informado en el campo GET022</td>
        <td>R</td>
    </tr>
    <tr>
        <td>29</td>
        <td>GET024</td>
        <td>Modalidad del transporte requerido para el motivo Cambio de vehículo</td>
        <td><mark modificado>4328</mark></td>
        <td>Cuando el motivo del evento es cambio de vehículo (GET003=4), es obligatorio informar la modalidad del transporte (GET024)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>30</td>
        <td>GET025</td>
        <td>Descripción de la modalidad del transporte es requerida</td>
        <td><mark modificado>4329</mark></td>
        <td>Cuando se informa el código de la modalidad del transporte (GET024), es obligatorio informar la descripción de la modalidad del transporte (GET025)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>31</td>
        <td>GET025a</td>
        <td>Descripción de la modalidad del transporte no corresponde al código</td>
        <td><mark modificado>4330</mark></td>
        <td>Descripción de la modalidad del transporte no coincidente con lo informado en el campo GET024</td>
        <td>R</td>
    </tr>
    <tr>
        <td>32</td>
        <td>GET026</td>
        <td>Tipo de vehículo requerido para el motivo Cambio de vehículo</td>
        <td><mark modificado>4331</mark></td>
        <td>Cuando el motivo del evento es cambio de vehículo (GET003=4), es obligatorio informar el tipo de vehículo (GET026)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>33</td>
        <td>GET027</td>
        <td>Marca del vehículo requerida para el motivo Cambio de vehículo</td>
        <td><mark modificado>4332</mark></td>
        <td>Cuando el motivo del evento es cambio de vehículo (GET003=4), es obligatorio informar la marca del vehículo (GET027)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>34</td>
        <td>GET028</td>
        <td>Tipo de identificación del vehículo requerido para el motivo Cambio de vehículo</td>
        <td><mark modificado>4333</mark></td>
        <td>Cuando el motivo del evento es cambio de vehículo (GET003=4), es obligatorio informar el tipo de identificación del vehículo (GET028)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>35</td>
        <td>GET029</td>
        <td>Tipo de identificación del vehículo no informado</td>
        <td><mark modificado>4334</mark></td>
        <td>Se requiere el número de identificación del vehículo cuando el tipo de identificación del vehículo es 1 (GET028=1)</td>
        <td>R</td>
    </tr>
    <tr>
        <td>36</td>
        <td>GET030</td>
        <td>Número de matrícula del vehículo no informado</td>
        <td><mark modificado>4335</mark></td>
        <td>Se requiere número de matrícula del vehículo cuando el tipo de identificación del vehículo es 2 (GET028=2)</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

## **5. <u>Validación nueva</u>**

11.6.7. REGLAS DE VALIDACIÓN PARA EL EVENTO POR ACTUALIZACIÓN DE DATOS: DATOS DEL TRANSPORTE

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
        <td>37</td>
        <td>GET002</td>
        <td>CDC no existente en el SIFEN</td>
        <td>4336</td>
        <td>El identificador del CDC (GET002) no se encuentra aprobado como DTE en el SIFEN</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

### **Histórico del Documento**

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
        <td>Patricia Rolón</td>
        <td>31/10/2023</td>
        <td>Carlos Mendoza</td>
        <td>31/10/2023</td>
        <td>Elaboración del Documento.</td>
    </tr>
  </tbody>
</table>

2
