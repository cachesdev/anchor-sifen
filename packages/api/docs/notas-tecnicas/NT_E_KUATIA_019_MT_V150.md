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
        <td>Fecha de emisión del DE/<mark eliminado>DTE</mark></td>
        <td>GEN001</td>
        <td>F</td>
        <td>19</td>
        <td>1-1</td>
        <td>Requerido para conteo de plazo de registro del evento del receptor en <mark agregado>Notificación – Recepción DE</mark> (hasta 45 días desde la fecha de emisión)<br/>Fecha y hora en el formato AAAA-MM-DDThh:mm:ss</td>
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
        <td>Fecha de emisión del DE/<mark eliminado>DTE</mark></td>
        <td>GED001</td>
        <td>F</td>
        <td>19</td>
        <td>1-1</td>
        <td>Requerido para conteo de plazo de registro del evento del receptor en <mark agregado>Desconocimiento DE</mark> (hasta 45 días desde la fecha de emisión).<br/>Fecha y hora en el formato AAAA-MM-DDThh:mm:ss.</td>
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
        <td>CDC del DTE ya cuenta con un evento <mark agregado>previo</mark> de esta naturaleza</td>
        <td>4101</td>
        <td>Sobre el CDC de un DE/DTE se puede realizar hasta un evento de notificación - recepción</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GEN003</td>
        <td>Fecha de emisión del DE/<mark eliminado>DTE</mark> ha superado el plazo para registro del evento</td>
        <td>4103</td>
        <td>El plazo del registro del evento <mark agregado>Notificación – Recepción DE</mark> ha superado los 45 días contados a partir de la fecha de emisión</td>
        <td>AO</td>
    </tr>
    <mark agregado>
    <tr>
        <td>GEN012</td>
        <td>Fecha de aprobación del DTE ha superado el plazo para registro del evento</td>
        <td>>4114</td>
        <td>>El plazo del registro del evento Notificación – Recepción DTE ha superado los 45 días contados a partir de la fecha de aprobación del DTE</td>
        <td>AO</td>
    </tr>
    </mark>
  </tbody>
</table>

1

![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_2_image_1_v2.jpg)

