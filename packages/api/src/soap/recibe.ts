import * as soap from 'soap';
import { createClientAsync, type RecibeClient } from '../gen/soap/recibe/recibe/client.js';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import { normalizeControlId, escapeXml } from './validation.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import type { SIFENRecibeResponse } from '../sifen/types/api.js';
import { Err, type Result } from '../result';
import { SifenError } from './sifen-error';
import { parseRecibe, parseSIFENResponse } from './response-parsers';

export interface SifenRecibeClientOptions {
  agent: Agent;
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenRecibeClient {
  private clientPromise: Promise<RecibeClient> | undefined;
  private readonly environment: SifenEnvironment;
  private readonly cert: { pem: string; pemKey: string };
  private readonly agent: Agent;

  constructor({ environment, certificatePem, certificatePemKey, agent }: SifenRecibeClientOptions) {
    this.environment = environment;
    this.agent = agent;
    this.cert = { pem: certificatePem, pemKey: certificatePemKey };
  }

  private getClient(): Promise<RecibeClient> {
    if (this.clientPromise) return this.clientPromise;
    this.clientPromise = (async () => {
      const { wsdl, endpoint } = SIFEN_ENDPOINTS[this.environment].recibe;
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

  async recibe({
    digitoControl,
    xmlDE
  }: {
    digitoControl: string | number;
    xmlDE: string;
  }): Promise<Result<SIFENRecibeResponse, SifenError>> {
    try {
      const client = await this.getClient();
      const controlId = normalizeControlId(digitoControl);
      const [parsed, raw] = await client.rEnviDeAsync(
        {
          $xml: `<dId>${escapeXml(controlId)}</dId><xDE>${xmlDE}</xDE>`
        } as never,
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );
      return parseSIFENResponse(parsed, raw, parseRecibe);
    } catch (error) {
      return Err(
        new SifenError({
          details: 'Error en recibe',
          cause: error
        })
      );
    }
  }
}
