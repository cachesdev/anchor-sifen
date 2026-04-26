import { CertificateManager, type CertificateData } from '../certificate';
import { attachQRToSignedXML } from '../qr';
import { getQRUrl } from '../qr/qr-generator';
import { SifenSoapClient } from '../soap';
import { generateFacturaElectronicaXML } from '../xml-gen';
import type { PreparedDE } from '../xml-gen/de-pipeline';
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

  async sendDE(preparedDE: PreparedDE, opts?: { digitoControl?: string | number }) {
    const xml = generateFacturaElectronicaXML(preparedDE);
    const signed = await this.signXML(xml);
    const withQR = await this.attachQR(signed);
    return this.soap.recibeLoteClient.recibeLote({
      digitoControl: opts?.digitoControl,
      DE: withQR
    });
  }

  async sendBatch(deList: PreparedDE[], opts?: { digitoControl?: string | number }) {
    const xmls = await Promise.all(
      deList.map(async (de) => this.attachQR(await this.signXML(generateFacturaElectronicaXML(de))))
    );
    const lote = buildLoteXml(xmls);
    return this.soap.recibeLoteClient.recibeLote({
      digitoControl: opts?.digitoControl,
      DE: lote
    });
  }

  async recibeLote({
    digitoControl,
    DE,
    payloadFormat
  }: {
    digitoControl?: string | number;
    DE: string;
    payloadFormat?: 'xml' | 'zip-base64';
  }) {
    return this.soap.recibeLoteClient.recibeLote({ digitoControl, DE, payloadFormat });
  }
}

function buildLoteXml(deXmls: string[]): string {
  const inner = deXmls.map((xml) => xml.replace(/<\?xml[^?]*\?>\s*/g, '').trim()).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rLoteDE xmlns="http://ekuatia.set.gov.py/sifen/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://ekuatia.set.gov.py/sifen/xsd SiRecepLoteDE_v150.xsd">
  <dVerFor>150</dVerFor>
${inner}
</rLoteDE>`;
}