<table>
  <tbody>
      <mark agregado>
    <tr>
        <td>GEN013</td>
        <td>El CDC del DTE se encuentra cancelado</td>
        <td>4115</td>
        <td>No se puede registrar la Notificación – Recepción por CDC de un DTE cancelado</td>
        <td>R</td>
    </tr>
    </mark>
    <mark agregado>
    <tr>
        <td>GEN013a</td>
        <td>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</td>
        <td>4116</td>
        <td>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Notificación – Recepción DTE</td>
        <td>R</td>
    </tr>
    </mark>
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
      <mark eliminado>
    <tr>
        <td>GCO001</td>
        <td>Incongruencia en el registro de eventos del receptor (hay un evento previo de desconocimiento)</td>
        <td>4156</td>
        <td>No se puede realizar una conformidad de DE/DTE luego de un evento de desconocimiento</td>
        <td>R</td>
    </tr>
    <mark>
    <tr>
        <td>GCO002</td>
        <td>CDC del DTE ya cuenta con <mark modificado>un</mark> evento <mark modificado>previo</mark> de esta naturaleza</td>
        <td>4150</td>
        <td>Sobre el CDC de un <mark eliminado>DE/</mark>DTE se puede realizar hasta <mark modificado>un</mark> evento<mark eliminado>s</mark> de conformidad <mark eliminado>(conformidad parcial luego una conformidad total, en ese orden)</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>GCO002c</td>
        <td>CDC del DTE es inexistente <mark eliminado>o ha superado el plazo para registro del evento</mark></td>
        <td>4152</td>
        <td>Cuando el CDC no se encuentra en la base de datos del SIFEN <mark eliminado>o el plazo del registro del evento es inválido</mark>:<br/><br/><mark eliminado>Regla para plazo inválido:<br/>*Si el primer evento del receptor que se pretende registrar es conformidad, este no se puede realizar después de 45 días contados a partir de la fecha de aprobación del DTE<br/>*Si no es el primer evento del receptor y el último evento realizado por el receptor no es una disconformidad, la conformidad no puede superar los 45 días contados a partir de la fecha de aprobación del DTE.<br/>*Si no es el primer evento del receptor y el último evento realizado por el receptor es una disconformidad, entonces la conformidad (evento correctivo) no puede superar los 15 días contados a partir de la fecha de realización del evento de disconformidad</mark></td>
        <td>R</td>
    </tr>
    <tr>
        <td>GCO002e</td>
        <td><mark modificado>El CDC del DTE se encuentra cancelado</mark></td>
        <td>4155</td>
        <td><mark modificado>No se puede registrar la conformidad por CDC de un DTE cancelado</mark></td>
        <td>R</td>
    </tr>
    <mark agregado>
    <tr>
        <td>GCO005</td>
        <td>Fecha de aprobación del DTE ha superado el plazo para registro del evento</td>
        <td>4157</td>
        <td>Sea o no el primer evento del receptor que se pretende registrar, este no se puede realizar después de 45 días corridos contados a partir de la fecha de aprobación del DTE</td>
        <td>R</td>
    </tr>
    </mark>
    <mark agregado>
    <tr>
        <td>GCO002f</td>
        <td>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</td>
        <td>4158</td>
        <td>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Conformidad Parcial/Total</td>
        <td>R</td>
    </tr>
    </mark>
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
      <mark eliminado>
    <tr>
        <td>GDI001</td>
        <td>incongruencia en el registro de eventos del receptor (hay un evento previo de desconocimiento)</td>
        <td>4205</td>
        <td>No se puede realizar una conformidad de DE/DTE luego de un evento de desconocimiento</td>
        <td>R</td>
    </tr>
      </mark>
    <tr>
        <td>GDI002</td>
        <td>CDC del DTE ya cuenta con un evento <mark agregado>previo</mark> de esta naturaleza</td>
        <td>4200</td>
        <td>Sobre el CDC de un DTE se puede realizar hasta un evento de disconformidad</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GDI002c</td>
        <td>CDC <mark agregado>del DTE</mark> es inexistente <mark eliminado>o ha superado el plazo para registro del evento</mark></td>
        <td>4202</td>
        <td>Cuando el CDC no se encuentra en la base de datos del SIFEN <mark eliminado>o el plazo del registro del evento es inválido:<br/>Regla para plazo inválido:<br/>*Si el primer evento del receptor que se pretende registrar es disconformidad, este no se puede realizar después de 45 días contados a partir de la fecha de aprobación del DTE<br/>*Si no es el primer evento del receptor y el último evento realizado por el receptor no es una conformidad, la disconformidad no puede superar los 45 días contados a partir de la fecha de aprobación del DTE.<br/>*Si no es el primer evento del receptor y el último evento realizado por el receptor es una conformidad, entonces la disconformidad (evento correctivo) no puede superar los 15 días contados a partir de la fecha de realización del evento de conformidad</mark></td>
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
      <mark agregado>
    <tr>
        <td>GDI003</td>
        <td>Fecha de aprobación del DTE ha superado el plazo para registro del evento</td>
        <td>4206</td>
        <td>Sea o no el primer evento del receptor que se pretende registrar, este no se puede realizar después de 45 días corridos contados a partir de la fecha de aprobación del DTE.</td>
        <td>R</td>
    </tr>
    </mark>
    <mark agregado>
    <tr>
        <td>GDI003a</td>
        <td>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</td>
        <td>4207</td>
        <td>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Disconformidad</td>
        <td>R</td>
    </tr>
    </mark>
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
        <td>CDC del DTE ya cuenta con un evento <mark agregado>previo</mark> de esta naturaleza</td>
        <td>4251</td>
        <td>Sobre el CDC de un DTE se puede realizar hasta un evento de desconocimiento</td>
        <td>R</td>
    </tr>
    <tr>
        <td>GED003</td>
        <td>Fecha de emisión del DE/<mark eliminado>DTE</mark> ha superado el plazo para registro del evento</td>
        <td>4253</td>
        <td>El plazo del registro del evento <mark agregado>Desconocimiento DE</mark> ha superado los 45 días contados a partir de la fecha de emisión</td>
        <td><mark modificado>R</mark></td>
    </tr>
    <mark agregado>
    <tr>
        <td>GED012</td>
        <td>Fecha de aprobación del DTE ha superado el plazo para registro del evento</td>
        <td>4263</td>
        <td>El plazo del registro del evento Desconocimiento DTE ha superado los 45 días contados a partir de la fecha de aprobación del DTE</td>
        <td>R</td>
    </tr>
    </mark>
    <mark agregado>
    <tr>
        <td>GED013</td>
        <td>El CDC del DTE se encuentra cancelado</td>
        <td>4264</td>
        <td>No se puede registrar el desconocimiento por CDC de un DTE cancelado</td>
        <td>R</td>
    </tr>
    <mark>
        <mark agregado>
    <tr>
        <td>GED013a</td>
        <td>CDC del DTE ya cuenta con el máximo de eventos permitidos de la misma naturaleza</td>
        <td>4265</td>
        <td>CDC del DTE ya ha superado la cantidad de eventos establecidos sobre el Tipo de Evento de Desconocimiento DTE</td>
        <td>R</td>
    </tr>
        </mark>
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
      <mark agregado>
    <tr>
        <td>AD04</td>
        <td>La firma del Evento del receptor del DE/DTE no corresponde</td>
        <td>0143</td>
        <td>La firma digital del evento debe corresponder al receptor del DE/DTE</td>
        <td>R</td>
    </tr>
    </mark>
  </tbody>
</table>

3

![e-kuatia logo](page_4_image_1_v2.jpg)
**e-kuatia**
**Sistema Integrado de Facturación**
**Electrónica Nacional**

# 4. <u>Se elimina la referencia y el cuadro que representa las relaciones que pueden darse entre eventos del receptor</u>

<mark eliminado>
Referencia:

<mark eliminado>~~Gris = encabezado~~</mark>

<mark eliminado>~~Verde = puede realizarse luego del evento que se encuentra en el encabezado~~</mark>

<mark eliminado>~~Rojo = no puede realizarse luego del evento que se encuentra en el encabezado~~</mark>

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

</mark>

# 5. <u>Se incluye la siguiente descripción respecto al registro de eventos del receptor</u>

<mark agregado>En el Sistema Integrado de Facturación Electrónica Nacional se podrá realizar el registro de cualquier evento del receptor siempre y cuando se encuentre dentro del plazo establecido para cada evento, quedando como válido e inalterable el último evento registrado.</mark>

- <mark agregado>✓ **Para los Documentos Electrónicos:** _El conteo del plazo de registro del evento comienza a partir de la fecha de emisión._</mark>
- <mark agregado>✓ **Para los Documentos Tributarios Electrónicos:** _El conteo del plazo de registro del evento comienza a partir de la fecha de aprobación._</mark>

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
