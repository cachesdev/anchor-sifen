![e-kuatia Sistema Integrado de Facturación Electrónica Nacional logo](page_1_image_1_v2.jpg)

# NOTA TÉCNICA N° 19

**Fecha:** 17/11/2023


<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>15/12/2023</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>31/01/2024</td>
    </tr>
  </tbody>
</table>

<u>**Referencia:**</u> Correcciones y ajustes sobre el MT versión 150

## 1. <u>Formato de Campos XML</u>

### 1.1 <u>En Evento Notificación – Recepción DE/DTE (Formato del evento de Notificación – Recepción) se modifican los siguientes campos</u> (Página 123)


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
        <td>GER</td>
        <td>GEN001</td>
        <td>rGeVeNotRe<br/>c</td>
        <td>Raíz Gestión de Eventos Notificación – Recepción DE o DTE</td>
        <td>GDE007</td>
        <td>G</td>
        <td>-</td>
        <td>-</td>
        <td>Elemento raíz</td>
    </tr>
    <tr>
        <td>GER</td>
        <td>GEN003</td>
        <td>dFecEmi</td>
        <td>Fecha de emisión del DE/<mark>DTE</mark></td>
        <td>GEN001</td>
        <td>F</td>
        <td>19</td>
        <td>1-1</td>
        <td>Requerido para conteo de plazo de registro del evento del receptor en <mark>Notificación – Recepción DE</mark> (hasta 45 días desde la fecha de emisión)<br/>Fecha y hora en el formato AAAA-MM-DDThh:mm:ss</td>
    </tr>
  </tbody>
</table>

### 1.2 <u>En Evento Desconocimiento DE/DTE (Formato del evento de Desconocimiento DE/DTE) se modifican los siguientes campos</u> (Página 125)


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
        <td>GER</td>
        <td>GED001</td>
        <td>rGeVeDesco<br/>n</td>
        <td>Raiz Gestión de Eventos Desconocimiento</td>
        <td>GDE007</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>Elemento raíz</td>
    </tr>
    <tr>
        <td>GER</td>
        <td>GED003</td>
        <td>dFecEmi</td>
        <td>Fecha de emisión del DE/<mark>DTE</mark></td>
        <td>GED001</td>
        <td>F</td>
        <td>19</td>
        <td>1-1</td>
        <td>Requerido para conteo de plazo de registro del evento del receptor en <mark>Desconocimiento DE</mark> (hasta 45 días desde la fecha de emisión).<br/>Fecha y hora en el formato AAAA-MM-DDThh:mm:ss.</td>
    </tr>
  </tbody>
</table>

## 2. <u>Validaciones</u>

### 2.1 <u>EN REGLAS DE VALIDACIÓN PARA NOTIFICACIÓN – RECEPCIÓN DE/DTE SE MODIFICAN LOS SIGUIENTES CAMPOS</u> (Página 136)


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
        <td>GEN002b</td>
        <td>CDC del DTE ya cuenta con un evento <mark>previo</mark> de esta naturaleza</td>
        <td>4101</td>
        <td>Sobre el CDC de un DE/DTE se puede realizar hasta un evento de notificación - recepción</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GEN003</td>
        <td>Fecha de emisión del DE/<mark>DTE</mark> ha superado el plazo para registro del evento</td>
        <td>4103</td>
        <td>El plazo del registro del evento <mark>Notificación – Recepción DE</mark> ha superado los 45 días contados a partir de la fecha de emisión</td>
        <td>AO</td>
    </tr>
    <tr>
        <td><mark>GEN012</mark></td>
        <td><mark>Fecha de aprobación del DTE ha superado el plazo para registro del evento</mark></td>
        <td><mark>4114</mark></td>
        <td><mark>El plazo del registro del evento Notificación – Recepción DTE ha superado los 45 días contados a partir de la fecha de aprobación del DTE</mark></td>
        <td><mark>AO</mark></td>
    </tr>
  </tbody>
</table>

1

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_2_image_1_v2.jpg)

