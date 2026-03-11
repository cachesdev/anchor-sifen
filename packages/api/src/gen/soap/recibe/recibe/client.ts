import type { Client as SoapClient, IExOptions as ISoapExOptions } from 'soap';
import { createClientAsync as soapCreateClientAsync } from 'soap';
import type { REnviDe } from './definitions/REnviDe.js';
import type { RRetEnviDe } from './definitions/RRetEnviDe.js';
import type { DeWsSyncRecibeService } from './services/DeWsSyncRecibeService.js';

export interface RecibeClient extends SoapClient {
  DeWsSyncRecibeService: DeWsSyncRecibeService;
  rEnviDeAsync(
    rEnviDe: REnviDe,
    options?: ISoapExOptions
  ): Promise<[result: RRetEnviDe, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create RecibeClient */
export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<RecibeClient> {
  return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
