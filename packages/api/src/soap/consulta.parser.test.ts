import { describe, expect, it } from 'vitest';
import { parseConsultaDE } from './consulta.parser';

describe('SOAP — parseConsultaDE', () => {
  const cdc = '01800123456789001234501000000012345678901234';

  function contenedorDE(registroEventos = ''): string {
    return `<rContDe xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rDE><dVerFor>150</dVerFor><DE Id="${cdc}"><dDVId>1</dDVId></DE></rDE><dProtAut>1234567890</dProtAut>${registroEventos}</rContDe>`;
  }

  it('retorna metadata y contenedorDE limpio cuando no hay registroEventos', () => {
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
      expect(result.value.contenedorDE.deXml).toContain('<rDE');
      expect(result.value.contenedorDE.protocoloAutorizacion).toBe('1234567890');
      expect(result.value.contenedorDE.registroEventos).toEqual([]);
    }
  });

  it('retorna registroEventos parseados desde xContEv', () => {
    const eventoXml = `<rGesEve><rEve Id="1"><dFecFirma>2026-05-15T10:00:00</dFecFirma><dVerFor>150</dVerFor><gGroupTiEvt><rGeVeConf><Id>${cdc}</Id><iTipConf>1</iTipConf></rGeVeConf></gGroupTiEvt></rEve><Signature/></rGesEve>`;
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
      expect(result.value.contenedorDE.registroEventos).toHaveLength(1);
      const registro = result.value.contenedorDE.registroEventos[0]!;
      expect(registro.grupoEventoXml).toContain('<gGroupGesEve');
      expect(registro.eventos[0]!.evento).toMatchObject({ tipo: 'conformidad', idEvento: '1' });
    }
  });

  it('retorna Err cuando xContenDE esta ausente aunque el codigo sea 0422', () => {
    const raw = { dFecProc: '2026-05-15T10:30:00', dCodRes: '0422', dMsgRes: 'OK' };
    const result = parseConsultaDE(raw);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('xContenDE');
  });

  it('retorna Err cuando falta protocoloAutorizacion', () => {
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
      '<rGesEve><rEve Id="1"><dFecFirma>2026-05-15T10:00:00</dFecFirma><dVerFor>150</dVerFor><gGroupTiEvt><rGeVeFuturo/></gGroupTiEvt></rEve><Signature/></rGesEve>';
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
      const { evento } = result.value.contenedorDE.registroEventos[0]!.eventos[0]!;
      expect(evento.tipo).toBe('desconocido');
      if (evento.tipo !== 'desconocido') return;
      expect(evento.tipoXml).toBe('rGeVeFuturo');
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
