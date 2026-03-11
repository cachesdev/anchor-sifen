import type { REnviConsRuc } from "../definitions/REnviConsRuc.js";
import type { RResEnviConsRuc } from "../definitions/RResEnviConsRuc.js";

export interface DeWsConsultasConsultaRucSoap12 {
    rEnviConsRUC(rEnviConsRuc: REnviConsRuc, callback: (err: any, result: RResEnviConsRuc, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
