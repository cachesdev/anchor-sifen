import { describe, expect, it } from 'vitest';
import { parserContenDE } from './consulta-de';
import { parseEventoXML, parseEventosXML } from './evento';

const CDC = '01800123456789001234501000000012345678901234';

function eventoXml(payload: string, idEvento = '123'): string {
  return `<rGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rEve Id="${idEvento}"><dFecFirma>2026-05-15T10:00:00</dFecFirma><dVerFor>150</dVerFor><gGroupTiEvt>${payload}</gGroupTiEvt></rEve><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"/></rGesEve>`;
}

function consultaXml(eventos = '', protocolo = '<dProtAut>1234567890</dProtAut>'): string {
  return `<rContDe xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rDE><dVerFor>150</dVerFor><DE Id="${CDC}"><dDVId>1</dDVId></DE></rDE>${protocolo}${eventos}</rContDe>`;
}

describe('xml-parse — eventos', () => {
  it('parseEventoXML parsea un evento y preserva metadata y XML', () => {
    const payload = `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`;
    const result = parseEventoXML(eventoXml(payload));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.tipoXml).toBe('rGeVeCan');
    expect(result.value.idEvento).toBe('123');
    expect(result.value.fechaFirma).toBeInstanceOf(Date);
    expect(result.value.fechaFirmaRaw).toBe('2026-05-15T10:00:00');
    expect(result.value.versionFormato).toBe(150);
    expect(result.value.versionFormatoRaw).toBe('150');
    expect(result.value.eventoXml).toContain('<rGesEve');
    expect(result.value.payloadXml).toContain('<rGeVeCan');
    expect(result.value.payloadXml).toContain('<mOtEve>Error en datos</mOtEve>');
  });

  it('parseEventosXML parsea gGroupGesEve y preserva orden', () => {
    const xml = `<gGroupGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd">${eventoXml(
      `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`,
      '1'
    )}${eventoXml(`<rGeVeConf><Id>${CDC}</Id><iTipConf>1</iTipConf></rGeVeConf>`, '2')}</gGroupGesEve>`;
    const result = parseEventosXML(xml);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.map((evento) => evento.tipoXml)).toEqual(['rGeVeCan', 'rGeVeConf']);
    expect(result.value.map((evento) => evento.idEvento)).toEqual(['1', '2']);
  });

  it('preserva payloads desconocidos o futuros sin mapearlos a desconocido', () => {
    const result = parseEventoXML(eventoXml('<rGeVeFuturo><Id>1</Id></rGeVeFuturo>'));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.tipoXml).toBe('rGeVeFuturo');
    expect(result.value.payloadXml).toContain('<rGeVeFuturo');
    expect(Object.hasOwn(result.value, 'tipo')).toBe(false);
  });

  it('parseEventoXML retorna Err cuando no hay exactamente un evento', () => {
    const empty = parseEventoXML(
      '<gGroupGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd"></gGroupGesEve>'
    );
    expect(empty.success).toBe(false);

    const many = parseEventoXML(
      `<gGroupGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd">${eventoXml(
        `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`,
        '1'
      )}${eventoXml(`<rGeVeConf><Id>${CDC}</Id><iTipConf>1</iTipConf></rGeVeConf>`, '2')}</gGroupGesEve>`
    );
    expect(many.success).toBe(false);
  });

  it('retorna Err para XML mal formado y sobres mal formados', () => {
    expect(parseEventoXML('<rGesEve><rEve></rGesEve>').success).toBe(false);
    expect(parseEventoXML('<rGesEve><rEve/></rGesEve>').success).toBe(false);
    expect(
      parseEventoXML(
        '<rGesEve><rEve><gGroupTiEvt><rGeVeCan/><rGeVeConf/></gGroupTiEvt></rEve></rGesEve>'
      ).success
    ).toBe(false);
  });
});

describe('xml-parse — consulta DE', () => {
  it('parseConsultaDEXML extrae deXml, protocoloAutorizacionXml y eventos', () => {
    const event = eventoXml(`<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`);
    const xContEv = `<xContEv><rContEv><xEvento><gGroupGesEve>${event}</gGroupGesEve></xEvento></rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.deXml).toContain('<rDE');
    expect(result.value.protocoloAutorizacionXml).toBe('1234567890');
    expect(result.value.eventos).toHaveLength(1);
    expect(result.value.eventos[0]!.tipoXml).toBe('rGeVeCan');
  });

  it('parseConsultaDEXML maneja xEvento con XML escapado en texto', () => {
    const event = eventoXml(`<rGeVeConf><Id>${CDC}</Id><iTipConf>1</iTipConf></rGeVeConf>`);
    const escapedEvent = event.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    const xContEv = `<xContEv><rContEv><xEvento>${escapedEvent}</xEvento></rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (result.success) expect(result.value.eventos[0]!.tipoXml).toBe('rGeVeConf');
  });

  it('parseConsultaDEXML maneja consultas sin eventos', () => {
    const result = parserContenDE(consultaXml());

    expect(result.success).toBe(true);
    if (result.success) expect(result.value.eventos).toEqual([]);
  });

  it('parseConsultaDEXML rechaza XML que no tenga rContDe como raiz', () => {
    const result = parserContenDE(
      `<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"><DE Id="${CDC}"/></rDE>`
    );

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('raiz rContDe');
  });

  it('preserva rResEnviEventoDe crudo sin normalizarlo ni validarlo', () => {
    const event = eventoXml(`<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`);
    const recepcion =
      '<rResEnviEventoDe><dFecProc>2026-05-15T10:01:00</dFecProc></rResEnviEventoDe>';
    const xContEv = `<xContEv><rContEv><xEvento><gGroupGesEve>${event}</gGroupGesEve></xEvento>${recepcion}</rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.eventos[0]!.recepcionXml).toContain('<rResEnviEventoDe');
    expect(result.value.eventos[0]!.recepcionXml).toContain(
      '<dFecProc>2026-05-15T10:01:00</dFecProc>'
    );
  });

  it('retorna Err cuando xEvento contiene multiples raices XML directas', () => {
    const event = eventoXml(`<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`);
    const xContEv = `<xContEv><rContEv><xEvento>${event}${event}</xEvento></rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(false);
  });

  it('retorna Err cuando falta protocolo de autorizacion', () => {
    const result = parserContenDE(consultaXml('', ''));

    expect(result.success).toBe(false);
  });
});
