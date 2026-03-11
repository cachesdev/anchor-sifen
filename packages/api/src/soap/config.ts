import path from 'path';
import { fileURLToPath } from 'url';
import type { SifenEnvironment } from './client';

interface SifenEndpointConfig {
  wsdl: string;
  endpoint: string;
}

export type SifenService =
  | 'recibe'
  | 'recibeLote'
  | 'evento'
  | 'consulta'
  | 'consultaLote'
  | 'consultaRuc';

const WSDL_DIR = path.resolve(fileURLToPath(import.meta.url), '../../src/gen/soap/wsdl');

export const SIFEN_ENDPOINTS: Record<
  SifenEnvironment,
  Record<SifenService, SifenEndpointConfig>
> = {
  test: {
    recibe: {
      wsdl: path.join(WSDL_DIR, 'recibe.wsdl'),
      endpoint: 'https://sifen-test.set.gov.py/de/ws/sync/recibe.wsdl'
    },
    recibeLote: {
      wsdl: path.join(WSDL_DIR, 'recibeLote.wsdl'),
      endpoint: 'https://sifen-test.set.gov.py/de/ws/async/recibe-lote.wsdl'
    },
    evento: {
      wsdl: path.join(WSDL_DIR, 'evento.wsdl'),
      endpoint: 'https://sifen-test.set.gov.py/de/ws/eventos/evento.wsdl'
    },
    consulta: {
      wsdl: path.join(WSDL_DIR, 'consulta.wsdl'),
      endpoint: 'https://sifen-test.set.gov.py/de/ws/consultas/consulta.wsdl'
    },
    consultaLote: {
      wsdl: path.join(WSDL_DIR, 'consultaLote.wsdl'),
      endpoint: 'https://sifen-test.set.gov.py/de/ws/consultas/consulta-lote.wsdl'
    },
    consultaRuc: {
      wsdl: path.join(WSDL_DIR, 'consultaRuc.wsdl'),
      endpoint: 'https://sifen-test.set.gov.py/de/ws/consultas/consulta-ruc.wsdl'
    }
  },
  prod: {
    recibe: {
      wsdl: path.join(WSDL_DIR, 'recibe.wsdl'),
      endpoint: 'https://sifen.set.gov.py/de/ws/sync/recibe.wsdl'
    },
    recibeLote: {
      wsdl: path.join(WSDL_DIR, 'recibeLote.wsdl'),
      endpoint: 'https://sifen.set.gov.py/de/ws/async/recibe-lote.wsdl'
    },
    evento: {
      wsdl: path.join(WSDL_DIR, 'evento.wsdl'),
      endpoint: 'https://sifen.set.gov.py/de/ws/eventos/evento.wsdl'
    },
    consulta: {
      wsdl: path.join(WSDL_DIR, 'consulta.wsdl'),
      endpoint: 'https://sifen.set.gov.py/de/ws/consultas/consulta.wsdl'
    },
    consultaLote: {
      wsdl: path.join(WSDL_DIR, 'consultaLote.wsdl'),
      endpoint: 'https://sifen.set.gov.py/de/ws/consultas/consulta-lote.wsdl'
    },
    consultaRuc: {
      wsdl: path.join(WSDL_DIR, 'consultaRuc.wsdl'),
      endpoint: 'https://sifen.set.gov.py/de/ws/consultas/consulta-ruc.wsdl'
    }
  }
};

export const SOAP_HEADER_XML =
  '<deHeaderMsg xmlns="http://ekuatia.set.gov.py/sifen/xsd"></deHeaderMsg>';

export const MAX_SIRECEPDE_SIZE_BYTES = 1000 * 1024;
