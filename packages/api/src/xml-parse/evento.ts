import { convert } from 'xmlbuilder2';
import * as v from 'valibot';
import { Err, Ok, type Result } from '../result';
import type { Evento, EventoMetadata } from '../sifen/types/clean';
import {
  directChildren,
  directElementChildren,
  errorMessage,
  localName,
  parseXmlDocument,
  serialize,
  text
} from './dom-utils';
import { XMLParseError } from './errors';
import { parseBig, parseRawDate } from '../xml-gen/mapper/reverse/helpers';

const stringOrNumberSchema = v.union([v.string(), v.number()]);

const cancelacionSchema = v.object({ Id: v.string(), mOtEve: v.string() });
const inutilizacionSchema = v.object({
  dNumTim: stringOrNumberSchema,
  dEst: v.string(),
  dPunExp: v.string(),
  dNumIn: stringOrNumberSchema,
  dNumFin: stringOrNumberSchema,
  iTiDE: stringOrNumberSchema,
  mOtEve: v.string(),
  dSerieNum: v.optional(v.string())
});
const notificacionRecepcionSchema = v.object({
  Id: v.string(),
  dFecEmi: v.string(),
  dFecRecep: v.string(),
  iTipRec: stringOrNumberSchema,
  dNomRec: v.string(),
  dRucRec: v.optional(v.string()),
  dDVRec: v.optional(stringOrNumberSchema),
  dTipIDRec: v.optional(stringOrNumberSchema),
  dNumID: v.optional(v.string()),
  dTotalGs: stringOrNumberSchema
});
const conformidadSchema = v.object({
  Id: v.string(),
  iTipConf: stringOrNumberSchema,
  dFecRecep: v.optional(v.string())
});
const disconformidadSchema = v.object({ Id: v.string(), mOtEve: v.string() });
const desconocimientoSchema = v.object({
  Id: v.string(),
  dFecEmi: v.string(),
  dFecRecep: v.string(),
  iTipRec: stringOrNumberSchema,
  dNomRec: v.string(),
  dRucRec: v.optional(v.string()),
  dDVRec: v.optional(stringOrNumberSchema),
  dTipIDRec: v.optional(stringOrNumberSchema),
  dNumID: v.optional(v.string()),
  mOtEve: v.string()
});
const endosoSchema = v.object({
  Id: v.string(),
  iTipRec: stringOrNumberSchema,
  dNomRec: v.string(),
  dRucRec: v.optional(v.string()),
  dDVRec: v.optional(stringOrNumberSchema),
  dTipIDRec: v.optional(stringOrNumberSchema),
  dNumIDRec: v.optional(v.string()),
  dRucEmi: v.string(),
  dDVEmi: stringOrNumberSchema,
  dNomEmi: v.string(),
  dTipEnd: stringOrNumberSchema,
  iTipFac: stringOrNumberSchema,
  dNomFac: v.string(),
  dRucFac: v.string(),
  dDVFac: stringOrNumberSchema,
  dNumCon: v.optional(v.string()),
  dNumRegPubCon: v.optional(v.string()),
  dTotalGs: stringOrNumberSchema,
  dPorDes: stringOrNumberSchema,
  dMonDesMonExt: v.optional(stringOrNumberSchema),
  dTipCamDesMonExt: v.optional(stringOrNumberSchema),
  dMonDesGs: stringOrNumberSchema,
  dTotOpeEndGs: stringOrNumberSchema
});
const actualizacionTransporteSchema = v.object({
  Id: v.string(),
  dMotEv: stringOrNumberSchema,
  cDepEnt: v.optional(stringOrNumberSchema),
  dDesDepEnt: v.optional(v.string()),
  cDisEnt: v.optional(stringOrNumberSchema),
  dDesDisEnt: v.optional(v.string()),
  cCiuEnt: v.optional(stringOrNumberSchema),
  dDesCiuEnt: v.optional(v.string()),
  dDirEnt: v.optional(v.string()),
  dNumCas: v.optional(stringOrNumberSchema),
  dCompDir1: v.optional(v.string()),
  dNomChof: v.optional(v.string()),
  dNumIDChof: v.optional(v.string()),
  iNatTrans: v.optional(stringOrNumberSchema),
  dRucTrans: v.optional(v.string()),
  dDVTrans: v.optional(stringOrNumberSchema),
  dNomTrans: v.optional(v.string()),
  iTipIDTrans: v.optional(stringOrNumberSchema),
  dDTipIDTrans: v.optional(v.string()),
  dNumIDTrans: v.optional(v.string()),
  iTipTrans: v.optional(stringOrNumberSchema),
  dDesTipTrans: v.optional(v.string()),
  iModTrans: v.optional(stringOrNumberSchema),
  dDesModTrans: v.optional(v.string()),
  dTiVehTras: v.optional(v.string()),
  dMarVeh: v.optional(v.string()),
  dTipIdenVeh: v.optional(stringOrNumberSchema),
  dNroIDVeh: v.optional(v.string()),
  dNroMatVeh: v.optional(v.string())
});
const nominacionSchema = v.object({
  Id: v.string(),
  mOtEve: v.string(),
  iNatRec: stringOrNumberSchema,
  iTiOpe: stringOrNumberSchema,
  cPaisRec: v.string(),
  dDesPaisRe: v.optional(v.string()),
  iTiContRec: v.optional(stringOrNumberSchema),
  dRucRec: v.optional(v.string()),
  dDVRec: v.optional(stringOrNumberSchema),
  iTipIDRec: v.optional(stringOrNumberSchema),
  dDTipIDRec: v.optional(v.string()),
  dNumIDRec: v.optional(v.string()),
  dNomRec: v.string(),
  dNomFanRec: v.optional(v.string()),
  dDirRec: v.optional(v.string()),
  dNumCasRec: v.optional(stringOrNumberSchema),
  cDepRec: v.optional(stringOrNumberSchema),
  dDesDepRec: v.optional(v.string()),
  cDisRec: v.optional(stringOrNumberSchema),
  dDesDisRec: v.optional(v.string()),
  cCiuRec: v.optional(stringOrNumberSchema),
  dDesCiuRec: v.optional(v.string()),
  dTelRec: v.optional(v.string()),
  dCelRec: v.optional(v.string()),
  dEmailRec: v.optional(v.string()),
  dCodCliente: v.optional(v.string())
});
const retencionSchema = v.object({
  Id: v.string(),
  dNumTimRet: stringOrNumberSchema,
  dEstRet: v.string(),
  dPunExpRet: v.string(),
  dNumDocRet: v.string(),
  dCodConRet: v.string(),
  dFeEmiRet: v.string()
});
const anulacionRetencionSchema = v.object({
  Id: v.string(),
  dNumTimRet: stringOrNumberSchema,
  dEstRet: v.string(),
  dPunExpRet: v.string(),
  dNumDocRet: v.string(),
  dCodConRet: v.string(),
  dFeEmiRet: v.string(),
  dFecAnRet: v.string()
});
const transferenciaCreditosSchema = v.object({
  Id: v.string(),
  dNumTraCCFF: v.string(),
  dFeAceTraCCFF: v.string()
});
const devolucionCreditosSchema = v.object({
  Id: v.string(),
  dNumDevSol: v.string(),
  dNumDevInf: v.string(),
  dNumDevRes: v.string(),
  dFeEmiSol: v.string(),
  dFeEmiInf: v.string(),
  dFeEmiRes: v.string()
});
const cdcOnlySchema = v.object({ Id: v.string() });

