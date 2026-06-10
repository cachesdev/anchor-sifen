import { describe, expect, it } from 'vitest';
import { codigoCiudad, descripcionCodigoCiudad } from '../gen/ciudades';
import { codigoDepartamento, descripcionCodigoDepartamento } from '../gen/departamentos';
import { codigoDistrito, descripcionCodigoDistrito } from '../gen/distritos';
import { codigoPais } from '../gen/paises';
import { tipoOperacion, naturalezaReceptor } from '../sifen/types/enums';
import { generateDEXML, generateEventoXML } from './generator';
import type { PreparedDE } from './de-pipeline';
import { mapEventoRegistrableToRaw } from './mapper/evento';

describe('xml-gen — generator', () => {
  const prepared: PreparedDE = {
    type: 'FacturaElectronica',
    cdc: 'CDC123',
    clean: undefined!,
    raw: {
      dDVId: 8,
      dFecFirma: '2026-04-30T12:00:00',
      dSisFact: 1,
      gOpeDE: { iTipEmi: 1, dDesTipEmi: 'Normal', dCodSeg: '123456789' },
      gTimb: {
        iTiDE: 1,
        dDesTiDE: 'Factura electrónica',
        dNumTim: 12345678,
        dEst: '001',
        dPunExp: '001',
        dNumDoc: '0000001',
        dFeIniT: '2026-01-01'
      },
      gDatGralOpe: undefined!,
      gDtipDE: undefined!
    }
  };

  it('genera XML compacto sin declaracion ni whitespace', () => {
    const xml = generateDEXML(prepared);
    expect(xml).not.toContain('<?xml');
    expect(xml).not.toContain('\n');
  });

  it('incluye el namespace de SIFEN en el elemento raiz', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('xmlns="http://ekuatia.set.gov.py/sifen/xsd"');
    expect(xml).toContain('rDE');
  });

  it('incluye el CDC como atributo Id del elemento DE', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('Id="CDC123"');
  });

  it('incluye la version del formato (150)', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('<dVerFor>150</dVerFor>');
  });

  it('incluye los campos de operacion DE', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('<iTipEmi>1</iTipEmi>');
    expect(xml).toContain('<dDesTipEmi>Normal</dDesTipEmi>');
    expect(xml).toContain('<dCodSeg>123456789</dCodSeg>');
  });

  it('incluye los datos de timbrado', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('<dEst>001</dEst>');
    expect(xml).toContain('<dPunExp>001</dPunExp>');
    expect(xml).toContain('<dNumDoc>0000001</dNumDoc>');
  });

  it('genera XML de evento registrable compacto y con rEve@Id', () => {
    const raw = mapEventoRegistrableToRaw(
      {
        tipo: 'cancelacion',
        idEvento: '123',
        cdc: '01800195515031005001331122026030517018918308',
        motivo: 'Error en datos'
      },
      new Date('2026-04-30T12:00:00')
    );

    const xml = generateEventoXML(raw);

    expect(xml).not.toContain('<?xml');
    expect(xml).not.toContain('\n');
    expect(xml).toContain('xmlns="http://ekuatia.set.gov.py/sifen/xsd"');
    expect(xml).toContain('xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"');
    expect(xml).toContain(
      'xsi:schemaLocation="http://ekuatia.set.gov.py/sifen/xsd siRecepEvento_v150.xsd"'
    );
    expect(xml).toContain('<rEve Id="123">');
    expect(xml).toContain('<dFecFirma>2026-04-30T12:00:00</dFecFirma>');
    expect(xml).toContain('<dVerFor>150</dVerFor>');
    expect(xml).toContain('<rGeVeCan>');
    expect(xml).toContain('<Id>01800195515031005001331122026030517018918308</Id>');
    expect(xml).toContain('<mOtEve>Error en datos</mOtEve>');
  });

  it('deriva descripciones disponibles al mapear nominacion', () => {
    const raw = mapEventoRegistrableToRaw(
      {
        tipo: 'nominacionFacturaElectronica',
        idEvento: '7',
        cdc: '01800195515031005001331122026030517018918308',
        motivo: 'Nominacion de receptor',
        naturalezaReceptor: naturalezaReceptor.Contribuyente,
        tipoOperacion: tipoOperacion.B2B,
        codigoPaisReceptor: codigoPais.Paraguay,
        rucReceptor: '616159-6',
        nombreReceptor: 'ACME SA',
        codigoDepartamentoReceptor: codigoDepartamento.Capital,
        codigoDistritoReceptor: codigoDistrito.AsuncionDistrito,
        codigoCiudadReceptor: codigoCiudad.AsuncionDistrito
      },
      new Date('2026-04-30T12:00:00')
    );

    const xml = generateEventoXML(raw);

    expect(xml).toContain('<rGEveNom>');
    expect(xml).toContain('<cPaisRec>PRY</cPaisRec>');
    expect(xml).toContain('<dDesPaisRe>Paraguay</dDesPaisRe>');
    expect(xml).toContain('<dRucRec>616159</dRucRec>');
    expect(xml).toContain('<dDVRec>6</dDVRec>');
    expect(xml).toContain(`<dDesDepRec>${descripcionCodigoDepartamento[1]}</dDesDepRec>`);
    expect(xml).toContain(`<dDesDisRec>${descripcionCodigoDistrito[1]}</dDesDisRec>`);
    expect(xml).toContain(`<dDesCiuRec>${descripcionCodigoCiudad[1]}</dDesCiuRec>`);
  });
});
