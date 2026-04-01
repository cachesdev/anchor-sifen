import type {
  DatosEspecificosPorTipoDE,
  DatosGeneralesOperacion,
  OperacionDE,
  Timbrado
} from './clean/de';
import type { SubtotalesTotales } from './clean/f';
import type { UsoGeneral } from './clean/g';
import type { DocumentoElectronicoAsociado } from './clean/h';
import type { OmitDeep, SetFieldType, SetRequired, SetRequiredDeep } from 'type-fest';
import type { ItemOperacion } from './clean/e';

export type Timbrado_FE = OmitDeep<Timbrado, 'tipoDocumento'>;
export type DatosEspecificosPorTipoDE_FE = SetFieldType<
  SetRequiredDeep<
    OmitDeep<
      DatosEspecificosPorTipoDE,
      'autofacturaElectronica' | 'notaCreditoDebitoElectronica' | 'notaRemisionElectronica'
    >,
    'facturaElectronica' | 'condicionOperacion' | 'itemsOperacion'
  >,
  'itemsOperacion',
  SetRequired<ItemOperacion, 'valorItem'>[]
>;

/**
 * A - A001 | DE | DE Enfocado a Factura Electronica | Pagina 61
 */
export interface FacturaElectronica {
  /**
   * A - A002 | Id | Identificador del DE | Pagina 61
   */
  id_cdc: string;
  /**
   * A - A003 | dDVId | Dígito verificador del identificador del DE | Pagina 61
   *
   * Si no es proveido, es calculado internamente.
   */
  digitoVerificadorId?: number;
  /**
   * A - A004 | dFecFirma | Fecha de la firma | Pagina 62
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   *
   * Si no es proveido, es calculado internamente.
   */
  fechaFirma?: Date;
  /**
   * B - B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 62
   */
  operacionDE: OperacionDE;
  /**
   * C - C001 | gTimb | Datos del timbrado | Pagina 63
   */
  timbrado: Timbrado_FE;
  /**
   * D - D001 | gDatGralOpe | Campos generales del DE | Pagina 65
   */
  datosGeneralesOperacion: DatosGeneralesOperacion;
  /**
   * E - E001 | gDtipDE | Campos específicos por tipo de Documento Electrónico | Pagina 73
   */
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_FE;
  /**
   * F - F001 | gTotSub | Campos de subtotales y totales | Pagina 102
   */
  subtotalesTotales: SubtotalesTotales;
  /**
   * G - G001 | gCamGen | Campos de uso general | Pagina 106
   */
  camposUsoGeneral?: UsoGeneral;
  /**
   * H - H001 | gCamDEAsoc | Campos que identifican al DE asociado | Pagina 108
   */
  camposDocumentoElectronicoAsociado?: DocumentoElectronicoAsociado;
}
