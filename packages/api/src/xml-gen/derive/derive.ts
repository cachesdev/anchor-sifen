import { Err, Ok, type Result } from '../../result';
import type { DEC } from '../../sifen/types';
import { XMLGenCalculationError } from '../errors';
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

/**
 * Deriva todos los campos calculables de un DE.
 */
export function calculateFields<D extends DEC>(de: D): D {
  const config = obtenerConfig(getTipoDE(de));

  applyBaseDerivedFields(de);
  applyOperacionDerivedFields(de);
  applyDvDerivedFields(de, config);
  applyItemDerivedFields(de, config);
  applySubtotalesDerivedFields(de, config);

  return de;
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
