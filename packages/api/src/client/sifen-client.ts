import { create, fragment } from 'xmlbuilder2';
import { CertificateManager, type PKCS12Source } from '../certificate';
import { attachQRToSignedXML, getQRUrl } from '../qr';
import { SifenSoapClient } from '../soap';
import { XMLSigner, type XMLSignError } from '../xml-sign';
import type { Result } from '../result';

export interface SIFENConfig {
  environment: 'test' | 'prod';
  certificateSource: PKCS12Source;
  idCSC: string;
  csc: string;
}

export class SifenAPI {
  private readonly config: SIFENConfig;
  private readonly xmlSigner = new XMLSigner();
  private readonly certData;
  private readonly soap: SifenSoapClient;

  constructor(config: SIFENConfig) {
    this.config = config;
    this.certData = new CertificateManager().loadPKCS12(config.certificateSource);
    this.soap = new SifenSoapClient({
      certificatePem: this.certData.certificatePem,
      certificatePemKey: this.certData.privateKeyPem,
      environment: config.environment
    });
  }

  async signXML(xml: string): Promise<Result<string, XMLSignError>> {
    const result = await this.xmlSigner.sign(xml, this.certData);
    if (!result.success) return result;
    return { success: true, value: result.value.signedXml };
  }

  generateQR(signedXML: string) {
    return getQRUrl(signedXML, this.config.idCSC, this.config.csc, this.config.environment);
  }

  attachQR(signedXML: string) {
    return attachQRToSignedXML(
      signedXML,
      this.config.idCSC,
      this.config.csc,
      this.config.environment
    );
  }

  consultaRUC(params: { digitoControl: string; ruc: string }) {
    return this.soap.rucClient.consultaRUC(params);
  }

  consultaDE(params: { digitoControl: string | number; cdc: string }) {
    return this.soap.consultaClient.consultaDE(params);
  }

  consultaLote(params: { digitoControl: string | number; numeroLote: string }) {
    return this.soap.consultaLoteClient.consultaLote(params);
  }

  enviarEvento(params: { digitoControl: string | number; eventoXml: string }) {
    return this.soap.eventoClient.enviarEvento(params);
  }

  recibeLote(params: { digitoControl: string | number; DE: string | string[] }) {
    const loteXml = Array.isArray(params.DE) ? buildLote(params.DE) : params.DE;
    return this.soap.recibeLoteClient.recibeLote({
      digitoControl: params.digitoControl,
      DE: loteXml
    });
  }

  recibe(params: { digitoControl: string | number; xmlDE: string }) {
    return this.soap.recibeClient.recibe(params);
  }
}

export function buildLote(deXmls: string[]): string {
  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('http://ekuatia.set.gov.py/sifen/xsd', 'rLoteDE')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att('xsi:schemaLocation', 'http://ekuatia.set.gov.py/sifen/xsd SiRecepLoteDE_v150.xsd');

  root.ele('dVerFor').txt('150').up();

  for (const xml of deXmls) {
    const stripped = xml.replace(/<\?xml[^?]*\?>\s*/g, '').trim();
    root.import(fragment(stripped));
  }

  return root.end({ prettyPrint: true });
}
