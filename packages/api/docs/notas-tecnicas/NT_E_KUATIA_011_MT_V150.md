![Logo del Ministerio de Hacienda](page_1_image_1_v2.jpg) ![Logo e-kuatia](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

# NOTA TÉCNICA N° 11

**Fecha:** 20/10/2022

**Cambios desde la fecha** 23/09/2022 al 20/10/2022

**<u>Referencia</u>:** Correcciones y ajustes sobre el MT versión 150

## 1. WEB SERVICES

### 1.1. <u>Se incluye el siguiente Web Service:</u>

#### 9.8. WS consulta masiva de RUC – rEnviConsArchivoRUCRequest


<table>
  <tbody>
    <tr>
        <td>**Función:**</td>
        <td>Devuelve el resultado de la consulta de los datos de razón social, si es facturador electrónico y estado del RUC de todos los contribuyentes existentes (excepto cancelados).</td>
    </tr>
    <tr>
        <td>**Proceso:**</td>
        <td>Síncrono</td>
    </tr>
    <tr>
        <td>**Método:**</td>
        <td>rEnviConsArchivoRUCRequest</td>
    </tr>
  </tbody>
</table>

#### 9.8.1. Definición del protocolo que consume este servicio

El Request que consumirá este servicio estará construido en XML, según el Schema expuesto a Continuación:

**Schema XML 20: WS_ConsultaArchivoRuc.xsd**


<table>
  <thead>
    <tr>
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
        <td>ESch0 1</td>
        <td>rEnviConsArchivoRUCRequest</td>
        <td>Raíz</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>Elemento raíz</td>
    </tr>
    <tr>
        <td>ESch0 2</td>
        <td>rConsultaArchivo</td>
        <td>Contenedor de parámetros requeridos para la consulta.</td>
        <td>ESch0 1</td>
        <td>G</td>
        <td>-</td>
        <td>1-1</td>
        <td>Definido en el schema xml: siConsultaArchivoRuc.xsd</td>
    </tr>
  </tbody>
</table>

**Schema XML 21: siConsultaArchivoRuc.xsd**


<table>
  <thead>
    <tr>
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
        <td>ESch0 3</td>
        <td>ConsultaDTE</td>
        <td>Raíz</td>
        <td>ESch0 2</td>
        <td>G</td>
        <td>-</td>
        <td>1-1</td>
        <td>Elemento raíz</td>
    </tr>
    <tr>
        <td>ESch0 4</td>
        <td>Id</td>
        <td>Identificador de control de envío.</td>
        <td>ESch0 3</td>
        <td>N</td>
        <td>1-15</td>
        <td>1-1</td>
        <td>Atributo. Número secuencial autoincremental, para identificación del mensaje enviado. La responsabilidad de generar y controlar este número es exclusiva del contribuyente.</td>
    </tr>
    <tr>
        <td>ESch0 5</td>
        <td>dRucFactElec</td>
        <td>RUC del facturador electrónico.</td>
        <td>ESch0 3</td>
        <td>A</td>
        <td>5-8</td>
        <td>1-1</td>
        <td>RUC no incluye el dígito verificador (DV).</td>
    </tr>
    <tr>
        <td>ESch0 6</td>
        <td>Signature</td>
        <td>Grupo de campos de firma</td>
        <td>ESch0 2</td>
        <td>G</td>
        <td> </td>
        <td>1-1</td>
        <td> </td>
    </tr>
  </tbody>
</table>

![Logo](page_2_image_1_v2.jpg)
![e-kuatia logo](image_url_placeholder)
Sistema Integrado de Facturación Electrónica Nacional

## 9.8.2. Descripción del procesamiento

Tabla L – Resultados de Procesamiento del WS Consulta Masiva de RUC


<table>
  <thead>
    <tr>
        <th>Condición</th>
        <th>Mensaje generado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Devuelve el archivo</td>
        <td>0520=Archivo encontrado</td>
    </tr>
    <tr>
        <td>No se encontró el archivo generado en el día</td>
        <td>0521=Archivo no encontrado</td>
    </tr>
    <tr>
        <td>Se ha superado el límite de descargas del día (máximo una descarga diaria)</td>
        <td>0522=Ha sobrepasado el límite de descargas para el archivo solicitado</td>
    </tr>
    <tr>
        <td>El RUC del certificado no coincide con el RUC de consulta</td>
        <td>0523=RUC del certificado utilizado para firmar no coincide con el RUC de consulta</td>
    </tr>
  </tbody>
</table>

## 9.8.3. Flujo de proceso de web service de consulta masiva de RUC




<table>
  <caption>9.8.3. Flujo de proceso de web service de consulta masiva de RUC</caption>
  <thead>
    <tr>
      <th>Paso / Condición</th>
      <th>Resultado de Validación</th>
      <th>Acción / Resultado Final</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Servicio Habilitado?</td>
      <td>NO</td>
      <td>Rechazo Código 1264 (RUC del emisor no está habilitado para utilizar este tipo de servicio)</td>
    </tr>
    <tr>
      <td>Servicio Habilitado?</td>
      <td>SÍ</td>
      <td>Pasar a: RUC consulta = RUC Firma?</td>
    </tr>
    <tr>
      <td>RUC consulta = RUC Firma?</td>
      <td>NO</td>
      <td>Rechazo Código 0523 (El RUC del certificado utilizado para firmar no coincide con el RUC de consulta)</td>
    </tr>
    <tr>
      <td>RUC consulta = RUC Firma?</td>
      <td>SÍ</td>
      <td>Pasar a: Firma válida?</td>
    </tr>
    <tr>
      <td>Firma válida?</td>
      <td>NO</td>
      <td>Rechazo Código 0141 (Valor de la firma (SignatureValue) diferente del calculado por el PKI.)</td>
    </tr>
    <tr>
      <td>Firma válida?</td>
      <td>SÍ</td>
      <td>Pasar a: Ya descargó el archivo en el día?</td>
    </tr>
    <tr>
      <td>Ya descargó el archivo en el día?</td>
      <td>NO</td>
      <td>Registrar RUC primera descarga -&gt; Existe Archivo?</td>
    </tr>
    <tr>
      <td>Ya descargó el archivo en el día?</td>
      <td>SÍ</td>
      <td>Pasar a: Está dentro del Límite de Descarga?</td>
    </tr>
    <tr>
      <td>Está dentro del Límite de Descarga?</td>
      <td>NO</td>
      <td>Rechazo Código 0522</td>
    </tr>
    <tr>
      <td>Está dentro del Límite de Descarga?</td>
      <td>SÍ</td>
      <td>Pasar a: Existe Archivo?</td>
    </tr>
    <tr>
      <td>Existe Archivo?</td>
      <td>NO</td>
      <td>Rechazo Código 0521</td>
    </tr>
    <tr>
      <td>Existe Archivo?</td>
      <td>SÍ</td>
      <td>Devuelve Archivo Código 0520</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">
        <strong>Notas de referencia:</strong><br>
        0520: Archivo encontrado<br>
        0521: Archivo no encontrado<br>
        0522: Ha sobrepasado el límite de descargas para el archivo solicitado
      </td>
    </tr>
  </tfoot>
</table>



## 9.8.4. Protocolo de respuesta del web service

El Response que consumirá este servicio estará construido en XML, según el Schema expuesto a continuación:
Schema XML 22: WS_ConsultaArchivoRuc.xsd


<table>
  <thead>
    <tr>
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
        <td>FSch0 1</td>
        <td>rEnviConsArchiv<br/>oRUCResponse</td>
        <td>Raíz</td>
        <td>-</td>
        <td>G</td>
        <td>-</td>
        <td>1-1</td>
        <td>Elemento raíz</td>
    </tr>
    <tr>
        <td>FSch0 2</td>
        <td>dFecProc</td>
        <td>Fecha y hora del procesamiento<br/>de la petición</td>
        <td>FSch0 1</td>
        <td>D</td>
        <td>1-15</td>
        <td>1-1</td>
        <td>Fecha de proceso de la petición. Formato AAAA-MM-DDTHH:MI:SS</td>
    </tr>
    <tr>
        <td>FSch0 3</td>
        <td>dFecArchivo</td>
        <td>Fecha del archivo</td>
        <td>FSch0 1</td>
        <td>D</td>
        <td>-</td>
        <td>0-1</td>
        <td>Fecha de generación del archivo. Formato AAAA-MM-DD</td>
    </tr>
    <tr>
        <td>FSch0 4</td>
        <td>dCodRes</td>
        <td>Código de resultado de la consulta</td>
        <td>FSch0 1</td>
        <td>A</td>
        <td>1-4</td>
        <td>1-1</td>
        <td>Definido en el tópico correspondiente del capítulo 12 MT</td>
    </tr>
    <tr>
        <td>FSch0 5</td>
        <td>dMsgRes</td>
        <td>Mensaje de resultado de la consulta</td>
        <td>FSch0 1</td>
        <td>A</td>
        <td>1-255</td>
        <td>1-1</td>
        <td>Definido en el tópico correspondiente del capítulo 12 MT</td>
    </tr>
    <tr>
        <td>FSch0 6</td>
        <td>rConsDte</td>
        <td>Archivo de RUC comprimido</td>
        <td>FSch0 1</td>
        <td>B</td>
        <td> </td>
        <td>0-1</td>
        <td>Campo comprimido en formato Base64.</td>
    </tr>
  </tbody>
</table>

![Abstract green shapes logo](page_3_image_1_v2.jpg) ![e-kuatia logo](image_url_placeholder)
**Sistema Integrado de Facturación Electrónica Nacional**

**<u>1.2. Se agrega la siguiente descripción de Servicios Web del SIFEN:</u>**

**12.3.7. WS consulta masiva de RUC – rEnviConsArchivoRUCRequest**

**12.3.7.1. Área de datos del WS**


<table>
  <thead>
    <tr>
        <th>ID</th>
        <th>Resultado de la Validación</th>
        <th>Código</th>
        <th>Obs</th>
        <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>BO04</td>
        <td>Devuelve el archivo</td>
        <td>0520</td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td>BO05</td>
        <td>No se encontró el archivo generado en el día</td>
        <td>0521</td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td>BO06</td>
        <td>Se ha superado el límite de descargas del día</td>
        <td>0522</td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td>BO07</td>
        <td>El RUC del certificado utilizado para firmar no coincide con<br/>el RUC de consulta</td>
        <td>0523</td>
        <td> </td>
        <td> </td>
    </tr>
  </tbody>
</table>

**12.1.1. Códigos de respuestas de las validaciones de los Servicios Web (Página 147)**


<table>
  <thead>
    <tr>
        <th>Inicio ID</th>
        <th>Inicio código de respuesta</th>
        <th>Fin ID</th>
        <th>Fin código de respuesta</th>
        <th>Tipo de Regla de Validación</th>
        <th>Apartado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>BO01</td>
        <td>0500</td>
        <td>BO20</td>
        <td>0559</td>
        <td>Área de datos del WS siConsRUC / Área de datos del<br/>WS rEnviConsArchivoRUCRequest</td>
        <td> </td>
    </tr>
  </tbody>
</table>

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
        <td>Patricia Rolón</td>
        <td>23/09/2022</td>
        <td> </td>
        <td> </td>
        <td>Estructura del WS consulta masiva<br/>de RUC</td>
    </tr>
    <tr>
        <td>Jonathan Garay</td>
        <td>20/10/2022</td>
        <td>José Vernazza</td>
        <td>24/10/2022</td>
        <td>Formato de Campos y Validaciones<br/>del WS Service</td>
    </tr>
  </tbody>
</table>