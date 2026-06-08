import {
  SifenAPI,
  buildFacturaElectronica,
  generateDEXML,
  generateCDC,
  createDummyPKCS12Source,
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
} from './index';

// helpers

function makeCDC() {
  return generateCDC({
    tipoDocumento: 1,
    rucEmisor: '80012345',
    dvEmisor: 1,
    establecimiento: '001',
    puntoExpedicion: '001',
    numeroDocumento: '0014528',
    tipoContribuyente: tipoContribuyente.PersonaJuridica,
    fechaEmision: new Date('2025-01-17T12:00:00-03:00'),
    tipoEmision: tipoEmision.Normal
  });
}

// emitir una Factura Electronica

export async function emitirFacturaElectronica() {
  const api = new SifenAPI({
    environment: 'test',
    certificateSource: createDummyPKCS12Source(),
    idCSC: '1',
    csc: 'ABCD0000000000000000000000000000'
  });

  const prepared = buildFacturaElectronica({
    id_cdc: makeCDC(),
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
    subtotalesTotales: {}
  });

  if (!prepared.success) return prepared.error;

  const xml = generateDEXML(prepared.value);

  const signed = await api.signXML(xml);
  if (!signed.success) return signed.error;

  const withQR = api.attachQR(signed.value);
  if (!withQR.success) return withQR.error;

  const result = await api.recibe({ digitoControl: '0', xmlDE: withQR.value });
  if (!result.success) return result.error;

  return result.value;
}

// emitir lote de DE

export async function emitirLote(xmls: string[]) {
  const api = new SifenAPI({
    environment: 'test',
    certificateSource: createDummyPKCS12Source(),
    idCSC: '1',
    csc: 'ABCD0000000000000000000000000000'
  });

  const batchResult = await api.recibeLote({ digitoControl: '0', DE: xmls });
  if (!batchResult.success) return batchResult.error;

  const status = await api.consultaLote({
    digitoControl: '0',
    numeroLote: batchResult.value.numeroLote!
  });
  if (!status.success) return status.error;

  return status.value;
}

// consultas

export async function consultarRUC() {
  const api = new SifenAPI({
    environment: 'test',
    certificateSource: createDummyPKCS12Source(),
    idCSC: '1',
    csc: 'ABCD0000000000000000000000000000'
  });

  const result = await api.consultaRUC({ digitoControl: '0', ruc: '80012345-1' });
  if (!result.success) return result.error;
  return result.value.contenedorRuc?.razonSocial;
}

export async function consultarDE(cdc: string) {
  const api = new SifenAPI({
    environment: 'test',
    certificateSource: createDummyPKCS12Source(),
    idCSC: '1',
    csc: 'ABCD0000000000000000000000000000'
  });

  const result = await api.consultaDE({ digitoControl: '0', cdc });
  if (!result.success) return result.error;
  return result.value.protocoloAutorizacionXml;
}

export async function enviarEvento(cdc: string) {
  const api = new SifenAPI({
    environment: 'test',
    certificateSource: createDummyPKCS12Source(),
    idCSC: '1',
    csc: 'ABCD0000000000000000000000000000'
  });

  const result = await api.enviarEvento({
    digitoControl: '0',
    evento: {
      tipo: 'cancelacion',
      idEvento: '1',
      cdc,
      motivo: 'Error en datos'
    }
  });
  if (!result.success) return result.error;
  return result.value.idEvento;
}
