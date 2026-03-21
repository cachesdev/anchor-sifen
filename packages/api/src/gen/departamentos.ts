/**
 * Referencias geograficas: Departamentos de Paraguay.
 * Generado por scripts/referencia-geografica.ts
 */
export const codigoDepartamento = {
  Capital: 1,
  Concepcion: 2,
  SanPedro: 3,
  Cordillera: 4,
  Guaira: 5,
  Caaguazu: 6,
  Caazapa: 7,
  Itapua: 8,
  Misiones: 9,
  Paraguari: 10,
  AltoParana: 11,
  Central: 12,
  Neembucu: 13,
  Amambay: 14,
  PteHayes: 15,
  Boqueron: 16,
  AltoParaguay: 17,
  Canindeyu: 18,
} as const;

export type CodigoDepartamento = (typeof codigoDepartamento)[keyof typeof codigoDepartamento];

export const descripcionCodigoDepartamento = {
  [codigoDepartamento.Capital]: 'CAPITAL',
  [codigoDepartamento.Concepcion]: 'CONCEPCION',
  [codigoDepartamento.SanPedro]: 'SAN PEDRO',
  [codigoDepartamento.Cordillera]: 'CORDILLERA',
  [codigoDepartamento.Guaira]: 'GUAIRA',
  [codigoDepartamento.Caaguazu]: 'CAAGUAZU',
  [codigoDepartamento.Caazapa]: 'CAAZAPA',
  [codigoDepartamento.Itapua]: 'ITAPUA',
  [codigoDepartamento.Misiones]: 'MISIONES',
  [codigoDepartamento.Paraguari]: 'PARAGUARI',
  [codigoDepartamento.AltoParana]: 'ALTO PARANA',
  [codigoDepartamento.Central]: 'CENTRAL',
  [codigoDepartamento.Neembucu]: 'NEEMBUCU',
  [codigoDepartamento.Amambay]: 'AMAMBAY',
  [codigoDepartamento.PteHayes]: 'PTE. HAYES',
  [codigoDepartamento.Boqueron]: 'BOQUERON',
  [codigoDepartamento.AltoParaguay]: 'ALTO PARAGUAY',
  [codigoDepartamento.Canindeyu]: 'CANINDEYU',
} as const;

export type DescripcionCodigoDepartamento = (typeof descripcionCodigoDepartamento)[keyof typeof descripcionCodigoDepartamento];
