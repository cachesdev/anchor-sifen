import * as soap from 'soap';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import { mapSoapError } from './errors.js';
import { normalizeControlId } from './validation.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import { createClientAsync, type EventoClient } from '../gen/soap/evento/evento/client.js';

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
    digitoControl?: string | number;
    eventoXml: string;
  }) {
    try {
      const client = await this.getClient();
      const controlId = normalizeControlId(digitoControl);
      const [result] = await client.rEnviEventoDeAsync(
        { dId: controlId, dEvReg: eventoXml } as never,
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );
      return result;
    } catch (error) {
      throw mapSoapError(error);
    }
  }
}
