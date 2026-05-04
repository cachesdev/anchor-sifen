import type { DocumentoElectronicoAsociado } from '../../sifen/types/clean/h';
import {
  descripcionTipoConstancia,
  descripcionTipoDocumentoAsociado,
  descripcionTipoDocumentoImpreso
} from '../../sifen/types/enums';
import type { GCamDEAsoc } from '../../sifen/types/raw/h';
import { asLiteral } from '../../sifen/types/union';
import { formatDate } from './helpers';

export function mapDocumentoElectronicoAsociadoToRaw(
  data: DocumentoElectronicoAsociado
): GCamDEAsoc {
  const tipoDocumentoAsociado = asLiteral(data.tipoDocumentoAsociado);
  const tipoDocumentoImpreso = asLiteral(data.tipoDocumentoImpreso);
  const tipoConstancia = asLiteral(data.tipoConstancia);

  return {
    iTipDocAso: tipoDocumentoAsociado,
    dDesTipDocAso: descripcionTipoDocumentoAsociado[tipoDocumentoAsociado],
    dCdCDERef: data.cdcDocumentoReferenciado,
    dNTimDI: data.numeroTimbradoDocumentoImpreso,
    dEstDocAso:
      data.establecimiento !== undefined
        ? String(data.establecimiento).padStart(3, '0')
        : undefined,
    dPExpDocAso:
      data.puntoExpedicion !== undefined
        ? String(data.puntoExpedicion).padStart(3, '0')
        : undefined,
    dNumDocAso:
      data.numeroDocumento !== undefined
        ? String(data.numeroDocumento).padStart(7, '0')
        : undefined,
    iTipoDocAso: tipoDocumentoImpreso,
    dDTipoDocAso:
      tipoDocumentoImpreso !== undefined
        ? descripcionTipoDocumentoImpreso[tipoDocumentoImpreso]
        : undefined,
    dFecEmiDI: formatDate(data.fechaEmisionDocumentoImpreso, 'date'),
    dNumComRet: data.numeroComprobanteRetencion,
    dNumResCF: data.numeroResolucionCreditoFiscal,
    iTipCons: tipoConstancia,
    dDesTipCons:
      tipoConstancia !== undefined ? descripcionTipoConstancia[tipoConstancia] : undefined,
    dNumCons: data.numeroConstancia,
    dNumControl: data.numeroControlConstancia,
    dRucFus: data.rucFusionado
  };
}
