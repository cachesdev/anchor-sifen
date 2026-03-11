# Índice — Manual Técnico SIFEN v150

> **Nota sobre números de página:** Este documento fue convertido desde PDF. Los números de página aparecen al final de cada entrada como `— p. N`. En el archivo fuente, los saltos de página tienen el formato `septiembre de 2019 N` — el texto `septiembre de 2019` es un pie de página del PDF y el número final (ej. `9`) es el número de página real. puedes grepear el libro usando este sistema, y asi evitar el uso innecesario de tokens.

## Control de Versiones

- Versión 120 — p. 10
- Versión 130 — p. 10
- Versión 140 — p. 11
- Versión 141 — p. 12
- Versión 150 — p. 12

---

## Tabla de Contenidos

### 1. Introducción — p. 15

### 2. Objetivos — p. 16

### 3. Alcance — p. 17

### 4. Sistema Integrado de Facturación Electrónica Nacional (SIFEN) — p. 18

- 4.1. Estructura y subsistemas SIFEN — p. 18
- 4.2. Fundamento legal — p. 20
- 4.3. Validez jurídica e incidencia tributaria de los documentos tributarios electrónicos — p. 21

### 5. Documentos Tributarios Electrónicos — p. 22

- 5.1. Comprobantes de ventas electrónicos — p. 22
- 5.2. Documentos complementarios electrónicos — p. 22
- 5.3. Nota de Remisión Electrónica — p. 22

### 6. Modelo Operativo — p. 23

- 6.1. Descriptores del modelo operativo de SIFEN — p. 23
  - 6.1.1. Archivo electrónico — p. 23
  - 6.1.2. Aprobación del DTE — p. 23
- 6.2. Plazo de transmisión del DE a la SET — p. 24
  - 6.2.1. Plazos SIFEN — p. 24
- 6.3. Relación directa con los contribuyentes — p. 26
- 6.4. Entrega del DE al receptor — p. 26
- 6.5. Rechazo del DE en el modelo de aprobación posterior — p. 26
- 6.6. Verificación de la existencia del DTE por parte del receptor — p. 27

### 7. Características Tecnológicas del Formato — p. 28

- 7.1. Modelo conceptual de comunicación — p. 28
- 7.2. Estándar del formato XML — p. 30
  - 7.2.1. Estándar de codificación — p. 30
  - 7.2.2. Declaración namespace — p. 30
    - 7.2.2.1. Particularidad de la firma digital — p. 31
    - 7.2.2.2. Particularidad del envío de lote — p. 31
  - 7.2.3. Convenciones referenciadas en tablas — p. 32
  - 7.2.4. Recomendaciones: mejores prácticas de generación del archivo — p. 34
- 7.3. Contenedor de documento electrónico — p. 35
- 7.4. Estándar de comunicación — p. 35
- 7.5. Estándar de certificado digital — p. 36
- 7.6. Estándar de firma digital — p. 37
- 7.7. Especificaciones técnicas del estándar de certificado y firma digital — p. 39
- 7.8. Procedimiento para la validación de la firma digital — p. 40
- 7.9. Síntesis de definiciones tecnológicas — p. 40
- 7.10. Resumen de las Direcciones Electrónicas de los Servicios Web (Pruebas y Producción) — p. 41
- 7.11. Servidor para sincronización externa de horario — p. 41

### 8. Aspectos Tecnológicos de los Servicios Web del SIFEN — p. 42

- 8.1. Servicio síncrono — p. 42
  - 8.1.1. Flujo funcional — p. 42
- 8.2. Servicio asíncrono — p. 43
  - 8.2.1. Secuencia del servicio asíncrono — p. 43
  - 8.2.2. Tiempo promedio de procesamiento de un lote — p. 43
- 8.3. Estándar de mensajes de los servicios del SIFEN — p. 44
- 8.4. Versión de los Schemas XML — p. 44
  - 8.4.1. Identificación de la versión de los Schemas XML — p. 44
  - 8.4.2. Liberación de versiones de los Schemas XML — p. 44
  - 8.4.3. Paquete inicial de Schemas — p. 44

### 9. Descripción de los Servicios Web del SIFEN — p. 45

- 9.1. WS recepción documento electrónico – `siRecepDE` — p. 45
  - 9.1.1. Definición del protocolo — p. 45
  - 9.1.2. Descripción del procesamiento — p. 45
  - 9.1.3. Protocolo de respuesta — p. 46
- 9.2. WS recepción lote DE – `siRecepLoteDE` — p. 47
  - 9.2.1. Definición del protocolo — p. 47
  - 9.2.2. Descripción del procesamiento — p. 47
  - 9.2.3. Protocolo de respuesta — p. 48
