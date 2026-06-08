import * as v from 'valibot';
import type { SIFENConsultaResponse } from '../sifen/types/api';
import { Err, Ok, type Result } from '../result';
import { parserContenDE } from '../xml-parse';
import { SifenError } from './sifen-error';
import { fail, failSifen } from './parser-utils';

const SUCCESS_CONSULTA_DE = '0422';

const consultaDESchema = v.object({
  dFecProc: v.string(),
  dCodRes: v.string(),
  dMsgRes: v.string(),
  xContenDE: v.optional(v.string())
});

export function parseConsultaDE(raw: unknown): Result<SIFENConsultaResponse, SifenError> {
  const parsed = v.safeParse(consultaDESchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodRes !== SUCCESS_CONSULTA_DE) {
    return Err(failSifen(r.dCodRes, r.dMsgRes, raw));
  }

  if (!parsed.output.xContenDE) {
    return Err(fail(raw, 'SIFEN devolvio codigo 0422 pero xContenDE esta ausente.'));
  }

  const consultaDE = parserContenDE(parsed.output.xContenDE);
  if (!consultaDE.success) return Err(fail(raw, consultaDE.error.message, consultaDE.error));

  return Ok({
    codigoResultado: r.dCodRes,
    mensajeResultado: r.dMsgRes,
    fechaProcesamiento: new Date(parsed.output.dFecProc),
    contenedorDE: consultaDE.value
  });
}
