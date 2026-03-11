import type { Client as SoapClient, IExOptions as ISoapExOptions } from 'soap';
import { createClientAsync as soapCreateClientAsync } from 'soap';
import type { REnviConsDeRequest } from './definitions/REnviConsDeRequest.js';
import type { REnviConsDeResponse } from './definitions/REnviConsDeResponse.js';
import type { DeWsConsultasConsultaService } from './services/DeWsConsultasConsultaService.js';

export interface ConsultaClient extends SoapClient {
  DeWsConsultasConsultaService: DeWsConsultasConsultaService;
  rEnviConsDeAsync(
    rEnviConsDeRequest: REnviConsDeRequest,
    options?: ISoapExOptions
  ): Promise<[result: REnviConsDeResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create ConsultaClient */
export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<ConsultaClient> {
  return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
