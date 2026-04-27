import { create, fragment } from 'xmlbuilder2';
import { CertificateManager, type CertificateData } from '../certificate';
import { attachQRToSignedXML } from '../qr';
import { getQRUrl } from '../qr/qr-generator';
import { SifenSoapClient } from '../soap';
import { XMLSigner } from '../xml-sign';

export interface SIFENConfig {
  environment: 'test' | 'prod';
  certificatePath?: string;
  certificatePassword?: string;
  certificateData?: CertificateData;
  idCSC: string;
  csc: string;
}

export class SifenAPI {
  private readonly config: SIFENConfig;
  private readonly xmlSigner = new XMLSigner();
  private _certData?: CertificateData;
  private _soap?: SifenSoapClient;

  constructor(config: SIFENConfig) {
    this.config = config;
    this._certData = config.certificateData;
  }

  private get certData(): CertificateData {
    if (this._certData) return this._certData;
    this._certData = new CertificateManager().loadPKCS12(
      this.config.certificatePath!,
      this.config.certificatePassword!
    );
    return this._certData;
  }

  private get soap(): SifenSoapClient {
    if (this._soap) return this._soap;
    const cd = this.certData;
    this._soap = new SifenSoapClient({
      certificatePem: cd.certificatePem,
      certificatePemKey: cd.privateKeyPem,
      environment: this.config.environment
    });
    return this._soap;
  }

  async signXML(xml: string): Promise<string> {
    return (await this.xmlSigner.sign(xml, this.certData)).signedXml;
  }

  async generateQR(signedXML: string): Promise<string> {
    return getQRUrl(signedXML, this.config.idCSC, this.config.csc, this.config.environment);
  }

  async attachQR(signedXML: string): Promise<string> {
    return attachQRToSignedXML(
      signedXML,
      this.config.idCSC,
      this.config.csc,
      this.config.environment
    );
  }

  async consultaRUC({ digitoControl, ruc }: { digitoControl: string; ruc: string }) {
    return this.soap.rucClient.consultaRUC({ ruc, digitoControl });
  }

  async consultaDE({ digitoControl, cdc }: { digitoControl?: string | number; cdc: string }) {
    return this.soap.consultaClient.consultaDE({ digitoControl, cdc });
  }

  async consultaLote({
    digitoControl,
    numeroLote
  }: {
    digitoControl?: string | number;
    numeroLote: string;
  }) {
    return this.soap.consultaLoteClient.consultaLote({ digitoControl, numeroLote });
  }

  async enviarEvento({
    digitoControl,
    eventoXml
  }: {
    digitoControl?: string | number;
    eventoXml: string;
  }) {
    return this.soap.eventoClient.enviarEvento({ digitoControl, eventoXml });
  }

  async recibeLote({
    digitoControl,
    DE
  }: {
    digitoControl?: string | number;
    DE: string | string[];
  }) {
    const loteXml = Array.isArray(DE) ? buildLote(DE) : DE;
    return this.soap.recibeLoteClient.recibeLote({ digitoControl, DE: loteXml });
  }
}

function buildLote(deXmls: string[]): string {
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
