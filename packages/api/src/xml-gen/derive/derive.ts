import { Err, Ok, type Result } from '../../result';
import type { FacturaElectronica } from '../../sifen/types';
import { XMLGenCalculationError } from '../errors';
import { applyBaseDerivedFields } from './base';
import { applyItemDerivedFields } from './item';
import { applyOperacionDerivedFields } from './operacion-de';
import { applyDvDerivedFields } from './ruc-dv';
import { applySubtotalesDerivedFields } from './subtotal';

/**
 * Orden de cálculo explícito:
 * 1) Cabecera (DV de CDC y fecha de firma)
 * 2) Operación DE (codigo de seguridad)
 * 3) DV de RUC relacionados
 * 4) Derivaciones a nivel item
 * 5) Subtotales y totales (acumula -> deriva -> aplica)
 */
export function calculateFields(fe: FacturaElectronica): FacturaElectronica {
  const out = structuredClone(fe);

  applyBaseDerivedFields(out);
  applyOperacionDerivedFields(out);
  applyDvDerivedFields(out);
  applyItemDerivedFields(out);
  applySubtotalesDerivedFields(out);

  return out;
}

export function calculateFieldsResult(
  fe: FacturaElectronica
): Result<FacturaElectronica, XMLGenCalculationError> {
  try {
    return Ok(calculateFields(fe));
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
