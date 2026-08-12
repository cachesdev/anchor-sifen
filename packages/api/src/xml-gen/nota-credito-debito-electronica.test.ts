import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildNotaCreditoElectronica,
  buildNotaDebitoElectronica,
  formaAfectacionTributariaIVA,
  generateDEXML,
  motivoEmision,
  tipoDocumentoAsociado,
  tipoImpuestoAfectado
} from '../index';
import type {
  DatosEspecificosPorTipoDE_NCDE_Input,
  OperacionComercial,
  PreparedDE
} from '../index';
import {
  createItemOperacion_Input,
  createNotaCreditoElectronicaInput,
  createNotaDebitoElectronicaInput,
  createOperacionComercial
} from '../test-utils/factories';

const referencedCDC = '01800195515031005001331122026030517018918308';

function createTaxedItem() {
  const item = createItemOperacion_Input();
  item.codigoInterno = 'NOTE-001';
  item.descripcionProductoServicio = '  Ajuste de servicio  ';
  item.cantidadProductoServicio = 2;
  item.valorItem.precioUnitario = 55000;
  item.valorItem.valorRestaItem.descuentoParticularItem = 0;
  item.valorItem.valorRestaItem.anticipoParticularItem = 0;
  item.valorItem.valorRestaItem.anticipoGlobalItem = 0;
  item.ivaItem = {
    formaAfectacionTributariaIVA: formaAfectacionTributariaIVA.Gravado,
    proporcionGravadaIva: 100,
    tasaIva: 10
  };
  return item;
}

function createExemptItem() {
  const item = createTaxedItem();
  item.ivaItem = {
    formaAfectacionTributariaIVA: formaAfectacionTributariaIVA.Exento,
    proporcionGravadaIva: 0,
    tasaIva: 0
  };
  return item;
}

