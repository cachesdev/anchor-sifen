import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

const xmlSerializer = new XMLSerializer();

/**
 * Construye un DOM y convierte errores de parseo XML en excepciones legibles.
 */
export function parseXmlDocument(xml: string): Document {
  const parseErrors: string[] = [];
  const doc = new DOMParser({
    errorHandler: {
      warning: () => undefined,
      error: (message) => parseErrors.push(String(message)),
      fatalError: (message) => parseErrors.push(String(message))
    }
  }).parseFromString(xml, 'text/xml');

  if (
    parseErrors.length > 0 ||
    !doc.documentElement ||
    localName(doc.documentElement) === 'parsererror'
  ) {
    throw new Error('XML mal formado.');
  }

  return doc;
}

/**
 * Lee el texto de un hijo directo, ignorando hijos anidados con el mismo nombre.
 */
export function text(parent: Element, name: string): string | undefined {
  const child = directChild(parent, name);
  return child?.textContent?.trim() || undefined;
}

/**
 * Devuelve el primer hijo directo con el nombre XML indicado.
 */
export function directChild(parent: Element, name: string): Element | undefined {
  return directChildren(parent, name)[0];
}

/**
 * Devuelve todos los hijos directos que coinciden con el nombre XML indicado.
 */
export function directChildren(parent: Element, name: string): Element[] {
  return directElementChildren(parent).filter((child) => localName(child) === name);
}

/**
 * Filtra childNodes para quedarse solo con elementos; excluye texto, espacios y comentarios.
 */
export function directElementChildren(parent: Element): Element[] {
  const children: Element[] = [];
  for (let i = 0; i < parent.childNodes.length; i++) {
    const child = parent.childNodes[i];
    if (child?.nodeType === 1) children.push(child as Element);
  }
  return children;
}

/**
 * Obtiene el nombre local para comparar tags sin depender del prefijo de namespace.
 */
export function localName(node: Node): string {
  const maybeLocalName = (node as { localName?: string }).localName;
  return maybeLocalName ?? node.nodeName.split(':').pop() ?? node.nodeName;
}

/**
 * Serializa un nodo DOM de vuelta a XML crudo.
 */
export function serialize(element: Element): string {
  return xmlSerializer.serializeToString(element);
}

/**
 * Normaliza cualquier causa capturada a un mensaje de error estable.
 */
export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
