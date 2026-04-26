![Logo](page_1_image_1_v2.jpg)
![e-kuatia logo](image_url_placeholder)
**Sistema Integrado de Facturación Electrónica Nacional**

# NOTA TÉCNICA N° 3

**Fecha:** 18/11/2020
**Cambios desde la fecha:** 15/11/2020 al 15/11/2020
**<u>Referencia</u>:** Correcciones y ajustes sobre el MT versión 150

1. **<u>FORMATO</u>**

1.1. Se modifican los siguientes campos:

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
        <td>D3</td>
        <td>D219</td>
        <td>cDepRec</td>
        <td>Código del departamento del receptor</td>
        <td>D200</td>
        <td>N</td>
        <td>1-2</td>
        <td>0-1</td>
        <td><mark>Campo obligatorio si se informa el campo D213 y D202≠4. No se debe informar cuando D202 = 4.<br/>Según XSD de Departamentos</mark></td>
    </tr>
    <tr>
        <td>D3</td>
        <td>D223</td>
        <td>cCiuRec</td>
        <td>Código de la ciudad del receptor</td>
        <td>D200</td>
        <td>N</td>
        <td>1-5</td>
        <td>0-1</td>
        <td><mark>Campo obligatorio si se informa el campo D213 y D202≠4. No se debe informar cuando D202 = 4.<br/>Según Tabla 2.2 – Ciudades</mark></td>
    </tr>
  </tbody>
</table>

Páginas: 72, 73.

2. **<u>VALIDACIONES</u>**

2.1. Se eliminan las siguientes validaciones:

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
        <td><mark>69</mark></td>
        <td><mark>D219</mark></td>
        <td><mark>Es obligatorio informar el departamento del receptor</mark></td>
        <td><mark>1324</mark></td>
        <td><mark>Cuando se informa la dirección del receptor (D213) y el tipo de operación es distinto a B2F (D202≠4), es obligatorio informar el departamento (D219)</mark></td>
        <td><mark>R</mark></td>
    </tr>
    <tr>
        <td><mark>72</mark></td>
        <td><mark>D223</mark></td>
        <td><mark>Es obligatorio informar la ciudad del receptor</mark></td>
        <td><mark>1327</mark></td>
        <td><mark>Cuando se informa la dirección del receptor (D213) y el tipo de operación es distinto a B2F (D202≠4), es obligatorio informar la ciudad (D223)</mark></td>
        <td><mark>R</mark></td>
    </tr>
  </tbody>
</table>

Página: 167.

**Histórico del Documento**

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
        <td>Amanda González</td>
        <td>16/11/2020</td>
        <td>Carlos Mendoza</td>
        <td>16/11/2020</td>
        <td> </td>
    </tr>
  </tbody>
</table>

1
