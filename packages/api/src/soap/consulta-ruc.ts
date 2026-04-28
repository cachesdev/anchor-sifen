import * as soap from 'soap';
import { createClientAsync, type ConsultaRucClient } from '../gen/soap/consultaRuc/consultaruc/client.js';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import { escapeXml } from './validation.js';
import type { SIFENConsRUCResponse } from '../sifen/types/api.js';
import { Err, type Result } from '../result';
import { SifenError } from './sifen-error';
import { parseConsultaRuc } from './response-parsers';

export interface SifenRucClientOptions {
  agent: Agent;
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenRucClient {
  private clientPromise: Promise<ConsultaRucClient> | undefined;
  private readonly environment: SifenEnvironment;
  private readonly cert: { pem: string; pemKey: string };
  private readonly agent: Agent;

  constructor({ environment, certificatePem, certificatePemKey, agent }: SifenRucClientOptions) {
    this.environment = environment;
    this.agent = agent;
    this.cert = { pem: certificatePem, pemKey: certificatePemKey };
  }

  private getClient(): Promise<ConsultaRucClient> {
    if (this.clientPromise) return this.clientPromise;
    this.clientPromise = (async () => {
      const { wsdl, endpoint } = SIFEN_ENDPOINTS[this.environment].consultaRuc;
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

  async consultaRUC({
    digitoControl,
    ruc
  }: {
    digitoControl: string;
    ruc: string;
  }): Promise<Result<SIFENConsRUCResponse, SifenError>> {
    try {
      const client = await this.getClient();
      const data = await client.rEnviConsRUCAsync(
        {
          $xml: `<dId>${escapeXml(digitoControl)}</dId><dRUCCons>${escapeXml(ruc)}</dRUCCons>`
        } as never,
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );
      return parseConsultaRuc(data[0]);
    } catch (error) {
      return Err(new SifenError({
        details: 'Error en consulta RUC',
        cause: error
      }));
    }
  }
}
