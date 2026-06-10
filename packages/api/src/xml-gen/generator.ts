import { create } from 'xmlbuilder2';
import type { PreparedDE } from './de-pipeline';
import type { RGesEve } from '../sifen/types/raw';

const SIFEN_XSD_NAMESPACE = 'http://ekuatia.set.gov.py/sifen/xsd';
const XSI_NAMESPACE = 'http://www.w3.org/2001/XMLSchema-instance';
const DE_SCHEMA_LOCATION = `${SIFEN_XSD_NAMESPACE} siRecepDE_v150.xsd`;
const EVENTO_SCHEMA_LOCATION = `${SIFEN_XSD_NAMESPACE} siRecepEvento_v150.xsd`;

export function generateDEXML({ raw: de, cdc }: PreparedDE): string {
  const xmlPayload = {
    'rDE@http://ekuatia.set.gov.py/sifen/xsd': {
      '@xmlns:xsi': XSI_NAMESPACE,
      '@xsi:schemaLocation': DE_SCHEMA_LOCATION,
      dVerFor: 150,
      DE: {
        '@Id': cdc,
        ...de
      }
    }
  };

  return create({ version: '1.0', encoding: 'UTF-8' })
    .ele(xmlPayload)
    .end({ prettyPrint: false, headless: true });
}

export function generateEventoXML(evento: RGesEve): string {
  const xmlPayload = {
    'gGroupGesEve@http://ekuatia.set.gov.py/sifen/xsd': {
      '@xmlns:xsi': XSI_NAMESPACE,
      '@xsi:schemaLocation': EVENTO_SCHEMA_LOCATION,
      rGesEve: {
        rEve: {
          '@Id': evento.idEvento,
          ...evento.rEve
        }
      }
    }
  };

  return create({ version: '1.0', encoding: 'UTF-8' })
    .ele(xmlPayload)
    .end({ prettyPrint: false, headless: true });
}
