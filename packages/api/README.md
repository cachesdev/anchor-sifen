# @anchorsoft/sifen

Cliente TypeScript para SIFEN. Genera, firma, envia y consulta Documentos Electronicos (DE).

> [!WARNING]
> **NO USAR EN PRODUCCION**
>
> Este paquete se encuentra en etapa experimental. Todavia no fue probado en produccion. **no uses el paquete para facturacion, ya que no esta 100% testeado y podria generar numeros incorrectos.**
> La libreria estara sujeta a cambios con incompatibilidades hasta la version 1.0.0, la cual solo sera lanzada una vez que se hayan implementado y testeado los tipos de DE y se haya estabilizado la API.

## Razonamiento

La razon por la que esta libreria existe es por que las otras soluciones simplemente dejan mucho que desear, especialmente en area del tipado y validacion.

SIFEN es un sistema complejo, con reglas de negocio estrictas y una documentacion oficial arcaica que no es precisamente amigable para los desarrolladores. Sin embargo, el DE es un documento legal, y cualquier error en su generacion puede tener consecuencias graves.

los objetivos principales son estos:

- Tener una API completamente tipada
- Ser capaz de validar el DE localmente, sin disparar contra SIFEN
- Evitar el uso de numeros flotantes para representar dinero, lo cual todas las otras librerias hacen
- Transformar la documentacion de SIFEN a una mas amigable para desarrolladores y herramientas de IA

Con estos 3 puntos, se reduce la cantidad de error humano dramaticamente, y el tiempo de desarrollo se acorta significativamente.

La libreria tiene las siguientes caracteristicas principales:

- **Tipos por tipo de DE.** Cada Documento Electronico tiene su propio builder tipado.
- **Esquema XML completo tipado.** Todos los campos del XML de SIFEN estan modelados como tipos TypeScript, tanto en su forma original segun el manual como su forma "legible".
- **Mappers tipados.** La transformacion entre la representacion limpia y el XML esta completamente tipada, sin sorpresas.
- **Validacion del lado del cliente** _(pendiente)_. La API oficial de SIFEN solo valida en el servidor. Esta libreria incluye un motor de validacion que se ejecuta localmente y inenta reproducir las mismas validaciones que SIFEN, para detectar errores antes de enviar el DE.
- **Multiples fuentes de certificado.** Se puede cargar el certificado desde archivo `.p12`, desde un `Buffer`, o implementar tu propio adaptador.
- **Todo el dinero esta manejado con big.js**, evita los errores de precision.
- **Documentacion en Markdown para LLMs.** La documentacion oficial de SIFEN viene en PDFs, dificiles de consumir por herramientas de IA. En `docs/` se encuentra la documentacion relevante en `.md`.

## Requisitos

- Node.js >=22
- Certificado PKCS12 emitido por una CA reconocida por SIFEN
- Credenciales CSC

## Instalacion

```bash
npm install @anchorsoft/sifen
```

## Uso Basico

```ts
import {
  SifenAPI,
  createFilePKCS12Source,
  createBufferPKCS12Source,
  createDummyPKCS12Source
} from '@anchorsoft/sifen';

// Desde archivo .p12 en disco
const certSource = createFilePKCS12Source('/ruta/cert.p12', 'password');

// Desde un Buffer (ej. variable de entorno)
const certSource = createBufferPKCS12Source(
  Buffer.from(process.env.P12_BASE64, 'base64'),
  process.env.P12_PASSWORD
);

// Certificado autofirmado
const certSource = createDummyPKCS12Source();

const api = new SifenAPI({
  environment: 'test',
  certificateSource: certSource,
  idCSC: '1',
  csc: 'ABCD0000000000000000000000000000'
});
```

## Uso basico

### Emitir una Factura Electronica (FE)

