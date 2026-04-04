import type { RequiredKeysOf } from 'type-fest';
import * as v from 'valibot';
import type { OperacionDE, Timbrado } from '../sifen/types/clean/de';
import type { SubtotalesTotales } from '../sifen/types/clean/f';
import type { UsoGeneral } from '../sifen/types/clean/g';
import type { DocumentoElectronicoAsociado } from '../sifen/types/clean/h';
import { tipoDocumentoElectronico } from '../sifen/types/enums';
import type {
  DatosEspecificosPorTipoDE_FE,
  DatosGeneralesOperacion_FE,
  FacturaElectronica,
  Timbrado_FE
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
import { facturaElectronicaCalculatedSchema } from './schema';

export type RequiredFields = RequiredKeysOf<FacturaElectronica>;

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
export class FacturaElectronicaBuilder<TFilled extends keyof FacturaElectronica = never> {
  // Workaround para triggerear TSC al llamar `build`
  declare protected _filled: TFilled;
  private state: Partial<FacturaElectronica> = {};

  private constructor(
    data?: Pick<FacturaElectronica, 'id_cdc' | 'digitoVerificadorId' | 'fechaFirma'>
  ) {
    if (!data) {
      return;
    }

    const digitoVerificadorId = data.digitoVerificadorId ?? Number(data.id_cdc.at(-1));

    if (Number.isNaN(digitoVerificadorId)) {
      throw new Error('Error al derivar DV del id_cdc.');
    }

    this.state.id_cdc = data.id_cdc;
    this.state.digitoVerificadorId = digitoVerificadorId;
    this.state.fechaFirma = data.fechaFirma ?? new Date();
  }

  static create({
    id_cdc,
    digitoVerificadorId,
    fechaFirma
  }: Pick<
    FacturaElectronica,
    'id_cdc' | 'digitoVerificadorId' | 'fechaFirma'
  >): FacturaElectronicaBuilder<'id_cdc'> {
    return new FacturaElectronicaBuilder({
      id_cdc,
      digitoVerificadorId,
      fechaFirma
    });
  }

  withOperacionDE(data: OperacionDE): FacturaElectronicaBuilder<TFilled | 'operacionDE'> {
    this.state.operacionDE = data;
    return this;
  }

  withTimbrado(data: Timbrado_FE): FacturaElectronicaBuilder<TFilled | 'timbrado'> {
    this.state.timbrado = data;
    return this;
  }

  withDatosGeneralesOperacion(
    data: DatosGeneralesOperacion_FE
  ): FacturaElectronicaBuilder<TFilled | 'datosGeneralesOperacion'> {
    this.state.datosGeneralesOperacion = data;
    return this;
  }

  withDatosEspecificosTipoDE(
    data: DatosEspecificosPorTipoDE_FE
  ): FacturaElectronicaBuilder<TFilled | 'datosEspecificosPorTipoDE'> {
    this.state.datosEspecificosPorTipoDE = data;
    return this;
  }

  withSubtotales(
    data: SubtotalesTotales
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

  build(this: FacturaElectronicaBuilder<RequiredFields>): BuiltDE {
    const state = this.state as FacturaElectronica;

    const processed = v.parse(facturaElectronicaCalculatedSchema, state);

    const timbradoFE: Timbrado = {
      ...processed.timbrado,
      tipoDocumento: tipoDocumentoElectronico.FacturaElectronica
    };

    return {
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
    };
  }
}
