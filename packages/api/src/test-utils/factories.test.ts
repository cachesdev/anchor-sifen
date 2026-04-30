import { describe, expect, it } from 'vitest';
import {
  createFacturaElectronicaInput,
  createOperacionDE_Input,
  createTimbrado_Input,
  createEmisor_Input,
  createReceptor_Input,
  createItemOperacion_Input,
  createDatosGeneralesOperacion_Input,
  createUsoGeneral,
  createDocumentoElectronicoAsociado,
  createOperacionDE,
  createTimbrado,
  createEmisor,
  createReceptor,
  createItemOperacion,
  createSubtotalesTotales,
  createOperacionComercial,
  createObligacionesAfectadas,
  createActividadEconomica,
  createResponsableDE,
  createCamposFacturaElectronica,
  createComprasPublicas,
  createCondicionOperacion,
  createPagoContadoEntregaInicial,
  createPagoTarjetaCreditoDebito,
  createPagoCheque,
  createPagoCredito,
  createCuota,
  createValorItem,
  createValorRestaItem,
  createIvaItem,
  createRastreoMercaderia,
  createDetalleVehiculoNuevo,
  createTransporte,
  createLocalSalidaMercaderias,
  createLocalEntregaMercaderias,
  createVehiculoTrasladoMercaderias,
  createTransportista,
  createUsoComercial,
  createSectorEnergiaElectrica,
  createSectorSeguros,
  createPolizaSeguros,
  createSectorSupermercados,
  createDatosAdicionalesUsoComercial,
  createCarga
} from './factories';
import { codigoMoneda } from '../gen/monedas';

describe('base factories', () => {
  it('createOperacionDE produce tipo base completo', () => {
    const op = createOperacionDE();
    expect([1, 2]).toContain(op.tipoEmision);
    expect(typeof op.codigoSeguridad).toBe('number');
  });

  it('createTimbrado produce tipo base completo', () => {
    const t = createTimbrado();
    expect(t.tipoDocumento).toBe(1);
    expect(t.fechaInicioVigencia).toBeInstanceOf(Date);
  });

  it('createEmisor no genera campos opcionales', () => {
    const e = createEmisor();
    expect(e.rucEmisor).toMatch(/^\d+-\d$/);
    expect(e.digitoVerificadorEmisor).toBeUndefined();
    expect(e.nombreFantasiaEmi).toBeUndefined();
    expect(e.responsableDE).toBeUndefined();
  });

  it('createReceptor no genera campos opcionales', () => {
    const r = createReceptor();
    expect([1, 2]).toContain(r.naturalezaReceptor);
    expect(r.digitoVerificadorReceptor).toBeUndefined();
    expect(r.rucReceptor).toBeUndefined();
    expect(r.direccionReceptor).toBeUndefined();
  });

  it('createItemOperacion produce tipo base con campos requeridos', () => {
    const item = createItemOperacion();
    expect(item.valorItem).toBeDefined();
    expect(item.valorItem!.precioUnitario).toBeDefined();
    expect(item.valorItem!.valorRestaItem).toBeDefined();
    expect(item.ivaItem).toBeDefined();
    expect(item.rastreoMercaderia).toBeUndefined();
    expect(item.vehiculoNuevo).toBeUndefined();
  });

  it('createSubtotalesTotales produce los 23 campos', () => {
    const s = createSubtotalesTotales();
    expect(s.totalBrutoOperacion).toBeDefined();
    expect(s.totalNetoOperacion).toBeDefined();
    expect(s.liquidacionTotalIva).toBeDefined();
    expect(s.comisionOperacion).toBeDefined();
  });
});

