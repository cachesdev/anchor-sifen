# @anchor-sifen/api

Cliente TypeScript para SIFEN. Genera, firma, envia y consulta Documentos Electronicos (DE) con el fisco.

## Requisitos

- Node.js >=22
- Certificado PKCS12 emitido por una CA reconocida por SIFEN
- Credenciales CSC

## Instalacion

```bash
npm install @anchor-sifen/api
```

## Configuracion

```ts
import {
  SifenAPI,
  createFilePKCS12Source,
  createBufferPKCS12Source,
  createDummyPKCS12Source
} from '@anchor-sifen/api';

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
} from '@anchor-sifen/api';

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

## Operaciones disponibles

| Metodo | Servicio SIFEN | Descripcion |
|--------|----------------|-------------|
| `recibe()` | `siRecepDE` | Envio sincronico de un solo DE |
| `recibeLote()` | `siRecepLoteDE` | Envio asincronico de lote de DE |
| `consultaDE()` | `siConsDE` | Consulta un DE por CDC |
| `consultaLote()` | `siResultLoteDE` | Consulta resultado de lote por numero |
| `consultaRUC()` | `siConsRUC` | Consulta datos del contribuyente por RUC |
| `enviarEvento()` | `siRecepEvento` | Envia eventos |

## Tipos de DE implementados

| Codigo | Documento | Estado |
|--------|-----------|--------|
| 1 | Factura Electronica (FE) | Implementado |
| 4 | Autofactura Electronica (AFE) | Implementado |

### Patron de errores

Todas las operaciones usan un result type, evitando asi excepciones.

Los errores SIFEN vienen tipados con `SifenError`:

```ts
class SifenError extends Error {
  sifenCodigo?: string;   // Codigo del error (ej. "0015")
  sifenMessage?: string;  // Mensaje descriptivo
  details?: string;       // Detalles adicionales
  rawObject?: unknown;    // Objeto raw parseado de la respuesta XML
}
```

## Licencia

MIT
