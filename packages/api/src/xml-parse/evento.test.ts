import { describe, expect, it } from 'vitest';
import { parserContenDE } from './consulta-de';
import { parseEventoXML, parseEventosXML } from './evento';

const CDC = '01800123456789001234501000000012345678901234';

function registroEventoXml(payload: string, idEvento = '123'): string {
  return `<rGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rEve Id="${idEvento}"><dFecFirma>2026-05-15T10:00:00</dFecFirma><dVerFor>150</dVerFor><gGroupTiEvt>${payload}</gGroupTiEvt></rEve><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"/></rGesEve>`;
}

function grupoEventosXml(...registros: string[]): string {
  return `<gGroupGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd">${registros.join('')}</gGroupGesEve>`;
}

function consultaXml(registroEventos = '', protocolo = '<dProtAut>1234567890</dProtAut>'): string {
  return `<rContDe xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rDE><dVerFor>150</dVerFor><DE Id="${CDC}"><dDVId>1</dDVId></DE></rDE>${protocolo}${registroEventos}</rContDe>`;
}

describe('xml-parse — eventos', () => {
  it('parseEventoXML parsea un evento conocido a datos clean', () => {
    const payload = `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`;
    const result = parseEventoXML(registroEventoXml(payload));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value).toMatchObject({
      tipo: 'cancelacion',
      idEvento: '123',
      versionFormato: 150,
      cdc: CDC,
      motivo: 'Error en datos'
    });
    expect(result.value.fechaFirma).toBeInstanceOf(Date);
  });

  it('parseEventosXML parsea gGroupGesEve y preserva orden', () => {
    const xml = grupoEventosXml(
      registroEventoXml(`<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`, '1'),
      registroEventoXml(`<rGeVeConf><Id>${CDC}</Id><iTipConf>1</iTipConf></rGeVeConf>`, '2')
    );
    const result = parseEventosXML(xml);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.map((evento) => evento.tipo)).toEqual(['cancelacion', 'conformidad']);
    expect(result.value.map((evento) => evento.idEvento)).toEqual(['1', '2']);
  });

  it.each([
    {
      nombre: 'inutilizacion',
      payload:
        '<rGeVeInu><dNumTim>12345678</dNumTim><dEst>001</dEst><dPunExp>002</dPunExp><dNumIn>0000001</dNumIn><dNumFin>0000003</dNumFin><iTiDE>1</iTiDE><mOtEve>Numeracion inutilizada</mOtEve><dSerieNum>A</dSerieNum></rGeVeInu>',
      esperado: { tipo: 'inutilizacion', numeroTimbrado: '12345678', serie: 'A' }
    },
    {
      nombre: 'notificacionRecepcion',
      payload: `<rGeVeNotRec><Id>${CDC}</Id><dFecEmi>2026-05-15T09:00:00</dFecEmi><dFecRecep>2026-05-15T10:00:00</dFecRecep><iTipRec>1</iTipRec><dNomRec>Receptor</dNomRec><dRucRec>80012345</dRucRec><dDVRec>0</dDVRec><dTotalGs>1000.00000000</dTotalGs></rGeVeNotRec>`,
      esperado: { tipo: 'notificacionRecepcion', cdc: CDC, nombreReceptor: 'Receptor' }
    },
    {
      nombre: 'disconformidad',
      payload: `<rGeVeDisconf><Id>${CDC}</Id><mOtEve>No corresponde</mOtEve></rGeVeDisconf>`,
      esperado: { tipo: 'disconformidad', cdc: CDC, motivo: 'No corresponde' }
    },
    {
      nombre: 'desconocimiento',
      payload: `<rGeVeDescon><Id>${CDC}</Id><dFecEmi>2026-05-15T09:00:00</dFecEmi><dFecRecep>2026-05-15T10:00:00</dFecRecep><iTipRec>2</iTipRec><dNomRec>Receptor</dNomRec><dTipIDRec>1</dTipIDRec><dNumID>123</dNumID><mOtEve>Desconocido</mOtEve></rGeVeDescon>`,
      esperado: { tipo: 'desconocimiento', cdc: CDC, tipoReceptor: 2 }
    },
    {
      nombre: 'endoso',
      payload: `<rGeVeEnd><Id>${CDC}</Id><iTipRec>1</iTipRec><dNomRec>Receptor</dNomRec><dRucEmi>80012345</dRucEmi><dDVEmi>0</dDVEmi><dNomEmi>Emisor</dNomEmi><dTipEnd>1</dTipEnd><iTipFac>1</iTipFac><dNomFac>Factor</dNomFac><dRucFac>80054321</dRucFac><dDVFac>1</dDVFac><dTotalGs>1000.00000000</dTotalGs><dPorDes>1.00000000</dPorDes><dMonDesGs>10.00000000</dMonDesGs><dTotOpeEndGs>990.00000000</dTotOpeEndGs></rGeVeEnd>`,
      esperado: { tipo: 'endoso', cdc: CDC, nombreFactor: 'Factor' }
    },
    {
      nombre: 'actualizacionTransporte',
      payload: `<rGeVeTr><Id>${CDC}</Id><dMotEv>2</dMotEv><dNomChof>Chofer</dNomChof><dNumIDChof>123</dNumIDChof></rGeVeTr>`,
      esperado: { tipo: 'actualizacionTransporte', cdc: CDC, motivo: 2, nombreChofer: 'Chofer' }
    },
    {
      nombre: 'nominacionFacturaElectronica',
      payload: `<rGEveNom><Id>${CDC}</Id><mOtEve>Nominacion</mOtEve><iNatRec>1</iNatRec><iTiOpe>1</iTiOpe><cPaisRec>PRY</cPaisRec><dDesPaisRe>Paraguay</dDesPaisRe><iTiContRec>1</iTiContRec><dRucRec>80012345</dRucRec><dDVRec>0</dDVRec><dNomRec>Receptor</dNomRec></rGEveNom>`,
      esperado: { tipo: 'nominacionFacturaElectronica', cdc: CDC, codigoPaisReceptor: 'PRY' }
    },
    {
      nombre: 'asociacionRetencion',
      payload: `<rGeVeRetAce><Id>${CDC}</Id><dNumTimRet>12345678</dNumTimRet><dEstRet>001</dEstRet><dPunExpRet>002</dPunExpRet><dNumDocRet>0000001</dNumDocRet><dCodConRet>01</dCodConRet><dFeEmiRet>2026-05-15T10:00:00</dFeEmiRet></rGeVeRetAce>`,
      esperado: { tipo: 'asociacionRetencion', cdc: CDC, numeroTimbradoRetencion: '12345678' }
    },
    {
      nombre: 'anulacionRetencion',
      payload: `<rGeVeRetAnu><Id>${CDC}</Id><dNumTimRet>12345678</dNumTimRet><dEstRet>001</dEstRet><dPunExpRet>002</dPunExpRet><dNumDocRet>0000001</dNumDocRet><dCodConRet>01</dCodConRet><dFeEmiRet>2026-05-15T10:00:00</dFeEmiRet><dFecAnRet>2026-05-16T10:00:00</dFecAnRet></rGeVeRetAnu>`,
      esperado: { tipo: 'anulacionRetencion', cdc: CDC, codigoConceptoRetencion: '01' }
    },
    {
      nombre: 'transferenciaCreditosFiscales',
      payload: `<rGeVeCCFF><Id>${CDC}</Id><dNumTraCCFF>TRX1</dNumTraCCFF><dFeAceTraCCFF>2026-05-15T10:00:00</dFeAceTraCCFF></rGeVeCCFF>`,
      esperado: { tipo: 'transferenciaCreditosFiscales', cdc: CDC }
    },
    {
      nombre: 'devolucionCreditosFiscalesCuestionado',
      payload: `<rGeDevCCFFCue><Id>${CDC}</Id><dNumDevSol>SOL</dNumDevSol><dNumDevInf>INF</dNumDevInf><dNumDevRes>RES</dNumDevRes><dFeEmiSol>2026-05-15T10:00:00</dFeEmiSol><dFeEmiInf>2026-05-16T10:00:00</dFeEmiInf><dFeEmiRes>2026-05-17T10:00:00</dFeEmiRes></rGeDevCCFFCue>`,
      esperado: { tipo: 'devolucionCreditosFiscalesCuestionado', cdc: CDC }
    },
    {
      nombre: 'devolucionCreditosFiscalesDevuelto',
      payload: `<rGeDevCCFFDev><Id>${CDC}</Id><dNumDevSol>SOL</dNumDevSol><dNumDevInf>INF</dNumDevInf><dNumDevRes>RES</dNumDevRes><dFeEmiSol>2026-05-15T10:00:00</dFeEmiSol><dFeEmiInf>2026-05-16T10:00:00</dFeEmiInf><dFeEmiRes>2026-05-17T10:00:00</dFeEmiRes></rGeDevCCFFDev>`,
      esperado: { tipo: 'devolucionCreditosFiscalesDevuelto', cdc: CDC }
    },
    {
      nombre: 'anticipo',
      payload: `<rGeVeAnt><Id>${CDC}</Id></rGeVeAnt>`,
      esperado: { tipo: 'anticipo', cdc: CDC }
    },
    {
      nombre: 'remision',
      payload: `<rGeVeRem><Id>${CDC}</Id></rGeVeRem>`,
      esperado: { tipo: 'remision', cdc: CDC }
    }
  ])('parsea payload conocido $nombre', ({ payload, esperado }) => {
    const result = parseEventoXML(registroEventoXml(payload));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value).toMatchObject(esperado);
  });

  it('preserva payloads desconocidos o futuros sin mapearlos', () => {
    const result = parseEventoXML(registroEventoXml('<rGeVeFuturo><Id>1</Id></rGeVeFuturo>'));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.tipo).toBe('desconocido');
    if (result.value.tipo !== 'desconocido') return;
    expect(result.value.tipoXml).toBe('rGeVeFuturo');
    expect(result.value.payloadXml).toContain('<rGeVeFuturo');
    expect(result.value.idEvento).toBe('123');
  });

  it('retorna Err cuando un payload conocido no valida', () => {
    const result = parseEventoXML(registroEventoXml(`<rGeVeCan><Id>${CDC}</Id></rGeVeCan>`));

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('rGeVeCan');
  });

  it('parseEventoXML retorna Err cuando no hay exactamente un evento', () => {
    const empty = parseEventoXML(
      '<gGroupGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd"></gGroupGesEve>'
    );
    expect(empty.success).toBe(false);

    const many = parseEventoXML(
      grupoEventosXml(
        registroEventoXml(
          `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`,
          '1'
        ),
        registroEventoXml(`<rGeVeConf><Id>${CDC}</Id><iTipConf>1</iTipConf></rGeVeConf>`, '2')
      )
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
  it('parseConsultaDEXML extrae deXml, protocoloAutorizacion y registroEventos', () => {
    const event = registroEventoXml(
      `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`
    );
    const xContEv = `<xContEv><rContEv><xEvento>${grupoEventosXml(event)}</xEvento></rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.deXml).toContain('<rDE');
    expect(result.value.protocoloAutorizacion).toBe('1234567890');
    expect(result.value.registroEventos).toHaveLength(1);
    const registro = result.value.registroEventos[0]!;
    expect(registro.eventos[0]!.evento.tipo).toBe('cancelacion');
    expect(registro.grupoEventoXml).toContain('<gGroupGesEve');
    expect(registro.eventos[0]!.eventoXml).toContain('<rGesEve');
    expect(registro.eventos[0]!.eventoXml).not.toContain('<gGroupGesEve');
  });

  it('parseConsultaDEXML conserva un xContEv como un registro aunque contenga varios rGesEve', () => {
    const xContEv = `<xContEv><rContEv><xEvento>${grupoEventosXml(
      registroEventoXml(`<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`, '1'),
      registroEventoXml(`<rGeVeConf><Id>${CDC}</Id><iTipConf>1</iTipConf></rGeVeConf>`, '2')
    )}</xEvento></rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.registroEventos).toHaveLength(1);
    expect(result.value.registroEventos[0]!.eventos.map(({ evento }) => evento.idEvento)).toEqual([
      '1',
      '2'
    ]);
  });

  it('parseConsultaDEXML maneja xEvento con XML escapado en texto', () => {
    const event = registroEventoXml(`<rGeVeConf><Id>${CDC}</Id><iTipConf>1</iTipConf></rGeVeConf>`);
    const escapedEvent = grupoEventosXml(event).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    const xContEv = `<xContEv><rContEv><xEvento>${escapedEvent}</xEvento></rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (result.success)
      expect(result.value.registroEventos[0]!.eventos[0]!.evento.tipo).toBe('conformidad');
  });

  it('parseConsultaDEXML maneja consultas sin registroEventos', () => {
    const result = parserContenDE(consultaXml());

    expect(result.success).toBe(true);
    if (result.success) expect(result.value.registroEventos).toEqual([]);
  });

  it('parseConsultaDEXML parsea rResEnviEventoDe con rRetEnviEventoDe anidado', () => {
    const event = registroEventoXml(
      `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`
    );
    const recepcion =
      '<rResEnviEventoDe><rRetEnviEventoDe><dFecProc>2026-05-15T10:01:00</dFecProc><gResProcEVe><dEstRes>Aprobado</dEstRes><dProtAut>9876543210</dProtAut><id>123</id><gResProc><dCodRes>0600</dCodRes><dMsgRes>Evento registrado</dMsgRes></gResProc></gResProcEVe></rRetEnviEventoDe></rResEnviEventoDe>';
    const xContEv = `<xContEv><rContEv><xEvento>${grupoEventosXml(event)}</xEvento>${recepcion}</rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.registroEventos[0]!.recepcionXml).toContain('<rResEnviEventoDe');
    expect(result.value.registroEventos[0]!.recepcion?.resultados[0]).toMatchObject({
      idEvento: '123',
      estado: 'Aprobado',
      numeroTransaccion: '9876543210',
      validaciones: [{ codigo: '0600', mensaje: 'Evento registrado' }]
    });
  });

  it('parseConsultaDEXML usa rEve@Id cuando rResEnviEventoDe no incluye id', () => {
    const event = registroEventoXml(
      `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`,
      '5'
    );
    const recepcion =
      '<rResEnviEventoDe><rRetEnviEventoDe><dFecProc>2026-05-15T10:01:00</dFecProc><gResProcEVe><dEstRes>Aprobado</dEstRes><dProtAut>9876543210</dProtAut><gResProc><dCodRes>0600</dCodRes><dMsgRes>Se encontro el evento</dMsgRes></gResProc></gResProcEVe></rRetEnviEventoDe></rResEnviEventoDe>';
    const xContEv = `<xContEv><rContEv><xEvento>${grupoEventosXml(event)}</xEvento>${recepcion}</rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.value.registroEventos[0]!.recepcion?.resultados[0]).toMatchObject({
      idEvento: '5',
      estado: 'Aprobado',
      numeroTransaccion: '9876543210'
    });
  });

  it('parseConsultaDEXML no reutiliza un id fallback en resultados ambiguos', () => {
    const event = registroEventoXml(
      `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`,
      '5'
    );
    const resultWithoutId =
      '<gResProcEVe><dEstRes>Aprobado</dEstRes><gResProc><dCodRes>0600</dCodRes><dMsgRes>Evento registrado</dMsgRes></gResProc></gResProcEVe>';
    const recepcion = `<rResEnviEventoDe><rRetEnviEventoDe><dFecProc>2026-05-15T10:01:00</dFecProc>${resultWithoutId}${resultWithoutId}</rRetEnviEventoDe></rResEnviEventoDe>`;
    const xContEv = `<xContEv><rContEv><xEvento>${grupoEventosXml(event)}</xEvento>${recepcion}</rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('Campo requerido ausente: id');
  });

  it('rechaza rResEnviEventoDe sin rRetEnviEventoDe anidado', () => {
    const event = registroEventoXml(
      `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`
    );
    const recepcion =
      '<rResEnviEventoDe><dFecProc>2026-05-15T10:01:00</dFecProc></rResEnviEventoDe>';
    const xContEv = `<xContEv><rContEv><xEvento>${grupoEventosXml(event)}</xEvento>${recepcion}</rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(false);
  });

  it('parseConsultaDEXML rechaza XML que no tenga rContDe como raiz', () => {
    const result = parserContenDE(`<otroContenedor><DE Id="${CDC}"/></otroContenedor>`);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('raiz rContDe');
  });

  it('retorna Err cuando xEvento contiene multiples raices XML directas', () => {
    const event = registroEventoXml(
      `<rGeVeCan><Id>${CDC}</Id><mOtEve>Error en datos</mOtEve></rGeVeCan>`
    );
    const xContEv = `<xContEv><rContEv><xEvento>${event}${event}</xEvento></rContEv></xContEv>`;
    const result = parserContenDE(consultaXml(xContEv));

    expect(result.success).toBe(false);
  });

  it('retorna Err cuando falta protocolo de autorizacion', () => {
    const result = parserContenDE(consultaXml('', ''));

    expect(result.success).toBe(false);
  });
});