- 9.3. WS consulta resultado de lote DE – `siResultLoteDE` — p. 48
  - 9.3.1. Definición del protocolo — p. 48
  - 9.3.2. Descripción del procesamiento — p. 49
  - 9.3.3. Protocolo de respuesta — p. 49
- 9.4. WS consulta DE – `siConsDE` — p. 50
  - 9.4.1. Definición del protocolo — p. 50
  - 9.4.2. Descripción del procesamiento — p. 51
  - 9.4.3. Protocolo de respuesta — p. 51
- 9.5. WS recepción evento – `siRecepEvento` — p. 52
  - 9.5.1. Definición del protocolo — p. 52
  - 9.5.2. Descripción del procesamiento — p. 53
  - 9.5.3. Protocolo de respuesta — p. 53
- 9.6. WS consulta RUC – `siConsRUC` — p. 53
  - 9.6.1. Definición del protocolo — p. 54
  - 9.6.2. Descripción del procesamiento — p. 54
  - 9.6.3. Protocolo de respuesta — p. 54
- 9.7. WS consulta DE de entidades externas autorizadas – `siConsDEST` _(a futuro)_ — p. 55

### 10. Formato de los Documentos Electrónicos — p. 56

- 10.1. Estructura del código de control (CDC) de los DE — p. 56
- 10.2. Dígito verificador del CDC — p. 57
- 10.3. Generación del código de seguridad — p. 57
- 10.4. Datos que se deben informar en los DE — p. 58
- 10.5. Manejo del timbrado y Numeración — p. 59

### 11. Gestión de Eventos — p. 112

- 11.1. Eventos realizados por el emisor — p. 112
  - 11.1.1. Inutilización de número de DE — p. 112
  - 11.1.2. Cancelación — p. 113
  - 11.1.3. Devolución y Ajuste de precios — p. 113
  - 11.1.4. Endoso de FE _(evento futuro)_ — p. 114
- 11.2. Eventos registrados por el receptor — p. 114
  - 11.2.1. Conformidad con el DTE — p. 114
  - 11.2.2. Disconformidad con el DTE — p. 114
  - 11.2.3. Desconocimiento con el DE o DTE — p. 114
  - 11.2.4. Notificación de recepción de un DE o DTE — p. 115
  - 11.2.5. Tipología de los eventos del receptor — p. 115
- 11.4. Eventos registrados por la SET _(evento futuro)_ — p. 116
  - 11.4.1. Impugnación de DTE — p. 116
- 11.5. Estructura de los Eventos — p. 120
  - 11.5.1. Formato de Eventos Emisor — p. 121
  - 11.5.2. Formato de Eventos Receptor — p. 123
- 11.6. Reglas de Validación de Gestión de Eventos — p. 133
  - 11.6.1. Reglas de validación para Cancelación — p. 134
  - 11.6.2. Reglas de validación para Inutilización — p. 135
  - 11.6.3. Reglas de validación para Notificación – Recepción DE/DTE — p. 136
  - 11.6.4. Reglas de validación para el Evento Conformidad — p. 137
  - 11.6.5. Reglas de validación para el Evento Disconformidad — p. 138
  - 11.6.6. Reglas de validación para el Evento Desconocimiento DE/DTE — p. 139
  - 11.6.7. Reglas de validación para el Evento Actualización de Datos: Datos del Transporte — p. 141

### 12. Validaciones — p. 145

- 12.1. Estructura de los códigos de validación — p. 146
  - 12.1.1. Códigos de respuesta — Servicios Web — p. 147
  - 12.1.2. Códigos de respuesta — DE — p. 148
  - 12.1.3. Códigos de respuesta — Eventos — p. 150
- 12.2. Codificación de respuestas de los Servicios Web del SIFEN — p. 150
  - 12.2.1. Validaciones del certificado de transmisión (Protocolo TLS) — p. 150
  - 12.2.2. Validación de la estructura XML de los WS — p. 151
  - 12.2.3. Validación de forma del área de datos del Request — p. 152
  - 12.2.4. Validación del certificado de firma — p. 152
  - 12.2.5. Validación de la firma digital — p. 153
  - 12.2.6. Validaciones genéricas a los mensajes de entrada de los WS — p. 153
  - 12.2.7. Validaciones genéricas a los mensajes de control de llamada de los WS — p. 154
