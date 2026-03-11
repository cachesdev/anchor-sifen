import type { REnviConsLoteDe } from "../definitions/REnviConsLoteDe.js";
import type { RResEnviConsLoteDe } from "../definitions/RResEnviConsLoteDe.js";

export interface DeWsConsultasConsutaLoteSoap12 {
    rEnviConsLoteDe(rEnviConsLoteDe: REnviConsLoteDe, callback: (err: any, result: RResEnviConsLoteDe, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
