import { describe, expect, it } from 'vitest';
import { configPorTipoDE, obtenerConfig } from './config';

describe('config de derivacion', () => {
  describe('obtenerConfig', () => {
    it('FacturaElectronica (C002=1) — estandar, con IVA, subtotales y tipo de cambio', () => {
      const cfg = obtenerConfig('FacturaElectronica');
      expect(cfg.ea008Formula).toBe('estandar');
      expect(cfg.aplicaValorItem).toBe(true);
      expect(cfg.aplicaIvaItem).toBe(true);
      expect(cfg.aplicaCondicionOperacion).toBe(true);
      expect(cfg.aplicaTransporte).toBe(true);
      expect(cfg.aplicaSubtotales).toBe(true);
      expect(cfg.subtotalesIncluyeIva).toBe(true);
      expect(cfg.totalBrutoFormula).toBe('sumaSubtotales');
      expect(cfg.totalGsFormula).toBe('tipoCambio');
    });

    it('AutofacturaElectronica (C002=4) — autofactura, sin IVA, sin transporte', () => {
      const cfg = obtenerConfig('AutofacturaElectronica');
      expect(cfg.ea008Formula).toBe('autofactura');
      expect(cfg.aplicaValorItem).toBe(true);
      expect(cfg.aplicaIvaItem).toBe(false);
      expect(cfg.aplicaCondicionOperacion).toBe(true);
      expect(cfg.aplicaTransporte).toBe(false);
      expect(cfg.aplicaSubtotales).toBe(true);
      expect(cfg.subtotalesIncluyeIva).toBe(false);
      expect(cfg.totalBrutoFormula).toBe('sumaItems');
      expect(cfg.totalGsFormula).toBe('igualF014');
    });

    it('NotaCreditoElectronica (C002=5) — sin condicion de operacion ni transporte', () => {
      const cfg = obtenerConfig('NotaCreditoElectronica');
      expect(cfg.ea008Formula).toBe('estandar');
      expect(cfg.aplicaIvaItem).toBe(true);
      expect(cfg.aplicaCondicionOperacion).toBe(false);
      expect(cfg.aplicaTransporte).toBe(false);
      expect(cfg.subtotalesIncluyeIva).toBe(true);
    });

    it('NotaDebitoElectronica (C002=6) — sin condicion de operacion ni transporte', () => {
      const cfg = obtenerConfig('NotaDebitoElectronica');
      expect(cfg.ea008Formula).toBe('estandar');
      expect(cfg.aplicaIvaItem).toBe(true);
      expect(cfg.aplicaCondicionOperacion).toBe(false);
      expect(cfg.aplicaTransporte).toBe(false);
      expect(cfg.subtotalesIncluyeIva).toBe(true);
    });

    it('NotaRemisionElectronica (C002=7) — sin valorItem, sin IVA, sin subtotales, con transporte', () => {
      const cfg = obtenerConfig('NotaRemisionElectronica');
      expect(cfg.ea008Formula).toBe('estandar');
      expect(cfg.aplicaValorItem).toBe(false);
      expect(cfg.aplicaIvaItem).toBe(false);
      expect(cfg.aplicaCondicionOperacion).toBe(false);
      expect(cfg.aplicaTransporte).toBe(true);
      expect(cfg.aplicaSubtotales).toBe(false);
      expect(cfg.subtotalesIncluyeIva).toBe(false);
    });

    it('FacturaElectronicaExportacion (C002=2) — existe y usa formula estandar', () => {
      const cfg = obtenerConfig('FacturaElectronicaExportacion');
      expect(cfg).toBeDefined();
      expect(cfg.ea008Formula).toBe('estandar');
    });

    it('FacturaElectronicaImportacion (C002=3) — sin IVA en items', () => {
      const cfg = obtenerConfig('FacturaElectronicaImportacion');
      expect(cfg).toBeDefined();
      expect(cfg.aplicaIvaItem).toBe(false);
    });

    it('ComprobanteRetencionElectronico (C002=8) — sin condicion de operacion', () => {
      const cfg = obtenerConfig('ComprobanteRetencionElectronico');
      expect(cfg).toBeDefined();
      expect(cfg.aplicaCondicionOperacion).toBe(false);
    });

    it('configPorTipoDE tiene exactamente 8 entradas', () => {
      expect(Object.keys(configPorTipoDE)).toHaveLength(8);
    });
  });
});
