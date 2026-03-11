import type { Client as SoapClient, IExOptions as ISoapExOptions } from "soap";
import { createClientAsync as soapCreateClientAsync } from "soap";
import type { REnviEventoDe } from "./definitions/REnviEventoDe.js";
import type { RRetEnviEventoDe } from "./definitions/RRetEnviEventoDe.js";
import type { DeWsEventosEventoService } from "./services/DeWsEventosEventoService.js";

export interface EventoClient extends SoapClient {
    DeWsEventosEventoService: DeWsEventosEventoService;
    rEnviEventoDeAsync(rEnviEventoDe: REnviEventoDe, options?: ISoapExOptions): Promise<[result: RRetEnviEventoDe, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create EventoClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<EventoClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
