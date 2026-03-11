import type { Client as SoapClient, IExOptions as ISoapExOptions } from 'soap';
import { createClientAsync as soapCreateClientAsync } from 'soap';
import type { REnviConsRuc } from './definitions/REnviConsRuc.js';
import type { RResEnviConsRuc } from './definitions/RResEnviConsRuc.js';
import type { DeWsConsultasConsultaRucService } from './services/DeWsConsultasConsultaRucService.js';

export interface ConsultaRucClient extends SoapClient {
  DeWsConsultasConsultaRucService: DeWsConsultasConsultaRucService;
  rEnviConsRUCAsync(
    rEnviConsRuc: REnviConsRuc,
    options?: ISoapExOptions
  ): Promise<[result: RResEnviConsRuc, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create ConsultaRucClient */
export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<ConsultaRucClient> {
  return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
