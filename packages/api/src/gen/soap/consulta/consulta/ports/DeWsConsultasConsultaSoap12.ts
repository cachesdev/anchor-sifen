import type { REnviConsDeRequest } from "../definitions/REnviConsDeRequest.js";
import type { REnviConsDeResponse } from "../definitions/REnviConsDeResponse.js";

export interface DeWsConsultasConsultaSoap12 {
    rEnviConsDe(rEnviConsDeRequest: REnviConsDeRequest, callback: (err: any, result: REnviConsDeResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
