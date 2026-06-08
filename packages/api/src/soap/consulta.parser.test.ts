import { describe, expect, it } from 'vitest';
import { parseConsultaDE } from './consulta.parser';

describe('SOAP — parseConsultaDE', () => {
  const cdc = '01800123456789001234501000000012345678901234';

  function contenedorDE(eventos = ''): string {
    return `<rContDe xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rDE><dVerFor>150</dVerFor><DE Id="${cdc}"><dDVId>1</dDVId></DE></rDE><dProtAut>1234567890</dProtAut>${eventos}</rContDe>`;
  }

  it('retorna metadata, deXml, protocoloAutorizacionXml y eventos vacio cuando no hay eventos', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodRes: '0422',
      dMsgRes: 'OK',
      xContenDE: contenedorDE()
    };
    const result = parseConsultaDE(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.codigoResultado).toBe('0422');
      expect(result.value.mensajeResultado).toBe('OK');
      expect(result.value.fechaProcesamiento).toBeInstanceOf(Date);
      expect(result.value.deXml).toContain('<rDE');
      expect(result.value.protocoloAutorizacionXml).toBe('1234567890');
      expect(result.value.eventos).toEqual([]);
    }
  });

  it('retorna eventos parseados desde xContEv', () => {
    const eventoXml = `<rGesEve><rEve Id="1"><dFecFirma>2026-05-15T10:00:00</dFecFirma><dVerFor>150</dVerFor><gGroupTiEvt><rGeVeConf><Id>${cdc}</Id><iTipConf>1</iTipConf></rGeVeConf></gGroupTiEvt></rEve></rGesEve>`;
    const xContEv = `<xContEv><rContEv><xEvento><gGroupGesEve>${eventoXml}</gGroupGesEve></xEvento></rContEv></xContEv>`;
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodRes: '0422',
      dMsgRes: 'OK',
      xContenDE: contenedorDE(xContEv)
    };
    const result = parseConsultaDE(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.eventos).toHaveLength(1);
      expect(result.value.eventos[0]!.tipoXml).toBe('rGeVeConf');
      expect(result.value.eventos[0]!.payloadXml).toContain('<rGeVeConf');
    }
  });

  it('retorna Err cuando xContenDE esta ausente aunque el codigo sea 0422', () => {
    const raw = { dFecProc: '2026-05-15T10:30:00', dCodRes: '0422', dMsgRes: 'OK' };
    const result = parseConsultaDE(raw);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('xContenDE');
  });

  it('retorna Err cuando falta protocoloAutorizacionXml', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodRes: '0422',
      dMsgRes: 'OK',
      xContenDE: `<rContDe xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rDE><DE Id="${cdc}"/></rDE></rContDe>`
    };
    const result = parseConsultaDE(raw);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('protocolo de autorizacion');
  });

  it('preserva eventos desconocidos desde xContEv', () => {
    const eventoXml =
      '<rGesEve><rEve Id="1"><dFecFirma>2026-05-15T10:00:00</dFecFirma><dVerFor>150</dVerFor><gGroupTiEvt><rGeVeFuturo/></gGroupTiEvt></rEve></rGesEve>';
    const xContEv = `<xContEv><rContEv><xEvento><gGroupGesEve>${eventoXml}</gGroupGesEve></xEvento></rContEv></xContEv>`;
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodRes: '0422',
      dMsgRes: 'OK',
      xContenDE: contenedorDE(xContEv)
    };
    const result = parseConsultaDE(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.eventos[0]!.tipoXml).toBe('rGeVeFuturo');
      expect(Object.hasOwn(result.value.eventos[0]!, 'tipo')).toBe(false);
    }
  });

  it('retorna Err cuando el codigo no es 0422', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodRes: '0421',
      dMsgRes: 'CDC no encontrado'
    };
    const result = parseConsultaDE(raw);
    expect(result.success).toBe(false);
  });
});
