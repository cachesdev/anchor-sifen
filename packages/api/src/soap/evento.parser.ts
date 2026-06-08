import * as v from 'valibot';
import type { SIFENEventoResponse } from '../sifen/types/api';
import { Err, Ok, type Result } from '../result';
import { SifenError } from './sifen-error';
import { fail, failSifen, gResProcSchema } from './parser-utils';

const CODIGO_EVENTO_REGISTRADO = '0600';

const textoEscalarSchema = v.pipe(
  v.union([v.string(), v.pipe(v.number(), v.finite(), v.integer()), v.bigint()]),
  v.transform((value) => value.toString().trim()),
  v.minLength(1)
);

const fechaProcesamientoSchema = v.pipe(
  v.string(),
  v.transform((value) => new Date(value)),
  v.check((value) => !Number.isNaN(value.getTime()), 'dFecProc invalida.')
);

const gResProcListSchema = v.pipe(
  v.union([gResProcSchema, v.array(gResProcSchema)]),
  v.transform((value) => (Array.isArray(value) ? value : [value]))
);

const gResProcEVeSchema = v.object({
  dEstRes: v.string(),
  dProtAut: v.optional(textoEscalarSchema),
  id: textoEscalarSchema,
  gResProc: gResProcListSchema
});

const eventoRootSchema = v.object({
  dFecProc: fechaProcesamientoSchema,
  gResProcEVe: v.pipe(
    v.union([gResProcEVeSchema, v.array(gResProcEVeSchema)]),
    v.transform((value) => (Array.isArray(value) ? value : [value]))
  )
});

export function parseEvento(raw: unknown): Result<SIFENEventoResponse, SifenError> {
  const root = v.safeParse(eventoRootSchema, raw);
  if (!root.success) return Err(fail(raw, v.summarize(root.issues)));

  const resultados = root.output.gResProcEVe;
  if (resultados.length !== 1) {
    return Err(
      fail(raw, `Respuesta de evento debe contener un resultado; contiene ${resultados.length}.`)
    );
  }

  const resultado = resultados[0]!;
  const firstFail = resultado.gResProc.find(
    (validacion) => !tieneCodigoEventoRegistrado(validacion)
  );
  if (firstFail) {
    return Err(failSifen(firstFail.dCodRes, firstFail.dMsgRes, raw));
  }

  return Ok({
    fechaProcesamiento: root.output.dFecProc,
    idEvento: resultado.id,
    estado: resultado.dEstRes,
    numeroTransaccion: resultado.dProtAut,
    validaciones: resultado.gResProc.map((validacion) => ({
      codigo: validacion.dCodRes,
      mensaje: validacion.dMsgRes
    }))
  });
}

function tieneCodigoEventoRegistrado(validacion: { dCodRes: string }): boolean {
  return validacion.dCodRes === CODIGO_EVENTO_REGISTRADO;
}
