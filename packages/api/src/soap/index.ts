export type { SifenClientOptions, SifenEnvironment } from './client';
export { SifenSoapClient } from './client';

export type { SifenService } from './config';
export { MAX_SIRECEPDE_SIZE_BYTES, SIFEN_ENDPOINTS, SOAP_HEADER_XML } from './config';

export { SifenRucClient } from './consulta-ruc';
export { SifenRecibeLoteClient } from './recibe-lote';
export { SifenConsultaClient } from './consulta';
export { SifenConsultaLoteClient } from './consulta-lote';
export { SifenEventoClient } from './evento';
export { SifenRecibeClient } from './recibe';

export { SifenError } from './sifen-error';
export {
  parseRecibeLote,
  parseConsultaRuc,
  parseConsultaDE,
  parseConsultaLote,
  parseRecibe,
  parseEvento,
  parseSIFENResponse as withRetEnviDeFallback
} from './response-parsers';

export { mapSoapError } from './errors';
export { normalizeControlId, normalizeSignedXml } from './validation';
