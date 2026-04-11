import type { RequiredKeysOf } from 'type-fest';
import * as v from 'valibot';
import type { Timbrado } from '../sifen/types/clean/de';
import type { UsoGeneral } from '../sifen/types/clean/g';
import type { DocumentoElectronicoAsociado } from '../sifen/types/clean/h';
import { tipoDocumentoElectronico } from '../sifen/types/enums';
import type {
  DatosEspecificosPorTipoDE_FE_Input,
  DatosGeneralesOperacion_FE_Input,
  FacturaElectronicaInput,
  OperacionDE_FE_Input,
  SubtotalesTotales_FE_Input,
  Timbrado_FE_Input
} from '../sifen/types/factura-electronica';
import type { DE } from '../sifen/types/raw/de';
import {
  mapDatosEspecificosPorTipoDEToRaw,
  mapDatosGeneralesOperacionToRaw,
  mapOperacionDEToRaw,
  mapTimbradoToRaw
} from './mapper/de';
import { mapSubtotalesTotalesToRaw } from './mapper/f';
import { mapUsoGeneralToRaw } from './mapper/g';
import { mapDocumentoElectronicoAsociadoToRaw } from './mapper/h';
import { formatDateTime } from './mapper/helpers';
import {
  XMLGenBusinessValidationError,
  XMLGenInputValidationError,
  XMLGenMappingError
} from './errors';
import type { XMLGenBuildError } from './errors';
import { facturaElectronicaSchema } from './schema';
import { validateCalculated } from './validation';
import { Err, Ok, type Result } from '../result';
import { calculateFieldsResult } from './derive';

export type RequiredFields = RequiredKeysOf<FacturaElectronicaInput>;

export interface BuiltDE {
  de: DE;
  cdc: string;
}

/**
 * Builder para FacturaEletronica que asegura que los campos requeridos sean seteados
 * en tiempo de compilación.
 *
 * Requiere llamar todas los metodos requeridos para poder llamar `build` sin errores
 * de compilacion.
 */
export class FacturaElectronicaBuilder<TFilled extends keyof FacturaElectronicaInput = never> {
  // Workaround para triggerear TSC al llamar `build`
  declare protected _filled: TFilled;
  private state: Partial<FacturaElectronicaInput> = {};

  private constructor(data?: Pick<FacturaElectronicaInput, 'id_cdc'>) {
    if (!data) {
      return;
    }

    this.state.id_cdc = data.id_cdc;
  }

  static create({
    id_cdc
  }: Pick<FacturaElectronicaInput, 'id_cdc'>): FacturaElectronicaBuilder<'id_cdc'> {
    return new FacturaElectronicaBuilder({ id_cdc });
  }

  withOperacionDE(data: OperacionDE_FE_Input): FacturaElectronicaBuilder<TFilled | 'operacionDE'> {
    this.state.operacionDE = data;
    return this;
  }

  withTimbrado(data: Timbrado_FE_Input): FacturaElectronicaBuilder<TFilled | 'timbrado'> {
    this.state.timbrado = data;
    return this;
  }

  withDatosGeneralesOperacion(
    data: DatosGeneralesOperacion_FE_Input
  ): FacturaElectronicaBuilder<TFilled | 'datosGeneralesOperacion'> {
    this.state.datosGeneralesOperacion = data;
    return this;
  }

  withDatosEspecificosTipoDE(
    data: DatosEspecificosPorTipoDE_FE_Input
  ): FacturaElectronicaBuilder<TFilled | 'datosEspecificosPorTipoDE'> {
    this.state.datosEspecificosPorTipoDE = data;
    return this;
  }

  withSubtotales(
    data: SubtotalesTotales_FE_Input
  ): FacturaElectronicaBuilder<TFilled | 'subtotalesTotales'> {
    this.state.subtotalesTotales = data;
    return this;
  }

  /**
   * Opcional basado en condiciones del manual tecnico.
   */
  withCamposUsoGeneral(data: UsoGeneral): FacturaElectronicaBuilder<TFilled | 'camposUsoGeneral'> {
    this.state.camposUsoGeneral = data;
    return this;
  }

  /**
   * Opcional basado en condiciones del manual tecnico.
   */
  withCamposDocumentoAsociado(
    data: DocumentoElectronicoAsociado
  ): FacturaElectronicaBuilder<TFilled | 'camposDocumentoElectronicoAsociado'> {
    this.state.camposDocumentoElectronicoAsociado = data;
    return this;
  }

  build(this: FacturaElectronicaBuilder<RequiredFields>): Result<BuiltDE, XMLGenBuildError> {
    const state = this.state as FacturaElectronicaInput;
    const validatedFactura = v.safeParse(facturaElectronicaSchema, state);
    if (!validatedFactura.success) {
      return Err(
        new XMLGenInputValidationError({
          issues: validatedFactura.issues
        })
      );
    }

    const calculatedResult = calculateFieldsResult(validatedFactura.output);
    if (!calculatedResult.success) {
      return Err(calculatedResult.error);
    }

    const businessErrors = validateCalculated(calculatedResult.value);
    if (businessErrors.length > 0) {
      return Err(
        new XMLGenBusinessValidationError({
          issues: businessErrors
        })
      );
    }

    const processed = calculatedResult.value;

    try {
      const timbradoFE: Timbrado = {
        ...processed.timbrado,
        tipoDocumento: tipoDocumentoElectronico.FacturaElectronica
      };

      return Ok({
        de: {
          dDVId: processed.digitoVerificadorId!,
          dFecFirma: formatDateTime(processed.fechaFirma)!,
          dSisFact: 1,
          gOpeDE: mapOperacionDEToRaw(processed.operacionDE),
          gTimb: mapTimbradoToRaw(timbradoFE),
          gDatGralOpe: mapDatosGeneralesOperacionToRaw(processed.datosGeneralesOperacion),
          gDtipDE: mapDatosEspecificosPorTipoDEToRaw(processed.datosEspecificosPorTipoDE),
          gTotSub: mapSubtotalesTotalesToRaw(processed.subtotalesTotales),
          gCamGen: processed.camposUsoGeneral
            ? mapUsoGeneralToRaw(processed.camposUsoGeneral)
            : undefined,
          gCamDEAsoc: processed.camposDocumentoElectronicoAsociado
            ? mapDocumentoElectronicoAsociadoToRaw(processed.camposDocumentoElectronicoAsociado)
            : undefined
        },
        cdc: processed.id_cdc!
      });
    } catch (error) {
      return Err(
        new XMLGenMappingError({
          details: error instanceof Error ? error.message : String(error),
          cause: error instanceof Error ? error : undefined
        })
      );
    }
  }
}
