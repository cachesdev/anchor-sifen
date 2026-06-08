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
export { parseRecibeLote } from './recibe-lote.parser';
export { parseConsultaRuc } from './consulta-ruc.parser';
export { parseConsultaDE } from './consulta.parser';
export { parseConsultaLote } from './consulta-lote.parser';
export { parseRecibe } from './recibe.parser';
export { parseEvento } from './evento.parser';
export { parseSIFENResponse as withRetEnviDeFallback } from './parser-utils';

export { mapSoapError } from './errors';
export { normalizeControlId, normalizeSignedXml } from './validation';
