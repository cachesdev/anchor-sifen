import * as v from 'valibot';
import type { SIFENRecepLoteDEResponse } from '../sifen/types/api';
import { Err, Ok, type Result } from '../result';
import { SifenError } from './sifen-error';
import { fail, failSifen } from './parser-utils';

const SUCCESS_RECIBE_LOTE = '0300';

const recibeLoteSchema = v.object({
  dFecProc: v.string(),
  dCodRes: v.string(),
  dMsgRes: v.string(),
  dProtConsLote: v.optional(v.string()),
  dTpoProces: v.optional(v.pipe(v.union([v.string(), v.number()]), v.toNumber()))
});

export function parseRecibeLote(raw: unknown): Result<SIFENRecepLoteDEResponse, SifenError> {
  const parsed = v.safeParse(recibeLoteSchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodRes !== SUCCESS_RECIBE_LOTE) {
    return Err(failSifen(r.dCodRes, r.dMsgRes, raw));
  }

  return Ok({
    fechaProcesamiento: new Date(r.dFecProc),
    codigoResultado: r.dCodRes,
    mensajeResultado: r.dMsgRes,
    numeroLote: r.dProtConsLote,
    tiempoProcesamiento: r.dTpoProces ?? 0
  });
}
