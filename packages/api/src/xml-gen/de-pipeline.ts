import * as v from 'valibot';
import type { FacturaElectronica } from '../sifen/types';
import type { Timbrado } from '../sifen/types/clean/de';
import type { DE } from '../sifen/types/raw/de';
import { tipoDocumentoElectronico, type TipoDocumentoElectronicoLabel } from '../sifen/types/enums';
import { Err, Ok, type Result } from '../result';
import { calculateFieldsResult } from './derive';
import { validateCalculated } from './validation';
import { formatDateTime } from './mapper/helpers';
import {
  mapOperacionDEToRaw,
  mapTimbradoToRaw,
  mapDatosGeneralesOperacionToRaw,
  mapDatosEspecificosPorTipoDEToRaw
} from './mapper/de';
import { mapSubtotalesTotalesToRaw } from './mapper/f';
import { mapUsoGeneralToRaw } from './mapper/g';
import { mapDocumentoElectronicoAsociadoToRaw } from './mapper/h';
import {
  XMLGenInputValidationError,
  XMLGenBusinessValidationError,
  XMLGenMappingError,
  type XMLGenBuildError
} from './errors';
import type { Simplify } from 'type-fest';

export interface PreparedDEBase<TType extends TipoDocumentoElectronicoLabel, TClean> {
  type: TType;
  raw: DE;
  clean: TClean;
  cdc: string;
}

export type PreparedDE = Simplify<PreparedDEBase<'FacturaElectronica', FacturaElectronica>>;

export function prepareDE<TInput>(
  input: TInput,
  schema: v.GenericSchema<unknown, FacturaElectronica>,
  deType: TipoDocumentoElectronicoLabel
): Result<PreparedDE, XMLGenBuildError> {
  const tipoDocumento = tipoDocumentoElectronico[deType];

  const validated = v.safeParse(schema, input);
  if (!validated.success) {
    return Err(new XMLGenInputValidationError({ details: v.summarize(validated.issues) }));
  }

  const calculated = calculateFieldsResult(validated.output);
  if (!calculated.success) {
    return Err(calculated.error);
  }

  const businessErrors = validateCalculated(calculated.value);
  if (businessErrors.length > 0) {
    return Err(new XMLGenBusinessValidationError({ issues: businessErrors }));
  }

  const de = calculated.value;
  const timbrado: Timbrado = { ...de.timbrado, tipoDocumento };

  try {
    return Ok({
      type: deType,
      cdc: de.id_cdc,
      clean: de,
      raw: {
        dDVId: de.digitoVerificadorId,
        dFecFirma: formatDateTime(de.fechaFirma)!,
        dSisFact: 1,
        gOpeDE: mapOperacionDEToRaw(de.operacionDE),
        gTimb: mapTimbradoToRaw(timbrado),
        gDatGralOpe: mapDatosGeneralesOperacionToRaw(de.datosGeneralesOperacion),
        gDtipDE: mapDatosEspecificosPorTipoDEToRaw(de.datosEspecificosPorTipoDE),
        gTotSub: mapSubtotalesTotalesToRaw(de.subtotalesTotales),
        gCamGen: de.camposUsoGeneral ? mapUsoGeneralToRaw(de.camposUsoGeneral) : undefined,
        gCamDEAsoc: de.camposDocumentoElectronicoAsociado
          ? mapDocumentoElectronicoAsociadoToRaw(de.camposDocumentoElectronicoAsociado)
          : undefined
      }
    } as PreparedDE);
  } catch (error) {
    return Err(
      new XMLGenMappingError({
        details: error instanceof Error ? error.message : String(error),
        cause: error instanceof Error ? error : undefined
      })
    );
  }
}
