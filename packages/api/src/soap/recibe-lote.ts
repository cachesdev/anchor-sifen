import * as soap from 'soap';
import { SIFEN_ENDPOINTS, SIFEN_NS, SOAP_HEADER_XML } from './config.js';
import { mapSoapError } from './errors.js';
import type { SifenEnvironment } from './client.js';
import type { Agent } from 'node:https';
import { normalizeControlId } from './validation.js';
import {
  createClientAsync,
  type RecibeLoteClient
} from '../gen/soap/recibeLote/recibelote/client.js';
import type { SIFENRecepLoteDEResponse } from '../sifen/types/api.js';
import { strToU8, zipSync } from 'fflate';

const MAX_SIRECEPLOTEDE_SIZE_BYTES = 10000 * 1024;

const LOTE_ZIP_FILE_NAME = 'lote.xml';

interface ParsedRecibeLoteResponse {
  dFecProc?: string;
  dCodRes?: string;
  dMsgRes?: string;
  dProtConsLote?: string;
  dTpoProces?: number;
}

type LotePayloadFormat = 'xml' | 'zip-base64';

function ensureRequiredField<T>(value: T | undefined, fieldName: string): T {
  if (value === undefined || value === null) {
    throw new Error(`Respuesta de SIFEN incompleta: falta ${fieldName}.`);
  }

  return value;
}

function parseNumericField(value: string | number, fieldName: string): number {
  const numericValue =
    typeof value === 'number' ? value : Number.parseInt(String(value).trim(), 10);

  if (!Number.isFinite(numericValue)) {
    throw new Error(`Respuesta de SIFEN invalida: ${fieldName} no es numerico.`);
  }

  return numericValue;
}

function parseDateField(value: string, fieldName: string): Date {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Respuesta de SIFEN invalida: ${fieldName} no tiene formato de fecha valido.`);
  }

  return parsed;
}

function normalizeLoteXml(loteXml: string): string {
  const normalized = loteXml.trim();

  if (!normalized) {
    throw new Error('DE no puede estar vacio.');
  }

  return normalized;
}

function normalizeLoteZipBase64(loteZipBase64: string): string {
  const normalized = loteZipBase64.trim();

  if (!normalized) {
    throw new Error('DE no puede estar vacio.');
  }

  if (normalized.length % 4 !== 0 || !/^[A-Za-z0-9+/]+=*$/.test(normalized)) {
    throw new Error('DE debe ser un ZIP codificado en Base64 valido.');
  }

  const loteZipBuffer = Buffer.from(normalized, 'base64');

  if (loteZipBuffer.byteLength > MAX_SIRECEPLOTEDE_SIZE_BYTES) {
    throw new Error(
      `DE comprimido no puede exceder 10000 KB. Tamano actual: ${loteZipBuffer.byteLength} bytes.`
    );
  }

  return normalized;
}

function encodeLoteToBase64Zip(loteXml: string): string {
  const loteZip = zipSync({
    [LOTE_ZIP_FILE_NAME]: strToU8(loteXml)
  });

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
    DE,
    payloadFormat = 'xml'
  }: {
    digitoControl?: string | number;
    DE: string;
    payloadFormat?: LotePayloadFormat;
  }): Promise<SIFENRecepLoteDEResponse> {
    try {
      const client = await this.getClient();
      const controlId = normalizeControlId(digitoControl);
      const loteZipBase64 =
        payloadFormat === 'zip-base64'
          ? normalizeLoteZipBase64(DE)
          : encodeLoteToBase64Zip(normalizeLoteXml(DE));

      const [parsed] = await client.rEnvioLoteAsync(
        {
          dId: controlId,
          xDE: loteZipBase64
        },
        {
          overrideRootElement: {
            namespace: '',
            xmlnsAttributes: [{ name: 'xmlns', value: SIFEN_NS }]
          }
        }
      );

      const parsedResponse = parsed as ParsedRecibeLoteResponse;

      const codigoResultado = parseNumericField(
        ensureRequiredField(parsedResponse.dCodRes, 'dCodRes'),
        'dCodRes'
      );
      const fechaProcesamiento = parseDateField(
        ensureRequiredField(parsedResponse.dFecProc, 'dFecProc'),
        'dFecProc'
      );
      const mensajeResultado = ensureRequiredField(parsedResponse.dMsgRes, 'dMsgRes');
      const tiempoProcesamiento = parseNumericField(
        ensureRequiredField(parsedResponse.dTpoProces, 'dTpoProces'),
        'dTpoProces'
      );

      const numeroLote = parsedResponse.dProtConsLote
        ? parseNumericField(parsedResponse.dProtConsLote, 'dProtConsLote')
        : undefined;

      return {
        codigoResultado,
        fechaProcesamiento,
        mensajeResultado,
        numeroLote,
        tiempoProcesamiento
      };
    } catch (error) {
      throw mapSoapError(error);
    }
  }
}
