import type { RequiredKeysOf } from 'type-fest';
import type { DatosGeneralesOperacion, OperacionDE } from '../sifen/types/clean/de';
import type { SubtotalesTotales } from '../sifen/types/clean/f';
import type { UsoGeneral } from '../sifen/types/clean/g';
import type { DocumentoElectronicoAsociado } from '../sifen/types/clean/h';
import type {
  DatosEspecificosPorTipoDE_FE,
  FacturaElectronica,
  Timbrado_FE
} from '../sifen/types/factura-electronica';

export type RequiredFields = RequiredKeysOf<FacturaElectronica>;

/**
 * Builder para FacturaEletronica que asegura que los campos requeridos sean seteados
 * en tiempo de compilación.
 */
export class FacturaElectronicaBuilder<TFilled extends keyof FacturaElectronica = never> {
  private state: Partial<FacturaElectronica> = {};

  private constructor() {
    return new FacturaElectronicaBuilder();
  }

  create({
    id_cdc,
    digitoVerificadorId,
    fechaFirma
  }: Pick<
    FacturaElectronica,
    'id_cdc' | 'digitoVerificadorId' | 'fechaFirma'
  >): FacturaElectronicaBuilder<TFilled | 'id_cdc' | 'digitoVerificadorId' | 'fechaFirma'> {
    const fe = new FacturaElectronicaBuilder();
    fe.state.id_cdc = id_cdc;

    fe.state.digitoVerificadorId = digitoVerificadorId;
    fe.state.fechaFirma = fechaFirma;

    if (!digitoVerificadorId) {
      // FIXME: Throws
      fe.state.digitoVerificadorId = Number(id_cdc.at(-1)!);
    }
    if (!fechaFirma) {
      fe.state.fechaFirma = new Date();
    }

    return fe;
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

  // TODO: A futuro, esto deberia de validar todo el DE.
  build(this: FacturaElectronicaBuilder<RequiredFields>): FacturaElectronica {
    return this.state as FacturaElectronica;
  }
}
