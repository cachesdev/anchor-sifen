import type { Client as SoapClient, IExOptions as ISoapExOptions } from "soap";
import { createClientAsync as soapCreateClientAsync } from "soap";
import type { REnviConsLoteDe } from "./definitions/REnviConsLoteDe.js";
import type { RResEnviConsLoteDe } from "./definitions/RResEnviConsLoteDe.js";
import type { DeWsConsultasConsutaLoteService } from "./services/DeWsConsultasConsutaLoteService.js";

export interface ConsultaLoteClient extends SoapClient {
    DeWsConsultasConsutaLoteService: DeWsConsultasConsutaLoteService;
    rEnviConsLoteDeAsync(rEnviConsLoteDe: REnviConsLoteDe, options?: ISoapExOptions): Promise<[result: RResEnviConsLoteDe, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create ConsultaLoteClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<ConsultaLoteClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
