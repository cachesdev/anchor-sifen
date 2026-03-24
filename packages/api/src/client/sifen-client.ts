import { CertificateManager, type CertificateData } from '../certificate';
import { createQRGenerator, type QRGenerator } from '../qr';
import type { FacturaElectronica } from '../sifen/types';
import { SifenSoapClient } from '../soap';
import { XMLGen } from '../xml-gen';
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
  private readonly xmlGen: XMLGen;
  private readonly xmlSigner: XMLSigner;
  private readonly qrGenerator: QRGenerator;
  private readonly sifenSoapClients: SifenSoapClient;
  private readonly certificateData: CertificateData;

  constructor(config: SIFENConfig) {
    this.config = config;
    this.certManager = new CertificateManager();
    this.xmlGen = new XMLGen();
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

  async generateFEXML(data: FacturaElectronica): Promise<string> {
    return this.xmlGen.generateFacturaElectronica(data);
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
