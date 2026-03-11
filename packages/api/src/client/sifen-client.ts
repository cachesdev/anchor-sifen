import { CertificateManager, type CertificateData } from '../certificate';
import { createQRGenerator, type QRGenerator } from '../qr';
import type { FacturaElectronica } from '../sifen/types';
import { SifenSoapClient } from '../soap';
import { createXMLGenerator, type XMLGenerator } from '../xml-gen';
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
  private readonly xmlGenerator: XMLGenerator;
  private readonly xmlSigner: XMLSigner;
  private readonly qrGenerator: QRGenerator;
  private readonly sifenSoapClients: SifenSoapClient;
  private readonly certificateData: CertificateData;

  constructor(config: SIFENConfig) {
    this.config = config;
    this.certManager = new CertificateManager();
    this.xmlGenerator = createXMLGenerator();
    this.xmlSigner = new XMLSigner();
    this.qrGenerator = createQRGenerator();
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

  async generateFacturaElectronica(data: FacturaElectronica): Promise<{
    xml: string;
    signedXml: string;
    qrData: string;
  }> {
    // Generate XML
    const xml = this.xmlGenerator.generateFacturaElectronica(data);

    // Sign XML
    const signedXml = await this.xmlSigner.signDocument(xml, this.certificateData);

    // Generate QR data
    const qrData = this.qrGenerator.generateQRData(
      data,
      this.config.idCSC,
      this.config.csc,
      this.config.environment
    );

    return {
      xml,
      signedXml,
      qrData
    };
  }

  async consultaRUC(ruc: string, checkDigit: string) {
    const { rucClient } = this.sifenSoapClients;
    return rucClient.consultaRUC(ruc, checkDigit);
  }
}
