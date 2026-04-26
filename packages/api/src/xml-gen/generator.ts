import { create } from 'xmlbuilder2';
import type { PreparedDE } from './de-pipeline';

const SIFEN_XSD_NAMESPACE = 'http://ekuatia.set.gov.py/sifen/xsd';
const XSI_NAMESPACE = 'http://www.w3.org/2001/XMLSchema-instance';
const SCHEMA_LOCATION = `${SIFEN_XSD_NAMESPACE} siRecepDE_v150.xsd`;

export function generateFacturaElectronicaXML({ raw: de, cdc }: PreparedDE): string {
  const xmlPayload = {
    'rDE@http://ekuatia.set.gov.py/sifen/xsd': {
      '@xmlns:xsi': XSI_NAMESPACE,
      '@xsi:schemaLocation': SCHEMA_LOCATION,
      dVerFor: 150,
      DE: {
        '@Id': cdc,
        ...de
      }
    }
  };

  return create({ version: '1.0', encoding: 'UTF-8' }).ele(xmlPayload).end({ prettyPrint: true });
}
