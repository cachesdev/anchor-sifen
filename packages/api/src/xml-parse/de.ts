import { convert } from 'xmlbuilder2';
import type { DocumentoElectronico } from '../sifen/types/raw';
import type { DocumentoElectronicoC } from '../sifen/types/clean';
import { Err, Ok, type Result } from '../result';
import { mapDocumentoElectronicoToClean } from '../xml-gen/mapper/reverse';
import { XMLParseError } from './errors';

const ARRAY_PATHS = new Set([
  'rDE.DE.gDatGralOpe.gOpeCom.gOblAfe',
  'rDE.DE.gDatGralOpe.gEmis.gActEco',
  'rDE.DE.gDtipDE.gCamCond.gPaConEIni',
  'rDE.DE.gDtipDE.gCamCond.gPagCred.gCuotas',
  'rDE.DE.gDtipDE.gCamItem',
  'rDE.DE.gDtipDE.gCamEsp.gGrupSeg.gGrupPolSeg',
  'rDE.DE.gDtipDE.gCamEsp.gGrupAdi.dVencPag',
  'rDE.DE.gDtipDE.gTransp.gCamEnt',
  'rDE.DE.gDtipDE.gTransp.gVehTras'
]);

// Mantener estas rutas explicitas: SIFEN no usa nombres de campo confiables como tipos.
const NUMBER_PATHS = new Set([
  'rDE.dVerFor',
  'rDE.DE.dDVId',
  'rDE.DE.dSisFact',
  'rDE.DE.gOpeDE.iTipEmi',
  'rDE.DE.gTimb.iTiDE',
  'rDE.DE.gTimb.dNumTim',
  'rDE.DE.gDatGralOpe.gOpeCom.iTipTra',
  'rDE.DE.gDatGralOpe.gOpeCom.iTImp',
  'rDE.DE.gDatGralOpe.gOpeCom.dCondTiCam',
  'rDE.DE.gDatGralOpe.gOpeCom.iCondAnt',
  'rDE.DE.gDatGralOpe.gOpeCom.gOblAfe[].cOblAfe',
  'rDE.DE.gDatGralOpe.gEmis.dDVEmi',
  'rDE.DE.gDatGralOpe.gEmis.iTipCont',
  'rDE.DE.gDatGralOpe.gEmis.cTipReg',
  'rDE.DE.gDatGralOpe.gEmis.dNumCas',
  'rDE.DE.gDatGralOpe.gEmis.cDepEmi',
  'rDE.DE.gDatGralOpe.gEmis.cDisEmi',
  'rDE.DE.gDatGralOpe.gEmis.cCiuEmi',
  'rDE.DE.gDatGralOpe.gEmis.gRespDE.iTipIDRespDE',
  'rDE.DE.gDatGralOpe.gDatRec.iNatRec',
  'rDE.DE.gDatGralOpe.gDatRec.iTiOpe',
  'rDE.DE.gDatGralOpe.gDatRec.iTiContRec',
  'rDE.DE.gDatGralOpe.gDatRec.dDVRec',
  'rDE.DE.gDatGralOpe.gDatRec.iTipIDRec',
  'rDE.DE.gDatGralOpe.gDatRec.dNumCasRec',
  'rDE.DE.gDatGralOpe.gDatRec.dDepRec',
  'rDE.DE.gDatGralOpe.gDatRec.dDisRec',
  'rDE.DE.gDatGralOpe.gDatRec.cCiuRec',
  'rDE.DE.gDtipDE.gCamFE.iIndPres',
  'rDE.DE.gDtipDE.gCamFE.gCompPub.dEntCont',
  'rDE.DE.gDtipDE.gCamFE.gCompPub.dAnoCont',
  'rDE.DE.gDtipDE.gCamFE.gCompPub.dSecCont',
  'rDE.DE.gDtipDE.gCamAE.iNatVen',
  'rDE.DE.gDtipDE.gCamAE.iTipIDVen',
  'rDE.DE.gDtipDE.gCamAE.dNumCasVen',
  'rDE.DE.gDtipDE.gCamAE.cDepVen',
  'rDE.DE.gDtipDE.gCamAE.cDisVen',
  'rDE.DE.gDtipDE.gCamAE.cCiuVen',
  'rDE.DE.gDtipDE.gCamAE.cDepProv',
  'rDE.DE.gDtipDE.gCamAE.cDisProv',
  'rDE.DE.gDtipDE.gCamAE.cCiuProv',
  'rDE.DE.gDtipDE.gCamNCDE.iMotEmi',
  'rDE.DE.gDtipDE.gCamNRE.iMotEmiNR',
  'rDE.DE.gDtipDE.gCamNRE.iRespEmiNR',
  'rDE.DE.gDtipDE.gCamNRE.dKmR',
  'rDE.DE.gDtipDE.gCamNRE.cPreFle',
  'rDE.DE.gDtipDE.gCamCond.iCondOpe',
  'rDE.DE.gDtipDE.gCamCond.gPaConEIni[].iTiPago',
  'rDE.DE.gDtipDE.gCamCond.gPaConEIni[].gPagTarCD.iDenTarj',
  'rDE.DE.gDtipDE.gCamCond.gPaConEIni[].gPagTarCD.dDVProTar',
  'rDE.DE.gDtipDE.gCamCond.gPaConEIni[].gPagTarCD.iForProPa',
  'rDE.DE.gDtipDE.gCamCond.gPagCred.iCondCred',
  'rDE.DE.gDtipDE.gCamCond.gPagCred.dCuotas',
  'rDE.DE.gDtipDE.gCamItem[].dParAranc',
  'rDE.DE.gDtipDE.gCamItem[].dNCM',
  'rDE.DE.gDtipDE.gCamItem[].dGtin',
  'rDE.DE.gDtipDE.gCamItem[].dGtinPq',
  'rDE.DE.gDtipDE.gCamItem[].cUniMed',
  'rDE.DE.gDtipDE.gCamItem[].cRelMerc',
  'rDE.DE.gDtipDE.gCamItem[].gCamIVA.iAfecIVA',
  'rDE.DE.gDtipDE.gCamItem[].gCamIVA.dTasaIVA',
  'rDE.DE.gDtipDE.gCamItem[].gVehNuevo.iTipOpVN',
  'rDE.DE.gDtipDE.gCamItem[].gVehNuevo.dPotencia',
  'rDE.DE.gDtipDE.gCamItem[].gVehNuevo.dCapMot',
  'rDE.DE.gDtipDE.gCamItem[].gVehNuevo.iTipCom',
  'rDE.DE.gDtipDE.gCamItem[].gVehNuevo.dAnoFab',
  'rDE.DE.gDtipDE.gCamItem[].gVehNuevo.dCapac',
  'rDE.DE.gDtipDE.gCamEsp.gGrupEner.dActiv',
  'rDE.DE.gDtipDE.gCamEsp.gGrupAdi.dCodConDncp',
  'rDE.DE.gDtipDE.gTransp.iTipTrans',
  'rDE.DE.gDtipDE.gTransp.iModTrans',
  'rDE.DE.gDtipDE.gTransp.iRespFlete',
  'rDE.DE.gDtipDE.gTransp.gCamSal.dNumCasSal',
  'rDE.DE.gDtipDE.gTransp.gCamSal.cDepSal',
  'rDE.DE.gDtipDE.gTransp.gCamSal.cDisSal',
  'rDE.DE.gDtipDE.gTransp.gCamSal.cCiuSal',
  'rDE.DE.gDtipDE.gTransp.gCamEnt[].dNumCasEnt',
  'rDE.DE.gDtipDE.gTransp.gCamEnt[].cDepEnt',
  'rDE.DE.gDtipDE.gTransp.gCamEnt[].cDisEnt',
  'rDE.DE.gDtipDE.gTransp.gCamEnt[].cCiuEnt',
  'rDE.DE.gDtipDE.gTransp.gVehTras[].dTipIdenVeh',
  'rDE.DE.gDtipDE.gTransp.gCamTrans.iNatTrans',
  'rDE.DE.gDtipDE.gTransp.gCamTrans.dDVTrans',
  'rDE.DE.gDtipDE.gTransp.gCamTrans.iTipIDTrans',
  'rDE.DE.gCamGen.gCamCarg.cUniMedTotVol',
  'rDE.DE.gCamGen.gCamCarg.dTotVolMerc',
  'rDE.DE.gCamGen.gCamCarg.cUniMedTotPes',
  'rDE.DE.gCamGen.gCamCarg.dTotPesMerc',
  'rDE.DE.gCamGen.gCamCarg.iCarCarga',
  'rDE.DE.gCamDEAsoc.iTipDocAso',
  'rDE.DE.gCamDEAsoc.dNTimDI',
  'rDE.DE.gCamDEAsoc.iTipoDocAso',
  'rDE.DE.gCamDEAsoc.iTipCons',
  'rDE.DE.gCamDEAsoc.dNumCons'
]);

