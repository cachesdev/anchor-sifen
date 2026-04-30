import { faker } from '@faker-js/faker';
import type { SubtotalesTotales } from '../../../sifen/types/clean';
import { money } from '../helpers';

export function createSubtotalesTotales(overrides?: Partial<SubtotalesTotales>): SubtotalesTotales {
  return {
    subtotalExenta: money(0),
    subtotalExonerada: money(0),
    subtotalIva5: money(0),
    subtotalIva10: money(faker.number.float({ min: 100000, max: 50000000, multipleOf: 0.01 })),
    totalBrutoOperacion: money(
      faker.number.float({ min: 100000, max: 100000000, multipleOf: 0.01 })
    ),
    totalDescuentoParticular: money(0),
    totalDescuentoGlobal: money(0),
    totalAnticipoItem: money(0),
    totalAnticipoGlobal: money(0),
    porcentajeDescuentoGlobal: money(0),
    totalDescuentosOperacion: money(0),
    totalAnticiposOperacion: money(0),
    redondeoOperacion: money(0),
    comisionOperacion: money(faker.number.float({ min: 0, max: 500000, multipleOf: 0.01 })),
    totalNetoOperacion: money(
      faker.number.float({ min: 100000, max: 100000000, multipleOf: 0.01 })
    ),
    liquidacionIva5: money(0),
    liquidacionIva10: money(faker.number.float({ min: 10000, max: 5000000, multipleOf: 0.01 })),
    liquidacionTotalIva5: money(0),
    liquidacionTotalIva10: money(0),
    liquidacionIvaComision: money(0),
    liquidacionTotalIva: money(faker.number.float({ min: 10000, max: 5000000, multipleOf: 0.01 })),
    totalBaseGravada5: money(0),
    totalBaseGravada10: money(faker.number.float({ min: 100000, max: 50000000, multipleOf: 0.01 })),
    totalBaseGravadaIva: money(
      faker.number.float({ min: 100000, max: 50000000, multipleOf: 0.01 })
    ),
    totalOperacionGs: money(faker.number.float({ min: 100000, max: 100000000, multipleOf: 0.01 })),
    ...overrides
  };
}