export function parseEventoXML(xml: string): Result<Evento, XMLParseError> {
  const eventos = parseEventosXML(xml);
  if (!eventos.success) return eventos;

  if (eventos.value.length !== 1) {
    return Err(
      new XMLParseError({
        details: `Se esperaba un evento y se encontraron ${eventos.value.length}.`
      })
    );
  }

  return Ok(eventos.value[0]!);
}

export function parseEventosXML(xml: string): Result<Evento[], XMLParseError> {
  try {
    const doc = parseXmlDocument(xml);
    return Ok(parseEventosElement(doc.documentElement));
  } catch (cause) {
    return Err(new XMLParseError({ details: errorMessage(cause) }));
  }
}

function parseEventosElement(root: Element): Evento[] {
  switch (localName(root)) {
    case 'gGroupGesEve':
      return directChildren(root, 'rGesEve').map(parseRGesEve);
    case 'rGesEve':
      return [parseRGesEve(root)];
    default:
      throw new Error(`Raiz de eventos no reconocida: ${localName(root)}.`);
  }
}

function parseRGesEve(root: Element): Evento {
  const rEves = directChildren(root, 'rEve');
  if (rEves.length !== 1) {
    throw new Error(`rGesEve debe contener un rEve; contiene ${rEves.length}.`);
  }

  return parseREve(rEves[0]!);
}

