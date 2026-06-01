import type { DocumentoElectronicoAsociado } from '../../../sifen/types/clean/h';
import type { GCamDEAsoc } from '../../../sifen/types/raw/h';
import { parseOptionalRawDate } from './helpers';

export function mapGCamDEAsocToClean(data: GCamDEAsoc): DocumentoElectronicoAsociado {
  return {
    tipoDocumentoAsociado: data.iTipDocAso,
    cdcDocumentoReferenciado: data.dCdCDERef,
    numeroTimbradoDocumentoImpreso: data.dNTimDI,
    establecimiento: data.dEstDocAso,
    puntoExpedicion: data.dPExpDocAso,
    numeroDocumento: data.dNumDocAso,
    tipoDocumentoImpreso: data.iTipoDocAso,
    fechaEmisionDocumentoImpreso: parseOptionalRawDate(data.dFecEmiDI, 'date', 'dFecEmiDI'),
    numeroComprobanteRetencion: data.dNumComRet,
    numeroResolucionCreditoFiscal: data.dNumResCF,
    tipoConstancia: data.iTipCons,
    numeroConstancia: data.dNumCons,
    numeroControlConstancia: data.dNumControl,
    rucFusionado: data.dRucFus
  };
}
