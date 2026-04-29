import * as soap from 'soap';
import {
  createClientAsync,
  type ConsultaLoteClient
} from '../gen/soap/consultaLote/consultalote/client.js';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import { normalizeControlId } from './validation.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import type { SIFENConsultaLoteResponse } from '../sifen/types/api.js';
import { Err, type Result } from '../result';
import { SifenError } from './sifen-error';
import { parseConsultaLote } from './response-parsers';

export interface SifenConsultaLoteClientOptions {
  agent: Agent;
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenConsultaLoteClient {
  private clientPromise: Promise<ConsultaLoteClient> | undefined;
  private readonly environment: SifenEnvironment;
  private readonly cert: { pem: string; pemKey: string };
  private readonly agent: Agent;

  constructor({
    environment,
    certificatePem,
    certificatePemKey,
    agent
  }: SifenConsultaLoteClientOptions) {
    this.environment = environment;
    this.agent = agent;
    this.cert = { pem: certificatePem, pemKey: certificatePemKey };
  }

  private getClient(): Promise<ConsultaLoteClient> {
    if (this.clientPromise) return this.clientPromise;
    this.clientPromise = (async () => {
      const { wsdl, endpoint } = SIFEN_ENDPOINTS[this.environment].consultaLote;
      const client = await createClientAsync(wsdl, {
        endpoint,
        forceSoap12Headers: true,
        wsdl_options: { httpsAgent: this.agent }
      });
      client.setSecurity(
        new soap.ClientSSLSecurity(Buffer.from(this.cert.pemKey), Buffer.from(this.cert.pem), {
          minVersion: 'TLSv1.2'
        })
      );
      client.addSoapHeader(SOAP_HEADER_XML);
      return client;
    })();
    return this.clientPromise;
  }

  async consultaLote({
    digitoControl,
    numeroLote
  }: {
    digitoControl?: string | number;
    numeroLote: string;
  }): Promise<Result<SIFENConsultaLoteResponse, SifenError>> {
    try {
      const client = await this.getClient();
      const controlId = normalizeControlId(digitoControl);
      const [result] = await client.rEnviConsLoteDeAsync(
        { dId: controlId, dProtConsLote: numeroLote },
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );
      return parseConsultaLote(result);
    } catch (error) {
      return Err(
        new SifenError({
          details: 'Error en consultaLote',
          cause: error
        })
      );
    }
  }
}
