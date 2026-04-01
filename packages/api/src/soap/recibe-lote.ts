import * as soap from 'soap';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import { mapSoapError } from './errors.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import { escapeXml } from './validation.js';
import {
  createClientAsync,
  type RecibeLoteClient
} from '../gen/soap/recibeLote/recibelote/client.js';
import type { SIFENRecepLoteDEResponse } from '../sifen/types/api.js';

export interface SifenRecibeLoteClientOptions {
  agent: Agent;
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenRecibeLoteClient {
  private clientPromise: Promise<RecibeLoteClient> | undefined;
  private readonly environment: SifenEnvironment;
  private readonly agent: Agent;
  private readonly cert: {
    pem: string;
    pemKey: string;
  };

  constructor({
    environment,
    certificatePem,
    certificatePemKey,
    agent
  }: SifenRecibeLoteClientOptions) {
    this.environment = environment;
    this.agent = agent;
    this.cert = {
      pem: certificatePem,
      pemKey: certificatePemKey
    };
  }

  private getClient(): Promise<RecibeLoteClient> {
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

  async recibeLote({
    digitoControl,
    DE
  }: {
    digitoControl: string;
    DE: string;
  }): Promise<SIFENRecepLoteDEResponse> {
    try {
      const client = await this.getClient();

      const data = await client.rEnvioLoteAsync(
        {
          $xml: `<dId>${escapeXml(digitoControl)}</dId><xDE>${escapeXml(DE)}</xDE>`
        } as never,
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );

      const parsed = data[0];

      return {
        codigoResultado: parseInt(parsed.dCodRes!),
        fechaProcesamiento: new Date(parsed.dFecProc!),
        mensajeResultado: parsed.dMsgRes!,
        numeroLote: parseInt(parsed.dProtConsLote!),
        tiempoProcesamiento: parsed.dTpoProces!
      };
    } catch (error) {
      throw mapSoapError(error);
    }
  }
}
