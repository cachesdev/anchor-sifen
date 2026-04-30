import {
  tipoDocumentoAsociado
} from '../../../sifen/types/enums';
import type { DocumentoElectronicoAsociado } from '../../../sifen/types/clean';
import { pickEnum } from '../helpers';

export function createDocumentoElectronicoAsociado(
  overrides?: Partial<DocumentoElectronicoAsociado>
): DocumentoElectronicoAsociado {
  return {
    tipoDocumentoAsociado: pickEnum(tipoDocumentoAsociado),
    cdcDocumentoReferenciado: undefined,
    numeroTimbradoDocumentoImpreso: undefined,
    establecimiento: undefined,
    puntoExpedicion: undefined,
    numeroDocumento: undefined,
    tipoDocumentoImpreso: undefined,
    fechaEmisionDocumentoImpreso: undefined,
    numeroComprobanteRetencion: undefined,
    numeroResolucionCreditoFiscal: undefined,
    tipoConstancia: undefined,
    numeroConstancia: undefined,
    numeroControlConstancia: undefined,
    rucFusionado: undefined,
    ...overrides
  };
}
