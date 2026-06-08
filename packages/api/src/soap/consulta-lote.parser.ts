import * as v from 'valibot';
import type { SIFENConsultaLoteResponse } from '../sifen/types/api';
import { Err, Ok, type Result } from '../result';
import { SifenError } from './sifen-error';
import { fail, failSifen, gResProcSchema } from './parser-utils';

const SUCCESS_CONSULTA_LOTE = '0362';

const protocoloAutorizacionSchema = v.pipe(
  v.union([v.string(), v.pipe(v.number(), v.finite(), v.integer()), v.bigint()]),
  v.transform((value) => value.toString().trim()),
  v.minLength(1, 'dProtAut no puede estar vacio.')
);

const gResProcListSchema = v.pipe(
  v.union([gResProcSchema, v.array(gResProcSchema)]),
  v.transform((value) => (Array.isArray(value) ? value : [value]))
);

const gResProcLoteSchema = v.object({
  id: v.pipe(v.string()),
  dEstRes: v.string(),
  dProtAut: v.optional(protocoloAutorizacionSchema),
  gResProc: gResProcListSchema
});

const gResProcLoteListSchema = v.pipe(
  v.union([gResProcLoteSchema, v.array(gResProcLoteSchema)]),
  v.transform((value) => (Array.isArray(value) ? value : [value]))
);

/**
 * node-soap deserializa los grupos repetibles como objeto cuando hay un solo
 * elemento y como array cuando hay varios. El MT150 dice que `gResProc` es
 * 1-100, pero el XSD publicado y el WSDL generado para consulta-lote dicen
 * 1-5.
 */
const consultaLoteSchema = v.object({
  dFecProc: v.string(),
  dCodResLot: v.string(),
  dMsgResLot: v.string(),
  gResProcLote: v.optional(gResProcLoteListSchema)
});

export function parseConsultaLote(raw: unknown): Result<SIFENConsultaLoteResponse, SifenError> {
  const parsed = v.safeParse(consultaLoteSchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodResLot !== SUCCESS_CONSULTA_LOTE) {
    return Err(failSifen(r.dCodResLot, r.dMsgResLot, raw));
  }

  const resultados: SIFENConsultaLoteResponse['resultados'] = (r.gResProcLote ?? []).map(
    (item) => ({
      cdc: item.id,
      estado: item.dEstRes,
      numeroTransaccion: item.dProtAut,
      validaciones: item.gResProc.map((p) => ({ codigo: p.dCodRes, mensaje: p.dMsgRes }))
    })
  );

  return Ok({
    codigoResultado: r.dCodResLot,
    mensajeResultado: r.dMsgResLot,
    fechaProcesamiento: new Date(r.dFecProc),
    resultados
  });
}
