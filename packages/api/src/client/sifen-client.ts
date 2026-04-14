import { CertificateManager, type CertificateData } from '../certificate';
import { attachQRToSignedXML } from '../qr';
import { getQRUrl } from '../qr/qr-generator';
import { SifenSoapClient } from '../soap';
import { generateFacturaElectronicaXML } from '../xml-gen';
import type { BuiltDE } from '../xml-gen/factura-electronica';
import { XMLSigner } from '../xml-sign';

export interface SIFENConfig {
  environment: 'test' | 'prod';
  certificatePath: string;
  certificatePassword: string;
  idCSC: string;
  csc: string;
}

export class SifenAPI {
  private readonly config: SIFENConfig;
  private readonly certManager: CertificateManager;
  private readonly xmlSigner: XMLSigner;

  // @ts-expect-error — Usado luego
  private readonly sifenSoapClients: SifenSoapClient;
  private readonly certificateData: CertificateData;

  constructor(config: SIFENConfig) {
    this.config = config;
    this.certManager = new CertificateManager();
    this.xmlSigner = new XMLSigner();

    this.certificateData = this.certManager.loadPKCS12(
      config.certificatePath,
      config.certificatePassword
    );

    // SOAP
    this.sifenSoapClients = new SifenSoapClient({
      certificatePem: this.certificateData.certificatePem,
      certificatePemKey: this.certificateData.privateKeyPem,
      environment: config.environment
    });
  }

  async generateFEXML(data: BuiltDE): Promise<string> {
    return generateFacturaElectronicaXML(data);
  }

  async signXML(xml: string): Promise<string> {
    return (await this.xmlSigner.signDocument(xml, this.certificateData)).signedXml;
  }

  /** Retorna la URL del código QR */
  async generateQR(signedXML: string): Promise<string> {
    return getQRUrl(signedXML, this.config.idCSC, this.config.csc, this.config.environment);
  }

  /** Genera y inserta la URL del código QR en el XML firmado */
  async attachQR(signedXML: string): Promise<string> {
    return attachQRToSignedXML(
      signedXML,
      this.config.idCSC,
      this.config.csc,
      this.config.environment
    );
  }

  // async consultaRUC({ digitoControl, ruc }: { digitoControl: string; ruc: string }) {
  //   const { rucClient } = this.sifenSoapClients;
  //   return rucClient.consultaRUC({ ruc, digitoControl });
  // }

  // async recibeLote({ digitoControl, DE }: { digitoControl: string; DE: string }) {
  //   const { recibeLoteClient } = this.sifenSoapClients;
  //   return recibeLoteClient.recibeLote({ digitoControl, DE });
  // }
}