- 12.3. Validaciones de cada Web Service — p. 154
  - 12.3.1. `siRecepDE` — WS recepción documento electrónico — p. 154
    - 12.3.1.1. Mensaje de entrada del WS — p. 154
    - 12.3.1.2. Información de control de la llamada al WS — p. 154
    - 12.3.1.3. Área de datos del WS — p. 154
  - 12.3.2. `siRecepLoteDE` — WS recepción lote DE — p. 155
    - 12.3.2.1. Mensaje de entrada del WS — p. 155
    - 12.3.2.2. Información de control de la llamada al WS — p. 155
    - 12.3.2.3. Área de datos del WS — p. 155
  - 12.3.3. `siResultLoteDE` — WS consulta resultado de lote DE — p. 155
    - 12.3.3.1. Mensaje de entrada del WS — p. 155
    - 12.3.3.2. Información de control de la llamada al WS — p. 156
    - 12.3.3.3. Área de datos del WS — p. 156
  - 12.3.4. `siConsDE` — WS consulta de DE — p. 156
    - 12.3.4.1. Mensaje de entrada del WS — p. 156
    - 12.3.4.2. Información de control de la llamada al WS — p. 157
    - 12.3.4.3. Área de datos del WS — p. 157
  - 12.3.5. `siConsRUC` — WS consulta de RUC — p. 157
    - 12.3.5.1. Mensaje de entrada del WS — p. 157
    - 12.3.5.2. Información de control de la llamada al WS — p. 157
    - 12.3.5.3. Área de datos del WS — p. 157
  - 12.3.6. `siRecepEvento` — WS recepción de evento — p. 158
    - 12.3.6.1. Mensaje de entrada del WS — p. 158
    - 12.3.6.2. Información de control de la llamada al WS — p. 158
    - 12.3.6.3. Área de datos del WS — p. 158
- 12.4. Validaciones del formato — p. 159

### 13. Gráfica (KUDE) — p. 193

- 13.1. Definición y alcance del KuDE — p. 193
- 13.2. Características y funcionalidades — p. 193
- 13.3. Denominación de los KuDE — p. 193
- 13.4. Estructura del KuDE — p. 194
  - 13.4.1. Campos del encabezado del KuDE — p. 195
  - 13.4.2. Campos que describen los ítems de la operación — p. 196
  - 13.4.3. Campos que describen subtotales, totales y liquidación de IVA — p. 196
  - 13.4.4. Campos de información de consulta en SIFEN (SET) — p. 196
  - 13.4.5. Información adicional de interés para el emisor — p. 197
- 13.5. KuDE — p. 197
- 13.6. KuDE (cinta de papel) — p. 203
- 13.7. Cinta papel resumen del KuDE — p. 204
- 13.8. Código bidimensional (QR) — p. 205
  - 13.8.1. Delineamientos del QR Code — p. 205
  - 13.8.2. Conformación del Código QR — p. 205
  - 13.8.3. Metodología para la generación del Código QR — p. 206
  - 13.8.4. Ejemplo de generación del Código QR — p. 207
  - 13.8.5. Mensajes desplegados en consulta del QR — p. 209

### 14. Operación de Contingencia _(Futuro)_ — p. 210

### 15. Codificaciones — p. 210

### 16. Glosario Técnico — p. 214

---

## Índice de Gráficas

- Gráfica Nº 01: Sistema Integrado de Facturación Electrónica Nacional (SIFEN) — p. 18
- Gráfica Nº 02: Subsistema de Validación de Uso — p. 19
- Gráfica Nº 03: Subsistema Electrónico Solución Gratuita E-kuatia'i — p. 20
- Gráfica Nº 04: Secuencia de acciones tecnológicas SIFEN — p. 23
- Gráfica Nº 05: Flujo de comunicación — p. 28
- Gráfica Nº 06: WS Sincrónico — p. 29
- Gráfica Nº 07: WS Asincrónico — p. 29
- Gráfica Nº 08: Relación elementos XML — p. 32
- Gráfica Nº 09: KuDE FE Formato 1 (Papel Carta o similar) — p. 198
- Gráfica Nº 10: KuDE NCE Formato 1 (Papel Carta o similar) — p. 199
- Gráfica Nº 11: KuDE NDE Formato 1 (Papel Carta o similar) — p. 200
- Gráfica Nº 12: KuDE AFE Formato 1 (Papel Carta o similar) — p. 201
- Gráfica Nº 13: KuDE NRE Formato 1 (Papel Carta o similar) — p. 202
- Gráfica Nº 14: KuDE FE Formato 2 (cinta de papel) — p. 203
- Gráfica Nº 15: Cinta papel resumen del KuDE — p. 204

---

## Índice de Tablas

