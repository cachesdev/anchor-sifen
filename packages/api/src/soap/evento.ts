import * as soap from 'soap';
import { createClientAsync, type EventoClient } from '../gen/soap/evento/evento/client.js';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import { normalizeControlId, escapeXml } from './validation.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import type { SIFENEventoResponse } from '../sifen/types/api.js';
import { Err, type Result } from '../result';
import { SifenError } from './sifen-error';
import { parseEvento, parseSIFENResponse } from './response-parsers';

export interface SifenEventoClientOptions {
  agent: Agent;
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenEventoClient {
  private clientPromise: Promise<EventoClient> | undefined;
  private readonly environment: SifenEnvironment;
  private readonly cert: { pem: string; pemKey: string };
  private readonly agent: Agent;

  constructor({ environment, certificatePem, certificatePemKey, agent }: SifenEventoClientOptions) {
    this.environment = environment;
    this.agent = agent;
    this.cert = { pem: certificatePem, pemKey: certificatePemKey };
  }

  private getClient(): Promise<EventoClient> {
    if (this.clientPromise) return this.clientPromise;
    this.clientPromise = (async () => {
      const { wsdl, endpoint } = SIFEN_ENDPOINTS[this.environment].evento;
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

  async enviarEvento({
    digitoControl,
    eventoXml
  }: {
    digitoControl: string | number;
    eventoXml: string;
  }): Promise<Result<SIFENEventoResponse, SifenError>> {
    try {
      const client = await this.getClient();
      const controlId = normalizeControlId(digitoControl);
      const [parsed, raw] = await client.rEnviEventoDeAsync(
        {
          $xml: `<dId>${escapeXml(controlId)}</dId><dEvReg>${eventoXml}</dEvReg>`
        } as never,
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );
      return parseSIFENResponse(parsed, raw, parseEvento);
    } catch (error) {
      return Err(
        new SifenError({
          details: 'Error en enviarEvento',
          cause: error
        })
      );
    }
  }
}
