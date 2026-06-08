import { Err, Ok, type Result } from '../result';
import type { Evento } from '../sifen/types/clean';
import {
  directChildren,
  directElementChildren,
  errorMessage,
  localName,
  parseXmlDocument,
  serialize,
  text
} from './dom-utils';
import { XMLParseError } from './errors';

export function parseEventoXML(xml: string): Result<Evento, XMLParseError> {
  const eventos = parseEventosXML(xml);
  if (!eventos.success) return eventos;

  if (eventos.value.length !== 1) {
    return Err(
      new XMLParseError({
        details: `Se esperaba un evento y se encontraron ${eventos.value.length}.`
      })
    );
  }

  return Ok(eventos.value[0]!);
}

export function parseEventosXML(xml: string): Result<Evento[], XMLParseError> {
  try {
    const doc = parseXmlDocument(xml);
    return Ok(parseEventosElement(doc.documentElement));
  } catch (cause) {
    return Err(new XMLParseError({ details: errorMessage(cause) }));
  }
}

function parseEventosElement(root: Element): Evento[] {
  switch (localName(root)) {
    case 'gGroupGesEve':
      return directChildren(root, 'rGesEve').map((eventNode) => parseRGesEve(eventNode));
    case 'rGesEve':
      return [parseRGesEve(root)];
    case 'rEve':
      return [parseREve(root, serialize(root))];
    default:
      throw new Error(`Raiz de eventos no reconocida: ${localName(root)}.`);
  }
}

function parseRGesEve(root: Element): Evento {
  const rEves = directChildren(root, 'rEve');
  if (rEves.length !== 1) {
    throw new Error(`rGesEve debe contener un rEve; contiene ${rEves.length}.`);
  }

  return parseREve(rEves[0]!, serialize(root));
}

function parseREve(rEve: Element, eventoXml: string): Evento {
  const groups = directChildren(rEve, 'gGroupTiEvt');
  if (groups.length !== 1) {
    throw new Error(`rEve debe contener un gGroupTiEvt; contiene ${groups.length}.`);
  }

  const eventTypeNodes = directElementChildren(groups[0]!);
  if (eventTypeNodes.length !== 1) {
    throw new Error(
      `gGroupTiEvt debe contener un tipo de evento; contiene ${eventTypeNodes.length}.`
    );
  }

  const payload = eventTypeNodes[0]!;
  const fechaFirmaRaw = text(rEve, 'dFecFirma');
  const versionFormatoRaw = text(rEve, 'dVerFor');

  return {
    tipoXml: localName(payload),
    idEvento: rEve.getAttribute('Id')?.trim() || undefined,
    fechaFirma: dateFromText(fechaFirmaRaw),
    fechaFirmaRaw,
    versionFormato: numberFromText(versionFormatoRaw),
    versionFormatoRaw,
    eventoXml,
    payloadXml: serialize(payload)
  };
}

function numberFromText(value: string | undefined): number | undefined {
  if (value === undefined) return undefined;

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function dateFromText(value: string | undefined): Date | undefined {
  if (value === undefined) return undefined;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}