function parseREve(rEve: Element): Evento {
  const groups = directChildren(rEve, 'gGroupTiEvt');
  if (groups.length !== 1) {
    throw new Error(`rEve debe contener un gGroupTiEvt; contiene ${groups.length}.`);
  }

  const eventTypeNodes = directElementChildren(groups[0]!);
  if (eventTypeNodes.length !== 1) {
    throw new Error(
      `gGroupTiEvt debe contener un tipo de evento; contiene ${eventTypeNodes.length}.`
    );
  }

  const payload = eventTypeNodes[0]!;
  const metadata = parseMetadata(rEve);
  const payloadName = localName(payload);
  const payloadXml = serialize(payload);
  const payloadObject = parsePayloadObject(payloadXml, payloadName);

  return mapPayload(payloadName, payloadObject, metadata, payloadXml);
}

function parseMetadata(rEve: Element): EventoMetadata {
  const idEvento = rEve.getAttribute('Id')?.trim();
  if (!idEvento) throw new Error('rEve no contiene Id de evento.');

  return {
    idEvento,
    fechaFirma: parseDate(requiredText(rEve, 'dFecFirma'), 'dFecFirma'),
    versionFormato: parseNumber(requiredText(rEve, 'dVerFor'), 'dVerFor')
  };
}

function parsePayloadObject(xml: string, rootName: string): unknown {
  const parsed = asRecord(convert(xml, { format: 'object' }));
  return asRecord(parsed[rootName]);
}

