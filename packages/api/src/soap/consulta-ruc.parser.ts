import * as v from 'valibot';
import type { SIFENConsRUCResponse } from '../sifen/types/api';
import { Err, Ok, type Result } from '../result';
import { SifenError } from './sifen-error';
import { fail, failSifen } from './parser-utils';

const SUCCESS_CONSULTA_RUC = '0502';

const contenedorRucSchema = v.object({
  dRUCCons: v.string(),
  dRazCons: v.string(),
  dCodEstCons: v.string(),
  dDesEstCons: v.string(),
  dRUCFactElec: v.string()
});

const consultaRucSchema = v.object({
  dCodRes: v.string(),
  dMsgRes: v.string(),
  xContRUC: v.optional(contenedorRucSchema)
});

export function parseConsultaRuc(raw: unknown): Result<SIFENConsRUCResponse, SifenError> {
  const parsed = v.safeParse(consultaRucSchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodRes !== SUCCESS_CONSULTA_RUC) {
    return Err(failSifen(r.dCodRes, r.dMsgRes, raw));
  }

  const resp: SIFENConsRUCResponse = {
    codigoResultado: r.dCodRes,
    mensajeResultado: r.dMsgRes
  };

  if (r.xContRUC) {
    const c = r.xContRUC;
    resp.contenedorRuc = {
      rucConsultado: c.dRUCCons,
      razonSocial: c.dRazCons,
      codigoEstado: c.dCodEstCons,
      descripcionEstado: c.dDesEstCons,
      esFacturadorElectronico: c.dRUCFactElec
    };
  }

  return Ok(resp);
}
