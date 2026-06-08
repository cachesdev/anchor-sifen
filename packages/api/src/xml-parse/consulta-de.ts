import { Err, Ok, type Result } from '../result';
import type { ConsultaDEXML, RecepcionEvento, RegistroEvento } from '../sifen/types/clean';
import {
  directChild,
  directChildren,
  directElementChildren,
  errorMessage,
  localName,
  parseXmlDocument,
  serialize,
  text
} from './dom-utils';
import { XMLParseError } from './errors';
import { parseEventosXML } from './evento';
import { parseRawDate } from '../xml-gen/mapper/reverse/helpers';

/**
 * Parsea el contenedor XML devuelto por siConsDE.
 */
export function parserContenDE(xml: string): Result<ConsultaDEXML, XMLParseError> {
  try {
    const doc = parseXmlDocument(xml);
    const root = doc.documentElement;
    if (localName(root) !== 'rContDe') {
      throw new Error('El contenedor de consulta debe tener raiz rContDe.');
    }

    const deElement = directChild(root, 'rDE');
    if (!deElement) {
      throw new Error('El contenedor de consulta no contiene DE XML.');
    }

    const protocoloAutorizacion = extractProtocoloAutorizacion(root);
    const registroEventos = directChildren(root, 'xContEv').flatMap(parseXContEv);

    return Ok({
      deXml: serialize(deElement),
      protocoloAutorizacion,
      registroEventos
    });
  } catch (cause) {
    return Err(new XMLParseError({ details: errorMessage(cause) }));
  }
}

function parseXContEv(container: Element): RegistroEvento[] {
  const registros = directChildren(container, 'rContEv');
  if (registros.length > 0) return registros.map(parseRContEv);

  if (localName(container) === 'rContEv') return [parseRContEv(container)];

  throw new Error('xContEv no contiene rContEv.');
}

function parseRContEv(container: Element): RegistroEvento {
  const xEvento = directChild(container, 'xEvento');
  if (!xEvento) throw new Error('rContEv no contiene xEvento.');

  const eventoXml = xmlPayload(xEvento);
  const parsedEventos = parseEventosXML(eventoXml);
  if (!parsedEventos.success) throw parsedEventos.error;

  const recepcionElement = directChild(container, 'rResEnviEventoDe');
  if (!recepcionElement) return { eventoXml, eventos: parsedEventos.value };

  return {
    eventoXml,
    recepcionXml: serialize(recepcionElement),
    eventos: parsedEventos.value,
    recepcion: parseRecepcionEvento(recepcionElement)
  };
}

function parseRecepcionEvento(wrapper: Element): RecepcionEvento {
  const root = directChild(wrapper, 'rRetEnviEventoDe');
  if (!root) {
    throw new Error('rResEnviEventoDe no contiene rRetEnviEventoDe.');
  }

  const fechaProcesamientoRaw = requiredText(root, 'dFecProc');
  const resultados = directChildren(root, 'gResProcEVe').map((result) => ({
    idEvento: requiredText(result, 'id'),
    estado: requiredText(result, 'dEstRes'),
    numeroTransaccion: text(result, 'dProtAut'),
    validaciones: parseValidaciones(result)
  }));

  if (resultados.length === 0) {
    throw new Error('rRetEnviEventoDe no contiene gResProcEVe.');
  }

  return {
    fechaProcesamiento: parseDate(fechaProcesamientoRaw, 'dFecProc'),
    resultados
  };
}

function parseValidaciones(result: Element): Array<{ codigo: string; mensaje: string }> {
  const validaciones = directChildren(result, 'gResProc').map((validation) => ({
    codigo: requiredText(validation, 'dCodRes'),
    mensaje: requiredText(validation, 'dMsgRes')
  }));

  if (validaciones.length === 0) {
    throw new Error('gResProcEVe no contiene gResProc.');
  }

  return validaciones;
}

/**
 * Obtiene dProtAut desde rContDe.
 */
function extractProtocoloAutorizacion(root: Element): string {
  const protocol = text(root, 'dProtAut');
  if (protocol) return protocol;

  throw new Error('El contenedor de consulta no contiene protocolo de autorizacion.');
}

/**
 * Devuelve el XML contenido en xEvento.
 *
 * Si xEvento tiene un unico hijo elemento, el payload ya fue parseado como XML
 * por xmldom y se serializa de vuelta. Si no tiene hijos elemento, se toma el
 * texto porque puede venir como XML escapado.
 */
function xmlPayload(container: Element): string {
  const children = directElementChildren(container);

  if (children.length === 1) return serialize(children[0]!);
  if (children.length > 1) {
    throw new Error(`${localName(container)} contiene multiples raices XML.`);
  }

  const payload = container.textContent?.trim();
  if (!payload) throw new Error(`${localName(container)} no contiene XML.`);
  return payload;
}

function requiredText(root: Element, childName: string): string {
  const value = text(root, childName);
  if (value === undefined) throw new Error(`Campo requerido ausente: ${childName}.`);
  return value;
}

function parseDate(value: string, field: string): Date {
  return parseRawDate(value, 'date-time', field);
}
