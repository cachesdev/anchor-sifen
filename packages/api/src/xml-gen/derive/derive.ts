import { Err, Ok, type Result } from '../../result';
import type { FacturaElectronica } from '../../sifen/types';
import { XMLGenCalculationError } from '../errors';
import { Big } from '../big';
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
function cloneForCalculation(value: unknown, path: string): unknown {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof Big) {
    return new Big(value);
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => cloneForCalculation(item, `${path}[${index}]`));
  }

  if (typeof value === 'function') {
    throw new Error(`No se pudo clonar el valor en ${path}: se encontro una funcion.`);
  }

  if (value && typeof value === 'object') {
    const clonedObject: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      clonedObject[key] = cloneForCalculation(nestedValue, `${path}.${key}`);
    }

    return clonedObject;
  }

  return value;
}

export function calculateFields(fe: FacturaElectronica): FacturaElectronica {
  const out = cloneForCalculation(fe, 'facturaElectronica') as FacturaElectronica;

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
