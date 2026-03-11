import type { REnviEventoDe } from '../definitions/REnviEventoDe.js';
import type { RRetEnviEventoDe } from '../definitions/RRetEnviEventoDe.js';

export interface DeWsEventosEventoSoap12 {
  rEnviEventoDe(
    rEnviEventoDe: REnviEventoDe,
    callback: (
      err: any,
      result: RRetEnviEventoDe,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any
    ) => void
  ): void;
}
