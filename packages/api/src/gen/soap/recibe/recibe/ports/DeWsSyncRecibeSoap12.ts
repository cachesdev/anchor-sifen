import type { REnviDe } from '../definitions/REnviDe.js';
import type { RRetEnviDe } from '../definitions/RRetEnviDe.js';

export interface DeWsSyncRecibeSoap12 {
  rEnviDe(
    rEnviDe: REnviDe,
    callback: (
      err: any,
      result: RRetEnviDe,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any
    ) => void
  ): void;
}
