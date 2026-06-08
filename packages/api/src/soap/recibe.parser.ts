import * as v from 'valibot';
import type { SIFENRecibeResponse } from '../sifen/types/api';
import { Err, Ok, type Result } from '../result';
import { SifenError } from './sifen-error';
import { fail, failSifen, gResProcSchema } from './parser-utils';

const SUCCESS_RECIBE = 'Aprobado';

const protocoloAutorizacionSchema = v.pipe(
  v.union([v.string(), v.pipe(v.number(), v.finite(), v.integer()), v.bigint()]),
  v.transform((value) => value.toString().trim()),
  v.minLength(1, 'dProtAut no puede estar vacio.')
);

const gResProcListSchema = v.pipe(
  v.union([gResProcSchema, v.array(gResProcSchema)]),
  v.transform((value) => (Array.isArray(value) ? value : [value]))
);

/**
 * La tabla del MT150 para Schema XML 3/4 no coincide con las respuestas reales:
 * nombra `xProtDe`/`id` y agrupa algunos campos bajo `gResProc`. El XSD
 * publicado, el WSDL generado y otras librerias usan `rProtDe` con `Id`, y
 * dejan `dEstRes`/`dProtAut` directamente bajo `rProtDe`.
 *
 * `Id` y `dDigVal`
 * son obligatorios en la tabla del MT, pero el XSD publicado los marca
 * minOccurs=0; mantenemos esa opcionalidad en el esquema y exigimos `Id` solo
 * para respuestas aprobadas.
 */
const recibeRootSchema = v.object({
  rProtDe: v.object({
    Id: v.optional(v.string()),
    dFecProc: v.string(),
    dDigVal: v.optional(v.string()),
    dEstRes: v.string(),
    dProtAut: v.optional(protocoloAutorizacionSchema),
    gResProc: v.optional(gResProcListSchema)
  })
});

export function parseRecibe(raw: unknown): Result<SIFENRecibeResponse, SifenError> {
  const root = v.safeParse(recibeRootSchema, raw);
  if (!root.success) return Err(fail(raw, v.summarize(root.issues)));

  const r = root.output.rProtDe;
  const validaciones = r.gResProc ?? [];

  if (r.dEstRes !== SUCCESS_RECIBE && r.dEstRes !== 'Aprobado con observación') {
    const firstError = validaciones[0];
    return Err(failSifen(firstError?.dCodRes ?? '0000', firstError?.dMsgRes ?? r.dEstRes, raw));
  }

  if (!r.Id) {
    return Err(fail(raw, `SIFEN devolvio estado ${r.dEstRes} pero Id esta ausente.`));
  }

  return Ok({
    cdc: r.Id,
    estado: r.dEstRes,
    numeroTransaccion: r.dProtAut,
    digestValue: r.dDigVal,
    fechaProcesamiento: new Date(r.dFecProc),
    validaciones: validaciones.map((p) => ({ codigo: p.dCodRes, mensaje: p.dMsgRes }))
  });
}
