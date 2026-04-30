import { faker } from '@faker-js/faker';
import {
  tipoImpuestoAfectado,
  tipoContribuyente,
  tipoDocumentoResponsableDE,
  naturalezaReceptor,
  tipoOperacion,
  tipoObligacion
} from '../../../sifen/types/enums';
import { codigoMoneda } from '../../../gen/monedas';
import { codigoPais } from '../../../gen/paises';
import { codigoCiudad } from '../../../gen/ciudades';
import { codigoDepartamento } from '../../../gen/departamentos';
import type {
  OperacionComercial,
  ObligacionesAfectadas,
  ActividadEconomica,
  ResponsableDE,
  Emisor,
  Receptor
} from '../../../sifen/types/clean';
import { pickEnum, pickFromValue, pickFromKey, many, fakeRUC, money } from '../helpers';

export function createObligacionesAfectadas(
  overrides?: Partial<ObligacionesAfectadas>
): ObligacionesAfectadas {
  return {
    codigoObligacion: pickEnum(tipoObligacion),
    ...overrides
  };
}

export function createOperacionComercial(
  overrides?: Partial<OperacionComercial>
): OperacionComercial {
  return {
    tipoTransaccion: undefined,
    tipoImpuestoAfectado: pickEnum(tipoImpuestoAfectado),
    monedaOperacion: pickFromKey(codigoMoneda),
    condicionTipoCambio: undefined,
    tipoCambioOperacion: money(faker.number.float({ min: 1000, max: 8000, multipleOf: 0.0001 })),
    condicionAnticipo: undefined,
    obligacionesAfectadas: many(() => createObligacionesAfectadas(), 1),
    ...overrides
  };
}

export function createActividadEconomica(
  overrides?: Partial<ActividadEconomica>
): ActividadEconomica {
  return {
    codigoActividadEconomica: faker.string.numeric({ length: { min: 4, max: 6 } }),
    descripcionActividadEconomica: faker.lorem.sentence(3),
    ...overrides
  };
}

export function createResponsableDE(overrides?: Partial<ResponsableDE>): ResponsableDE {
  return {
    tipoDocumentoIdentidadResponsableDE: pickEnum(tipoDocumentoResponsableDE),
    numeroDocumentoIdentidadResponsableDE: faker.string.numeric({ length: { min: 6, max: 10 } }),
    nombreResponsableDE: faker.person.fullName(),
    cargoResponsableDE: faker.helpers.arrayElement([
      'Gerente',
      'Contador',
      'Encargado',
      'Administrador'
    ]),
    ...overrides
  };
}

export function createEmisor(overrides?: Partial<Emisor>): Emisor {
  return {
    rucEmisor: fakeRUC(),
    digitoVerificadorEmisor: undefined,
    tipoContribuyente: pickEnum(tipoContribuyente),
    tipoRegimen: undefined,
    nombreEmisor: faker.company.name(),
    nombreFantasiaEmi: undefined,
    direccionEmision: faker.location.streetAddress(),
    numeroCasa: faker.number.int({ min: 1, max: 5000 }),
    complementoDireccion1: undefined,
    complementoDireccion2: undefined,
    departamentoEmision: pickFromValue(codigoDepartamento),
    distritoEmision: undefined,
    ciudadEmision: pickFromValue(codigoCiudad),
    telefonoEmision: faker.phone.number(),
    correoElectronicoEmisor: faker.internet.email(),
    denominacionSucursal: undefined,
    actividadesEconomicas: many(() => createActividadEconomica(), 1),
    responsableDE: undefined,
    ...overrides
  };
}

export function createReceptor(overrides?: Partial<Receptor>): Receptor {
  return {
    naturalezaReceptor: pickEnum(naturalezaReceptor),
    tipoOperacion: faker.helpers.arrayElement([
      tipoOperacion.B2B,
      tipoOperacion.B2C,
      tipoOperacion.B2G
    ]),
    paisReceptor: codigoPais.Paraguay,
    tipoContribuyenteReceptor: undefined,
    rucReceptor: undefined,
    digitoVerificadorReceptor: undefined,
    tipoDocumentoIdentidadReceptor: undefined,
    numeroDocumentoIdentidad: undefined,
    nombreReceptor: faker.company.name(),
    nombreFantasiaReceptor: undefined,
    direccionReceptor: undefined,
    numeroCasaReceptor: undefined,
    departamentoReceptor: undefined,
    distritoReceptor: undefined,
    ciudadReceptor: undefined,
    telefonoReceptor: undefined,
    celularReceptor: undefined,
    correoElectronicoReceptor: undefined,
    codigoCliente: undefined,
    ...overrides
  };
}
