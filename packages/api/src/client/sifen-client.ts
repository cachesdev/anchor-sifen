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

  async sendDE(preparedDE: PreparedDE) {
    const xml = generateFacturaElectronicaXML(preparedDE);
    const signed = await this.signXML(xml);
    const withQR = await this.attachQR(signed);
    return this.soap.recibeLoteClient.recibeLote({ DE: withQR });
  }

  async sendBatch(deList: PreparedDE[]) {
    return Promise.all(deList.map((de) => this.sendDE(de)));
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