describe('input factories', () => {
  it('createOperacionDE_Input omite codigoSeguridad', () => {
    const op = createOperacionDE_Input();
    expect([1, 2]).toContain(op.tipoEmision);
    expect('codigoSeguridad' in op).toBe(false);
  });

  it('createTimbrado_Input omite tipoDocumento', () => {
    const t = createTimbrado_Input();
    expect(t.numeroTimbrado).toBeGreaterThan(0);
    expect('tipoDocumento' in t).toBe(false);
  });

  it('createEmisor_Input omite digitoVerificadorEmisor', () => {
    const e = createEmisor_Input();
    expect(e.rucEmisor).toMatch(/^\d+-\d$/);
    expect('digitoVerificadorEmisor' in e).toBe(false);
  });

  it('createReceptor_Input omite digitoVerificadorReceptor', () => {
    const r = createReceptor_Input();
    expect([1, 2]).toContain(r.naturalezaReceptor);
    expect('digitoVerificadorReceptor' in r).toBe(false);
  });

  it('createItemOperacion_Input omite campos autocalculados del item', () => {
    const item = createItemOperacion_Input();
    expect(item.valorItem).toBeDefined();
    expect('totalBrutoOperacionItem' in item.valorItem!).toBe(false);
    expect('valorTotalOperacionItem' in item.valorItem!.valorRestaItem).toBe(false);
    expect('baseGravadaIvaItem' in item.ivaItem!).toBe(false);
    expect('liquidacionIvaItem' in item.ivaItem!).toBe(false);
  });

  it('createFacturaElectronicaInput produce el minimo valido para C002=1', () => {
    const fe = createFacturaElectronicaInput();
    expect(fe.id_cdc.length).toBe(44);
    expect(fe.operacionDE).toBeDefined();
    expect(fe.timbrado).toBeDefined();
    expect(fe.datosGeneralesOperacion).toBeDefined();
    expect(fe.datosEspecificosPorTipoDE).toBeDefined();
    expect(fe.subtotalesTotales).toBeDefined();
    expect(fe.datosEspecificosPorTipoDE.itemsOperacion.length).toBe(1);
    // Opcionales: no generados
    expect(fe.camposUsoGeneral).toBeUndefined();
    expect(fe.camposDocumentoElectronicoAsociado).toBeUndefined();
    expect(fe.datosEspecificosPorTipoDE.transporte).toBeUndefined();
    expect(fe.datosEspecificosPorTipoDE.usosComerciales).toBeUndefined();
  });

  it('createFacturaElectronicaInput respeta overrides', () => {
    const fe = createFacturaElectronicaInput({
      id_cdc: 'CUSTOM-CDC',
      operacionDE: createOperacionDE_Input({ tipoEmision: 2 })
    });
    expect(fe.id_cdc).toBe('CUSTOM-CDC');
    expect(fe.operacionDE.tipoEmision).toBe(2);
  });

  it('los campos opcionales se pueden incluir via overrides', () => {
    const fe = createFacturaElectronicaInput({
      camposUsoGeneral: createUsoGeneral(),
      camposDocumentoElectronicoAsociado: createDocumentoElectronicoAsociado()
    });
    expect(fe.camposUsoGeneral).toBeDefined();
    expect(fe.camposDocumentoElectronicoAsociado).toBeDefined();
  });

  it('las factories anidadas componen correctamente', () => {
    const fe = createFacturaElectronicaInput({
      datosGeneralesOperacion: createDatosGeneralesOperacion_Input({
        emisor: createEmisor_Input({ rucEmisor: '80001234-5' })
      })
    });
    expect(fe.datosGeneralesOperacion.emisor.rucEmisor).toBe('80001234-5');
  });

  it('crea objetos unicos en cada llamada', () => {
    const a = createFacturaElectronicaInput();
    const b = createFacturaElectronicaInput();
    expect(a.id_cdc).not.toBe(b.id_cdc);
  });

  it('todas las factories base exportadas producen objetos sin lanzar', () => {
    const factories = [
      createOperacionDE,
      createTimbrado,
      createOperacionComercial,
      createObligacionesAfectadas,
      createActividadEconomica,
      createResponsableDE,
      createEmisor,
      createReceptor,
      createCamposFacturaElectronica,
      createComprasPublicas,
      createCondicionOperacion,
      createPagoContadoEntregaInicial,
      createPagoTarjetaCreditoDebito,
      createPagoCheque,
      createPagoCredito,
      createCuota,
      createItemOperacion,
      createValorItem,
      createValorRestaItem,
      createIvaItem,
      createRastreoMercaderia,
      createDetalleVehiculoNuevo,
      createTransporte,
      createLocalSalidaMercaderias,
      createLocalEntregaMercaderias,
      createVehiculoTrasladoMercaderias,
      createTransportista,
      createUsoComercial,
      createSectorEnergiaElectrica,
      createSectorSeguros,
      createPolizaSeguros,
      createSectorSupermercados,
      createDatosAdicionalesUsoComercial,
      createSubtotalesTotales,
      createUsoGeneral,
      createCarga,
      createDocumentoElectronicoAsociado
    ] as const;

    for (const factory of factories) {
      const result = factory();
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    }
  });
});

describe('factories: campos de moneda usan codigos, no descripciones', () => {
  it('monedaOperacion es un codigo de moneda valido (clave del lookup)', () => {
    const oc = createOperacionComercial();
    const key = oc.monedaOperacion;
    expect(codigoMoneda).toHaveProperty(key);
  });

  it('monedaTipoPago es un codigo de moneda valido', () => {
    const pago = createPagoContadoEntregaInicial();
    const key = pago.monedaTipoPago;
    expect(codigoMoneda).toHaveProperty(key);
  });

  it('monedaCuota es un codigo de moneda valido', () => {
    const cuota = createCuota();
    const key = cuota.monedaCuota;
    expect(codigoMoneda).toHaveProperty(key);
  });
});