<table>
  <tbody>
    <tr>
        <td><mark>GEN013</mark></td>
        <td><mark>El CDC del DTE se encuentra cancelado</mark></td>
        <td><mark>4115</mark></td>
        <td><mark>No se puede registrar la Notificación – Recepción por CDC de un DTE cancelado</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>GEN013a</mark></td>
        <td><mark>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</mark></td>
        <td><mark>4116</mark></td>
        <td><mark>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Notificación – Recepción DTE</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

## 2.2. EN REGLAS DE VALIDACIÓN PARA EL EVENTO CONFORMIDAD SE MODIFICAN LOS SIGUIENTES CAMPOS (Página 137)


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
        <td><mark>GCO001</mark></td>
        <td><mark>Incongruencia en el registro de eventos del receptor (hay un evento previo de desconocimiento)</mark></td>
        <td><mark>4156</mark></td>
        <td><mark>No se puede realizar una conformidad de DE/DTE luego de un evento de desconocimiento</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td>GCO002</td>
        <td>CDC del DTE ya cuenta con <mark>un</mark> evento <mark>previo</mark> de esta naturaleza</td>
        <td>4150</td>
        <td>Sobre el CDC de un DE/DTE se puede realizar hasta <mark>un</mark> eventos de conformidad <mark>(conformidad parcial luego una conformidad total, en ese orden)</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>GCO002c</td>
        <td>CDC del DTE es inexistente <mark>o ha superado el plazo para registro del evento</mark></td>
        <td>4152</td>
        <td>Cuando el CDC no se encuentra en la base de datos del SIFEN <mark>o el plazo del registro del evento es inválido</mark>:<br/><br/><mark>Regla para plazo inválido:</mark><br/><mark>*Si el primer evento del receptor que se pretende registrar es conformidad, este no se puede realizar después de 45 días contados a partir de la fecha de aprobación del DTE</mark><br/><mark>*Si no es el primer evento del receptor y el último evento realizado por el receptor no es una disconformidad, la conformidad no puede superar los 45 días contados a partir de la fecha de aprobación del DTE.</mark><br/><mark>*Si no es el primer evento del receptor y el último evento realizado por el receptor es una disconformidad, entonces la conformidad (evento correctivo) no puede superar los 15 días contados a partir de la fecha de realización del evento de disconformidad</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>GCO002e</td>
        <td><mark>El CDC del DTE se encuentra cancelado</mark></td>
        <td>4155</td>
        <td><mark>No se puede registrar la conformidad por CDC de un DTE cancelado</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td><mark>GCO005</mark></td>
        <td><mark>Fecha de aprobación del DTE ha superado el plazo para registro del evento</mark></td>
        <td><mark>4157</mark></td>
        <td><mark>Sea o no el primer evento del receptor que se pretende registrar, este no se puede realizar después de 45 días corridos contados a partir de la fecha de aprobación del DTE</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>GCO002f</mark></td>
        <td><mark>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</mark></td>
        <td><mark>4158</mark></td>
        <td><mark>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Conformidad Parcial/Total</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

## 2.3 EN REGLAS DE VALIDACIÓN PARA EL EVENTO DISCONFORMIDAD SE MODIFICAN LOS SIGUIENTES CAMPOS

(Página 138)


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
        <td><mark>GDI001</mark></td>
        <td><mark>incongruencia en el registro de eventos del receptor (hay un evento previo de desconocimiento)</mark></td>
        <td><mark>4205</mark></td>
        <td><mark>No se puede realizar una conformidad de DE/DTE luego de un evento de desconocimiento</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td>GDI002</td>
        <td>CDC del DTE ya cuenta con un evento <mark>previo</mark> de esta naturaleza</td>
        <td>4200</td>
        <td>Sobre el CDC de un DTE se puede realizar hasta un evento de disconformidad</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GDI002c</td>
        <td>CDC <mark>del DTE</mark> es inexistente <mark>o ha superado el plazo para registro del evento</mark></td>
        <td>4202</td>
        <td>Cuando el CDC no se encuentra en la base de datos del SIFEN <mark>o el plazo del registro del evento es inválido</mark>:<br/><mark>Regla para plazo inválido:</mark><br/><mark>*Si el primer evento del receptor que se pretende registrar es disconformidad, este no se puede realizar después de 45 días contados a partir de la fecha de aprobación del DTE</mark><br/><mark>*Si no es el primer evento del receptor y el último evento realizado por el receptor no es una conformidad, la disconformidad no puede superar los 45 días contados a partir de la fecha de aprobación del DTE.</mark><br/>*Si no es el primer evento del receptor y el último evento realizado por el receptor es una conformidad, entonces</td>
        <td>R</td>
    </tr>
  </tbody>