- Tabla A: Convenciones Utilizadas en las Tablas de Definición de los Formatos XML — p. 32
- Tabla B: Tipos de Datos en los Archivos XML — p. 33
- Tabla C: Tamaños de campos — p. 34
- Tabla D: Formatos numéricos — p. 34
- Tabla E: Estándares de tecnología utilizados — p. 40
- Tabla F: Resultados de Procesamiento del WS Consulta Resultado de Lote — p. 49
- Tabla G: Resultados de Procesamiento del WS Consulta DE — p. 51
- Tabla H: Resultados de Procesamiento del WS Consulta RUC — p. 54
- Tabla I: Grupos de campos del Archivo XML — p. 58
- Tabla J: Resumen de los eventos de SIFEN según los actores — p. 117
- Tabla K: Correcciones de los eventos del Receptor en el SIFEN — p. 119
- Tabla 1: Tipo de Régimen — p. 210
- Tabla 2.1: Departamentos, Distritos y Ciudades — p. 210
- Tabla 2.2: Ciudades — p. 210
- Tabla 3: Actividades Económicas — p. 211
- Tabla 4: Codificación de Países — p. 211
- Tabla 5: Codificación de Unidades de Medida — p. 211
- Tabla 6: Códigos de Afectación — p. 212
- Tabla 7: Categorías del ISC — p. 212
- Tabla 8: Tasas del ISC — p. 212
- Tabla 9: Tipos de Vehículos — p. 212
- Tabla 10: Condiciones de Negociación - INCOTERMS — p. 213
- Tabla 11: Regímenes Aduaneros — p. 213

---

## Índice de Schemas XML

- Schema XML 1: `xmldsig-core-schema-v150.xsd` — Estándar de la Firma Digital — p. 38
- Schema XML 2: `siRecepDE_v150.xsd` — WS Recepción DE — p. 45
- Schema XML 3: `resRecepDE_v150.xsd` — Respuesta del WS Recepción DE — p. 46
- Schema XML 4: `ProtProcesDE_v150.xsd` — Protocolo de Procesamiento de DE — p. 46
- Schema XML 5: `SiRecepLoteDE_v150.xsd` — WS Recepción DE Lote — p. 47
- Schema XML 5A: `ProtProcesLoteDE_v150.xsd` — Protocolo de procesamiento del Lote — p. 47
- Schema XML 6: `resRecepLoteDE_v150.xsd` — Respuesta del WS Recepción Lote — p. 48
- Schema XML 7: `SiResultLoteDE_v150.xsd` — WS Consulta Resultado de Lote — p. 48
- Schema XML 8: `resResultLoteDE_v150.xsd` — Respuesta del WS Consulta Resultado Lote — p. 49
- Schema XML 9: `siConsDE_v150.xsd` — WS Consulta DE — p. 50
- Schema XML 10: `resConsDE_v150.xsd` — Respuesta del WS Consulta DE — p. 51
- Schema XML 11: `ContenedorDE_v150.xsd` — Contenedor de DE — p. 51
- Schema XML 12: `ContenedorEvento_v150.xsd` — Contenedor de Evento — p. 52
- Schema XML 13: `siRecepEvento_v150.xsd` — WS Recepción Evento — p. 52
- Schema XML 14: `resRecepEvento_v150.xsd` — Respuesta del WS Recepción Evento — p. 53
- Schema XML 15: `siConsRUC_v150.xsd` — WS Consulta RUC — p. 54
- Schema XML 16: `resConsRUC_v150.xsd` — Respuesta del WS Consulta RUC — p. 54
- Schema XML 17: `ContenedorRUC_v150.xsd` — Contenedor de RUC — p. 55
- Schema XML 18: `DE_v150.xsd` — Documento Electrónico — p. 61
- Schema XML 19: `Evento_v150.xsd` — Formato de evento emisor — p. 120
  - Schema XML 6: `resRecepLoteDE_v150.xsd` — Respuesta del WS Recepción Lote — p. 48
- Schema XML 7: `SiResultLoteDE_v150.xsd` — WS Consulta Resultado de Lote — p. 48
- Schema XML 8: `resResultLoteDE_v150.xsd` — Respuesta del WS Consulta Resultado Lote — p. 49
- Schema XML 9: `siConsDE_v150.xsd` — WS Consulta DE — p. 50
- Schema XML 10: `resConsDE_v150.xsd` — Respuesta del WS Consulta DE — p. 51
- Schema XML 11: `ContenedorDE_v150.xsd` — Contenedor de DE — p. 51
- Schema XML 12: `ContenedorEvento_v150.xsd` — Contenedor de Evento — p. 52
- Schema XML 13: `siRecepEvento_v150.xsd` — WS Recepción Evento — p. 52
- Schema XML 14: `resRecepEvento_v150.xsd` — Respuesta del WS Recepción Evento — p. 53
- Schema XML 15: `siConsRUC_v150.xsd` — WS Consulta RUC — p. 54
- Schema XML 16: `resConsRUC_v150.xsd` — Respuesta del WS Consulta RUC — p. 54
- Schema XML 17: `ContenedorRUC_v150.xsd` — Contenedor de RUC — p. 55
- Schema XML 18: `DE_v150.xsd` — Documento Electrónico — p. 61
- Schema XML 19: `Evento_v150.xsd` — Formato de evento emisor — p. 120
