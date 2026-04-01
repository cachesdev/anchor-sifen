import type { RequiredKeysOf } from 'type-fest';
import type { DatosGeneralesOperacion, OperacionDE, Timbrado } from '../sifen/types/clean/de';
import type { SubtotalesTotales } from '../sifen/types/clean/f';
import type { UsoGeneral } from '../sifen/types/clean/g';
import type { DocumentoElectronicoAsociado } from '../sifen/types/clean/h';
import { tipoDocumentoElectronico } from '../sifen/types/enums';
import type {
  DatosEspecificosPorTipoDE_FE,
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

export type RequiredFields = RequiredKeysOf<FacturaElectronica>;

export interface BuiltDE {
  de: DE;
  cdc: string;
}

/**
 * Builder para FacturaEletronica que asegura que los campos requeridos sean seteados
 * en tiempo de compilación.
 */
export class FacturaElectronicaBuilder<TFilled extends keyof FacturaElectronica = never> {
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
  >): FacturaElectronicaBuilder<'id_cdc' | 'digitoVerificadorId' | 'fechaFirma'> {
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
    data: DatosGeneralesOperacion
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

    const timbradoFE: Timbrado = {
      ...state.timbrado,
      tipoDocumento: tipoDocumentoElectronico.FacturaElectronica
    };

    return {
      de: {
        dDVId: state.digitoVerificadorId!,
        dFecFirma: formatDateTime(state.fechaFirma)!,
        dSisFact: 1,
        gOpeDE: mapOperacionDEToRaw(state.operacionDE),
        gTimb: mapTimbradoToRaw(timbradoFE),
        gDatGralOpe: mapDatosGeneralesOperacionToRaw(state.datosGeneralesOperacion),
        gDtipDE: mapDatosEspecificosPorTipoDEToRaw(state.datosEspecificosPorTipoDE),
        gTotSub: mapSubtotalesTotalesToRaw(state.subtotalesTotales),
        gCamGen: state.camposUsoGeneral ? mapUsoGeneralToRaw(state.camposUsoGeneral) : undefined,
        gCamDEAsoc: state.camposDocumentoElectronicoAsociado
          ? mapDocumentoElectronicoAsociadoToRaw(state.camposDocumentoElectronicoAsociado)
          : undefined
      },
      cdc: state.id_cdc!
    };
  }
}