```ts
import {
  SifenAPI,
  buildFacturaElectronica,
  generateDEXML,
  generateCDC,
  createFilePKCS12Source,
  tipoEmision,
  tipoImpuestoAfectado,
  tipoContribuyente,
  naturalezaReceptor,
  tipoOperacion,
  tipoContribuyenteReceptor,
  indicadorPresencia,
  condicionOperacionEnum,
  unidadMedida,
  formaAfectacionTributariaIVA,
  codigoPais,
  codigoMoneda,
  codigoDepartamento,
  codigoCiudad
} from '@anchorsoft/sifen';

const api = new SifenAPI({
  environment: 'test',
  certificateSource: createFilePKCS12Source('/ruta/cert.p12', 'password'),
  idCSC: '1',
  csc: 'ABCD0000000000000000000000000000'
});

// 1. Construir el DE
const prepared = buildFacturaElectronica({
  id_cdc: generateCDC({
    tipoDocumento: 1,
    rucEmisor: '80012345',
    dvEmisor: 1,
    establecimiento: '001',
    puntoExpedicion: '001',
    numeroDocumento: '0014528',
    tipoContribuyente: tipoContribuyente.PersonaJuridica,
    fechaEmision: new Date('2025-01-17T12:00:00-03:00'),
    tipoEmision: tipoEmision.Normal
  }),
  operacionDE: {
    tipoEmision: tipoEmision.Normal
  },
  timbrado: {
    numeroTimbrado: 14444440,
    establecimiento: 1,
    puntoExpedicion: 1,
    numeroDocumento: 10014528,
    fechaInicioVigencia: new Date('2024-12-01')
  },
  datosGeneralesOperacion: {
    fechaEmisionDE: new Date('2025-01-17T12:00:00-03:00'),
    operacionComercial: {
      tipoImpuestoAfectado: tipoImpuestoAfectado.IVA,
      monedaOperacion: codigoMoneda.PYG
    },
    emisor: {
      rucEmisor: '80012345-1',
      tipoContribuyente: tipoContribuyente.PersonaJuridica,
      nombreEmisor: 'Empresa S.A.',
      direccionEmision: 'Av. Espana 1234',
      numeroCasa: 1234,
      departamentoEmision: codigoDepartamento.Central,
      ciudadEmision: codigoCiudad.AsuncionDistrito,
      telefonoEmision: '021123456',
      correoElectronicoEmisor: 'facturas@empresa.com.py',
      actividadesEconomicas: [
        {
          codigoActividadEconomica: '62010',
          descripcionActividadEconomica: 'Desarrollo de software'
        }
      ]
    },
    receptor: {
      naturalezaReceptor: naturalezaReceptor.Contribuyente,
      tipoOperacion: tipoOperacion.B2B,
      paisReceptor: codigoPais.Paraguay,
      tipoContribuyenteReceptor: tipoContribuyenteReceptor.PersonaJuridica,
      rucReceptor: '12345678-0',
      nombreReceptor: 'Cliente SRL'
    }
  },
  datosEspecificosPorTipoDE: {
    facturaElectronica: {
      indicadorPresencia: indicadorPresencia.OperacionPresencial
    },
    condicionOperacion: {
      condicionOperacion: condicionOperacionEnum.Contado
    },
    itemsOperacion: [
      {
        codigoInterno: 'PROD-001',
        descripcionProductoServicio: 'Servicio de consultoria',
        unidadMedida: unidadMedida.Unidad,
        cantidadProductoServicio: 1,
        valorItem: {
          precioUnitario: 500000,
          valorRestaItem: {
            descuentoParticularItem: 0,
            anticipoParticularItem: 0,
            anticipoGlobalItem: 0
          }
        },
        ivaItem: {
          formaAfectacionTributariaIVA: formaAfectacionTributariaIVA.Gravado,
          proporcionGravadaIva: 0,
          tasaIva: 10
        }
      }
    ]
  },
  subtotalesTotales: {
    // Solo se provee comision y porcentaje de descuento global en caso de ser necesario.
    // Los subtotales y liquidaciones se calculan automaticamente desde los items.
  }
});

if (!prepared.success) {
  console.error('Error de validacion:', prepared.error);
  return;
}

// 2. Generar XML
const xml = generateDEXML(prepared.value);

// 3. Firmar
const signed = await api.signXML(xml);
if (!signed.success) {
  console.error('Error de firma:', signed.error);
  return;
}

// 4. Adjuntar QR
const withQR = api.attachQR(signed.value);
if (!withQR.success) {
  console.error('Error al generar QR:', withQR.error);
  return;
}

// 5. Enviar a SIFEN
const result = await api.recibe({
  digitoControl: '0',
  xmlDE: withQR.value
});

if (result.success) {
  console.log('Aprobado. CDC:', result.value.cdc);
  console.log('Nro. transaccion:', result.value.numeroTransaccion);
} else {
  console.error('Error SIFEN:', result.error.sifenCodigo, result.error.sifenMessage);
}
```

### Emitir lote de DE

```ts
const batchResult = await api.recibeLote({
  digitoControl: '0',
  DE: [xmlFirmado1, xmlFirmado2, xmlFirmado3]
});

if (!batchResult.success) {
  console.error('Error al enviar lote:', batchResult.error.sifenMessage);
  return;
}

console.log('Lote Nro:', batchResult.value.numeroLote);

// Consultar resultado del lote
const status = await api.consultaLote({
  digitoControl: '0',
  numeroLote: batchResult.value.numeroLote
});

if (status.success) {
  console.log('Estado del lote:', status.value.mensajeResultado);
}
```

### Consultar RUC, DE

```ts
const rucResult = await api.consultaRUC({ digitoControl: '0', ruc: '80012345-1' });
if (rucResult.success) {
  console.log('Razon social:', rucResult.value.contenedorRuc?.razonSocial);
}

const deResult = await api.consultaDE({
  digitoControl: '0',
  cdc: '0123456700100100100145282250117100123456789012'
});
if (deResult.success) {
  console.log('Mensaje:', deResult.value.mensajeResultado);
}
```

## Tipos de DE implementados

- Factura Electronica (FE)
- Autofactura Electronica (AFE)

### Patron de errores

Todas las operaciones usan un result type, evitando asi excepciones.

Los errores SIFEN vienen tipados con `SifenError`:

```ts
class SifenError extends Error {
  sifenCodigo?: string; // Codigo del error
  sifenMessage?: string; // Mensaje descriptivo
  details?: string; // Detalles adicionales
  rawObject?: unknown; // Objeto raw parseado de la respuesta XML
}
```

## Disclaimer IA

Esta libreria fue desarrollada con ayuda de multiples arneses de IA, **esto no significa que la libreria fue vibecodeada**. El codigo generado por IA fue revisado, testeado y corregido manualmente, siguiendo extrictamente la documentacion oficial de SIFEN y sus notas tecnicas.

## Licencia

[`**BUSL-1.1** (Business Source License 1.1)`](./LICENSE).

Informacion adicional sobre la licencia:

- **No se puede usar esta libreria en produccion ni con fines comerciales**, Esto es temporal para evitar competencia con Anchor Software, se agregaran clausulas a la BUSL para versiones futuras que aceptan el uso comercial interno y de venta de sistemas, pero bloqueando su uso para SaaS.
- Se puede leer el codigo, modificarlo, redistribuirlo y usarlo para educacion o investigacion.
- Cada version se convierte automaticamente en **MIT** al cumplir 4 años desde su publicacion.

Para licencias comerciales SaaS, contactar al autor.
