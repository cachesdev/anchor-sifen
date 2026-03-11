import type { FacturaElectronica } from '../sifen/types/factura';

export interface QRGenerator {
  generateQRData(
    data: FacturaElectronica,
    idCSC: string,
    csc: string,
    env: 'test' | 'prod'
  ): string;
}

// TODO: Hacer clase
export function createQRGenerator(): QRGenerator {
  return {
    generateQRData(
      data: FacturaElectronica,
      idCSC: string,
      csc: string,
      env: 'test' | 'prod'
    ): string {
      // Simplified QR data generation for toy version
      // Real implementation would follow SIFEN QR specification
      const qrData = [
        env, // Environment
        data.de.camposFirmados.id, // CDC
        data.de.camposFirmados.datosGenerales.fechaHoraEmision, // Date
        data.de.camposFirmados.emisor.ruc, // RUC
        data.de.camposFirmados.items.length, // Item count
        '100000', // Total amount (mock)
        idCSC, // CSC ID
        csc // CSC
      ].join('|');

      return qrData;
    }
  };
}