</table>

2

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_3_image_1_v2.jpg)

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
        <td> </td>
        <td> </td>
        <td> </td>
        <td><mark>la disconformidad (evento correctivo) no puede superar los 15 días contados a partir de la fecha de realización del evento de conformidad</mark></td>
        <td> </td>
    </tr>
    <tr>
        <td><mark>GDI003</mark></td>
        <td><mark>Fecha de aprobación del DTE ha superado el plazo para registro del evento</mark></td>
        <td><mark>4206</mark></td>
        <td><mark>Sea o no el primer evento del receptor que se pretende registrar, este no se puede realizar después de 45 días corridos contados a partir de la fecha de aprobación del DTE.</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>GDI003a</mark></td>
        <td><mark>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</mark></td>
        <td><mark>4207</mark></td>
        <td><mark>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Disconformidad</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

2.4 <u>REGLAS DE VALIDACIÓN PARA EL EVENTO DESCONOCIMIENTO DE/DTE SE MODIFICAN LOS SIGUIENTES CAMPOS</u> (Página 139)


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
        <td>GED002b</td>
        <td>CDC del DTE ya cuenta con un evento <mark>previo</mark> de esta naturaleza</td>
        <td>4251</td>
        <td>Sobre el CDC de un DTE se puede realizar hasta un evento de desconocimiento</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GED003</td>
        <td>Fecha de emisión del DE/<mark>DTE</mark> ha superado el plazo para registro del evento</td>
        <td>4253</td>
        <td>El plazo del registro del evento <mark>Desconocimiento DE</mark> ha superado los 45 días contados a partir de la fecha de emisión</td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>GED012</mark></td>
        <td><mark>Fecha de aprobación del DTE ha superado el plazo para registro del evento</mark></td>
        <td><mark>4263</mark></td>
        <td><mark>El plazo del registro del evento Desconocimiento DTE ha superado los 45 días contados a partir de la fecha de aprobación del DTE</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>GED013</mark></td>
        <td><mark>El CDC del DTE se encuentra cancelado</mark></td>
        <td><mark>4264</mark></td>
        <td><mark>No se puede registrar el desconocimiento por CDC de un DTE cancelado</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>GED013a</mark></td>
        <td><mark>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</mark></td>
        <td><mark>4265</mark></td>
        <td><mark>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Desconocimiento DTE</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

3. <u>En la sección de “Validación de la firma digital” se agrega la siguiente:</u>
(Página 153)


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
        <td><mark>AD04</mark></td>
        <td><mark>La firma del Evento del receptor del DE/DTE no corresponde</mark></td>
        <td><mark>0143</mark></td>
        <td><mark>La firma digital del evento debe corresponder al receptor del DE/DTE</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

3

![e-kuatia logo](page_4_image_1_v2.jpg)
**e-kuatia**
**Sistema Integrado de Facturación**
**Electrónica Nacional**

# 4. <u>Se elimina la referencia y el cuadro que representa las relaciones que pueden darse entre eventos del receptor</u>

Referencia:

<mark>~~Gris = encabezado~~</mark>

<mark>~~Verde = puede realizarse luego del evento que se encuentra en el encabezado~~</mark>

<mark>~~Rojo = no puede realizarse luego del evento que se encuentra en el encabezado~~</mark>


