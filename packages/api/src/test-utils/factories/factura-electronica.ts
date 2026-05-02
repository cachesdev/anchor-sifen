import { faker } from '@faker-js/faker';
import type { DEC } from '../../sifen/types/clean/de';
import {
  createCamposFacturaElectronica,
  createCondicionOperacion,
  createEmisor,
  createItemOperacion,
  createOperacionComercial,
  createOperacionDE,
  createReceptor,
  createSubtotalesTotales,
  createTimbrado
} from './index';

export function createFacturaElectronicaDec(overrides?: Partial<DEC>): DEC {
  const defaults = {
    id_cdc: faker.string.alphanumeric({ length: 43 }) + faker.string.numeric(1),
    tipoDE: 'FacturaElectronica',
    digitoVerificadorId: 0,
    fechaFirma: new Date(0),
    operacionDE: createOperacionDE({ codigoSeguridad: 0 }),
    timbrado: createTimbrado({ tipoDocumento: 1 }),
    datosGeneralesOperacion: {
      fechaEmisionDE: faker.date.recent({ days: 30 }),
      operacionComercial: createOperacionComercial(),
      emisor: createEmisor({ rucEmisor: '80001234-5', digitoVerificadorEmisor: 5 }),
      receptor: createReceptor({ rucReceptor: '616159-6', digitoVerificadorReceptor: 6 })
    },
    datosEspecificosPorTipoDE: {
      facturaElectronica: createCamposFacturaElectronica({ indicadorPresencia: 1 }),
      condicionOperacion: createCondicionOperacion({ condicionOperacion: 1 }),
      itemsOperacion: [createItemOperacion()]
    },
    subtotalesTotales: createSubtotalesTotales()
  } satisfies DEC;

  if (!overrides) return defaults;

  return {
    ...defaults,
    ...overrides,
    datosGeneralesOperacion: {
      ...defaults.datosGeneralesOperacion,
      ...overrides.datosGeneralesOperacion
    },
    datosEspecificosPorTipoDE: {
      ...defaults.datosEspecificosPorTipoDE,
      ...overrides.datosEspecificosPorTipoDE
    }
  } satisfies DEC;
}
