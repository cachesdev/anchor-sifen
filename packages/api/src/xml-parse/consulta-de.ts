import { Err, Ok, type Result } from '../result';
import type { ConsultaDEXML, Evento } from '../sifen/types/clean';
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

    const protocoloAutorizacionXml = extractProtocoloAutorizacion(root);

    const eventos = directChildren(root, 'xContEv').flatMap((container) =>
      parseEventoContainer(container)
    );

    return Ok({
      deXml: serialize(deElement),
      protocoloAutorizacionXml,
      eventos
    });
  } catch (cause) {
    return Err(new XMLParseError({ details: errorMessage(cause) }));
  }
}

/**
 * Extrae los eventos de un xContEv.
 *
 * SIFEN envuelve el contenido en rContEv. xEvento contiene el XML del evento
 * como nodo XML o como texto escapado. rResEnviEventoDe se preserva como XML
 * crudo porque no forma parte del modelo Evento limpio.
 */
function parseEventoContainer(container: Element): Evento[] {
  const rContEv = directChild(container, 'rContEv') ?? container;

  const xEvento = directChild(rContEv, 'xEvento');
  if (!xEvento) {
    throw new Error('xContEv no contiene xEvento.');
  }

  const recepcionElement = directChild(rContEv, 'rResEnviEventoDe');
  const recepcionXml = recepcionElement ? serialize(recepcionElement) : undefined;

  const eventoXml = xmlPayload(xEvento);
  const parsed = parseEventosXML(eventoXml);
  if (!parsed.success) {
    throw parsed.error;
  }

  if (!recepcionXml) return parsed.value;
  return parsed.value.map((evento) => ({ ...evento, recepcionXml }));
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