function mapPayload(
  payloadName: string,
  payload: unknown,
  metadata: EventoMetadata,
  payloadXml: string
): Evento {
  switch (payloadName) {
    case 'rGeVeCan': {
      const data = parseSchema(cancelacionSchema, payload, payloadName);
      return { ...metadata, tipo: 'cancelacion', cdc: data.Id, motivo: data.mOtEve };
    }
    case 'rGeVeInu': {
      const data = parseSchema(inutilizacionSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'inutilizacion',
        numeroTimbrado: String(data.dNumTim),
        establecimiento: data.dEst,
        puntoExpedicion: data.dPunExp,
        numeroInicio: String(data.dNumIn),
        numeroFin: String(data.dNumFin),
        tipoDE: parseNumber(data.iTiDE, 'iTiDE'),
        motivo: data.mOtEve,
        serie: data.dSerieNum
      };
    }
    case 'rGeVeNotRec': {
      const data = parseSchema(notificacionRecepcionSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'notificacionRecepcion',
        cdc: data.Id,
        fechaEmision: parseDate(data.dFecEmi, 'dFecEmi'),
        fechaRecepcion: parseDate(data.dFecRecep, 'dFecRecep'),
        tipoReceptor: parseNumber(data.iTipRec, 'iTipRec'),
        nombreReceptor: data.dNomRec,
        rucReceptor: data.dRucRec,
        tipoDocumentoReceptor: parseOptionalNumber(data.dTipIDRec, 'dTipIDRec'),
        numeroDocumentoReceptor: data.dNumID,
        totalGuaranies: parseBig(String(data.dTotalGs), 'dTotalGs')
      };
    }
    case 'rGeVeConf': {
      const data = parseSchema(conformidadSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'conformidad',
        cdc: data.Id,
        tipoConformidad: parseNumber(data.iTipConf, 'iTipConf'),
        fechaRecepcion: data.dFecRecep ? parseDate(data.dFecRecep, 'dFecRecep') : undefined
      };
    }
    case 'rGeVeDisconf': {
      const data = parseSchema(disconformidadSchema, payload, payloadName);
      return { ...metadata, tipo: 'disconformidad', cdc: data.Id, motivo: data.mOtEve };
    }
    case 'rGeVeDescon': {
      const data = parseSchema(desconocimientoSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'desconocimiento',
        cdc: data.Id,
        fechaEmision: parseDate(data.dFecEmi, 'dFecEmi'),
        fechaRecepcion: parseDate(data.dFecRecep, 'dFecRecep'),
        tipoReceptor: parseNumber(data.iTipRec, 'iTipRec'),
        nombreReceptor: data.dNomRec,
        rucReceptor: data.dRucRec,
        tipoDocumentoReceptor: parseOptionalNumber(data.dTipIDRec, 'dTipIDRec'),
        numeroDocumentoReceptor: data.dNumID,
        motivo: data.mOtEve
      };
    }
    case 'rGeVeEnd': {
      const data = parseSchema(endosoSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'endoso',
        cdc: data.Id,
        tipoReceptor: parseNumber(data.iTipRec, 'iTipRec'),
        nombreReceptor: data.dNomRec,
        rucReceptor: data.dRucRec,
        tipoDocumentoReceptor: parseOptionalNumber(data.dTipIDRec, 'dTipIDRec'),
        numeroDocumentoReceptor: data.dNumIDRec,
        rucEmisor: data.dRucEmi,
        nombreEmisor: data.dNomEmi,
        tipoEndoso: parseNumber(data.dTipEnd, 'dTipEnd'),
        tipoFactor: parseNumber(data.iTipFac, 'iTipFac'),
        nombreFactor: data.dNomFac,
        rucFactor: data.dRucFac,
        numeroContrato: data.dNumCon,
        numeroRegistroPublicoContrato: data.dNumRegPubCon,
        totalGuaranies: parseBig(String(data.dTotalGs), 'dTotalGs'),
        porcentajeDescuento: parseBig(String(data.dPorDes), 'dPorDes'),
        montoDescuentoMonedaExtranjera: parseOptionalBig(data.dMonDesMonExt, 'dMonDesMonExt'),
        tipoCambioDescuentoMonedaExtranjera: parseOptionalBig(
          data.dTipCamDesMonExt,
          'dTipCamDesMonExt'
        ),
        montoDescuentoGuaranies: parseBig(String(data.dMonDesGs), 'dMonDesGs'),
        totalOperacionEndosoGuaranies: parseBig(String(data.dTotOpeEndGs), 'dTotOpeEndGs')
      };
    }
    case 'rGeVeTr': {
      const data = parseSchema(actualizacionTransporteSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'actualizacionTransporte',
        cdc: data.Id,
        motivo: parseNumber(data.dMotEv, 'dMotEv'),
        codigoDepartamentoEntrega: parseOptionalNumber(data.cDepEnt, 'cDepEnt'),
        codigoDistritoEntrega: parseOptionalNumber(data.cDisEnt, 'cDisEnt'),
        codigoCiudadEntrega: parseOptionalNumber(data.cCiuEnt, 'cCiuEnt'),
        direccionEntrega: data.dDirEnt,
        numeroCasaEntrega: data.dNumCas !== undefined ? String(data.dNumCas) : undefined,
        complementoDireccionEntrega: data.dCompDir1,
        nombreChofer: data.dNomChof,
        numeroDocumentoChofer: data.dNumIDChof,
        naturalezaTransportista: parseOptionalNumber(data.iNatTrans, 'iNatTrans'),
        rucTransportista: data.dRucTrans,
        nombreTransportista: data.dNomTrans,
        tipoDocumentoTransportista: parseOptionalNumber(data.iTipIDTrans, 'iTipIDTrans'),
        numeroDocumentoTransportista: data.dNumIDTrans,
        tipoTransporte: parseOptionalNumber(data.iTipTrans, 'iTipTrans'),
        modalidadTransporte: parseOptionalNumber(data.iModTrans, 'iModTrans'),
        tipoVehiculo: data.dTiVehTras,
        marcaVehiculo: data.dMarVeh,
        tipoIdentificacionVehiculo: parseOptionalNumber(data.dTipIdenVeh, 'dTipIdenVeh'),
        numeroIdentificacionVehiculo: data.dNroIDVeh,
        matriculaVehiculo: data.dNroMatVeh
      };
    }
    case 'rGEveNom': {
      const data = parseSchema(nominacionSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'nominacionFacturaElectronica',
        cdc: data.Id,
        motivo: data.mOtEve,
        naturalezaReceptor: parseNumber(data.iNatRec, 'iNatRec'),
        tipoOperacion: parseNumber(data.iTiOpe, 'iTiOpe'),
        codigoPaisReceptor: data.cPaisRec,
        tipoContribuyenteReceptor: parseOptionalNumber(data.iTiContRec, 'iTiContRec'),
        rucReceptor: data.dRucRec,
        tipoDocumentoReceptor: parseOptionalNumber(data.iTipIDRec, 'iTipIDRec'),
        numeroDocumentoReceptor: data.dNumIDRec,
        nombreReceptor: data.dNomRec,
        nombreFantasiaReceptor: data.dNomFanRec,
        direccionReceptor: data.dDirRec,
        numeroCasaReceptor: data.dNumCasRec !== undefined ? String(data.dNumCasRec) : undefined,
        codigoDepartamentoReceptor: parseOptionalNumber(data.cDepRec, 'cDepRec'),
        codigoDistritoReceptor: parseOptionalNumber(data.cDisRec, 'cDisRec'),
        codigoCiudadReceptor: parseOptionalNumber(data.cCiuRec, 'cCiuRec'),
        telefonoReceptor: data.dTelRec,
        celularReceptor: data.dCelRec,
        emailReceptor: data.dEmailRec,
        codigoCliente: data.dCodCliente
      };
    }
    case 'rGeVeRetAce': {
      const data = parseSchema(retencionSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'asociacionRetencion',
        cdc: data.Id,
        numeroTimbradoRetencion: String(data.dNumTimRet),
        establecimientoRetencion: data.dEstRet,
        puntoExpedicionRetencion: data.dPunExpRet,
        numeroDocumentoRetencion: data.dNumDocRet,
        codigoConceptoRetencion: data.dCodConRet,
        fechaEmisionRetencion: parseDate(data.dFeEmiRet, 'dFeEmiRet')
      };
    }
    case 'rGeVeRetAnu': {
      const data = parseSchema(anulacionRetencionSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'anulacionRetencion',
        cdc: data.Id,
        numeroTimbradoRetencion: String(data.dNumTimRet),
        establecimientoRetencion: data.dEstRet,
        puntoExpedicionRetencion: data.dPunExpRet,
        numeroDocumentoRetencion: data.dNumDocRet,
        codigoConceptoRetencion: data.dCodConRet,
        fechaEmisionRetencion: parseDate(data.dFeEmiRet, 'dFeEmiRet'),
        fechaAnulacionRetencion: parseDate(data.dFecAnRet, 'dFecAnRet')
      };
    }
    case 'rGeVeCCFF': {
      const data = parseSchema(transferenciaCreditosSchema, payload, payloadName);
      return {
        ...metadata,
        tipo: 'transferenciaCreditosFiscales',
        cdc: data.Id,
        numeroTransferenciaCreditosFiscales: data.dNumTraCCFF,
        fechaAceptacionTransferenciaCreditosFiscales: parseDate(data.dFeAceTraCCFF, 'dFeAceTraCCFF')
      };
    }
    case 'rGeDevCCFFCue':
      return mapDevolucionCreditos(
        payload,
        payloadName,
        metadata,
        'devolucionCreditosFiscalesCuestionado'
      );
    case 'rGeDevCCFFDev':
      return mapDevolucionCreditos(
        payload,
        payloadName,
        metadata,
        'devolucionCreditosFiscalesDevuelto'
      );
    case 'rGeVeAnt': {
      const data = parseSchema(cdcOnlySchema, payload, payloadName);
      return { ...metadata, tipo: 'anticipo', cdc: data.Id };
    }
    case 'rGeVeRem': {
      const data = parseSchema(cdcOnlySchema, payload, payloadName);
      return { ...metadata, tipo: 'remision', cdc: data.Id };
    }
    default:
      return { ...metadata, tipo: 'desconocido', tipoXml: payloadName, payloadXml };
  }
}

