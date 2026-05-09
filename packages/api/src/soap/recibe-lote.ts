import * as soap from 'soap';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import { normalizeControlId, escapeXml } from './validation.js';
import {
  createClientAsync,
  type RecibeLoteClient
} from '../gen/soap/recibeLote/recibelote/client.js';
import type { SIFENRecepLoteDEResponse } from '../sifen/types/api.js';
import { strToU8, zipSync } from 'fflate';
import { Err, type Result } from '../result';
import { SifenError } from './sifen-error';
import { parseRecibeLote, parseSIFENResponse } from './response-parsers';

const MAX_SIRECEPLOTEDE_SIZE_BYTES = 10000 * 1024;

function encodeLoteToBase64Zip(loteXml: string): string {
  const trimmed = loteXml.trim();
  if (!trimmed) throw new Error('DE no puede estar vacio.');

  const loteZip = zipSync({ 'lote.xml': strToU8(trimmed) });
  if (loteZip.byteLength > MAX_SIRECEPLOTEDE_SIZE_BYTES) {
    throw new Error(
      `DE comprimido no puede exceder 10000 KB. Tamano actual: ${loteZip.byteLength} bytes.`
    );
  }
  return Buffer.from(loteZip).toString('base64');
}

export interface SifenRecibeLoteClientOptions {
  agent: Agent;
  environment: SifenEnvironment;
  certificatePem: string;
  certificatePemKey: string;
}

export class SifenRecibeLoteClient {
  private clientPromise: Promise<RecibeLoteClient> | undefined;
  private readonly environment: SifenEnvironment;
  private readonly cert: { pem: string; pemKey: string };
  private readonly agent: Agent;

  constructor({
    environment,
    certificatePem,
    certificatePemKey,
    agent
  }: SifenRecibeLoteClientOptions) {
    this.environment = environment;
    this.agent = agent;
    this.cert = { pem: certificatePem, pemKey: certificatePemKey };
  }

  private getClient(): Promise<RecibeLoteClient> {
    if (this.clientPromise) return this.clientPromise;
    this.clientPromise = (async () => {
      const { wsdl, endpoint } = SIFEN_ENDPOINTS[this.environment].recibeLote;
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
    digitoControl: string | number;
    DE: string;
  }): Promise<Result<SIFENRecepLoteDEResponse, SifenError>> {
    try {
      const client = await this.getClient();
      const controlId = normalizeControlId(digitoControl);
      const loteZipBase64 = encodeLoteToBase64Zip(DE);

      const [parsed, raw, _, out] = await client.rEnvioLoteAsync(
        {
          $xml: `<dId>${escapeXml(controlId)}</dId><xDE>${loteZipBase64}</xDE>`
        } as never,
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );
      console.log(out);
      return parseSIFENResponse(parsed, raw, parseRecibeLote);
    } catch (error) {
      return Err(
        new SifenError({
          details: 'Error en recibeLote',
          cause: error
        })
      );
    }
  }
}
