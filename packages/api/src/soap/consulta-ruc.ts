import * as soap from 'soap';
import { createClientAsync } from '../gen/soap/consultaRuc/consultaruc/client.js';
import type { ConsultaRucClient } from '../gen/soap/consultaRuc/consultaruc/client.js';
import { SIFEN_ENDPOINTS, SOAP_HEADER_XML } from './config.js';
import { mapSoapError } from './errors.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';

// FIXME: no coincide
export interface RUCQueryResult {
  ruc: string;
  dv: number;
  razonSocial: string;
  estado: string;
  tipContribuyente?: number;
  nombreFantasia?: string;
}

const SIFEN_NS = 'http://ekuatia.set.gov.py/sifen/xsd';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface SifenRucClientOptions {
  agent: Agent;
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenRucClient {
  private clientPromise: Promise<ConsultaRucClient> | undefined;
  private readonly environment: SifenEnvironment;
  private readonly agent: Agent;
  private readonly cert: {
    pem: string;
    pemKey: string;
  };

  constructor({ environment, certificatePem, certificatePemKey, agent }: SifenRucClientOptions) {
    this.environment = environment;
    this.agent = agent;
    this.cert = {
      pem: certificatePem,
      pemKey: certificatePemKey
    };
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

  async consultaRUC(ruc: string, dv: string) {
    try {
      const client = await this.getClient();

      const data = await client.rEnviConsRUCAsync(
        {
          $xml: `<dId>${escapeXml(dv)}</dId><dRUCCons>${escapeXml(ruc)}</dRUCCons>`
        } as never,
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );

      const body = data[0];

      return {
        code: body.dCodRes,
        message: body.dMsgRes,
        data: body.xContRUC ?? null
      };
    } catch (error) {
      throw mapSoapError(error);
    }
  }
}