<table>
  <thead>
    <tr>
        <th colspan="2">DOCUMENTO ELECTRÓNICO</th>
    </tr>
    <tr>
        <th>Notificación - Recepción</th>
        <th>Desconocimiento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Notificación - Recepción DE</td>
        <td>Notificación - Recepción DE</td>
    </tr>
    <tr>
        <td>Conformidad parcial</td>
        <td>Conformidad parcial</td>
    </tr>
    <tr>
        <td>Conformidad total</td>
        <td>Conformidad total</td>
    </tr>
    <tr>
        <td>Disconformidad</td>
        <td>Disconformidad</td>
    </tr>
    <tr>
        <td>Desconocimiento DTE</td>
        <td>Desconocimiento DTE</td>
    </tr>
    <tr>
        <td>Inutilización de número</td>
        <td>Inutilización de número</td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
        <th colspan="5">DOCUMENTO TRIBUTARIO ELECTRÓNICO</th>
    </tr>
    <tr>
        <th>Notificación - Recepción</th>
        <th>Conformidad parcial</th>
        <th>Conformidad total</th>
        <th>Disconformidad</th>
        <th>Desconocimiento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Notificación - Recepción DTE</td>
        <td>Notificación - Recepción DTE</td>
        <td>Notificación - Recepción DTE</td>
        <td>Notificación - Recepción DTE</td>
        <td>Notificación - Recepción DTE</td>
    </tr>
    <tr>
        <td>Conformidad parcial</td>
        <td>Conformidad parcial</td>
        <td>Conformidad parcial</td>
        <td>Conformidad parcial</td>
        <td>Conformidad parcial</td>
    </tr>
    <tr>
        <td>Conformidad total</td>
        <td>Conformidad total</td>
        <td>Conformidad total</td>
        <td>Conformidad total</td>
        <td>Conformidad total</td>
    </tr>
    <tr>
        <td>Disconformidad</td>
        <td>Disconformidad</td>
        <td>Disconformidad</td>
        <td>Disconformidad</td>
        <td>Disconformidad</td>
    </tr>
    <tr>
        <td>Desconocimiento DTE</td>
        <td>Desconocimiento DTE</td>
        <td>Desconocimiento DTE</td>
        <td>Desconocimiento DTE</td>
        <td>Desconocimiento DTE</td>
    </tr>
    <tr>
        <td>Inutilización de número</td>
        <td>Inutilización de número</td>
        <td>Inutilización de número</td>
        <td>Inutilización de número</td>
        <td>Inutilización de número</td>
    </tr>
  </tbody>
</table>

# 5. <u>Se incluye la siguiente descripción respecto al registro de eventos del receptor</u>

<mark>En el Sistema Integrado de Facturación Electrónica Nacional se podrá realizar el registro de cualquier evento del receptor siempre y cuando se encuentre dentro del plazo establecido para cada evento, quedando como válido e inalterable el último evento registrado.</mark>

* <mark>✓ **Para los Documentos Electrónicos:** *El conteo del plazo de registro del evento comienza a partir de la fecha de emisión.*</mark>
* <mark>✓ **Para los Documentos Tributarios Electrónicos:** *El conteo del plazo de registro del evento comienza a partir de la fecha de aprobación.*</mark>

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
        <td>21/12/2022</td>
        <td>Martha Rojas</td>
        <td>10/03/2023</td>
        <td>Elaboración del Documento, Formato de Campos y Validaciones</td>
    </tr>
    <tr>
        <td>Jonathan Garay</td>
        <td>17/04/2023</td>
        <td>Martha Rojas</td>
        <td>24/04/2023</td>
        <td>Ajuste de criterios en las validaciones</td>
    </tr>
    <tr>
        <td>Rossana Mena</td>
        <td>17/11/2023</td>
        <td>Jonathan Garay</td>
        <td>17/11/2023</td>
        <td>Depuración y Ajuste de validaciones</td>
    </tr>
  </tbody>
</table>

4