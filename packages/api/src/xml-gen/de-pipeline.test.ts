import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DateTime } from 'luxon';
import { Big } from 'big.js';
import { prepareDE } from './de-pipeline';
import { facturaElectronicaSchema } from './schema/factura-electronica';
import { autofacturaElectronicaSchema } from './schema/autofactura-electronica';
import type { AutofacturaElectronicaInput } from '../sifen/types';
import {
  condicionOperacionEnum,
  tipoConstancia,
  tipoDocumentoAsociado,
  tipoImpuestoAfectado,
  tipoTransaccion
} from '../sifen/types/enums';
import { codigoCiudad } from '../gen/ciudades';
import { codigoDepartamento } from '../gen/departamentos';
import {
  createDocumentoElectronicoAsociado,
  createFacturaElectronicaInput,
  createItemOperacion_Input,
  createOperacionComercial
} from '../test-utils/factories';

interface AutofacturaInputOptions {
  monedaOperacion?: string;
  comisionOperacion?: number;
}

function createAutofacturaElectronicaInput({
  monedaOperacion = 'PYG',
  comisionOperacion = 11000
}: AutofacturaInputOptions = {}): AutofacturaElectronicaInput {
  const base = createFacturaElectronicaInput();
  const usaPyg = monedaOperacion === 'PYG';
  const item = createItemOperacion_Input({ ivaItem: undefined });
  item.cantidadProductoServicio = 1;
  item.valorItem.precioUnitario = 100000;

  return {
    id_cdc: base.id_cdc,
    operacionDE: base.operacionDE,
    timbrado: base.timbrado,
    datosGeneralesOperacion: {
      ...base.datosGeneralesOperacion,
      operacionComercial: createOperacionComercial({
        tipoTransaccion: tipoTransaccion.CompraProductos,
        tipoImpuestoAfectado: tipoImpuestoAfectado.Renta,
        monedaOperacion,
        condicionTipoCambio: usaPyg ? undefined : 1,
        tipoCambioOperacion: usaPyg ? undefined : new Big(7300)
      })
    },
    datosEspecificosPorTipoDE: {
      autofacturaElectronica: {
        naturalezaVendedor: 1,
        tipoDocumentoIdentidadVendedor: 1,
        numeroDocumentoIdentidadVendedor: '1234567',
        nombreVendedor: 'Vendedor AFE',
        direccionVendedor: 'Calle AFE',
        numeroCasaVendedor: 0,
        departamentoVendedor: codigoDepartamento.Capital,
        ciudadVendedor: codigoCiudad.AsuncionDistrito,
        lugarTransaccion: 'Calle AFE',
        departamentoTransaccion: codigoDepartamento.Capital,
        ciudadTransaccion: codigoCiudad.AsuncionDistrito
      },
      condicionOperacion: {
        condicionOperacion: condicionOperacionEnum.Contado,
        pagoContadoEntregaInicial: []
      },
      itemsOperacion: [item],
      usosComerciales: undefined
    },
    subtotalesTotales: { comisionOperacion },
    camposUsoGeneral: undefined,
    camposDocumentoElectronicoAsociado: createDocumentoElectronicoAsociado({
      tipoDocumentoAsociado: tipoDocumentoAsociado.ConstanciaElectronica,
      tipoConstancia: tipoConstancia.ConstanciaNoContribuyente,
      numeroConstancia: 123,
      numeroControlConstancia: 'ABC123'
    })
  } as AutofacturaElectronicaInput;
}

describe('xml-gen — de-pipeline', () => {
  const frozenTime = new Date('2026-04-30T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(frozenTime);
  });

  it('deriva todos los campos calculables y mapea a raw', () => {
    const input = createFacturaElectronicaInput();
    const result = prepareDE(input, facturaElectronicaSchema, 'FacturaElectronica');
    if (!result.success) throw result.error;

    const { raw, cdc } = result.value;

    // CDC preservado
    expect(cdc).toBe(input.id_cdc);

    // Fecha de firma en zona Asunción con hora congelada
    const expectedFirma = DateTime.fromJSDate(frozenTime, { zone: 'America/Asuncion' }).toFormat(
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    expect(raw.dFecFirma).toBe(expectedFirma);

    // DV derivado del último dígito del CDC
    expect(raw.dDVId).toBe(Number.parseInt(cdc.slice(-1), 10));

    // Codigo de seguridad extraido del CDC, 9 digitos con padding
    expect(raw.gOpeDE.dCodSeg).toMatch(/^\d{9}$/);
    expect(Number(raw.gOpeDE.dCodSeg)).toBeGreaterThanOrEqual(1);

    // Timbrado con padding a la izquierda
    expect(raw.gTimb.dEst).toMatch(/^\d{3}$/);
    expect(raw.gTimb.dPunExp).toMatch(/^\d{3}$/);
    expect(raw.gTimb.dNumDoc).toMatch(/^\d{7}$/);

    // Items mapeados
    expect(raw.gDtipDE.gCamItem!.length).toBeGreaterThanOrEqual(1);

    // Subtotales calculados (no son cero)
    const sub = raw.gTotSub!;
    expect(Number.parseFloat(sub.dTotOpe)).toBeGreaterThan(0);
    expect(Number.parseFloat(sub.dTotGralOpe)).toBeGreaterThan(0);
  });

  it('retorna Err de negocio si AFE usa moneda distinta a PYG antes del mapeo XML', () => {
    const input = createAutofacturaElectronicaInput({ monedaOperacion: 'USD' });
    const result = prepareDE(input, autofacturaElectronicaSchema, 'AutofacturaElectronica');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatchObject({
        name: 'XMLGenBusinessValidationError',
        issues: [expect.objectContaining({ id: 'D022' })]
      });
    }
  });

  it('mapea AFE PYG sin dTotalGs ni comision', () => {
    const input = createAutofacturaElectronicaInput({ monedaOperacion: 'PYG' });
    const result = prepareDE(input, autofacturaElectronicaSchema, 'AutofacturaElectronica');
    if (!result.success) throw result.error;

    const sub = result.value.raw.gTotSub!;
    expect(sub.dTotalGs).toBeUndefined();
    expect(sub.dComi).toBeUndefined();
    expect(sub.dIVAComi).toBeUndefined();
  });

  it('retorna Err si el CDC no es valido', () => {
    const input = createFacturaElectronicaInput({ id_cdc: 'INVALID-CDC' });
    const result = prepareDE(input, facturaElectronicaSchema, 'FacturaElectronica');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.name).toBe('XMLGenCalculationError');
    }
  });
});
