import type { REnvioLote } from '../definitions/REnvioLote.js';
import type { RResEnviLoteDe } from '../definitions/RResEnviLoteDe.js';

export interface DeWsAsyncRecibeSoap12 {
  rEnvioLote(
    rEnvioLote: REnvioLote,
    callback: (
      err: any,
      result: RResEnviLoteDe,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any
    ) => void
  ): void;
}