export function parseDEXML(xml: string): Result<DocumentoElectronico, XMLParseError> {
  try {
    const parsed = convert(xml, { format: 'object' });
    const root = asRecord(parsed).rDE;
    const rDE = asRecord(root);
    asRecord(rDE.DE);

    return Ok({
      rDE: {
        dVerFor: normalizeValue(rDE.dVerFor, 'rDE.dVerFor') as 150,
        DE: normalizeValue(rDE.DE, 'rDE.DE') as DocumentoElectronico['rDE']['DE']
      }
    });
  } catch (cause) {
    return Err(new XMLParseError({ details: errorMessage(cause) }));
  }
}

export function parseDEXMLToClean(xml: string): Result<DocumentoElectronicoC, XMLParseError> {
  const raw = parseDEXML(xml);
  if (!raw.success) return raw;

  try {
    return Ok(mapDocumentoElectronicoToClean(raw.value));
  } catch (cause) {
    return Err(new XMLParseError({ details: errorMessage(cause) }));
  }
}

function normalizeValue(value: unknown, path: string): unknown {
  if (ARRAY_PATHS.has(path)) {
    return ensureArray(value).map((item) => normalizeValue(item, `${path}[]`));
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeValue(item, `${path}[]`));
  }

  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !key.startsWith('@'))
        .map(([key, child]) => [key, normalizeValue(child, `${path}.${key}`)])
    );
  }

  if (NUMBER_PATHS.has(path)) {
    return parseNumber(value, path);
  }

  return value;
}

function ensureArray(value: unknown): unknown[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function parseNumber(value: unknown, path: string): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string' || value === '') {
    throw new Error(`Valor numerico invalido para ${path}`);
  }

  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    throw new Error(`Valor numerico invalido para ${path}: ${value}`);
  }

  return numberValue;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error('El XML no contiene un documento rDE valido.');
  }

  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
