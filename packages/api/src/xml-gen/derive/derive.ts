import { Err, Ok, type Result } from '../../result';
import type { DEC } from '../../sifen/types';
import { XMLGenCalculationError } from '../errors';
import { applyBaseDerivedFields } from './base';
import { applyDescuentoGlobalDerivedFields, applyItemDerivedFields } from './item';
import { applyOperacionDerivedFields } from './operacion-de';
import { applyDvDerivedFields } from './ruc-dv';
import { applySubtotalesDerivedFields } from './subtotal';
import { obtenerConfig } from './config';
import { getTipoDE } from './accessors';

/**
 * Deriva todos los campos calculables de un DE.
 *
 * INFO: Orden de calculo explicito:
 * 1) Cabecera (DV de CDC y fecha de firma)
 * 2) Operacion DE (codigo de seguridad)
 * 3) DV de RUC relacionados
 * 4) Descuento global por item (EA004 ← F010)
 * 5) Derivaciones a nivel item (EA008, EA003, E735, etc.)
 * 6) Subtotales y totales (acumula -> deriva -> aplica)
 */
export function calculateFields<D extends DEC>(de: D): D {
  const config = obtenerConfig(getTipoDE(de));

  applyBaseDerivedFields(de);
  applyOperacionDerivedFields(de);
  applyDvDerivedFields(de, config);
  applyDescuentoGlobalDerivedFields(de);
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
