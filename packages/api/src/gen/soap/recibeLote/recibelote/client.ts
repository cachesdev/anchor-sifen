import type { Client as SoapClient, IExOptions as ISoapExOptions } from 'soap';
import { createClientAsync as soapCreateClientAsync } from 'soap';
import type { REnvioLote } from './definitions/REnvioLote.js';
import type { RResEnviLoteDe } from './definitions/RResEnviLoteDe.js';
import type { DeWsAsyncRecibeService } from './services/DeWsAsyncRecibeService.js';

export interface RecibeLoteClient extends SoapClient {
  DeWsAsyncRecibeService: DeWsAsyncRecibeService;
  rEnvioLoteAsync(
    rEnvioLote: REnvioLote,
    options?: ISoapExOptions
  ): Promise<[result: RResEnviLoteDe, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create RecibeLoteClient */
export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<RecibeLoteClient> {
  return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
