import { faker } from '@faker-js/faker';
import { tipoEmision } from '../../../sifen/types/enums';
import type { OperacionDE, Timbrado } from '../../../sifen/types/clean';
import { pickEnum } from '../helpers';

export function createOperacionDE(overrides?: Partial<OperacionDE>): OperacionDE {
  return {
    tipoEmision: pickEnum(tipoEmision),
    codigoSeguridad: faker.number.int({ min: 100000, max: 999999 }),
    informacionEmisor: undefined,
    informacionFisco: undefined,
    ...overrides
  };
}

export function createTimbrado(overrides?: Partial<Timbrado>): Timbrado {
  return {
    tipoDocumento: 1,
    numeroTimbrado: faker.number.int({ min: 10000000, max: 99999999 }),
    establecimiento: faker.number.int({ min: 1, max: 999 }),
    puntoExpedicion: faker.number.int({ min: 1, max: 999 }),
    numeroDocumento: faker.number.int({ min: 1, max: 9999999 }),
    serieNumero: undefined,
    fechaInicioVigencia: faker.date.recent({ days: 365 }),
    ...overrides
  };
}