describe('public NCE/NDE builders', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-12T12:00:00-03:00'));
  });

  it('builds an NCE through clean, raw, and XML output', () => {
    const base = createNotaCreditoElectronicaInput();
    const datosEspecificosConCamposProhibidos = {
      notaCreditoDebitoElectronica: { motivoEmision: motivoEmision.Descuento },
      itemsOperacion: [createTaxedItem()],
      usosComerciales: undefined,
      facturaElectronica: { indicadorPresencia: 1 },
      autofacturaElectronica: {},
      notaRemisionElectronica: {},
      condicionOperacion: {},
      transporte: {}
    } as unknown as DatosEspecificosPorTipoDE_NCDE_Input;
    const input = createNotaCreditoElectronicaInput({
      datosGeneralesOperacion: {
        ...base.datosGeneralesOperacion,
        operacionComercial: createOperacionComercial({
          tipoTransaccion: 2,
          tipoImpuestoAfectado: tipoImpuestoAfectado.IVA,
          monedaOperacion: 'PYG'
        })
      },
      datosEspecificosPorTipoDE: datosEspecificosConCamposProhibidos,
      subtotalesTotales: {},
      camposDocumentoElectronicoAsociado: {
        tipoDocumentoAsociado: tipoDocumentoAsociado.Electronico,
        cdcDocumentoReferenciado: referencedCDC,
        rucFusionado: '80000001'
      }
    });

    const result = buildNotaCreditoElectronica(input);
    if (!result.success) throw result.error;

    expect(result.value.type).toBe('NotaCreditoElectronica');
    expect(result.value.clean.tipoDE).toBe('NotaCreditoElectronica');
    expect(
      (result.value.clean.datosGeneralesOperacion.operacionComercial as OperacionComercial)
        .tipoTransaccion
    ).toBeUndefined();
    expect(
      result.value.clean.datosEspecificosPorTipoDE.itemsOperacion[0]!.descripcionProductoServicio
    ).toBe('Ajuste de servicio');
    expect(
      result.value.clean.datosEspecificosPorTipoDE.itemsOperacion[0]!.cantidadProductoServicio.eq(2)
    ).toBe(true);
    expect(result.value.raw.gTimb.iTiDE).toBe(5);
    expect(result.value.raw.gDtipDE.gCamNCDE).toEqual({
      iMotEmi: motivoEmision.Descuento,
      dDesMotEmi: 'Descuento'
    });
    expect(result.value.raw.gDatGralOpe.gOpeCom!.iTipTra).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamFE).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamAE).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamNRE).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamCond).toBeUndefined();
    expect(result.value.raw.gDtipDE.gTransp).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamItem).toHaveLength(1);
    expect(result.value.raw.gDtipDE.gCamItem![0]!.gValorItem!.dTotBruOpeItem).toBe(
      '110000.00000000'
    );
    expect(result.value.raw.gDtipDE.gCamItem![0]!.gCamIVA!.dLiqIVAItem).toBe('10000.00000000');
    expect(result.value.raw.gTotSub!.dTotOpe).toBe('110000.00000000');
    expect(result.value.raw.gTotSub!.dTotIVA).toBe('10000.00000000');
    expect(result.value.raw.gCamDEAsoc).toMatchObject({
      iTipDocAso: tipoDocumentoAsociado.Electronico,
      dDesTipDocAso: 'Electrónico',
      dCdCDERef: referencedCDC,
      dRucFus: '80000001'
    });

    const xml = generateDEXML(result.value);
    expect(xml).toContain('<iTiDE>5</iTiDE>');
    expect(xml).toContain('<gCamNCDE><iMotEmi>3</iMotEmi><dDesMotEmi>Descuento</dDesMotEmi>');
    expect(xml).toContain(`<dCdCDERef>${referencedCDC}</dCdCDERef>`);
    expect(xml).toContain('<gCamDEAsoc><iTipDocAso>1</iTipDocAso>');
    expect(xml).toContain('<dRucFus>80000001</dRucFus>');
    expect(xml).not.toContain('<gCamCond>');
    expect(xml).not.toContain('<gTransp>');
    expect(xml).not.toContain('<gCamFE>');
    expect(xml).not.toContain('<gCamAE>');
    expect(xml).not.toContain('<gCamNRE>');
    expect(xml).not.toContain('<iTipTra>');

    const prepared: PreparedDE = result.value;
    if (prepared.type === 'NotaCreditoElectronica') {
      expect(prepared.clean.tipoDE).toBe('NotaCreditoElectronica');
    }
  });

  it('builds an NDE with C002=6 and the shared note calculation profile', () => {
    const input = createNotaDebitoElectronicaInput({
      datosGeneralesOperacion: {
        ...createNotaDebitoElectronicaInput().datosGeneralesOperacion,
        operacionComercial: createOperacionComercial({
          tipoImpuestoAfectado: tipoImpuestoAfectado.Ninguno,
          monedaOperacion: 'PYG'
        })
      },
      datosEspecificosPorTipoDE: {
        notaCreditoDebitoElectronica: { motivoEmision: motivoEmision.RecuperoCosto },
        itemsOperacion: [createExemptItem()],
        usosComerciales: undefined
      },
      subtotalesTotales: {},
      camposDocumentoElectronicoAsociado: {
        tipoDocumentoAsociado: tipoDocumentoAsociado.Electronico,
        cdcDocumentoReferenciado: referencedCDC
      }
    });

    const result = buildNotaDebitoElectronica(input);
    if (!result.success) throw result.error;

    expect(result.value.type).toBe('NotaDebitoElectronica');
    expect(result.value.clean.tipoDE).toBe('NotaDebitoElectronica');
    expect(result.value.raw.gTimb.iTiDE).toBe(6);
    expect(result.value.raw.gDtipDE.gCamNCDE).toEqual({
      iMotEmi: motivoEmision.RecuperoCosto,
      dDesMotEmi: 'Recupero de costo'
    });
    expect(result.value.raw.gDtipDE.gCamCond).toBeUndefined();
    expect(result.value.raw.gDtipDE.gTransp).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamFE).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamAE).toBeUndefined();
    expect(result.value.raw.gDtipDE.gCamNRE).toBeUndefined();
    expect(result.value.raw.gTotSub!.dSubExe).toBe('110000.00000000');
    expect(result.value.raw.gTotSub!.dTotOpe).toBe('110000.00000000');
    expect(result.value.raw.gTotSub!.dTotIVA).toBeUndefined();

    const xml = generateDEXML(result.value);
    expect(xml).toContain('<iTiDE>6</iTiDE>');
    expect(xml).toContain(
      '<gCamNCDE><iMotEmi>6</iMotEmi><dDesMotEmi>Recupero de costo</dDesMotEmi>'
    );
    expect(xml).toContain('<dSubExe>110000.00000000</dSubExe>');
    expect(xml).not.toContain('<gCamCond>');
    expect(xml).not.toContain('<gTransp>');
    expect(xml).not.toContain('<gCamFE>');
    expect(xml).not.toContain('<gCamAE>');
    expect(xml).not.toContain('<gCamNRE>');
  });
});
