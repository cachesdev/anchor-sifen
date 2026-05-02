import { faker } from '@faker-js/faker';
import type {
  FacturaElectronicaInput,
  OperacionDE_FE_Input,
  Timbrado_FE_Input,
  DatosGeneralesOperacion_FE_Input,
  DatosEspecificosPorTipoDE_FE_Input,
  ItemOperacion_FE_Input
} from '../../sifen/types/factura-electronica-input';
import type {
  EmisorInput,
  ReceptorInput,
  CondicionOperacionInput,
  PagoContadoInput,
  PagoTarjetaInput,
  ValorItemInput,
  ValorRestaItemInput,
  IvaItemInput
} from './types';
import { omit } from './helpers';
import {
  createOperacionDE,
  createTimbrado,
  createOperacionComercial,
  createEmisor,
  createReceptor,
  createCamposFacturaElectronica,
  createCondicionOperacion as createBaseCondicionOperacion,
  createPagoContadoEntregaInicial as createBasePagoContado,
  createPagoTarjetaCreditoDebito as createBasePagoTarjeta,
  createItemOperacion as createBaseItemOperacion,
  createValorItem as createBaseValorItem,
  createValorRestaItem as createBaseValorRestaItem,
  createIvaItem as createBaseIvaItem
} from './base';

export function createOperacionDE_Input(
  overrides?: Partial<OperacionDE_FE_Input>
): OperacionDE_FE_Input {
  return { ...omit(createOperacionDE(), 'codigoSeguridad'), ...overrides };
}

export function createTimbrado_Input(overrides?: Partial<Timbrado_FE_Input>): Timbrado_FE_Input {
  return { ...omit(createTimbrado(), 'tipoDocumento'), ...overrides };
}

export function createEmisor_Input(overrides?: Partial<EmisorInput>): EmisorInput {
  return { ...omit(createEmisor(), 'digitoVerificadorEmisor'), ...overrides };
}

export function createReceptor_Input(overrides?: Partial<ReceptorInput>): ReceptorInput {
  return { ...omit(createReceptor(), 'digitoVerificadorReceptor'), ...overrides };
}

export function createDatosGeneralesOperacion_Input(
  overrides?: Partial<DatosGeneralesOperacion_FE_Input>
): DatosGeneralesOperacion_FE_Input {
  return {
    fechaEmisionDE: faker.date.recent({ days: 5 }),
    operacionComercial: createOperacionComercial(),
    emisor: createEmisor_Input(),
    receptor: createReceptor_Input(),
    ...overrides
  };
}

function createPagoTarjeta_Input(overrides?: Partial<PagoTarjetaInput>): PagoTarjetaInput {
  return {
    ...omit(createBasePagoTarjeta(), 'digitoVerificadorProcesadoraTarjeta'),
    ...overrides
  };
}

function createPagoContado_Input(overrides?: Partial<PagoContadoInput>): PagoContadoInput {
  const base = createBasePagoContado();
  return {
    ...base,
    pagoTarjetaCreditoDebito: base.pagoTarjetaCreditoDebito ? createPagoTarjeta_Input() : undefined,
    ...overrides
  };
}

export function createCondicionOperacion_Input(
  overrides?: Partial<CondicionOperacionInput>
): CondicionOperacionInput {
  const base = createBaseCondicionOperacion();
  return {
    ...base,
    pagoContadoEntregaInicial: base.pagoContadoEntregaInicial?.map(() => createPagoContado_Input()),
    ...overrides
  };
}

function createValorRestaItem_Input(overrides?: Partial<ValorRestaItemInput>): ValorRestaItemInput {
  return {
    ...omit(
      createBaseValorRestaItem(),
      'porcentajeDescuentoItem',
      'valorTotalOperacionItem',
      'valorTotalOperacionItemGs'
    ),
    ...overrides
  };
}

function createValorItem_Input(overrides?: Partial<ValorItemInput>): ValorItemInput {
  return {
    ...omit(createBaseValorItem(), 'totalBrutoOperacionItem'),
    valorRestaItem: createValorRestaItem_Input(),
    ...overrides
  };
}

function createIvaItem_Input(overrides?: Partial<IvaItemInput>): IvaItemInput {
  return {
    ...omit(createBaseIvaItem(), 'baseGravadaIvaItem', 'liquidacionIvaItem', 'baseExenta'),
    ...overrides
  };
}

export function createItemOperacion_Input(
  overrides?: Partial<ItemOperacion_FE_Input>
): ItemOperacion_FE_Input {
  return {
    ...omit(createBaseItemOperacion(), 'valorItem', 'ivaItem'),
    valorItem: createValorItem_Input(),
    ivaItem: createIvaItem_Input(),
    ...overrides
  };
}

export function createDatosEspecificosPorTipoDE_Input(
  overrides?: Partial<DatosEspecificosPorTipoDE_FE_Input>
): DatosEspecificosPorTipoDE_FE_Input {
  return {
    facturaElectronica: createCamposFacturaElectronica(),
    condicionOperacion: createCondicionOperacion_Input(),
    itemsOperacion: [createItemOperacion_Input()],
    usosComerciales: undefined,
    transporte: undefined,
    ...overrides
  };
}

/**
 * Crea un FacturaElectronicaInput mínimo válido para C002=1.
 *
 * Solo se generan los campos requeridos por el tipo de entrada. Los campos
 * opcionales (`transporte`, `usosComerciales`, `camposUsoGeneral`, etc.) se
 * dejan sin definir para que el consumidor los complete mediante `overrides`
 * cuando los necesite.
 */
export function createFacturaElectronicaInput(
  overrides?: Partial<FacturaElectronicaInput>
): FacturaElectronicaInput {
  return {
    id_cdc: faker.string.numeric({ length: 44 }),
    operacionDE: createOperacionDE_Input(),
    timbrado: createTimbrado_Input(),
    datosGeneralesOperacion: createDatosGeneralesOperacion_Input(),
    datosEspecificosPorTipoDE: createDatosEspecificosPorTipoDE_Input(),
    subtotalesTotales: {
      comisionOperacion: faker.number.float({ min: 0, max: 500000, multipleOf: 0.01 })
    },
    camposUsoGeneral: undefined,
    camposDocumentoElectronicoAsociado: undefined,
    ...overrides
  };
}
