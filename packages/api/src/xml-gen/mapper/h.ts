import type { DocumentoElectronicoAsociado } from '../../sifen/types/clean/h';
import {
  descripcionTipoConstancia,
  descripcionTipoDocumentoAsociado,
  descripcionTipoDocumentoImpreso
} from '../../sifen/types/enums';
import type { GCamDEAsoc } from '../../sifen/types/raw/h';
import { formatDateOnly, resolveOptionalDescription, resolveRequiredDescription } from './helpers';

export function mapDocumentoElectronicoAsociadoToRaw(
  data: DocumentoElectronicoAsociado
): GCamDEAsoc {
  return {
    iTipDocAso: data.tipoDocumentoAsociado,
    dDesTipDocAso: resolveRequiredDescription(
      'tipoDocumentoAsociado',
      data.tipoDocumentoAsociado,
      descripcionTipoDocumentoAsociado as Record<string, string>
    ),
    dCdCDERef: data.cdcDocumentoReferenciado,
    dNTimDI: data.numeroTimbradoDocumentoImpreso,
    dEstDocAso: data.establecimiento,
    dPExpDocAso: data.puntoExpedicion,
    dNumDocAso: data.numeroDocumento,
    iTipoDocAso: data.tipoDocumentoImpreso,
    dDTipoDocAso: resolveOptionalDescription(
      data.tipoDocumentoImpreso,
      descripcionTipoDocumentoImpreso as Record<string, string>
    ),
    dFecEmiDI: formatDateOnly(data.fechaEmisionDocumentoImpreso),
    dNumComRet: data.numeroComprobanteRetencion,
    dNumResCF: data.numeroResolucionCreditoFiscal,
    iTipCons: data.tipoConstancia,
    dDesTipCons: resolveOptionalDescription(
      data.tipoConstancia,
      descripcionTipoConstancia as Record<string, string>
    ),
    dNumCons: data.numeroConstancia,
    dNumControl: data.numeroControlConstancia,
    dRucFus: data.rucFusionado
  } as GCamDEAsoc;
}