function mapDevolucionCreditos(
  payload: unknown,
  payloadName: string,
  metadata: EventoMetadata,
  tipo: 'devolucionCreditosFiscalesCuestionado' | 'devolucionCreditosFiscalesDevuelto'
): Evento {
  const data = parseSchema(devolucionCreditosSchema, payload, payloadName);
  return {
    ...metadata,
    tipo,
    cdc: data.Id,
    numeroSolicitudDevolucion: data.dNumDevSol,
    numeroInformeDevolucion: data.dNumDevInf,
    numeroResolucionDevolucion: data.dNumDevRes,
    fechaEmisionSolicitud: parseDate(data.dFeEmiSol, 'dFeEmiSol'),
    fechaEmisionInforme: parseDate(data.dFeEmiInf, 'dFeEmiInf'),
    fechaEmisionResolucion: parseDate(data.dFeEmiRes, 'dFeEmiRes')
  };
}

function parseSchema<TSchema extends v.GenericSchema>(
  schema: TSchema,
  payload: unknown,
  payloadName: string
): v.InferOutput<TSchema> {
  const parsed = v.safeParse(schema, payload);
  if (!parsed.success) {
    throw new Error(`Payload ${payloadName} invalido: ${v.summarize(parsed.issues)}`);
  }

  return parsed.output;
}

function requiredText(root: Element, childName: string): string {
  const value = text(root, childName);
  if (value === undefined) throw new Error(`Campo requerido ausente: ${childName}.`);
  return value;
}

function parseNumber(value: string | number, field: string): number {
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numberValue)) {
    throw new Error(`Valor numerico invalido para ${field}: ${value}`);
  }

  return numberValue;
}

function parseOptionalNumber(
  value: string | number | undefined,
  field: string
): number | undefined {
  return value !== undefined ? parseNumber(value, field) : undefined;
}

function parseOptionalBig(value: string | number | undefined, field: string) {
  return value !== undefined ? parseBig(String(value), field) : undefined;
}

function parseDate(value: string, field: string): Date {
  return parseRawDate(value, 'date-time', field);
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('El XML no contiene un objeto de evento valido.');
  }

  return value as Record<string, unknown>;
}
