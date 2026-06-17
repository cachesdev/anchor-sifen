import type { DEC } from '../../../sifen/types';
import type { ValidationRule } from '../types';

export const calculatedDocumentRules: ValidationRule<DEC>[] = [
  {
    id: 'D022',
    description: 'NT 012: Autofactura Electronica debe usar moneda PYG.',
    tags: ['nt-012', 'autofactura', 'moneda'],
    when: (doc) => doc.tipoDE === 'AutofacturaElectronica',
    check: (doc) => doc.datosGeneralesOperacion.operacionComercial?.monedaOperacion === 'PYG',
    message: (doc) => {
      const moneda =
        doc.datosGeneralesOperacion.operacionComercial?.monedaOperacion ?? 'sin moneda';
      return `Autofactura Electronica (C002=4) debe usar moneda PYG (D015=PYG); recibido ${moneda}.`;
    }
  }
];
