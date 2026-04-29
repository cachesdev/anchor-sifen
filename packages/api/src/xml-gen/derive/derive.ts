import { Err, Ok, type Result } from '../../result';
import type { DEC } from '../../sifen/types';
import { XMLGenCalculationError } from '../errors';
import { Big } from '../big';
import { applyBaseDerivedFields } from './base';
import { applyItemDerivedFields } from './item';
import { applyOperacionDerivedFields } from './operacion-de';
import { applyDvDerivedFields } from './ruc-dv';
import { applySubtotalesDerivedFields } from './subtotal';
import { obtenerConfig } from './config';
import { getTipoDE } from './accessors';

/**
 * INFO: Orden de calculo explicito:
 * 1) Cabecera (DV de CDC y fecha de firma)
 * 2) Operacion DE (codigo de seguridad)
 * 3) DV de RUC relacionados
 * 4) Derivaciones a nivel item
 * 5) Subtotales y totales (acumula -> deriva -> aplica)
 */

function cloneForCalculation<T>(value: T, path: string): T {
  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof Big) {
    return new Big(value) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item, index) =>
      cloneForCalculation(item, `${path}[${index}]`)
    ) as unknown as T;
  }

  if (typeof value === 'function') {
    throw new Error(`No se pudo clonar el valor en ${path}: se encontro una funcion.`);
  }

  if (value && typeof value === 'object') {
    const clonedObject: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      clonedObject[key] = cloneForCalculation(nestedValue, `${path}.${key}`);
    }

    return clonedObject as unknown as T;
  }

  return value;
}

/**
 * Deriva todos los campos calculables de un DE.
 */
export function calculateFields<D extends DEC>(de: D): D {
  const out = cloneForCalculation(de, 'de');
  const config = obtenerConfig(getTipoDE(out));

  applyBaseDerivedFields(out);
  applyOperacionDerivedFields(out);
  applyDvDerivedFields(out, config);
  applyItemDerivedFields(out, config);
  applySubtotalesDerivedFields(out, config);

  return out;
}

export function calculateFieldsResult<D extends DEC>(de: D): Result<D, XMLGenCalculationError> {
  try {
    return Ok(calculateFields(de));
  } catch (error) {
    const details =
      error instanceof Error ? error.message : 'Error desconocido durante calculo de campos.';

    return Err(
      new XMLGenCalculationError({
        details,
        cause: error instanceof Error ? error : undefined
      })
    );
  }
}
