export type { FacturaElectronica } from './sifen/types/old_do_not_use/factura';
export { SifenAPI, type SIFENConfig } from './client/sifen-client';
export { type XMLGenerator } from './xml-gen/old_generator';
export { attachQRToSignedXML } from './qr/qr-generator';
export * from './sifen/types/old_do_not_use';
export { type CertificateData, CertificateManager } from './certificate/certificate-manager';

export { XMLGen } from './xml-gen/old_generator';
export * from './xml-gen/mapper';

export { XMLSigner } from './xml-sign/xml-signer';
