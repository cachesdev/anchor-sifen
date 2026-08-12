import { faker } from '@faker-js/faker';
import type { NotaCreditoElectronicaInput, NotaDebitoElectronicaInput } from '../../sifen/types';
import { motivoEmision, tipoDocumentoAsociado } from '../../sifen/types/enums';
import { calcularDv, extraerRuc } from '../../xml-gen/ruc';
import { generateCDC } from '../../xml-gen/cdc';
import { createDocumentoElectronicoAsociado } from './base';
import { createFacturaElectronicaInput } from './factura-electronica-input';
import { omit } from './helpers';

type NotaElectronicaInput = NotaCreditoElectronicaInput | NotaDebitoElectronicaInput;

function createNotaElectronicaInput(tipoDocumento: 5 | 6): NotaElectronicaInput {
  const base = createFacturaElectronicaInput();
  const rucEmisor = extraerRuc(base.datosGeneralesOperacion.emisor.rucEmisor);
  const operacionComercial = omit(
    base.datosGeneralesOperacion.operacionComercial,
    'tipoTransaccion'
  );

  return {
    id_cdc: generateCDC({
      tipoDocumento,
      rucEmisor,
      dvEmisor: calcularDv(rucEmisor),
      establecimiento: String(base.timbrado.establecimiento),
      puntoExpedicion: String(base.timbrado.puntoExpedicion),
      numeroDocumento: String(base.timbrado.numeroDocumento),
      tipoContribuyente: Number(base.datosGeneralesOperacion.emisor.tipoContribuyente),
      fechaEmision: base.datosGeneralesOperacion.fechaEmisionDE,
      tipoEmision: Number(base.operacionDE.tipoEmision)
    }),
    operacionDE: base.operacionDE,
    timbrado: base.timbrado,
    datosGeneralesOperacion: {
      ...base.datosGeneralesOperacion,
      operacionComercial
    },
    datosEspecificosPorTipoDE: {
      notaCreditoDebitoElectronica: {
        motivoEmision: faker.helpers.arrayElement(Object.values(motivoEmision))
      },
      itemsOperacion: base.datosEspecificosPorTipoDE.itemsOperacion,
      usosComerciales: base.datosEspecificosPorTipoDE.usosComerciales
    },
    subtotalesTotales: base.subtotalesTotales,
    camposUsoGeneral: base.camposUsoGeneral,
    camposDocumentoElectronicoAsociado: createDocumentoElectronicoAsociado({
      tipoDocumentoAsociado: tipoDocumentoAsociado.Electronico,
      cdcDocumentoReferenciado: faker.string.numeric({ length: 44 })
    })
  };
}

export function createNotaCreditoElectronicaInput(
  overrides?: Partial<NotaCreditoElectronicaInput>
): NotaCreditoElectronicaInput {
  return { ...createNotaElectronicaInput(5), ...overrides };
}

export function createNotaDebitoElectronicaInput(
  overrides?: Partial<NotaDebitoElectronicaInput>
): NotaDebitoElectronicaInput {
  return { ...createNotaElectronicaInput(6), ...overrides };
}
