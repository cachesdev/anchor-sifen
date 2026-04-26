![e-kuatia Sistema Integrado de Facturación Electrónica Nacional](page_1_image_1_v2.jpg)

# NOTA TÉCNICA N° 20

**Fecha:** 17/11/2023


<table>
  <tbody>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Test</td>
        <td>15 de diciembre de 2023</td>
    </tr>
    <tr>
        <td>Fecha puesta a disposición para el Ambiente de Producción</td>
        <td>31 de enero del 2024</td>
    </tr>
  </tbody>
</table>

<u>**Referencia:**</u> Nuevas validaciones incluidas en el MT versión 150 para operaciones realizadas con Entidades del Gobierno.

## 1. Formato de Campos XML

1.1. Se agrega el campo dCodConDncp dentro del grupo E9.5. Grupo de datos adicionales de uso comercial (E820-E829)


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
        <td>E9.5</td>
        <td>E827</td>
        <td>dCodConDncp</td>
        <td>Código de contratación de la DNCP</td>
        <td>E820</td>
        <td>A</td>
        <td>1-30</td>
        <td>0-1</td>
        <td>Código de contratación proveído por la DNCP</td>
    </tr>
  </tbody>
</table>

## 2. Validaciones

2.1. En el grupo de datos que identifican al receptor del Documento Electrónico DE (D200 - D299) se modifica la siguiente validación.

<u>(Página 165)</u>


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
        <td>D202b</td>
        <td>El tipo de operación no compatible para un Organismo o Entidad del Estado</td>
        <td>1332</td>
        <td>Si el RUC del receptor (D206) corresponde a un Organismo o Entidad del Estado (OEE), el tipo de operación debe ser B2G (D202=3)</td>
        <td>R</td>
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
        <td>Norma Rojas</td>
        <td>25/08/2023</td>
        <td> </td>
        <td> </td>
        <td>Elaboración del Documento, Se agrega un nuevo campo y validación</td>
    </tr>
    <tr>
        <td>Norma Rojas</td>
        <td>08/09/2023</td>
        <td>Carlos Mendoza</td>
        <td>08/09/2023</td>
        <td>Ajuste del código del mensaje de validación</td>
    </tr>
  </tbody>
</table>

1